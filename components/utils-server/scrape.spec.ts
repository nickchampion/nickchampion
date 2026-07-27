import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium, type Page } from 'playwright'

const outputDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../docs/brain')

interface ScrapeOptions {

  /** CSS selector that must exist before the HTML is captured — the most reliable SPA signal */
  waitForSelector?: string

  /** Milliseconds the DOM must stay unchanged before we consider the app rendered */
  domIdleMs?: number

  /** Scroll to the bottom first, to trigger lazy/infinite loading */
  autoScroll?: boolean

  /** Overall budget for the page to settle */
  timeoutMs?: number
}

/**
 * SPAs ship an empty shell and render client side, so the raw response body is useless.
 * We drive a real browser, wait for the app to stop mutating the DOM, then serialise
 * the live document.
 */
const scrapePage = async (page: Page, url: string, options: ScrapeOptions = {}): Promise<string> => {
  const {
    waitForSelector, domIdleMs = 500, autoScroll = false, timeoutMs = 30_000,
  } = options

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs })

  if (waitForSelector) {
    await page.waitForSelector(waitForSelector, { state: 'attached', timeout: timeoutMs })
  }

  // Best effort — apps that poll or hold a socket open never reach networkidle
  await page.waitForLoadState('networkidle', { timeout: timeoutMs }).catch(() => {})

  if (autoScroll) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let travelled = 0
        const step = 400
        const timer = setInterval(() => {
          window.scrollBy(0, step)
          travelled += step

          if (travelled >= document.body.scrollHeight) {
            clearInterval(timer)
            resolve()
          }
        }, 100)
      })
    })
  }

  await waitForDomIdle(page, domIdleMs, timeoutMs)

  return page.evaluate(() => document.documentElement.outerHTML)
}

/** Resolves once no mutation has been observed for `idleMs`, or the budget expires. */
const waitForDomIdle = (page: Page, idleMs: number, timeoutMs: number): Promise<void> => page.evaluate(
  ([idle, budget]) => new Promise<void>((resolve) => {
    let timer = setTimeout(resolve, idle)

    const observer = new MutationObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(finish, idle)
    })

    const finish = () => {
      observer.disconnect()
      resolve()
    }

    observer.observe(document.documentElement, {
      childList: true, subtree: true, attributes: true, characterData: true,
    })
    setTimeout(finish, budget)
  }),
  [idleMs, timeoutMs],
)

/** docs/output/<host><path>.html — one predictable file per scraped URL */
const outputPathFor = (url: string): string => {
  const { hostname, pathname } = new URL(url)
  const slug = `${hostname}${pathname}`.replaceAll(/[^a-z0-9]+/gi, '-').replaceAll(/^-|-$/g, '')

  return path.join(outputDirectory, `${slug}.html`)
}

// Hits the network — unskip to scrape a real URL
describe('Playwright scraping (live)', () => {
  const url = 'https://www.zesttee.com/gb'

  test('writes the rendered HTML of a live page to docs/output', async () => {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    })

    const html = await scrapePage(page, url, { autoScroll: true })
    const destination = outputPathFor(url)

    await mkdir(outputDirectory, { recursive: true })
    await writeFile(destination, html, 'utf8')

    console.log(`Wrote ${html.length} bytes to ${destination}`)

    expect(html.length).toBeGreaterThan(0)

    await browser.close()
  }, 120_000)
})
