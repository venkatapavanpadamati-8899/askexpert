import mongoose from 'mongoose'

const professionalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  profession: { type: String, required: true, trim: true },
  bio: { type: String, default: '' },
  expertise: [String],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  verified: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Professional', professionalSchema)
