'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg transition-all duration-300">
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
              ref={buttonRef}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 dark:text-gray-300 dark:hover:text-amber-300 dark:hover:bg-gray-800 dark:focus:ring-amber-400"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-expanded={isMenuOpen}
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
            <Link
              className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 dark:hover:text-amber-300 ${
                isActive('/') ? 'text-amber-500 font-bold scale-105 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'
              }`}
              href="/"
            >
              Beranda
            </Link>
            <Link
              className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 dark:hover:text-amber-300 ${
                isActive('/materi') ? 'text-amber-500 font-bold scale-105 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'
              }`}
              href="/materi"
            >
              Materi
            </Link>
            <Link
              className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 dark:hover:text-amber-300 ${
                isActive('/quiz') ? 'text-amber-500 font-bold scale-105 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'
              }`}
              href="/quiz"
            >
              Quiz
            </Link>
            <Link
              className={`py-2 text-base font-medium hover:text-amber-600 hover:scale-105 transition-all duration-300 dark:hover:text-amber-300 ${
                isActive('/math-ai') ? 'text-amber-500 font-bold scale-105 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'
              }`}
              href="/math-ai"
            >
              Math AI
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col p-4 space-y-2">
            <Link
              className={`px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive('/') ? 'text-amber-500 bg-amber-50 font-bold dark:text-amber-400 dark:bg-gray-800' : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50 dark:text-gray-300 dark:hover:text-amber-300 dark:hover:bg-gray-800/70'
              }`}
              href="/"
            >
              Beranda
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive('/materi')
                  ? 'text-amber-500 bg-amber-50 font-bold dark:text-amber-400 dark:bg-gray-800'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50 dark:text-gray-300 dark:hover:text-amber-300 dark:hover:bg-gray-800/70'
              }`}
              href="/materi"
            >
              Materi
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive('/quiz')
                  ? 'text-amber-500 bg-amber-50 font-bold dark:text-amber-400 dark:bg-gray-800'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50 dark:text-gray-300 dark:hover:text-amber-300 dark:hover:bg-gray-800/70'
              }`}
              href="/quiz"
            >
              Quiz
            </Link>
            <Link
              className={`px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive('/math-ai')
                  ? 'text-amber-500 bg-amber-50 font-bold dark:text-amber-400 dark:bg-gray-800'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50 dark:text-gray-300 dark:hover:text-amber-300 dark:hover:bg-gray-800/70'
              }`}
              href="/math-ai"
            >
              Math AI
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
