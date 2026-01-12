# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**Function Lab** 是一个交互式教育可视化平台,通过物理动画效果展示 Pandas 和 Scikit-learn 核心函数的工作原理。项目采用 React 19 + TypeScript + Vite 构建,使用 Tailwind CSS 和 Framer Motion 实现现代化的 UI 和动画效果。

## 开发命令

```bash
# 启动开发服务器 (端口 3000)
npm run dev

# 生产环境构建
npm run build

# 预览生产构建
npm run preview
```

## 核心架构

### 依赖加载策略
项目使用 **importmap** 直接从 CDN (esm.sh) 加载依赖,而非传统的 npm 打包。这意味着:
- 依赖在 `index.html` 的 `<script type="importmap">` 中定义
- React、Framer Motion、Lucide 图标等库都从 CDN 加载
- 修改依赖版本需要更新 `index.html` 中的 importmap

### 组件架构

**三层组件结构:**
1. **App.tsx** - 主应用容器,管理 `activeFunctionId` 状态
2. **布局组件** - `Sidebar` (左侧导航)、`Visualizer` (可视化容器)、`InfoPanel` (底部信息面板)
3. **演示组件** - `components/demos/` 下的五个演示组件,按函数类别组织

**演示组件模式:**
- 每个演示组件接收 `functionId: string` prop
- 使用 `useEffect` 监听 `functionId` 变化,切换函数时重置动画状态
- 使用 Framer Motion 的 `AnimatePresence`、`motion` 组件实现动画
- 每个函数都有独特的物理动画隐喻(碎裂、扫描、磁铁聚集等)

### 数据流设计

- **无全局状态管理** - 所有状态使用 React `useState` 本地管理
- **基于函数 ID 的路由** - `activeFunctionId` 控制显示哪个函数演示,而非 URL 路由
- **状态隔离** - 每个演示组件独立管理自己的动画状态,避免跨组件污染

### 函数分类体系 (5 大 Tier)

所有函数定义在 `constants.ts` 的 `FUNCTIONS` 数组中,每个函数包含:
- `id`: 唯一标识符
- `category`: 函数类别
- `description`: 视觉效果描述
- `businessLogic`: 业务逻辑说明(中文)
- `codePrototype`: 代码示例

**Tier 1: Cleaning Station (数据清洗)** - `CleaningDemo.tsx`
- 函数示例: `read_csv`, `drop_duplicates`, `fillna`, `isnull`, `dropna`, `to_numeric`, `astype`, `np.array`, `columns`
- 动画风格: 碎裂、填补、扫描、熔化、结晶

**Tier 2: Slicing (数据切片)** - `SlicingDemo.tsx`
- 函数示例: `iloc/loc`, `query/filter`, `subset`
- 动画风格: 高亮区域、安检门过滤、列聚合

**Tier 3: Feature Engineering (特征工程)** - `EngineeringDemo.tsx`
- 函数示例: `LabelEncoder`, `MinMaxScaler`, `fit_transform`, `fit_resample`, `softmax`, `apply`
- 动画风格: 盖章、缩放、扫描光束、克隆、概率转换

**Tier 4: Logic (逻辑操作)** - `LogicDemo.tsx`
- 函数示例: `groupby`, `sort_values`, `concat`, `argmax/argsort`, `quantile`
- 动画风格: 磁铁聚集、赛跑排序、吸附拼接、峰值高亮、激光切割

**Tier 5: Training (模型训练)** - `TrainingDemo.tsx`
- 函数示例: `train_test_split`, `confusion_matrix`, `predict`
- 动画风格: 剪刀切割、矩阵闪烁、黑盒处理

### 类型定义

核心类型在 `types.ts` 中定义:
- `FunctionDef` - 函数定义接口
- `FunctionCategory` - 函数类别枚举
- `DataRow` - 数据行接口(包含 `status` 字段控制视觉状态)

### 配色方案

在 `constants.ts` 中定义的 `COLORS` 对象用于整个应用:
- `red` (#EF4444) - 错误/缺失/病变
- `green` (#10B981) - 清洁/成功
- `blue` (#3B82F6) - 处理中/逻辑
- `orange` (#F59E0B) - 警告/未知
- `dark` (#1F2937) - 深色背景
- `text` (#F3F4F6) - 文本颜色

## 添加新函数演示

1. 在 `constants.ts` 的 `FUNCTIONS` 数组中添加函数定义
2. 在对应的 `*Demo.tsx` 组件中添加新的渲染分支:
   ```typescript
   if (functionId === 'your_function_id') {
     return <YourFunctionDemo />;
   }
   ```
3. 设计物理动画隐喻,使用 Framer Motion 实现动画逻辑
4. 确保切换函数时状态正确重置(在 `useEffect` 中处理)

## 环境变量

- `GEMINI_API_KEY` - 在 `.env.local` 中配置,通过 Vite 注入为 `process.env.GEMINI_API_KEY`

## 外部集成

- **门户返回按钮**: 固定在右下角,链接至 `https://ai-trainer-porama-system.vercel.app/`
- **AI Studio**: 可在 Google AI Studio 中查看和编辑

## 重要约定

- **开发禁令**: 参考 `PROMPT-TEMPLATE.md` 中的开发规范(NO DEV ON MAIN, SSOT FIRST, ATOMIC COMMIT, CONTEXT COMPRESSION)
- **中文优先**: 所有 `businessLogic` 说明使用中文
- **动画优先**: 每个函数必须有直观的物理动画隐喻
- **状态隔离**: 切换函数时必须完全重置动画状态,避免状态污染
