import fastify from 'fastify'
import { momoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'

const app = fastify()

app.register(momoriesRoutes)
app.register(cors, {
  origin: true, // Todas URLs de front-end poderão acessar nosso back-end
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Server is running on port 3333')
  })
