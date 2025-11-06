import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import CTA from './components/CTA';
import Auth from './components/Auth';
import CoursePlayer from './components/CoursePlayer';
import { useState } from 'react';

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-600 sm:flex-row">
        <p>© {new Date().getFullYear()} GetaiCertified. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [auth, setAuth] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <section id="login" className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Sign in to track your progress</h3>
              <p className="text-xs text-gray-600">Email login or Google. We issue a secure token and keep you signed in.</p>
            </div>
            <Auth onAuth={setAuth} />
          </div>
        </section>
        <Curriculum />
        {auth?.token && auth?.user?.email && (
          <CoursePlayer token={auth.token} email={auth.user.email} />
        )}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
