import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common'
import { UpdateAccountElementDto } from './dtos/update-account-element/update-account-element.dto'
import { CreateAccountElementDto } from './dtos/create-account-element/create-account-element.dto'
import { AccountElementService } from './account-element.service'
import { AccountElementDto } from './dtos/account-element.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { SWAGGER_OPTIONS } from 'src/common'

@ApiTags('Account Element')
@UseGuards(AuthGuard)
@Controller('account-element')
export class AccountElementController {
  constructor(private readonly accountElementService: AccountElementService) {}

  @Get()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async getAll(@Query('accountId') accountId: number, @Session() session: Record<string, any>): Promise<AccountElementDto[]> {
    return this.accountElementService.getAll(accountId, session.userId)
  }

  @Get(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async get(@Param('id') id: number, @Session() session: Record<string, any>): Promise<AccountElementDto> {
    return this.accountElementService.get(id, session.userId)
  }

  @Post()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createAccountElementDto: CreateAccountElementDto): Promise<AccountElementDto> {
    return this.accountElementService.create(createAccountElementDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateAccountElementDto: UpdateAccountElementDto): Promise<AccountElementDto> {
    return this.accountElementService.update(id, updateAccountElementDto)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNoContentResponse(SWAGGER_OPTIONS.noContent)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.accountElementService.delete(id)
  }
}
