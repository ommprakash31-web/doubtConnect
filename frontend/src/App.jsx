import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AnswerDoubt from './pages/mentor/AnswerDoubt';
import AvailableDoubts from './pages/mentor/AvailableDoubts';
import MentorDashboard from './pages/mentor/MentorDashboard';
import MentorProfile from './pages/mentor/MentorProfile';
import MyUploadedNotes from './pages/mentor/MyUploadedNotes';
import UploadNotes from './pages/mentor/UploadNotes';
import About from './pages/public/About';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import AISolver from './pages/student/AISolver';
import AskDoubt from './pages/student/AskDoubt';
import DoubtDetails from './pages/student/DoubtDetails';
import MyDoubts from './pages/student/MyDoubts';
import NotesLibrary from './pages/student/NotesLibrary';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/:role" element={<Register />} />

      <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/ask-doubt" element={<ProtectedRoute role="student"><AskDoubt /></ProtectedRoute>} />
      <Route path="/student/my-doubts" element={<ProtectedRoute role="student"><MyDoubts /></ProtectedRoute>} />
      <Route path="/student/doubts/:id" element={<ProtectedRoute role="student"><DoubtDetails /></ProtectedRoute>} />
      <Route path="/student/notes" element={<ProtectedRoute role="student"><NotesLibrary /></ProtectedRoute>} />
      <Route path="/student/ai-solver" element={<ProtectedRoute role="student"><AISolver /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />

      <Route path="/mentor/dashboard" element={<ProtectedRoute role="mentor"><MentorDashboard /></ProtectedRoute>} />
      <Route path="/mentor/available-doubts" element={<ProtectedRoute role="mentor"><AvailableDoubts /></ProtectedRoute>} />
      <Route path="/mentor/answer-doubt/:id" element={<ProtectedRoute role="mentor"><AnswerDoubt /></ProtectedRoute>} />
      <Route path="/mentor/upload-notes" element={<ProtectedRoute role="mentor"><UploadNotes /></ProtectedRoute>} />
      <Route path="/mentor/my-notes" element={<ProtectedRoute role="mentor"><MyUploadedNotes /></ProtectedRoute>} />
      <Route path="/mentor/profile" element={<ProtectedRoute role="mentor"><MentorProfile /></ProtectedRoute>} />
    </Routes>
  </>
);

export default App;
