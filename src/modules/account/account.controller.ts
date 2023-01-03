import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { UpdateAccountDto } from "./dtos/update-account/update-account.dto"
import { CreateAccountDto } from "./dtos/create-account/create-account.dto"
import { AuthGuard } from "../app/guards/auth.guard"
import { AccountService } from "./account.service"
import { Account } from "../../orm/entities"
import { ApiTags } from "@nestjs/swagger"

@ApiTags('Account')
@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService) { }

  @Get()
  public async getAll(@Param('programm_id') programm_id: number): Promise<Account[]> {
    return this.accountService.getAll(programm_id)
  }

  @Post()
  public async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto)
  }

  @Put()
  public async update(
    @Param('id') id: number,
    @Body() updateAccountDto: UpdateAccountDto
  ): Promise<Account> {
    return this.accountService.update(id, updateAccountDto)
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.accountService.delete(id)
  }

}
