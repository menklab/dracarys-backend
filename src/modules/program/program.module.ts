import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProgramEntity } from '../../orm/entities'
import { UserModule } from '../user/user.module'
import { ProgramService } from './program.service'
import { ProgramController } from './program.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity]), UserModule],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
