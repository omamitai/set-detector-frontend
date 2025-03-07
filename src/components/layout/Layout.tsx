
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Github } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-set-purple rounded-full"></div>
            <h1 className="text-2xl font-bold">SET Sleuth</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
            A personal project for SET game enthusiasts
          </p>
          <a
            href="https://github.com/your-username/set-sleuth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            View on GitHub
          </a>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
