import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold">
            Portfolio
          </button>

          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-primary">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-primary">Skills</button>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary">Contact</button>
            <Link href="/login" className="hover:text-primary">Login</Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b">
            <div className="flex flex-col space-y-4 p-4">
              <button onClick={() => scrollToSection('about')} className="hover:text-primary">About</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-primary">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-primary">Skills</button>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary">Contact</button>
              <Link href="/login" className="hover:text-primary">Login</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}