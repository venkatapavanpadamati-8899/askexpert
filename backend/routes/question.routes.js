import { Router } from 'express'
import { addAnswer, createQuestion, getQuestion, listQuestions } from '../controllers/question.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()
router.get('/', listQuestions)
router.post('/', protect, createQuestion)
router.get('/:id', getQuestion)
router.post('/:id/answers', protect, addAnswer)
export default router
