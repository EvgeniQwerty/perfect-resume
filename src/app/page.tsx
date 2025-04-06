"use client";

import HeroSection from "./components/HeroSection";
import ResumeAnimation from "./components/ResumeAnimation";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col home-content">
      <main className="flex-grow flex items-center justify-center py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center h-full">
            {/* Left side - Text content */}
            <HeroSection />
            
            {/* Right side - Interactive animation */}
            <ResumeAnimation />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
