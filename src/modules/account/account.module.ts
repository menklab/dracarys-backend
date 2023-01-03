import { AccountController } from './account.controller'
import { Account, Program } from '../../orm/entities'
import { AccountService } from './account.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Program])
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})

export class AccountModule { }
