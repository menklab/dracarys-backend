import { AccountEntity, ProgramEntity } from '../../orm/entities'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, ProgramEntity])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
