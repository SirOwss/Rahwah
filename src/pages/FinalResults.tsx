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

export const FinalResults = () => {
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
    <div className="min-h-screen pt-16 bg-background print:pt-0">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8 print:max-w-none print:px-8">
        
        {/* Cover Page */}
        <div className="mb-8 p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg print:break-after-page">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                تقرير تصميم مبنى ثلاثي الأبعاد
              </h1>
              <p className="text-xl text-muted-foreground">مدفوع بالذكاء الاصطناعي</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-4 text-right">
                <div>
                  <span className="text-muted-foreground">اسم المشروع:</span>
                  <p className="font-semibold text-lg">{project.title || "منزل تقليدي بفناء مركزي"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">العميل:</span>
                  <p className="font-semibold">العميل الكريم</p>
                </div>
                <div>
                  <span className="text-muted-foreground">الموقع:</span>
                  <p className="font-semibold">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
              
              <div className="space-y-4 text-right">
                <div>
                  <span className="text-muted-foreground">المصمم/النظام:</span>
                  <p className="font-semibold flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    نظام الذكاء الاصطناعي المعماري
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">التاريخ:</span>
                  <p className="font-semibold">{new Date().toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">رقم الإصدار:</span>
                  <p className="font-semibold">v1.0</p>
                </div>
                <div>
                  <span className="text-muted-foreground">السرية:</span>
                  <p className="font-semibold">عام</p>
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

        {/* Main Navigation */}
        <div className="mb-8 print:hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="space-y-2">
              <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                تم الإنجاز
              </Badge>
              <h2 className="text-2xl font-bold">التقرير المعماري الشامل</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                طباعة التقرير
              </Button>
              <Button variant="outline" onClick={saveToHistory}>
                <Save className="w-4 h-4 mr-2" />
                حفظ في التاريخ
              </Button>
              <Button onClick={startNewProject} className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                مشروع جديد
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="ai-inputs">مدخلات الذكاء الاصطناعي</TabsTrigger>
              <TabsTrigger value="site-analysis">تحليل الموقع</TabsTrigger>
              <TabsTrigger value="technical">المواصفات التقنية</TabsTrigger>
              <TabsTrigger value="sustainability">الاستدامة</TabsTrigger>
              <TabsTrigger value="cost-analysis">التحليل المالي</TabsTrigger>
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
                <div className="grid md:grid-cols-3 gap-6">
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
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
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

          {/* AI Inputs Section */}
          <div className={`${activeTab === "ai-inputs" ? "block" : "hidden print:block"} print:break-before-page`}>
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
                
                <div className="grid md:grid-cols-2 gap-6">
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
                        <Ruler className="w-4 h-4 text-primary" />
                        الحد الأقصى للارتفاع: 6 أمتار
                      </li>
                      <li className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        الانتكاسات: 3م من جميع الجهات
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        نسبة التغطية: 50% كحد أقصى
                      </li>
                      <li className="flex items-center gap-2">
                        <HardHat className="w-4 h-4 text-primary" />
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

          {/* Site Analysis Section */}
          <div className={`${activeTab === "site-analysis" ? "block" : "hidden print:block"} print:break-before-page`}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  بيانات الموقع والسياق
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                    <h3 className="font-semibold mb-3">التحليل المناخي:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Sun className="w-5 h-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">الإشعاع الشمسي</p>
                          <p className="text-sm text-muted-foreground">مرتفع - يتطلب حلول التظليل</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Wind className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">الرياح السائدة</p>
                          <p className="text-sm text-muted-foreground">شمالية غربية، 15-25 كم/ساعة</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Thermometer className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-medium">درجة الحرارة</p>
                          <p className="text-sm text-muted-foreground">صيف: 45°C، شتاء: 10°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">الوصول والحركة:</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <h4 className="font-medium text-sm">وصول المركبات</h4>
                      <p className="text-xs text-muted-foreground mt-1">من الشارع الرئيسي عرض 20م</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <h4 className="font-medium text-sm">وصول المشاة</h4>
                      <p className="text-xs text-muted-foreground mt-1">رصيف بعرض 2م مع إضاءة</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <h4 className="font-medium text-sm">الخدمات</h4>
                      <p className="text-xs text-muted-foreground mt-1">دخول خلفي للخدمات</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Specifications */}
          <div className={`${activeTab === "technical" ? "block" : "hidden print:block"} print:break-before-page`}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlaneTakeoff className="w-5 h-5" />
                  المواصفات التقنية والأنظمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Structural System */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    النظام الإنشائي
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>العنصر</TableHead>
                          <TableHead>المواصفة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>شبكة المحاور</TableCell>
                          <TableCell>A-D / 1-4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>نوع النظام</TableCell>
                          <TableCell>إطار خرساني مسلح</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>البحور الرئيسية</TableCell>
                          <TableCell>5-6 أمتار</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>سماكة البلاطة</TableCell>
                          <TableCell>20 سم</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div>
                      <h4 className="font-medium mb-2">الأحمال الافتراضية:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• الحمل الحي: 2 كن/م² (سكني)</li>
                        <li>• الحمل الميت: محسوب حسب المواد</li>
                        <li>• حمل الرياح: 1.2 كن/م²</li>
                        <li>• الحمل الزلزالي: حسب الكود السعودي</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* MEP Systems */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    أنظمة المبنى (MEP)
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">التكييف والتهوية (HVAC)</h4>
                      <ul className="text-xs space-y-1">
                        <li>• نظام منفصل (سبليت)</li>
                        <li>• قدرة: 5 طن تبريد</li>
                        <li>• تهوية طبيعية عبر الفناء</li>
                        <li>• مراوح شفط في دورات المياه</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">النظام الصحي</h4>
                      <ul className="text-xs space-y-1">
                        <li>• شبكة مياه باردة وساخنة</li>
                        <li>• نظام صرف بالجاذبية</li>
                        <li>• خزان علوي 2000 لتر</li>
                        <li>• نظام إعادة تدوير المياه الرمادية</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">النظام الكهربائي</h4>
                      <ul className="text-xs space-y-1">
                        <li>• حمل تقديري: 15 كيلو واط</li>
                        <li>• لوحة رئيسية + فرعية</li>
                        <li>• إضاءة LED ذكية</li>
                        <li>• نظام أمان متكامل</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Materials and Finishes */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    المواد والتشطيبات
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">التشطيبات الخارجية:</h4>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>الواجهة الرئيسية</TableCell>
                            <TableCell>حجر طبيعي + طوب أحمر</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>النوافذ</TableCell>
                            <TableCell>ألمنيوم مقطع حراري</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>السقف</TableCell>
                            <TableCell>قرميد أحمر تراثي</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">التشطيبات الداخلية:</h4>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>أرضيات الصالة</TableCell>
                            <TableCell>رخام كريمي</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>أرضيات الغرف</TableCell>
                            <TableCell>باركيه خشبي</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>الجدران</TableCell>
                            <TableCell>دهان أكريليك</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sustainability Section */}
          <div className={`${activeTab === "sustainability" ? "block" : "hidden print:block"} print:break-before-page`}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  الأداء البيئي والاستدامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">كفاءة الطاقة:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>نسبة الفتحات (WWR)</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>الإضاءة الطبيعية</span>
                        <span className="font-semibold">ممتاز</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>الاستهلاك السنوي المستهدف</span>
                        <span className="font-semibold">120 كيلو واط ساعة/م²</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">البصمة الكربونية:</h3>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-green-800 font-semibold text-2xl">15 كجم CO₂e/م²</p>
                      <p className="text-green-600 text-sm">أقل من المتوسط بنسبة 30%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">أهداف الاعتماد:</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <h4 className="font-medium">LEED</h4>
                      <p className="text-sm text-muted-foreground">مؤهل للحصول على تقييم فضي</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <h4 className="font-medium">BREEAM</h4>
                      <p className="text-sm text-muted-foreground">متوافق مع المعايير</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <h4 className="font-medium">Mostadam</h4>
                      <p className="text-sm text-muted-foreground">مطابق للاشتراطات السعودية</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">ميزات الاستدامة:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">الفناء المركزي للتهوية الطبيعية</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">مواد محلية وقليلة التأثير البيئي</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">نظام جمع مياه الأمطار</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">إضاءة LED موفرة للطاقة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">عزل حراري عالي الكفاءة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">استخدام الطاقة الشمسية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Analysis */}
          <div className={`${activeTab === "cost-analysis" ? "block" : "hidden print:block"} print:break-before-page`}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  التقدير المالي والكميات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">ملخص التكلفة:</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>البند</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>الوحدة</TableHead>
                        <TableHead>سعر الوحدة</TableHead>
                        <TableHead>المجموع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>الأعمال الإنشائية</TableCell>
                        <TableCell>250</TableCell>
                        <TableCell>م²</TableCell>
                        <TableCell>800 ريال</TableCell>
                        <TableCell>200,000 ريال</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>التشطيبات الداخلية</TableCell>
                        <TableCell>250</TableCell>
                        <TableCell>م²</TableCell>
                        <TableCell>600 ريال</TableCell>
                        <TableCell>150,000 ريال</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>الأنظمة الكهربائية</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>مجمل</TableCell>
                        <TableCell>50,000 ريال</TableCell>
                        <TableCell>50,000 ريال</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>أنظمة السباكة</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>مجمل</TableCell>
                        <TableCell>35,000 ريال</TableCell>
                        <TableCell>35,000 ريال</TableCell>
                      </TableRow>
                      <TableRow className="border-t-2">
                        <TableCell className="font-semibold">المجموع الفرعي</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="font-semibold">435,000 ريال</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>احتياطي (5%)</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>21,750 ريال</TableCell>
                      </TableRow>
                      <TableRow className="bg-primary/5">
                        <TableCell className="font-bold">الإجمالي النهائي</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="font-bold text-primary">456,750 ريال</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    التكلفة تقديرية وقد تختلف حسب المواد المختارة وظروف الموقع والأسعار السائدة في السوق.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Safety and Compliance */}
          <Card className="mb-8 print:break-before-page">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                السلامة والامتثال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">مصفوفة الامتثال:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البند</TableHead>
                      <TableHead>المطلب النظامي</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التعليق</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>الارتفاع الأقصى</TableCell>
                      <TableCell>≤ 6 أمتار</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          مطابق
                        </Badge>
                      </TableCell>
                      <TableCell>5.8 متر فعلي</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>الارتدادات</TableCell>
                      <TableCell>3م من جميع الجهات</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          مطابق
                        </Badge>
                      </TableCell>
                      <TableCell>محقق بالكامل</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>نسبة التغطية</TableCell>
                      <TableCell>≤ 60%</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          مطابق
                        </Badge>
                      </TableCell>
                      <TableCell>50% فعلي</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>مواقف السيارات</TableCell>
                      <TableCell>≥ 2 موقف</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          مطابق
                        </Badge>
                      </TableCell>
                      <TableCell>2 موقف مغطى</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-semibold mb-3">متطلبات السلامة:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">2 مخرج طوارئ (رئيسي + خلفي)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">عرض الممرات ≥ 1.2 متر</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">إضاءة طوارئ ولوحات إرشادية</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">طفايات حريق حسب المواصفة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">نظام إنذار ضد الحريق</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">تهوية طبيعية كافية</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Model and Drawings */}
          <Card className="mb-8 print:break-before-page">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                النموذج ثلاثي الأبعاد والمخططات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">النموذج التفاعلي:</h3>
                <Interactive3DViewer 
                  modelType="traditional-house" 
                  className="w-full h-[400px] border rounded-lg"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-3">قائمة المخططات:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>كود اللوحة</TableHead>
                      <TableHead>العنوان</TableHead>
                      <TableHead>المقياس</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>A-001</TableCell>
                      <TableCell>جدول المحتويات</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">جاهز</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>A-101</TableCell>
                      <TableCell>مخطط موقع عام</TableCell>
                      <TableCell>1:200</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">جاهز</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>A-201</TableCell>
                      <TableCell>مخطط الطابق الأرضي</TableCell>
                      <TableCell>1:100</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">جاهز</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>A-301</TableCell>
                      <TableCell>الواجهات الأربع</TableCell>
                      <TableCell>1:100</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">جاهز</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>A-401</TableCell>
                      <TableCell>المقاطع الطولية والعرضية</TableCell>
                      <TableCell>1:100</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600">جاهز</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">مخطط الطابق الأرضي:</h4>
                  <div className="relative bg-white rounded-lg border overflow-hidden">
                    <img 
                      src="/lovable-uploads/1db97232-e98e-4080-a6b5-03b6ee33eabd.png" 
                      alt="مخطط الطابق الأرضي" 
                      className="w-full h-48 object-contain"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">الواجهة الرئيسية:</h4>
                  <div className="relative bg-white rounded-lg border overflow-hidden">
                    <img 
                      src="/lovable-uploads/602a1e64-0a86-41cd-b250-7f60f95ff0a6.png" 
                      alt="الواجهة الرئيسية" 
                      className="w-full h-48 object-contain"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Deliverables */}
          <Card className="mb-8 print:break-before-page">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                خطة التسليمات والمعايير الرقمية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">التسليمات الرقمية:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">ملفات التصميم:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• ملفات AutoCAD (.dwg)</li>
                      <li>• نموذج ثلاثي الأبعاد (.ifc/.rvt)</li>
                      <li>• مخططات PDF قابلة للطباعة</li>
                      <li>• نموذج الواقع الافتراضي (.gltf)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">البيانات والتقارير:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• جداول الكميات (.xlsx)</li>
                      <li>• تقرير الامتثال (.pdf)</li>
                      <li>• دليل المواصفات (.pdf)</li>
                      <li>• بيانات النموذج (.json)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">اتفاقية التسمية:</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <code className="text-sm">
                    ProjectCode_Discipline_Sheet/Model_Version_Date
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    مثال: TH001_A_201_v1.0_20241215
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">الميتاداتا:</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">المؤلف/الأداة</TableCell>
                      <TableCell>نظام الذكاء الاصطناعي المعماري v2.1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">الإصدار</TableCell>
                      <TableCell>1.0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">الوحدات</TableCell>
                      <TableCell>متر</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">نظام الإحداثيات</TableCell>
                      <TableCell>UTM Zone 38N</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Version Tracking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                تتبع الإصدارات والتغييرات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الإصدار</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الكاتب/الأداة</TableHead>
                    <TableHead>وصف التغيير</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>v1.0</TableCell>
                    <TableCell>{new Date().toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>نظام الذكاء الاصطناعي</TableCell>
                    <TableCell>إصدار أولي للتصميم المعماري</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card className="mb-8 print:hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                تحميل الملفات والتقارير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  className="w-full btn-primary" 
                  onClick={() => handleDownload("COMPLETE_PACKAGE")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  الحزمة الكاملة
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleDownload("ARCHITECTURAL_DRAWINGS")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  المخططات المعمارية
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleDownload("3D_MODEL")}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  النموذج ثلاثي الأبعاد
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};