import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, CheckCircle, RotateCw, MessageCircle, Bot, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Interactive3DViewer } from "@/components/Interactive3DViewer";
import { InteractiveImageViewer } from "@/components/InteractiveImageViewer";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isProcessing?: boolean;
}

export const Preview = () => {
  const [project, setProject] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasModification, setHasModification] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedProject = localStorage.getItem("currentProject");
    if (savedProject) {
      const projectData = JSON.parse(savedProject);
      // Simulate processing completion
      setTimeout(() => {
        const newProject = {
          ...projectData,
          status: "completed",
          id: Date.now(),
          title: "مشروع عمارة تقليدية"
        };
        setProject(newProject);
        
        // Add initial bot welcome message
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          type: 'bot',
          content: `مرحباً! تم إنشاء النموذج الأولي لمشروعك بنجاح. يمكنك الآن إضافة أي تعديلات تريدها على التصميم وسأقوم بتطبيقها فوراً.`,
          timestamp: new Date()
        };
        setChatMessages([welcomeMessage]);
      }, 2000);
    } else {
      // Load demo project if no current project
      const demoProject = {
        type: "demo",
        content: "منزل تقليدي من طابقين من الطوب الطيني مع ثلاث غرف نوم ومدخل شرقي وفناء مركزي ونوافذ خشبية مزخرفة",
        status: "completed",
        id: "demo-001",
        title: "مشروع المنزل التقليدي - عرض توضيحي"
      };
      setProject(demoProject);
      
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        content: `مرحباً! هذا مشروع تجريبي. يمكنك تجربة إضافة تعديلات على التصميم وسأقوم بتطبيقها.`,
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [chatMessages]);

  const handleMessageSubmit = async () => {
    if (!newMessage.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsProcessing(true);
    
    // Add processing indicator
    const processingMessage: ChatMessage = {
      id: 'processing',
      type: 'bot',
      content: "جاري تطبيق التعديل على النموذج...",
      timestamp: new Date(),
      isProcessing: true
    };
    
    setChatMessages(prev => [...prev, processingMessage]);
    
    // Simulate AI processing
    setTimeout(() => {
      // Remove processing message and add response
      setChatMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'processing');
        
        const responses = [
          "تم تطبيق التعديل بنجاح! يمكنك مشاهدة التغييرات في النموذج ثلاثي الأبعاد.",
          "ممتاز! تم تحديث التصميم وفقاً لطلبك. هل تريد إضافة أي تعديلات أخرى؟",
          "تم التعديل بنجاح! النموذج محدث الآن. ما رأيك بالنتيجة؟",
          "رائع! طُبق التعديل على النموذج. يمكنك متابعة إضافة المزيد من التعديلات."
        ];
        
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        
        return [...filtered, botResponse];
      });
      
      setIsProcessing(false);
      setHasModification(true);
      toast.success("تم تطبيق التعديل على النموذج");
    }, 2500);
  };

  const handleFinish = () => {
    if (project && !isFinishing) {
      setIsFinishing(true);
      
      // Show loading state for 3 seconds before navigating
      setTimeout(() => {
        const modifications = chatMessages
          .filter(msg => msg.type === 'user')
          .map(msg => msg.content);
          
        const finalProject = {
          ...project,
          modifications: modifications,
          chatHistory: chatMessages,
          finalizedAt: Date.now()
        };
        
        localStorage.setItem("finalProject", JSON.stringify(finalProject));
        navigate("/final-results");
      }, 3000);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">جاري إنشاء النموذج الأولي...</h2>
        <p className="text-muted-foreground">قد تستغرق هذه العملية بضع دقائق</p>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Loading Overlay */}
      {isFinishing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">جاري إنشاء النتائج النهائية...</h2>
            <p className="text-muted-foreground">يتم الآن تجهيز ملفات التحميل والتقارير النهائية</p>
          </div>
        </div>
      )}
      
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              النتيجة الأولية - {project.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="status-chip processing">قيد التطوير</span>
              <span className="text-sm text-muted-foreground">
                يمكنك إضافة تعديلات إضافية
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/input")}
              className="px-6 mobile-touch"
            >
              العودة للإدخال
            </Button>
            <Button 
              onClick={handleFinish}
              className="px-6 btn-primary mobile-touch"
              disabled={isProcessing || isFinishing}
            >
              {isFinishing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  جاري إنشاء النتائج النهائية...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  الانتهاء والحصول على النتائج النهائية
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:items-start">
          {/* 3D Model Viewer - Enlarged */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="bg-card border-border/50 overflow-hidden h-full">
              <div className="border-b border-border px-6 py-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <RotateCw className="w-5 h-5" />
                  النموذج الأولي
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  يمكنك إضافة تعديلات لتحسين التصميم
                </p>
              </div>

              <div className="p-4 md:p-6 flex-1">
                <div className="h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                  {hasModification ? (
                    <InteractiveImageViewer 
                      imageUrl="/lovable-uploads/e9a4ec08-e9d6-4d04-be9e-7c586c91dc8a.png"
                      className="w-full h-full"
                    />
                  ) : (
                    <Interactive3DViewer 
                      modelType="traditional-house" 
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Combined Project Info and Assistant Panel */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Project Info Card - Moved to top */}
            <Card className="bg-card border-border/50 p-6 mb-6">
              <h3 className="font-semibold mb-4 text-sm">معلومات المشروع</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">النوع:</span>
                  <span>{project.type === "prompt" ? "وصف نصي" : project.type === "upload" ? "رفع ملفات" : "عرض توضيحي"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الرسائل:</span>
                  <span>{chatMessages.filter(msg => msg.type === 'user').length}</span>
                </div>
                
                {project.content && (
                  <div>
                    <span className="text-muted-foreground">الوصف الأساسي:</span>
                    <p className="mt-2 text-xs leading-relaxed bg-muted p-3 rounded-md">{project.content}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Assistant Panel - Below project info */}
            <Card className="bg-card border-border/50 h-fit">
              <div className="border-b border-border px-6 py-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  مساعد التصميم المعماري
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  تحدث معي لتعديل وتحسين تصميمك
                </p>
              </div>

              <div className="flex flex-col h-80 md:h-96">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.type === 'bot' && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={`max-w-[85%] rounded-lg px-4 py-2 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {message.isProcessing && (
                            <div className="flex items-center gap-2 mt-2">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span className="text-xs opacity-70">معالجة...</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString('ar-SA', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        
                        {message.type === 'user' && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-accent text-accent-foreground">
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="اكتب تعديلك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleMessageSubmit()}
                      disabled={isProcessing}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleMessageSubmit}
                      disabled={!newMessage.trim() || isProcessing}
                      size="icon"
                      className="flex-shrink-0"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    اضغط Enter للإرسال • مثال: "أريد زيادة حجم النوافذ" أو "غير لون الواجهة"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};