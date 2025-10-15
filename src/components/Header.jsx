import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/70 backdrop-blur">
      <div className="container-xl py-3 flex items-center justify-between">
        <Link to="/" className="text-xl tracking-tight">FlavorMuse</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/about" className="hover:underline underline-offset-4">About us</Link>
        </nav>
      </div>
    </header>
  );
}
