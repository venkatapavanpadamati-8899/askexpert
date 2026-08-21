import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDatabase } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import questionRoutes from './routes/question.routes.js'
import professionalRoutes from './routes/professional.routes.js'
import chatRoutes from './routes/chat.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/professionals', professionalRoutes)
app.use('/api/chats', chatRoutes)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

const port = process.env.PORT || 5000
connectDatabase()
  .then(() => app.listen(port, () => console.log(`AskExpert API running on port ${port}`)))
  .catch((error) => {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  })
