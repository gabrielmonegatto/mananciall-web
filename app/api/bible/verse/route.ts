import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getDefaultVersion } from '@/lib/utils/bible';
import type { Language } from '@/lib/types/bible';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get('book');
    const chapter = searchParams.get('chapter');
    const verse = searchParams.get('verse');
    const lang = (searchParams.get('lang') as Language) || 'pt';
    const versionCode = searchParams.get('version') || getDefaultVersion(lang);

    if (!bookId || !chapter) {
      return NextResponse.json(
        { error: 'Missing required parameters: book and chapter' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('alexandria_bible_verses')
      .select('id, book_id, chapter, verse, text, versions, cross_references, themes')
      .eq('book_id', bookId)
      .eq('chapter', parseInt(chapter));

    if (verse) {
      query = query.eq('verse', parseInt(verse));
    }

    query = query.order('verse');

    const { data: verses, error } = await query;

    if (error) throw error;

    // Transform verses to use the requested version
    const transformedVerses = verses?.map((v) => ({
      ...v,
      text: v.versions?.[versionCode] || v.text,
      version: versionCode,
    }));

    return NextResponse.json({ verses: transformedVerses });
  } catch (error) {
    console.error('Error fetching verses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch verses' },
      { status: 500 }
    );
  }
}
