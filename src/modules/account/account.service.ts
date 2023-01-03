import { CreateAccountDto } from "./dtos/create-account/create-account.dto"
import { UpdateAccountDto } from "./dtos/update-account/update-account.dto"
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Account } from "src/orm/entities"
import { Repository } from "typeorm"

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
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

  public async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const result = await this.accountRepository.save(createAccountDto)

    return result
  }

  public async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id }
    })

    if (!account) {
      // TODO: place to ERRORS_MESSAGES
      throw new NotFoundException('Account not found')
    }

    const result = this.accountRepository.save({ ...account, ...updateAccountDto })

    return result
  }

  public async delete(id: number): Promise<void> {
    await this.accountRepository.delete(id)
  }

}
