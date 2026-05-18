import { useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatusMessage from '../../components/StatusMessage';

const UploadNotes = () => {
  const [form, setForm] = useState({ title: '', subject: '', topic: '', classOrSemester: '', description: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ error: '', success: '' });

  const submit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (file) payload.append('file', file);

    try {
      await api.post('/notes/upload', payload);
      setMessage({ error: '', success: 'Notes uploaded successfully.' });
      setForm({ title: '', subject: '', topic: '', classOrSemester: '', description: '' });
      setFile(null);
    } catch (err) {
      setMessage({ error: err.response?.data?.message || 'Upload failed.', success: '' });
    }
  };

  return (
    <DashboardLayout title="Upload Notes">
      <form onSubmit={submit} className="card grid gap-4">
        <StatusMessage {...message} />
        <input className="input" placeholder="Note title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <div className="grid gap-4 md:grid-cols-3"><input className="input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required /><input className="input" placeholder="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required /><input className="input" placeholder="Class / Semester" value={form.classOrSemester} onChange={(e) => setForm({ ...form, classOrSemester: e.target.value })} required /></div>
        <textarea className="input min-h-28" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input className="input" type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button className="btn-primary">Upload Notes</button>
      </form>
    </DashboardLayout>
  );
};

export default UploadNotes;
