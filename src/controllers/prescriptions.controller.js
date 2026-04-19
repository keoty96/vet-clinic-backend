import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getPrescriptionsByPatient = asyncHandler (async (req, res) => {
  const { patientId } = req.params

  const prescriptions = await prisma.prescription.findMany({
    where: { patientId },
    include: { exam: true }
  })

  res.json(prescriptions)
})

export const createPrescription = asyncHandler (async (req, res) => {
  const { patientId } = req.params
  const { examId, medication, dosage, frequency, startDate, endDate, notes } = req.body

  if (!medication) {
    return res.status(400).json({ error: 'Medication is required' })
  }

  const prescription = await prisma.prescription.create({
    data: {
      patientId,
      examId: examId || null,
      medication,
      dosage,
      frequency,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      notes
    }
  })

  res.status(201).json(prescription)
})

export const deletePrescription = asyncHandler (async (req, res) => {
  const { id } = req.params
  await prisma.prescription.delete({ where: { id } })
  res.json({ message: 'Prescription deleted' })
})