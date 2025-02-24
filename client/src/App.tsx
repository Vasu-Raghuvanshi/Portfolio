import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// Custom hook to handle GitHub Pages routing
const useHashLocation = () => {
  const [loc, setLoc] = useLocation();
  
  // Get the hash location from the URL (e.g., "/?/home" -> "/home")
  const location = loc.includes("/?/") ? loc.split("/?")[1] : loc;
  
  // Custom setter for the location
  const setLocation = (to: string) => {
    // If we're on GitHub Pages, use the hash format
    if (window.location.host.includes("github.io")) {
      setLoc("/?"+to);
    } else {
      setLoc(to);
    }
  };

  return [location, setLocation];
};

function Router() {
  return (
    <Switch hook={useHashLocation}>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;