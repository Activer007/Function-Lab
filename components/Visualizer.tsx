import React from 'react';
import { FunctionDef } from '../types';
import { CleaningDemo } from './demos/CleaningDemo';
import { SlicingDemo } from './demos/SlicingDemo';
import { EngineeringDemo } from './demos/EngineeringDemo';
import { LogicDemo } from './demos/LogicDemo';
import { TrainingDemo } from './demos/TrainingDemo';

interface VisualizerProps {
  func: FunctionDef;
}

export const Visualizer: React.FC<VisualizerProps> = ({ func }) => {
  return (
    <div className="flex-1 relative overflow-hidden flex flex-col">
      {/* Canvas Header */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 opacity-90 tracking-tight">{func.name}</h2>
        <p className="text-blue-400/80 text-sm font-medium tracking-wide mt-1">{func.description}</p>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          {/* Background Grid/Decorations */}
          <div className="w-[800px] h-[800px] border border-white rounded-full"></div>
          <div className="w-[600px] h-[600px] border border-white rounded-full absolute"></div>
          <div className="w-[400px] h-[400px] border border-white rounded-full absolute"></div>
        </div>

        {/* Dynamic Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
          {func.category === 'Cleaning' && <CleaningDemo functionId={func.id} />}
          {func.category === 'Slicing' && <SlicingDemo functionId={func.id} />}
          {func.category === 'Engineering' && <EngineeringDemo functionId={func.id} />}
          {func.category === 'Logic' && <LogicDemo functionId={func.id} />}
          {func.category === 'Training' && <TrainingDemo functionId={func.id} />}
        </div>
      </div>
    </div>
  );
};
