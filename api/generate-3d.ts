// api/generate-3d.ts
import { GoogleGenAI, Modality } from '@google/genai';
import { fal } from '@fal-ai/client';

export const config = {
  runtime: 'nodejs20.x',
};

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), { status: 405 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const FAL_KEY = process.env.FAL_KEY;
    if (!GEMINI_API_KEY || !FAL_KEY) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing API keys' }), { status: 500 });
    }

    const { prompt, refs = [] } = await req.json() as { prompt: string; refs?: string[] };
    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'Missing prompt' }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    fal.config({ credentials: FAL_KEY });

    // يحول أي URL/داتا-URL لصيغة inlineData لتمريرها إلى Gemini
    async function urlToInlineData(u: string) {
      if (u.startsWith('data:image/')) {
        const m = u.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
        if (!m) return null;
        return { inlineData: { mimeType: m[1], data: m[2] } };
      }
      const r = await fetch(u);
      if (!r.ok) return null;
      const ct = r.headers.get('content-type') || 'image/png';
      const buf = Buffer.from(await r.arrayBuffer());
      return { inlineData: { mimeType: ct, data: buf.toString('base64') } };
    }

    const refParts: any[] = [];
    for (const r of refs) {
      const p = await urlToInlineData(r);
      if (p) refParts.push(p);
    }

    const MODEL_ID = 'gemini-2.0-flash-preview-image-generation';
    const SYSTEM_PROMPT =
      'Generate images of the SAME single building. Keep materials, colors, openings, roofline, floor count, and proportions IDENTICAL across all views. Neutral background.';

    async function generateView(parts: any[]) {
      const resp = await ai.models.generateContent({
        model: MODEL_ID,
        contents: parts,
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
      });
      const out = resp?.candidates?.[0]?.content?.parts || [];
      const img = out.find((p: any) => p.inlineData)?.inlineData?.data;
      if (!img) throw new Error('Gemini did not return an image');
      return `data:image/png;base64,${img}`;
    }

    // FRONT أولاً كمرجع
    const front = await generateView([
      { text: `${SYSTEM_PROMPT}\n${prompt}\nRender the SAME building, front elevation view.` },
      ...refParts,
    ]);

    // باقي الجهات بمرجع الأمام
    const frontRef = { inlineData: { mimeType: 'image/png', data: front.split(',')[1] } };
    const mk = (txt: string) => generateView([
      { text: `${SYSTEM_PROMPT}\n${prompt}\n${txt}\nKeep EXACT same building identity.` },
      ...refParts,
      frontRef,
    ]);

    const [back, left, right] = await Promise.all([
      mk('Render the SAME building, back elevation view.'),
      mk('Render the SAME building, left-side elevation view.'),
      mk('Render the SAME building, right-side elevation view.'),
    ]);

    // Tripo3D Multi-View (يقبل data: URLs مباشرة)
    const run = await fal.subscribe('tripo3d/tripo/v2.5/multiview-to-3d', {
      input: {
        front_image_url: front,
        left_image_url:  left,
        back_image_url:  back,
        right_image_url: right,
        texture: 'standard',
        pbr: true,
      },
      logs: true,
    });

    const glb = run?.data?.model_mesh?.url;
    if (!glb) throw new Error('Tripo3D did not return GLB URL');

    return new Response(JSON.stringify({ ok: true, model: glb }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || 'Internal error' }), { status: 500 });
  }
}
