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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <a href="/modules" className="text-slate-300 hover:text-white transition-colors">
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
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-slate-800 animate-slide-up">
              <div className="flex flex-col gap-4">
                <a href="/" className="text-slate-300 hover:text-white transition-colors">
                  Dashboard
                </a>
                <a href="/modules" className="text-slate-300 hover:text-white transition-colors">
                  Module
                </a>
                {user ? (
                  <div className="pt-4 border-t border-slate-800">
                    <UserProfile />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
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
