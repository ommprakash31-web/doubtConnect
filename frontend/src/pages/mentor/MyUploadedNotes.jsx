import { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/DashboardLayout';
import NoteCard from '../../components/NoteCard';

const MyUploadedNotes = () => {
  const [notes, setNotes] = useState([]);

  const load = async () => {
    const { data } = await api.get('/notes/my-notes');
    setNotes(data);
  };

  useEffect(() => { load(); }, []);

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    load();
  };

  return (
    <DashboardLayout title="My Uploaded Notes">
      <div className="grid gap-4 md:grid-cols-2">{notes.length ? notes.map((note) => <NoteCard key={note._id} note={note} onDelete={deleteNote} />) : <div className="card text-slate-500 md:col-span-2">You have not uploaded notes yet.</div>}</div>
    </DashboardLayout>
  );
};

export default MyUploadedNotes;
