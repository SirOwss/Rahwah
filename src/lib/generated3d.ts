export async function generate3D_JSON({
    prompt,
    refs = [],
  }: {
    prompt: string;
    refs?: string[];
  }): Promise<string> {
    const r = await fetch('/api/generate-3d', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt, refs }),
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || 'Generation failed');
    return j.model as string;
  }
  
  export function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }
  