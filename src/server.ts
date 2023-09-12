import { app } from './app'
import { env } from './env'
import { minimatch } from 'minimatch'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
