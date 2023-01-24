import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'
import { configurePipes } from './bootstrap/pipes'
import { ConfigService } from '@nestjs/config'
import { ApiException, Error } from './common'
import { NestFactory } from '@nestjs/core'
import { env } from 'process'
import { ProgramDto } from './modules/program/dtos/program.dto'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api')

  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'origin',
      'access-control-allow-origin',
      'Accept',
      'DNT',
      'Cookie',
      'Cookie2',
      'Host',
      'Set-Cookie',
      'X-CustomHeader',
      'Keep-Alive',
      'User-Agent',
      'X-Requested-With',
      'If-Modified-Since',
      'Cache-Control',
      'Content-Type',
      'Content-Range',
      'Range',
    ],
  }
  app.enableCors(options)
  app.set('trust proxy', true)
  configurePipes(app)

  if (env.NODE_ENV === 'dev' || env.NODE_ENV === 'staging') {
    const config = new DocumentBuilder()
      .setTitle('Dracaris API')
      .setDescription('For authorization you need authorize with Phantom wallet copy cookie value and paste it below place')
      .setVersion('0.0.1')
      .addCookieAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ApiException, Error],
    })
    SwaggerModule.setup('api-docs', app, document)
  }

  const port = parseInt(configService.get('app.port') as string, 10)

  await app.listen(port)
}

bootstrap()
