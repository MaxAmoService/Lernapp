"use client";

import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import "katex/dist/katex.min.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <title>LearnHub - Modular Learning Platform</title>
        <meta name="description" content="Lerne React, TypeScript, Next.js und mehr mit interaktiven Lektionen" />
      </head>
      <body className="min-h-screen bg-dark-950 text-slate-100">
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
