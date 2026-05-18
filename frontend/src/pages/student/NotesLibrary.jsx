import { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import NoteCard from '../../components/NoteCard';

const NotesLibrary = () => {
  const [filters, setFilters] = useState({ search: '', subject: '', topic: '', classOrSemester: '' });
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const { data } = await api.get('/notes', { params: filters });
    setNotes(data);
  };

  useEffect(() => { loadNotes(); }, []);

  return (
    <DashboardLayout title="Notes Library">
      <div className="card mb-6 grid gap-4 md:grid-cols-6">
        <input className="input md:col-span-2" placeholder="Search notes" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <input className="input" placeholder="Subject" value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} />
        <input className="input" placeholder="Topic" value={filters.topic} onChange={(e) => setFilters({ ...filters, topic: e.target.value })} />
        <input className="input" placeholder="Class / Semester" value={filters.classOrSemester} onChange={(e) => setFilters({ ...filters, classOrSemester: e.target.value })} />
        <button onClick={loadNotes} className="btn-primary">Search</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{notes.length ? notes.map((note) => <NoteCard key={note._id} note={note} />) : <div className="card text-slate-500 md:col-span-2">No notes match your filters.</div>}</div>
    </DashboardLayout>
  );
};

export default NotesLibrary;
