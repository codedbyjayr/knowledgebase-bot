import { supabase } from './supabaseClient'

export async function searchFaqs(query) {
  try {
    // Search for FAQs using case-insensitive pattern matching
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .ilike('question', `%${query}%`)
      .limit(1)

    if (error) {
      throw error
    }

    // Return the first matching FAQ or null
    return data && data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('Error searching FAQs:', error)
    return null
  }
}
