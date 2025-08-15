import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image, Video, Send, ArrowRight, MessageSquare, Camera, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const Input = () => {
  const [searchParams] = useSearchParams();
  const [inputType, setInputType] = useState<"upload" | "prompt">("prompt");
  const [promptText, setPromptText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  // Set input type based on URL parameter
  useEffect(() => {
    const service = searchParams.get("service");
    if (service === "upload" || service === "prompt") {
      setInputType(service);
    }
  }, [searchParams]);

  const samplePrompts = [
    "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة",
    "فيلا عصرية من طابق واحد مع مسبح وحديقة ومطبخ مفتوح وأربع غرف نوم",
    "مبنى تجاري من ثلاثة طوابق مع محلات في الطابق الأرضي ومكاتب في الطوابق العلوية",
    "مسجد بطراز معماري إسلامي مع مئذنة وقبة ومساحة للصلاة تتسع لـ 500 مصلي",
    "مدرسة حديثة من طابقين مع فصول دراسية ومختبرات ومكتبة وملعب"
  ];

  const detailedQuestions = {
    prompt: [
      "ما هو نوع المبنى؟ (سكني، تجاري، تعليمي، ديني، إلخ)",
      "كم عدد الطوابق المطلوبة؟",
      "ما هي المساحة التقريبية للأرض؟",
      "ما هو الطراز المعماري المفضل؟",
      "ما هي المواد المفضلة للبناء؟",
      "هل تريد مساحات خارجية (حديقة، موقف سيارات، إلخ)؟"
    ],
    upload: [
      "تأكد من وضوح الصور وجودتها العالية",
      "التقط صور من زوايا متعددة للمبنى",
      "قم بتضمين صور للداخل إذا كان ممكناً",
      "أضف صور للواجهات والتفاصيل المعمارية",
      "إذا كان لديك مقاطع فيديو، تأكد من الاستقرار أثناء التصوير"
    ]
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFiles(files);
      toast.success(`تم رفع ${files.length} ملف بنجاح`);
    }
  };

  const handleSubmit = () => {
    if (inputType === "prompt" && !promptText.trim()) {
      toast.error("يرجى إدخال وصف للمبنى");
      return;
    }
    
    if (inputType === "upload" && !uploadedFiles) {
      toast.error("يرجى رفع ملف واحد على الأقل");
      return;
    }

    // Save data to localStorage for demo purposes
    const projectData = {
      type: inputType,
      content: inputType === "prompt" ? promptText : undefined,
      files: inputType === "upload" ? Array.from(uploadedFiles || []).map(f => f.name) : undefined,
      status: "processing",
      timestamp: Date.now(),
      title: inputType === "prompt" ? "مشروع من الوصف النصي" : "مشروع من الصور"
    };

    localStorage.setItem("currentProject", JSON.stringify(projectData));
    toast.success("تم إرسال المشروع بنجاح!");
    
    setTimeout(() => {
      navigate("/preview");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            {inputType === "prompt" ? "إدخال وصف نصي" : "رفع الملفات"}
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {inputType === "prompt" ? "صف مشروعك بالتفصيل" : "ارفع صور أو مقاطع فيديو"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground px-4">
            {inputType === "prompt" 
              ? "كلما كان الوصف أكثر تفصيلاً، كانت النتائج أدق وأفضل" 
              : "تأكد من جودة ووضوح الملفات المرفوعة للحصول على أفضل النتائج"
            }
          </p>
        </div>

        {/* Input Type Selection */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <Button
            variant={inputType === "prompt" ? "default" : "outline"}
            size="lg"
            onClick={() => setInputType("prompt")}
            className="px-8 py-4"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            وصف نصي
          </Button>
          <Button
            variant={inputType === "upload" ? "default" : "outline"}
            size="lg"
            onClick={() => setInputType("upload")}
            className="px-8 py-4"
          >
            <Upload className="w-5 h-5 mr-2" />
            رفع ملفات
          </Button>
        </div>

        {/* Input Content */}
        <Card className="p-8 bg-card border-border/50">
          {inputType === "prompt" ? (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-4">
                  صف المبنى أو التصميم المطلوب
                </label>
                <Textarea
                  placeholder="مثال: منزل تقليدي من طابقين..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="min-h-32 text-lg bg-input border-border"
                  dir="rtl"
                />
              </div>

              {/* File Upload for Prompt */}
              <div>
                <label className="block text-lg font-semibold mb-4">
                  ارفع ملفات مرجعية (اختياري)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt,.dwg,.dxf,.plt,.dgn,.skp,.3ds,.obj,.fbx,.step,.iges,.stl,.ply,.zip,.rar"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload-prompt"
                  />
                  <label htmlFor="file-upload-prompt" className="cursor-pointer">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm mb-2">أضف صور أو ملفات مرجعية للتصميم</p>
                    <p className="text-xs text-muted-foreground">
                      يدعم: الصور، الفيديو، PDF، مستندات، مخططات CAD (DWG, DXF)، نماذج 3D
                    </p>
                  </label>
                </div>
              </div>

              {/* Uploaded Files for Prompt */}
              {uploadedFiles && (
                <div>
                  <p className="text-sm font-medium mb-3">الملفات المرفوعة:</p>
                  <div className="space-y-2">
                    {Array.from(uploadedFiles).map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-info" />
                        ) : (
                          <Video className="w-4 h-4 text-info" />
                        )}
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Prompts */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  أمثلة للمساعدة:
                </p>
                <div className="grid gap-3">
                  {samplePrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="text-right justify-start h-auto p-4 text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setPromptText(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-4">
                  ارفع صور أو مقاطع فيديو للمبنى
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt,.dwg,.dxf,.plt,.dgn,.skp,.3ds,.obj,.fbx,.step,.iges,.stl,.ply,.zip,.rar"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
                    <p className="text-sm text-muted-foreground">
                      يدعم جميع صيغ الصور، الفيديو، PDF، مستندات، مخططات CAD، نماذج 3D
                    </p>
                  </label>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles && (
                <div>
                  <p className="text-sm font-medium mb-3">الملفات المرفوعة:</p>
                  <div className="space-y-2">
                    {Array.from(uploadedFiles).map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-5 h-5 text-info" />
                        ) : (
                          <Video className="w-5 h-5 text-info" />
                        )}
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              className="btn-primary px-8 py-4 text-lg font-semibold"
              disabled={!promptText.trim() && !uploadedFiles}
            >
              <Send className="w-5 h-5 mr-2" />
              إنشاء المخططات
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          <Card className="p-6 bg-card border-border/50">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">ما ستحصل عليه</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• نموذج ثلاثي الأبعاد تفاعلي</li>
              <li>• مخططات الطوابق</li>
              <li>• المساقط الجانبية</li>
              
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <Upload className="w-8 h-8 text-success mb-4" />
            <h3 className="text-lg font-semibold mb-2">تنسيقات التصدير</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AutoCAD (.DWG)</li>
              <li>• مستندات PDF</li>
              <li>• ملفات DXF</li>
              <li>• صور عالية الدقة</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};