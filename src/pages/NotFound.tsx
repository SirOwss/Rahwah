import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">404</h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 md:mb-6">عذراً! الصفحة غير موجودة</p>
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 underline text-sm md:text-base inline-block py-2 px-4 rounded mobile-touch"
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;
