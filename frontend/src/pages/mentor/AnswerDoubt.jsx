import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatusMessage from '../../components/StatusMessage';

const AnswerDoubt = () => {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [answer, setAnswer] = useState('');
  const [answerImage, setAnswerImage] = useState(null);
  const [message, setMessage] = useState({ error: '', success: '' });

  useEffect(() => {
    api.get(`/doubts/${id}`).then(({ data }) => setDoubt(data));
  }, [id]);

  const submit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append('answer', answer);
    if (answerImage) payload.append('answerImage', answerImage);

    try {
      const { data } = await api.post(`/doubts/${id}/answer`, payload);
      setDoubt(data);
      setAnswer('');
      setMessage({ error: '', success: 'Answer submitted and doubt marked as Answered.' });
    } catch (err) {
      setMessage({ error: err.response?.data?.message || 'Could not submit answer.', success: '' });
    }
  };

  if (!doubt) return <DashboardLayout title="Answer Doubt"><div className="card text-slate-500">Loading doubt...</div></DashboardLayout>;

  return (
    <DashboardLayout title="Answer Doubt">
      <div className="card mb-6">
        <h2 className="text-3xl font-black">{doubt.title}</h2>
        <p className="mt-4 whitespace-pre-wrap text-slate-700">{doubt.description}</p>
        {doubt.imageUrl && <img src={doubt.imageUrl} alt="Doubt" className="mt-6 max-h-96 rounded-2xl border object-contain" />}
        <div className="mt-4 flex gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{doubt.subject}</span><span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">{doubt.topic}</span></div>
      </div>
      <form onSubmit={submit} className="card grid gap-4">
        <StatusMessage {...message} />
        <textarea className="input min-h-40" placeholder="Write a clear mentor answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        <input className="input" type="file" accept="image/*" onChange={(e) => setAnswerImage(e.target.files[0])} />
        <button className="btn-primary">Submit Answer</button>
      </form>
    </DashboardLayout>
  );
};

export default AnswerDoubt;
