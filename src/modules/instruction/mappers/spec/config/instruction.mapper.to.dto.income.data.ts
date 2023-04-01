import { InstructionEntity } from '../../../../../orm/entities/instruction.entity'

const instructionData = {
  id: 1,
  name: 'instruction1',
  description: 'instructionDescription1',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const instructionMapperToDtoIncomeData = Object.assign(new InstructionEntity(), instructionData)
