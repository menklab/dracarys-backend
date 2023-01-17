import { businessException } from 'src/common/errors/utils/business-exception'
import { CreateAccountDto } from './dtos/create-account/create-account.dto'
import { UpdateAccountDto } from './dtos/update-account/update-account.dto'
import { AccountEntity, ProgramEntity } from 'src/orm/entities'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AccountMapper } from './mappers/account.mapper'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountDto } from './dtos/account.dto'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'
import { UpdateAccountLinkDto } from './dtos/update-account-link/update-account-link.dto'
import { AccountElementEntity } from '../../orm/entities/account.element.entity'
import { create } from 'domain'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
  ) {}

  public async getAll(programId: number): Promise<AccountDto[]> {
    const accounts = await this.accountRepository.find({
      where: {
        program: {
          id: programId,
        },
      },
    })

    return accounts.map(AccountMapper.toDto)
  }

  public async get(id: number): Promise<AccountDto> {
    const account = await this.accountRepository.findOne({
      where: { id },
    })

    if (!account) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    return AccountMapper.toDto(account)
  }

  public async create(data: CreateAccountDto): Promise<AccountDto> {
    const program = await this.programRepository.findOne({
      where: { id: data.programId },
    })

    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    const accountMapped = AccountMapper.toCreateEntity(program, data)
    const accountSaved = await this.accountRepository.save(accountMapped)

    return AccountMapper.toDto(accountSaved)
  }

  public async update(id: number, data: UpdateAccountDto): Promise<AccountDto> {
    const accountFetched = await this.accountRepository.findOne({
      where: { id: id },
    })

    if (!accountFetched) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    const accountMapped = AccountMapper.toUpdateEntity(accountFetched, data)
    const accountSaved = await this.accountRepository.save(accountMapped)

    return AccountMapper.toDto(accountSaved)
  }

  public async delete(id: number): Promise<void> {
    let account = await this.accountRepository.findOne({
      where: { id: id },
    })

    if (!account) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    await this.accountRepository.delete(id)
  }

  public async updateLinkedAccounts(data: UpdateAccountLinkDto): Promise<AccountDto[]> {
    let accounts = []

    for (let link of data.links) {
      const account = await this.accountRepository.findOne({
        where: { id: link.accountId },
      })

      if (!account) {
        throw new NotFoundException(businessException([ERRORS.account.notFound]))
      }

      const accountEntity = AccountMapper.toUpdateLinkedAccounts(account, link.linkedAccounts)
      const accountSaved = await this.accountRepository.save(accountEntity)

      accounts.push(accountSaved)
    }

    return accounts.map(AccountMapper.toDto)
  }

  public async generateCode(): Promise<string[]> {
    const accounts = await this.accountRepository.find({
      relations: {
        elements: true,
      },
    })

    const code: string[] = []

    for (const account of accounts) {
      const structure = this.createStructure(account.name, account.elements)
      code.concat(...structure)
    }

    return code
  }

  private createStructure(accountName: string, accountElements: AccountElementEntity[]): string[] {
    const structure = ['#[account]', '#[derive(Default)]']
    const structName = `pub struct ${accountName} {`
    structure.push(structName)

    for (const element of accountElements) {
      const field = `  pub ${element.name}: ${element.type},`
      structure.push(field)
    }

    structure.push('}')
    structure.push('')

    return structure
  }
}
