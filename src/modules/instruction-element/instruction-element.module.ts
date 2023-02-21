import { InstructionElementEntity } from 'src/orm/entities/instruction.element.entity'
import { InstructionElementController } from './instruction-element.controller'
import { InstructionElementService } from './instruction-element.service'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { AccountEntity } from 'src/orm/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([InstructionEntity, InstructionElementEntity, AccountEntity])],
  controllers: [InstructionElementController],
  providers: [InstructionElementService],
  exports: [InstructionElementService],
})
export class InstructionElementModule {}
