
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
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/new" element={
          <ProtectedRoute>
            <NewIdea />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditIdea />
          </ProtectedRoute>
        } />
        <Route path="/thoughts" element={
          <ProtectedRoute>
            <Thoughts />
          </ProtectedRoute>
        } />
        <Route path="/new-thought" element={
          <ProtectedRoute>
            <NewThought />
          </ProtectedRoute>
        } />
        <Route path="/edit-thought/:id" element={
          <ProtectedRoute>
            <EditThought />
          </ProtectedRoute>
        } />
        <Route path="/ai" element={
          <ProtectedRoute>
            <AI />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Show mobile nav only when authenticated */}
      <ProtectedRoute>
        <MobileNav />
      </ProtectedRoute>
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
