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

    </main>
  );
}