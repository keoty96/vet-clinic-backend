import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getAppointmentsByPatient = asyncHandler (async (req, res) => {
  const { patientId } = req.params

  const appointments = await prisma.appointment.findMany({
    where: { patientId },
    orderBy: { scheduledAt: 'asc' }
  })

  res.json(appointments)
})

export const createAppointment = asyncHandler (async (req, res) => {
  const { patientId } = req.params
  const { scheduledAt, reason, notes } = req.body

  if (!scheduledAt) {
    return res.status(400).json({ error: 'scheduledAt is required' })
  }

  const appointment = await prisma.appointment.create({
    data: {
      patientId,
      scheduledAt: new Date(scheduledAt),
      reason,
      notes,
      status: 'pending'
    }
  })

  res.status(201).json(appointment)
})

export const updateAppointmentStatus = asyncHandler (async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const allowed = ['pending', 'confirmed', 'completed', 'cancelled']

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` })
  }

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status }
  })

  res.json(appointment)
})

export const deleteAppointment = asyncHandler (async (req, res) => {
  const { id } = req.params
  await prisma.appointment.delete({ where: { id } })
  res.json({ message: 'Appointment deleted' })
})