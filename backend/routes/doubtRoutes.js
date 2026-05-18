import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { fileUrl, upload } from '../middleware/upload.js';
import Doubt from '../models/Doubt.js';

const router = express.Router();

router.post('/', protect, authorize('student'), upload.single('image'), async (req, res, next) => {
  try {
    const { title, description, subject, topic, classOrSemester } = req.body;

    if (!title || !description || !subject || !topic || !classOrSemester) {
      return res.status(400).json({ message: 'All doubt fields except image are required.' });
    }

    const doubt = await Doubt.create({
      title,
      description,
      subject,
      topic,
      classOrSemester,
      imageUrl: fileUrl(req, req.file),
      askedBy: req.user._id
    });

    res.status(201).json(doubt);
  } catch (error) {
    next(error);
  }
});

router.get('/my-doubts', protect, authorize('student'), async (req, res, next) => {
  try {
    const doubts = await Doubt.find({ askedBy: req.user._id })
      .populate('answeredBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(doubts);
  } catch (error) {
    next(error);
  }
});

router.get('/available', protect, authorize('mentor'), async (req, res, next) => {
  try {
    const filter = { status: 'Pending' };
    if (req.user.subjects?.length) {
      filter.subject = { $in: req.user.subjects };
    }

    const doubts = await Doubt.find(filter).populate('askedBy', 'name classOrSemester').sort({ createdAt: -1 });
    res.json(doubts);
  } catch (error) {
    next(error);
  }
});


router.get('/answered-history', protect, authorize('mentor'), async (req, res, next) => {
  try {
    const doubts = await Doubt.find({ answeredBy: req.user._id, status: 'Answered' })
      .populate('askedBy', 'name classOrSemester')
      .sort({ answeredAt: -1 });
    res.json(doubts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', protect, async (req, res, next) => {
  try {
    const doubt = await Doubt.findById(req.params.id)
      .populate('askedBy', 'name email classOrSemester')
      .populate('answeredBy', 'name email');

    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found.' });
    }

    const isOwner = doubt.askedBy._id.toString() === req.user._id.toString();
    if (req.user.role === 'student' && !isOwner) {
      return res.status(403).json({ message: 'Students can only view their own doubts.' });
    }

    res.json(doubt);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/answer', protect, authorize('mentor'), upload.single('answerImage'), async (req, res, next) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ message: 'Answer text is required.' });
    }

    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found.' });
    }

    doubt.answer = answer;
    doubt.answerImageUrl = fileUrl(req, req.file);
    doubt.answeredBy = req.user._id;
    doubt.answeredAt = new Date();
    doubt.status = 'Answered';
    await doubt.save();

    res.json(await doubt.populate('answeredBy', 'name email'));
  } catch (error) {
    next(error);
  }
});

export default router;
