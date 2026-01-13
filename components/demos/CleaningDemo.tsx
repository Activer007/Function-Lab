import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants';
import { FileSpreadsheet, Trash2, ArrowDown, Grid3X3, List } from 'lucide-react';

// ===== 类型定义 =====
interface DemoProps {
  functionId: string;
}

interface DataRow {
  id: number;
  val: string | number | null;
  status?: string;
  isNull?: boolean;
  display?: string;
  isErr?: boolean;
  filled?: boolean;
}

interface ReadCsvDataRow {
  id: number;
  name: string;
  score: number;
}

// ===== 常量定义 =====
// read_csv 演示数据
export const READ_CSV_MOCK_DATA: ReadCsvDataRow[] = [
  { id: 1, name: 'Alice', score: 95 },
  { id: 2, name: 'Bob', score: 87 },
  { id: 3, name: 'Charlie', score: 92 },
] as const;

// drop_duplicates 初始数据
export const DROP_DUPLICATES_INITIAL_DATA: DataRow[] = [
  { id: 1, val: 'Alice', status: 'normal' },
  { id: 2, val: 'Bob', status: 'normal' },
  { id: 3, val: 'Alice', status: 'normal' },
  { id: 4, val: 'Charlie', status: 'normal' },
];

// fillna/dropna/isnull 初始数据
export const NULL_ROWS_INITIAL_DATA: DataRow[] = [
  { id: 1, val: 100, isNull: false },
  { id: 2, val: null, isNull: true },
  { id: 3, val: 300, isNull: false },
  { id: 4, val: null, isNull: true },
];

// to_numeric 初始数据
export const NUM_DATA_INITIAL: DataRow[] = [
  { id: 1, val: '123', display: '123', isErr: false },
  { id: 2, val: 'abc', display: 'abc', isErr: true },
  { id: 3, val: '456', display: '456', isErr: false },
];

export const CleaningDemo: React.FC<DemoProps> = ({ functionId }) => {
  const [step, setStep] = useState(0);

  // --- Read CSV State ---
  const [csvExpanded, setCsvExpanded] = useState(false);

  // --- Duplicates State ---
  const [dupRows, setDupRows] = useState<DataRow[]>(DROP_DUPLICATES_INITIAL_DATA);

  // --- Null State ---
  const [nullRows, setNullRows] = useState<DataRow[]>(NULL_ROWS_INITIAL_DATA);

  // --- Numeric State ---
  const [numData, setNumData] = useState<DataRow[]>(NUM_DATA_INITIAL);

  // --- Astype State ---
  const [astypeConverted, setAstypeConverted] = useState(false);

  // --- np.array State ---
  const [isArray, setIsArray] = useState(false);

  // --- columns State ---
  const [showColumns, setShowColumns] = useState(false);

  // --- isnull State ---
  const [isnullShowDetection, setIsnullShowDetection] = useState(false);

  // Reset logic when function changes
  useEffect(() => {
    setStep(0);
    setCsvExpanded(false);
    setDupRows(DROP_DUPLICATES_INITIAL_DATA);
    setNullRows(NULL_ROWS_INITIAL_DATA);
    setNumData(NUM_DATA_INITIAL);
    setAstypeConverted(false);
    setIsArray(false);
    setShowColumns(false);
    setIsnullShowDetection(false);
  }, [functionId]);


  // --- READ_CSV Visualizer ---
  if (functionId === 'read_csv') {
    return (
      <div className="flex flex-col items-center h-full pt-20">
        {/* 独立的重置按钮 */}
        {csvExpanded && (
          <button
            onClick={() => setCsvExpanded(false)}
            className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm font-semibold transition-colors"
          >
            重置 read_csv()
          </button>
        )}

        {!csvExpanded ? (
          <motion.div
            className="flex flex-col items-center gap-4 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCsvExpanded(true)}
          >
            <FileSpreadsheet size={64} className="text-green-500" />
            <p className="text-gray-400 animate-pulse">Click to read_csv()</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FileSpreadsheet size={12} />
              <span>data.csv</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-2xl border border-gray-700 w-96"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* 文件信息栏 */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
              <FileSpreadsheet size={14} className="text-green-500" />
              <span className="text-sm text-gray-300">data.csv</span>
              <span className="text-xs text-gray-600">• 3 rows × 3 columns</span>
            </div>

            {/* 数据表格 */}
            <div className="grid grid-cols-3 gap-2">
              {/* Header */}
              {['ID', 'Name', 'Score'].map((h) => (
                <div
                  key={h}
                  className="text-xs font-bold text-gray-400 uppercase pb-2 border-b border-gray-600 text-center"
                >
                  {h}
                </div>
              ))}

              {/* Data */}
              {READ_CSV_MOCK_DATA.flatMap((row, idx) => [
                <motion.div
                  key={`${row.id}-id`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-8 bg-gray-700/50 rounded flex items-center justify-center text-sm text-gray-300 font-mono"
                >
                  {row.id}
                </motion.div>,
                <motion.div
                  key={`${row.id}-name`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.05 }}
                  className="h-8 bg-gray-700/50 rounded flex items-center justify-center text-sm text-gray-300"
                >
                  {row.name}
                </motion.div>,
                <motion.div
                  key={`${row.id}-score`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.1 }}
                  className="h-8 bg-gray-700/50 rounded flex items-center justify-center text-sm text-gray-300 font-mono"
                >
                  {row.score}
                </motion.div>,
              ])}
            </div>

            {/* 加载状态提示 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="mt-3 pt-2 border-t border-gray-700 text-xs text-green-500 text-center"
            >
              ✓ Successfully loaded 3 rows
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }

  // --- DROP_DUPLICATES Visualizer ---
  if (functionId === 'drop_duplicates') {
    const trigger = () => {
      setDupRows(prev => prev.filter((r, i) => !(r.id === 3))); // Remove the specific duplicate (ID 3 is the dup of ID 1)
    };

    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button onClick={trigger} className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm font-semibold transition-colors">
          Execute drop_duplicates()
        </button>
        <div className="w-80 space-y-2">
          <AnimatePresence>
            {dupRows.map((row) => (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: row.id === 3 ? COLORS.orange : COLORS.dark,
                  borderColor: row.id === 3 ? COLORS.orange : '#374151'
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  rotate: 10,
                  filter: 'blur(10px)' // "Shatter" effect
                }}
                className={`p-4 border rounded-lg flex justify-between items-center shadow-md relative overflow-hidden`}
              >
                <span className="font-mono text-gray-400">{row.id}</span>
                <span className="font-bold text-white">{row.val}</span>
                {row.id === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-red-500/20"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- ISNULL Visualizer ---
  if (functionId === 'isnull') {
    const nullCount = nullRows.filter(r => r.isNull).length;

    return (
      <div className="flex flex-col items-center h-full pt-20">
        {/* 执行/重置按钮 */}
        <button
          onClick={() => setIsnullShowDetection(!isnullShowDetection)}
          className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm font-semibold transition-colors"
        >
          {isnullShowDetection ? "重置 isnull()" : "Execute isnull()"}
        </button>

        {/* 数据表格 */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg shadow-2xl border border-gray-700 w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 表格标题信息栏 */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
            <Grid3X3 size={14} className="text-blue-500" />
            <span className="text-sm text-gray-300">DataFrame</span>
            <span className="text-xs text-gray-600">• 4 rows × 1 column</span>
            {isnullShowDetection && nullCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto text-xs text-red-400 font-semibold"
              >
                ⚠ {nullCount} null values found
              </motion.span>
            )}
          </div>

          {/* 表头 */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-xs font-bold text-gray-400 uppercase pb-2 border-b border-gray-600 text-center w-16">
              Index
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase pb-2 border-b border-gray-600 text-center w-24">
              Value
            </div>
          </div>

          {/* 数据行 */}
          <div className="space-y-2">
            <AnimatePresence>
              {nullRows.map((row, idx) => (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {/* Index 列 */}
                  <div className="h-10 bg-gray-700/50 rounded flex items-center justify-center text-sm text-gray-400 font-mono w-16">
                    {row.id}
                  </div>

                  {/* Value 列 - 使用 flex 布局，标签和数值水平排列 */}
                  <div className="h-10 bg-gray-700/50 rounded flex items-center justify-center px-2 w-24">
                    {row.isNull ? (
                      <>
                        {/* isnull 检测结果标签 - 显示在左侧 */}
                        {isnullShowDetection && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="mr-2"
                          >
                            <div className="bg-red-900/90 text-red-300 text-[10px] px-1.5 py-0.5 rounded font-bold border border-red-700 whitespace-nowrap">
                              TRUE
                            </div>
                          </motion.div>
                        )}
                        {/* 黑洞效果 */}
                        <motion.div
                          className="w-5 h-5 rounded-full bg-black shadow-[0_0_8px_#EF4444]"
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      </>
                    ) : (
                      <>
                        {/* isnull 检测结果标签 - 显示在左侧 */}
                        {isnullShowDetection && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="mr-2"
                          >
                            <div className="bg-green-900/90 text-green-300 text-[10px] px-1.5 py-0.5 rounded font-bold border border-green-700 whitespace-nowrap">
                              FALSE
                            </div>
                          </motion.div>
                        )}
                        {/* 正常值 */}
                        <motion.div
                          layoutId={`val-${row.id}`}
                          className="text-white font-mono text-sm flex-1 text-center"
                        >
                          {row.val}
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 结果反馈消息 */}
          <AnimatePresence>
            {isnullShowDetection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-3 pt-2 border-t border-gray-700 text-xs text-center"
              >
                {nullCount > 0 ? (
                  <span className="text-red-400">
                    ✓ Detection complete: {nullCount} null value(s) detected
                  </span>
                ) : (
                  <span className="text-green-400">
                    ✓ No null values found
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // --- FILLNA Visualizer ---
  if (functionId === 'fillna') {
    const handleFill = () => {
      setNullRows(prev => prev.map(r => r.isNull ? { ...r, isNull: false, val: 0, filled: true } : r));
    };

    const hasNulls = nullRows.some(r => r.isNull);
    const filledCount = nullRows.filter(r => 'filled' in r).length;

    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button
          onClick={handleFill}
          disabled={!hasNulls}
          className={`mb-8 px-4 py-2 text-sm font-semibold rounded transition-colors ${hasNulls
            ? 'bg-blue-600 hover:bg-blue-500'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
        >
          Execute fillna(0)
        </button>

        <div className="w-80 space-y-3">
          <AnimatePresence>
            {nullRows.map((row) => (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className={`h-12 border ${row.isNull ? 'border-red-500/50' : 'border-gray-700'} bg-gray-800 rounded-lg flex items-center px-4 relative`}
              >
                <div className="w-8 text-gray-500 text-xs">#{row.id}</div>

                {row.isNull ? (
                  // The "Black Hole"
                  <div className="flex-1 flex justify-center relative">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-black shadow-[0_0_10px_#EF4444]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                ) : (
                  <motion.div
                    layoutId={`val-${row.id}`}
                    className={`flex-1 text-center font-mono ${'filled' in row ? 'text-green-400' : 'text-white'}`}
                  >
                    {row.val}
                  </motion.div>
                )}

                {/* Particle effect for fillna patch flying in */}
                {'filled' in row && row.val === 0 && (
                  <motion.div
                    initial={{ x: 200, y: -200, scale: 2, opacity: 0 }}
                    animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="bg-green-900/80 text-green-300 text-xs px-2 rounded">PATCH: 0</div>
                  </motion.div>
                )}

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 结果反馈 */}
        {filledCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xs text-green-400"
          >
            ✓ Filled {filledCount} null value(s) with 0
          </motion.div>
        )}
      </div>
    );
  }

  // --- DROPNA Visualizer ---
  if (functionId === 'dropna') {
    const handleDrop = () => {
      setNullRows(prev => prev.filter(r => !r.isNull));
    };

    const initialCount = 4;
    const currentCount = nullRows.length;
    const droppedCount = initialCount - currentCount;

    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button
          onClick={handleDrop}
          disabled={droppedCount > 0}
          className={`mb-8 px-4 py-2 text-sm font-semibold rounded transition-colors ${droppedCount === 0
            ? 'bg-blue-600 hover:bg-blue-500'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
        >
          Execute dropna()
        </button>

        <div className="w-80 space-y-3">
          <AnimatePresence>
            {nullRows.map((row) => (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  y: 300,
                  opacity: 0,
                  rotate: -20,
                  transition: { duration: 0.8, ease: "anticipate" }
                }}
                className={`h-12 border ${row.isNull ? 'border-red-500/50' : 'border-gray-700'} bg-gray-800 rounded-lg flex items-center px-4 relative`}
              >
                <div className="w-8 text-gray-500 text-xs">#{row.id}</div>

                {row.isNull ? (
                  // The "Black Hole"
                  <div className="flex-1 flex justify-center relative">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-black shadow-[0_0_10px_#EF4444]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                ) : (
                  <motion.div
                    layoutId={`val-${row.id}`}
                    className="flex-1 text-center font-mono text-white"
                  >
                    {row.val}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 结果反馈 */}
        {droppedCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xs text-red-400"
          >
            ✓ Dropped {droppedCount} row(s) with null values
          </motion.div>
        )}
      </div>
    );
  }

  // --- TO_NUMERIC Visualizer ---
  if (functionId === 'to_numeric') {
    const handleConvert = () => {
      setNumData(prev => prev.map(r => r.isErr ? { ...r, display: "NaN" } : r));
    };

    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button onClick={handleConvert} className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm font-semibold transition-colors">
          Execute to_numeric(coerce)
        </button>
        <div className="w-64 space-y-4">
          {numData.map((row) => (
            <div key={row.id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">{row.id}</div>
              <motion.div
                className={`flex-1 h-12 rounded border flex items-center justify-center font-mono text-lg
                    ${row.display === 'NaN' ? 'bg-gray-900 text-gray-600 border-gray-800' : 'bg-gray-800 text-white border-gray-600'}
                  `}
                animate={row.display === 'NaN' ? {
                  backgroundColor: "#111827",
                  color: "#4B5563",
                  borderColor: "#1F2937",
                  scale: 0.95
                } : {}}
              >
                {row.display === 'NaN' ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>NaN</motion.span>
                ) : (
                  row.val
                )}
              </motion.div>
              {row.isErr && row.display !== 'NaN' && <div className="text-red-500 text-xs animate-bounce">Err</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- ASTYPE Visualizer ---
  if (functionId === 'astype') {
    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button
          onClick={() => setAstypeConverted(!astypeConverted)}
          className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm font-semibold transition-colors"
        >
          {astypeConverted ? "Reset" : "Execute astype(int)"}
        </button>
        <div className="flex gap-6">
          {[12.99, 45.50, 7.01].map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-24 h-24 rounded-lg flex items-center justify-center text-2xl font-mono relative overflow-hidden transition-colors duration-500 border ${astypeConverted ? 'bg-indigo-900 border-indigo-500' : 'bg-gray-800 border-gray-600'}`}>
                <motion.div className="flex items-baseline">
                  <span className="text-white font-bold">{Math.floor(val)}</span>
                  <motion.span
                    className="text-gray-500 text-lg"
                    animate={{
                      opacity: astypeConverted ? 0 : 1,
                      y: astypeConverted ? 20 : 0,
                      display: astypeConverted ? "none" : "block"
                    }}
                  >
                    {(val % 1).toFixed(2).substring(1)}
                  </motion.span>
                </motion.div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {astypeConverted ? 'int64' : 'float64'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- NP.ARRAY Visualizer ---
  if (functionId === 'np_array') {
    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button
          onClick={() => setIsArray(!isArray)}
          className="mb-8 px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-sm font-semibold transition-colors"
        >
          {isArray ? "Convert to List" : "np.array(list)"}
        </button>

        <div className="relative h-32 w-80 flex items-center justify-center">
          <AnimatePresence mode='wait'>
            {!isArray ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col gap-2 p-4 border border-gray-600 rounded-xl bg-gray-900"
              >
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><List size={12} /> Python List</div>
                {[1, 2, 3].map(n => (
                  <div key={n} className="px-4 py-1 bg-gray-800 rounded border border-gray-700 text-center text-gray-300">
                    {n}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="array"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="flex items-center p-0 border-2 border-green-500 rounded bg-gray-900 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <div className="absolute -top-6 left-0 text-xs text-green-500 font-bold flex items-center gap-1"><Grid3X3 size={12} /> NumPy Array</div>
                {[1, 2, 3].map((n, i) => (
                  <div key={n} className={`w-16 h-16 flex items-center justify-center text-xl font-bold text-white bg-gray-800 ${i < 2 ? 'border-r border-gray-700' : ''}`}>
                    {n}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- COLUMNS Visualizer ---
  if (functionId === 'columns') {
    return (
      <div className="flex flex-col items-center h-full pt-20">
        <button
          onClick={() => setShowColumns(!showColumns)}
          className="mb-8 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 text-sm font-semibold transition-colors"
        >
          {showColumns ? "Reset" : "Extract df.columns"}
        </button>

        <div className="relative">
          {/* DataFrame Representation */}
          <div className={`border border-gray-600 rounded-lg bg-gray-900 p-4 transition-all duration-500 ${showColumns ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
            <div className="flex gap-2 mb-2 border-b border-gray-700 pb-2">
              {['Name', 'Age', 'City'].map(c => (
                <div key={c} className="w-20 h-8 bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-300 border border-gray-700 rounded">
                  {c}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-6 w-full bg-gray-800/50 rounded"></div>
              <div className="h-6 w-full bg-gray-800/50 rounded"></div>
              <div className="h-6 w-full bg-gray-800/50 rounded"></div>
            </div>
          </div>

          {/* Floating Columns Index */}
          <AnimatePresence>
            {showColumns && (
              <motion.div
                initial={{ y: 10, scale: 0.9, opacity: 0 }}
                animate={{ y: 0, scale: 1.1, opacity: 1 }}
                exit={{ y: 10, scale: 0.9, opacity: 0 }}
                className="absolute -top-1 left-0 right-0 mt-2 z-10"
              >
                <div className="flex gap-2 p-3 bg-blue-900/90 backdrop-blur border border-blue-500 rounded-lg shadow-xl justify-center">
                  {['Name', 'Age', 'City'].map(c => (
                    <div key={c} className="px-3 py-1 bg-blue-800 text-blue-100 text-sm font-mono rounded border border-blue-600">
                      '{c}'
                    </div>
                  ))}
                </div>
                <div className="text-center text-blue-400 text-xs font-mono mt-2">Index(['Name', 'Age', 'City'], dtype='object')</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return null;
};