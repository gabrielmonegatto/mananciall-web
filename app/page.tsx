import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import matter from 'gray-matter';
import { BookOpen, PlayCircle, Lock } from 'lucide-react';

// Recarrega a home a cada hora (ou mude para 0 para tempo real)
export const revalidate = 3600;

export default async function Home() {
  
  // 1. BUSCAR TODOS OS CAPÍTULOS (ID e CONTEÚDO)
  // Limitando a 50 pra não pesar agora, depois a gente faz paginação
  const { data: posts } = await supabase
    .from('assets')
    .select('id, content_structured')
    .not('content_structured', 'is', null)
    .order('id', { ascending: true })
    .limit(50);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-red-900 selection:text-white">
      
      {/* HERO SECTION (O Destaque) */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-[#050505] z-0"></div>
        <div className="z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-red-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Mananciall Web
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 font-serif">
            O Tesouro de Davi.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Uma coleção digital viva de devocionais, teologia e sabedoria atemporal.
            Leia, ouça e medite.
          </p>
        </div>
      </section>

      {/* GRID DE CAPÍTULOS */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-red-500" />
            Devocionais Recentes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => {
            // Extrair Título do Frontmatter
            const { data: frontmatter } = matter(post.content_structured);
            
            return (
              <Link 
                key={post.id} 
                href={`/leitura/${post.id}`}
                className="group relative bg-zinc-900/50 border border-white/5 hover:border-red-500/50 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-gray-500">DIA {post.id.toString().padStart(2, '0')}</span>
                  {/* Ícone indicando se tem áudio (mockado por enquanto) */}
                  <PlayCircle size={16} className="text-zinc-700 group-hover:text-red-500 transition" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-200 group-hover:text-white mb-3 font-serif line-clamp-2">
                  {frontmatter.titulo || 'Sem Título'}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {frontmatter.versiculo_destaque || 'Clique para ler o devocional completo...'}
                </p>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-600 group-hover:text-red-400 transition">Ler Agora →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-600 text-sm">
        <p>© 2025 Megazord Press. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}