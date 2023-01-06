import { CreateAccountElementDto } from './dtos/create-account-element/create-account-element.dto'
import { UpdateAccountElementDto } from './dtos/update-account-element/update-account-element.dto'
import { businessException } from 'src/common/errors/utils/business-exception'
import { AccountElementEntity } from 'src/orm/entities/account.element.entity'
import { AccountElementMapper } from './mappers/account-element.mapper'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AccountElementDto } from './dtos/account-element.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/orm/entities'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'

@Injectable()
export class AccountElementService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(AccountElementEntity)
    private readonly accountElementRepository: Repository<AccountElementEntity>,
  ) {}

  public async getAll(accountId: number): Promise<AccountElementDto[]> {
    const accountElements = await this.accountElementRepository.find({
      where: {
        account: {
          id: accountId,
        },
      },
    })

    return accountElements.map(AccountElementMapper.toDto)
  }

  public async get(id: number): Promise<AccountElementDto> {
    const accountElement = await this.accountElementRepository.findOne({
      where: { id },
    })

    if (!accountElement) {
      throw new NotFoundException(businessException([ERRORS.accountElement.notFound]))
    }

    return AccountElementMapper.toDto(accountElement)
  }

  public async create(data: CreateAccountElementDto): Promise<AccountElementDto> {
    const account = await this.accountRepository.findOne({
      where: { id: data.accountId },
    })

    if (!account) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    const accountElementMapped = AccountElementMapper.toCreateEntity(account, data)
    const accountElementSaved = await this.accountElementRepository.save(accountElementMapped)

    return AccountElementMapper.toDto(accountElementSaved)
  }

  public async update(id: number, data: UpdateAccountElementDto): Promise<AccountElementDto> {
    const accountElementFetched = await this.accountElementRepository.findOne({
      where: { id: id },
    })

    if (!accountElementFetched) {
      throw new NotFoundException(businessException([ERRORS.accountElement.notFound]))
    }

    const accountElementMapped = AccountElementMapper.toUpdateEntity(accountElementFetched, data)
    const accountElementSaved = await this.accountElementRepository.save(accountElementMapped)

    return AccountElementMapper.toDto(accountElementSaved)
  }

  public async delete(id: number): Promise<void> {
    let accountElement = await this.accountElementRepository.findOne({
      where: { id: id },
    })

    if (!accountElement) {
      throw new NotFoundException(businessException([ERRORS.accountElement.notFound]))
    }

    await this.accountElementRepository.delete(id)
  }
}
