import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
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
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary">Contact</button>
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
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left hover:text-primary">About</button>
            <button onClick={() => scrollToSection('projects')} className="block w-full text-left hover:text-primary">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="block w-full text-left hover:text-primary">Skills</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left hover:text-primary">Contact</button>
          </div>
        )}
      </nav>
    </header>
  );
}