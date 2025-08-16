import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Building2, Download, FileText, Package, Archive, Layers, 
  CheckCircle, Star, Shield, Calculator, Info, Bot, 
  Sun, Wind, MapPin, Printer, Home
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FinalResults = () => {
  const [activeTab, setActiveTab] = useState("المتطلبات");
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const navigate = useNavigate();

  const project = {
    title: "فيلا سكنية عصرية",
    location: "الرياض",
    date: new Date().toLocaleDateString('ar-SA')
  };

  const finalProject = JSON.parse(localStorage.getItem('finalProject') || 'null');
  const modelUrl = finalProject?.modelUrl || JSON.parse(localStorage.getItem('currentProject') || 'null')?.modelUrl || null;

  const handleDownload = (type: string) => {
  if (type === '3D') {
    if (!modelUrl) return;
    const a = document.createElement('a');
    a.href = modelUrl;
    a.download = 'model.glb';
    a.click();
    return;
  }
  console.log(`تحميل ${type}`);
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

  const startNewProject = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">النتائج النهائية</h1>
                <p className="text-muted-foreground">جميع ملفات المشروع جاهزة للتحميل</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <Home className="w-4 h-4 mr-2" />
                الصفحة الرئيسية
              </Button>
              
              <Dialog open={showDetailedReport} onOpenChange={setShowDetailedReport}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    التقرير المفصل
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center text-primary mb-2">
                      التقرير الشامل للمشروع المعماري
                    </DialogTitle>
                    <p className="text-center text-muted-foreground">تقرير مفصل وشامل لجميع جوانب المشروع</p>
                  </DialogHeader>
                  
                  <div id="detailed-report-content" className="space-y-12 mt-8 print:space-y-8">
                    {/* Cover Page */}
                    <div className="text-center space-y-6 border-b pb-8 print:page-break-after">
                      <div className="relative">
                        <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary via-primary/80 to-secondary/60 rounded-xl flex items-center justify-center shadow-2xl">
                          <Building2 className="w-20 h-20 text-white" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-background text-primary border-primary">v1.0</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {project?.title || "فيلا سكنية عصرية"}
                        </h1>
                        <p className="text-xl text-muted-foreground">مشروع معماري متكامل بتقنية الذكاء الاصطناعي</p>
                        
                        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mt-8">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">العميل:</span>
                              <span className="font-medium">أحمد محمد السعدي</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">الموقع:</span>
                              <span className="font-medium">الرياض، المملكة العربية السعودية</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">المصمم:</span>
                              <span className="font-medium">نظام RAHWA AI المعماري</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">التاريخ:</span>
                              <span className="font-medium">{new Date().toLocaleDateString('ar-SA')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">رقم الإصدار:</span>
                              <span className="font-medium">v1.0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">السرية:</span>
                              <span className="font-medium">عام</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="space-y-8">
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-2">الملخص التنفيذي</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-primary/20">
                          <h3 className="font-bold text-xl mb-4 text-primary">وصف موجز للفكرة</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            مشروع فيلا سكنية عصرية تجمع بين الأناقة المعاصرة والوظائف العملية، مصممة باستخدام أحدث تقنيات الذكاء الاصطناعي. 
                            يحقق المشروع التوازن المثالي بين الراحة والخصوصية والاستدامة، مع التركيز على الاستغلال الأمثل للمساحة والإضاءة الطبيعية.
                          </p>
                        </Card>
                        
                        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-secondary/20">
                          <h3 className="font-bold text-xl mb-4 text-secondary">نطاق المشروع</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">600</p>
                              <p className="text-sm text-muted-foreground">مساحة الموقع الإجمالية (م²)</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">420</p>
                              <p className="text-sm text-muted-foreground">المساحة البنائية GFA (م²)</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">2</p>
                              <p className="text-sm text-muted-foreground">عدد الطوابق/الارتفاع</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">70%</p>
                              <p className="text-sm text-muted-foreground">نسبة التغطية/معامل الكثافة FAR</p>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <Card className="p-6">
                        <h3 className="font-bold text-xl mb-4">المؤشرات الرئيسية</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex justify-between p-3 bg-muted/20 rounded">
                              <span>السعة/الإشغال التصميمي:</span>
                              <span className="font-medium">8-10 أشخاص</span>
                            </div>
                            <div className="flex justify-between p-3 bg-muted/20 rounded">
                              <span>تقدير مبدئي للتكلفة:</span>
                              <span className="font-medium">1,430,000 ريال</span>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-semibold">المخرجات:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• نماذج 3D - GLTF/IFC/RVT</li>
                              <li>• رسومات 2D - DWG/PDF</li>
                              <li>• جداول الكميات - XLSX</li>
                              <li>• تقرير امتثال شامل</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* AI Inputs */}
                    <div className="space-y-8">
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-2">مدخلات الذكاء الاصطناعي (البرومبت والمعطيات)</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                      </div>
                      
                      <Card className="p-6">
                        <h3 className="font-bold text-xl mb-4 text-primary">النص المُدخل (Prompt)</h3>
                        <div className="bg-muted/50 p-6 rounded-lg border border-primary/20">
                          <p className="text-sm font-mono leading-relaxed italic">
                            "أريد تصميم فيلا عصرية من طابقين تتضمن 4 غرف نوم و3 حمامات مع صالة واسعة ومطبخ عصري 
                            ومجلس ضيوف وغرفة طعام وغرفة خادمة ومخزن وحديقة، على قطعة أرض مساحتها 600 متر مربع، 
                            مع مراعاة الاشتراطات البلدية والاستدامة البيئية والتوجيه الصحيح للمبنى والإضاءة الطبيعية"
                          </p>
                        </div>
                      </Card>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="p-6">
                          <h3 className="font-bold text-xl mb-4 text-primary">المعلمات التقنية</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 text-sm">
                              <div className="flex justify-between p-3 bg-muted/30 rounded">
                                <span>نُسخة نموذج الذكاء الاصطناعي:</span>
                                <span className="font-medium">RAHWA-Architecture-v4</span>
                              </div>
                              <div className="flex justify-between p-3 bg-muted/30 rounded">
                                <span>المعلمات: Seed:</span>
                                <span className="font-medium">12345</span>
                              </div>
                              <div className="flex justify-between p-3 bg-muted/30 rounded">
                                <span>Temperature:</span>
                                <span className="font-medium">0.7</span>
                              </div>
                              <div className="flex justify-between p-3 bg-muted/30 rounded">
                                <span>Top‑p:</span>
                                <span className="font-medium">0.9</span>
                              </div>
                              <div className="flex justify-between p-3 bg-muted/30 rounded">
                                <span>Steps:</span>
                                <span className="font-medium">50</span>
                              </div>
                              <div className="flex justify-between p-3 bg-muted/30 rounded">
                                <span>مستوى التفاصيل LOD المستهدف:</span>
                                <span className="font-medium">LOD 200/300/350...</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-6">
                          <h3 className="font-bold text-xl mb-4 text-primary">التنسيقات المطلوبة</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-info/10 rounded">
                              <span>IFC/RVT/GLTF/DWG/PDF:</span>
                              <span className="font-medium">جميع الصيغ متوفرة</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                              <strong>ملاحظة:</strong> احتفظ بنسخة JSON للمدخلات ضمن الملاحق.
                            </p>
                          </div>
                        </Card>
                      </div>

                      <Card className="p-6">
                        <h3 className="font-bold text-xl mb-4">قيود التصميم</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-secondary">حد أقصى ارتفاع/انتكاسات/تغطية/مواقف</h4>
                            <ul className="space-y-2 text-sm">
                              <li>• الارتفاع الأقصى: 12 متر</li>
                              <li>• الانتكاسات: أمامي 4م، جانبي 2م، خلفي 3م</li>
                              <li>• تغطية الأرض: ≤ 70%</li>
                              <li>• مواقف السيارات: 2 كحد أدنى</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-secondary">بيانات الموقع</h4>
                            <ul className="space-y-2 text-sm">
                              <li>• إحداثيات WGS84: 24.7136°N, 46.6753°E</li>
                              <li>• اتجاه الشمال: صحيح</li>
                              <li>• منسوب صفر: +610 متر</li>
                              <li>• المناخ: المنطقة المناخية 2A</li>
                              <li>• الحرارة/الرياح/الإشعاد: 25-45°م</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-secondary">المراجع الأسلوبية/النصية</h4>
                            <ul className="space-y-2 text-sm">
                              <li>• الطراز المعماري السعودي المعاصر</li>
                              <li>• روابط ووصفات للمراجع</li>
                              <li>• مستوى التفاصيل LOD 200/300/350</li>
                              <li>• التنسيقات: IFC/RVT/GLTF/DWG/PDF</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Site Data and Context */}
                    <div className="space-y-8">
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-2">بيانات الموقع والسياق</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                      </div>
                      
                      <Card className="p-6">
                        <h3 className="font-bold text-xl mb-4">الوصف</h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          قطعة أرض سكنية مستوية تقع في حي راقي بشمال مدينة الرياض، محاطة بفيلل سكنية مماثلة ومناطق خضراء. 
                          الموقع يتمتع بإطلالة جميلة ووصول ممتاز للخدمات العامة والطرق الرئيسية. الطبوغرافيا مستوية مما يسهل عملية البناء، 
                          والمنطقة تتميز بالهدوء والخصوصية المطلوبة للسكن العائلي.
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold mb-4">تحليل الشمس/الظل</h4>
                            <p className="text-sm text-muted-foreground">مخططات مختصرة للإشعاع الشمسي الممتاز من الجنوب</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-4">الرياح السائدة</h4>
                            <p className="text-sm text-muted-foreground">اتجاهات شمالية غربية بسرعات 15-25 كم/س</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="font-bold text-xl mb-6 text-center">جدول الموقع</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="text-right">البند</th>
                                <th className="text-right">القيمة</th>
                                <th className="text-right">ملاحظات</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>إحداثيات مركز الموقع</td>
                                <td>[lat, lon]</td>
                                <td>نظام WGS84</td>
                              </tr>
                              <tr>
                                <td>مساحة الموقع (م²)</td>
                                <td>600</td>
                                <td>شكل مربع منتظم</td>
                              </tr>
                              <tr>
                                <td>منسوب المرجع (م)</td>
                                <td>+610</td>
                                <td>فوق مستوى سطح البحر</td>
                              </tr>
                              <tr>
                                <td>اتجاه الشمال</td>
                                <td>صحيح</td>
                                <td>انحراف مغناطيسي +3°</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 text-center">
                          <Sun className="w-12 h-12 mx-auto mb-3 text-warning" />
                          <h4 className="font-semibold mb-2">الوصول والحركة</h4>
                          <p className="text-sm text-muted-foreground">مركبات/مشاة/خدمات مع وصول ممتاز</p>
                        </Card>
                        <Card className="p-6 text-center">
                          <Wind className="w-12 h-12 mx-auto mb-3 text-info" />
                          <h4 className="font-semibold mb-2">خريطة الخدمات</h4>
                          <p className="text-sm text-muted-foreground">مياه/كهرباء/صرف متوفرة</p>
                        </Card>
                        <Card className="p-6 text-center">
                          <MapPin className="w-12 h-12 mx-auto mb-3 text-success" />
                          <h4 className="font-semibold mb-2">المناخ والبيئة</h4>
                          <p className="text-sm text-muted-foreground">مناخ مداري صحراوي مع رياح طبيعية</p>
                        </Card>
                      </div>
                    </div>

                    {/* Continue with other sections... */}
                    
                    {/* Footer */}
                    <div className="text-center pt-8 border-t-2 border-primary/20">
                      <div className="space-y-4">
                        <div className="flex justify-center items-center gap-4">
                          <Building2 className="w-8 h-8 text-primary" />
                          <span className="text-xl font-bold text-primary">RAHWA AI Architecture</span>
                        </div>
                        <p className="text-muted-foreground">
                          تم إنتاج هذا التقرير بواسطة نظام الذكاء الاصطناعي المعماري RAHWA
                        </p>
                        <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                          <span>الإصدار: v1.0</span>
                          <span>التاريخ: {new Date().toLocaleDateString('ar-SA')}</span>
                          <span>الصفحات: تقرير شامل</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                          ملاحظة: احتفظ بنسخة JSON للمدخلات ضمن الملاحق الرقمية
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-6 pt-4 border-t">
                    <Button onClick={handlePrintDetailedReport} className="bg-primary hover:bg-primary/90">
                      <Printer className="w-4 h-4 mr-2" />
                      طباعة التقرير
                    </Button>
                    <Button variant="outline" onClick={() => setShowDetailedReport(false)}>
                      إغلاق
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
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
                  <p className="font-medium">{project?.title || "فيلا سكنية عصرية"}</p>
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
                    فيلا عصرية من طابقين موضعة بحديقة 
                    واسعة على قطعة أرض مساحتها 600 متر مربع
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
                            مجلس ضيوف
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            غرفة طعام
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            غرفة خادمة
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            مخزن وحديقة
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
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4 text-center">
                          <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold">التصميم الخارجي</h4>
                          <p className="text-sm text-muted-foreground">واجهات عصرية أنيقة</p>
                        </Card>
                        <Card className="p-4 text-center">
                          <Layers className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold">التوزيع الداخلي</h4>
                          <p className="text-sm text-muted-foreground">مساحات مفتوحة ومريحة</p>
                        </Card>
                        <Card className="p-4 text-center">
                          <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold">التشطيبات</h4>
                          <p className="text-sm text-muted-foreground">مواد عالية الجودة</p>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="الخريطة" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>موقع المشروع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">خريطة تفاعلية للموقع</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="النتائج" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ملخص النتائج</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="w-8 h-8 text-success" />
                        </div>
                        <h4 className="font-semibold">التصميم مكتمل</h4>
                        <p className="text-sm text-muted-foreground">100% جاهز</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-8 h-8 text-info" />
                        </div>
                        <h4 className="font-semibold">مطابق للأكواد</h4>
                        <p className="text-sm text-muted-foreground">معتمد</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Star className="w-8 h-8 text-warning" />
                        </div>
                        <h4 className="font-semibold">جودة عالية</h4>
                        <p className="text-sm text-muted-foreground">متميز</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalResults;