import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getLabResultsByPatient = asyncHandler (async (req, res) => {
  const { patientId } = req.params

  const results = await prisma.labResult.findMany({
    where: { patientId }
  })

  res.json(results)
})

export const createLabResult = asyncHandler (async (req, res) => {
  const { patientId } = req.params
  const { date, testName, result, status, fileUrl } = req.body

  if (!date || !testName || !status) {
    return res.status(400).json({ error: 'Date, testName and status are required' })
  }

  const labResult = await prisma.labResult.create({
    data: {
      patientId,
      date: new Date(date),
      testName,
      result,
      status,
      fileUrl
    }
  })

  res.status(201).json(labResult)
})

export const deleteLabResult = asyncHandler (async (req, res) => {
  const { id } = req.params
  await prisma.labResult.delete({ where: { id } })
  res.json({ message: 'Lab result deleted' })
})