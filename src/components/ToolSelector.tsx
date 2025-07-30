'use client';

import { useState } from 'react';
import { Check, Sparkles, ArrowRight, Zap, Code, Palette, Bot, Terminal, Brain, Cpu } from 'lucide-react';
import { toolData, getAIModels, getDevelopmentTools } from '../lib/data';

interface ToolSelectorProps {
  onCompare: (selectedTools: string[]) => void;
}

const getIcon = (category: string) => {
  switch (category) {
    case 'General Purpose AI':
    case 'Premium AI':
    case 'Multimodal AI':
    case 'Agentic AI': 
      return <Brain className="w-6 h-6" />;
    case 'Specialized Coding AI':
    case 'Open Source AI':
      return <Cpu className="w-6 h-6" />;
    case 'IDE Integration':
    case 'AI-Native IDE':
      return <Code className="w-6 h-6" />;
    case 'UI Generator':
      return <Palette className="w-6 h-6" />;
    case 'Full-Stack Builder':
      return <Zap className="w-6 h-6" />;
    case 'Command Line AI':
    case 'Terminal AI':
      return <Terminal className="w-6 h-6" />;
    default: 
      return <Bot className="w-6 h-6" />;
  }
};

const getGradient = (category: string) => {
  switch (category) {
    case 'General Purpose AI': return 'from-blue-500 to-purple-600';
    case 'Premium AI': return 'from-purple-500 to-pink-600';
    case 'Multimodal AI': return 'from-red-500 to-pink-500';
    case 'Agentic AI': return 'from-orange-500 to-red-600';
    case 'Specialized Coding AI': return 'from-green-500 to-teal-600';
    case 'Open Source AI': return 'from-blue-600 to-indigo-700';
    case 'IDE Integration': return 'from-gray-700 to-gray-900';
    case 'AI-Native IDE': return 'from-indigo-500 to-blue-600';
    case 'UI Generator': return 'from-black to-gray-800';
    case 'Full-Stack Builder': return 'from-yellow-500 to-orange-600';
    case 'Command Line AI': return 'from-cyan-500 to-blue-500';
    case 'Terminal AI': return 'from-purple-600 to-blue-600';
    default: return 'from-gray-500 to-gray-700';
  }
};

const ToolSelector: React.FC<ToolSelectorProps> = ({ onCompare }) => {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<'models' | 'tools'>('models');

  const aiModels = getAIModels();
  const developmentTools = getDevelopmentTools();

  const toggleTool = (toolId: string) => {
    const newSelected = new Set(selectedTools);
    
    if (newSelected.has(toolId)) {
      newSelected.delete(toolId);
    } else {
      if (newSelected.size < 4) {
        newSelected.add(toolId);
      } else {
        // Replace the first selected tool with the new one
        const firstTool = Array.from(newSelected)[0];
        newSelected.delete(firstTool);
        newSelected.add(toolId);
      }
    }
    
    setSelectedTools(newSelected);
  };

  const handleCompare = () => {
    if (selectedTools.size >= 2) {
      onCompare(Array.from(selectedTools));
    }
  };

  const renderToolGrid = (tools: Record<string, any>) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(tools).map(([toolId, tool]) => {
          const isSelected = selectedTools.has(toolId);
          const gradient = getGradient(tool.category);
          
          return (
            <div
              key={toolId}
              onClick={() => toggleTool(toolId)}
              className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isSelected ? 'scale-105' : ''
              }`}
            >
              <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-r ${gradient} border-transparent text-white shadow-xl` 
                  : 'bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-gray-300 hover:shadow-lg'
              }`}>
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Icon */}
                <div className={`mb-4 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                  {getIcon(tool.category)}
                </div>
                
                {/* Content */}
                <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {tool.name}
                </h3>
                <p className={`text-sm mb-2 ${isSelected ? 'text-white/80' : 'text-purple-600'} font-medium`}>
                  {tool.category}
                </p>
                <p className={`text-sm mb-3 ${isSelected ? 'text-white/70' : 'text-gray-600'}`}>
                  {tool.description}
                </p>
                
                {/* Additional Info for AI Models */}
                {tool.type === 'AI Model' && (
                  <div className={`text-xs space-y-1 ${isSelected ? 'text-white/60' : 'text-gray-500'}`}>
                    {tool.benchmark && <div>🏆 {tool.benchmark}</div>}
                    {tool.contextWindow && <div>📄 {tool.contextWindow}</div>}
                    {tool.pricing && <div>💰 {tool.pricing}</div>}
                  </div>
                )}
                
                {/* Additional Info for Development Tools */}
                {tool.type === 'Development Tool' && tool.pricing && (
                  <div className={`text-xs ${isSelected ? 'text-white/60' : 'text-gray-500'}`}>
                    💰 {tool.pricing}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 rounded-3xl"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            AI Development Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Compare AI models and development tools side-by-side. Select your favorites and see how they stack up against each other.
          </p>
          
          {/* Section Toggle */}
          <div className="inline-flex bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveSection('models')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeSection === 'models'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🧠 AI Models ({Object.keys(aiModels).length})
            </button>
            <button
              onClick={() => setActiveSection('tools')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeSection === 'tools'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🛠️ Dev Tools ({Object.keys(developmentTools).length})
            </button>
          </div>
        </div>

        {/* Selection Counter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {Array.from(selectedTools).slice(0, 3).map((toolId, index) => {
                  const tool = toolData[toolId];
                  const gradient = getGradient(tool.category);
                  return (
                    <div key={toolId} className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                      {tool?.name.charAt(0)}
                    </div>
                  );
                })}
                {selectedTools.size > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                    +{selectedTools.size - 3}
                  </div>
                )}
              </div>
              <span className="font-semibold text-gray-700">
                {selectedTools.size} of 4 tools selected
              </span>
            </div>
          </div>
        </div>

        {/* Section Description */}
        <div className="text-center mb-8">
          {activeSection === 'models' ? (
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">🧠 AI Models</h2>
              <p className="text-blue-700">
                Large language models optimized for coding tasks. Compare performance benchmarks, context windows, and specialized capabilities.
              </p>
            </div>
          ) : (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-green-900 mb-2">🛠️ Development Tools</h2>
              <p className="text-green-700">
                IDEs, editors, and platforms that integrate AI capabilities into your development workflow. Compare features and integrations.
              </p>
            </div>
          )}
        </div>

        {/* Tools Grid */}
        <div className="mb-12">
          {activeSection === 'models' ? renderToolGrid(aiModels) : renderToolGrid(developmentTools)}
        </div>

        {/* Compare Button */}
        <div className="text-center">
          <button
            onClick={handleCompare}
            disabled={selectedTools.size < 2}
            className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
              selectedTools.size >= 2
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Compare Selected {selectedTools.size >= 2 ? 'Tools' : 'Items'}</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
              selectedTools.size >= 2 ? 'group-hover:translate-x-1' : ''
            }`} />
          </button>
          {selectedTools.size < 2 && (
            <p className="text-gray-500 text-sm mt-3">
              Select at least 2 items to compare (models and/or tools)
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600">{Object.keys(aiModels).length}</div>
            <div className="text-sm text-gray-600">AI Models</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{Object.keys(developmentTools).length}</div>
            <div className="text-sm text-gray-600">Dev Tools</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">75%</div>
            <div className="text-sm text-gray-600">Max SWE-bench</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-600">2M</div>
            <div className="text-sm text-gray-600">Max Context</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolSelector;