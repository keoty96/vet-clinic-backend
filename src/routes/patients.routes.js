import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from '../controllers/patients.controller.js'

const router = Router()

router.use(protect)

router.get('/', getAllPatients)
router.get('/:id', getPatientById)
router.post('/', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)

export default router