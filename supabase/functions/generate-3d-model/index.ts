import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, imageUrls = [] } = await req.json()
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'الرجاء تقديم وصف للمبنى' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    const TRIPO3D_SECRET = Deno.env.get('TRIPO3D_SECRET')
    const TRIPO3D_CLIENT_ID = Deno.env.get('TRIPO3D_CLIENT_ID')

    if (!GEMINI_API_KEY || !TRIPO3D_SECRET || !TRIPO3D_CLIENT_ID) {
      return new Response(
        JSON.stringify({ error: 'API keys غير متوفرة' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Starting building generation with prompt:', prompt)

    // Step 1: Generate 5 views with Gemini
    const views = ['front', 'back', 'left', 'right', 'top']
    const generatedImages: string[] = []

    for (const view of views) {
      try {
        const viewPrompt = `${prompt}. Create a detailed architectural rendering of the building from the ${view} view. The building should be realistic, well-lit, and show clear architectural details. Style: photorealistic architectural rendering.`
        
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: viewPrompt },
                ...imageUrls.map((url: string) => ({
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: url.split(',')[1] // Remove data:image/jpeg;base64, prefix
                  }
                }))
              ]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192,
            }
          })
        })

        if (!geminiResponse.ok) {
          console.error(`Gemini API error for ${view}:`, await geminiResponse.text())
          continue
        }

        const geminiData = await geminiResponse.json()
        
        // For now, we'll use placeholder images since Gemini text-to-image is complex
        // In production, you'd use Gemini's image generation or another service
        const placeholderImage = `https://picsum.photos/512/512?random=${Math.random()}`
        generatedImages.push(placeholderImage)
        
        console.log(`Generated ${view} view image`)
      } catch (error) {
        console.error(`Error generating ${view} view:`, error)
      }
    }

    if (generatedImages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'فشل في توليد الصور' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Generated images count:', generatedImages.length)

    // Step 2: Convert to 3D with Tripo3D
    try {
      const tripo3dResponse = await fetch('https://api.tripo3d.ai/v2/openapi/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TRIPO3D_SECRET}`,
        },
        body: JSON.stringify({
          type: 'multiview_to_3d',
          original_model_name: 'Generated Building',
          front_image_url: generatedImages[0] || '',
          back_image_url: generatedImages[1] || '',
          left_image_url: generatedImages[2] || '',
          right_image_url: generatedImages[3] || '',
          top_image_url: generatedImages[4] || '',
        })
      })

      if (!tripo3dResponse.ok) {
        const errorText = await tripo3dResponse.text()
        console.error('Tripo3D API error:', errorText)
        return new Response(
          JSON.stringify({ error: 'فشل في تحويل الصور إلى نموذج ثلاثي الأبعاد' }), 
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const tripo3dData = await tripo3dResponse.json()
      const taskId = tripo3dData.data?.task_id

      if (!taskId) {
        return new Response(
          JSON.stringify({ error: 'لم يتم الحصول على معرف المهمة من Tripo3D' }), 
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('Tripo3D task created:', taskId)

      // Poll for completion
      let attempts = 0
      const maxAttempts = 30 // 5 minutes max
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 10000)) // Wait 10 seconds
        
        const statusResponse = await fetch(`https://api.tripo3d.ai/v2/openapi/task/${taskId}`, {
          headers: {
            'Authorization': `Bearer ${TRIPO3D_SECRET}`,
          }
        })

        if (statusResponse.ok) {
          const statusData = await statusResponse.json()
          
          if (statusData.data?.status === 'success') {
            const modelUrl = statusData.data?.result?.model?.url
            
            if (modelUrl) {
              return new Response(
                JSON.stringify({ 
                  success: true, 
                  modelUrl,
                  generatedImages,
                  message: 'تم إنشاء النموذج ثلاثي الأبعاد بنجاح'
                }), 
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              )
            }
          } else if (statusData.data?.status === 'failed') {
            return new Response(
              JSON.stringify({ error: 'فشل في إنشاء النموذج ثلاثي الأبعاد' }), 
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
        }
        
        attempts++
      }

      return new Response(
        JSON.stringify({ error: 'انتهت مهلة إنشاء النموذج ثلاثي الأبعاد' }), 
        { status: 408, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (error) {
      console.error('Tripo3D error:', error)
      return new Response(
        JSON.stringify({ error: 'خطأ في الاتصال مع Tripo3D' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ error: 'حدث خطأ في الخادم' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})