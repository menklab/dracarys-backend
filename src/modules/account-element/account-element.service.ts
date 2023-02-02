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

  public async getAll(accountId: number, userId: number): Promise<AccountElementDto[]> {
    const accountElements = await this.accountElementRepository.find({
      where: {
        account: {
          id: accountId,
          program: {
            user: {
              id: userId,
            },
          },
        },
      },
    })

    return accountElements.map(AccountElementMapper.toDto)
  }

  public async get(id: number, userId: number): Promise<AccountElementDto> {
    const accountElement = await this.accountElementRepository.findOne({
      where: {
        id,
        account: {
          program: {
            user: {
              id: userId,
            },
          },
        },
      },
    })

    if (!accountElement) {
      throw new NotFoundException(businessException([ERRORS.accountElement.notFound]))
    }

    return AccountElementMapper.toDto(accountElement)
  }

  public async create(data: CreateAccountElementDto): Promise<AccountElementDto> {
    const account = await this.accountRepository.findOne({
      where: { id: data.accountId },
      relations: {
        elements: true,
      },
    })

    if (!account) {
      throw new NotFoundException(businessException([ERRORS.account.notFound]))
    }

    const accountElementEntity = AccountElementMapper.toCreateEntity(account, data)
    const accountElementSaved = await this.accountElementRepository.save(accountElementEntity)

    account.addElement(accountElementSaved)
    await this.accountRepository.save(account)

    return AccountElementMapper.toDto(accountElementSaved)
  }

  public async update(id: number, data: UpdateAccountElementDto): Promise<AccountElementDto> {
    const accountElement = await this.accountElementRepository.findOne({
      where: { id: id },
    })

    if (!accountElement) {
      throw new NotFoundException(businessException([ERRORS.accountElement.notFound]))
    }

    const accountElementEntity = AccountElementMapper.toUpdateEntity(accountElement, data)
    const accountElementSaved = await this.accountElementRepository.save(accountElementEntity)

    return AccountElementMapper.toDto(accountElementSaved)
  }

  public async delete(id: number): Promise<void> {
    const accountElement = await this.accountElementRepository.findOne({
      where: { id: id },
    })

    if (!accountElement) {
      throw new NotFoundException(businessException([ERRORS.accountElement.notFound]))
    }

    await this.accountElementRepository.delete(id)
  }
}
