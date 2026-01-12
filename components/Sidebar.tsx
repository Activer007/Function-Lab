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
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-full flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Function Lab
        </h1>
        <p className="text-xs text-gray-500 mt-1">Core Function Interactive V1.0</p>

        {/* 搜索框 */}
        <div className="mt-4 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="text"
            role="searchbox"
            aria-label="搜索函数"
            placeholder="搜索函数..."
            value={searchQuery}
            onChange={handleSearchChange}
            maxLength={MAX_SEARCH_LENGTH}
            className="w-full pl-9 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="清除搜索"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              type="button"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* 搜索结果统计 */}
        {searchQuery && (
          <div className="mt-2 text-xs text-gray-500">
            {noSearchResults ? (
              <span>未找到匹配的函数</span>
            ) : (
              <span>找到 {filteredFunctions.length} 个函数</span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 py-4">
        {CATEGORIES.map((cat) => {
          const catFunctions = categorizedFunctions[cat.id];
          if (catFunctions.length === 0) return null;

          return (
            <div key={cat.id} className="mb-6">
              <div className="px-4 mb-2 flex items-center gap-2 text-gray-400 uppercase text-xs font-bold tracking-wider">
                {cat.icon}
                <span>{cat.id}</span>
                {hasSearchResults && (
                  <span className="ml-auto text-gray-600 font-normal">
                    {catFunctions.length}
                  </span>
                )}
              </div>
              <ul className="space-y-1">
                {catFunctions.map((func) => (
                  <li key={func.id}>
                    <button
                      onClick={() => onSelect(func.id)}
                      className={`w-full text-left px-6 py-2 text-sm flex items-center justify-between transition-colors relative
                        ${activeId === func.id
                          ? 'text-white bg-gray-800/50 border-r-2 border-blue-500'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                        }`}
                    >
                      <span>{func.name}</span>
                      {activeId === func.id && (
                        <ChevronRight size={14} className="text-blue-500" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* 空状态 */}
        {noSearchResults && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-500">没有找到匹配的函数</p>
            <p className="text-xs text-gray-600 mt-1">请尝试其他关键词</p>
          </div>
        )}
      </div>
    </div>
  );
};
