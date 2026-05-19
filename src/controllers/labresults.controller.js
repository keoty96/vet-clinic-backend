import prisma from '../lib/db.js'
import supabase from '../lib/supabase.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const getLabResultsByPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params

  const results = await prisma.labResult.findMany({
    where: { patientId }
  })

  res.json(results)
})

export const createLabResult = asyncHandler(async (req, res) => {
  const { patientId } = req.params
  const { date, testName, result, status } = req.body

  if (!date || !testName || !status) {
    return res.status(400).json({ error: 'Date, testName and status are required' })
  }

  let fileUrl = null

  if (req.file) {
    const fileName = `${patientId}-${Date.now()}-${req.file.originalname}`

    const { data: uploadData, error } = await supabase.storage
      .from('lab-results')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype
      })

      console.log('Supabase error:', error)
      console.log('Supabase data:', uploadData)

     if (error) {
      return res.status(500).json({ error: 'File upload failed', details: error.message })
    }

    const { data: urlData } = supabase.storage
      .from('lab-results')
      .getPublicUrl(fileName)

    fileUrl = urlData.publicUrl
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

export const deleteLabResult = asyncHandler(async (req, res) => {
  const { id } = req.params
  await prisma.labResult.delete({ where: { id } })
  res.json({ message: 'Lab result deleted' })
})