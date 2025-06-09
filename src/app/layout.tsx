import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Development Tools Comparison | LogRocket',
  description: 'Compare the most powerful AI tools for developers. Find the perfect AI assistant, IDE integration, or code generator for your workflow.',
  keywords: 'AI tools, development, comparison, Claude, GPT-4, GitHub Copilot, Cursor IDE, programming, artificial intelligence',
  authors: [{ name: 'LogRocket' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'AI Development Tools Comparison | LogRocket',
    description: 'Compare the most powerful AI tools for developers. Find the perfect AI assistant for your workflow.',
    type: 'website',
    siteName: 'LogRocket',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Tools Comparison | LogRocket',
    description: 'Compare the most powerful AI tools for developers. Find the perfect AI assistant for your workflow.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <span className="text-xl font-bold">LogRocket</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Helping developers choose the best AI tools for their workflow. Compare features, pricing, and capabilities to make informed decisions.
                </p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/logrocket" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </a>
                  <a href="https://github.com/logrocket" className="text-gray-400 hover:text-white transition-colors">
                    GitHub
                  </a>
                  <a href="https://blog.logrocket.com" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-2">
                  <a href="https://logrocket.com" className="block text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                  <a href="https://blog.logrocket.com" className="block text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                  <a href="https://docs.logrocket.com" className="block text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                  <a href="https://logrocket.com/pricing" className="block text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">AI Tools</h4>
                <div className="space-y-2">
                  <span className="block text-gray-400">Claude 4</span>
                  <span className="block text-gray-400">GPT-4.1</span>
                  <span className="block text-gray-400">GitHub Copilot</span>
                  <span className="block text-gray-400">Cursor IDE</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
              <p>&copy; 2025 LogRocket. All rights reserved. | 
                <a href="#" className="hover:text-white ml-2">Privacy Policy</a> | 
                <a href="#" className="hover:text-white ml-2">Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}