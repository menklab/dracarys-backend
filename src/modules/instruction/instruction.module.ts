import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { ProgramEntity } from 'src/orm/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { InstructionService } from './instruction.service'
import { InstructionController } from './instruction.controller'

@Module({
  imports: [TypeOrmModule.forFeature([InstructionEntity, ProgramEntity])],
  controllers: [InstructionController],
  providers: [InstructionService],
  exports: [InstructionService],
})
export class InstructionModule {}
