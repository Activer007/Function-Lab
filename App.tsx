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
    <div className="flex h-screen w-screen overflow-hidden bg-black text-gray-100 font-sans relative">
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onStart={handleStart} />}
      </AnimatePresence>

      {/* Left Sidebar */}
      <Sidebar
        activeId={activeFunctionId}
        onSelect={setActiveFunctionId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full">

        {/* Top: Visualization Canvas */}
        <DemoErrorBoundary>
          <Visualizer func={activeFunc} />
        </DemoErrorBoundary>

        {/* Bottom: Info Panel */}
        <InfoPanel func={activeFunc} />

      </div>

      {/* Portal Return Button */}
      <a
        href={PORTAL_URL}
        className="fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 group flex items-center gap-0 hover:gap-2 overflow-hidden border border-white/20"
        title="返回备考系统门户"
      >
        <Home className="w-6 h-6" />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 text-sm font-bold">
          返回门户
        </span>
      </a>
    </div>
  );
}

export default App;