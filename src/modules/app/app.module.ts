import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis'
import Redis from 'ioredis'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { TerminusModule } from '@nestjs/terminus'
import { AuthModule } from '../auth/auth.module'
import { AppController } from './app.controller'
import { config } from '../../config'
import { UserModule } from '../user/user.module'
import { ProgramModule } from '../program/program.module'

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
    AuthModule,
    UserModule,
    ProgramModule,
  ],
  controllers: [AppController],
  providers: [],
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
          saveUninitialized: false,
          secret: this.configService.get('auth.sessionSecret') as string,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
      )
      .forRoutes('*')
  }
}
