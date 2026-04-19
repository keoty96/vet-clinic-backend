import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getVaccinesByPatient = asyncHandler (async (req, res) => {
  const { patientId } = req.params

  const vaccines = await prisma.vaccine.findMany({
    where: { patientId }
  })

  res.json(vaccines)
})

export const createVaccine = asyncHandler (async (req, res) => {
  const { patientId } = req.params
  const { name, dateGiven, nextDueDate, batchNumber, notes } = req.body

  if (!name || !dateGiven) {
    return res.status(400).json({ error: 'Name and dateGiven are required' })
  }

  const vaccine = await prisma.vaccine.create({
    data: {
      patientId,
      name,
      dateGiven: new Date(dateGiven),
      nextDueDate: nextDueDate ? new Date(nextDueDate) : null,
      batchNumber,
      notes
    }
  })

  res.status(201).json(vaccine)
})

export const updateVaccine = asyncHandler (async (req, res) => {
  const { id } = req.params
  const { name, dateGiven, nextDueDate, batchNumber, notes } = req.body

  const vaccine = await prisma.vaccine.update({
    where: { id },
    data: {
      name,
      dateGiven: dateGiven ? new Date(dateGiven) : undefined,
      nextDueDate: nextDueDate ? new Date(nextDueDate) : undefined,
      batchNumber,
      notes
    }
  })

  res.json(vaccine)
})

export const deleteVaccine = asyncHandler (async (req, res) => {
  const { id } = req.params
  await prisma.vaccine.delete({ where: { id } })
  res.json({ message: 'Vaccine deleted' })
})