import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut, Download } from "lucide-react";
import { toast } from "sonner";

interface InteractiveImageViewerProps {
  imageUrl: string;
  className?: string;
}

export const InteractiveImageViewer = ({ imageUrl, className = "" }: InteractiveImageViewerProps) => {
  const [zoom, setZoom] = useState(1);
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'traditional-house-updated.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("تم تحميل الصورة!");
  };

  const modelDetails = {
    title: "منزل تقليدي محدث - طابقين",
    details: [
      "المساحة: 250 متر مربع",
      "الطوابق: ثلاثة طوابق + سطح",
      "الغرف: 4 غرف نوم + مجلس + مطبخ",
      "المواد: حجر طبيعي + خشب محلي",
      "الطراز: عمارة نجدية محدثة"
    ]
  };

  return (
    <div className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* Image Viewer Canvas */}
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
        {/* Image Display */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`
          }}
        >
          <div className="relative">
            <img 
              ref={imageRef}
              src={imageUrl}
              alt="Traditional House Updated Model"
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

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Zoom Controls */}
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

        {/* Download Control */}
        <div className="border-t border-white/20 pt-2 mt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-10 h-10 p-0 bg-black/50 border-white/20 text-white hover:bg-black/70"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Interaction Hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-xs flex items-center gap-2">
        <ZoomIn className="w-3 h-3" />
        <span>استخدم عجلة الفأرة للتكبير والتصغير</span>
      </div>
    </div>
  );
};