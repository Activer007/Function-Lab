# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-01-12

### 🎉 首个正式版本发布

### ✨ Added

#### 核心功能
- **26 个 Pandas 和 Scikit-learn 函数的可视化演示**
  - 每个函数都配备独特的物理动画隐喻
  - 实时交互体验，点击即可观察函数执行过程
  - 完整的状态隔离机制，确保函数切换时状态正确重置

#### Tier 1: Cleaning Station (9个函数)
- `pd.read_csv` - 文件图标展开成表格
- `drop_duplicates` - 重复的行发生碎裂并消失
- `fillna` - 发光的补片飞入并填补空洞
- `isnull` - 扫描仪高亮显示空的数据洞
- `dropna` - 带有空洞的行掉落出屏幕
- `to_numeric` - 非数字文本熔化为 NaN
- `astype` - 浮点数固化为整数块
- `np.array` - 散乱的列表结晶为整齐的网格
- `df.columns` - 表头行发光并被提取出来

#### Tier 2: Slicing (3个函数)
- `iloc / loc` - 通过数字索引或标签高亮区域
- `query / filter` - 数据通过条件安检门
- `subset` - 列与列滑动聚合

#### Tier 3: Feature Engineering (6个函数)
- `LabelEncoder` - 文本标签被盖章变成数字
- `MinMaxScaler` - 柱状图缩放至 0-1 范围
- `fit_transform` - 扫描仪测量数据特征并立刻变形
- `fit_resample` - 少数类别的点进行自我克隆
- `softmax` - 原始数值条转化为概率条
- `apply` - 扫描光束逐个变换数据

#### Tier 4: Logic (5个函数)
- `groupby` - 行数据像磁铁一样按类别聚拢
- `sort_values` - 行与行进行物理赛跑排序
- `concat` - 两个表格吸附并拼接在一起
- `argmax / argsort` - 高亮峰值并对索引进行洗牌
- `quantile` - 激光水平线切割排序后的数据

#### Tier 5: Training (3个函数)
- `train_test_split` - 剪刀将数据集剪成两部分
- `confusion_matrix` - 2x2 网格闪烁命中与失误
- `predict` - 新数据进入黑盒模型

#### 技术实现
- **React 19** + **TypeScript 5.0** 构建的用户界面
- **Framer Motion** 实现的流畅 60fps 动画效果
- **Tailwind CSS** 提供的现代化样式系统
- **Vite 6.x** 提供的快速开发构建体验
- **Lucide React** 提供的精美图标库

#### 文档
- 完整的 README.md 项目文档
- 26 个函数的详细说明和动画效果描述
- 快速开始指南和技术栈说明
- 项目结构和设计理念文档

### 🔧 Improved

#### 组件优化
- **SlicingDemo**: 添加 useEffect 状态重置逻辑，确保切换函数时正确重置所有状态
- **EngineeringDemo**: 添加 useEffect 状态重置逻辑
- **TrainingDemo**: 添加 useEffect 状态重置逻辑
- **LogicDemo - argmax/argsort**:
  - 添加动态排序位置计算和平滑动画
  - 添加排序位置指示器 (#1, #2, ...)
  - 改进按钮 hover 效果和过渡动画
  - 添加更详细的函数说明文字

#### 视觉设计
- 统一的五大类别分类体系
- 完善的颜色系统（红/绿/蓝/橙/深色）
- 一致的组件设计模式

### 📦 Project Structure

```
Function-Lab/
├── components/
│   ├── demos/
│   │   ├── CleaningDemo.tsx      # 数据清洗演示 (9个函数)
│   │   ├── SlicingDemo.tsx       # 数据切片演示 (3个函数)
│   │   ├── EngineeringDemo.tsx   # 特征工程演示 (6个函数)
│   │   ├── LogicDemo.tsx         # 逻辑操作演示 (5个函数)
│   │   └── TrainingDemo.tsx      # 模型训练演示 (3个函数)
│   ├── Sidebar.tsx               # 左侧导航栏
│   ├── Visualizer.tsx            # 可视化容器
│   └── InfoPanel.tsx             # 底部信息面板
├── constants.ts                  # 函数定义和配置
├── types.ts                      # TypeScript 类型定义
├── App.tsx                       # 主应用组件
├── index.html                    # HTML 入口
├── README.md                     # 项目文档
└── CHANGELOG.md                  # 变更日志
```

### 🎨 Design Philosophy

每个函数都通过独特的物理动画来演示其工作原理：

- **碎裂** - `drop_duplicates`: 重复数据被粉碎消除
- **熔化** - `to_numeric`: 无效文本转化为 NaN
- **结晶** - `np.array`: 混乱数据变为有序数组
- **磁铁** - `groupby`: 相同类别被吸引聚合
- **赛跑** - `sort_values`: 数据行通过比赛排序
- **扫描** - `isnull`: 逐行检测并标记问题

### 🔗 Technical Stack

- **框架**: React 19.2.3
- **语言**: TypeScript 5.8.2
- **构建工具**: Vite 6.2.0
- **动画库**: Framer Motion 12.24.0
- **图标**: Lucide React 0.562.0

### 📊 Statistics

- **总函数数**: 26 个
- **代码行数**: ~2000+ 行
- **组件数量**: 8 个主要组件
- **动画效果**: 26 种独特的物理动画

### 🚀 Getting Started

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 📝 Documentation

- 项目主页: [GitHub Repository](https://github.com/Activer007/Function-Lab)
- 在线演示: Coming Soon...

### 🙏 Credits

- React Team - for the amazing UI framework
- Framer Motion - for the powerful animation library
- Vite Team - for the lightning-fast build tool

---

## [Unreleased]

### Planned Features
- 搜索功能
- 键盘导航
- 学习进度追踪
- 单元测试覆盖
- CI/CD 配置
- 性能优化（代码分割、懒加载）

---

**Versioning**:
- [1.0.0] - 2025-01-12

**Links**:
- [GitHub Repository](https://github.com/Activer007/Function-Lab)
- [Issue Tracker](https://github.com/Activer007/Function-Lab/issues)
- [Pull Requests](https://github.com/Activer007/Function-Lab/pulls)
