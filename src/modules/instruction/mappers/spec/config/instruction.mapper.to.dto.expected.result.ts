import { InstructionDto } from '../../../dtos/instruction.dto'

export const instructionMapperToDtoExpectedResult: InstructionDto = {
  id: 1,
  name: 'instruction1',
  description: 'instructionDescription1',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}
