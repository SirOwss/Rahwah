import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Interactive3DViewer } from "@/components/Interactive3DViewer";

export const FinalResults = () => {
  const [project, setProject] = useState<any>(null);
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
        
        {/* Simplified Summary View - Default Display */}
        <div className="print:hidden">
          <div className="mb-6 md:mb-8 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  تقرير تصميم مبنى ثلاثي الأبعاد
                </h1>
                <p className="text-base md:text-xl text-muted-foreground">مدفوع بالذكاء الاصطناعي</p>
              </div>
              
              <div className="mt-8 md:mt-12">
                <Interactive3DViewer 
                  modelType="traditional-house" 
                  className="w-full h-[300px] md:h-[400px] rounded-lg border"
                />
              </div>
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

          {/* Cost Analysis */}
          <div className="print:break-before-page">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  التحليل المالي التفصيلي
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};