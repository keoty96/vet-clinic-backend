import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'

import authRoutes from './routes/auth.routes.js'
import ownerRoutes from './routes/owners.routes.js'
import patientRoutes from './routes/patients.routes.js'
import vaccineRoutes from './routes/vaccines.routes.js'
import examRoutes from './routes/exams.routes.js'
import labResultRoutes from './routes/labresults.routes.js'
import prescriptionRoutes from './routes/prescriptions.routes.js'
import appointmentRoutes from './routes/appointments.routes.js'
import surgeryRoutes from './routes/surgeries.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// --- Middleware ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
})
app.use(limiter)

// --- Routes ---
app.use('/api/auth', authRoutes)
app.use('/api/owners', ownerRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/patients/:patientId/vaccines', vaccineRoutes)
app.use('/api/patients/:patientId/exams', examRoutes)
app.use('/api/patients/:patientId/labresults', labResultRoutes)
app.use('/api/patients/:patientId/prescriptions', prescriptionRoutes)
app.use('/api/patients/:patientId/appointments', appointmentRoutes)
app.use('/api/patients/:patientId/surgeries', surgeryRoutes)

// --- Health check ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})