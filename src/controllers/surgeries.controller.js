import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getSurgeriesByPatient = asyncHandler (async (req, res) => {
  const { patientId } = req.params

  const surgeries = await prisma.surgery.findMany({
    where: { patientId }
  })

  res.json(surgeries)
})

export const createSurgery = asyncHandler (async (req, res) => {
  const { patientId } = req.params
  const { date, procedureName, vetName, notes, outcome } = req.body

  if (!date || !procedureName) {
    return res.status(400).json({ error: 'Date and procedureName are required' })
  }

  const surgery = await prisma.surgery.create({
    data: {
      patientId,
      date: new Date(date),
      procedureName,
      vetName,
      notes,
      outcome
    }
  })

  res.status(201).json(surgery)
})

export const deleteSurgery = asyncHandler (async (req, res) => {
  const { id } = req.params
  await prisma.surgery.delete({ where: { id } })
  res.json({ message: 'Surgery deleted' })
})