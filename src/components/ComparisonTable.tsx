'use client';

import { useState } from 'react';
import { Check, X, AlertTriangle, ChevronDown, ChevronRight, Download, Share2, Brain, Code, Zap, Trophy, DollarSign, FileText } from 'lucide-react';
import { toolData, getRelevantFeatureCategories } from '../lib/data';

interface ComparisonTableProps {
  selectedTools: string[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ selectedTools }) => {
  // Get relevant feature categories based on selected tools
  const relevantCategories = getRelevantFeatureCategories(selectedTools);
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(relevantCategories))
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
    const relevantCategories = getRelevantFeatureCategories(selectedTools);
    let csvContent = "Feature," + selectedTools.map(id => toolData[id].name).join(",") + "\n";
    
    // Add basic info
    csvContent += "\nBasic Information,,,,\n";
    csvContent += "Type,";
    selectedTools.forEach(toolId => {
      csvContent += `${toolData[toolId].type},`;
    });
    csvContent += "\n";
    
    csvContent += "Category,";
    selectedTools.forEach(toolId => {
      csvContent += `${toolData[toolId].category},`;
    });
    csvContent += "\n";

    // Add features
    Object.entries(relevantCategories).forEach(([category, features]) => {
      csvContent += `\n${category},,,,\n`;
      features.forEach(feature => {
        csvContent += `${feature},`;
        selectedTools.forEach(toolId => {
          const hasFeature = toolData[toolId].features[feature];
          csvContent += `${hasFeature === true ? 'Yes' : hasFeature === false ? 'No' : hasFeature || 'N/A'},`;
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
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const aiModels = selectedTools.filter(id => toolData[id].type === 'AI Model');
  const devTools = selectedTools.filter(id => toolData[id].type === 'Development Tool');

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Feature Comparison</h2>
            <div className="flex items-center space-x-4 text-purple-100">
              <span>📊 {selectedTools.length} tools selected</span>
              {aiModels.length > 0 && <span>🧠 {aiModels.length} AI models</span>}
              {devTools.length > 0 && <span>🛠️ {devTools.length} dev tools</span>}
              <span>📋 {Object.keys(relevantCategories).length} categories</span>
            </div>
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

      {/* Tool Headers with Enhanced Info */}
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `300px repeat(${selectedTools.length}, 1fr)` }}>
          <div className="font-medium text-gray-700">Tools & Features</div>
          {selectedTools.map(toolId => {
            const tool = toolData[toolId];
            const isAIModel = tool.type === 'AI Model';
            
            return (
              <div key={toolId} className="text-center space-y-3">
                {/* Tool Name and Type */}
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    {isAIModel ? (
                      <Brain className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Code className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="font-bold text-gray-900">{tool.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">{tool.category}</div>
                </div>

                {/* AI Model Specific Info */}
                {isAIModel && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-2">
                    {tool.benchmark && (
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span className="font-medium text-green-700">{tool.benchmark}</span>
                      </div>
                    )}
                    {tool.contextWindow && (
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <FileText className="w-3 h-3 text-blue-500" />
                        <span className="text-blue-700">{tool.contextWindow}</span>
                      </div>
                    )}
                    {tool.pricing && (
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <DollarSign className="w-3 h-3 text-green-500" />
                        <span className="text-green-700">{tool.pricing}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Development Tool Specific Info */}
                {!isAIModel && tool.pricing && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-center space-x-1 text-xs">
                      <DollarSign className="w-3 h-3 text-green-500" />
                      <span className="text-green-700">{tool.pricing}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Categories */}
      <div className="max-h-[600px] overflow-y-auto">
        {Object.entries(relevantCategories).map(([category, features]) => {
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
                  {category === 'AI Model Capabilities' && (
                    <Brain className="w-4 h-4 text-purple-600" />
                  )}
                  {(category === 'Tool Integration' || category === 'Workflow Features') && (
                    <Code className="w-4 h-4 text-blue-600" />
                  )}
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
                          const tool = toolData[toolId];
                          const hasFeature = tool.features[feature];
                          const featureValue = getFeatureValue(hasFeature);
                          
                          // Handle features that don't apply to certain tool types
                          if (category === 'AI Model Capabilities' && tool.type !== 'AI Model') {
                            return (
                              <div key={toolId} className="flex items-center justify-center">
                                <span className="text-xs text-gray-400 italic">N/A</span>
                              </div>
                            );
                          }
                          
                          if ((category === 'Tool Integration' || category === 'Workflow Features') && tool.type !== 'Development Tool') {
                            return (
                              <div key={toolId} className="flex items-center justify-center">
                                <span className="text-xs text-gray-400 italic">N/A</span>
                              </div>
                            );
                          }
                          
                          // Handle missing features (undefined)
                          if (hasFeature === undefined) {
                            return (
                              <div key={toolId} className="flex items-center justify-center">
                                <span className="text-xs text-gray-400 italic">N/A</span>
                              </div>
                            );
                          }
                          
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

      {/* Enhanced Footer with Statistics */}
      <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Legend */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Full Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Limited/Partial</span>
              </div>
              <div className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span>Not Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 italic">N/A</span>
                <span>Not Applicable</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 mb-3">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-700">AI Models</div>
                <div className="text-lg font-bold text-purple-600">{aiModels.length}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-700">Dev Tools</div>
                <div className="text-lg font-bold text-blue-600">{devTools.length}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-700">Features</div>
                <div className="text-lg font-bold text-green-600">
                  {Object.values(relevantCategories).flat().length}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-700">Categories</div>
                <div className="text-lg font-bold text-orange-600">
                  {Object.keys(relevantCategories).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center text-sm text-gray-500">
          <div>
            Last updated: {new Date().toLocaleDateString()} | Data from official documentation
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Powered by LogRocket</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;