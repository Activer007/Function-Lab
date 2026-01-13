import React from 'react';
import { FunctionDef } from '../types';
import { Terminal, BookOpen } from 'lucide-react';

interface InfoPanelProps {
  func: FunctionDef;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ func }) => {
  return (
    <div className="h-auto md:h-48 bg-[#0B0F19]/90 border-t border-white/5 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 shrink-0 backdrop-blur-lg z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-2 text-blue-400 font-bold uppercase text-[10px] tracking-widest opacity-90">
          <BookOpen size={12} strokeWidth={2.5} />
          <span>Function Logic</span>
        </div>
        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 h-full overflow-y-auto custom-scrollbar hover:bg-white/[0.05] transition-colors">
          <p className="text-gray-300 text-sm leading-relaxed font-light tracking-wide">
            {func.businessLogic}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[10px] tracking-widest opacity-90">
          <Terminal size={12} strokeWidth={2.5} />
          <span>Code Prototype</span>
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 h-full overflow-y-auto custom-scrollbar font-mono text-sm text-emerald-400/90 shadow-inner group transition-all hover:border-white/10">
          <code className="block whitespace-pre opacity-90 group-hover:opacity-100 transition-opacity">{func.codePrototype}</code>
        </div>
      </div>
    </div>
  );
};