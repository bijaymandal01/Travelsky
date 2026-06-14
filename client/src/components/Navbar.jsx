import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold text-blue-600">
              TravelSky
            </span>

            <span className="hidden md:inline-flex px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              Beta
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-slate-600 hover:text-sky-600 transition"
            >
              Home
            </Link>

            <Link
              to="/how-it-works"
              className="text-slate-600 hover:text-sky-600 transition"
            >
              How It Works
            </Link>

            <Link
              to="/features"
              className="text-slate-600 hover:text-sky-600 transition"
            >
              Features
            </Link>

            <Link
              to="/docs"
              className="text-slate-600 hover:text-sky-600 transition"
            >
              API Docs
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            <span className="material-symbols-outlined text-3xl text-slate-700">
              menu
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">

          <div className="flex flex-col p-4 gap-4">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 font-medium"
            >
              About
            </Link>

            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 font-medium"
            >
              Services
            </Link>

            <Link
              to="/docs"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 font-medium"
            >
              API Docs
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}