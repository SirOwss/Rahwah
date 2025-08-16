import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, FileText, Brain, Palette, Loader2 } from "lucide-react";
import { generate3D_JSON, fileToDataURL } from "@/lib/generated3d";
import { toast } from "sonner";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: number;
  completed: boolean;
}

export const ProcessingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps: ProcessingStep[] = [
    {
      id: "review",
      title: "مراجعة البيانات",
      description: "يتم الآن مراجعة البيانات المدخلة والتأكد من صحتها",
      icon: FileText,
      duration: 2000,
      completed: false
    },
    {
      id: "analyze",
      title: "تحليل الملفات والبيانات",
      description: "جاري تحليل الملفات المرفوعة واستخراج المعلومات المهمة",
      icon: Brain,
      duration: 3000,
      completed: false
    },
    {
      id: "design",
      title: "إنشاء التصميم",
      description: "يتم الآن إنشاء التصميم الثلاثي والثنائي الأبعاد",
      icon: Palette,
      duration: 4000,
      completed: false
    }
  ];

  const [processSteps, setProcessSteps] = useState(steps);

  useEffect(() => {
    let totalDuration = 0;
    const intervals: NodeJS.Timeout[] = [];

    processSteps.forEach((step, index) => {
      totalDuration += step.duration;
      
      const timeout = setTimeout(() => {
        setCurrentStep(index + 1);
        setProcessSteps(prev => 
          prev.map((s, i) => 
            i === index ? { ...s, completed: true } : s
          )
        );

        // إذا كانت هذه الخطوة الأخيرة، ابدأ توليد النموذج ثلاثي الأبعاد
        if (index === processSteps.length - 1) {
          setTimeout(async () => {
            try {
              const currentProject = JSON.parse(localStorage.getItem('currentProject') || '{}');
              const prompt = currentProject.content || "تصميم منزل تقليدي";
              
              // جمع الصور المرجعية
              const refs: string[] = [];
              if (currentProject.uploadedFiles) {
                for (const file of currentProject.uploadedFiles) {
                  if (file.type?.startsWith('image/')) {
                    refs.push(await fileToDataURL(file));
                  }
                }
              }
              
              const modelUrl = await generate3D_JSON({ prompt, refs });
              
              const finalProject = {
                ...currentProject,
                modelUrl,
                generatedAt: new Date().toISOString()
              };
              
              localStorage.setItem('finalProject', JSON.stringify(finalProject));
              toast.success('تم إنشاء النموذج ثلاثي الأبعاد بنجاح');
              navigate("/final-results");
            } catch (error) {
              console.error('Error generating 3D model:', error);
              toast.error('حدث خطأ في إنشاء النموذج ثلاثي الأبعاد');
              navigate("/preview");
            }
          }, 1000);
        }
      }, totalDuration);

      intervals.push(timeout);
    });

    // تحديث شريط التقدم
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, (totalDuration + 1000) / 100);

    intervals.push(progressInterval);

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [navigate, processSteps.length]);

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
            <Brain className="w-4 h-4" />
            معالجة وتحليل البيانات
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            جاري إنشاء تصميمك...
          </h1>
          <p className="text-muted-foreground">
            يرجى الانتظار بينما نقوم بمعالجة بياناتك وإنشاء التصميم المطلوب
          </p>
        </div>

        {/* Progress Card */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">التقدم العام</span>
                <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Processing Steps */}
            <div className="space-y-4">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep - 1 && !step.completed;
                const isCompleted = step.completed;
                const isPending = index >= currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-500 ${
                      isCompleted
                        ? "border-green-500/20 bg-green-50/50 dark:bg-green-950/20"
                        : isActive
                        ? "border-primary/30 bg-primary/5 animate-pulse"
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                        isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : isActive
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground/20 bg-background text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 transition-colors duration-500 ${
                          isCompleted
                            ? "text-green-700 dark:text-green-400"
                            : isActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm transition-colors duration-500 ${
                          isCompleted
                            ? "text-green-600 dark:text-green-500"
                            : isActive
                            ? "text-foreground"
                            : "text-muted-foreground/70"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-2 text-primary">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                        <span className="text-xs font-medium">جاري التنفيذ</span>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs font-medium">مكتمل</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2 text-sm">ما يحدث الآن؟</h3>
            <p className="text-xs text-muted-foreground">
              نحن نقوم بتحليل بياناتك والملفات المرفوعة لإنشاء تصميم مخصص يناسب احتياجاتك. 
              هذه العملية تتطلب بضع دقائق لضمان أفضل النتائج.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 text-sm">ماذا بعد؟</h3>
            <p className="text-xs text-muted-foreground">
              بعد اكتمال المعالجة، ستنتقل تلقائياً إلى محرر التصميم حيث يمكنك معاينة 
              وتخصيص التصميم حسب رغبتك.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};