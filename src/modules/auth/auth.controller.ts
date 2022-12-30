import { Body, Controller, Delete, Get, Post, Session } from '@nestjs/common'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { MessageOutputDto } from './dtos/message/message.output.dto'
import { AuthInputDto } from './dtos/auth/auth.input.dto'
import { Response } from '../../app/decorators'
import { SWAGGER_OPTIONS } from '../../common'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @ApiInternalServerErrorResponse()
  @ApiOkResponse(SWAGGER_OPTIONS.auth.requestMessageOk)
  @Get('requestMessage')
  @Response({
    dto: MessageOutputDto,
  })
  public async requestMessage(@Session() session: Record<string, any>): Promise<MessageOutputDto> {
    const message = this.authService.generateMessage(session)
    return { message }
  }

  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse(SWAGGER_OPTIONS.auth.notAuthorized)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.auth.invalidMessage)
  @ApiOkResponse(SWAGGER_OPTIONS.auth.authorized)
  @Post('validateMessage')
  public async validateMessage(@Session() session: Record<string, any>, @Body() authInputDto: AuthInputDto): Promise<boolean> {
    return this.authService.verifyMessage(session, authInputDto)
  }

  @ApiInternalServerErrorResponse()
  @ApiOkResponse(SWAGGER_OPTIONS.auth.logout)
  @Delete('logout')
  public async logOut(@Session() session: Record<string, any>): Promise<boolean> {
    return this.authService.logOut(session)
  }
}
