"use client";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <span className="font-semibold gradient-text">LearnHub</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 LearnHub - Built with Next.js & ❤️
          </p>
          <div className="flex gap-4 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Über</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
