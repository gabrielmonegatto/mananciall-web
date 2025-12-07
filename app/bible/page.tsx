'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BibleBook, Language } from '@/lib/types/bible';
import { getBookName } from '@/lib/utils/bible';

export default function BiblePage() {
  const router = useRouter();
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('pt');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/bible/books');
      const data = await res.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const oldTestament = books.filter((b) => b.testament === 'old');
  const newTestament = books.filter((b) => b.testament === 'new');

  const handleBookClick = (bookId: string) => {
    router.push(`/bible/${bookId}/1?lang=${lang}`);
  };

  if (loading) {
    return (
      <div className=\"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4\"></div>
          <p className=\"text-slate-600\">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100\">
      {/* Header */}
      <header className=\"bg-white shadow-sm border-b\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6\">
          <div className=\"flex justify-between items-center\">
            <div>
              <h1 className=\"text-3xl font-bold text-slate-900\">
                {lang === 'pt' ? 'Bíblia Sagrada' : 'Holy Bible'}
              </h1>
              <p className=\"text-slate-600 mt-1\">
                {lang === 'pt' 
                  ? 'Explore as Escrituras em múltiplas versões' 
                  : 'Explore the Scriptures in multiple versions'}
              </p>
            </div>
            <div className=\"flex gap-2\">
              <button
                onClick={() => setLang('pt')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  lang === 'pt'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border'
                }`}
              >
                Português
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">
        {/* Old Testament */}
        <section className=\"mb-12\">
          <h2 className=\"text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-600 inline-block\">
            {lang === 'pt' ? 'Antigo Testamento' : 'Old Testament'}
          </h2>
          <div className=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6\">
            {oldTestament.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                className=\"bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200 p-4 rounded-lg text-center border border-slate-200 hover:border-blue-400\"
              >
                <div className=\"font-semibold text-slate-900\">
                  {getBookName(book.id, lang)}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* New Testament */}
        <section>
          <h2 className=\"text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-600 inline-block\">
            {lang === 'pt' ? 'Novo Testamento' : 'New Testament'}
          </h2>
          <div className=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6\">
            {newTestament.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                className=\"bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200 p-4 rounded-lg text-center border border-slate-200 hover:border-blue-400\"
              >
                <div className=\"font-semibold text-slate-900\">
                  {getBookName(book.id, lang)}
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
