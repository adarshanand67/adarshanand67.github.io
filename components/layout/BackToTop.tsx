"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (!isVisible) return null;
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 md:p-5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all z-50 font-mono text-sm hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
}
