exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Environment check',
      hasGoogleKey: !!process.env.GOOGLE_API_KEY,
      hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
      hasSupabaseKey: !!process.env.VITE_SUPABASE_ANON_KEY,
      keyLength: process.env.GOOGLE_API_KEY?.length,
      nodeVersion: process.version
    })
  };
};
