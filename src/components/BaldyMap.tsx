import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ZoomIn, ZoomOut, Layers, Search, Navigation, Plus, Minus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface BaldyMapProps {
  onLocationSelect?: (coords: [number, number]) => void;
  selectedLocation?: [number, number] | null;
  className?: string;
}

// Districts and neighborhoods data
const districts = [
  { name: 'السلام', lat: 24.8, lng: 46.6, type: 'district' },
  { name: 'النرجس', lat: 24.75, lng: 46.65, type: 'district' },
  { name: 'الملقا', lat: 24.77, lng: 46.62, type: 'district' },
  { name: 'الورود', lat: 24.72, lng: 46.68, type: 'district' },
  { name: 'الياسمين', lat: 24.74, lng: 46.63, type: 'district' },
  { name: 'النخيل', lat: 24.76, lng: 46.67, type: 'district' },
  { name: 'الربوة', lat: 24.71, lng: 46.64, type: 'district' },
  { name: 'الواحة', lat: 24.73, lng: 46.66, type: 'district' },
];

// Building plots data
const buildingPlots = [
  { id: 1, x: 150, y: 180, width: 40, height: 30 },
  { id: 2, x: 200, y: 180, width: 35, height: 35 },
  { id: 3, x: 250, y: 190, width: 45, height: 25 },
  { id: 4, x: 120, y: 220, width: 30, height: 40 },
  { id: 5, x: 160, y: 230, width: 38, height: 32 },
  { id: 6, x: 210, y: 240, width: 42, height: 28 },
  { id: 7, x: 260, y: 230, width: 36, height: 34 },
  { id: 8, x: 180, y: 270, width: 44, height: 26 },
  { id: 9, x: 230, y: 280, width: 32, height: 38 },
  { id: 10, x: 140, y: 290, width: 40, height: 30 },
];

// Roads data
const roads = [
  { path: "M 50 200 L 450 200", type: 'main' },
  { path: "M 50 250 L 450 250", type: 'main' },
  { path: "M 200 100 L 200 350", type: 'secondary' },
  { path: "M 250 100 L 250 350", type: 'secondary' },
  { path: "M 100 180 L 350 180", type: 'local' },
  { path: "M 120 220 L 320 220", type: 'local' },
  { path: "M 100 280 L 350 280", type: 'local' },
];

export const BaldyMap: React.FC<BaldyMapProps> = ({ 
  onLocationSelect, 
  selectedLocation,
  className = "" 
}) => {
  const [zoom, setZoom] = useState(1.2);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayers, setShowLayers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<[number, number] | null>(selectedLocation || null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (selectedLocation) {
      setSelectedMarker(selectedLocation);
    }
  }, [selectedLocation]);

  const handleMapClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || isDragging) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - panX) / zoom;
    const y = (event.clientY - rect.top - panY) / zoom;
    
    // Convert SVG coordinates to lat/lng (Riyadh area coordinates)
    const lng = 46.5 + (x / 500) * 0.5;
    const lat = 24.9 - (y / 400) * 0.5;
    
    const coordinates: [number, number] = [lng, lat];
    setSelectedMarker(coordinates);
    onLocationSelect?.(coordinates);
  };

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    setLastMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    
    const deltaX = event.clientX - lastMousePos.x;
    const deltaY = event.clientY - lastMousePos.y;
    
    setPanX(prev => prev + deltaX);
    setPanY(prev => prev + deltaY);
    setLastMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => setZoom(Math.min(zoom * 1.5, 5));
  const zoomOut = () => setZoom(Math.max(zoom / 1.5, 0.5));
  const resetView = () => {
    setZoom(1.2);
    setPanX(0);
    setPanY(0);
  };

  const filteredDistricts = districts.filter(district => 
    district.name.includes(searchQuery)
  );

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden border border-gray-300 ${className}`}>
      {/* Balady Header Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <MapPin className="w-3 h-3 text-green-600" />
          </div>
          <span className="font-semibold text-xs">خرائط بلدي</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLayers(!showLayers)}
            className="text-white hover:bg-white/10 p-1"
          >
            <Layers className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-1"
          >
            <Navigation className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-12 left-2 right-2 z-10">
        <div className="relative">
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Input
            placeholder="البحث عن الأحياء..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-gray-200 pr-8 text-right text-xs h-8"
            dir="rtl"
          />
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <Card className="mt-1 max-h-24 overflow-y-auto">
            {filteredDistricts.map((district, index) => (
              <div
                key={index}
                className="p-1 hover:bg-accent cursor-pointer text-xs"
                onClick={() => {
                  const coords: [number, number] = [district.lng, district.lat];
                  setSelectedMarker(coords);
                  onLocationSelect?.(coords);
                  setSearchQuery('');
                }}
              >
                {district.name}
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-20 right-2 z-10 flex flex-col gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          className="bg-white border-gray-200 hover:bg-gray-50 p-1 h-8 w-8"
        >
          <Plus className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          className="bg-white border-gray-200 hover:bg-gray-50 p-1 h-8 w-8"
        >
          <Minus className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white border-gray-200 hover:bg-gray-50 p-1 h-8 w-8"
        >
          <Home className="w-3 h-3" />
        </Button>
      </div>

      {/* Layers Panel */}
      {showLayers && (
        <Card className="absolute top-12 right-12 z-10 p-2 bg-white">
          <h4 className="font-semibold text-xs mb-1">الطبقات</h4>
          <div className="space-y-1 text-xs">
            <label className="flex items-center gap-1">
              <input type="checkbox" defaultChecked className="text-green-600" />
              الأحياء
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" defaultChecked className="text-green-600" />
              قطع الأراضي
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" defaultChecked className="text-green-600" />
              الطرق
            </label>
          </div>
        </Card>
      )}

      {/* Main Map */}
      <div className="relative flex-1 bg-gray-100 overflow-hidden" style={{ height: '300px' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 500 400"
          className="w-full h-full cursor-grab"
          onClick={handleMapClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ 
            transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Background and Patterns */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.3" opacity="0.4"/>
            </pattern>
          </defs>
          
          <rect width="500" height="400" fill="#f5f5f5" />
          
          {/* Roads */}
          {roads.map((road, index) => (
            <path
              key={index}
              d={road.path}
              stroke={road.type === 'main' ? '#f59e0b' : road.type === 'secondary' ? '#ffffff' : '#e5e7eb'}
              strokeWidth={road.type === 'main' ? 3 : road.type === 'secondary' ? 2 : 1}
              fill="none"
              className="pointer-events-none"
            />
          ))}
          
          {/* Building Plots */}
          {buildingPlots.map((plot) => (
            <rect
              key={plot.id}
              x={plot.x}
              y={plot.y}
              width={plot.width}
              height={plot.height}
              fill="#f3e8a6"
              stroke="#d4a574"
              strokeWidth="1"
              className="hover:fill-yellow-200 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const lng = 46.5 + (plot.x / 500) * 0.5;
                const lat = 24.9 - (plot.y / 400) * 0.5;
                const coords: [number, number] = [lng, lat];
                setSelectedMarker(coords);
                onLocationSelect?.(coords);
              }}
            />
          ))}
          
          {/* District Labels */}
          {districts.map((district, index) => {
            const x = ((district.lng - 46.5) / 0.5) * 500;
            const y = ((24.9 - district.lat) / 0.5) * 400;
            
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="12"
                fill="#4b5563"
                fontWeight="600"
                className="pointer-events-none select-none"
              >
                {district.name}
              </text>
            );
          })}
          
          {/* Sample Markers */}
          <circle cx={180} cy={200} r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <circle cx={220} cy={180} r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <circle cx={260} cy={220} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
          <circle cx={200} cy={250} r="4" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
          
          {/* Selected Location Marker */}
          {selectedMarker && (
            <g>
              <circle
                cx={((selectedMarker[0] - 46.5) / 0.5) * 500}
                cy={((24.9 - selectedMarker[1]) / 0.5) * 400}
                r="8"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="3"
                className="drop-shadow-lg animate-pulse"
              />
              <circle
                cx={((selectedMarker[0] - 46.5) / 0.5) * 500}
                cy={((24.9 - selectedMarker[1]) / 0.5) * 400}
                r="3"
                fill="#ffffff"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Coordinates Display */}
      {selectedMarker && (
        <div className="absolute bottom-8 left-2 bg-white border border-gray-200 rounded p-1 text-xs shadow-sm">
          <div className="text-gray-500 text-xs">الإحداثيات:</div>
          <div className="font-mono text-xs">
            {selectedMarker[1].toFixed(4)}, {selectedMarker[0].toFixed(4)}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-1 text-xs flex justify-between items-center">
        <span className="text-xs">© وزارة الشؤون البلدية والقروية والإسكان</span>
        <span className="text-xs">مقياس: 1:{Math.round(100000 / zoom)}</span>
      </div>
    </div>
  );
};