import { supabase } from '@/lib/supabase';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Calendar, PlayCircle, Lock, Share2 } from 'lucide-react';

export const revalidate = 0;

// ATENÇÃO AQUI: Mudou a tipagem para Promise
export default async function LeitorPage(props: { params: Promise<{ id: string }> }) {
  
  // O PULO DO GATO DO NEXT.JS 16:
  // Temos que esperar (await) os parâmetros chegarem antes de usar
  const params = await props.params;
  const id = params.id;

  console.log("🔍 [DEBUG] Tentando buscar ID:", id);

  // 1. BUSCAR NO BANCO
  const { data: post, error } = await supabase
    .from('assets')
    .select('content_structured')
    .eq('id', id) // Usando o ID extraído corretamente
    .single();

  // --- LOGS DO DETETIVE ---
  if (error) {
    console.error("❌ [DEBUG] ERRO DO SUPABASE:", error.message);
  } else {
    if (!post) console.log("⚠️ [DEBUG] Post veio NULL");
    else console.log("🎉 [DEBUG] Conteúdo encontrado!");
  }
  // ------------------------

  if (!post || !post.content_structured) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-500 font-sans flex-col">
        <div className="text-center">
          <h1 className="text-2xl mb-2 text-white">Capítulo não encontrado</h1>
          <p>O sistema buscou o ID <b>{id}</b> mas não retornou dados.</p>
          <p className="text-xs mt-4 opacity-50">Verifique se o ID existe no Supabase.</p>
        </div>
      </div>
    );
  }

  const { data: frontmatter, content } = matter(post.content_structured);
  const usuarioTemAcessoPremium = false; 

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-serif selection:bg-red-900 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-bold tracking-wider flex items-center gap-2 text-sm font-sans">
            <BookOpen size={18} className="text-red-500" /> MANANCIALL
          </span>
          <button className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition">
            Menu
          </button>
        </div>
      </nav>

      {/* CABEÇALHO */}
      <header className="pt-16 pb-8 px-6 max-w-2xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-6 text-[10px] font-sans tracking-[0.2em] text-gray-500 uppercase">
          <span className="flex items-center gap-1">Devocional Diário</span>
          <span className="w-px h-3 bg-gray-700"></span>
          <span className="flex items-center gap-1 text-gray-400">ID #{id}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
          {frontmatter.titulo || 'Título Indefinido'}
        </h1>

        {frontmatter.versiculo_destaque && (
          <div className="relative bg-white/5 border border-white/10 p-8 rounded-xl text-center">
            <div className="text-xl md:text-2xl italic text-gray-200 mb-4 font-light leading-relaxed">
              "{frontmatter.versiculo_destaque}"
            </div>
            <div className="text-xs font-sans uppercase tracking-widest text-red-400 font-bold">
              Palavra Chave
            </div>
          </div>
        )}
      </header>

      {/* UPSELL */}
      <section className="max-w-2xl mx-auto px-6 mb-12">
        {usuarioTemAcessoPremium ? (
          <div className="bg-zinc-900 rounded-lg p-4 flex items-center gap-4 border border-zinc-800">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition">
              <PlayCircle fill="black" />
            </button>
            <div>
              <div className="text-xs text-gray-500 uppercase font-sans font-bold">Ouvir Capítulo</div>
              <div className="text-sm text-gray-300">Narração Neural (05:30)</div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-red-900/20 to-black border border-red-900/30 rounded-lg p-4 flex items-center justify-between group cursor-pointer hover:border-red-500/50 transition">
            <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <Lock size={16} className="text-gray-400" />
              </div>
              <div className="font-sans">
                <div className="text-xs text-red-400 uppercase font-bold">Conteúdo Premium</div>
                <div className="text-sm text-gray-300">Desbloquear Áudio</div>
              </div>
            </div>
            <div className="text-xs bg-white text-black px-3 py-1 rounded font-bold font-sans">
              UPGRADE
            </div>
          </div>
        )}
      </section>

      {/* TEXTO */}
      <article className="max-w-2xl mx-auto px-6 pb-32 prose prose-invert prose-lg prose-p:text-gray-400 prose-headings:text-gray-200 prose-strong:text-white prose-a:text-red-400">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

    </div>
  );
}