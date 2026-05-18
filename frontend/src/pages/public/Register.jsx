import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import StatusMessage from '../../components/StatusMessage';
import { useAuth } from '../../context/AuthContext';
import { subjectsFromText } from '../../utils/format';

const Register = () => {
  const { role } = useParams();
  const actualRole = role === 'mentor' ? 'mentor' : 'student';
  const [form, setForm] = useState({ name: '', email: '', password: '', classOrSemester: '', subjects: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithResponse } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { ...form, role: actualRole, subjects: subjectsFromText(form.subjects) });
      loginWithResponse(data);
      navigate(actualRole === 'mentor' ? '/mentor/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <form onSubmit={submit} className="card">
        <h1 className="text-3xl font-black">Register as {actualRole === 'mentor' ? 'Mentor' : 'Student'}</h1>
        <p className="mt-2 text-slate-600">Create your DoubtConnect profile.</p>
        <StatusMessage error={error} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input className="input" placeholder="Class / Semester" value={form.classOrSemester} onChange={(e) => setForm({ ...form, classOrSemester: e.target.value })} />
          <input className="input md:col-span-2" placeholder={actualRole === 'mentor' ? 'Teaching subjects, comma separated' : 'Subjects you study, comma separated'} value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} />
          <button className="btn-primary md:col-span-2" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
