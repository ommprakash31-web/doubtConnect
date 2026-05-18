import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import DoubtCard from '../../components/DoubtCard';

const StudentDashboard = () => {
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    api.get('/doubts/my-doubts').then(({ data }) => setDoubts(data.slice(0, 3))).catch(() => setDoubts([]));
  }, []);

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/student/ask-doubt" className="card bg-blue-600 text-white"><h2 className="text-2xl font-bold">Ask New Doubt</h2><p className="mt-2 text-blue-100">Upload text and images.</p></Link>
        <Link to="/student/notes" className="card bg-purple-600 text-white"><h2 className="text-2xl font-bold">Notes Section</h2><p className="mt-2 text-purple-100">Search and download.</p></Link>
        <Link to="/student/ai-solver" className="card"><h2 className="text-2xl font-bold">AI Doubt Solver</h2><p className="mt-2 text-slate-600">Get quick explanations.</p></Link>
      </div>
      <h2 className="mb-4 mt-8 text-2xl font-bold">Recent Doubts</h2>
      <div className="grid gap-4">{doubts.length ? doubts.map((doubt) => <DoubtCard key={doubt._id} doubt={doubt} />) : <div className="card text-slate-500">No doubts yet. Ask your first doubt!</div>}</div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
