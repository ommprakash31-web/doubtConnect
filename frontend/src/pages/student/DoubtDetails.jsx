import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import { formatDate } from '../../utils/format';

const DoubtDetails = () => {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);

  useEffect(() => {
    api.get(`/doubts/${id}`).then(({ data }) => setDoubt(data));
  }, [id]);

  if (!doubt) return <DashboardLayout title="Doubt Details"><div className="card text-slate-500">Loading doubt...</div></DashboardLayout>;

  return (
    <DashboardLayout title="Doubt Details">
      <div className="card">
        <div className="flex flex-wrap justify-between gap-4">
          <div><h2 className="text-3xl font-black">{doubt.title}</h2><p className="mt-2 text-slate-500">Asked on {formatDate(doubt.createdAt)}</p></div>
          <span className="h-fit rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700">{doubt.status}</span>
        </div>
        <p className="mt-6 whitespace-pre-wrap text-slate-700">{doubt.description}</p>
        {doubt.imageUrl && <img src={doubt.imageUrl} alt="Doubt attachment" className="mt-6 max-h-96 rounded-2xl border object-contain" />}
        <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{doubt.subject}</span><span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">{doubt.topic}</span><span className="rounded-full bg-slate-100 px-3 py-1">{doubt.classOrSemester}</span></div>
        <div className="mt-8 rounded-2xl bg-slate-50 p-5">
          <h3 className="text-xl font-bold">Mentor Answer</h3>
          {doubt.answer ? <><p className="mt-3 whitespace-pre-wrap text-slate-700">{doubt.answer}</p>{doubt.answerImageUrl && <img src={doubt.answerImageUrl} alt="Answer attachment" className="mt-4 max-h-80 rounded-2xl border object-contain" />}</> : <p className="mt-3 text-slate-500">No mentor answer yet. You can use the AI solver while waiting.</p>}
          {!doubt.answer && <Link to="/student/ai-solver" className="mt-4 inline-flex font-semibold text-blue-700">Ask AI Solver →</Link>}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoubtDetails;
