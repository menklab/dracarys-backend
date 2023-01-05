import { businessException } from 'src/common/errors/utils/business-exception'
import { AccountEntity, ProgramEntity } from 'src/orm/entities'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'
import { AccountDto } from './dtos/account.dto'
import { AccountMapper } from './mappers/account.mapper'
import { UpdateAccountDto } from './dtos/update-account/update-account.dto'
import { CreateAccountDto } from './dtos/create-account/create-account.dto'

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

    const result = accounts.map((account) => {
      return AccountMapper.toDto(account)
    })

    return result
  }

  public async create(data: CreateAccountDto): Promise<AccountDto> {
    const program = await this.programRepository.findOne({
      where: { id: data.programId },
    })

    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    let account = AccountMapper.toCreateEntity(program, data)
    account = await this.accountRepository.save(account)

    return AccountMapper.toDto(account)
  }

  public async update(id: number, data: UpdateAccountDto): Promise<AccountDto> {
    let account = await this.accountRepository.findOne({
      where: { id: id },
    })

    if (!account) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    account = AccountMapper.toUpdateEntity(account, data)
    account = await this.accountRepository.save(account)

    return AccountMapper.toDto(account)
  }

  public async delete(id: number): Promise<void> {
    await this.accountRepository.delete(id)
  }
}
