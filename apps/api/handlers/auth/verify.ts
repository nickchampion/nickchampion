import { AuthInfo, type ApiHandler } from '@platform/components.context'
import { base64Decode, createAuthTokenForUser, decrypt } from '@platform/components.utils.server'
import { serverConfiguration } from '@platform/components.configuration'
import { LoginToken, User, type Account } from '../../models/index.js'
import { AppError } from '@platform/components.domain'
import type { Response } from '@platform/components.api'
import type { VerifyLoginSchema } from '@platform/components.nodevault.openapi'

export const authVerify: ApiHandler = async (context): Promise<Response> => {
  const { code } = context.event.payload

  try {
    const decryptedToken = decrypt(base64Decode(code), serverConfiguration.environment.key, serverConfiguration.environment.salt)

    if (!decryptedToken) {
      throw new AppError('auth', 'You have provided an invalid login token, please login again to receive a new code')
    }

    const [loginTokenId] = decryptedToken.split('_')
    const loginToken = await context.session.get<LoginToken>(LoginToken.id(loginTokenId))

    if (!loginToken || loginToken.used) {
      throw new AppError('auth', 'You\'re token has expired, please login again to receive a new token')
    }

    // otherwise load the user, generate an auth token
    loginToken.used = true

    const user = await context.session.get<User>(User.id(loginToken.userId), { account: 'accountId' })

    if (!user) {
      throw new AppError('auth', 'Your account is no longer active')
    }

    const account = await context.session.get<Account>(user.accountId)
    const authInfo = new AuthInfo({
      ...user,
      accountName: account.name,
      accountId: account.id,
    })
    const authTokens = createAuthTokenForUser(authInfo)
    const verifySchema: VerifyLoginSchema = {
      user: user,
      account: account,
      tokens: authTokens,
    }

    return context.event.response.ok(verifySchema)
  } catch (error: any) {
    return context.event.response.badRequestCustom('auth', error.message)
  }

  return context.event.response.ok()
}
