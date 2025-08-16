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

        {/* Print View - Simplified for print */}
        <div className="hidden print:block">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-primary">تقرير التصميم المعماري</h1>
            <p className="text-lg text-muted-foreground">مدفوع بالذكاء الاصطناعي</p>
            
            <div className="mt-8">
              <Interactive3DViewer 
                modelType="traditional-house" 
                className="w-full h-[400px] rounded-lg border"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12 text-right">
              <div>
                <p><strong>اسم المشروع:</strong> {project?.title || "منزل تقليدي"}</p>
                <p><strong>التاريخ:</strong> {new Date().toLocaleDateString('ar-SA')}</p>
              </div>
              <div>
                <p><strong>المساحة:</strong> 250 م²</p>
                <p><strong>التكلفة:</strong> 450,000 ريال</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};