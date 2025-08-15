import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ArrowRight, Download, Eye, FileText, Layers, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Demo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  const demoPrompt = "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة";

  const steps = [
    {
      title: "الإدخال",
      description: "المستخدم يكتب الوصف أو يرفع الصور",
      icon: FileText,
      status: "completed"
    },
    {
      title: "المعالجة",
      description: "الذكاء الاصطناعي يحلل ويولد النموذج",
      icon: Clock,
      status: "completed"
    },
    {
      title: "النتيجة",
      description: "نموذج ثلاثي الأبعاد ومخططات جاهزة",
      icon: CheckCircle,
      status: "completed"
    }
  ];

  const handleStartDemo = () => {
    setShowDemo(true);
    toast.success("بدء العرض التوضيحي");
  };

  const handleTryYourself = () => {
    localStorage.setItem("currentProject", JSON.stringify({
      type: "demo",
      content: demoPrompt,
      status: "completed",
      id: "demo-001",
      title: "المنزل التقليدي - عرض توضيحي",
      timestamp: Date.now()
    }));
    navigate("/preview");
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            العرض التوضيحي
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            شاهد كيف يحول نقش وصفاً بسيطاً إلى مخططات معمارية متكاملة
          </p>
        </div>

        {!showDemo ? (
          <>
            {/* Demo Introduction */}
            <Card className="p-8 mb-8 bg-card border-border/50 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">
                مثال حقيقي: تصميم منزل تقليدي
              </h2>
              
              <div className="bg-muted p-6 rounded-lg mb-6 max-w-3xl mx-auto">
                <p className="text-lg leading-relaxed" dir="rtl">
                  "{demoPrompt}"
                </p>
              </div>

              <Button 
                size="lg" 
                className="btn-primary px-8 py-4 text-lg font-semibold"
                onClick={handleStartDemo}
              >
                <Play className="w-5 h-5 mr-2" />
                شاهد النتيجة
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>

            {/* Process Steps */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="p-6 bg-card border-border/50 text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs text-success">مكتمل</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Demo Results */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Info Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="text-lg font-semibold mb-4">معلومات المشروع</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">النوع:</span>
                      <span>وصف نصي</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الحالة:</span>
                      <span className="text-success">مكتمل</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المدة:</span>
                      <span>48 ساعة</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-4">الوصف المُدخل:</p>
                    <p className="text-xs leading-relaxed">{demoPrompt}</p>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h3 className="text-lg font-semibold mb-4">ملفات التحميل</h3>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full btn-primary" 
                      onClick={() => toast.success("تم تحميل ملف AutoCAD")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      AutoCAD (.DWG)
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => toast.success("تم تحميل ملف PDF")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      مخططات PDF
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => toast.success("تم تحميل ملف DXF")}
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      ملف DXF
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Main Viewer */}
              <div className="lg:col-span-3">
                <Card className="bg-card border-border/50 overflow-hidden">
                  <Tabs defaultValue="3d" className="w-full">
                    <div className="border-b border-border px-6 py-4">
                      <TabsList className="grid w-full grid-cols-3 bg-accent">
                        <TabsTrigger value="3d" className="text-sm">النموذج ثلاثي الأبعاد</TabsTrigger>
                        <TabsTrigger value="floor" className="text-sm">مخطط الطابق</TabsTrigger>
                        <TabsTrigger value="elevation" className="text-sm">المساقط</TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-6">
                      <TabsContent value="3d" className="mt-0">
                        <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg aspect-video flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <Eye className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">النموذج ثلاثي الأبعاد</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                              منزل تقليدي بطابقين مع فناء مركزي ونوافذ خشبية مزخرفة
                            </p>
                            <div className="text-xs text-muted-foreground">
                              • مساحة البناء: 200 متر مربع
                              <br />
                              • عدد الغرف: 3 غرف نوم
                              <br />
                              • المواد: طوب طيني، خشب، حجر طبيعي
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="floor" className="mt-0">
                        <div className="bg-white rounded-lg aspect-video flex items-center justify-center p-4">
                          <img 
                            src="/lovable-uploads/1db97232-e98e-4080-a6b5-03b6ee33eabd.png" 
                            alt="مخطط أرضية المنزل التقليدي" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="elevation" className="mt-0">
                        <div className="bg-white rounded-lg aspect-video flex items-center justify-center p-4">
                          <img 
                            src="/lovable-uploads/602a1e64-0a86-41cd-b250-7f60f95ff0a6.png" 
                            alt="المساقط الأفقية للمنزل التقليدي" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </TabsContent>

                    </div>
                  </Tabs>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 md:mt-12">
              <Button 
                size="lg" 
                className="btn-primary px-8 py-4 text-lg font-semibold mobile-touch w-full sm:w-auto"
                onClick={handleTryYourself}
              >
                استكشف النتيجة بالتفصيل
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg mobile-touch w-full sm:w-auto"
                onClick={() => navigate("/input")}
              >
                ابدأ مشروعك الخاص
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};