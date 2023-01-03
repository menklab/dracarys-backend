import { ProgramController } from './program.controller'
import { ProgramService } from './program.service'
import { UserModule } from '../user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Program } from '../../orm/entities'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Program]), UserModule],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [ProgramService]
})

export class ProgramModule { }
