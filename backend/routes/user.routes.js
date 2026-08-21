import { Router } from 'express'
import { getProfile, listProfessionals, updateProfile } from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.get('/professionals', listProfessionals)
export default router
