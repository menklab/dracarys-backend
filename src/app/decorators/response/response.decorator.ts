import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { TResponseData } from './types'

export const RESPONSE_CONFIG_TOKEN = Symbol('endpoint-response-config')

export const Response = (data: TResponseData): CustomDecorator<symbol> => SetMetadata(RESPONSE_CONFIG_TOKEN, data)
