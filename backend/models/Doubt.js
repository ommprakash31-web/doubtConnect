import mongoose from 'mongoose';

const doubtSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    classOrSemester: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: '' },
    askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Answered'], default: 'Pending' },
    answer: { type: String, default: '' },
    answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answerImageUrl: { type: String, default: '' },
    answeredAt: { type: Date }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model('Doubt', doubtSchema);
