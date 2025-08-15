import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, MessageSquare, Eye, ArrowRight, Camera, Video, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ServiceSelection = () => {
  const navigate = useNavigate();

  const mainServices = [
    {
      id: "prompt",
      icon: MessageSquare,
      title: "اكتب برومت",
      description: "صف المبنى أو التصميم المطلوب بالتفصيل وسيقوم الذكاء الاصطناعي بتوليد النموذج",
      features: [
        "وصف باللغة العربية",
        "تفاصيل معمارية دقيقة",
        "مواد البناء والتشطيبات",
        "الطراز المعماري المطلوب"
      ],
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-600/10",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600"
    },
    {
      id: "upload",
      icon: Upload,
      title: "ارفع فيديو أو صور",
      description: "ارفع صور أو مقاطع فيديو للمبنى الذي تريد تحليله وتحويله إلى نموذج ثلاثي الأبعاد",
      features: [
        "دعم الصور عالية الدقة",
        "مقاطع فيديو بزوايا متعددة", 
        "تحليل ذكي للمساحات",
        "استخراج الأبعاد الدقيقة"
      ],
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-500/10 to-purple-600/10",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600"
    }
  ];

  const secondaryService = {
    id: "demo",
    icon: Eye,
    title: "اطلع على نموذج جاهز",
    description: "استكشف نموذج تجريبي جاهز لترى إمكانيات المنصة وجودة النتائج",
    features: [
      "نموذج منزل تقليدي",
      "مخططات معمارية كاملة",
      "نموذج ثلاثي الأبعاد تفاعلي",
      "ملفات قابلة للتحميل"
    ],
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600"
  };

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === "demo") {
      // تحديد نفس الصفحة للعرض التوضيحي
      localStorage.setItem("currentProject", JSON.stringify({
        type: "demo",
        content: "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة",
        status: "completed",
        id: "demo-001",
        title: "المنزل التقليدي - عرض توضيحي",
        timestamp: Date.now()
      }));
      navigate("/preview");
    } else {
      navigate(`/input?service=${serviceId}`);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto max-w-6xl px-4 py-6 md:py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4 md:mb-6 text-sm md:text-base">
            <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
            اختر طريقة العمل
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 px-2">
            كيف تريد أن تبدأ مشروعك؟
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            اختر الطريقة التي تناسبك للحصول على نموذج ثلاثي الأبعاد ومخططات معمارية احترافية
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {mainServices.map((service) => {
            const Icon = service.icon;
            
            return (
              <Card 
                key={service.id} 
                className={`relative p-4 sm:p-6 md:p-8 bg-gradient-to-br ${service.bgGradient} border-border/50 card-hover group cursor-pointer overflow-hidden`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <Icon className={`w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 ${service.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center px-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-muted-foreground text-center mb-4 md:mb-6 leading-relaxed px-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 md:mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Button 
                    className="w-full btn-primary group-hover:scale-105 transition-all duration-300"
                    size="lg"
                  >
                    ابدأ الآن
                    <ArrowRight className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Secondary Option - Smaller */}
        <div className="mb-8 md:mb-16">
          <div className="text-center mb-3 md:mb-4">
            <p className="text-muted-foreground text-sm">أو</p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <Card 
              className="relative p-3 md:p-4 bg-muted/30 border-border/30 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleServiceSelect(secondaryService.id)}
            >
              <div className="flex items-center gap-3 md:gap-4">
                {/* Icon */}
                <div className="w-6 md:w-8 h-6 md:h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Eye className="w-3 md:w-4 h-3 md:h-4 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xs md:text-sm font-medium mb-1">
                    {secondaryService.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    نموذج تجريبي جاهز
                  </p>
                </div>

                {/* Button */}
                <Button 
                  variant="ghost"
                  size="sm"
                  className="px-2 md:px-3 py-1 h-6 md:h-8 text-xs"
                >
                  شاهد
                  <ArrowRight className="w-3 h-3 mr-1" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-8 p-4 md:p-6 bg-card rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <FileText className="w-4 md:w-5 h-4 md:h-5 text-success" />
              </div>
              <div className="text-right">
                <div className="text-sm md:text-base font-semibold">نتائج سريعة</div>
                <div className="text-xs md:text-sm text-muted-foreground">72 ساعة فقط</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Camera className="w-4 md:w-5 h-4 md:h-5 text-info" />
              </div>
              <div className="text-right">
                <div className="text-sm md:text-base font-semibold">جودة عالية</div>
                <div className="text-xs md:text-sm text-muted-foreground">دقة احترافية</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Video className="w-4 md:w-5 h-4 md:h-5 text-warning" />
              </div>
              <div className="text-right">
                <div className="text-sm md:text-base font-semibold">متعدد التنسيقات</div>
                <div className="text-xs md:text-sm text-muted-foreground">DWG, PDF, DXF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};