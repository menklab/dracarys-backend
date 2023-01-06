import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { UpdateAccountDto } from './dtos/update-account/update-account.dto'
import { CreateAccountDto } from './dtos/create-account/create-account.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { AccountService } from './account.service'
import { AccountDto } from './dtos/account.dto'
import { SWAGGER_OPTIONS } from 'src/common'

@ApiTags('Account')
@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async getAll(@Query('programId') programId: number): Promise<AccountDto[]> {
    return this.accountService.getAll(programId)
  }

  @Get(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async get(@Param('id') id: number): Promise<AccountDto> {
    return this.accountService.get(id)
  }

  @Post()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
    return this.accountService.create(createAccountDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountDto> {
    return this.accountService.update(id, updateAccountDto)
  }

  @Delete(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.accountService.delete(id)
  }
}
