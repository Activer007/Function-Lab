import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { InfoPanel } from './components/InfoPanel';
import { Visualizer } from './components/Visualizer';
import { DemoErrorBoundary } from './components/ErrorBoundary';
import { FUNCTIONS } from './constants';
import { Home, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';

const PORTAL_URL = "https://ai-trainer-porama-system.vercel.app/";

function App() {
  const [activeFunctionId, setActiveFunctionId] = useState<string>(FUNCTIONS[0].id);
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem('hasSeenWelcome');
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeFunc = FUNCTIONS.find(f => f.id === activeFunctionId) || FUNCTIONS[0];

  const handleStart = () => {
    sessionStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  const handleFunctionSelect = (id: string) => {
    setActiveFunctionId(id);
    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#0B0F19] text-gray-100 font-sans relative selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {showWelcome && <WelcomeScreen onStart={handleStart} />}
      </AnimatePresence>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Function Lab
          </span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 z-50 md:hidden shadow-2xl"
            >
              <Sidebar
                activeId={activeFunctionId}
                onSelect={handleFunctionSelect}
              />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white md:hidden"
              >
                <X size={20} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Static) */}
      <div className="hidden md:flex h-full z-20">
        <Sidebar
          activeId={activeFunctionId}
          onSelect={setActiveFunctionId}
        />
      </div>

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
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 p-2 md:p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 group flex items-center gap-0 hover:gap-2 overflow-hidden"
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