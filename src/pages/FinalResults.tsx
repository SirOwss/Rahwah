import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Palette,
  Building2,
  MapPin,
  User,
  Calendar,
  Shield,
  Zap,
  Wind,
  Sun,
  AlertTriangle,
  Thermometer,
  Ruler,
  HardHat,
  FileCheck,
  Database,
  BarChart3,
  TrendingUp,
  Leaf,
  Save,
  Plus,
  Bot,
  Cpu,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Interactive3DViewer } from "@/components/Interactive3DViewer";

const FinalResults = () => {
  const [project, setProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const finalProject = localStorage.getItem("finalProject");
    if (finalProject) {
      setProject(JSON.parse(finalProject));
    } else {
      toast.error("لم يتم العثور على بيانات المشروع");
      navigate("/preview");
    }
  }, [navigate]);

  const finalProject = JSON.parse(localStorage.getItem('finalProject') || 'null');
  const modelUrl = finalProject?.modelUrl || JSON.parse(localStorage.getItem('currentProject') || 'null')?.modelUrl || null;

  const handleDownload = (type: string) => {
    if (type === '3D') {
      if (!modelUrl) {
        toast.error('لا يوجد نموذج ثلاثي الأبعاد متاح للتحميل');
        return;
      }
      const a = document.createElement('a');
      a.href = modelUrl;
      a.download = 'model.glb';
      a.click();
      toast.success('تم تحميل النموذج ثلاثي الأبعاد');
      return;
    }
    toast.success(`تم تحميل الملف بتنسيق ${type}`);
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
      localStorage.removeItem("finalProject");
      toast.success("تم حفظ المشروع");
    }
  };

  const startNewProject = () => {
    localStorage.removeItem("finalProject");
    localStorage.removeItem("currentProject");
    navigate("/services");
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePrintDetailedReport = () => {
    const printContent = document.getElementById('detailed-report-content');
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>التقرير الشامل للمشروع المعماري</title>
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; margin: 20px; }
                .space-y-8 > * + * { margin-top: 2rem; }
                .space-y-6 > * + * { margin-top: 1.5rem; }
                .space-y-4 > * + * { margin-top: 1rem; }
                .space-y-3 > * + * { margin-top: 0.75rem; }
                .space-y-2 > * + * { margin-top: 0.5rem; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
                .gap-4 { gap: 1rem; }
                .gap-6 { gap: 1.5rem; }
                .gap-8 { gap: 2rem; }
                .text-center { text-align: center; }
                .font-bold { font-weight: bold; }
                .text-primary { color: #2563eb; }
                .text-secondary { color: #7c3aed; }
                .text-muted-foreground { color: #6b7280; }
                .border-b { border-bottom: 1px solid #e5e7eb; }
                .pb-8 { padding-bottom: 2rem; }
                .p-4 { padding: 1rem; }
                .p-6 { padding: 1.5rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-3 { margin-bottom: 0.75rem; }
                .mb-4 { margin-bottom: 1rem; }
                .rounded { border-radius: 0.375rem; }
                .bg-muted { background-color: #f3f4f6; }
                .bg-primary { background-color: #2563eb; color: white; }
                .leading-relaxed { line-height: 1.625; }
                .text-sm { font-size: 0.875rem; }
                .text-xs { font-size: 0.75rem; }
                .text-lg { font-size: 1.125rem; }
                .text-xl { font-size: 1.25rem; }
                .text-2xl { font-size: 1.5rem; }
                .text-3xl { font-size: 1.875rem; }
                .text-4xl { font-size: 2.25rem; }
                .page-break { page-break-after: always; }
                ul { list-style-type: none; padding: 0; }
                li { margin: 0.25rem 0; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .gap-2 { gap: 0.5rem; }
                .bg-success { background-color: #10b981; color: white; }
                .bg-info { background-color: #3b82f6; color: white; }
                .bg-warning { background-color: #f59e0b; color: white; }
                table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
                th, td { border: 1px solid #e5e7eb; padding: 0.5rem; text-align: right; }
                th { background-color: #f3f4f6; font-weight: bold; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">جاري تحضير التقرير المعماري...</h2>
          <p className="text-muted-foreground">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 md:pt-16 bg-background print:pt-0">
      <div className="container mx-auto max-w-7xl px-3 md:px-4 py-4 md:py-6 lg:py-8 print:max-w-none print:px-8">
        
        {/* Cover Page */}
        <div className="mb-6 md:mb-8 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg print:break-after-page">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                تقرير تصميم مبنى ثلاثي الأبعاد
              </h1>
              <p className="text-base md:text-xl text-muted-foreground">مدفوع بالذكاء الاصطناعي</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
              <div className="space-y-3 md:space-y-4 text-right">
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">اسم المشروع:</span>
                  <p className="font-semibold text-base md:text-lg">{project.title || "منزل تقليدي بفناء مركزي"}</p>
                </div>
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">العميل:</span>
                  <p className="font-semibold text-sm md:text-base">العميل الكريم</p>
                </div>
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">الموقع:</span>
                  <p className="font-semibold text-sm md:text-base">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 text-right">
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">المصمم/النظام:</span>
                  <p className="font-semibold flex items-center gap-2 text-sm md:text-base">
                    <Bot className="w-4 h-4" />
                    نظام الذكاء الاصطناعي المعماري
                  </p>
                </div>
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">التاريخ:</span>
                  <p className="font-semibold text-sm md:text-base">{new Date().toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">رقم الإصدار:</span>
                  <p className="font-semibold text-sm md:text-base">v1.0</p>
                </div>
                <div>
                  <span className="text-sm md:text-base text-muted-foreground">السرية:</span>
                  <p className="font-semibold text-sm md:text-base">عام</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12">
              <Interactive3DViewer 
                modelType="traditional-house" 
                className="w-full h-[200px] md:h-[300px] rounded-lg border"
              />
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mb-6 md:mb-8 print:hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 md:mb-6">
            <div className="space-y-2">
              <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                تم الإنجاز
              </Badge>
              <h2 className="text-xl md:text-2xl font-bold">التقرير المعماري الشامل</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 w-full lg:w-auto">
              <Button variant="outline" onClick={handlePrint} className="text-xs md:text-sm">
                <Printer className="w-4 h-4 mr-2" />
                طباعة التقرير
              </Button>
              <Button variant="outline" onClick={() => handleDownload('3D')} className="text-xs md:text-sm">
                <Download className="w-4 h-4 mr-2" />
                تحميل النموذج ثلاثي الأبعاد
              </Button>
              <Button variant="outline" onClick={saveToHistory} className="text-xs md:text-sm">
                <Save className="w-4 h-4 mr-2" />
                حفظ في التاريخ
              </Button>
              <Button onClick={startNewProject} className="btn-primary text-xs md:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                مشروع جديد
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="overview" className="text-xs md:text-sm p-2 md:p-3">نظرة عامة</TabsTrigger>
              <TabsTrigger value="ai-inputs" className="text-xs md:text-sm p-2 md:p-3">مدخلات الذكاء الاصطناعي</TabsTrigger>
              <TabsTrigger value="site-analysis" className="text-xs md:text-sm p-2 md:p-3">تحليل الموقع</TabsTrigger>
              <TabsTrigger value="technical" className="text-xs md:text-sm p-2 md:p-3">المواصفات التقنية</TabsTrigger>
              <TabsTrigger value="sustainability" className="text-xs md:text-sm p-2 md:p-3">الاستدامة</TabsTrigger>
              <TabsTrigger value="cost-analysis" className="text-xs md:text-sm p-2 md:p-3">التحليل المالي</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Overview Section */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                الملخص التنفيذي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-primary/5 p-3 md:p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2 text-sm md:text-base">مساحة الموقع الإجمالية</h3>
                  <p className="text-xl md:text-2xl font-bold">500 م²</p>
                </div>
                <div className="bg-primary/5 p-3 md:p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2 text-sm md:text-base">المساحة البنائية</h3>
                  <p className="text-xl md:text-2xl font-bold">250 م²</p>
                </div>
                <div className="bg-primary/5 p-3 md:p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2 text-sm md:text-base">عدد الطوابق</h3>
                  <p className="text-xl md:text-2xl font-bold">طابق واحد</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">وصف موجز للمشروع:</h3>
                <p className="text-muted-foreground leading-relaxed">
                  منزل تقليدي بفناء مركزي يجمع بين الطراز المعماري التراثي والتطبيقات العصرية. 
                  يتميز التصميم بالفناء المركزي الذي يوفر الإضاءة الطبيعية والتهوية الطبيعية لجميع أجزاء المنزل.
                  تم تصميم المشروع باستخدام تقنيات الذكاء الاصطناعي المتقدمة لضمان الدقة والكفاءة في التصميم.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                  <div>
                    <h4 className="font-medium mb-2 text-sm md:text-base">المؤشرات الرئيسية:</h4>
                    <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                      <li>• نسبة التغطية: 50%</li>
                      <li>• معامل الكثافة: 0.5</li>
                      <li>• السعة التصميمية: 6-8 أشخاص</li>
                      <li>• عدد المواقف: 2 موقف</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm md:text-base">التقدير المبدئي للتكلفة:</h4>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-base md:text-lg font-bold text-primary">450,000 ريال سعودي</p>
                      <p className="text-xs text-muted-foreground mt-1">شامل المواد والعمالة</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Model Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                المعاينة ثلاثية الأبعاد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Interactive3DViewer 
                  modelType="traditional-house" 
                  className="w-full h-[400px] rounded-lg"
                />
                {modelUrl && (
                  <div className="text-center">
                    <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      النموذج ثلاثي الأبعاد متاح للتحميل
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Inputs Section */}
        <TabsContent value="ai-inputs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                مدخلات الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">النص المُدخل:</h3>
                <div className="bg-background p-4 rounded border border-dashed">
                  <p className="font-mono text-sm">{project.content || "تصميم منزل تقليدي بفناء مركزي، يتضمن 4 غرف نوم وصالة ومطبخ ودورات مياه، مع التركيز على الطراز المعماري التراثي والاستفادة من الإضاءة الطبيعية"}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">معلمات النموذج:</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">نموذج Gemini</TableCell>
                        <TableCell>gemini-2.0-flash-preview</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">نموذج Tripo3D</TableCell>
                        <TableCell>tripo/v2.5/multiview-to-3d</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">دقة الصور</TableCell>
                        <TableCell>1024x1024</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">عدد الزوايا</TableCell>
                        <TableCell>5 زوايا (أمام، خلف، يمين، يسار، أعلى)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">مراحل المعالجة:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">تحليل النص والصور المرجعية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">إنشاء الواجهة الأمامية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">إنشاء الواجهات الجانبية والخلفية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">تحويل إلى نموذج ثلاثي الأبعاد</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Analysis Section */}
        <TabsContent value="site-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                تحليل الموقع والبيئة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">الموقع الجغرافي:</h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li><strong>المدينة:</strong> الرياض</li>
                      <li><strong>المنطقة:</strong> وسط المدينة</li>
                      <li><strong>الإحداثيات:</strong> 24.7136° N, 46.6753° E</li>
                      <li><strong>الارتفاع:</strong> 612 متر فوق سطح البحر</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">الظروف المناخية:</h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4" />
                        <span>متوسط درجة الحرارة: 25°م</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        <span>ساعات الشمس: 9 ساعات يومياً</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Wind className="w-4 h-4" />
                        <span>اتجاه الرياح: شمالي غربي</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">تحليل التوجه والإضاءة:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg text-center">
                    <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <h4 className="font-medium">التوجه الشمسي</h4>
                    <p className="text-sm text-muted-foreground mt-1">جنوبي - مثالي للإضاءة</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg text-center">
                    <Wind className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">التهوية الطبيعية</h4>
                    <p className="text-sm text-muted-foreground mt-1">ممتازة - فناء مركزي</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg text-center">
                    <Eye className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">الخصوصية</h4>
                    <p className="text-sm text-muted-foreground mt-1">عالية - تصميم داخلي</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Specifications Section */}
        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                المواصفات التقنية والإنشائية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">النظام الإنشائي:</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">نوع الأساسات</TableCell>
                        <TableCell>أساسات شريطية مسلحة</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">الجدران الحاملة</TableCell>
                        <TableCell>بلوك خرساني مسلح</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">السقف</TableCell>
                        <TableCell>بلاطة خرسانية مسلحة</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">العزل الحراري</TableCell>
                        <TableCell>فوم بوليسترين 5 سم</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">مواد التشطيب:</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">الواجهات الخارجية</TableCell>
                        <TableCell>حجر طبيعي + دهان</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">الأرضيات</TableCell>
                        <TableCell>بورسلين + رخام</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">النوافذ والأبواب</TableCell>
                        <TableCell>ألمنيوم مع كسر حراري</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">السقف الداخلي</TableCell>
                        <TableCell>جبس بورد + دهان</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">الأنظمة الميكانيكية والكهربائية:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      النظام الكهربائي
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• لوحة كهربائية رئيسية 200 أمبير</li>
                      <li>• إضاءة LED موفرة للطاقة</li>
                      <li>• مفاتيح ومقابس عالية الجودة</li>
                      <li>• نظام حماية من التسرب</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Wind className="w-4 h-4" />
                      التكييف والتهوية
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• وحدات تكييف منفصلة</li>
                      <li>• تهوية طبيعية عبر الفناء</li>
                      <li>• مراوح شفط في الحمامات</li>
                      <li>• عزل حراري متقدم</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      أنظمة الأمان
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• نظام إنذار حريق</li>
                      <li>• كاميرات مراقبة</li>
                      <li>• نظام إنذار أمني</li>
                      <li>• إضاءة طوارئ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sustainability Section */}
        <TabsContent value="sustainability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                الاستدامة والكفاءة البيئية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">ميزات الاستدامة:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Sun className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">الإضاءة الطبيعية</h4>
                        <p className="text-sm text-green-700">الفناء المركزي يوفر إضاءة طبيعية لجميع الغرف</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Wind className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">التهوية الطبيعية</h4>
                        <p className="text-sm text-blue-700">تصميم يعزز حركة الهواء الطبيعية</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Thermometer className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-800">العزل الحراري</h4>
                        <p className="text-sm text-purple-700">مواد عزل عالية الكفاءة تقلل استهلاك الطاقة</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">تقييم الأداء البيئي:</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">كفاءة الطاقة</span>
                        <span className="text-sm text-green-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">استخدام المياه</span>
                        <span className="text-sm text-blue-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">المواد المستدامة</span>
                        <span className="text-sm text-purple-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">جودة البيئة الداخلية</span>
                        <span className="text-sm text-orange-600">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">التقييم الإجمالي للاستدامة</h3>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-green-600">A+</div>
                  <div className="flex-1">
                    <p className="text-sm text-green-700">
                      يحقق المشروع معايير عالية للاستدامة البيئية مع تقليل البصمة الكربونية بنسبة 40% مقارنة بالمباني التقليدية.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Section */}
        <TabsContent value="cost-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                التحليل المالي وتقدير التكاليف
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">تفصيل التكاليف:</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>البند</TableHead>
                        <TableHead>التكلفة (ريال)</TableHead>
                        <TableHead>النسبة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>الأعمال الإنشائية</TableCell>
                        <TableCell>180,000</TableCell>
                        <TableCell>40%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>التشطيبات</TableCell>
                        <TableCell>135,000</TableCell>
                        <TableCell>30%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>الأنظمة الميكانيكية</TableCell>
                        <TableCell>67,500</TableCell>
                        <TableCell>15%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>الأنظمة الكهربائية</TableCell>
                        <TableCell>45,000</TableCell>
                        <TableCell>10%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>أعمال أخرى</TableCell>
                        <TableCell>22,500</TableCell>
                        <TableCell>5%</TableCell>
                      </TableRow>
                      <TableRow className="font-bold bg-primary/5">
                        <TableCell>المجموع</TableCell>
                        <TableCell>450,000</TableCell>
                        <TableCell>100%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">الجدول الزمني والتكاليف:</h3>
                  <div className="space-y-3">
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">المرحلة الأولى - الأساسات</span>
                        <span className="text-sm text-muted-foreground">4 أسابيع</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">90,000 ريال</span>
                        <Progress value={100} className="w-20 h-2" />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">المرحلة الثانية - الهيكل</span>
                        <span className="text-sm text-muted-foreground">6 أسابيع</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">180,000 ريال</span>
                        <Progress value={75} className="w-20 h-2" />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">المرحلة الثالثة - التشطيبات</span>
                        <span className="text-sm text-muted-foreground">8 أسابيع</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">180,000 ريال</span>
                        <Progress value={25} className="w-20 h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">ملخص المشروع:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">المدة الإجمالية:</span>
                        <p className="font-medium">18 أسبوع</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">التكلفة الإجمالية:</span>
                        <p className="font-medium">450,000 ريال</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">ملاحظات مهمة:</h4>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• الأسعار تقديرية وقد تتغير حسب أسعار السوق</li>
                      <li>• لا تشمل تكلفة الأرض أو رسوم التراخيص</li>
                      <li>• يُنصح بإضافة 10-15% كاحتياطي للطوارئ</li>
                      <li>• الأسعار شاملة ضريبة القيمة المضافة</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </div>
    </div>
  );
};

export default FinalResults;
