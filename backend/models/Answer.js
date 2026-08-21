import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  accepted: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Answer', answerSchema)
