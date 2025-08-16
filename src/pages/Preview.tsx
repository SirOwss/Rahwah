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
        title: projectData.title || "مشروع عمارة تقليدية",
        modelUrl: projectData.modelUrl || null, // <<<<<<
      };
      setProject(newProject);
    } else {
      const demoProject = {
        type: "demo",
        content: "منزل تقليدي من طابقين من الطوب الطيني ...",
        status: "completed",
        id: "demo-001",
        title: "مشروع المنزل التقليدي - عرض توضيحي",
        modelUrl: null, // لا يوجد رابط حقيقي
      };
      setProject(demoProject);
    }
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 280,
      height: 150,
      backgroundColor: "#ffffff"
    });

    // Add sample floor plan elements
    const room1 = new Rect({
      left: 20,
      top: 20,
      fill: "rgba(139, 92, 246, 0.3)",
      width: 80,
      height: 50,
      stroke: "#8b5cf6",
      strokeWidth: 1
    });
    const room2 = new Rect({
      left: 120,
      top: 20,
      fill: "rgba(139, 92, 246, 0.3)",
      width: 70,
      height: 50,
      stroke: "#8b5cf6",
      strokeWidth: 1
    });
    const room3 = new Rect({
      left: 70,
      top: 80,
      fill: "rgba(139, 92, 246, 0.3)",
      width: 100,
      height: 40,
      stroke: "#8b5cf6",
      strokeWidth: 1
    });
    canvas.add(room1, room2, room3);
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
          modelUrl: project?.modelUrl || null,
          customization,
          finalizedAt: Date.now(),
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
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/project-data")} className="bg-purple-600 text-white border-purple-500 hover:bg-purple-700 px-6 py-2">
              العودة للبيانات
            </Button>
            <Button onClick={handleFinish} disabled={isFinishing} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
              النتيجة النهائية
            </Button>
          </div>
          
          <div className="text-right">
            <h1 className="text-3xl font-bold text-white">
              محرر التصميم
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              مشروع المنزل التقليدي - عرض توضيحي - غرض توضيحي
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-170px)]">
        {/* Left Sidebar - Customization Options */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 p-5 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white text-center mb-4">خيارات التخصيص</h3>
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
<div className="flex-1 bg-gray-850 p-4">
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-base font-medium flex items-center gap-2 text-white">
      <RotateCw className="w-4 h-4" />
      المعاينة ثلاثية الأبعاد
    </h3>
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400">100%</span>
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="p-1.5 text-gray-400 hover:text-white" onClick={() => window.location.reload()}>
          <RotateCw className="w-3.5 h-3.5" />
        </Button>
        {project?.modelUrl && (
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 text-gray-400 hover:text-white"
            onClick={() => {
              const a = document.createElement('a');
              a.href = project.modelUrl;
              a.download = 'model.glb';
              a.click();
            }}
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  </div>

  <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl h-[calc(100%-50px)] flex items-center justify-center relative border border-gray-700">
  {project?.modelUrl ? (
  <iframe
    src={`https://model-viewer.dev/examples/loading/?src=${encodeURIComponent(project.modelUrl)}`}
    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
    title="3D Model Viewer"
  />
) : (
  <div className="text-center text-gray-300">
    <p>لم يتم تحميل نموذج ثلاثي الأبعاد بعد.</p>
    <p className="text-sm text-gray-400 mt-2">أرجع لصفحة الإدخال وأنشئ نموذجًا.</p>
  </div>
)}


    {/* Hint */}
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
      <Button className="bg-gray-800/90 hover:bg-gray-700 text-white border border-gray-600 px-4 py-1.5 text-xs">
        <span>استخدم عجلة الفأرة للتكبير والتصغير</span>
      </Button>
    </div>
  </div>
</div>


        {/* Right Sidebar - 2D Floor Plan and Project Description */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-5 space-y-4">
          {/* 2D Floor Plan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium flex items-center gap-2 text-white">
                <Grid3X3 className="w-3.5 h-3.5" />
                المعاينة ثنائية الأبعاد
              </h4>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                النتيجة النهائية
              </div>
            </div>
            
            <div className="bg-white rounded-lg h-40 relative border border-gray-600">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full rounded-lg" 
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%"
                }} 
              />
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
            <h4 className="text-sm font-medium mb-3 text-white">وصف المشروع</h4>
            
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-400 text-xs">النوع</div>
                  <div className="text-white text-xs mt-1">منزل</div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-400 text-xs">النوع</div>
                  <div className="text-white text-xs mt-1">الرياض</div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <div className="text-gray-400 text-xs">الموقع</div>
                  <div className="text-white text-xs mt-1">السعودية</div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded p-3">
                <div className="text-gray-400 text-xs mb-2">الوصف المفصل</div>
                <div className="text-gray-300 text-xs leading-relaxed">
                  {project?.content || "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};