import { AccountController } from "./account.controller"
import { AccountService } from "./account.service"
import { UserModule } from "../user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Account } from "../../orm/entities"
import { Module } from "@nestjs/common"

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    UserModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})

export class AccountModule { }
