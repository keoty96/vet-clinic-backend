import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getSurgeriesByPatient, createSurgery, deleteSurgery } from '../controllers/surgeries.controller.js'

const router = Router({ mergeParams: true })

router.use(protect)

router.get('/', getSurgeriesByPatient)
router.post('/', createSurgery)
router.delete('/:id', deleteSurgery)

export default router