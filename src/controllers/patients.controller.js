import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getAllPatients = asyncHandler (async (req, res) => {
  const patients = await prisma.patient.findMany({
    include: { owner: true }
  })
  res.json(patients)
})

export const getPatientById = asyncHandler (async (req, res) => {
  const { id } = req.params

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      owner: true,
      vaccines: true,
      exams: true,
      labResults: true,
      prescriptions: true,
      appointments: true,
      surgeries: true
    }
  })

  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' })
  }

  res.json(patient)
})

export const createPatient = asyncHandler (async (req, res) => {
  const { ownerId, name, species, breed, sex, birthDate, weightKg, notes } = req.body

  if (!ownerId || !name || !species || !sex) {
    return res.status(400).json({ error: 'ownerId, name, species and sex are required' })
  }

  const ownerExists = await prisma.owner.findUnique({ where: { id: ownerId } })

  if (!ownerExists) {
    return res.status(404).json({ error: 'Owner not found' })
  }

  const patient = await prisma.patient.create({
    data: {
      ownerId,
      name,
      species,
      breed,
      sex,
      birthDate: birthDate ? new Date(birthDate) : null,
      weightKg,
      notes
    }
  })

  res.status(201).json(patient)
})

export const updatePatient = asyncHandler (async (req, res) => {
  const { id } = req.params
  const { name, species, breed, sex, birthDate, weightKg, notes } = req.body

  const patient = await prisma.patient.update({
    where: { id },
    data: {
      name,
      species,
      breed,
      sex,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      weightKg,
      notes
    }
  })

  res.json(patient)
})

export const deletePatient = asyncHandler (async (req, res) => {
  const { id } = req.params

  await prisma.patient.delete({ where: { id } })

  res.json({ message: 'Patient deleted' })
})