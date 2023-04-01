import {
  instructionMapperToCreateEntityIncomeData,
  instructionMapperToCreateEntityIncomeDataProgram,
} from './config/instruction.mapper.to.create.entity.income.data'
import {
  instructionMapperToUpdateEntityIncomeData,
  instructionMapperToUpdateEntityIncomeDataInstruction,
} from './config/instruction.mapper.to.update.entity.income.data'
import { instructionMapperToCreateEntityExpectedResult } from './config/instruction.mapper.to.create.entity.expected.result'
import { instructionMapperToUpdateEntityExpectedResult } from './config/instruction.mapper.to.update.entity.expected.result'
import { instructionMapperToDtoIncomeData } from './config/instruction.mapper.to.dto.income.data'
import { instructionMapperToDtoExpectedResult } from './config/instruction.mapper.to.dto.expected.result'
import { InstructionMapper } from '../instruction.mapper'

describe('InstructionMapper', () => {
  describe('toDto', () => {
    it('should return an InstructionDto from given InstructionEntity', () => {
      const instructionDto = InstructionMapper.toDto(instructionMapperToDtoIncomeData)

      expect(instructionDto).toStrictEqual(instructionMapperToDtoExpectedResult)
    })
  })

  describe('toCreateEntity', () => {
    it('should return an InstructionDto from given InstructionEntity', () => {
      const instruction = InstructionMapper.toCreateEntity(
        instructionMapperToCreateEntityIncomeDataProgram,
        instructionMapperToCreateEntityIncomeData,
      )

      expect(instruction).toStrictEqual(instructionMapperToCreateEntityExpectedResult)
    })
  })

  describe('toUpdateEntity', () => {
    it('should return an InstructionDto from given InstructionEntity', () => {
      const instruction = InstructionMapper.toUpdateEntity(
        instructionMapperToUpdateEntityIncomeDataInstruction,
        instructionMapperToUpdateEntityIncomeData,
      )

      expect(instruction).toStrictEqual(instructionMapperToUpdateEntityExpectedResult)
    })
  })
})
