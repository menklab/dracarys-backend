import { CreateProgramDto } from '../dtos/create-program/create-program.dto'
import { UpdateProgramDto } from '../dtos/update-program/update-program.dto'
import { Program, User } from 'src/orm/entities'
import { ProgramDto } from '../dtos/program.dto'

export function toProgramsDto(programs: Program[]): ProgramDto[] {
  return programs.map((program) => {
    return toProgramDto(program)
  })
}

export function toProgramDto(program: Program): ProgramDto {
  return {
    id: program.id,
    name: program.name,
    created_at: program.created_at,
    updated_at: program.updated_at
  }
}

export function toCreateProgramEntity(user: User, data: CreateProgramDto): Program {
  let result = new Program()
  result.user = user
  result.name = data.name

  return result
}

export function toUpdateProgramEntity(program: Program, data: UpdateProgramDto): Program {
  program.name = data.name

  return program
}
