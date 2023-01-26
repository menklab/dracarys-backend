import { InstructionElementModule } from '../instruction-element/instruction-element.module'
import { AccountElementModule } from '../account-element/account-element.module'
import { HttpException, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { InstructionModule } from '../instruction/instruction.module'
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AccountModule } from '../account/account.module'
import { ProgramModule } from '../program/program.module'
import { TerminusModule } from '@nestjs/terminus'
import { AppController } from './app.controller'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import RedisStore from 'connect-redis'
import { config } from '../../config'
import session from 'express-session'
import Redis from 'ioredis'
import { RavenInterceptor, RavenModule } from 'nest-raven'

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService) {
        return configService.get('database')
      },
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          config: {
            host: configService.get('redis.host'),
            password: configService.get('redis.password'),
            username: configService.get('redis.username'),
            port: configService.get('redis.port'),
            tls: {},
          },
        }
      },
    }),
    RavenModule,
    AuthModule,
    UserModule,
    ProgramModule,
    AccountModule,
    AccountElementModule,
    InstructionModule,
    InstructionElementModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (exception: HttpException) => 500 > exception.getStatus(),
          },
        ],
      }),
    },
  ],
})
export class AppModule implements NestModule {
  private readonly redis: Redis

  constructor(private readonly redisService: RedisService, private readonly configService: ConfigService) {
    this.redis = redisService.getClient()
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: this.configService.get('redis.logging'),
          }),
          saveUninitialized: true,
          secret: this.configService.get('auth.sessionSecret') as string,
          resave: true,
          cookie: {
            sameSite: 'strict',
            httpOnly: false,
            domain: 'dracarys.digital',
            maxAge: 6000000,
          },
        }),
      )
      .forRoutes('*')
  }
}
