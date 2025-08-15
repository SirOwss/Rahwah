import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ZoomIn, ZoomOut, Layers, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface BaldyMapProps {
  onLocationSelect?: (coords: [number, number]) => void;
  selectedLocation?: [number, number] | null;
  className?: string;
}

// Saudi Arabia cities data
const saudiCities = [
  { name: 'الرياض', lat: 24.7136, lng: 46.6753, size: 'large' },
  { name: 'جدة', lat: 21.4858, lng: 39.1925, size: 'large' },
  { name: 'مكة المكرمة', lat: 21.3891, lng: 39.8579, size: 'large' },
  { name: 'المدينة المنورة', lat: 24.5247, lng: 39.5692, size: 'large' },
  { name: 'الدمام', lat: 26.4207, lng: 50.0888, size: 'medium' },
  { name: 'الخبر', lat: 26.2172, lng: 50.1971, size: 'medium' },
  { name: 'تبوك', lat: 28.3998, lng: 36.5570, size: 'medium' },
  { name: 'أبها', lat: 18.2164, lng: 42.5047, size: 'medium' },
  { name: 'حائل', lat: 27.5114, lng: 41.6900, size: 'small' },
  { name: 'نجران', lat: 17.4924, lng: 44.1277, size: 'small' },
  { name: 'الطائف', lat: 21.2703, lng: 40.4150, size: 'medium' },
  { name: 'بريدة', lat: 26.3260, lng: 43.9750, size: 'small' },
];

// SVG path for Saudi Arabia borders (simplified)
const saudiArabiaBorder = "M 100 200 L 200 180 L 350 200 L 450 230 L 480 280 L 470 350 L 420 400 L 350 420 L 250 410 L 180 380 L 120 320 L 100 250 Z";

export const BaldyMap: React.FC<BaldyMapProps> = ({ 
  onLocationSelect, 
  selectedLocation,
  className = "" 
}) => {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 250, y: 300 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayers, setShowLayers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<[number, number] | null>(selectedLocation || null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (selectedLocation) {
      setSelectedMarker(selectedLocation);
    }
  }, [selectedLocation]);

  const handleMapClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert SVG coordinates to lat/lng (approximate)
    const lng = 35 + (x / rect.width) * 20; // Saudi Arabia longitude range
    const lat = 32 - (y / rect.height) * 20; // Saudi Arabia latitude range
    
    const coordinates: [number, number] = [lng, lat];
    setSelectedMarker(coordinates);
    onLocationSelect?.(coordinates);
  };

  const zoomIn = () => setZoom(Math.min(zoom + 0.5, 3));
  const zoomOut = () => setZoom(Math.max(zoom - 0.5, 0.5));

  const filteredCities = saudiCities.filter(city => 
    city.name.includes(searchQuery)
  );

  return (
    <div className={`relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden border border-green-200 ${className}`}>
      {/* Balady Header Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-green-600" />
          </div>
          <span className="font-semibold text-sm">خرائط بلدي</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLayers(!showLayers)}
            className="text-white hover:bg-white/10"
          >
            <Layers className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-16 left-4 right-4 z-10">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="البحث عن المدن والأماكن..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-green-200 pr-10 text-right"
            dir="rtl"
          />
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <Card className="mt-2 max-h-32 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className="p-2 hover:bg-accent cursor-pointer text-sm"
                onClick={() => {
                  const coords: [number, number] = [city.lng, city.lat];
                  setSelectedMarker(coords);
                  onLocationSelect?.(coords);
                  setSearchQuery('');
                }}
              >
                {city.name}
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-24 right-4 z-10 flex flex-col gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          className="bg-white border-green-200 hover:bg-green-50"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          className="bg-white border-green-200 hover:bg-green-50"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Layers Panel */}
      {showLayers && (
        <Card className="absolute top-16 right-4 z-10 p-3 bg-white">
          <h4 className="font-semibold text-sm mb-2">الطبقات</h4>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="text-green-600" />
              المدن الرئيسية
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="text-green-600" />
              الحدود الإدارية
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="text-green-600" />
              الطرق الرئيسية
            </label>
          </div>
        </Card>
      )}

      {/* Main Map */}
      <div className="relative h-80 bg-gradient-to-b from-blue-50 to-green-50">
        <svg
          ref={svgRef}
          viewBox="0 0 500 400"
          className="w-full h-full cursor-crosshair"
          onClick={handleMapClick}
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#dcfce7" />
            </linearGradient>
          </defs>
          
          <rect width="500" height="400" fill="url(#grid)" />
          
          {/* Saudi Arabia Border */}
          <path
            d={saudiArabiaBorder}
            fill="url(#landGradient)"
            stroke="#059669"
            strokeWidth="2"
            className="drop-shadow-md"
          />
          
          {/* Cities */}
          {saudiCities.map((city, index) => {
            const x = ((city.lng - 35) / 20) * 500;
            const y = ((32 - city.lat) / 20) * 400;
            const radius = city.size === 'large' ? 6 : city.size === 'medium' ? 4 : 3;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="drop-shadow-sm hover:fill-green-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const coords: [number, number] = [city.lng, city.lat];
                    setSelectedMarker(coords);
                    onLocationSelect?.(coords);
                  }}
                />
                <text
                  x={x}
                  y={y - radius - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#047857"
                  fontWeight="600"
                  className="pointer-events-none select-none"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
          
          {/* Selected Location Marker */}
          {selectedMarker && (
            <g>
              <circle
                cx={((selectedMarker[0] - 35) / 20) * 500}
                cy={((32 - selectedMarker[1]) / 20) * 400}
                r="8"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="3"
                className="drop-shadow-lg animate-pulse"
              />
              <circle
                cx={((selectedMarker[0] - 35) / 20) * 500}
                cy={((32 - selectedMarker[1]) / 20) * 400}
                r="3"
                fill="#ffffff"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Coordinates Display */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 bg-white border border-green-200 rounded-lg p-2 text-xs">
          <div className="text-gray-600">الإحداثيات:</div>
          <div className="font-mono">
            {selectedMarker[1].toFixed(4)}, {selectedMarker[0].toFixed(4)}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-2 text-xs flex justify-between items-center">
        <span>© وزارة الشؤون البلدية والقروية والإسكان</span>
        <span>مقياس الرسم: 1:{Math.round(1000000 / zoom)}</span>
      </div>
    </div>
  );
};