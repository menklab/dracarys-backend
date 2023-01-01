import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { env } from 'process'
import { AppModule } from './modules/app/app.module'
import { configurePipes } from './bootstrap/pipes'
import { ApiException, Error } from './common'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api')
  app.enableCors()
  configurePipes(app)

  if (env.NODE_ENV === 'dev' || env.NODE_ENV === 'staging') {
    const config = new DocumentBuilder().setTitle('Dracaris API').setVersion('0.0.1').addBearerAuth().build()
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ApiException, Error],
    })
    SwaggerModule.setup('api-docs', app, document)
  }

  const port = parseInt(configService.get('app.port') as string, 10)

  await app.listen(port)
}

bootstrap()
