import {
  MessageCircle,
  Banknote,
  Info,
  Mail,
  ArrowRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import sxaint_promo_hp from "../assets/mp4_files/sxaint_promo_hp.mp4.mp4";

export default function Homepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden relative">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        {/* Logo - On mobile, only logo image shows, text hidden */}
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
          />
          <span className="hidden sm:inline text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#007bff] to-[#0056b3] bg-clip-text text-transparent">
            SXaint
          </span>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Navigation Links with Icons Only */}
          <a
            href="#features"
            className="text-gray-600 hover:text-[#007bff] transition-colors duration-200"
            aria-label="Features"
          >
            <Sparkles size={20} />
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-[#007bff] transition-colors duration-200"
            aria-label="Pricing"
          >
            <Banknote size={20} />
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-[#007bff] transition-colors duration-200"
            aria-label="About"
          >
            <Info size={20} />
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-[#007bff] transition-colors duration-200"
            aria-label="Contact"
          >
            <Mail size={20} />
          </a>

          {/* Get Started Button - Desktop */}
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-white transition-all duration-200 hover:bg-[#0056b3] hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#007bff" }}
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      >
        <div
          className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full">
            <button
              className="self-end p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              <X size={24} className="text-gray-700" />
            </button>
            <nav className="flex flex-col gap-4 mt-8">
              <a
                href="#features"
                className="flex items-center gap-3 text-lg font-medium text-gray-800 py-3 px-4 hover:bg-gray-50 hover:text-[#007bff] rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <Sparkles size={20} />
                Features
              </a>
              <a
                href="#pricing"
                className="flex items-center gap-3 text-lg font-medium text-gray-800 py-3 px-4 hover:bg-gray-50 hover:text-[#007bff] rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <Banknote size={20} />
                Pricing
              </a>
              <a
                href="#about"
                className="flex items-center gap-3 text-lg font-medium text-gray-800 py-3 px-4 hover:bg-gray-50 hover:text-[#007bff] rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <Info size={20} />
                About
              </a>
              <a
                href="#contact"
                className="flex items-center gap-3 text-lg font-medium text-gray-800 py-3 px-4 hover:bg-gray-50 hover:text-[#007bff] rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <Mail size={20} />
                Contact
              </a>
              <button
                className="flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-lg text-white transition-all duration-200 hover:bg-[#0056b3] active:scale-95"
                style={{ backgroundColor: "#007bff" }}
                onClick={closeMobileMenu}
              >
                Get Started
                <ArrowRight size={20} />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area with Video Background */}
      <main className="relative h-[calc(100vh-73px)] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={sxaint_promo_hp} type="video/mp4" />
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4 max-w-4xl">
            Evidence-Based Strategies for Lasting Change
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
            Build Resilience, Overcome Challenges
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl">
            Get started today — your Path to Emotional Balance Starts Here
          </p>
        </div>
      </main>

      {/* Progress Dots - Right Side - Responsive positioning */}
      <div className="fixed right-2 sm:right-4 bottom-28 sm:bottom-32 md:bottom-[178px] flex flex-col gap-2 sm:gap-3 z-20">
        <button
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-200 hover:scale-125"
          aria-label="Section 1"
        />
        <button
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-200 hover:scale-125"
          aria-label="Section 2"
        />
        <button
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-200 hover:scale-125"
          style={{
            backgroundColor: "#007bff",
            boxShadow: "0 0 12px 2px rgba(0, 123, 255, 0.6)",
          }}
          aria-label="Section 3"
        />
        <button
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-200 hover:scale-125"
          aria-label="Section 4"
        />
        <button
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-200 hover:scale-125"
          aria-label="Section 5"
        />
      </div>

      {/* Support Chat Button - Bottom Right - Responsive sizing */}
      <button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-95 flex items-center justify-center bg-black/70 hover:bg-black/80"
        aria-label="Support Chat"
      >
        <MessageCircle
          size={20}
          className="sm:w-6 sm:h-6"
          fill="white"
          stroke="white"
        />
      </button>
    </div>
  );
}
