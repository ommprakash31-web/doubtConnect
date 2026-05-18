import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format';

const DoubtCard = ({ doubt, linkPrefix = '/student/doubts' }) => (
  <div className="card">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-xl font-bold text-slate-900">{doubt.title}</h3>
        <p className="mt-2 line-clamp-2 text-slate-600">{doubt.description}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-bold ${doubt.status === 'Answered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{doubt.status}</span>
    </div>
    <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
      <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{doubt.subject}</span>
      <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">{doubt.topic}</span>
      <span>{doubt.classOrSemester}</span>
      <span>•</span>
      <span>{formatDate(doubt.createdAt)}</span>
    </div>
    <Link to={`${linkPrefix}/${doubt._id}`} className="mt-5 inline-flex font-semibold text-blue-700 hover:text-purple-700">Open doubt →</Link>
  </div>
);

export default DoubtCard;
