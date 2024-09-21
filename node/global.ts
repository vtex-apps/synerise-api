import type {
  IOContext,
  ParamsContext,
  RecorderState,
  ServiceContext,
  SegmentData,
} from '@vtex/api'

import type { Clients } from './clients/index'

declare global {
  type Context = ServiceContext<Clients, RecorderState, CustomContext>

  interface CustomContext extends ParamsContext {
    vtex: CustomIOContext
    userJWT: string
    input: RequestInput
  }
  interface CustomIOContext extends IOContext {
    segment?: SegmentData
  }

  interface RequestInput {
    uuid: string
    campaignId: string
    jwt?: string
    itemId: string
  }

  interface SynRecommendationResponse {
    data: SynProductData[]
  }

  interface SynProductData {
    itemId: string
    link: string
    title: string
  }

  interface SynAuthTokenResponse {
    token: string
    expiration: number
    created: number
    origin: string
    clientId: string
    clientUuid: string
  }
}
