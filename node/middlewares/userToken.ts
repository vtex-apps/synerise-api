import { json } from 'co-body'

export async function userToken(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { synerise, apps },
    req,
    vtex: { logger },
  } = ctx

  const input: RequestInput = await json(req)

  const { apiKey }: { apiKey: string } = await apps.getAppSettings(
    'vtex.synerise-api@0.x'
  )

  if (!apiKey) {
    ctx.status = 400
    ctx.body = {
      message:
        'Missing API key. Go to "myvtex.com/admin/apps" and set the API key for the vtex.synerise-api app',
    }

    return
  }

  let userJWT = input.jwt

  if (!userJWT) {
    try {
      userJWT = await synerise.getUserToken(input, apiKey)
    } catch (e) {
      ctx.status = parseInt(e?.response?.status, 10) || 500
      ctx.body = e?.response?.data || ctx.body

      logger.error({ status: ctx.status, data: ctx.body })

      return
    }
  }

  ctx.userJWT = userJWT
  ctx.input = input

  return next()
}
