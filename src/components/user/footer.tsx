import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <Link className="text-2xl font-extrabold text-amber-500 hover:text-amber-600 transition-all duration-300 hover:scale-105 dark:text-amber-400 dark:hover:text-amber-300" href="/" aria-label="Brand">
                MathEdu
              </Link>
              <p className="mt-4 text-gray-600">Platform pembelajaran matematika interaktif untuk meningkatkan pemahaman dan kemampuan berhitung Anda.</p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Menu Utama</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-amber-600 transition-all duration-300">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/materi" className="text-gray-600 hover:text-amber-600 transition-all duration-300">
                    Materi
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-gray-600 hover:text-amber-600 transition-all duration-300">
                    Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/math-ai" className="text-gray-600 hover:text-amber-600 transition-all duration-300">
                    Math AI
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hubungi Kami</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Email: info@mathedu.com</li>
                <li className="text-gray-600">Telepon: (021) 1234-5678</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">&copy; {currentYear} MathEdu. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
