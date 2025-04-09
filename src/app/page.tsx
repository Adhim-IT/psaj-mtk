import Image from 'next/image';
import { getCategories } from '@/lib/categorise';
import CategorySection from '@/components/user/category/category-section';

export default async function Home() {
  const { categories, error } = await getCategories();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="px-4 md:px-16 lg:px-32 py-16 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Section 1 */}
          <div className="mt-10 md:mt-0" data-aos="fade-right" data-aos-duration="1000">
            <p className="uppercase text-emerald-600 font-semibold text-sm md:text-base mb-3">Platform Belajar Matematika</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Belajar
              <span className="text-amber-500 font-extrabold">
                {' '}
                <br /> Matematika{' '}
              </span>{' '}
              Lebih Menyenangkan 🚀
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">Temukan konsep, solusi, dan latihan interaktif untuk meningkatkan pemahamanmu!</p>
            <button
              className="px-8 py-4 text-white bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Mulai Sekarang
            </button>
            <div className="flex items-center gap-4 mt-12" data-aos="fade-up" data-aos-delay="500">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image src="/img/student.png" alt="Pengguna" width={80} height={80} className="h-full w-full object-cover rounded-full shadow-md" />
              </div>
              <p className="text-xl md:text-2xl font-medium">
                <span className="text-amber-500 font-bold">+10,000</span> Pengguna Aktif
              </p>
            </div>
          </div>
          {/* Section 2 */}
          <div className="relative flex justify-center mt-12 md:mt-0">
            <div className="relative w-full max-w-md lg:max-w-lg" data-aos="fade-left" data-aos-duration="1000">
              <Image src="/img/bg-orang.png" alt="Background" width={400} height={500} className="w-full object-cover absolute top-0 left-0 opacity-50" />
              <Image src="/img/orang.png" alt="Orang" width={400} height={500} className="relative w-full object-cover transform hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-24 px-4 md:px-16 lg:px-32 py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Bagian Gambar */}
          <div className="order-2 md:order-1 flex justify-center" data-aos="fade-right">
            <Image src="/img/hero-section2.png" alt="Ilustrasi Matematika" width={450} height={600} className="max-w-md lg:max-w-lg xl:max-w-xl shadow-2xl rounded-lg" />
          </div>
          {/* Bagian Teks */}
          <div className="order-1 md:order-2" data-aos="fade-left">
            <p className="uppercase text-emerald-600 font-semibold text-sm md:text-base mb-3">TENTANG KAMI</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-amber-500">Edukasi Matematika Interaktif</span>
              untuk meningkatkan pemahaman dan kecintaan terhadap angka.
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">MathEdu hadir untuk membantu siswa dan pengajar dalam memahami konsep matematika dengan cara yang lebih menyenangkan, inovatif, dan interaktif.</p>
            <button
              className="px-8 py-4 text-white bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              data-aos="zoom-in"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto mb-16 px-6">
        <h2 className="text-3xl text-center mb-12 text-emerald-600 relative" data-aos="fade-up">
          Keuntungan Menggunakan <span className="text-amber-500">MathEdu</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-500"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="group space-y-4 p-6 rounded-lg border border-amber-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300" data-aos="fade-right">
            <h3 className="text-xl text-amber-500 font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Untuk Siswa
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2 hover:text-amber-600 transition-colors duration-200">
                <span className="text-amber-500">•</span>
                <p>Mempermudah siswa dalam menemukan rumus matematika dari dasar hingga lanjutan tanpa harus mencarinya di buku tebal.</p>
              </li>
              <li className="flex gap-2 hover:text-amber-600 transition-colors duration-200">
                <span className="text-amber-500">•</span>
                <p>Menghemat waktu dengan kalkulator khusus untuk menghitung langsung hasil dari rumus yang dimasukkan.</p>
              </li>
              <li className="flex gap-2 hover:text-amber-600 transition-colors duration-200">
                <span className="text-amber-500">•</span>
                <p>Tersedia berbagai tingkat kesulitan kuis untuk melatih pemahaman siswa secara berkala.</p>
              </li>
              <li className="flex gap-2 hover:text-amber-600 transition-colors duration-200">
                <span className="text-amber-500">•</span>
                <p>Siswa dapat bertanya kapan saja jika mengalami kesulitan memahami konsep atau menyelesaikan soal matematika.</p>
              </li>
              <li className="flex gap-2 hover:text-amber-600 transition-colors duration-200">
                <span className="text-amber-500">•</span>
                <p>Pengalaman belajar yang tidak membosankan dengan fitur yang interaktif.</p>
              </li>
            </ul>
          </div>

          {/* For Teachers */}
          <div className="group space-y-4 p-6 rounded-lg border border-emerald-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300" data-aos="fade-left">
            <h3 className="text-xl text-emerald-600 font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
              Untuk Guru
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2 hover:text-emerald-700 transition-colors duration-200">
                <span className="text-emerald-600">•</span>
                <p>Guru dapat menggunakan koleksi rumus matematika di website ini sebagai bahan ajar tambahan.</p>
              </li>
              <li className="flex gap-2 hover:text-emerald-700 transition-colors duration-200">
                <span className="text-emerald-600">•</span>
                <p>Kalkulator khusus dapat digunakan untuk mengajarkan cara penggunaan rumus secara langsung.</p>
              </li>
              <li className="flex gap-2 hover:text-emerald-700 transition-colors duration-200">
                <span className="text-emerald-600">•</span>
                <p>Math AI dapat digunakan sebagai asisten untuk menjawab pertanyaan siswa yang membutuhkan penjelasan tambahan.</p>
              </li>
              <li className="flex gap-2 hover:text-emerald-700 transition-colors duration-200">
                <span className="text-emerald-600">•</span>
                <p>Guru bisa menghemat waktu dalam menyusun soal atau materi dengan memanfaatkan rumus dan fitur-fitur di website ini.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="mt-24 px-4 md:px-16 lg:px-32 py-16">
        <div className="container mx-auto text-center">
          {/* Title Center */}
          <p className="text-emerald-600 text-lg font-semibold mb-3" data-aos="fade-up">
            PROGRAM
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-aos="fade-up" data-aos-delay="200">
            Program Pembelajaran di <span className="text-amber-500">MathEdu</span>
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
            Mendukung generasi baru untuk menjadi lebih cerdas dalam matematika
          </p>

          {/* Cards Layout */}
          <div id="card-container" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Cards */}
            {[
              { name: 'Materi', icon: '/img/icon-card (1).png' },
              { name: 'Quiz', icon: '/img/icon-card (2).png' },
              { name: 'Sertifikat', icon: '/img/icon-card (3).png' },
              { name: 'Jalur Pembelajaran', icon: '/img/icon-card (4).png' },
            ].map((program, index) => (
              <div
                key={program.name}
                className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <Image src={program.icon || '/placeholder.svg'} alt={program.name} width={64} height={64} className="w-16 h-16 mb-4" />
                <p className="text-center text-gray-800 font-medium">{program.name}</p>
              </div>
            ))}
          </div>

          {/* Show More Button (Only on Mobile) */}
          <button id="show-more-btn" className="mt-12 px-8 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors duration-300 block md:hidden" data-aos="fade-up" data-aos-delay="800">
            Lihat Lebih
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection categories={categories || []} error={error} />
    </div>
  );
}
