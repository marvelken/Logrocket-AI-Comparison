'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, BookOpen, Zap } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="https://logrocket.com" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LogRocket
              </span>
              <span className="text-xs text-gray-500 -mt-1">AI Tools Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="https://logrocket.com" 
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              href="https://blog.logrocket.com" 
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </Link>
            <Link 
              href="#comparison" 
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              <Zap className="w-4 h-4" />
              <span>AI Tools Comparison</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/20 shadow-xl">
            <nav className="px-4 py-4 space-y-3">
              <Link 
                href="https://logrocket.com" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Home</span>
              </Link>
              <Link 
                href="https://blog.logrocket.com" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Blog</span>
              </Link>
              <Link 
                href="#comparison" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Zap className="w-5 h-5" />
                <span className="font-medium">AI Tools Comparison</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;