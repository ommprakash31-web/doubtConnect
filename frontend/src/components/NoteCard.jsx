import { formatDate } from '../utils/format';

const NoteCard = ({ note, onDelete }) => (
  <div className="card flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-bold text-slate-900">{note.title}</h3>
      <p className="mt-2 text-slate-600">{note.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{note.subject}</span>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">{note.topic}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{note.classOrSemester}</span>
      </div>
      <p className="mt-4 text-sm text-slate-500">Uploaded {formatDate(note.createdAt)} by {note.uploadedBy?.name || 'You'}</p>
    </div>
    <div className="mt-5 flex flex-wrap gap-3">
      <a href={note.fileUrl} target="_blank" rel="noreferrer" className="btn-primary py-2">View / Download</a>
      {onDelete && <button onClick={() => onDelete(note._id)} className="btn-secondary py-2 text-red-600">Delete</button>}
    </div>
  </div>
);

export default NoteCard;
