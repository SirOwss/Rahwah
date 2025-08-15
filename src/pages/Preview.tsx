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
          <div className="text-center px-4">
            <div className="w-12 md:w-16 h-12 md:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg md:text-xl font-semibold mb-2">جاري إنشاء النتائج النهائية...</h2>
            <p className="text-sm md:text-base text-muted-foreground">يتم الآن تجهيز ملفات التحميل والتقارير النهائية</p>
          </div>
        </div>}

      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 bg-transparent gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 order-2 lg:order-1">
            <Button variant="outline" onClick={() => navigate("/project-data")} className="bg-purple-600 text-white border-purple-500 hover:bg-purple-700 px-4 md:px-6 py-2 text-sm">
              العودة للبيانات
            </Button>
            <Button onClick={handleFinish} disabled={isFinishing} className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 text-sm">
              النتيجة النهائية
            </Button>
          </div>
          
          <div className="text-right order-1 lg:order-2">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
              محرر التصميم
            </h1>
            <p className="text-sm text-gray-300">
              مشروع المنزل التقليدي - عرض توضيحي - غرض توضيحي
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar - Customization Options */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              خيارات التخصيص
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Color Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">العمق (م)</span>
              </div>
              <Slider defaultValue={[8]} max={15} min={5} step={1} className="w-full" />
              <span className="text-xs text-gray-400 mt-1 block">8 متر</span>
            </div>

            {/* Height Control */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpDown className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">العمق (م)</span>
              </div>
              <Slider value={customization.height} onValueChange={value => handleCustomizationChange('height', value)} max={15} min={5} step={1} className="w-full" />
              <span className="text-xs text-gray-400">{customization.height[0]} متر</span>
            </div>

            {/* Width Control */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpDown className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">العمق (م)</span>
              </div>
              <Slider defaultValue={[6]} max={15} min={5} step={1} className="w-full" />
              <span className="text-xs text-gray-400 mt-1 block">6 متر</span>
            </div>

            {/* Materials Section */}
            <div>
              <h4 className="text-sm font-medium mb-3">الخامات</h4>
              <Button variant="outline" size="sm" className="w-full text-xs text-white border-gray-600 hover:bg-gray-700 mb-2">
                حجر طبيعي
              </Button>
            </div>

            {/* Room Type */}
            <div>
              <h4 className="text-sm font-medium mb-3">نوع الغرفة للتعديل المطلوب</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full text-xs text-white border-gray-600 hover:bg-gray-700">
                  اكتب هنا...
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-700">
              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm" onClick={applyCustomizations} disabled={isApplying}>
                  تطبيق
                </Button>
                <Button variant="outline" className="px-3 text-white border-gray-600 hover:bg-gray-700">
                  إعادة الضبط
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Center - 3D Model Viewer */}
        <div className="flex-1 bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <RotateCw className="w-5 h-5" />
              المعاينة ثلاثية الأبعاد
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">تكبير 100%</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="p-2">
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-[calc(100%-60px)] flex items-center justify-center relative">
            <Interactive3DViewer modelType="traditional-house" className="w-full h-full" />
            
            {/* Search/AI Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button className="bg-gray-800/90 hover:bg-gray-700 text-white border border-gray-600 px-6 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>استخدم عجلة الفأرة للتكبير والتصغير</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - 2D Floor Plan and Project Description */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-6 space-y-6">
          {/* 2D Floor Plan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                المعاينة ثنائية الأبعاد
              </h4>
              <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-900/20 text-xs">
                تحديث
              </Button>
            </div>
            
            <div className="bg-white rounded-lg h-48 relative">
              <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{
                border: "1px solid #e2e8f0",
                width: "100%",
                height: "100%"
              }} />
            </div>
          </div>

          {/* Project Description */}
          <div>
            <h4 className="text-sm font-semibold mb-3">وصف المشروع</h4>
            
            <div className="space-y-3 text-xs text-gray-300">
              <div>
                <span className="text-gray-400">النوع:</span>
                <span className="block mt-1">{project?.content?.split(' ').slice(0, 3).join(' ') || "منزل تقليدي من طابقين"}</span>
              </div>
              
              <div>
                <span className="text-gray-400">الموقع:</span>
                <span className="block mt-1">الرياض</span>
              </div>
              
              <div>
                <span className="text-gray-400">الوصف المفصل:</span>
                <span className="block mt-1 leading-relaxed">{project?.content || "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};