import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { fileUrl, upload } from '../middleware/upload.js';
import Note from '../models/Note.js';

const router = express.Router();

router.post('/upload', protect, authorize('mentor'), upload.single('file'), async (req, res, next) => {
  try {
    const { title, subject, topic, classOrSemester, description } = req.body;

    if (!title || !subject || !topic || !classOrSemester || !description || !req.file) {
      return res.status(400).json({ message: 'All note fields and a file are required.' });
    }

    const note = await Note.create({
      title,
      subject,
      topic,
      classOrSemester,
      description,
      fileUrl: fileUrl(req, req.file),
      fileType: req.file.mimetype,
      uploadedBy: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
});

router.get('/', protect, async (req, res, next) => {
  try {
    const { subject, topic, classOrSemester, search } = req.query;
    const filter = {};

    if (subject) filter.subject = new RegExp(subject, 'i');
    if (topic) filter.topic = new RegExp(topic, 'i');
    if (classOrSemester) filter.classOrSemester = new RegExp(classOrSemester, 'i');
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') },
        { topic: new RegExp(search, 'i') }
      ];
    }

    const notes = await Note.find(filter).populate('uploadedBy', 'name role').sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.get('/my-notes', protect, authorize('mentor'), async (req, res, next) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, authorize('mentor'), async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own notes.' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

export default router;
