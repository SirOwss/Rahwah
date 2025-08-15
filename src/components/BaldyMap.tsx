import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ZoomIn, ZoomOut, Layers, Search, Navigation, Plus, Minus, Home, Target, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface BaldyMapProps {
  onLocationSelect?: (coords: [number, number]) => void;
  selectedLocation?: [number, number] | null;
  className?: string;
}

// Modern interactive map data
const locations = [
  { name: 'المركز التجاري', lat: 24.7136, lng: 46.6753, type: 'commercial', color: '#3b82f6' },
  { name: 'الحديقة العامة', lat: 24.7200, lng: 46.6800, type: 'park', color: '#10b981' },
  { name: 'المستشفى', lat: 24.7080, lng: 46.6700, type: 'hospital', color: '#ef4444' },
  { name: 'المدرسة', lat: 24.7180, lng: 46.6720, type: 'school', color: '#f59e0b' },
  { name: 'المسجد', lat: 24.7150, lng: 46.6780, type: 'mosque', color: '#8b5cf6' },
  { name: 'المطعم', lat: 24.7100, lng: 46.6750, type: 'restaurant', color: '#ec4899' },
];

export const BaldyMap: React.FC<BaldyMapProps> = ({ 
  onLocationSelect, 
  selectedLocation,
  className = "" 
}) => {
  const [zoom, setZoom] = useState(1.5);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayers, setShowLayers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<[number, number] | null>(selectedLocation || null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
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
    
    // Convert SVG coordinates to lat/lng
    const lng = 46.65 + (x / 600) * 0.1;
    const lat = 24.73 - (y / 500) * 0.08;
    
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

  const zoomIn = () => setZoom(Math.min(zoom * 1.3, 4));
  const zoomOut = () => setZoom(Math.max(zoom / 1.3, 0.5));
  const resetView = () => {
    setZoom(1.5);
    setPanX(0);
    setPanY(0);
  };

  const filteredLocations = locations.filter(location => 
    location.name.includes(searchQuery)
  );

  return (
    <div className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl ${className}`}>
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Map className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">خريطة تفاعلية</h3>
              <p className="text-xs text-white/80">تحديد الموقع بدقة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLayers(!showLayers)}
              className="text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Layers className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Target className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-16 left-4 right-4 z-10">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="البحث عن الأماكن والمواقع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/95 backdrop-blur-sm border-slate-200 pr-10 text-right shadow-lg"
            dir="rtl"
          />
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <Card className="mt-2 max-h-32 overflow-y-auto bg-white/95 backdrop-blur-sm border-slate-200">
            {filteredLocations.map((location, index) => (
              <div
                key={index}
                className="p-3 hover:bg-slate-50 cursor-pointer text-sm flex items-center gap-2"
                onClick={() => {
                  const coords: [number, number] = [location.lng, location.lat];
                  setSelectedMarker(coords);
                  onLocationSelect?.(coords);
                  setSearchQuery('');
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: location.color }}
                />
                {location.name}
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-24 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          className="bg-white/95 backdrop-blur-sm border-slate-200 hover:bg-slate-50 shadow-lg"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          className="bg-white/95 backdrop-blur-sm border-slate-200 hover:bg-slate-50 shadow-lg"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white/95 backdrop-blur-sm border-slate-200 hover:bg-slate-50 shadow-lg"
        >
          <Home className="w-4 h-4" />
        </Button>
      </div>

      {/* Layers Panel */}
      {showLayers && (
        <Card className="absolute top-16 right-16 z-10 p-4 bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
          <h4 className="font-semibold text-sm mb-3">طبقات الخريطة</h4>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="text-blue-600" />
              المواقع التجارية
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="text-green-600" />
              الأماكن العامة
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="text-purple-600" />
              الخدمات
            </label>
          </div>
        </Card>
      )}

      {/* Main Map - Increased Height */}
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden" style={{ height: '500px' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 600 500"
          className="w-full h-full"
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
          {/* Background and Gradients */}
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
            </filter>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          
          <rect width="600" height="500" fill="url(#mapGradient)" />
          <rect width="600" height="500" fill="url(#grid)" />
          
          {/* Roads Network */}
          <g className="roads">
            {/* Main Roads */}
            <path d="M 0 200 Q 300 180 600 200" stroke="#64748b" strokeWidth="8" fill="none" opacity="0.7" />
            <path d="M 0 300 Q 300 320 600 300" stroke="#64748b" strokeWidth="8" fill="none" opacity="0.7" />
            <path d="M 200 0 Q 220 250 200 500" stroke="#64748b" strokeWidth="6" fill="none" opacity="0.7" />
            <path d="M 400 0 Q 380 250 400 500" stroke="#64748b" strokeWidth="6" fill="none" opacity="0.7" />
            
            {/* Secondary Roads */}
            <path d="M 100 150 L 500 150" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.5" />
            <path d="M 100 250 L 500 250" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.5" />
            <path d="M 100 350 L 500 350" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.5" />
          </g>
          
          {/* Building Areas */}
          <g className="buildings">
            <rect x="150" y="180" width="80" height="60" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="5" />
            <rect x="250" y="160" width="70" height="80" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="5" />
            <rect x="350" y="190" width="90" height="50" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="5" />
            <rect x="120" y="280" width="60" height="70" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="5" />
            <rect x="220" y="300" width="85" height="55" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="5" />
            <rect x="330" y="290" width="75" height="65" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="5" />
          </g>
          
          {/* Green Spaces */}
          <circle cx="450" cy="150" r="40" fill="#dcfce7" stroke="#86efac" strokeWidth="2" opacity="0.8" />
          <ellipse cx="150" cy="400" rx="50" ry="30" fill="#dcfce7" stroke="#86efac" strokeWidth="2" opacity="0.8" />
          
          {/* Location Markers */}
          {locations.map((location, index) => {
            const x = ((location.lng - 46.65) / 0.1) * 600;
            const y = ((24.73 - location.lat) / 0.08) * 500;
            const isHovered = hoveredLocation === location.name;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "12" : "8"}
                  fill={location.color}
                  stroke="#ffffff"
                  strokeWidth="3"
                  filter="url(#shadow)"
                  className="cursor-pointer transition-all duration-200 hover:scale-110"
                  onMouseEnter={() => setHoveredLocation(location.name)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    const coords: [number, number] = [location.lng, location.lat];
                    setSelectedMarker(coords);
                    onLocationSelect?.(coords);
                  }}
                />
                {/* Location Label */}
                {isHovered && (
                  <g>
                    <rect
                      x={x - 30}
                      y={y - 40}
                      width="60"
                      height="20"
                      fill="rgba(0,0,0,0.8)"
                      rx="10"
                      filter="url(#shadow)"
                    />
                    <text
                      x={x}
                      y={y - 26}
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                      fontWeight="500"
                      className="pointer-events-none"
                    >
                      {location.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          
          {/* Selected Location Marker */}
          {selectedMarker && (
            <g className="animate-pulse">
              <circle
                cx={((selectedMarker[0] - 46.65) / 0.1) * 600}
                cy={((24.73 - selectedMarker[1]) / 0.08) * 500}
                r="15"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                opacity="0.8"
              />
              <circle
                cx={((selectedMarker[0] - 46.65) / 0.1) * 600}
                cy={((24.73 - selectedMarker[1]) / 0.08) * 500}
                r="8"
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#shadow)"
              />
              <circle
                cx={((selectedMarker[0] - 46.65) / 0.1) * 600}
                cy={((24.73 - selectedMarker[1]) / 0.08) * 500}
                r="3"
                fill="#ffffff"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Coordinates Display */}
      {selectedMarker && (
        <div className="absolute bottom-12 left-4 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-lg">
          <div className="text-slate-600 text-xs mb-1">الإحداثيات المحددة:</div>
          <div className="font-mono text-sm font-semibold text-slate-800">
            {selectedMarker[1].toFixed(6)}, {selectedMarker[0].toFixed(6)}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-3 flex justify-between items-center">
        <span className="text-xs flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          خريطة تفاعلية متقدمة
        </span>
        <span className="text-xs">
          مقياس: 1:{Math.round(50000 / zoom)} | التكبير: {(zoom * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
};