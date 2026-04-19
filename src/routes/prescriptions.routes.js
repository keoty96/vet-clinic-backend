import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getPrescriptionsByPatient, createPrescription, deletePrescription } from '../controllers/prescriptions.controller.js'

const router = Router({ mergeParams: true })

router.use(protect)

router.get('/', getPrescriptionsByPatient)
router.post('/', createPrescription)
router.delete('/:id', deletePrescription)

export default router