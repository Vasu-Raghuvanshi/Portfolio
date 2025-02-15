import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost";
  className?: string;
}

export function ButtonLink({ href, children, variant = "default", className = "" }: ButtonLinkProps) {
  return (
    <Link href={href}>
      <Button variant={variant} className={className}>
        {children}
      </Button>
    </Link>
  );
}
