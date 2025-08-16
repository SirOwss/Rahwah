import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut, Move, MousePointer, Maximize, Play, Pause, Eye, Settings } from "lucide-react";

interface Interactive3DViewerProps {
  modelType?: "traditional-house" | "modern-villa" | "commercial-building";
  className?: string;
}

export const Interactive3DViewer = ({ modelType = "traditional-house", className = "" }: Interactive3DViewerProps) => {
  const [zoom, setZoom] = useState(1);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Fixed rotation for stable view
  const rotation = { x: 0, y: 0 };

  const handleZoomIn = () => setZoom(prev => Math.min(3, prev + 0.2));
  const handleZoomOut = () => setZoom(prev => Math.max(0.5, prev - 0.2));
  const handleReset = () => {
    setZoom(1);
  };

  // Handle mouse wheel for zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const getModelDetails = () => {
    switch (modelType) {
      case "traditional-house":
        return {
          title: "منزل تقليدي - طابقين",
          details: [
            "المساحة: 200 متر مربع",
            "الطوابق: طابقين + سطح",
            "الغرف: 3 غرف نوم + صالة + مطبخ",
            "المواد: طوب طيني + خشب + حجر",
            "الطراز: عمارة نجدية تقليدية"
          ]
        };
      case "modern-villa":
        return {
          title: "فيلا عصرية",
          details: [
            "المساحة: 350 متر مربع",
            "الطوابق: طابق واحد",
            "الغرف: 4 غرف نوم + مجلس + مطبخ مفتوح",
            "المرافق: مسبح + حديقة + موقف سيارات",
            "الطراز: عمارة معاصرة"
          ]
        };
      default:
        return {
          title: "مبنى معماري",
          details: ["تفاصيل المشروع غير متوفرة"]
        };
    }
  };

  const modelDetails = getModelDetails();

  return (
    <div className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* 3D Viewer Canvas */}
      <div 
        ref={viewerRef}
        className="aspect-square relative cursor-zoom-in select-none min-h-[450px]"
        onWheel={handleWheel}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
          `
        }}
      >
        {/* 3D Model Image */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`
          }}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/e9a4ec08-e9d6-4d04-be9e-7c586c91dc8a.png"
              alt="Traditional House 3D Model"
              className="max-w-none w-80 h-80 object-contain transition-all duration-300 filter drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))"
              }}
            />
          </div>
        </div>

        {/* Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: "20px 20px"
             }}
        />

        {/* Information Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
          <h4 className="font-semibold mb-2">{modelDetails.title}</h4>
          <div className="space-y-1 text-xs">
            {modelDetails.details.map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-xs">
          تكبير: {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-10 h-10 p-0 bg-black/50 border-white/20 text-white hover:bg-black/70"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-10 h-10 p-0 bg-black/50 border-white/20 text-white hover:bg-black/70"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-10 h-10 p-0 bg-black/50 border-white/20 text-white hover:bg-black/70"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Interaction Hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-xs flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ZoomIn className="w-3 h-3" />
          <span>استخدم عجلة الفأرة للتكبير والتصغير</span>
        </div>
      </div>
    </div>
  );
};