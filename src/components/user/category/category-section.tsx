'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon?: string | null;
}

interface CategorySectionProps {
  categories: Category[];
  error?: string;
}

export default function CategorySection({ categories, error }: CategorySectionProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Initialize AOS animation library if it exists
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init();
    }
  }, []);

  if (error) {
    return (
      <section className="mt-24 px-4 md:px-16 lg:px-32 py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Error loading categories: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-24 px-4 md:px-16 lg:px-32 py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <p className="text-emerald-600 text-lg font-semibold mb-3" data-aos="fade-up">
          KATEGORI
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12" data-aos="fade-up" data-aos-delay="200">
          Pilih Kategori <span className="text-amber-500">Materi</span>
        </h2>

        {/* Grid Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isClient &&
            categories.map((category, index) => (
              <div key={category.id} className="p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105" data-aos="zoom-in" data-aos-delay={index * 100}>
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {category.icon ? <Image src={`/storage/${category.icon}`} alt={`Icon ${category.name}`} width={64} height={64} className="shadow-sm rounded-sm object-cover" /> : <BookOpen className="text-amber-500 w-16 h-16" />}
                </div>

                {/* Nama Kategori */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{category.name}</h3>

                {/* Link */}
                <Link href={`/materi/${category.id}`} className="inline-block px-6 py-2 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors duration-300">
                  Lihat Materi
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
