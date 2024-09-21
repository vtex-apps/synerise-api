import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export const parseState = (state?: string): { [key: string]: string } => {
  if (!state) {
    return {}
  }

  try {
    const parsed = JSON.parse(decodeURI(state))

    if (typeof parsed === 'object') {
      return parsed
    }
  } catch (err) {
    /* ignore parsing errors */
  }

  return {}
}

export class IntelligentSearch extends ExternalClient {
  private locale: string | undefined

  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.workspace}--${context.account}.myvtex.com/_v/api/intelligent-search`,
      context,
      {
        ...options,
        headers: {
          ...options?.headers,
        },
      }
    )

    const { locale, tenant } = context

    this.locale = locale ?? tenant?.locale
  }

  public async productById(id: string) {
    const result = await this.http.get(`/product_search/`, {
      params: {
        query: `product:${id}`,
        locale: this.locale,
      },
      metric: 'synerise-product-by-id',
    })

    return result.products[0]
  }
}
