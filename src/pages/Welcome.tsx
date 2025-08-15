import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Clock, Download, Shield, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroRahwaImage from "@/assets/hero-architecture.jpg";

export const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "ذكاء اصطناعي متقدم",
      description: "تقنية متطورة لتحليل وتوليد النماذج المعمارية بدقة عالية"
    },
    {
      icon: Clock,
      title: "سرعة في التنفيذ",
      description: "احصل على نموذجك ثلاثي الأبعاد والمخططات في خطوات بسيطة مباشرة"
    },
    {
      icon: Download,
      title: "تنسيقات متعددة",
      description: "تصدير بتنسيقات DWG, PDF, DXF وصور عالية الدقة"
    },
    {
      icon: Shield,
      title: "أمان وموثوقية",
      description: "حماية كاملة لبياناتك ومشاريعك مع أعلى معايير الأمان"
    },
    {
      icon: Users,
      title: "سهولة الاستخدام",
      description: "واجهة بسيطة وسهلة تناسب جميع مستويات الخبرة"
    },
    {
      icon: Award,
      title: "جودة احترافية",
      description: "نتائج بجودة احترافية تلبي معايير الصناعة"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section 
        className="relative py-32 px-4 overflow-hidden flex items-center min-h-[80vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(/lovable-uploads/a31fb680-7af0-4bd6-b75b-f0b873c32474.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight hero-text">
              <span className="text-foreground">رهوة</span>
              <br />
              <span className="text-white">
                الذكاء المعماري
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              حوّل أفكارك المعمارية إلى نماذج ثلاثية الأبعاد ومخططات هندسية احترافية 
              <br />
              <span className="text-muted-foreground font-semibold">بجملة واحدة أو صورة واحدة</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Button 
                size="lg" 
                className="btn-primary px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-bold shadow-2xl mobile-touch w-full sm:w-auto"
                onClick={() => navigate("/services")}
              >
                ابدأ مشروعك الآن
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl border-2 border-white/30 text-white hover:bg-white hover:text-black mobile-touch w-full sm:w-auto"
                onClick={() => navigate("/services")}
              >
                جرب مجاناً
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              لماذا رهوة هو الخيار الأمثل؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              منصة متطورة تجمع بين قوة الذكاء الاصطناعي وخبرة الهندسة المعمارية لتقدم لك حلول شاملة ومبتكرة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-8 bg-card border-border/50 card-hover group">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-warning/5 to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            جاهز لتحويل رؤيتك إلى واقع؟
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            انضم إلى آلاف المعماريين والمطورين الذين يثقون برهوة
          </p>
          <Button 
            size="lg" 
            className="btn-primary px-12 py-6 text-xl font-bold shadow-2xl"
            onClick={() => navigate("/services")}
          >
            ابدأ الآن - مجاناً
            <ArrowRight className="w-6 h-6 mr-3" />
          </Button>
        </div>
      </section>
    </div>
  );
};