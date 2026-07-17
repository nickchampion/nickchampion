import type { ApiHandler } from '@platform/components.context'
import { base64Encode } from '@platform/components.utils.server'
import { serverConfiguration } from '@platform/components.configuration'
import { createHttpClient } from '@platform/components.utils'
import type { Response } from '@platform/components.api'
import type { ContactRequestSchema } from '../../openapi'
import { Contact } from '../../models'

export const commsContact: ApiHandler = async (context): Promise<Response> => {
  const payload = context.event.payload as ContactRequestSchema

  const contact = new Contact({
    email: payload.email,
    phone: payload.phone,
    name: payload.name,
    message: payload.message,
    interests: payload.interests,
  })

  await context.session.store(contact)

  const client = createHttpClient(serverConfiguration.ntfy.host)

  try {
    await client.post(`/${serverConfiguration.ntfy.topics.phone}`, contact, {
      headers: {
        Authorization: `Basic ${base64Encode(`${serverConfiguration.ntfy.username}:${serverConfiguration.ntfy.password}`)}`,
      },
    })
  } catch (error) {
    context.log.error(error)
  }

  return context.event.response.ok({ status: 'ok', message: 'Thank you for your message. We will be in touch shortly.' })
}
