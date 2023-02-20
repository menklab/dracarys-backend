import { Body, Controller, Delete, Get, Post, Res, Session } from '@nestjs/common'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { MessageOutputDto } from './dtos/message/message.output.dto'
import { AuthInputDto } from './dtos/auth/auth.input.dto'
import { Response } from '../../app/decorators'
import { SWAGGER_OPTIONS } from '../../common'
import { Response as ExpressResponse } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiOkResponse(SWAGGER_OPTIONS.auth.requestMessageOk)
  @Get('requestMessage')
  @Response({
    dto: MessageOutputDto,
  })
  public async requestMessage(@Session() session: Record<string, any>): Promise<MessageOutputDto> {
    const message = this.authService.generateMessage(session)
    return { message }
  }

  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiUnauthorizedResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  @ApiOkResponse(SWAGGER_OPTIONS.auth.authorized)
  @Post('validateMessage')
  public async validateMessage(@Session() session: Record<string, any>, @Body() authInputDto: AuthInputDto): Promise<boolean> {
    return this.authService.verifyMessage(session, authInputDto)
  }

  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiOkResponse(SWAGGER_OPTIONS.auth.logout)
  @Delete('logout')
  public async logOut(@Session() session: Record<string, any>, @Res({ passthrough: true }) response: ExpressResponse): Promise<boolean> {
    return this.authService.logOut(session, response)
  }
}
