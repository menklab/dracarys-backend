import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from 'src/orm/entities/session.entity'
import { SessionService } from './session.service'

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
