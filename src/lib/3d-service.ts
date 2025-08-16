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
  private static readonly API_URL = '/functions/v1/generate-3d-model';

  static async generate3DModel(request: Generate3DRequest): Promise<Generate3DResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'فشل في توليد النموذج ثلاثي الأبعاد');
      }

      return data;
    } catch (error) {
      console.error('Error generating 3D model:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع'
      };
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
}