'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <Link className="text-2xl font-extrabold text-amber-500 hover:text-amber-600 transition-all duration-300 hover:scale-105 dark:text-amber-400 dark:hover:text-amber-300" href="/" aria-label="Brand">
              MathEdu
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 dark:text-gray-300 dark:hover:text-white dark:hover:bg-purple-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <Link className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`} href="/">
              Beranda
            </Link>
            <Link className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/materi') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`} href="/materi">
              Materi
            </Link>
            <Link className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/quiz') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`} href="/quiz">
              Quiz
            </Link>
            <Link className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/math-ai') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`} href="/math-ai">
              Math AI
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300">
            <div className="flex flex-col p-4">
              <Link
                className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`}
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/materi') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`}
                href="/materi"
                onClick={() => setIsMenuOpen(false)}
              >
                Materi
              </Link>
              <Link
                className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/quiz') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`}
                href="/quiz"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
              <Link
                className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 ${isActive('/math-ai') ? 'text-amber-500 font-bold scale-105' : 'text-gray-700'}`}
                href="/math-ai"
                onClick={() => setIsMenuOpen(false)}
              >
                Math AI
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
