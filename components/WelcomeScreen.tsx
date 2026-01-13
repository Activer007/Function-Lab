import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, Database, Brain, Zap } from 'lucide-react';
import showcaseImg from '../assets/function_lab_showcase.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-xl text-white overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={showcaseImg}
          alt="Background"
          className="w-full h-full object-cover opacity-10 scale-105 blur-md"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-60" />
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingIcon icon={Database} x="10%" y="20%" delay={0} color="#10B981" />
        <FloatingIcon icon={Activity} x="80%" y="15%" delay={1} color="#3B82F6" />
        <FloatingIcon icon={Brain} x="15%" y="75%" delay={2} color="#8B5CF6" />
        <FloatingIcon icon={Zap} x="85%" y="80%" delay={3} color="#F59E0B" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center text-center">

        {/* Logo / Badge */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 animate-pulse" />
          <div className="relative bg-gray-800/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium tracking-wide text-blue-100/90">Function Lab v1.0</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60"
        >
          驾驭数据<br />重塑未来
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed font-light"
        >
          通过直观的物理动画，深入探索 Pandas 与 Scikit-learn 的核心奥秘。
          <br />
          在沉浸式的可视化体验中，掌握数据处理的精髓。
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <button
            onClick={onStart}
            className="group relative px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">开启探索之旅</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};

// Helper component for floating background icons
const FloatingIcon = ({ icon: Icon, x, y, delay, color }: { icon: any, x: string, y: string, delay: number, color: string }) => (
  <motion.div
    className="absolute opacity-20"
    style={{ left: x, top: y, color }}
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: [0, -20, 0],
      opacity: [0, 0.2, 0]
    }}
    transition={{
      duration: 5,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon size={48} />
  </motion.div>
);
