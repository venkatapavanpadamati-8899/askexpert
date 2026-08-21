import Question from '../models/Question.js'
import Answer from '../models/Answer.js'

export async function listQuestions(req, res) {
  const questions = await Question.find().populate('author', 'name role').sort('-createdAt')
  res.json(questions)
}

export async function createQuestion(req, res) {
  const { title, body, tags = [] } = req.body
  if (!title || !body) return res.status(400).json({ message: 'Title and body are required' })
  res.status(201).json(await Question.create({ title, body, tags, author: req.user._id }))
}

export async function getQuestion(req, res) {
  const question = await Question.findById(req.params.id).populate('author', 'name role')
  if (!question) return res.status(404).json({ message: 'Question not found' })
  const answers = await Answer.find({ question: question._id }).populate('author', 'name role')
  res.json({ question, answers })
}

export async function addAnswer(req, res) {
  const question = await Question.findById(req.params.id)
  if (!question) return res.status(404).json({ message: 'Question not found' })
  if (!req.body.body) return res.status(400).json({ message: 'Answer body is required' })
  const answer = await Answer.create({ question: question._id, author: req.user._id, body: req.body.body })
  await Question.findByIdAndUpdate(question._id, { status: 'answered' })
  res.status(201).json(await answer.populate('author', 'name role'))
}
