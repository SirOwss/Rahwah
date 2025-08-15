import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { RotateCw, Settings, Palette, Home, ArrowUpDown, Square, Grid3X3, CheckCircle, Eye, Download, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Interactive3DViewer } from "@/components/Interactive3DViewer";
import { Canvas as FabricCanvas, Rect, Circle } from "fabric";
interface CustomizationOptions {
  color: string;
  material: string;
  height: number[];
  windowStyle: string;
  roomLayout: string;
}
export const Preview = () => {
  const [project, setProject] = useState<any>(null);
  const [customization, setCustomization] = useState<CustomizationOptions>({
    color: "#8b5cf6",
    material: "حجر طبيعي",
    height: [8],
    windowStyle: "تقليدي",
    roomLayout: "مفتوح"
  });
  const [isFinishing, setIsFinishing] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  useEffect(() => {
    const savedProject = localStorage.getItem("currentProject");
    if (savedProject) {
      const projectData = JSON.parse(savedProject);
      const newProject = {
        ...projectData,
        status: "completed",
        id: Date.now(),
        title: "مشروع عمارة تقليدية"
      };
      setProject(newProject);
    } else {
      const demoProject = {
        type: "demo",
        content: "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة",
        status: "completed",
        id: "demo-001",
        title: "مشروع المنزل التقليدي - عرض توضيحي"
      };
      setProject(demoProject);
    }
  }, []);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: "#ffffff"
    });

    // Add sample floor plan elements
    const room1 = new Rect({
      left: 50,
      top: 50,
      fill: "rgba(139, 92, 246, 0.3)",
      width: 150,
      height: 100,
      stroke: "#8b5cf6",
      strokeWidth: 2
    });
    const room2 = new Rect({
      left: 220,
      top: 50,
      fill: "rgba(139, 92, 246, 0.3)",
      width: 120,
      height: 100,
      stroke: "#8b5cf6",
      strokeWidth: 2
    });
    canvas.add(room1, room2);
    setFabricCanvas(canvas);
    toast.success("المخطط ثنائي الأبعاد جاهز للتعديل!");
    return () => {
      canvas.dispose();
    };
  }, []);
  const handleCustomizationChange = (key: keyof CustomizationOptions, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const applyCustomizations = () => {
    setIsApplying(true);

    // تطبيق التخصيصات على المخطط ثنائي الأبعاد
    if (fabricCanvas) {
      fabricCanvas.getObjects().forEach(obj => {
        if (obj instanceof Rect) {
          obj.set('fill', `rgba(${parseInt(customization.color.slice(1, 3), 16)}, ${parseInt(customization.color.slice(3, 5), 16)}, ${parseInt(customization.color.slice(5, 7), 16)}, 0.3)`);
          obj.set('stroke', customization.color);
        }
      });
      fabricCanvas.renderAll();
    }

    // محاكاة تطبيق التخصيصات
    setTimeout(() => {
      setIsApplying(false);
      setIsCustomizationOpen(false);
      toast.success("تم تطبيق التخصيصات على النموذج بنجاح");
    }, 2000);
  };
  const handleFinish = () => {
    if (project && !isFinishing) {
      setIsFinishing(true);
      setTimeout(() => {
        const finalProject = {
          ...project,
          customization: customization,
          finalizedAt: Date.now()
        };
        localStorage.setItem("finalProject", JSON.stringify(finalProject));
        navigate("/final-results");
      }, 3000);
    }
  };
  if (!project) {
    return <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">جاري إنشاء النموذج الأولي...</h2>
          <p className="text-muted-foreground">قد تستغرق هذه العملية بضع دقائق</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen pt-16 bg-gray-900 text-white">
      {/* Loading Overlay */}
      {isFinishing && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">جاري إنشاء النتائج النهائية...</h2>
            <p className="text-muted-foreground">يتم الآن تجهيز ملفات التحميل والتقارير النهائية</p>
          </div>
        </div>}

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 bg-transparent">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/project-data")} className="bg-purple-600 text-white border-purple-500 hover:bg-purple-700 px-6 py-2">
              العودة للبيانات
            </Button>
            <Button 
              onClick={handleFinish}
              disabled={isFinishing}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              {isFinishing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري التحضير...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  النتيجة النهائية
                </div>
              )}
            </Button>
          </div>
          
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-3 text-white leading-tight">
              محرر التصميم
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              {project?.title || "مشروع المنزل التقليدي"} - عرض توضيحي
            </p>
            <div className="flex items-center gap-3 justify-end">
              <Badge variant="outline" className="text-green-400 border-green-400 px-3 py-1">
                تفاعلي
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400 px-3 py-1">
                قيد التعديل
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400 px-3 py-1">
                مولد ثلاثي الأبعاد
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* 3D Model Viewer */}
          <div className="col-span-6 bg-gray-800 rounded-lg p-4 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <RotateCw className="w-5 h-5" />
                المعاينة ثلاثية الأبعاد
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">تكبير 100%</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-[calc(100%-60px)] flex items-center justify-center relative">
              <Interactive3DViewer modelType="traditional-house" className="w-full h-full" />
              
              {/* Customization Button - positioned inside 3D viewer */}
              <div className="absolute top-4 left-4">
                <Sheet open={isCustomizationOpen} onOpenChange={setIsCustomizationOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="bg-purple-600 text-white border-purple-500 hover:bg-purple-700 p-3">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  
                  <SheetContent side="right" className="w-80 bg-gray-800 text-white border-gray-700">
                    <SheetHeader>
                      <SheetTitle className="text-white flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        خيارات التخصيص
                      </SheetTitle>
                      <SheetClose asChild>
                        <Button variant="ghost" size="sm" className="absolute left-4 top-4 text-white hover:bg-gray-700">
                          <X className="w-4 h-4" />
                        </Button>
                      </SheetClose>
                    </SheetHeader>
                    
                    <div className="space-y-6 mt-6">
                      {/* Color Selection */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Palette className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium">لون الواجهة</span>
                        </div>
                        <div className="w-12 h-12 rounded-lg border-2 border-purple-500" style={{
                        backgroundColor: customization.color
                      }}>
                        </div>
                        <span className="text-xs text-gray-400 mt-1 block">#8b5cf6</span>
                      </div>

                      {/* Height Control */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowUpDown className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium">الارتفاع (م)</span>
                        </div>
                        <Slider value={customization.height} onValueChange={value => handleCustomizationChange('height', value)} max={15} min={5} step={1} className="w-full" />
                        <span className="text-xs text-gray-400">{customization.height[0]} متر</span>
                      </div>

                      {/* Additional controls with sliders */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowUpDown className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium">العمق (م)</span>
                        </div>
                        <Slider defaultValue={[8]} max={15} min={5} step={1} className="w-full" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowUpDown className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium">العرض (م)</span>
                        </div>
                        <Slider defaultValue={[6]} max={15} min={5} step={1} className="w-full" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Square className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium">النوافذ</span>
                        </div>
                        <Slider defaultValue={[4]} max={10} min={2} step={1} className="w-full" />
                      </div>

                      {/* Materials Section */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">الخامات</h4>
                        <Button variant="outline" size="sm" className="w-full text-xs text-white border-gray-600 hover:bg-gray-700" onClick={() => handleCustomizationChange('material', customization.material === 'حجر طبيعي' ? 'طوب' : 'حجر طبيعي')}>
                          {customization.material}
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-4">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={applyCustomizations} disabled={isApplying}>
                          {isApplying ? "جاري التطبيق..." : "تطبيق"}
                        </Button>
                        <Button variant="outline" className="w-full text-white border-gray-600 hover:bg-gray-700" onClick={() => {
                        setCustomization({
                          color: "#8b5cf6",
                          material: "حجر طبيعي",
                          height: [8],
                          windowStyle: "تقليدي",
                          roomLayout: "مفتوح"
                        });
                        toast.success("تم إعادة ضبط الخيارات");
                      }}>
                          إعادة الضبط
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* 2D Floor Plan */}
          <div className="col-span-6">
            <Card className="bg-gray-800 p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  المعاينة ثنائية الأبعاد
                </h4>
                <div className="flex gap-2 items-center">
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-900/20">
                    شبكة
                  </Button>
                  <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                    قابل للتعديل
                  </Badge>
                </div>
              </div>
              <div className="bg-white rounded-lg h-[calc(100%-60px)] relative">
                <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{
                border: "1px solid #e2e8f0"
              }} />
                <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                  اسحب وأفلت لتعديل المخطط • استخدم خيارات التخصيص لتغيير الألوان والأبعاد
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>;
};