import { supabase } from '@/integrations/supabase/client';

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
  static async generate3DModel(request: Generate3DRequest): Promise<Generate3DResponse> {
    try {
      console.log('🚀 Starting 3D model generation:', request);
      
      // استخدام Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-3d-model', {
        body: request,
      });

      console.log('📡 Supabase Function Response:', { data, error });
      
      if (error) {
        console.error('❌ Supabase Function Error:', error);
        throw new Error(error.message || 'فشل في توليد النموذج ثلاثي الأبعاد');
      }

      if (!data || !data.success) {
        console.error('❌ API Error:', data);
        throw new Error(data?.error || 'فشل في توليد النموذج ثلاثي الأبعاد');
      }

      console.log('✅ 3D model generated successfully');
      return data;
    } catch (error) {
      console.error('💥 Error generating 3D model:', error);
      throw error;
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
    try {
      const { data, error } = await supabase.functions.invoke('generate-3d-model', {
        body: { prompt: 'test connection' },
      });
      return { success: !error, data, error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}