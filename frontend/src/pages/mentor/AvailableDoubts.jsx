import { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import DoubtCard from '../../components/DoubtCard';

const AvailableDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    api.get('/doubts/available').then(({ data }) => setDoubts(data));
  }, []);

  const filtered = subject ? doubts.filter((doubt) => doubt.subject.toLowerCase().includes(subject.toLowerCase())) : doubts;

  return (
    <DashboardLayout title="Available Doubts">
      <div className="card mb-6"><input className="input" placeholder="Filter by subject" value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
      <div className="grid gap-4">{filtered.length ? filtered.map((doubt) => <DoubtCard key={doubt._id} doubt={doubt} linkPrefix="/mentor/answer-doubt" />) : <div className="card text-slate-500">No pending doubts found.</div>}</div>
    </DashboardLayout>
  );
};

export default AvailableDoubts;
