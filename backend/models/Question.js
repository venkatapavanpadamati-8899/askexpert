import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'answered', 'closed'], default: 'open' }
}, { timestamps: true })

export default mongoose.model('Question', questionSchema)
