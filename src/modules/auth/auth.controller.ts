import { Body, Controller, Delete, Get, Post, Session } from '@nestjs/common'
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { MessageOutputDto } from './dtos/message/message.output.dto'
import { AuthInputDto } from './dtos/auth/auth.input.dto'
import { Response } from '../../app/decorators'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @Get('requestMessage')
  @Response({
    dto: MessageOutputDto,
  })
  public async requestMessage(@Session() session: Record<string, any>): Promise<MessageOutputDto> {
    const message = this.authService.generateMessage(session)
    return { message }
  }

  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @Post('validateMessage')
  public async validateMessage(@Session() session: Record<string, any>, @Body() authInputDto: AuthInputDto): Promise<boolean> {
    return this.authService.verifyMessage(session, authInputDto)
  }

  @ApiInternalServerErrorResponse()
  @ApiOkResponse()
  @Delete('logout')
  public async logOut(@Session() session: Record<string, any>): Promise<boolean> {
    return this.authService.logOut(session)
  }
}
