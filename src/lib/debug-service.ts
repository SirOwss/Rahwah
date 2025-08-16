// Temporary test endpoint for development
export const testSupabaseConnection = async () => {
  try {
    // Test if we can access environment variables
    console.log('🔍 Checking environment variables...');
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    console.log('Supabase URL:', supabaseUrl ? '✅ Present' : '❌ Missing');
    console.log('Anon Key:', anonKey ? '✅ Present' : '❌ Missing');
    
    if (!supabaseUrl || !anonKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    // Test basic connection
    const testUrl = `${supabaseUrl}/functions/v1/generate-3d-model`;
    console.log('🌐 Testing endpoint:', testUrl);
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        prompt: 'Test prompt',
        imageUrls: []
      }),
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('📦 Response body:', text);
    
    return {
      success: response.ok,
      status: response.status,
      body: text
    };
    
  } catch (error) {
    console.error('💥 Test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Simulated 3D model generation for development
export const simulateGeneration = async (prompt: string) => {
  console.log('🎭 Simulating 3D generation for prompt:', prompt);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock data
  return {
    success: true,
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    generatedImages: [
      'https://picsum.photos/512/512?random=1',
      'https://picsum.photos/512/512?random=2',
      'https://picsum.photos/512/512?random=3',
      'https://picsum.photos/512/512?random=4',
      'https://picsum.photos/512/512?random=5'
    ],
    message: 'تم إنشاء النموذج بنجاح (وضع المحاكاة)'
  };
};