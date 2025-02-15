export default function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
