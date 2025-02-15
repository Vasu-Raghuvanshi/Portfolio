import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Portfolio
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="#about" className="hover:text-primary">About</Link>
            <Link href="#projects" className="hover:text-primary">Projects</Link>
            <Link href="#skills" className="hover:text-primary">Skills</Link>
            <Link href="#contact" className="hover:text-primary">Contact</Link>
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
            <Link href="#about" className="block hover:text-primary">About</Link>
            <Link href="#projects" className="block hover:text-primary">Projects</Link>
            <Link href="#skills" className="block hover:text-primary">Skills</Link>
            <Link href="#contact" className="block hover:text-primary">Contact</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
