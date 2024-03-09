import { NestFactory } from '@nestjs/core'
import serverlessExpress from '@codegenie/serverless-express'
import { Callback, Context, Handler } from 'aws-lambda'
import { AppModule } from './app.module'

let server: Handler

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule)
  await app.init()

  const expressApp = app.getHttpAdapter().getInstance()
  return serverlessExpress({ app: expressApp })
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  server = server ?? (await bootstrap())

  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUp - Lambda warmed!')
    return {}
  }

  return server(event, context, callback)
}
