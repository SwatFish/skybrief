import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {HashRouter, Routes, Route, BrowserRouter} from "react-router-dom";
import Index from "./pages/Index";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/skybrief/">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/planning"
            element={
              <PlaceholderPage
                title="Flight Planning"
                description="Route planning, fuel calculations, and weight & balance tools coming soon."
              />
            }
          />
          <Route
            path="/notam"
            element={
              <PlaceholderPage
                title="NOTAM Viewer"
                description="Search and filter NOTAMs by route, airport, or FIR coming soon."
              />
            }
          />
          <Route
            path="/airports"
            element={
              <PlaceholderPage
                title="Airport Directory"
                description="Comprehensive airport information database coming soon."
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Customize units, preferences, and display options coming soon."
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
