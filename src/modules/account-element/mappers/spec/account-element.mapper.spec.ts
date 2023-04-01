import {
  accountElementMapperToCreateEntityIncomeData,
  accountElementMapperToCreateEntityIncomeDataAccount,
} from './config/account-element.mapper.to.create.entity.income.data'
import {
  accountElementMapperToUpdateEntityIncomeData,
  accountElementMapperToUpdateEntityIncomeDataAccount,
} from './config/account-element.mapper.to.update.entity.income.data'
import { accountElementMapperToCreateEntityExpectedResult } from './config/account-element.mapper.to.create.entity.expected.result'
import { accountElementMapperToUpdateEntityExpectedResult } from './config/account-element.mapper.to.update.entity.expected.result'
import { accountElementMapperToDtoIncomeData } from './config/account-element.mapper.to.dto.income.data'
import { accountElementMapperToDtoExpectedResult } from './config/account-element.mapper.to.dto.expected.result'
import { AccountElementMapper } from '../account-element.mapper'

describe('AccountElementMapper', () => {
  describe('toDto', () => {
    it('should return a AccountElementDto from given AccountElementEntity', () => {
      const accountElementDto = AccountElementMapper.toDto(accountElementMapperToDtoIncomeData)

      expect(accountElementDto).toStrictEqual(accountElementMapperToDtoExpectedResult)
    })
  })

  describe('toCreateEntity', () => {
    it('should return a AccountElementDto from given AccountElementEntity', () => {
      const accountElement = AccountElementMapper.toCreateEntity(
        accountElementMapperToCreateEntityIncomeDataAccount,
        accountElementMapperToCreateEntityIncomeData,
      )

      expect(accountElement).toStrictEqual(accountElementMapperToCreateEntityExpectedResult)
    })
  })

  describe('toUpdateEntity', () => {
    it('should return a AccountElementDto from given AccountElementEntity', () => {
      const accountElement = AccountElementMapper.toUpdateEntity(
        accountElementMapperToUpdateEntityIncomeDataAccount,
        accountElementMapperToUpdateEntityIncomeData,
      )

      expect(accountElement).toStrictEqual(accountElementMapperToUpdateEntityExpectedResult)
    })
  })
})
