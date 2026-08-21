import User from '../models/User.js'
import Professional from '../models/Professional.js'

export async function getProfile(req, res) {
  const profile = req.user.role === 'professional'
    ? await Professional.findOne({ user: req.user._id }).populate('user', '-password')
    : await User.findById(req.user._id).select('-password')
  res.json(profile)
}

export async function updateProfile(req, res) {
  const updates = (({ name, phone, avatar }) => ({ name, phone, avatar }))(req.body)
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password')
  if (req.user.role === 'professional') {
    await Professional.findOneAndUpdate({ user: req.user._id }, req.body, { runValidators: true })
  }
  res.json(user)
}

export async function listProfessionals(req, res) {
  res.json(await Professional.find({ verified: true }).populate('user', 'name email avatar'))
}
