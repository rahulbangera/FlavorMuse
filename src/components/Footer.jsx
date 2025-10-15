export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="container-xl py-10 grid gap-6 sm:grid-cols-3">
        <div className="text-sm">
          <div className="font-medium">FlavorMuse</div>
          <p className="text-neutral-600 mt-1">Minimal, fast, and elegant cooking utilities.</p>
        </div>
        <div className="text-sm">
          <div className="font-medium">Explore</div>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/dashboard">Dashboard</a></li>
            <li><a className="hover:underline" href="/about">About us</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium">Legal</div>
          <ul className="mt-2 space-y-1">
            <li><span className="text-neutral-600">Privacy</span></li>
            <li><span className="text-neutral-600">Terms</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} FlavorMuse</div>
    </footer>
  );
}
