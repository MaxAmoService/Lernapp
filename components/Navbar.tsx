"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { UserProfile } from "./UserProfile";
import { LoginModal } from "./LoginModal";
import { BookOpen, Menu, X } from "lucide-react";

export function Navbar() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-slate-800">
        <div className="w-[84%] max-w-none mx-auto px-1">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="text-xl font-bold gradient-text">LearnHub</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-slate-300 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/modules" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Module
              </a>
              
              {user ? (
                <UserProfile />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                >
                  Anmelden
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {user && <UserProfile />}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-slate-400 hover:text-white"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-slate-800 animate-slide-up">
              <div className="flex flex-col gap-4">
                <a
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="text-slate-300 hover:text-white transition-colors py-2"
                >
                  📊 Dashboard
                </a>
                <a
                  href="/modules"
                  onClick={() => setShowMobileMenu(false)}
                  className="text-slate-300 hover:text-white transition-colors py-2"
                >
                  📚 Module
                </a>
                {!user && (
                  <button
                    onClick={() => { setShowLogin(true); setShowMobileMenu(false); }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors text-center"
                  >
                    Anmelden
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
