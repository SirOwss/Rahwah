// مؤقتاً - API غير متاح
export async function generate3D_JSON({
    prompt,
    refs = [],
  }: {
    prompt: string;
    refs?: string[];
  }): Promise<string> {
    // محاكاة تأخير للعرض
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // إرجاع URL تجريبي للنموذج ثلاثي الأبعاد
    console.log('Generating 3D model with prompt:', prompt, 'and refs:', refs);
    return "https://storage.googleapis.com/lovable-uploads/sample-model.glb";
  }
  
  export function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }
  