import 'dotenv/config'

import fastify from 'fastify'
import { momoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(authRoutes)
app.register(momoriesRoutes)
app.register(cors, {
  origin: true, // Todas URLs de front-end poderão acessar nosso back-end
})

app.register(jwt, {
  secret: 'spacetime',
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 Server is running on port 3333')
  })
