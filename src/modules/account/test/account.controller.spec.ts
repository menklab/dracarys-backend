import { AccountController } from '../account.controller'
import { AccountService } from '../account.service'
import { Test } from '@nestjs/testing'
import { CanActivate } from '@nestjs/common'
import { AuthGuard } from '../../app/guards/auth.guard'
import { CreateAccountDto } from '../dtos/create-account/create-account.dto'
import { UpdateAccountDto } from '../dtos/update-account/update-account.dto'
import { AccountDto } from '../dtos/account.dto'
import { UpdateAccountLinkDto } from '../dtos/update-account-link/update-account-link.dto'

describe('AccountController', () => {
  let accountController: AccountController
  let accountService: AccountService

  const mockCreateAccountDto: CreateAccountDto = {
    name: 'Account',
    programId: 1,
  }

  const mockUpdateAccountDto: UpdateAccountDto = {
    name: 'Account',
    coordinates: [1, 5],
  }

  const mockAccountDto: AccountDto = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Account1',
    coordinates: [1, 5],
    linkedAccounts: [5],
  }

  const mockGetAll: AccountDto[] = []

  const mockUpdateAccountLinkDto: UpdateAccountLinkDto = {
    links: [
      {
        accountId: 1,
        linkedAccounts: [1, 5],
      },
    ],
  }

  const mockAccountService = {
    create: jest.fn().mockImplementation((createAccountDto: CreateAccountDto) => {
      return {
        id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...createAccountDto,
      }
    }),
    update: jest.fn().mockImplementation((id: number, updateAccountDto: UpdateAccountDto) => {
      return {
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...updateAccountDto,
      }
    }),
    getAll: jest.fn().mockImplementation((programId: number) => {
      return mockGetAll
    }),
    delete: jest.fn().mockImplementation((id: number) => {}),
    updateLinkedAccounts: jest.fn().mockImplementation((updateAccountLinkDto: UpdateAccountLinkDto) => {
      return [mockAccountDto]
    }),
  }

  beforeEach(async () => {
    const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) }

    const moduleRef = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideProvider(AccountService)
      .useValue(mockAccountService)
      .compile()

    accountService = moduleRef.get<AccountService>(AccountService)
    accountController = moduleRef.get<AccountController>(AccountController)
  })

  it('should be defined', () => {
    expect(accountController).toBeDefined()
  })

  it('should create an account', async () => {
    const account = await accountController.create(mockCreateAccountDto)

    expect(account).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      ...mockCreateAccountDto,
    })
    expect(mockAccountService.create).toHaveBeenCalled()
  })

  it('should update an account', async () => {
    const account = await accountController.update(1, mockUpdateAccountDto)

    expect(account).toEqual({
      id: 1,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      ...mockUpdateAccountDto,
    })
    expect(mockAccountService.update).toHaveBeenCalled()
  })

  it('should get all accounts', async () => {
    const accounts = await accountController.getAll(1)

    expect(accounts).toEqual(mockGetAll)
    expect(mockAccountService.getAll).toBeCalledWith(1)
  })

  it('should delete an account', async () => {
    await accountController.delete(1)

    expect(mockAccountService.delete).toHaveBeenCalled()
    expect(mockAccountService.delete).toBeCalledWith(1)
  })

  it('should update linked accounts', async () => {
    const accounts = await accountController.updateLinkedAccounts(mockUpdateAccountLinkDto)

    expect(accounts).toEqual([mockAccountDto])
    expect(mockAccountService.updateLinkedAccounts).toHaveBeenCalled()
  })
})
