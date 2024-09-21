const convertProducts = (products: SynProductData[], ctx: Context) => {
  const {
    clients: { intelligentSearch },
  } = ctx

  return products.map((product) =>
    intelligentSearch
      .productById(product.itemId)
      .then((result) => result)
      .catch(() => {
        return undefined
      })
  )
}

export async function campaign(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { synerise },
    vtex: { logger },
  } = ctx

  const { input, userJWT } = ctx

  let recs: any = []

  try {
    recs = await synerise.get(input, userJWT || '')
  } catch (e) {
    ctx.status = parseInt(e?.response?.status, 10) || 500
    ctx.body = e?.response?.data || ctx.body

    logger.error({ status: ctx.status, data: ctx.body })

    return
  }

  const products = await Promise.all(convertProducts(recs.data, ctx))

  ctx.body = { products: products.filter((product) => !!product), jwt: userJWT }

  return next()
}
