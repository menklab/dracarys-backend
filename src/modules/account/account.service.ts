import { toCreateAccountEntity, toUpdateAccountEntity } from './mappers/account.mapper'
import { businessException } from 'src/common/errors/utils/business-exception'
import { CreateAccountDto } from './dtos/create-account/create-account.dto'
import { UpdateAccountDto } from './dtos/update-account/update-account.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Program } from 'src/orm/entities'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>
  ) {
  }

  public async getAll(program_id: number): Promise<Account[]> {
    const result = await this.accountRepository.find(
      {
        where: {
          program: {
            id: program_id
          }
        }
      }
    )

    return result
  }

  public async create(data: CreateAccountDto): Promise<Account> {
    const program = await this.programRepository.findOne({
      where: { id: data.program_id }
    })

    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    const account = toCreateAccountEntity(program, data)
    const result = await this.accountRepository.save(account)

    return result
  }

  public async update(id: number, data: UpdateAccountDto): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: id }
    })

    if (!account) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    toUpdateAccountEntity(account, data)

    const result = this.accountRepository.save(account)

    return result
  }

  public async delete(id: number): Promise<void> {
    await this.accountRepository.delete(id)
  }

}
