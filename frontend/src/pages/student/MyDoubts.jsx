import { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import DoubtCard from '../../components/DoubtCard';

const MyDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/doubts/my-doubts').then(({ data }) => setDoubts(data)).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="My Doubts">
      {loading ? <div className="card text-slate-500">Loading doubts...</div> : <div className="grid gap-4">{doubts.length ? doubts.map((doubt) => <DoubtCard key={doubt._id} doubt={doubt} />) : <div className="card text-slate-500">No doubts found.</div>}</div>}
    </DashboardLayout>
  );
};

export default MyDoubts;
