import {
  accountMapperToCreateEntityIncomeData,
  accountMapperToCreateEntityIncomeDataProgram,
} from './config/account.mapper.to.create.entity.income.data'
import {
  accountMapperToUpdateEntityIncomeData,
  accountMapperToUpdateEntityIncomeDataAccount,
} from './config/account.mapper.to.update.entity.income.data'
import { accountMapperToCreateEntityExpectedResult } from './config/account.mapper.to.create.entity.expected.result'
import { accountMapperToUpdateEntityExpectedResult } from './config/account.mapper.to.update.entity.expected.result'
import { accountMapperToDtoIncomeData } from './config/account.mapper.to.dto.income.data'
import { accountMapperToDtoExpectedResult } from './config/account.mapper.to.dto.expected.result'
import { AccountMapper } from '../account.mapper'

describe('AccountMapper', () => {
  describe('toDto', () => {
    it('should return a AccountDto from given AccountEntity', () => {
      const accountDto = AccountMapper.toDto(accountMapperToDtoIncomeData)

      expect(accountDto).toStrictEqual(accountMapperToDtoExpectedResult)
    })
  })

  describe('toCreateEntity', () => {
    it('should return a AccountDto from given AccountEntity', () => {
      const account = AccountMapper.toCreateEntity(accountMapperToCreateEntityIncomeDataProgram, accountMapperToCreateEntityIncomeData)

      expect(account).toStrictEqual(accountMapperToCreateEntityExpectedResult)
    })
  })

  describe('toUpdateEntity', () => {
    it('should return a AccountDto from given AccountEntity', () => {
      const account = AccountMapper.toUpdateEntity(accountMapperToUpdateEntityIncomeDataAccount, accountMapperToUpdateEntityIncomeData)

      expect(account).toStrictEqual(accountMapperToUpdateEntityExpectedResult)
    })
  })
})
