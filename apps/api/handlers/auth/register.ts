import { AuthInfo, type ApiHandler } from '@nodevault/platform.components.context'
import type { Response } from '@nodevault/platform.components.api.server'
import type { RegisterRequestSchema, VerifyLoginSchema } from '@nodevault/platform.components.api.schemas'
import { Account, User } from '@nodevault/platform.components.domain'
import { createAuthTokenForUser } from '@nodevault/platform.components.utils.server'
import { acquireUniqueConstraints } from '../../utils/constraints'

export const authRegister: ApiHandler = async (context): Promise<Response> => {
  const {
    firstName, lastName, email, phone,
  } = context.event.payload as RegisterRequestSchema

  const account = new Account({
    name: `${firstName.trim()} ${lastName.trim()}`,
    status: 'active',
  })

  await context.session.store(account)

  const user = new User({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone
      ? {
        countryCode: phone.countryCode,
        number: phone.number.replace(' ', ''),
      }
      : null,
    accountId: account.id,
    status: 'active',
    roles: ['user'],
  })

  await context.session.store(user)

  const userConstraints = await acquireUniqueConstraints(context, user.id, user.email)

  // failed to aquire unique constraints so return
  if (userConstraints.response) {
    context.session.veto = true

    return userConstraints.response
  }

  const authInfo = new AuthInfo(user, account)
  const authTokens = createAuthTokenForUser(authInfo)
  const verifySchema: VerifyLoginSchema = {
    user: user,
    account: account,
    tokens: authTokens,
  }

  return context.event.response.created(verifySchema)
}
