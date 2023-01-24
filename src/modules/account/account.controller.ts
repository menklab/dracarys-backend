import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UpdateAccountDto } from './dtos/update-account/update-account.dto'
import { CreateAccountDto } from './dtos/create-account/create-account.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { AccountService } from './account.service'
import { AccountDto } from './dtos/account.dto'
import { SWAGGER_OPTIONS } from 'src/common'
import { UpdateAccountLinkDto } from './dtos/update-account-link/update-account-link.dto'

@ApiTags('Account')
@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async getAll(@Query('programId') programId: number): Promise<AccountDto[]> {
    return this.accountService.getAll(programId)
  }

  @Post()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
    return this.accountService.create(createAccountDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.forbidden)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountDto> {
    return this.accountService.update(id, updateAccountDto)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse(SWAGGER_OPTIONS.noContent)
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.accountService.delete(id)
  }

  @Put('links')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async updateLinkedAccounts(@Body() updateAccountLinkDto: UpdateAccountLinkDto): Promise<AccountDto[]> {
    return this.accountService.updateLinkedAccounts(updateAccountLinkDto)
  }

  @Get('generate-code')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiOkResponse(SWAGGER_OPTIONS.account.generateCodeOk)
  public async generateCode(@Query('programId') programId: number): Promise<string[]> {
    return this.accountService.generateCode(programId)
  }

  @Get(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async get(@Param('id') id: number): Promise<AccountDto> {
    return this.accountService.get(id)
  }
}
