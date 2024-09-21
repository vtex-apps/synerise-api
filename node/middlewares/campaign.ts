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
  } = ctx

  const { input, userJWT } = ctx

  let recs: any = []

  try {
    recs = await synerise.get(input, userJWT || '')
  } catch (e) {
    ctx.status = e.response.status
    ctx.body = e.response.data

    return next()
  }

  const products = await Promise.all(convertProducts(recs.data, ctx))

  ctx.body = { products: products.filter((product) => !!product), jwt: userJWT }

  return next()
}
