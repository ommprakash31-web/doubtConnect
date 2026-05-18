import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import DoubtCard from '../../components/DoubtCard';

const MentorDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [answered, setAnswered] = useState([]);

  useEffect(() => {
    api.get('/doubts/available').then(({ data }) => setDoubts(data.slice(0, 3))).catch(() => setDoubts([]));
    api.get('/doubts/answered-history').then(({ data }) => setAnswered(data.slice(0, 3))).catch(() => setAnswered([]));
  }, []);

  return (
    <DashboardLayout title="Mentor Dashboard">
      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/mentor/available-doubts" className="card bg-blue-600 text-white"><h2 className="text-2xl font-bold">Available Doubts</h2><p className="mt-2 text-blue-100">Answer matching subjects.</p></Link>
        <Link to="/mentor/upload-notes" className="card bg-purple-600 text-white"><h2 className="text-2xl font-bold">Upload Notes</h2><p className="mt-2 text-purple-100">Share study material.</p></Link>
        <Link to="/mentor/my-notes" className="card"><h2 className="text-2xl font-bold">My Uploaded Notes</h2><p className="mt-2 text-slate-600">Manage your notes.</p></Link>
      </div>
      <h2 className="mb-4 mt-8 text-2xl font-bold">Pending Doubts</h2>
      <div className="grid gap-4">{doubts.length ? doubts.map((doubt) => <DoubtCard key={doubt._id} doubt={doubt} linkPrefix="/mentor/answer-doubt" />) : <div className="card text-slate-500">No matching doubts right now.</div>}</div>
      <h2 className="mb-4 mt-8 text-2xl font-bold">Answered History</h2>
      <div className="grid gap-4">{answered.length ? answered.map((doubt) => <DoubtCard key={doubt._id} doubt={doubt} linkPrefix="/mentor/answer-doubt" />) : <div className="card text-slate-500">Your answered doubts will appear here.</div>}</div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
