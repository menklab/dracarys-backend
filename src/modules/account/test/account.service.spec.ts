import { AccountService } from '../account.service'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AccountEntity, ProgramEntity } from '../../../orm/entities'
import {CreateAccountDto} from "../dtos/create-account/create-account.dto";
import {AccountDto} from "../dtos/account.dto";

describe('Account Service', () => {
  let accountService: AccountService

  const mockAccountRepository = {
    save: jest.fn().mockImplementation((createAccountDto: CreateAccountDto) => {
      return {
        ...mockAccountDto,
        name: createAccountDto.name,
      }
    }),
    find: jest.fn().mockImplementation(() => mockGetAll),
    findOne: jest.fn().mockImplementation((id: number) => {
      return {
        ...mockAccountDto,
        id
      }
    })
  }

  const mockProgramRepository = {
    findOne: jest.fn().mockImplementation((id: number) => {
      return {
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Program',
      }
    })
  }

  const mockCreateAccountDto: CreateAccountDto = {
    name: 'Account',
    programId: 1,
  }

  const mockAccountDto: AccountDto = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Account',
    linkedAccounts: [],
    coordinates: [],
  }

  const mockGetAll: AccountDto[] = [mockAccountDto]

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: mockAccountRepository,
        },
        {
          provide: getRepositoryToken(ProgramEntity),
          useValue: mockProgramRepository,
        },
      ],
    }).compile()

    accountService = moduleRef.get<AccountService>(AccountService)
  })

  it('should be defined', () => {
    expect(accountService).toBeDefined()
  })

  it('should create an account', async () => {
    const account = await accountService.create(mockCreateAccountDto)

    expect(account).toEqual(mockAccountDto)
    expect(mockProgramRepository.findOne).toHaveBeenCalled()
    expect(mockAccountRepository.save).toHaveBeenCalled()
  })

  it('should get all accounts', async () => {
    const accounts = await accountService.getAll(1)

    expect(accounts).toEqual(mockGetAll)
  })

  it('should get an account', async () => {
    const account = await accountService.get(1)

    expect(account).toEqual(mockAccountDto)
  })
})
