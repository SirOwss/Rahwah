import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Layers, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Eye, 
  Printer,
  Share2,
  Maximize,
  Settings,
  Info,
  Calculator,
  PlaneTakeoff,
  Home,
  Palette
} from "lucide-react";
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
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        {/* Enhanced Header */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  مكتمل
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(project.timestamp || Date.now()).toLocaleDateString('ar-SA')}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                {project.title || "مشروع معماري جديد"}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                تم إنجاز المشروع بنجاح مع جميع التصاميم والمخططات ثلاثية الأبعاد
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                طباعة التقرير
              </Button>
              <Button variant="outline" onClick={saveToHistory}>
                حفظ في التاريخ
              </Button>
              <Button onClick={startNewProject} className="btn-primary">
                <ArrowRight className="w-4 h-4 mr-2" />
                مشروع جديد
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">حالة إنجاز المشروع</h3>
              <span className="text-sm font-medium text-green-600">100%</span>
            </div>
            <Progress value={100} className="w-full h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>التصميم الأولي</span>
              <span>المراجعة والتعديل</span>
              <span>النتيجة النهائية</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="space-y-8">
          {/* Enhanced 3D Model Viewer */}
          <Card className="bg-card border-border/50 overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  النموذج التفاعلي ثلاثي الأبعاد
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Maximize className="w-4 h-4 mr-1" />
                    ملء الشاشة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    إعدادات العرض
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <Interactive3DViewer 
                modelType="traditional-house" 
                className="w-full h-[500px]"
              />
            </div>
          </Card>

          {/* Comprehensive Project Report */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Report Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Overview */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    معلومات المشروع الأساسية
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">نوع المشروع</label>
                      <p className="text-sm">{project.type === "prompt" ? "منزل تقليدي بفناء مركزي" : "مشروع مخصص"}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">المساحة الإجمالية</label>
                      <p className="text-sm">250 متر مربع</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">عدد الغرف</label>
                      <p className="text-sm">4 غرف نوم + صالة + مطبخ</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">نمط العمارة</label>
                      <p className="text-sm">تقليدي مع لمسات عصرية</p>
                    </div>
                  </div>
                  
                  {project.content && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">الوصف الأساسي</label>
                      <p className="text-sm leading-relaxed bg-muted/30 p-3 rounded-lg">
                        {project.content}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Technical Specifications */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <PlaneTakeoff className="w-5 h-5" />
                    المواصفات التقنية
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">الهيكل الإنشائي</h3>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• أساسات خرسانية مسلحة</li>
                        <li>• جدران من الطوب الأحمر</li>
                        <li>• سقف خرساني مع عزل حراري</li>
                        <li>• أعمدة خرسانية مسلحة</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">التشطيبات</h3>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• بلاط سيراميك للأرضيات</li>
                        <li>• دهانات عالية الجودة</li>
                        <li>• نوافذ ألمنيوم مع زجاج مزدوج</li>
                        <li>• أبواب خشبية طبيعية</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">الأنظمة الكهربائية</h3>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• إضاءة LED موفرة للطاقة</li>
                        <li>• نظام تكييف مركزي</li>
                        <li>• نظام إنذار وأمان</li>
                        <li>• توصيلات ذكية للمنزل</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">أنظمة السباكة</h3>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• شبكة مياه ساخنة وباردة</li>
                        <li>• نظام صرف صحي متطور</li>
                        <li>• خزان مياه علوي</li>
                        <li>• نظام ري للحديقة</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Implementation Guide */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    دليل التنفيذ
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid gap-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <h3 className="font-medium text-sm">إعداد الموقع والحفر</h3>
                        <p className="text-xs text-muted-foreground mt-1">تحضير الأرض وحفر الأساسات وفقاً للمخططات</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h3 className="font-medium text-sm">صب الأساسات والهيكل</h3>
                        <p className="text-xs text-muted-foreground mt-1">تنفيذ الأساسات الخرسانية والأعمدة والجسور</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <h3 className="font-medium text-sm">بناء الجدران والسقف</h3>
                        <p className="text-xs text-muted-foreground mt-1">رفع الجدران وصب السقف مع نظام العزل</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <div>
                        <h3 className="font-medium text-sm">الأعمال الكهربائية والسباكة</h3>
                        <p className="text-xs text-muted-foreground mt-1">تمديد الشبكات والأنظمة الداخلية</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">5</div>
                      <div>
                        <h3 className="font-medium text-sm">التشطيبات النهائية</h3>
                        <p className="text-xs text-muted-foreground mt-1">الدهانات والأرضيات والتركيبات النهائية</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Plans and Drawings */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    المخططات التفصيلية
                  </h2>
                </div>
                <div className="p-6">
                  <Tabs defaultValue="floor" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="floor">مخطط أرضية</TabsTrigger>
                      <TabsTrigger value="elevation">المساقط</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="floor" className="mt-4">
                      <div className="relative bg-white rounded-lg overflow-hidden border">
                        <img 
                          src="/lovable-uploads/1db97232-e98e-4080-a6b5-03b6ee33eabd.png" 
                          alt="مخطط أرضية النهائي" 
                          className="w-full h-auto object-contain"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => window.open("/lovable-uploads/1db97232-e98e-4080-a6b5-03b6ee33eabd.png", "_blank")}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          عرض كامل
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        مخطط أرضية يوضح التوزيع الداخلي للغرف مع الفناء المركزي التقليدي
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="elevation" className="mt-4">
                      <div className="relative bg-white rounded-lg overflow-hidden border">
                        <img 
                          src="/lovable-uploads/602a1e64-0a86-41cd-b250-7f60f95ff0a6.png" 
                          alt="المساقط الجانبية النهائية" 
                          className="w-full h-auto object-contain"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => window.open("/lovable-uploads/602a1e64-0a86-41cd-b250-7f60f95ff0a6.png", "_blank")}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          عرض كامل
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        المساقط الخارجية توضح الواجهات والارتفاعات المختلفة للمبنى
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>

            {/* Sidebar - Downloads and Cost Estimate */}
            <div className="lg:col-span-1 space-y-6">
              {/* Download Panel */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    تحميل الملفات
                  </h3>
                </div>
                <div className="p-6 space-y-3">
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
                    <h4 className="font-medium mb-3 text-sm">تصدير منفرد</h4>
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full justify-start" 
                        onClick={() => handleDownload("REPORT")}
                      >
                        تقرير المشروع
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Cost Estimate */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    التكلفة التقديرية
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">الأعمال الإنشائية:</span>
                      <span>180,000 ريال</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">التشطيبات:</span>
                      <span>120,000 ريال</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">الأنظمة الكهربائية:</span>
                      <span>45,000 ريال</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">أعمال السباكة:</span>
                      <span>35,000 ريال</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>الإجمالي:</span>
                        <span className="text-primary">380,000 ريال</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    * التكلفة تقديرية وقد تختلف حسب المواد المختارة وظروف الموقع
                  </div>
                </div>
              </Card>

              {/* Project Summary */}
              <Card className="bg-card border-border/50">
                <div className="border-b border-border px-6 py-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    ملخص المشروع
                  </h3>
                </div>
                <div className="p-6 space-y-3 text-sm">
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
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المدة المقدرة:</span>
                    <span>6-8 أشهر</span>
                  </div>

                  {project.modifications && project.modifications.length > 0 && (
                    <div className="pt-3 border-t border-border">
                      <span className="text-muted-foreground text-xs">آخر تعديل:</span>
                      <p className="mt-1 text-xs leading-relaxed bg-muted/30 p-2 rounded">
                        {project.modifications[project.modifications.length - 1]}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};