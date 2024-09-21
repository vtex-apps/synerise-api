import type { IOContext, InstanceOptions } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Synerise extends ExternalClient {
  private campaignRoute = (campaignId: string) =>
    `/recommendations/v2/recommend/campaigns/${campaignId}`

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('http://api.synerise.com', ctx, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    })
  }

  public get = async (input: RequestInput, jwt: string) => {
    return this.http.get<SynRecommendationResponse>(
      this.campaignRoute(input.campaignId),
      {
        params: {
          clientUUID: input.uuid,
          itemId: input.itemId,
        },
        metric: 'get-syn-recommendation',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }

  public getUserToken = (req: RequestInput, apiKey: string) => {
    return this.http
      .post<SynAuthTokenResponse>(
        '/sauth/v2/auth/login/client/anonymous',
        {
          uuid: req.uuid,
          apiKey,
        },
        {
          metric: 'get-syn-user-token',
          headers: {
            'X-Vtex-Use-Https': 'true',
          },
        }
      )
      .then((res) => res.token)
  }
}
