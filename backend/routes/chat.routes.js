import { Router } from 'express'
import { createChat, listChats, listMessages, sendMessage } from '../controllers/chat.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()
router.use(protect)
router.get('/', listChats)
router.post('/', createChat)
router.get('/:id/messages', listMessages)
router.post('/:id/messages', sendMessage)
export default router
