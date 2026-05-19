import {
  MessageCircle,
  Banknote,
  Info,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import backgroundImage from "../assets/ChatGPT Image May 17, 2026, 05_43_52 AM.png";
import logo from "../assets/logo.png";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <span className="text-3xl font-extrabold bg-gradient-to-r from-[#007bff] to-[#0056b3] bg-clip-text text-transparent">
            SXaint
          </span>
        </div>

        {/* Right Side - Navigation Links and Button */}
        <div className="flex items-center gap-6">
          {/* Navigation Links with Icons Only */}
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Features"
          >
            <Sparkles size={20} />
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Pricing"
          >
            <Banknote size={20} />
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="About"
          >
            <Info size={20} />
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Contact"
          >
            <Mail size={20} />
          </a>

          {/* Get Started Button */}
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#007bff" }}
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main
        className="h-[calc(100vh-73px)] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="px-8 pt-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Evidence-Based Strategies for Lasting Change
          </h2>
          <h3 className="text-3xl font-semibold text-white mb-6">
            Build Resilience, Overcome Challenges
          </h3>
          <p className="text-xl text-white">
            Get started today your Path to Emotional Balance Starts Here
          </p>
        </div>
      </main>

      {/* Progress Dots - Right Side */}
      <div className="fixed right-4 bottom-[178px] flex flex-col gap-3">
        <button
          className="w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          aria-label="Section 1"
        />
        <button
          className="w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          aria-label="Section 2"
        />
        <button
          className="w-5 h-5 rounded-full transition-all"
          style={{
            backgroundColor: "#007bff",
            boxShadow: "0 0 12px 2px rgba(0, 123, 255, 0.6)",
          }}
          aria-label="Section 3"
        />
        <button
          className="w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          aria-label="Section 4"
        />
        <button
          className="w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          aria-label="Section 5"
        />
      </div>

      {/* Support Chat Button - Bottom Right */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center bg-black/70"
        aria-label="Support Chat"
      >
        <MessageCircle size={24} fill="white" stroke="white" />
      </button>
    </div>
  );
}
