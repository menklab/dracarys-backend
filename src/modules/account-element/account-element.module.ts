import { AccountElementEntity } from 'src/orm/entities/account.element.entity'
import { AccountElementController } from './account-element.controller'
import { AccountElementService } from './account-element.service'
import { AccountEntity } from '../../orm/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, AccountElementEntity])],
  controllers: [AccountElementController],
  providers: [AccountElementService],
  exports: [AccountElementService],
})
export class AccountElementModule {}
