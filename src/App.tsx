
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { IdeaProvider } from "@/contexts/IdeaContext";
import { ThoughtProvider } from "@/contexts/ThoughtContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MobileNav from "@/components/layout/MobileNav";

// Pages
import Dashboard from "./pages/Dashboard";
import NewIdea from "./pages/NewIdea";
import EditIdea from "./pages/EditIdea";
import Thoughts from "./pages/Thoughts";
import NewThought from "./pages/NewThought";
import EditThought from "./pages/EditThought";
import AI from "./pages/AI";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* All routes are now unprotected since we removed auth */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new" element={<NewIdea />} />
        <Route path="/edit/:id" element={<EditIdea />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/new-thought" element={<NewThought />} />
        <Route path="/edit-thought/:id" element={<EditThought />} />
        <Route path="/ai" element={<AI />} />
        
        {/* Catch-all route redirects to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      
      {/* Always show mobile nav since everyone is "authenticated" */}
      <MobileNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <IdeaProvider>
            <ThoughtProvider>
              <Toaster />
              <Sonner position="top-right" />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </ThoughtProvider>
          </IdeaProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
