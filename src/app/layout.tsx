'use client';

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageSwitch from "./components/LanguageSwitch";
import "./globals.css";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Removed CDN reference - using local font files from /public/font directory */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
            <div className="container mx-auto px-4 py-2 flex justify-end">
              <LanguageSwitch />
            </div>
          </header>
          <Toaster position="top-center" toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }} />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
