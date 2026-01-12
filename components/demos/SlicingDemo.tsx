import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProps {
  functionId: string;
}

export const SlicingDemo: React.FC<DemoProps> = ({ functionId }) => {
  // --- LOC/ILOC Data ---
  const [hoverTarget, setHoverTarget] = useState<'none' | 'row' | 'col' | 'cell'>('none');
  const [hoverRow, setHoverRow] = useState<number>(-1);
  const [hoverCol, setHoverCol] = useState<number>(-1);

  // 固定数据矩阵 (4行 x 3列)
  const ilocData = [
    [15, 42, 88],
    [73, 29, 56],
    [91, 34, 67],
    [28, 55, 19]
  ];
  const rowLabels = [0, 1, 2, 3];  // loc 行标签
  const colLabels = ['A', 'B', 'C']; // loc 列标签

  // --- Query Data ---
  const [queryTriggered, setQueryTriggered] = useState(false);
  const dataPoints = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    val: Math.floor(Math.random() * 100),
    match: false // set later
  }));
  // Deterministic for demo
  dataPoints[0].val = 10; dataPoints[1].val = 60; dataPoints[2].val = 20; dataPoints[3].val = 80;
  dataPoints[4].val = 90; dataPoints[5].val = 15; dataPoints[6].val = 55; dataPoints[7].val = 5;

  // --- Subset Data ---
  const [subsetSelected, setSubsetSelected] = useState(false);

  // Reset logic when function changes
  useEffect(() => {
    setHoverTarget('none');
    setHoverRow(-1);
    setHoverCol(-1);
    setQueryTriggered(false);
    setSubsetSelected(false);
  }, [functionId]);

  if (functionId === 'loc_iloc') {
    // 生成表达式文本
    const getExpressionText = () => {
      if (hoverTarget === 'none') return '\u00A0';
      if (hoverTarget === 'row') {
        return `df.iloc[${hoverRow}]  →  df.loc[${rowLabels[hoverRow]}]`;
      }
      if (hoverTarget === 'col') {
        return `df.iloc[:, ${hoverCol}]  →  df.loc[:, '${colLabels[hoverCol]}']`;
      }
      if (hoverTarget === 'cell') {
        return `df.iloc[${hoverRow}, ${hoverCol}]  →  df.loc[${rowLabels[hoverRow]}, '${colLabels[hoverCol]}']`;
      }
      return '\u00A0';
    };

    return (
      <div className="flex flex-col items-center h-full pt-20">
        {/* 提示信息 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-gray-400 text-sm flex items-center gap-2"
        >
          <span className="text-blue-400">💡</span>
          <span>鼠标悬停在行索引、列名或单元格上查看表达式</span>
        </motion.div>

        {/* DataFrame 表格 */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg shadow-2xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 表格标题信息栏 */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
            <span className="text-sm text-gray-300">DataFrame</span>
            <span className="text-xs text-gray-600">• 4 rows × 3 columns</span>
          </div>

          {/* 表格 */}
          <div className="grid grid-cols-4 gap-2">
            {/* 左上角空白单元格 */}
            <div className="w-16 h-10"></div>

            {/* 列标题 */}
            {colLabels.map((col, ci) => (
              <motion.div
                key={col}
                className={`h-10 rounded flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                  hoverTarget === 'col' && hoverCol === ci
                    ? 'bg-orange-600/50 border-2 border-orange-400 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]'
                    : 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onMouseEnter={() => { setHoverTarget('col'); setHoverCol(ci); }}
                onMouseLeave={() => { setHoverTarget('none'); setHoverCol(-1); }}
              >
                {col}
              </motion.div>
            ))}

            {/* 数据行 */}
            {ilocData.map((row, ri) => (
              <React.Fragment key={ri}>
                {/* 行索引 */}
                <motion.div
                  className={`h-10 rounded flex items-center justify-center font-mono text-sm cursor-pointer transition-all ${
                    hoverTarget === 'row' && hoverRow === ri
                      ? 'bg-purple-600/50 border-2 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                      : 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  onMouseEnter={() => { setHoverTarget('row'); setHoverRow(ri); }}
                  onMouseLeave={() => { setHoverTarget('none'); setHoverRow(-1); }}
                >
                  {rowLabels[ri]}
                </motion.div>

                {/* 数据单元格 */}
                {row.map((val, ci) => {
                  const isRowHighlight = hoverTarget === 'row' && hoverRow === ri;
                  const isColHighlight = hoverTarget === 'col' && hoverCol === ci;
                  const isCellHighlight = hoverTarget === 'cell' && hoverRow === ri && hoverCol === ci;
                  const isRelated = isRowHighlight || isColHighlight || isCellHighlight;

                  return (
                    <motion.div
                      key={`${ri}-${ci}`}
                      className={`h-10 rounded flex items-center justify-center font-mono text-sm cursor-pointer transition-all ${
                        isCellHighlight
                          ? 'bg-blue-600/80 border-2 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-110'
                          : isRowHighlight
                            ? 'bg-purple-600/30 border-2 border-purple-400/50 text-white'
                            : isColHighlight
                              ? 'bg-orange-600/30 border-2 border-orange-400/50 text-white'
                              : 'bg-gray-700/30 border border-gray-600 text-gray-300 hover:bg-gray-700/50'
                      }`}
                      onMouseEnter={() => { setHoverTarget('cell'); setHoverRow(ri); setHoverCol(ci); }}
                      onMouseLeave={() => { setHoverTarget('none'); setHoverRow(-1); setHoverCol(-1); }}
                      whileHover={{ scale: isCellHighlight ? 1.1 : 1.05 }}
                    >
                      {val}
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* 表达式显示区域 */}
        <motion.div
          className="mt-8 px-6 py-3 bg-gray-900 rounded-lg border border-gray-700 min-w-[500px] text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-xs text-gray-500 mb-1">Pandas Expression</div>
          <div className="font-mono text-base">
            {hoverTarget === 'none' ? (
              <span className="text-gray-600">选择单元格、行或列</span>
            ) : (
              <>
                <span className="text-blue-400">{getExpressionText().split('  →  ')[0]}</span>
                <span className="text-gray-600 mx-3">→</span>
                <span className="text-green-400">{getExpressionText().split('  →  ')[1]}</span>
              </>
            )}
          </div>
        </motion.div>

        {/* 图例说明 */}
        <motion.div
          className="mt-6 flex gap-4 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-600/50 border border-purple-400"></div>
            <span className="text-gray-400">行选择</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-600/50 border border-orange-400"></div>
            <span className="text-gray-400">列选择</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-600/80 border border-blue-400"></div>
            <span className="text-gray-400">单元格选择</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (functionId === 'query') {
    const handleQuery = () => {
      setQueryTriggered(!queryTriggered);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="absolute top-10 left-0 right-0 h-1 bg-red-500/30 z-0"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-900 border border-red-500 rounded text-red-200 text-xs z-10">
          Condition: Val &gt; 50
        </div>

        <button onClick={handleQuery} className="mb-12 px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-all z-20">
          {queryTriggered ? "Reset" : "Run Query"}
        </button>

        <div className="flex gap-4 items-end h-64 border-b border-gray-700 pb-2 overflow-hidden px-10">
           <AnimatePresence>
             {dataPoints.map((point) => {
               const passes = point.val > 50;
               if (queryTriggered && !passes) return null; // Filter out

               return (
                 <motion.div
                   key={point.id}
                   layout
                   initial={{ scale: 1, opacity: 1, y: 0 }}
                   animate={{ 
                     backgroundColor: queryTriggered ? '#10B981' : '#3B82F6',
                     y: 0
                   }}
                   exit={{ 
                     y: 100, 
                     opacity: 0, 
                     scale: 0,
                     backgroundColor: '#EF4444' 
                   }}
                   transition={{ type: "spring", bounce: 0.2 }}
                   className="w-12 rounded-t-lg flex items-end justify-center pb-2 text-xs font-bold text-white shadow-lg"
                   style={{ 
                     height: `${point.val * 2}px`, 
                     backgroundColor: '#3B82F6' 
                   }}
                 >
                   {point.val}
                 </motion.div>
               );
             })}
           </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- SUBSET Visualizer ---
  if (functionId === 'subset') {
    const columns = [
        { id: 'col1', name: 'Name', keep: true },
        { id: 'col2', name: 'Age', keep: true },
        { id: 'col3', name: 'Garbage', keep: false },
        { id: 'col4', name: 'Score', keep: true }
    ];

    return (
      <div className="flex flex-col items-center justify-center h-full">
          <button 
             onClick={() => setSubsetSelected(!subsetSelected)} 
             className="mb-10 px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-all z-20"
          >
             {subsetSelected ? "Show All Columns" : "Select Subset"}
          </button>

          <div className="flex gap-2 p-4 border border-gray-700 rounded-xl bg-gray-900/50">
             <AnimatePresence mode="popLayout">
                 {columns.map((col) => {
                     // If selected mode is on and column is not kept, hide it
                     if (subsetSelected && !col.keep) return null;

                     return (
                         <motion.div
                             layout
                             key={col.id}
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0, width: 0 }}
                             transition={{ type: "spring", damping: 20, stiffness: 100 }}
                             className={`w-24 h-48 rounded-lg flex flex-col items-center border ${subsetSelected ? 'border-green-500 bg-green-900/20' : 'border-gray-600 bg-gray-800'}`}
                         >
                             <div className={`w-full py-2 text-center text-sm font-bold border-b ${subsetSelected ? 'border-green-500 text-green-300' : 'border-gray-600 text-gray-400'}`}>
                                 {col.name}
                             </div>
                             <div className="flex-1 w-full p-2 space-y-2">
                                 <div className="h-2 w-3/4 bg-gray-700/50 rounded"></div>
                                 <div className="h-2 w-1/2 bg-gray-700/50 rounded"></div>
                                 <div className="h-2 w-full bg-gray-700/50 rounded"></div>
                             </div>
                         </motion.div>
                     );
                 })}
             </AnimatePresence>
          </div>
      </div>
    );
  }

  return null;
}