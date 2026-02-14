import { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Play,
  User,
  BarChart3,
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import type { Entity } from '../types';

interface LearningStep {
  order: number;
  title: string;
  description: string;
  entity_ids?: string[];
  diagram_ids?: string[];
  action?: string;
  duration: string;
}

interface LearningPathViewerProps {
  entity: Entity;
  onEntityClick: (entityId: string) => void;
  onDiagramClick?: (diagramId: string) => void;
}

// Get progress from localStorage
function getProgress(pathId: string): number[] {
  try {
    const saved = localStorage.getItem(`learning-path-progress-${pathId}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save progress to localStorage
function saveProgress(pathId: string, completedSteps: number[]) {
  localStorage.setItem(`learning-path-progress-${pathId}`, JSON.stringify(completedSteps));
}

export default function LearningPathViewer({ 
  entity, 
  onEntityClick,
  onDiagramClick 
}: LearningPathViewerProps) {
  const metadata = entity.metadata;
  const steps: LearningStep[] = metadata.steps || [];
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Load progress on mount
  useEffect(() => {
    const saved = getProgress(entity.id);
    setCompletedSteps(saved);
    // Set active step to first incomplete step
    const firstIncomplete = steps.find(s => !saved.includes(s.order));
    if (firstIncomplete) {
      setActiveStep(firstIncomplete.order);
    }
  }, [entity.id, steps]);

  const toggleStepCompletion = (stepOrder: number) => {
    const newCompleted = completedSteps.includes(stepOrder)
      ? completedSteps.filter(s => s !== stepOrder)
      : [...completedSteps, stepOrder];
    setCompletedSteps(newCompleted);
    saveProgress(entity.id, newCompleted);
  };

  const progressPercent = steps.length > 0 
    ? Math.round((completedSteps.length / steps.length) * 100) 
    : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIconForRole = (role: string) => {
    const icons: Record<string, string> = {
      'Software Developer': '💻',
      'Technology Architect': '🏛️',
      'Data Architect': '🗄️',
      'Product Owner': '📋',
      'QA Engineer': '🧪',
      'New Joiner': '👋',
    };
    return icons[role] || '📚';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200 text-3xl">
            {metadata.icon || getIconForRole(metadata.target_role)}
          </div>
          
          {/* Title & Meta */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{entity.name}</h1>
            <p className="text-gray-600 mt-1">{entity.description}</p>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{metadata.target_role}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{metadata.estimated_time}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(metadata.difficulty)}`}>
                {metadata.difficulty}
              </span>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="text-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - progressPercent / 100)}`}
                  className="text-emerald-500 transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700">{progressPercent}%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completedSteps.length} of {steps.length} steps
            </p>
          </div>
        </div>
      </div>

      {/* Steps Timeline */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-800">Learning Journey</h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.order);
              const isActive = activeStep === step.order;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.order} className="relative">
                  {/* Connection Line */}
                  {!isLast && (
                    <div 
                      className={`absolute left-6 top-14 w-0.5 h-[calc(100%-2rem)] ${
                        isCompleted ? 'bg-emerald-300' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  <div 
                    className={`relative bg-white rounded-xl border-2 transition-all duration-200 ${
                      isActive 
                        ? 'border-emerald-400 shadow-lg shadow-emerald-100' 
                        : isCompleted 
                          ? 'border-emerald-200 bg-emerald-50/50' 
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Step Number / Check */}
                        <button
                          onClick={() => toggleStepCompletion(step.order)}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-emerald-500 text-white'
                              : isActive
                                ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-300'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <span className="text-lg font-semibold">{step.order}</span>
                          )}
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-semibold ${isCompleted ? 'text-emerald-700' : 'text-gray-800'}`}>
                              {step.title}
                            </h3>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>

                          {/* Entity/Diagram Links */}
                          {(step.entity_ids?.length || step.diagram_ids?.length || step.action) && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {step.entity_ids?.map(entityId => (
                                <button
                                  key={entityId}
                                  onClick={() => onEntityClick(entityId)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm hover:bg-indigo-100 transition-colors"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  {entityId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              ))}
                              {step.diagram_ids?.map(diagramId => (
                                <button
                                  key={diagramId}
                                  onClick={() => onDiagramClick?.(diagramId)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100 transition-colors"
                                >
                                  <BarChart3 className="w-3.5 h-3.5" />
                                  {diagramId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              ))}
                              {step.action && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm">
                                  <Play className="w-3.5 h-3.5" />
                                  {step.action}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Expand/Activate */}
                        <button
                          onClick={() => setActiveStep(isActive ? null : step.order)}
                          className={`p-2 rounded-lg transition-colors ${
                            isActive ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Message */}
          {progressPercent === 100 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold">Congratulations!</h3>
              <p className="text-emerald-100 mt-2">
                You've completed the {entity.name}. You're now ready to dive deeper!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
