import { json } from 'co-body'

export async function userToken(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { synerise, apps },
    req,
  } = ctx

  const input: RequestInput = await json(req)

  const { apiKey }: { apiKey: string } = await apps.getAppSettings(
    'vtex.synerise-api@0.x'
  )

  let userJWT = input.jwt

  if (!userJWT) {
    try {
      userJWT = await synerise.getUserToken(input, apiKey)
    } catch (e) {
      ctx.status = e.response.status
      ctx.body = e.response.data

      return next()
    }
  }

  ctx.userJWT = userJWT
  ctx.input = input

  return next()
}
