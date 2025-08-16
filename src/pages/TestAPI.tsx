import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThreeDService } from '@/lib/3d-service';
import { toast } from 'sonner';

export default function TestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('مبنى سكني بسيط بطراز عسير التقليدي');
  const [results, setResults] = useState<any>(null);

  const handleTest = async () => {
    setIsLoading(true);
    setResults(null);

    try {
      console.log('🧪 Starting API test...');
      toast.info('جاري اختبار API...');

      const result = await ThreeDService.generate3DModel({
        prompt: prompt,
        imageUrls: []
      });

      console.log('✅ Test results:', result);
      setResults(result);

      if (result.success) {
        toast.success('تم الاختبار بنجاح! ✅');
      } else {
        toast.error('فشل في الاختبار ❌');
      }
    } catch (error) {
      console.error('❌ Test error:', error);
      toast.error(`خطأ في الاختبار: ${error.message}`);
      setResults({ 
        success: false, 
        error: error.message,
        details: error.toString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectionTest = async () => {
    setIsLoading(true);
    try {
      console.log('🔌 Testing connection...');
      toast.info('جاري اختبار الاتصال...');
      
      const result = await ThreeDService.testConnection();
      console.log('🔌 Connection test result:', result);
      
      if (result.success) {
        toast.success('الاتصال يعمل بشكل صحيح! ✅');
      } else {
        toast.error('فشل في الاتصال ❌');
      }
      
      setResults(result);
    } catch (error) {
      console.error('❌ Connection test error:', error);
      toast.error(`خطأ في اختبار الاتصال: ${error.message}`);
      setResults({ 
        success: false, 
        error: error.message 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">🧪 اختبار API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">وصف المبنى:</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="أدخل وصف المبنى المراد إنشاؤه..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={handleTest}
                disabled={isLoading || !prompt.trim()}
                className="flex-1"
              >
                {isLoading ? '⏳ جاري الاختبار...' : '🚀 اختبار API كامل'}
              </Button>
              
              <Button
                onClick={handleConnectionTest}
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                {isLoading ? '⏳ جاري الاختبار...' : '🔌 اختبار الاتصال'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {results.success ? '✅ نتائج إيجابية' : '❌ نتائج سلبية'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.success && (
                  <div className="text-green-600 font-medium">
                    ✅ {results.message || 'تم الاختبار بنجاح'}
                  </div>
                )}
                
                {results.error && (
                  <div className="text-red-600 font-medium">
                    ❌ خطأ: {results.error}
                  </div>
                )}

                {results.generatedImages && results.generatedImages.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">🖼️ الصور المولدة:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {results.generatedImages.map((url: string, index: number) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Generated view ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {results.modelUrl && (
                  <div>
                    <h4 className="font-semibold mb-2">🎯 النموذج ثلاثي الأبعاد:</h4>
                    <a
                      href={results.modelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {results.modelUrl}
                    </a>
                  </div>
                )}

                {results.architecturalDescription && (
                  <div>
                    <h4 className="font-semibold mb-2">🏗️ الوصف المعماري:</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {results.architecturalDescription}
                    </p>
                  </div>
                )}

                <details className="mt-4">
                  <summary className="cursor-pointer font-medium">🔍 تفاصيل تقنية</summary>
                  <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto">
                    {JSON.stringify(results, null, 2)}
                  </pre>
                </details>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>ℹ️ معلومات الاختبار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• <strong>اختبار الاتصال:</strong> يتحقق من أن edge function يعمل</p>
              <p>• <strong>اختبار API كامل:</strong> يختبر Gemini و Tripo3D APIs</p>
              <p>• <strong>النتائج المتوقعة:</strong> صور معمارية وربما نموذج 3D</p>
              <p>• <strong>الصور:</strong> حالياً نستخدم صور تجريبية من Unsplash</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}