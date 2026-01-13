import React, { useState, useMemo } from 'react';
import { FUNCTIONS } from '../constants';
import { FunctionDef, FunctionCategory } from '../types';
import {
  Beaker,
  Scissors,
  Wrench,
  GitMerge,
  BrainCircuit,
  ChevronRight,
  Search,
  X
} from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const CATEGORIES: { id: FunctionCategory; icon: React.ReactNode }[] = [
  { id: 'Cleaning', icon: <Beaker size={18} /> },
  { id: 'Slicing', icon: <Scissors size={18} /> },
  { id: 'Engineering', icon: <Wrench size={18} /> },
  { id: 'Logic', icon: <GitMerge size={18} /> },
  { id: 'Training', icon: <BrainCircuit size={18} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const MAX_SEARCH_LENGTH = 100; // 限制搜索输入最大长度

  // 过滤函数列表
  const filteredFunctions = useMemo(() => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return FUNCTIONS;
    }

    const query = trimmedQuery.toLowerCase();
    return FUNCTIONS.filter(
      (func) =>
        func.name.toLowerCase().includes(query) ||
        func.id.toLowerCase().includes(query) ||
        func.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // 处理搜索输入变化，限制长度
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_SEARCH_LENGTH) {
      setSearchQuery(value);
    }
  };

  // 按类别组织过滤后的函数
  const categorizedFunctions = useMemo(() => {
    const groups: Record<FunctionCategory, FunctionDef[]> = {
      Cleaning: [],
      Slicing: [],
      Engineering: [],
      Logic: [],
      Training: [],
    };

    filteredFunctions.forEach((func) => {
      groups[func.category].push(func);
    });

    return groups;
  }, [filteredFunctions]);

  const hasSearchResults = searchQuery.trim() && filteredFunctions.length > 0;
  const noSearchResults = searchQuery.trim() && filteredFunctions.length === 0;

  return (
    <div className="w-64 bg-[#0B0F19] border-r border-white/5 h-full flex flex-col relative z-20">
      <div className="p-5 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-tight">
          Function Lab
        </h1>
        <p className="text-[10px] text-gray-500 mt-1.5 font-medium tracking-wide uppercase opacity-70">Core Function Interactive V1.0</p>

        {/* 搜索框 */}
        <div className="mt-5 relative group">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="text"
            role="searchbox"
            aria-label="搜索函数"
            placeholder="Search functions..."
            value={searchQuery}
            onChange={handleSearchChange}
            maxLength={MAX_SEARCH_LENGTH}
            className="w-full pl-9 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="清除搜索"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
              type="button"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* 搜索结果统计 */}
        {searchQuery && (
          <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 px-1">
            {noSearchResults ? (
              <span>No matches found</span>
            ) : (
              <span>{filteredFunctions.length} result{filteredFunctions.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
        {CATEGORIES.map((cat) => {
          const catFunctions = categorizedFunctions[cat.id];
          if (catFunctions.length === 0) return null;

          return (
            <div key={cat.id} className="mb-6">
              <div className="px-5 mb-2 flex items-center gap-2 text-gray-500 uppercase text-[10px] font-bold tracking-widest group-hover:text-gray-300 transition-colors">
                <span className="opacity-70">{cat.icon}</span>
                <span>{cat.id}</span>
                {hasSearchResults && (
                  <span className="ml-auto bg-white/5 px-1.5 py-0.5 rounded text-[9px] text-gray-400">
                    {catFunctions.length}
                  </span>
                )}
              </div>
              <ul className="space-y-0.5 px-3">
                {catFunctions.map((func) => {
                  const isActive = activeId === func.id;
                  return (
                    <li key={func.id}>
                      <button
                        onClick={() => onSelect(func.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm flex items-center justify-between transition-all duration-200 group relative overflow-hidden
                          ${isActive
                            ? 'text-white bg-blue-600/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                          }`}
                      >
                        {/* Active Indicator Bar */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        )}

                        <span className={`truncate relative z-10 transition-transform duration-200 ${isActive ? 'translate-x-1.5 font-medium' : 'group-hover:translate-x-1'}`}>
                          {func.name}
                        </span>

                        {isActive && (
                          <ChevronRight size={14} className="text-blue-500 relative z-10 animate-in fade-in slide-in-from-left-1 duration-300" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* 空状态 */}
        {noSearchResults && (
          <div className="px-4 py-12 text-center opacity-0 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-600">
              <Search size={20} />
            </div>
            <p className="text-sm text-gray-400 font-medium">No functions found</p>
            <p className="text-xs text-gray-600 mt-1">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};
