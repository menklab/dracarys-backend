import { InstructionEntity } from '../../../../../orm/entities/instruction.entity'

const instructionData = {
  id: 1,
  name: 'instruction2',
  description: 'instructionDescription2',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const instructionMapperToUpdateEntityExpectedResult = Object.assign(new InstructionEntity(), instructionData)
