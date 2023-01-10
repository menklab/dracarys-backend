import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { UpdateAccountElementDto } from './dtos/update-account-element/update-account-element.dto'
import { CreateAccountElementDto } from './dtos/create-account-element/create-account-element.dto'
import { AccountElementService } from './account-element.service'
import { AccountElementDto } from './dtos/account-element.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { SWAGGER_OPTIONS } from 'src/common'

@ApiTags('AccountElement')
@UseGuards(AuthGuard)
@Controller('account-element')
export class AccountElementController {
  constructor(private readonly accountElementService: AccountElementService) {}

  @Get()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async getAll(@Query('accountId') accountId: number): Promise<AccountElementDto[]> {
    return this.accountElementService.getAll(accountId)
  }

  @Get(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async get(@Param('id') id: number): Promise<AccountElementDto> {
    return this.accountElementService.get(id)
  }

  @Post()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createAccountElementDto: CreateAccountElementDto): Promise<AccountElementDto> {
    return this.accountElementService.create(createAccountElementDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateAccountElementDto: UpdateAccountElementDto): Promise<AccountElementDto> {
    return this.accountElementService.update(id, updateAccountElementDto)
  }

  @Delete(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.accountElementService.delete(id)
  }
}
