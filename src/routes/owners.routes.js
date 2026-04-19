import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner
} from '../controllers/owners.controller.js'

const router = Router()

router.use(protect)

router.get('/', getAllOwners)
router.get('/:id', getOwnerById)
router.post('/', createOwner)
router.put('/:id', updateOwner)
router.delete('/:id', deleteOwner)

export default router