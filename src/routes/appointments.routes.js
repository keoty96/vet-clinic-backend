import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getAppointmentsByPatient, createAppointment, updateAppointmentStatus, deleteAppointment } from '../controllers/appointments.controller.js'

const router = Router({ mergeParams: true })

router.use(protect)

router.get('/', getAppointmentsByPatient)
router.post('/', createAppointment)
router.patch('/:id/status', updateAppointmentStatus)
router.delete('/:id', deleteAppointment)

export default router