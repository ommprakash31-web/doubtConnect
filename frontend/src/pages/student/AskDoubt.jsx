import { useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatusMessage from '../../components/StatusMessage';

const AskDoubt = () => {
  const [form, setForm] = useState({ title: '', description: '', subject: '', topic: '', classOrSemester: '' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ error: '', success: '' });

  const submit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (image) payload.append('image', image);

    try {
      await api.post('/doubts', payload);
      setMessage({ error: '', success: 'Doubt posted successfully.' });
      setForm({ title: '', description: '', subject: '', topic: '', classOrSemester: '' });
      setImage(null);
    } catch (err) {
      setMessage({ error: err.response?.data?.message || 'Could not post doubt.', success: '' });
    }
  };

  return (
    <DashboardLayout title="Ask a New Doubt">
      <form onSubmit={submit} className="card grid gap-4">
        <StatusMessage {...message} />
        <input className="input" placeholder="Doubt title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="input min-h-36" placeholder="Describe your doubt clearly" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
          <input className="input" placeholder="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required />
          <input className="input" placeholder="Class / Semester" value={form.classOrSemester} onChange={(e) => setForm({ ...form, classOrSemester: e.target.value })} required />
        </div>
        <input className="input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button className="btn-primary">Submit Doubt</button>
      </form>
    </DashboardLayout>
  );
};

export default AskDoubt;
