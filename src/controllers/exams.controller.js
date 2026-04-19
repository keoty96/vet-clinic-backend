import prisma from '../lib/db.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getExamsByPatient = asyncHandler (async (req, res) => {
  const { patientId } = req.params

  const exams = await prisma.exam.findMany({
    where: { patientId },
    include: { prescriptions: true }
  })

  res.json(exams)
})

export const createExam = asyncHandler (async (req, res) => {
  const { patientId } = req.params
  const { date, reason, diagnosis, notes, vetName } = req.body

  if (!date || !reason) {
    return res.status(400).json({ error: 'Date and reason are required' })
  }

  const exam = await prisma.exam.create({
    data: {
      patientId,
      date: new Date(date),
      reason,
      diagnosis,
      notes,
      vetName
    }
  })

  res.status(201).json(exam)
})

export const updateExam = asyncHandler (async (req, res) => {
  const { id } = req.params
  const { date, reason, diagnosis, notes, vetName } = req.body

  const exam = await prisma.exam.update({
    where: { id },
    data: {
      date: date ? new Date(date) : undefined,
      reason,
      diagnosis,
      notes,
      vetName
    }
  })

  res.json(exam)
})

export const deleteExam = asyncHandler (async (req, res) => {
  const { id } = req.params
  await prisma.exam.delete({ where: { id } })
  res.json({ message: 'Exam deleted' })
})