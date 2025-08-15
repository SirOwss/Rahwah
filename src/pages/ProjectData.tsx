import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Upload, Building, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const ProjectData = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    location: "",
    buildingType: "",
    description: "",
    files: null as FileList | null
  });
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const navigate = useNavigate();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // You'll need to add your Mapbox access token
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [39.8282, 21.4225], // Saudi Arabia coordinates
      zoom: 6
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add click handler to set location
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setSelectedLocation([lng, lat]);
      
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }
      
      // Add new marker
      marker.current = new mapboxgl.Marker({
        color: '#8B5CF6'
      })
        .setLngLat([lng, lat])
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setProjectData(prev => ({ ...prev, files }));
      toast.success(`تم رفع ${files.length} ملف بنجاح`);
    }
  };

  const handleSubmit = () => {
    if (!projectData.name || !projectData.location || !projectData.buildingType || !projectData.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const projectInfo = {
      ...projectData,
      coordinates: selectedLocation,
      timestamp: Date.now()
    };

    localStorage.setItem("projectData", JSON.stringify(projectInfo));
    toast.success("تم حفظ بيانات المشروع بنجاح!");
    
    setTimeout(() => {
      navigate("/input");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
            <Building className="w-4 h-4" />
            محرر التصميم - مشروع المنزل التقليدي - عرض توضيحي
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للخلف
            </Button>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                قيد التحرير
              </Button>
              <Button variant="outline" size="sm">
                عرض 3D 2D
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Data Form */}
          <Card className="p-8 bg-card border-border/50">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">الانتهاء والحصول على النتائج النهائية</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-name" className="text-sm font-medium mb-2 block">
                    اسم المشروع
                  </Label>
                  <Input
                    id="project-name"
                    placeholder="مثال: مجمع الأعمال التجاري"
                    value={projectData.name}
                    onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                    dir="rtl"
                    className="bg-input border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="project-location" className="text-sm font-medium mb-2 block">
                    اسم المشروع
                  </Label>
                  <Input
                    id="project-location"
                    placeholder="مثال: مجمع الأعمال التجاري"
                    value={projectData.location}
                    onChange={(e) => setProjectData(prev => ({ ...prev, location: e.target.value }))}
                    dir="rtl"
                    className="bg-input border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="building-type" className="text-sm font-medium mb-2 block">
                    نوع المبنى
                  </Label>
                  <Select onValueChange={(value) => setProjectData(prev => ({ ...prev, buildingType: value }))}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="اختر نوع المبنى" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="residential">سكني</SelectItem>
                      <SelectItem value="commercial">تجاري</SelectItem>
                      <SelectItem value="industrial">صناعي</SelectItem>
                      <SelectItem value="educational">تعليمي</SelectItem>
                      <SelectItem value="healthcare">صحي</SelectItem>
                      <SelectItem value="religious">ديني</SelectItem>
                      <SelectItem value="mixed">مختلط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="project-description" className="text-sm font-medium mb-2 block">
                    وصف المشروع
                  </Label>
                  <Textarea
                    id="project-description"
                    placeholder="اكتب وصفاً مختصراً عن المشروع وأهدافه..."
                    value={projectData.description}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    dir="rtl"
                    className="min-h-24 bg-input border-border resize-none"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    الملفات والمخططات
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx,.txt,.dwg,.dxf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm mb-1">اسحب الملفات أو انقر للاختيار</p>
                      <p className="text-xs text-muted-foreground">
                        يدعم: صور، مقاطع فيديو، مخططات، مستندات
                      </p>
                    </label>
                  </div>
                  
                  {projectData.files && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">
                        الملفات المرفوعة: {projectData.files.length}
                      </p>
                      <div className="space-y-1">
                        {Array.from(projectData.files).slice(0, 3).map((file, index) => (
                          <div key={index} className="text-xs bg-accent px-2 py-1 rounded">
                            {file.name}
                          </div>
                        ))}
                        {projectData.files.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{projectData.files.length - 3} ملف إضافي
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full btn-primary mt-6"
                size="lg"
              >
                إنشاء المخططات
              </Button>
            </div>
          </Card>

          {/* Map Section */}
          <Card className="p-6 bg-card border-border/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">تحديد الموقع</h3>
                </div>
                <div className="text-xs text-muted-foreground">
                  المعاينة ثلاثية الأبعاد
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                انقر على الخريطة لتحديد موقع المشروع
              </p>

              <div className="relative">
                <div 
                  ref={mapContainer} 
                  className="w-full h-80 rounded-lg border border-border/50"
                  style={{ minHeight: '320px' }}
                />
                
                {/* Map Controls */}
                <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Mapbox API</p>
                </div>
                
                {selectedLocation && (
                  <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">
                      {selectedLocation[1].toFixed(4)}, {selectedLocation[0].toFixed(4)}
                    </p>
                  </div>
                )}
              </div>

              {/* Location Info */}
              {selectedLocation && (
                <div className="bg-accent rounded-lg p-4">
                  <h4 className="font-medium mb-2">الموقع المحدد</h4>
                  <p className="text-sm text-muted-foreground">
                    خط الطول: {selectedLocation[0].toFixed(6)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    خط العرض: {selectedLocation[1].toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};