import prisma from '../lib/db.js'
import supabase from '../lib/supabase.js'
import { asyncHandler } from '../lib/asyncHandler.js'

export const createLabResult = asyncHandler(async (req, res) => {
  const { patientId } = req.params
  const { date, testName, result, status } = req.body

  if (!date || !testName || !status) {
    return res.status(400).json({ error: 'Date, testName and status are required' })
  }

  let fileUrl = null

  if (req.file) {
    const fileName = `${patientId}/${Date.now()}-${req.file.originalname}`

    const { error } = await supabase.storage
      .from('lab-results')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype
      })

    if (error) {
      return res.status(500).json({ error: 'File upload failed' })
    }

    const { data } = supabase.storage
      .from('lab-results')
      .getPublicUrl(fileName)

    fileUrl = data.publicUrl
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