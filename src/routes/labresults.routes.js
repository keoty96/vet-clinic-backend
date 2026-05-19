import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getLabResultsByPatient, createLabResult, deleteLabResult } from '../controllers/labresults.controller.js'
import { upload } from '../middleware/upload.middleware.js'

const router = Router({ mergeParams: true })

router.use(protect)

router.get('/', getLabResultsByPatient)
router.post('/', upload.single('file'), createLabResult)
router.delete('/:id', deleteLabResult)

export default router