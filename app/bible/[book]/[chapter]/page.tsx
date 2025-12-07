'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { BibleVerse, Language, BIBLE_VERSIONS } from '@/lib/types/bible';
import { getBookName } from '@/lib/utils/bible';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function BibleReaderPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const bookId = params.book as string;
  const chapter = parseInt(params.chapter as string);
  const lang = (searchParams.get('lang') as Language) || 'pt';
  const version = searchParams.get('version') || (lang === 'pt' ? 'nbv' : 'web');

  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxChapter, setMaxChapter] = useState(150);

  useEffect(() => {
    fetchVerses();
  }, [bookId, chapter, version, lang]);

  const fetchVerses = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/bible/verse?book=${bookId}&chapter=${chapter}&lang=${lang}&version=${version}`
      );
      const data = await res.json();
      setVerses(data.verses || []);
      
      // Estimate max chapters (you could also query this from DB)
      if (data.verses && data.verses.length > 0) {
        // For now, use a simple heuristic
        setMaxChapter(150);
      }
    } catch (error) {
      console.error('Error loading verses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevChapter = () => {
    if (chapter > 1) {
      router.push(`/bible/${bookId}/${chapter - 1}?lang=${lang}&version=${version}`);
    }
  };

  const handleNextChapter = () => {
    router.push(`/bible/${bookId}/${chapter + 1}?lang=${lang}&version=${version}`);
  };

  const handleVersionChange = (newVersion: string) => {
    router.push(`/bible/${bookId}/${chapter}?lang=${lang}&version=${newVersion}`);
  };

  const availableVersions = BIBLE_VERSIONS.filter(v => v.language === lang);
  const currentVersionName = BIBLE_VERSIONS.find(v => v.code === version)?.name || version;

  if (loading) {
    return (
      <div className=\"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4\"></div>
          <p className=\"text-slate-600\">
            {lang === 'pt' ? 'Carregando capítulo...' : 'Loading chapter...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100\">
      {/* Header */}
      <header className=\"bg-white shadow-sm border-b sticky top-0 z-10\">
        <div className=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4\">
          <div className=\"flex items-center justify-between\">
            <button
              onClick={() => router.push(`/bible?lang=${lang}`)}
              className=\"flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors\"
            >
              <BookOpen className=\"w-5 h-5\" />
              <span className=\"font-medium\">
                {lang === 'pt' ? 'Todos os Livros' : 'All Books'}
              </span>
            </button>
            
            <div className=\"text-center\">
              <h1 className=\"text-xl font-bold text-slate-900\">
                {getBookName(bookId, lang)} {chapter}
              </h1>
              <p className=\"text-sm text-slate-600\">{currentVersionName}</p>
            </div>

            <select
              value={version}
              onChange={(e) => handleVersionChange(e.target.value)}
              className=\"px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500\"
            >
              {availableVersions.map((v) => (
                <option key={v.code} value={v.code}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className=\"bg-white border-b\">
        <div className=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center\">
          <button
            onClick={handlePrevChapter}
            disabled={chapter <= 1}
            className=\"flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors\"
          >
            <ChevronLeft className=\"w-4 h-4\" />
            <span className=\"hidden sm:inline\">
              {lang === 'pt' ? 'Anterior' : 'Previous'}
            </span>
          </button>

          <span className=\"text-sm text-slate-600\">
            {lang === 'pt' ? 'Capítulo' : 'Chapter'} {chapter}
          </span>

          <button
            onClick={handleNextChapter}
            className=\"flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors\"
          >
            <span className=\"hidden sm:inline\">
              {lang === 'pt' ? 'Próximo' : 'Next'}
            </span>
            <ChevronRight className=\"w-4 h-4\" />
          </button>
        </div>
      </div>

      {/* Verses */}
      <main className=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">
        {verses.length === 0 ? (
          <div className=\"text-center py-12\">
            <p className=\"text-slate-600\">
              {lang === 'pt' 
                ? 'Nenhum versículo encontrado para este capítulo.' 
                : 'No verses found for this chapter.'}
            </p>
          </div>
        ) : (
          <div className=\"bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8\">
            <div className=\"space-y-4\">
              {verses.map((verse) => (
                <div key={verse.id} className=\"flex gap-3 group\">
                  <span className=\"text-blue-600 font-bold text-sm mt-1 min-w-[2rem] text-right\">
                    {verse.verse}
                  </span>
                  <p className=\"text-slate-800 leading-relaxed flex-1\">
                    {verse.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
