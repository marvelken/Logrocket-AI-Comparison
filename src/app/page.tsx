'use client';

import { useState } from 'react';
import ToolSelector from '../components/ToolSelector';
import ComparisonTable from '../components/ComparisonTable';

export default function Home() {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleCompare = (tools: string[]) => {
    setSelectedTools(tools);
    setShowComparison(true);
    
    // Smooth scroll to comparison section
    setTimeout(() => {
      const comparisonElement = document.getElementById('comparison');
      if (comparisonElement) {
        comparisonElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section with Tool Selector */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolSelector onCompare={handleCompare} />
        </div>
      </section>

      {/* Comparison Section */}
      {showComparison && (
        <section id="comparison" className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonTable selectedTools={selectedTools} />
          </div>
        </section>
      )}

      {/* Additional Info Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Compare AI Development Tools?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Save Development Time</h3>
              <p className="text-gray-600">
                Choose the right tool for your workflow and boost productivity by up to 40% with AI-powered development.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost Optimization</h3>
              <p className="text-gray-600">
                Compare pricing and features to find the most cost-effective solution for your team size and needs.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Future-Proof Stack</h3>
              <p className="text-gray-600">
                Select tools with the features you need today and the scalability for tomorrow's requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}