'use client';

import { useState } from 'react';
import { Check, Sparkles, ArrowRight, Zap, Code, Palette, Bot } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: string;
  gradient: string;
}

interface ToolSelectorProps {
  onCompare: (selectedTools: string[]) => void;
}

const tools: Tool[] = [
  {
    id: 'claude-sonnet',
    name: 'Claude 4 Sonnet',
    type: 'AI Assistant',
    description: 'Smart, efficient model for everyday coding tasks',
    icon: 'bot',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'claude-opus',
    name: 'Claude 4 Opus',
    type: 'AI Assistant',
    description: 'Most capable model for complex development',
    icon: 'bot',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'gpt-41',
    name: 'GPT-4.1',
    type: 'AI Assistant',
    description: 'Advanced language model with custom training',
    icon: 'bot',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    type: 'IDE Integration',
    description: 'AI pair programmer for your favorite editor',
    icon: 'code',
    gradient: 'from-gray-700 to-gray-900'
  },
  {
    id: 'cursor',
    name: 'Cursor IDE',
    type: 'AI-Native IDE',
    description: 'The AI-first code editor built for productivity',
    icon: 'code',
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    type: 'AI-Native IDE',
    description: 'Fast AI-powered editing with real-time collaboration',
    icon: 'code',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'vercel-v0',
    name: 'Vercel v0',
    type: 'UI Generator',
    description: 'Generate UI components from text descriptions',
    icon: 'palette',
    gradient: 'from-black to-gray-800'
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    type: 'Full-Stack Builder',
    description: 'Full-stack web apps in seconds with AI',
    icon: 'zap',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'gemini',
    name: 'Gemini 2.5 Pro',
    type: 'AI Assistant',
    description: 'Google\'s multimodal AI with voice and image support',
    icon: 'bot',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: 'jetbrains',
    name: 'JetBrains AI',
    type: 'IDE Integration',
    description: 'AI assistant built into JetBrains IDEs',
    icon: 'code',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'lovable',
    name: 'Lovable AI',
    type: 'Full-Stack Builder',
    description: 'AI-powered full-stack app development from natural language',
    icon: 'heart',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'deepseek',
    name: 'Deepseek Coder',
    type: 'Open Source AI',
    description: 'Privacy-first coding assistant with local deployment',
    icon: 'shield',
    gradient: 'from-blue-600 to-indigo-700'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'bot': return <Bot className="w-6 h-6" />;
    case 'code': return <Code className="w-6 h-6" />;
    case 'palette': return <Palette className="w-6 h-6" />;
    case 'zap': return <Zap className="w-6 h-6" />;
    default: return <Bot className="w-6 h-6" />;
  }
};

const ToolSelector: React.FC<ToolSelectorProps> = ({ onCompare }) => {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compare the most powerful AI tools for developers. Select your favorites and see how they stack up against each other.
          </p>
        </div>

        {/* Selection Counter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {Array.from(selectedTools).slice(0, 3).map((toolId, index) => {
                  const tool = tools.find(t => t.id === toolId);
                  return (
                    <div key={toolId} className={`w-8 h-8 rounded-full bg-gradient-to-r ${tool?.gradient} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {tools.map((tool) => {
            const isSelected = selectedTools.has(tool.id);
            
            return (
              <div
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected ? 'scale-105' : ''
                }`}
              >
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? `bg-gradient-to-r ${tool.gradient} border-transparent text-white shadow-xl` 
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
                    {getIcon(tool.icon)}
                  </div>
                  
                  {/* Content */}
                  <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {tool.name}
                  </h3>
                  <p className={`text-sm mb-3 ${isSelected ? 'text-white/80' : 'text-purple-600'} font-medium`}>
                    {tool.type}
                  </p>
                  <p className={`text-sm ${isSelected ? 'text-white/70' : 'text-gray-600'}`}>
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
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
            <span>Compare Selected Tools</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
              selectedTools.size >= 2 ? 'group-hover:translate-x-1' : ''
            }`} />
          </button>
          {selectedTools.size < 2 && (
            <p className="text-gray-500 text-sm mt-3">
              Select at least 2 tools to compare
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolSelector;