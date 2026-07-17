import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ensureFolderExistsSync = (p: string): void => {
  try {
    mkdirSync(p)
  } catch {
    /* empty */
  }
}

const fixRavenDB = () => {
  const filePath = path.join(__dirname, '../../node_modules/ravendb/dist/esm/Http/RequestExecutor.js')
  const file = readFileSync(filePath, 'utf8')

  writeFileSync(filePath, file.replace('import(importFix("undici"))', 'import("undici")'), {
    encoding: 'utf8',
    flag: 'w',
  })
}

const schemas = async () => {
  fixRavenDB()

  ensureFolderExistsSync(path.join(__dirname, '../openapi'))

  const nodevault = await import('@platform/components.nodevault.openapi')

  console.log('[44m OpenAPI Schemas [0m')

  writeFileSync(
    path.join(__dirname, '../openapi/api.json'),
    JSON.stringify(nodevault.composeOpenApiDocument(), null, 2),
  )
  console.log('  ✓ .nodevault/openapi/api.json')
}

schemas()
