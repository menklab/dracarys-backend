import { ProgramEntity, UserEntity } from 'src/orm/entities'
import { CreateProgramDto } from '../dtos/create-program/create-program.dto'
import { UpdateProgramDto } from '../dtos/update-program/update-program.dto'
import { ProgramDto } from '../dtos/program.dto'

export class ProgramMapper {
  static toDto(entity: ProgramEntity): ProgramDto {
    return {
      id: entity.id,
      name: entity.name,
      coordinates: entity.coordinates,
      center: entity.center,
      zoom: entity.zoom,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toCreateEntity(user: UserEntity, data: CreateProgramDto): ProgramEntity {
    return Object.assign(new ProgramEntity(), { user }, data)
  }

  static toUpdateEntity(entity: ProgramEntity, data: UpdateProgramDto): ProgramEntity {
    return Object.assign(entity, data)
  }
}
