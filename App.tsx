import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { InfoPanel } from './components/InfoPanel';
import { Visualizer } from './components/Visualizer';
import { DemoErrorBoundary } from './components/ErrorBoundary';
import { FUNCTIONS } from './constants';
import { Home } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';

const PORTAL_URL = "https://ai-trainer-porama-system.vercel.app/";

function App() {
  const [activeFunctionId, setActiveFunctionId] = useState<string>(FUNCTIONS[0].id);
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('hasSeenWelcome');
  });

  const activeFunc = FUNCTIONS.find(f => f.id === activeFunctionId) || FUNCTIONS[0];

  const handleStart = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F19] text-gray-100 font-sans relative selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {showWelcome && <WelcomeScreen onStart={handleStart} />}
      </AnimatePresence>

      {/* Left Sidebar */}
      <Sidebar
        activeId={activeFunctionId}
        onSelect={setActiveFunctionId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10">

        {/* Top: Visualization Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <DemoErrorBoundary>
            <Visualizer func={activeFunc} />
          </DemoErrorBoundary>
        </div>

        {/* Bottom: Info Panel */}
        <InfoPanel func={activeFunc} />

      </div>

      {/* Portal Return Button */}
      <a
        href={PORTAL_URL}
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 group flex items-center gap-0 hover:gap-2 overflow-hidden"
        title="返回备考系统门户"
      >
        <Home className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 text-xs font-bold text-gray-200 group-hover:text-white">
          Return to Portal
        </span>
      </a>
    </div>
  );
}

export default App;