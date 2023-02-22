import { InstructionElementEntity } from 'src/orm/entities/instruction.element.entity'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { AccountEntity } from 'src/orm/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { InstructionElementService } from './instruction-element.service'
import { InstructionElementController } from './instruction-element.controller'

@Module({
  imports: [TypeOrmModule.forFeature([InstructionEntity, InstructionElementEntity, AccountEntity])],
  controllers: [InstructionElementController],
  providers: [InstructionElementService],
  exports: [InstructionElementService],
})
export class InstructionElementModule {}
