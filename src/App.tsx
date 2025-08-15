import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Welcome } from "./pages/Welcome";
import { ServiceSelection } from "./pages/ServiceSelection";
import { Input } from "./pages/Input";
import { Preview } from "./pages/Preview";
import { FinalResults } from "./pages/FinalResults";
import { History } from "./pages/History";
import { Demo } from "./pages/Demo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/services" element={<ServiceSelection />} />
          <Route path="/input" element={<Input />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/final-results" element={<FinalResults />} />
          <Route path="/history" element={<History />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
