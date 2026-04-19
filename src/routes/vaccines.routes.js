import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getVaccinesByPatient, createVaccine, updateVaccine, deleteVaccine } from '../controllers/vaccines.controller.js'

const router = Router({ mergeParams: true })

router.use(protect)

router.get('/', getVaccinesByPatient)
router.post('/', createVaccine)
router.put('/:id', updateVaccine)
router.delete('/:id', deleteVaccine)

export default router