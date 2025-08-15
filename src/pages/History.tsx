import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter, Eye, Download, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  type: "prompt" | "upload" | "demo";
  content?: string;
  status: "processing" | "completed" | "error";
  timestamp: number;
}

export const History = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "processing">("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const history = JSON.parse(localStorage.getItem("projectHistory") || "[]");
    
    // Add demo projects if history is empty
    if (history.length === 0) {
      const demoProjects = [
        {
          id: "demo-001",
          title: "المنزل التقليدي",
          type: "prompt" as const,
          content: "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة",
          status: "completed" as const,
          timestamp: Date.now() - 86400000 // 1 day ago
        },
        {
          id: "demo-002",
          title: "الفيلا العصرية",
          type: "upload" as const,
          status: "completed" as const,
          timestamp: Date.now() - 172800000 // 2 days ago
        },
        {
          id: "demo-003",
          title: "المبنى التجاري",
          type: "prompt" as const,
          content: "مبنى تجاري من ثلاثة طوابق مع محلات في الطابق الأرضي ومكاتب في الطوابق العلوية",
          status: "processing" as const,
          timestamp: Date.now() - 3600000 // 1 hour ago
        }
      ];
      
      localStorage.setItem("projectHistory", JSON.stringify(demoProjects));
      setProjects(demoProjects);
    } else {
      setProjects(history);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.content && project.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleViewProject = (project: Project) => {
    localStorage.setItem("currentProject", JSON.stringify(project));
    navigate("/preview");
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem("projectHistory", JSON.stringify(updatedProjects));
    toast.success("تم حذف المشروع");
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="status-chip completed">مكتمل</span>;
      case "processing":
        return <span className="status-chip processing">قيد المعالجة</span>;
      case "error":
        return <span className="status-chip in-progress">خطأ</span>;
      default:
        return <span className="status-chip in-progress">غير معروف</span>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "prompt":
        return "وصف نصي";
      case "upload":
        return "رفع ملفات";
      case "demo":
        return "عرض توضيحي";
      default:
        return "غير محدد";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              مشاريعي
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              جميع مشاريعك المعمارية في مكان واحد
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="btn-primary px-6 mobile-touch"
            onClick={() => navigate("/input")}
          >
            <Plus className="w-5 h-5 mr-2" />
            مشروع جديد
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 bg-card border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في المشاريع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
                dir="rtl"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className="px-4"
              >
                الكل
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
                className="px-4"
              >
                مكتمل
              </Button>
              <Button
                variant={filterStatus === "processing" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("processing")}
                className="px-4"
              >
                قيد المعالجة
              </Button>
            </div>
          </div>
        </Card>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border/50">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">لا توجد مشاريع</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "لا توجد مشاريع تطابق البحث" : "ابدأ مشروعك الأول الآن"}
            </p>
            <Button onClick={() => navigate("/input")} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              إنشاء مشروع جديد
            </Button>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="p-6 bg-card border-border/50 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getTypeLabel(project.type)}
                    </p>
                  </div>
                  {getStatusChip(project.status)}
                </div>

                {project.content && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.content}
                  </p>
                )}

                <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                  <span>{new Date(project.timestamp).toLocaleDateString('ar-SA')}</span>
                  <span>{new Date(project.timestamp).toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewProject(project)}
                    disabled={project.status === "processing"}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    عرض
                  </Button>
                  
                  {project.status === "completed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleViewProject(project);
                        toast.success("جاري التحميل...");
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};