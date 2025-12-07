import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data: books, error } = await supabase
      .from('alexandria_bible_books')
      .select('id, name, testament, order_index')
      .order('order_index');

    if (error) throw error;

    return NextResponse.json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
