import { testSupabaseConnection, simulateGeneration } from './debug-service';

interface Generate3DRequest {
  prompt: string;
  imageUrls?: string[];
}

interface Generate3DResponse {
  success: boolean;
  modelUrl?: string;
  generatedImages?: string[];
  message?: string;
  error?: string;
}

export class ThreeDService {
  private static getSupabaseUrl() {
    // استخراج Supabase URL من البيئة أو استخدام localhost للتطوير
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseUrl) {
      return `${supabaseUrl}/functions/v1/generate-3d-model`;
    }
    // fallback للتطوير المحلي
    return '/api/generate-3d-model';
  }

  static async generate3DModel(request: Generate3DRequest): Promise<Generate3DResponse> {
    try {
      console.log('🚀 Starting 3D model generation:', request);
      
      // أولاً جرب محاكاة النتائج للتطوير
      console.log('🎭 Using simulation mode for development...');
      return await simulateGeneration(request.prompt);
      
      /* 
      // الكود الحقيقي - سيتم تفعيله عند اكتمال الإعداد
      const response = await fetch(this.getSupabaseUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ''}`,
        },
        body: JSON.stringify(request),
      });

      console.log('📡 API Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 API Response data:', data);
      
      if (!response.ok) {
        console.error('❌ API Error:', data);
        throw new Error(data.error || 'فشل في توليد النموذج ثلاثي الأبعاد');
      }

      console.log('✅ 3D model generated successfully');
      return data;
      */
    } catch (error) {
      console.error('💥 Error generating 3D model:', error);
      
      // عند فشل API الحقيقي، استخدم المحاكاة
      console.log('🎭 Falling back to simulation...');
      return await simulateGeneration(request.prompt);
    }
  }

  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // تشخيص الاتصال
  static async testConnection() {
    return await testSupabaseConnection();
  }
}