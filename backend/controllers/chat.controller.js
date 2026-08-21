import Chat from '../models/Chat.js'
import Message from '../models/Message.js'

export async function listChats(req, res) {
  res.json(await Chat.find({ participants: req.user._id }).populate('participants', 'name role').sort('-updatedAt'))
}

export async function createChat(req, res) {
  const { participantId, questionId } = req.body
  if (!participantId) return res.status(400).json({ message: 'participantId is required' })
  const chat = await Chat.create({ participants: [req.user._id, participantId], question: questionId })
  res.status(201).json(await chat.populate('participants', 'name role'))
}

export async function listMessages(req, res) {
  const chat = await Chat.findOne({ _id: req.params.id, participants: req.user._id })
  if (!chat) return res.status(404).json({ message: 'Chat not found' })
  res.json(await Message.find({ chat: chat._id }).populate('sender', 'name role').sort('createdAt'))
}

export async function sendMessage(req, res) {
  const chat = await Chat.findOne({ _id: req.params.id, participants: req.user._id })
  if (!chat) return res.status(404).json({ message: 'Chat not found' })
  if (!req.body.body) return res.status(400).json({ message: 'Message body is required' })
  const message = await Message.create({ chat: chat._id, sender: req.user._id, body: req.body.body })
  await Chat.findByIdAndUpdate(chat._id, { lastMessage: req.body.body })
  res.status(201).json(await message.populate('sender', 'name role'))
}
