import { Router } from 'express'
import Professional from '../models/Professional.js'

const router = Router()
router.get('/', async (req, res) => res.json(await Professional.find().populate('user', 'name avatar')))
router.get('/:id', async (req, res) => {
  const professional = await Professional.findById(req.params.id).populate('user', 'name avatar')
  if (!professional) return res.status(404).json({ message: 'Professional not found' })
  res.json(professional)
})
export default router
