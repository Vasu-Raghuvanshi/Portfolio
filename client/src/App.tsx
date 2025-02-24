import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Login from "@/components/Login";

// Custom hook to handle GitHub Pages routing
const useHashLocation = () => {
  const [, setLoc] = useLocation();

  // Get the current location from the URL
  const getLocation = () => {
    // Check if we're on GitHub Pages
    if (window.location.host.includes("github.io")) {
      // Extract the path from the query parameter
      const path = window.location.search.includes("?/") 
        ? window.location.search.split("?/")[1] 
        : "";
      return "/" + path;
    }
    // For local development, use the normal path
    return window.location.pathname;
  };

  // Custom setter for the location
  const setLocation = (to: string) => {
    if (window.location.host.includes("github.io")) {
      // For GitHub Pages, update the URL with the query parameter
      window.history.pushState(null, "", window.location.pathname + "?/" + to.slice(1));
    } else {
      // For local development, use normal routing
      setLoc(to);
    }
  };

  return [getLocation(), setLocation];
};

function Router() {
  return (
    <Switch hook={useHashLocation}>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/login" component={Login} />
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