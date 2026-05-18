import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/format';

const MentorProfile = () => {
  const { user } = useAuth();
  return (
    <DashboardLayout title="Mentor Profile">
      <div className="card">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="mt-2 text-slate-600">{user.email}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-blue-50 p-4"><p className="text-sm text-blue-700">Role</p><p className="font-bold">Mentor</p></div>
          <div className="rounded-2xl bg-purple-50 p-4"><p className="text-sm text-purple-700">Teaching Subjects</p><p className="font-bold">{user.subjects?.join(', ') || 'Not set'}</p></div>
          <div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-600">Joined</p><p className="font-bold">{formatDate(user.createdAt)}</p></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile;
