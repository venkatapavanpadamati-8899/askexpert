import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Professional from '../models/Professional.js'

function tokenFor(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export async function register(req, res) {
  const { name, email, password, role = 'user', phone, profession } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' })
  if (!['user', 'professional'].includes(role)) return res.status(400).json({ message: 'Invalid role' })
  if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' })

  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), role, phone })
  if (role === 'professional') await Professional.create({ user: user._id, profession: profession || 'General' })
  res.status(201).json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}

export async function login(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' })
  res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}

export function me(req, res) {
  res.json({ user: req.user })
}
