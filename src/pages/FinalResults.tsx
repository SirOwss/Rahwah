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

  // اجلب بيانات المشروع النهائي
  useEffect(() => {
    const finalProject = localStorage.getItem("finalProject");
    if (finalProject) {
      setProject(JSON.parse(finalProject));
    } else {
      toast.error("لم يتم العثور على بيانات المشروع");
      navigate("/preview");
    }
  }, [navigate]);

  // رابط GLB من finalProject أو currentProject كحل احتياطي
  const finalProject = JSON.parse(localStorage.getItem("finalProject") || "null");
  const currentProject = JSON.parse(localStorage.getItem("currentProject") || "null");
  const modelUrl: string | null = finalProject?.modelUrl || currentProject?.modelUrl || null;

  // تنزيلات: يدعم النموذج ثلاثي الأبعاد فعليًا إن توفر الرابط
  const handleDownload = (kind: string) => {
    if (kind === "3D" || kind === "3D_MODEL" || kind === "MODEL") {
      if (!modelUrl) {
        toast.error("لا يوجد نموذج ثلاثي الأبعاد متاح للتنزيل");
        return;
      }
      const a = document.createElement("a");
      a.href = modelUrl;
      a.download = "model.glb";
      a.click();
      toast.success("تم تنزيل النموذج ثلاثي الأبعاد");
      return;
    }
    // البقية حالياً Placeholder
    toast.success(`تم تجهيز التحميل: ${kind}`);
  };

  // حفظ في التاريخ
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

  // مشروع جديد
  const startNewProject = () => {
    navigate('/');
  };

  // طباعة التقرير
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

        {/* Content Sections */}
        <div className="space-y-8">
          
          {/* Executive Summary */}
          <div className={`${activeTab === "overview" ? "block" : "hidden print:block"}`}>
            <Card className="mb-8">
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
