import {
  programMapperToCreateEntityIncomeData,
  programMapperToCreateEntityIncomeDataUser,
} from './config/program.mapper.to.create.entity.income.data'
import {
  programMapperToUpdateEntityIncomeData,
  programMapperToUpdateEntityIncomeDataProgram,
} from './config/program.mapper.to.update.entity.income.data'
import { programMapperToCreateEntityExpectedResult } from './config/program.mapper.to.create.entity.expected.result'
import { programMapperToUpdateEntityExpectedResult } from './config/program.mapper.to.update.entity.expected.result'
import { programMapperToDtoIncomeData } from './config/program.mapper.to.dto.income.data'
import { programMapperToDtoExpectedResult } from './config/program.mapper.to.dto.expected.result'
import { ProgramMapper } from '../program.mapper'

describe('ProgramMapper', () => {
  describe('toDto', () => {
    it('should return a ProgramDto from given ProgramEntity', () => {
      const programDto = ProgramMapper.toDto(programMapperToDtoIncomeData)

      expect(programDto).toStrictEqual(programMapperToDtoExpectedResult)
    })
  })

  describe('toCreateEntity', () => {
    it('should return a ProgramDto from given ProgramEntity', () => {
      const program = ProgramMapper.toCreateEntity(programMapperToCreateEntityIncomeDataUser, programMapperToCreateEntityIncomeData)

      expect(program).toStrictEqual(programMapperToCreateEntityExpectedResult)
    })
  })

  describe('toUpdateEntity', () => {
    it('should return a ProgramDto from given ProgramEntity', () => {
      const program = ProgramMapper.toUpdateEntity(programMapperToUpdateEntityIncomeDataProgram, programMapperToUpdateEntityIncomeData)

      expect(program).toStrictEqual(programMapperToUpdateEntityExpectedResult)
    })
  })
})
