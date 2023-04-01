import {
  instructionElementMapperToCreateEntityIncomeData,
  instructionElementMapperToCreateEntityIncomeDataInstruction,
} from './config/instruction-element.mapper.to.create.entity.income.data'
import {
  instructionElementMapperToUpdateEntityIncomeData,
  instructionElementMapperToUpdateEntityIncomeDataInstruction,
} from './config/instruction-element.mapper.to.update.entity.income.data'
import { instructionElementMapperToCreateEntityExpectedResult } from './config/instruction-element.mapper.to.create.entity.expected.result'
import { instructionElementMapperToUpdateEntityExpectedResult } from './config/instruction-element.mapper.to.update.entity.expected.result'
import { instructionElementMapperToDtoIncomeData } from './config/instruction-element.mapper.to.dto.income.data'
import { instructionElementMapperToDtoExpectedResult } from './config/instruction-element.mapper.to.dto.expected.result'
import { InstructionElementMapper } from '../instruction-element.mapper'

describe('InstructionElementMapper', () => {
  describe('toDto', () => {
    it('should return an InstructionElementDto from given InstructionElementEntity', () => {
      const instructionElementDto = InstructionElementMapper.toDto(instructionElementMapperToDtoIncomeData)

      expect(instructionElementDto).toStrictEqual(instructionElementMapperToDtoExpectedResult)
    })
  })

  describe('toCreateEntity', () => {
    it('should return an InstructionElementDto from given InstructionElementEntity', () => {
      const instructionElement = InstructionElementMapper.toCreateEntity(
        instructionElementMapperToCreateEntityIncomeDataInstruction,
        instructionElementMapperToCreateEntityIncomeData,
        null,
      )

      expect(instructionElement).toStrictEqual(instructionElementMapperToCreateEntityExpectedResult)
    })
  })

  describe('toUpdateEntity', () => {
    it('should return an InstructionElementDto from given InstructionElementEntity', () => {
      const instructionElement = InstructionElementMapper.toUpdateEntity(
        instructionElementMapperToUpdateEntityIncomeDataInstruction,
        instructionElementMapperToUpdateEntityIncomeData,
        null,
      )

      expect(instructionElement).toStrictEqual(instructionElementMapperToUpdateEntityExpectedResult)
    })
  })
})
