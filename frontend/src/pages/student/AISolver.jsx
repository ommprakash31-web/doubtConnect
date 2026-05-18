import { useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatusMessage from '../../components/StatusMessage';

const AISolver = () => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setAnswer('');
    setLoading(true);
    const payload = new FormData();
    payload.append('question', question);
    if (image) payload.append('image', image);

    try {
      const { data } = await api.post('/ai/solve-doubt', payload);
      setAnswer(data.answer);
    } catch (err) {
      setError(err.response?.data?.message || 'AI solver failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="AI Doubt Solver">
      <form onSubmit={submit} className="card grid gap-4">
        <StatusMessage error={error} />
        <textarea className="input min-h-40" placeholder="Type your academic doubt here..." value={question} onChange={(e) => setQuestion(e.target.value)} required />
        <input className="input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button className="btn-primary" disabled={loading}>{loading ? 'Solving...' : 'Get Step-by-Step Help'}</button>
      </form>
      {answer && <div className="card mt-6"><h2 className="text-2xl font-bold">AI Explanation</h2><pre className="mt-4 whitespace-pre-wrap font-sans leading-7 text-slate-700">{answer}</pre></div>}
    </DashboardLayout>
  );
};

export default AISolver;
