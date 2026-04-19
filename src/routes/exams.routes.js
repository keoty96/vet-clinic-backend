import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getExamsByPatient, createExam, updateExam, deleteExam } from '../controllers/exams.controller.js'

const router = Router({ mergeParams: true })

router.use(protect)

router.get('/', getExamsByPatient)
router.post('/', createExam)
router.put('/:id', updateExam)
router.delete('/:id', deleteExam)

export default router