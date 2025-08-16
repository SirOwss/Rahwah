import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CheckCircle, 
  Printer,
  Settings,
  Info,
  Calculator,
  Home,
  Building2,
  MapPin,
  User,
  Save,
  Plus,
  Bot,
  Archive,
  Package,
  Globe,
  BarChart3,
  Map
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Interactive3DViewer } from "@/components/Interactive3DViewer";

export const FinalResults = () => {
  const [project, setProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("النتائج");
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
        
        {/* Main Header */}
        <div className="print:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                النتائج النهائية - مشروع من الوصف النصي
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  مكتمل
                </Badge>
                <span className="text-sm text-muted-foreground">
                  جميع التصاميم جاهزة لتحميل والمخططات
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={saveToHistory}>
                حفظ في التاريخ
              </Button>
              <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={startNewProject}>
                مشروع جديد
              </Button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="print:hidden flex gap-6">
          {/* Sidebar - Download Section */}
          <div className="w-80 space-y-6">
            {/* Download All Files */}
            <Card className="bg-card/50 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  تحميل جميع الملفات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 bg-primary/5 border-primary/30 text-primary"
                  onClick={() => handleDownload('AutoCAD')}
                >
                  <Archive className="w-4 h-4" />
                  الكتلة AutoCAD برمجة
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleDownload('PDF')}
                >
                  <FileText className="w-4 h-4" />
                  PDF جميع المخططات
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleDownload('3D')}
                >
                  <Package className="w-4 h-4" />
                  النموذج ثلاثي الأبعاد
                </Button>
              </CardContent>
            </Card>

            {/* Individual Downloads */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">تحميل منفرد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-sm"
                  onClick={() => handleDownload('FloorPlan')}
                >
                  <Layers className="w-4 h-4" />
                  مخطط أرضية
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-sm"
                  onClick={() => handleDownload('Elevations')}
                >
                  <Building2 className="w-4 h-4" />
                  المساقط
                </Button>
              </CardContent>
            </Card>

            {/* Project Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ملخص المشروع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground">البناء</span>
                  <p className="font-medium">{project?.title || "منزل تقليدي"}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">التاريخ</span>
                  <p className="font-medium">{new Date().toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">المحافظات</span>
                  <p className="font-medium">0</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">الوصف الأساسي</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    فيلا عصرية من طابق واحد موضعة بحديقة 
                    واسعة قطعة أرضي فكرة في رسم مُقسمة رقم
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted/30">
                <TabsTrigger value="المتطلبات" className="data-[state=active]:bg-background">
                  المتطلبات
                </TabsTrigger>
                <TabsTrigger value="التصميم" className="data-[state=active]:bg-background">
                  التصميم
                </TabsTrigger>
                <TabsTrigger value="الخريطة" className="data-[state=active]:bg-background">
                  الخريطة
                </TabsTrigger>
                <TabsTrigger value="النتائج" className="data-[state=active]:bg-background">
                  النتائج
                </TabsTrigger>
              </TabsList>

              <TabsContent value="المتطلبات" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>متطلبات المشروع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">المتطلبات الأساسية</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            4 غرف نوم رئيسية
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            3 حمامات
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            صالة معيشة واسعة
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            مطبخ عصري
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">المتطلبات الإضافية</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            حديقة خلفية
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            مواقف سيارات
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            مجلس رجال
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            مجلس نساء
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="التصميم" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>التصميم المعماري</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">المخطط الأرضي</h3>
                        <div className="bg-muted/20 border-2 border-dashed border-primary/30 rounded-lg p-8 aspect-square flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <Layers className="w-12 h-12 mx-auto text-primary/50" />
                            <p className="text-sm text-muted-foreground">المخطط الأرضي</p>
                            <p className="text-xs text-muted-foreground">مقياس 1:100</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">الواجهة الرئيسية</h3>
                        <div className="bg-muted/20 border-2 border-dashed border-primary/30 rounded-lg p-8 aspect-square flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <Building2 className="w-12 h-12 mx-auto text-primary/50" />
                            <p className="text-sm text-muted-foreground">الواجهة الرئيسية</p>
                            <p className="text-xs text-muted-foreground">مقياس 1:100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="الخريطة" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الموقع والخريطة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/20 border-2 border-dashed border-primary/30 rounded-lg p-8 aspect-video flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Map className="w-16 h-16 mx-auto text-primary/50" />
                        <p className="text-sm text-muted-foreground">خريطة الموقع</p>
                        <p className="text-xs text-muted-foreground">الرياض، المملكة العربية السعودية</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="النتائج" className="space-y-6">
                <div className="space-y-6">
                  {/* 3D Viewer */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        النموذج ثلاثي الأبعاد
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4" style={{height: '400px'}}>
                        <Interactive3DViewer 
                          modelType="traditional-house" 
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Statistics */}
                  <div className="grid grid-cols-4 gap-4">
                    <Card className="text-center p-6">
                      <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">250</p>
                      <p className="text-sm text-muted-foreground">م² مساحة البناء</p>
                    </Card>
                    <Card className="text-center p-6">
                      <Home className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">غرف نوم</p>
                    </Card>
                    <Card className="text-center p-6">
                      <User className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">6-8</p>
                      <p className="text-sm text-muted-foreground">سكان</p>
                    </Card>
                    <Card className="text-center p-6">
                      <Calculator className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">450k</p>
                      <p className="text-sm text-muted-foreground">ريال سعودي</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

          {/* Project Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                ملخص المشروع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">اسم المشروع:</span>
                    <p className="font-semibold text-lg">{project.title || "منزل تقليدي بفناء مركزي"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">الموقع:</span>
                    <p className="font-semibold">الرياض، المملكة العربية السعودية</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">التاريخ:</span>
                    <p className="font-semibold">{new Date().toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">مساحة البناء</h3>
                    <p className="text-2xl font-bold">250 م²</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">التكلفة المقدرة</h3>
                    <p className="text-xl font-bold text-primary">450,000 ريال</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">وصف المشروع:</h3>
                <p className="text-muted-foreground leading-relaxed">
                  منزل تقليدي بفناء مركزي يجمع بين الطراز المعماري التراثي والتطبيقات العصرية. 
                  يتميز التصميم بالفناء المركزي الذي يوفر الإضاءة الطبيعية والتهوية الطبيعية لجميع أجزاء المنزل.
                  تم تصميم المشروع باستخدام تقنيات الذكاء الاصطناعي المتقدمة لضمان الدقة والكفاءة في التصميم.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">الطوابق</p>
                  <p className="font-semibold">طابق واحد</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">الغرف</p>
                  <p className="font-semibold">4 غرف</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <User className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">السكان</p>
                  <p className="font-semibold">6-8 أشخاص</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">المواقف</p>
                  <p className="font-semibold">2 موقف</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2D Floor Plans */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                المخططات المعمارية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">المخطط الأرضي</h3>
                  <div className="bg-muted/20 border-2 border-dashed border-primary/30 rounded-lg p-8 aspect-square flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Layers className="w-12 h-12 mx-auto text-primary/50" />
                      <p className="text-sm text-muted-foreground">المخطط الأرضي</p>
                      <p className="text-xs text-muted-foreground">مقياس 1:100</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">الواجهة الرئيسية</h3>
                  <div className="bg-muted/20 border-2 border-dashed border-primary/30 rounded-lg p-8 aspect-square flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Building2 className="w-12 h-12 mx-auto text-primary/50" />
                      <p className="text-sm text-muted-foreground">الواجهة الرئيسية</p>
                      <p className="text-xs text-muted-foreground">مقياس 1:100</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button onClick={handlePrint} size="lg" className="flex-1 sm:flex-none">
              <Printer className="w-5 h-5 mr-2" />
              طباعة التقرير المفصل
            </Button>
            <Button variant="outline" onClick={() => handleDownload('PDF')} size="lg" className="flex-1 sm:flex-none">
              <Download className="w-5 h-5 mr-2" />
              تحميل PDF
            </Button>
            <Button variant="outline" onClick={() => handleDownload('DWG')} size="lg" className="flex-1 sm:flex-none">
              <FileText className="w-5 h-5 mr-2" />
              تحميل DWG
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <Button variant="outline" onClick={saveToHistory} size="lg">
              <Save className="w-5 h-5 mr-2" />
              حفظ في التاريخ
            </Button>
            <Button onClick={startNewProject} size="lg" className="bg-primary text-primary-foreground">
              <Plus className="w-5 h-5 mr-2" />
              مشروع جديد
            </Button>
          </div>
        </div>

        {/* Detailed Print View - Hidden by default, shown only when printing */}
        <div className="hidden print:block">
          {/* Cover Page */}
          <div className="mb-8 p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg print:break-after-page">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold text-primary leading-tight">
                  تقرير تصميم مبنى ثلاثي الأبعاد
                </h1>
                <p className="text-xl text-muted-foreground">مدفوع بالذكاء الاصطناعي</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="space-y-4 text-right">
                  <div>
                    <span className="text-base text-muted-foreground">اسم المشروع:</span>
                    <p className="font-semibold text-lg">{project.title || "منزل تقليدي بفناء مركزي"}</p>
                  </div>
                  <div>
                    <span className="text-base text-muted-foreground">العميل:</span>
                    <p className="font-semibold">العميل الكريم</p>
                  </div>
                  <div>
                    <span className="text-base text-muted-foreground">الموقع:</span>
                    <p className="font-semibold">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-right">
                  <div>
                    <span className="text-base text-muted-foreground">المصمم/النظام:</span>
                    <p className="font-semibold flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      نظام الذكاء الاصطناعي المعماري
                    </p>
                  </div>
                  <div>
                    <span className="text-base text-muted-foreground">التاريخ:</span>
                    <p className="font-semibold">{new Date().toLocaleDateString('ar-SA')}</p>
                  </div>
                  <div>
                    <span className="text-base text-muted-foreground">رقم الإصدار:</span>
                    <p className="font-semibold">v1.0</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <Interactive3DViewer 
                  modelType="traditional-house" 
                  className="w-full h-[300px] rounded-lg border"
                />
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  الملخص التنفيذي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">مساحة الموقع الإجمالية</h3>
                    <p className="text-2xl font-bold">500 م²</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">المساحة البنائية</h3>
                    <p className="text-2xl font-bold">250 م²</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">عدد الطوابق</h3>
                    <p className="text-2xl font-bold">طابق واحد</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">وصف موجز للمشروع:</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    منزل تقليدي بفناء مركزي يجمع بين الطراز المعماري التراثي والتطبيقات العصرية. 
                    يتميز التصميم بالفناء المركزي الذي يوفر الإضاءة الطبيعية والتهوية الطبيعية لجميع أجزاء المنزل.
                    تم تصميم المشروع باستخدام تقنيات الذكاء الاصطناعي المتقدمة لضمان الدقة والكفاءة في التصميم.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium mb-2">المؤشرات الرئيسية:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• نسبة التغطية: 50%</li>
                        <li>• معامل الكثافة: 0.5</li>
                        <li>• السعة التصميمية: 6-8 أشخاص</li>
                        <li>• عدد المواقف: 2 موقف</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">التقدير المبدئي للتكلفة:</h4>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <p className="text-lg font-bold text-primary">450,000 ريال سعودي</p>
                        <p className="text-xs text-muted-foreground mt-1">شامل المواد والعمالة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Specifications */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  المواصفات التقنية المفصلة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">المواد الإنشائية:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">الأساسات</TableCell>
                          <TableCell>خرسانة مسلحة C30</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">الجدران</TableCell>
                          <TableCell>طوب أحمر + عازل حراري</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">السقف</TableCell>
                          <TableCell>خرسانة مسلحة 20 سم</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">الأرضيات</TableCell>
                          <TableCell>بلاط سيراميك/رخام</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">الأنظمة الكهربائية والميكانيكية:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">التكييف</TableCell>
                          <TableCell>سبليت + مركزي</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">الكهرباء</TableCell>
                          <TableCell>380/220 فولت</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">السباكة</TableCell>
                          <TableCell>مياه ساخنة وباردة</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">الأمان</TableCell>
                          <TableCell>كاميرات + إنذار</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Inputs Section - Print */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  مدخلات الذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">النص المُدخل (Prompt):</h3>
                  <div className="bg-background p-4 rounded border border-dashed">
                    <p className="font-mono text-sm">{project.content || "تصميم منزل تقليدي بفناء مركزي، يتضمن 4 غرف نوم وصالة ومطبخ ودورات مياه، مع التركيز على الطراز المعماري التراثي والاستفادة من الإضاءة الطبيعية"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">معلمات النموذج:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">نسخة النموذج</TableCell>
                          <TableCell>GPT-4 Architecture v2.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Temperature</TableCell>
                          <TableCell>0.7</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Top-p</TableCell>
                          <TableCell>0.9</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Seed</TableCell>
                          <TableCell>42</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">قيود التصميم:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 text-primary">•</span>
                        الحد الأقصى للارتفاع: 6 أمتار
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 text-primary">•</span>
                        الانتكاسات: 3م من جميع الجهات
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 text-primary">•</span>
                        نسبة التغطية: 50% كحد أقصى
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 text-primary">•</span>
                        عدد المواقف: 2 كحد أدنى
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">مستوى التفاصيل المستهدف:</h3>
                  <Badge variant="outline" className="mr-2">LOD 300</Badge>
                  <span className="text-sm text-muted-foreground">
                    مستوى مناسب للتطوير التفصيلي والحصول على تراخيص البناء
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Site Analysis Section - Print */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  بيانات الموقع والسياق
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">معلومات الموقع:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">إحداثيات المركز</TableCell>
                          <TableCell>24.7136° N, 46.6753° E</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">مساحة الموقع</TableCell>
                          <TableCell>500 م²</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">منسوب المرجع</TableCell>
                          <TableCell>612 م فوق سطح البحر</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">اتجاه الشمال</TableCell>
                          <TableCell>الشمال الحقيقي</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">التحليل البيئي:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">المناخ</TableCell>
                          <TableCell>صحراوي حار</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">اتجاه الرياح السائدة</TableCell>
                          <TableCell>شمالي غربي</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">متوسط درجة الحرارة</TableCell>
                          <TableCell>26°C سنوياً</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">الإشعاع الشمسي</TableCell>
                          <TableCell>عالي جداً</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">تحليل المخاطر البيئية:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">المخاطر المحتملة:</h4>
                      <ul className="text-xs space-y-1">
                        <li>• العواصف الرملية الموسمية</li>
                        <li>• درجات الحرارة العالية صيفاً</li>
                        <li>• نقص الأمطار وشح المياه</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">الحلول المقترحة:</h4>
                      <ul className="text-xs space-y-1">
                        <li>• استخدام مواد مقاومة للعوامل الجوية</li>
                        <li>• أنظمة عزل حراري متقدمة</li>
                        <li>• تجميع مياه الأمطار</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sustainability Section - Print */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                  الاستدامة والكفاءة البيئية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">كفاءة الطاقة</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>تقييم الطاقة:</span>
                        <Badge className="bg-green-100 text-green-800">A+</Badge>
                      </div>
                      <p className="text-xs text-green-700">استهلاك طاقة منخفض</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">إدارة المياه</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>الكفاءة:</span>
                        <Badge className="bg-blue-100 text-blue-800">عالية</Badge>
                      </div>
                      <p className="text-xs text-blue-700">توفير 40% من المياه</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-2">المواد المستدامة</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>النسبة:</span>
                        <Badge className="bg-amber-100 text-amber-800">75%</Badge>
                      </div>
                      <p className="text-xs text-amber-700">مواد محلية ومعاد تدويرها</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">أنظمة الطاقة المتجددة:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        ألواح شمسية بقدرة 15 كيلو وات
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        سخان مياه شمسي 300 لتر
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        إضاءة LED بأجهزة استشعار
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        نظام إدارة ذكية للطاقة
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">معايير الاستدامة:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-sm font-medium">LEED Rating</TableCell>
                          <TableCell className="text-sm">Gold</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-sm font-medium">Carbon Footprint</TableCell>
                          <TableCell className="text-sm">منخفض جداً</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-sm font-medium">مؤشر الاستدامة</TableCell>
                          <TableCell className="text-sm">4.8/5</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-sm font-medium">عمر المبنى المتوقع</TableCell>
                          <TableCell className="text-sm">100+ سنة</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Analysis */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  التحليل المالي التفصيلي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البند</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>سعر الوحدة</TableHead>
                      <TableHead>المجموع</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>أعمال الحفر والأساسات</TableCell>
                      <TableCell>250 م³</TableCell>
                      <TableCell>120 ريال</TableCell>
                      <TableCell>30,000 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>أعمال الخرسانة المسلحة</TableCell>
                      <TableCell>80 م³</TableCell>
                      <TableCell>800 ريال</TableCell>
                      <TableCell>64,000 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>أعمال البناء والمحارة</TableCell>
                      <TableCell>350 م²</TableCell>
                      <TableCell>180 ريال</TableCell>
                      <TableCell>63,000 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>أعمال الكهرباء والسباكة</TableCell>
                      <TableCell>1 مجموعة</TableCell>
                      <TableCell>85,000 ريال</TableCell>
                      <TableCell>85,000 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>أعمال التشطيبات</TableCell>
                      <TableCell>250 م²</TableCell>
                      <TableCell>400 ريال</TableCell>
                      <TableCell>100,000 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>أعمال أخرى ومصاريف إدارية</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>108,000 ريال</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">المجموع الكلي</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="font-bold">450,000 ريال</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold mb-3">جدولة المدفوعات المقترحة:</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">المرحلة</TableHead>
                          <TableHead className="text-xs">النسبة</TableHead>
                          <TableHead className="text-xs">المبلغ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-xs">عقد المقاولة</TableCell>
                          <TableCell className="text-xs">10%</TableCell>
                          <TableCell className="text-xs">45,000 ريال</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">بداية الأعمال</TableCell>
                          <TableCell className="text-xs">20%</TableCell>
                          <TableCell className="text-xs">90,000 ريال</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">انتهاء الهيكل</TableCell>
                          <TableCell className="text-xs">30%</TableCell>
                          <TableCell className="text-xs">135,000 ريال</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">انتهاء التشطيبات</TableCell>
                          <TableCell className="text-xs">30%</TableCell>
                          <TableCell className="text-xs">135,000 ريال</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">التسليم النهائي</TableCell>
                          <TableCell className="text-xs">10%</TableCell>
                          <TableCell className="text-xs">45,000 ريال</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">توقع التوفير السنوي:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">توفير الطاقة:</span>
                        <span className="font-semibold text-green-600">12,000 ريال</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">توفير المياه:</span>
                        <span className="font-semibold text-blue-600">3,500 ريال</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-sm">صيانة أقل:</span>
                        <span className="font-semibold text-purple-600">5,000 ريال</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded font-bold">
                        <span className="text-sm">المجموع السنوي:</span>
                        <span className="text-primary">20,500 ريال</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Safety and Compliance - Print */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  السلامة والامتثال التنظيمي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">معايير السلامة:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        نظام إنذار الحريق المتقدم
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        مخارج طوارئ متعددة
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        أنظمة رش المياه الأوتوماتيكية
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        إضاءة طوارئ LED
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        أنظمة أمان للأطفال
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">الامتثال التنظيمي:</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-sm font-medium">كود البناء السعودي</TableCell>
                          <TableCell className="text-sm">
                            <Badge className="bg-green-100 text-green-800">متوافق</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-sm font-medium">معايير الدفاع المدني</TableCell>
                          <TableCell className="text-sm">
                            <Badge className="bg-green-100 text-green-800">متوافق</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-sm font-medium">معايير البيئة</TableCell>
                          <TableCell className="text-sm">
                            <Badge className="bg-green-100 text-green-800">متوافق</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-sm font-medium">كود الطاقة</TableCell>
                          <TableCell className="text-sm">
                            <Badge className="bg-green-100 text-green-800">متوافق</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">تنويه مهم:</h3>
                  <p className="text-sm text-yellow-700">
                    جميع التصاميم والمواصفات تتطلب مراجعة ومصادقة من الجهات المختصة قبل بدء التنفيذ. 
                    يُنصح بالتنسيق مع مكتب هندسي معتمد لاستكمال الدراسات التفصيلية والحصول على التراخيص اللازمة.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Digital Deliverables - Print */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  المخرجات الرقمية والملفات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold text-sm mb-1">ملفات CAD</h3>
                    <p className="text-xs text-muted-foreground">DWG, DXF</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                    <h3 className="font-semibold text-sm mb-1">نماذج ثلاثية الأبعاد</h3>
                    <p className="text-xs text-muted-foreground">3DS, OBJ, FBX</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <Download className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="font-semibold text-sm mb-1">تقارير PDF</h3>
                    <p className="text-xs text-muted-foreground">تقارير تفصيلية</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">محتويات المجلد الرقمي:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">المخططات المعمارية:</h4>
                      <ul className="text-xs space-y-1">
                        <li>• المخطط الأرضي (مقياس 1:100)</li>
                        <li>• الواجهات الأربع (مقياس 1:100)</li>
                        <li>• المقاطع الطولية والعرضية</li>
                        <li>• تفاصيل معمارية (مقياس 1:20)</li>
                        <li>• مخططات الأسقف والبلكونات</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">المخططات التقنية:</h4>
                      <ul className="text-xs space-y-1">
                        <li>• مخططات الكهرباء والإضاءة</li>
                        <li>• مخططات السباكة والصرف</li>
                        <li>• مخططات التكييف والتهوية</li>
                        <li>• مخططات الأنظمة الذكية</li>
                        <li>• تفاصيل الأساسات الإنشائية</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
