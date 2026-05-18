import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { fileUrl, upload } from '../middleware/upload.js';

const router = express.Router();

const placeholderAnswer = (question) => `## Step-by-step explanation\n\n1. **Understand the question:** ${question}\n2. **Break it into smaller parts:** Identify the topic, formula, concept, or code logic involved.\n3. **Solve one step at a time:** Write known values, apply the correct rule, and verify each step.\n4. **Check your answer:** Compare the result with the question requirement.\n\n### Example\nIf this is a math doubt, write the formula first and substitute values carefully. If this is a programming doubt, trace the code line by line and check inputs, output, and edge cases.\n\n### Integration note\nThis is a placeholder response because no AI_API_KEY is configured. Add your AI provider key in backend/.env to generate real AI answers.`;

router.post('/solve-doubt', protect, authorize('student'), upload.single('image'), async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Question is required.' });
    }

    const imageUrl = fileUrl(req, req.file);

    if (!process.env.AI_API_KEY) {
      return res.json({ answer: placeholderAnswer(question), imageUrl, isPlaceholder: true });
    }

    // AI API integration point: this example uses an OpenAI-compatible chat completions endpoint.
    const response = await fetch(process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are DoubtConnect AI, a beginner-friendly academic tutor. Explain with headings, bullets, examples, and code examples when useful.'
          },
          {
            role: 'user',
            content: imageUrl ? `${question}\nAttached image URL: ${imageUrl}` : question
          }
        ]
      })
    });

    if (!response.ok) {
      return res.status(502).json({ message: 'AI provider failed to solve the doubt.' });
    }

    const data = await response.json();
    res.json({ answer: data.choices?.[0]?.message?.content || placeholderAnswer(question), imageUrl, isPlaceholder: false });
  } catch (error) {
    next(error);
  }
});

export default router;
