import { Link } from 'react-router-dom';

const features = [
  ['Doubt Solving', 'Post written doubts with images and track mentor answers.'],
  ['Notes Sharing', 'Search, view, and download class-wise notes quickly.'],
  ['Mentor Support', 'Connect with mentors who teach your selected subjects.'],
  ['AI Help', 'Get beginner-friendly step-by-step explanations anytime.']
];

const Home = () => (
  <div className="overflow-hidden">
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-[0.35em] text-blue-600">Student learning support</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-slate-950 md:text-6xl">DoubtConnect</h1>
          <p className="mt-5 text-2xl font-semibold text-purple-700">Ask doubts, share notes, learn together.</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A clean platform where students can ask academic questions, mentors can answer quickly, notes stay organized, and AI helps when a mentor is not available.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register/student" className="btn-primary">Register as Student</Link>
            <Link to="/register/mentor" className="btn-secondary">Join as Mentor</Link>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-blue-100">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Quick help</p>
            <h2 className="mt-4 text-3xl font-bold">Post a doubt with an image and get clear answers.</h2>
            <div className="mt-8 grid gap-4">
              {['Mathematics derivation', 'Programming bug', 'Science diagram', 'Exam notes'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/15 p-4 backdrop-blur">✓ {item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map(([title, description]) => (
          <div key={title} className="card hover:-translate-y-1 hover:shadow-xl transition">
            <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-3 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Home;
