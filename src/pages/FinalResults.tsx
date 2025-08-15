import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Layers, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Interactive3DViewer } from "@/components/Interactive3DViewer";

export const FinalResults = () => {
  const [project, setProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("3d");
  const navigate = useNavigate();

  useEffect(() => {
    const finalProject = localStorage.getItem("finalProject");
    if (finalProject) {
      setProject(JSON.parse(finalProject));
    } else {
      // إذا لم توجد بيانات المشروع النهائي، اعرض رسالة خطأ أو ارجع للصفحة السابقة
      toast.error("لم يتم العثور على بيانات المشروع");
      navigate("/preview");
    }
  }, [navigate]);

  const handleDownload = (format: string) => {
    toast.success(`تم تحميل الملف بتنسيق ${format}`);
  };

  const saveToHistory = () => {
    if (project) {
      const history = JSON.parse(localStorage.getItem("projectHistory") || "[]");
      const existingIndex = history.findIndex((p: any) => p.id === project.id);
      
      if (existingIndex > -1) {
        history[existingIndex] = project;
      } else {
        history.unshift(project);
      }
      
      localStorage.setItem("projectHistory", JSON.stringify(history));
      localStorage.removeItem("finalProject"); // تنظيف البيانات المؤقتة
      toast.success("تم حفظ المشروع");
    }
  };

  const startNewProject = () => {
    localStorage.removeItem("finalProject");
    localStorage.removeItem("currentProject");
    navigate("/services");
  };

  if (!project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">جاري تحضير النتائج النهائية...</h2>
          <p className="text-muted-foreground">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              النتائج النهائية - {project.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="status-chip completed">مكتمل</span>
              <span className="text-sm text-muted-foreground">
                جميع التصاميم جاهزة للتحميل
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={saveToHistory}
              className="px-6 mobile-touch"
            >
              حفظ في التاريخ
            </Button>
            <Button 
              onClick={startNewProject}
              className="px-6 btn-primary mobile-touch"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              مشروع جديد
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* Download Panel */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <Card className="p-6 bg-card border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                تحميل جميع الملفات
              </h3>
              
              <div className="space-y-3">
                <Button 
                  className="w-full btn-primary" 
                  onClick={() => handleDownload("ALL_DWG")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  حزمة AutoCAD الكاملة
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleDownload("ALL_PDF")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  جميع المخططات PDF
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleDownload("3D_MODEL")}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  النموذج ثلاثي الأبعاد
                </Button>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3">تحميل منفرد</h4>
                  <div className="space-y-2">
                     <Button 
                       variant="ghost" 
                       size="sm"
                       className="w-full justify-start" 
                       onClick={() => handleDownload("FLOOR_PLAN")}
                     >
                       مخطط أرضية
                     </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-start" 
                      onClick={() => handleDownload("ELEVATIONS")}
                    >
                      المساقط
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Project Summary */}
            <Card className="p-6 bg-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">ملخص المشروع</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">النوع:</span>
                  <span>{project.type === "prompt" ? "وصف نصي" : project.type === "upload" ? "رفع ملفات" : "عرض توضيحي"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span>{new Date(project.timestamp || Date.now()).toLocaleDateString('ar-SA')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التعديلات:</span>
                  <span>{project.modifications?.length || 0} تعديل</span>
                </div>
                
                {project.content && (
                  <div>
                    <span className="text-muted-foreground">الوصف الأساسي:</span>
                    <p className="mt-1 text-xs leading-relaxed">{project.content}</p>
                  </div>
                )}

                {project.modifications && project.modifications.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">آخر تعديل:</span>
                    <p className="mt-1 text-xs leading-relaxed">{project.modifications[project.modifications.length - 1]}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Viewer */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="bg-card border-border/50 overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-border px-4 md:px-6 py-4">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-accent">
                    <TabsTrigger value="3d" className="text-xs sm:text-sm">النموذج ثلاثي الأبعاد</TabsTrigger>
                    <TabsTrigger value="floor" className="text-xs sm:text-sm">مخطط أرضية</TabsTrigger>
                    <TabsTrigger value="elevation" className="text-xs sm:text-sm">المساقط</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 md:p-6">
                  <TabsContent value="3d" className="mt-0">
                    <Interactive3DViewer 
                      modelType="traditional-house" 
                      className="w-full"
                    />
                  </TabsContent>

                  <TabsContent value="floor" className="mt-0">
                    <div className="relative bg-white rounded-lg aspect-video overflow-hidden">
                      <img 
                        src="/lovable-uploads/1db97232-e98e-4080-a6b5-03b6ee33eabd.png" 
                        alt="مخطط أرضية النهائي" 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-end justify-start opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="p-6 text-white">
                          <h3 className="text-lg font-semibold mb-2">مخطط أرضية النهائي</h3>
                          <p className="text-sm opacity-90">المساقط الأفقية والتخطيط الداخلي مع الفناء المركزي</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="elevation" className="mt-0">
                    <div className="relative bg-muted rounded-lg aspect-video overflow-hidden">
                      <img 
                        src="/lovable-uploads/602a1e64-0a86-41cd-b250-7f60f95ff0a6.png" 
                        alt="المساقط الجانبية النهائية" 
                        className="w-full h-full object-contain bg-white"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-end justify-start">
                        <div className="p-6 text-white">
                          <h3 className="text-lg font-semibold mb-2">المساقط الأفقية النهائية</h3>
                          <p className="text-sm opacity-90">مخطط المنزل التقليدي مع توزيع الغرف والفناء المركزي</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};