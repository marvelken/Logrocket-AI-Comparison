'use client';

import { useState } from 'react';
import { Check, X, AlertTriangle, ChevronDown, ChevronRight, Download, Share2 } from 'lucide-react';
import { toolData, featureCategories } from '../lib/data';

interface ComparisonTableProps {
  selectedTools: string[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ selectedTools }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(featureCategories))
  );

  if (selectedTools.length === 0) {
    return null;
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getFeatureIcon = (hasFeature: boolean | string) => {
    if (hasFeature === true) {
      return <Check className="w-5 h-5 text-emerald-500" />;
    } else if (hasFeature === false) {
      return <X className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getFeatureValue = (hasFeature: boolean | string) => {
    if (hasFeature === true) {
      return '';
    } else if (hasFeature === false) {
      return '';
    } else {
      return hasFeature;
    }
  };

  const exportComparison = () => {
    // Simple CSV export functionality
    let csvContent = "Feature," + selectedTools.map(id => toolData[id].name).join(",") + "\n";
    
    Object.entries(featureCategories).forEach(([category, features]) => {
      csvContent += `\n${category},,,,\n`;
      features.forEach(feature => {
        csvContent += `${feature},`;
        selectedTools.forEach(toolId => {
          const hasFeature = toolData[toolId].features[feature];
          csvContent += `${hasFeature === true ? 'Yes' : hasFeature === false ? 'No' : hasFeature},`;
        });
        csvContent += "\n";
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-tools-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const shareComparison = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Tools Comparison',
          text: `Comparing ${selectedTools.map(id => toolData[id].name).join(', ')}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Feature Comparison</h2>
            <p className="text-purple-100">
              Comparing {selectedTools.length} tools across {Object.keys(featureCategories).length} feature categories
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={shareComparison}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={exportComparison}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tool Headers */}
      <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `300px repeat(${selectedTools.length}, 1fr)` }}>
          <div className="font-medium text-gray-700">Features</div>
          {selectedTools.map(toolId => {
            const tool = toolData[toolId];
            return (
              <div key={toolId} className="text-center">
                <div className="font-bold text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {tool.name.includes('Claude') ? 'AI Assistant' : 
                   tool.name.includes('GPT') ? 'AI Assistant' :
                   tool.name.includes('Copilot') ? 'IDE Integration' :
                   tool.name.includes('Cursor') ? 'AI-Native IDE' :
                   tool.name.includes('Windsurf') ? 'AI-Native IDE' :
                   tool.name.includes('v0') ? 'UI Generator' :
                   tool.name.includes('Bolt') ? 'Full-Stack Builder' :
                   tool.name.includes('Gemini') ? 'AI Assistant' :
                   tool.name.includes('Lovable AI') ? 'AI Assistant' :
                   tool.name.includes('Deepseek') ? 'AI Assistant' :
                   'IDE Integration'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Categories */}
      <div className="max-h-96 overflow-y-auto">
        {Object.entries(featureCategories).map(([category, features]) => {
          const isExpanded = expandedCategories.has(category);
          
          return (
            <div key={category} className="border-b border-gray-100 last:border-b-0">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-8 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <span>{category}</span>
                </h3>
                <span className="text-sm text-gray-500">
                  {features.length} features
                </span>
              </button>

              {/* Category Features */}
              {isExpanded && (
                <div className="divide-y divide-gray-100">
                  {features.map((feature, index) => (
                    <div 
                      key={feature} 
                      className={`px-8 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}
                    >
                      <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `300px repeat(${selectedTools.length}, 1fr)` }}>
                        <div className="font-medium text-gray-700">{feature}</div>
                        {selectedTools.map(toolId => {
                          const hasFeature = toolData[toolId].features[feature];
                          const featureValue = getFeatureValue(hasFeature);
                          
                          return (
                            <div key={toolId} className="flex items-center justify-center space-x-2">
                              {getFeatureIcon(hasFeature)}
                              {featureValue && (
                                <span className="text-sm text-amber-600 font-medium">
                                  {featureValue}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Supported</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Limited/Partial</span>
            </div>
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span>Not Available</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;