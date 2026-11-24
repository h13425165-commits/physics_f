/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Award, 
  Sliders, 
  ArrowRight, 
  ArrowLeft,
  BookMarked,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Flame,
  Zap,
  Info,
  Check,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { MAJOR_UNITS_DATA, ALL_CONCEPTS } from '../../data/conceptUnitsData';
import { ConceptItem, UserConceptProgress } from '../../types/concepts';
import { NavigationTab, SimulationParams } from '../../types';
import { MathFormula } from '../common/MathFormula';
import { ConceptVisualizer } from '../concepts/ConceptVisualizers';
import { GlossaryModal } from '../concepts/GlossaryModal';
import { WrongAnswerNotebook } from '../concepts/WrongAnswerNotebook';

interface Page1ConceptsProps {
  onNavigate: (tab: NavigationTab) => void;
  onApplySimulatorPreset?: (params: Partial<SimulationParams>, targetTab: NavigationTab) => void;
}

const STORAGE_KEY = 'thermolab_concept_progress';

export const Page1Concepts: React.FC<Page1ConceptsProps> = ({
  onNavigate,
  onApplySimulatorPreset,
}) => {
  // User progress state loaded from LocalStorage
  const [progress, setProgress] = useState<UserConceptProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      completedConceptIds: [],
      quizAnswers: {},
      quizScores: {},
      wrongQuizIds: [],
      lastVisitedConceptId: 'c-01-01',
      viewMode: 'essential',
    };
  });

  // Save progress helper
  const saveProgress = (newProg: UserConceptProgress) => {
    setProgress(newProg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProg));
  };

  // Active Concept
  const [activeConceptId, setActiveConceptId] = useState<string>(progress.lastVisitedConceptId || 'c-01-01');

  // Search and Filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Accordion open chapters
  const [openChapterIds, setOpenChapterIds] = useState<Record<string, boolean>>({
    'ch-01': true,
    'ch-02': true,
    'ch-03': false,
    'ch-04': false,
    'ch-05': false,
    'ch-06': true, // Keep EE open
  });

  // In-depth details expanded toggle per concept
  const [showInDepthDetails, setShowInDepthDetails] = useState<boolean>(false);

  // Modals
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);

  // Active Concept Object
  const currentConcept: ConceptItem = useMemo(() => {
    return ALL_CONCEPTS.find(c => c.id === activeConceptId) || ALL_CONCEPTS[0];
  }, [activeConceptId]);

  // Update last visited
  const handleSelectConcept = (id: string) => {
    setActiveConceptId(id);
    saveProgress({
      ...progress,
      lastVisitedConceptId: id,
    });
    // Auto open chapter of this concept
    const parentCh = MAJOR_UNITS_DATA.flatMap(u => u.chapters).find(ch => ch.concepts.some(c => c.id === id));
    if (parentCh) {
      setOpenChapterIds(prev => ({ ...prev, [parentCh.id]: true }));
    }
    // Scroll top of lesson
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mark Concept Completed
  const handleToggleCompleted = (conceptId: string) => {
    const isCompleted = progress.completedConceptIds.includes(conceptId);
    const updatedIds = isCompleted
      ? progress.completedConceptIds.filter(id => id !== conceptId)
      : [...progress.completedConceptIds, conceptId];

    saveProgress({
      ...progress,
      completedConceptIds: updatedIds,
    });
  };

  // Handle Quiz selection & scoring
  const handleQuizAnswer = (quizId: string, optionIdx: number, correctAnswer: number) => {
    const isCorrect = optionIdx === correctAnswer;
    const updatedScores = { ...progress.quizScores, [quizId]: isCorrect };
    const updatedAnswers = { ...progress.quizAnswers, [quizId]: optionIdx };
    let updatedWrong = [...progress.wrongQuizIds];

    if (!isCorrect && !updatedWrong.includes(quizId)) {
      updatedWrong.push(quizId);
    } else if (isCorrect && updatedWrong.includes(quizId)) {
      updatedWrong = updatedWrong.filter(id => id !== quizId);
    }

    saveProgress({
      ...progress,
      quizAnswers: updatedAnswers,
      quizScores: updatedScores,
      wrongQuizIds: updatedWrong,
    });
  };

  const handleCorrectWrongQuiz = (quizId: string) => {
    const updatedWrong = progress.wrongQuizIds.filter(id => id !== quizId);
    const updatedScores = { ...progress.quizScores, [quizId]: true };
    saveProgress({
      ...progress,
      wrongQuizIds: updatedWrong,
      quizScores: updatedScores,
    });
  };

  // Search filtered concepts
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return ALL_CONCEPTS.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.chapterTitle.toLowerCase().includes(q) ||
      c.coreExplanation.some(text => text.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Total Progress Stats
  const totalConceptsCount = ALL_CONCEPTS.length;
  const completedCount = progress.completedConceptIds.length;
  const progressPercent = Math.round((completedCount / totalConceptsCount) * 100);

  // Navigate to simulator with pre-configured conditions
  const handleLaunchSimulatorPreset = () => {
    if (!currentConcept.simulatorPreset) {
      onNavigate('simulator');
      return;
    }
    const { params, targetTab } = currentConcept.simulatorPreset;
    if (onApplySimulatorPreset) {
      onApplySimulatorPreset(params, targetTab);
    }
    onNavigate(targetTab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <WrongAnswerNotebook
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        wrongQuizIds={progress.wrongQuizIds}
        onCorrectWrongQuiz={handleCorrectWrongQuiz}
        onNavigateToConcept={handleSelectConcept}
      />

      {/* Hero Banner & Global Learning Controls */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <span>고등학교 물리학 「Ⅱ. 열과 에너지」 인터랙티브 개념 학습관</span>
              <span>·</span>
              <span>전기전자공학 열관리 공학 연계</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-balance">
              체계적 물리 개념 학습 시스템
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              교과서 기초 개념부터 수식 계산, 실시간 인터랙티브 시뮬레이션, 실전 공학 사례, 그리고 3단계 확인 퀴즈까지 
              <strong> 7단계 완전 학습 시스템</strong>을 통해 열역학의 원리를 직접 체험하고 마스터하세요.
            </p>
          </div>

          {/* Quick Learning Stats & Action Deck */}
          <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-700/80 flex flex-col gap-3 min-w-[280px]">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-300">전체 학습 진도율</span>
                <span className="font-mono font-bold text-sky-400">{progressPercent}% ({completedCount}/{totalConceptsCount})</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-700">
              <button
                onClick={() => setIsGlossaryOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <BookMarked className="w-3.5 h-3.5 text-sky-400" />
                <span>핵심 용어 사전</span>
              </button>

              <button
                onClick={() => setIsNotebookOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors relative"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>오답 노트</span>
                {progress.wrongQuizIds.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {progress.wrongQuizIds.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Curriculum Tree Navigation & Search (3.5 Cols) */}
        <aside className="lg:col-span-4 space-y-4">
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="개념, 공식, 키워드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 placeholder-slate-400"
              />
            </div>
            {searchQuery && (
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>검색 결과: {searchResults?.length || 0}건</span>
                <button onClick={() => setSearchQuery('')} className="text-sky-600 hover:underline">
                  검색 초기화
                </button>
              </div>
            )}
          </div>

          {/* Search Results List OR Chapter Accordion */}
          {searchResults ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">일치하는 개념이 없습니다.</div>
              ) : (
                searchResults.map(concept => {
                  const isCurrent = concept.id === activeConceptId;
                  const isDone = progress.completedConceptIds.includes(concept.id);
                  return (
                    <button
                      key={concept.id}
                      onClick={() => {
                        handleSelectConcept(concept.id);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        isCurrent
                          ? 'bg-sky-50 text-sky-950 font-bold border border-sky-200'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <span className="text-[10px] text-slate-400 block">{concept.chapterTitle}</span>
                        <span className="truncate">{concept.title}</span>
                      </div>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>단원별 학습 목차</span>
                <span className="text-[10px] text-slate-400 font-mono">총 2대단원 6장</span>
              </div>

              {/* Major Units Loop */}
              <div className="space-y-4">
                {MAJOR_UNITS_DATA.map((unit) => (
                  <div key={unit.id} className="space-y-2">
                    <div className="text-xs font-extrabold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                      <span>{unit.unitNumber}. {unit.title}</span>
                    </div>

                    {/* Chapters Loop */}
                    <div className="space-y-1.5 pl-1">
                      {unit.chapters.map((ch) => {
                        const isOpen = openChapterIds[ch.id];
                        const chCompletedCount = ch.concepts.filter(c => progress.completedConceptIds.includes(c.id)).length;
                        const isChDone = chCompletedCount === ch.concepts.length;

                        return (
                          <div key={ch.id} className="border border-slate-100 rounded-xl overflow-hidden">
                            <button
                              onClick={() => setOpenChapterIds(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                              className="w-full text-left p-2.5 bg-white hover:bg-slate-50/80 transition-colors flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-1.5 font-bold text-slate-800 truncate mr-2">
                                <span className="text-sky-600 font-mono">{ch.chapterNumber}</span>
                                <span className="truncate">{ch.title}</span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                                  isChDone ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'
                                }`}>
                                  {chCompletedCount}/{ch.concepts.length}
                                </span>
                                {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                              </div>
                            </button>

                            {/* Concepts List */}
                            {isOpen && (
                              <div className="bg-slate-50/60 p-1.5 space-y-1 border-t border-slate-100">
                                {ch.concepts.map((c) => {
                                  const isCurrent = c.id === activeConceptId;
                                  const isDone = progress.completedConceptIds.includes(c.id);

                                  return (
                                    <button
                                      key={c.id}
                                      onClick={() => handleSelectConcept(c.id)}
                                      className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                                        isCurrent
                                          ? 'bg-sky-600 text-white font-semibold shadow-xs'
                                          : 'hover:bg-slate-100 text-slate-700'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 truncate mr-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-white' : 'bg-slate-300'}`} />
                                        <span className="truncate">{c.title}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className={`text-[9px] px-1 rounded ${
                                          isCurrent ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-600'
                                        }`}>
                                          {c.difficulty}
                                        </span>
                                        {isDone && (
                                          <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* CENTER & RIGHT: 7-Step Interactive Lesson Canvas (8.5 Cols) */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Lesson Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
              <span className="text-slate-500">
                {currentConcept.chapterTitle}
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  currentConcept.difficulty === '기초'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : currentConcept.difficulty === '발전'
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                  난이도: {currentConcept.difficulty}
                </span>

                <button
                  onClick={() => setShowInDepthDetails(!showInDepthDetails)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  {showInDepthDetails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showInDepthDetails ? '심화 숨기기' : '심화 보기'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {currentConcept.title}
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentConcept.tags.map(t => (
                  <span key={t} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 1. 학습 목표 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>STEP 1. 학습 목표</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {currentConcept.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-700 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 text-[10px]">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* STEP 2. 개념 설명 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>STEP 2. 개념 설명 & 물리적 원리</span>
            </div>

            {/* Core Explanation Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentConcept.coreExplanation.map((p, idx) => (
                <p 
                  key={idx} 
                  className="p-1"
                  dangerouslySetInnerHTML={{
                    __html: p.replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-slate-950 font-bold bg-amber-50 px-1 rounded">$1</strong>')
                  }}
                />
              ))}
            </div>

            {/* In-depth collapsible toggle if available */}
            {currentConcept.inDepthExplanation && (showInDepthDetails || true) && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  <span>더 자세히 알아보기 (심화 물리 원리)</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  {currentConcept.inDepthExplanation.map((text, i) => (
                    <p key={i}>• {text}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Terms Definition Cards */}
            {currentConcept.keyTerms.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 mb-2.5">핵심 용어 정리</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentConcept.keyTerms.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-sky-50/50 border border-sky-100 text-xs space-y-1">
                      <strong className="text-sky-900 font-bold block">{item.term}</strong>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP 3. 물리 공식 이해 (If available) */}
          {currentConcept.formula && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="font-mono font-black text-sm">∑</span>
                <span>STEP 3. 물리 공식과 수학적 모델링</span>
              </div>

              {/* KaTeX Display Block */}
              <div className="bg-slate-950 text-white rounded-xl p-5 border border-slate-800 space-y-2 shadow-inner">
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                  {currentConcept.formula.name}
                </span>
                <div className="text-lg sm:text-xl py-2">
                  <MathFormula latex={currentConcept.formula.latex} displayMode={true} />
                </div>
                <div className="text-xs text-slate-400 text-center font-mono">
                  성립 조건: {currentConcept.formula.conditions}
                </div>
              </div>

              {/* Variables Table */}
              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse border border-slate-200 text-left">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="p-2.5 border border-slate-200 w-24">기호</th>
                      <th className="p-2.5 border border-slate-200 w-36">물리량 명칭</th>
                      <th className="p-2.5 border border-slate-200 w-28">표준 단위</th>
                      <th className="p-2.5 border border-slate-200">물리학적 의미 및 역할</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {currentConcept.formula.variables.map((v, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="p-2.5 border border-slate-200 font-mono font-bold text-sky-800">{v.symbol}</td>
                        <td className="p-2.5 border border-slate-200 font-medium">{v.name}</td>
                        <td className="p-2.5 border border-slate-200 font-mono text-slate-500">{v.unit}</td>
                        <td className="p-2.5 border border-slate-200 text-[11px]">{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculation Example Box */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-2 text-xs">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>실전 계산 예제</span>
                </div>
                <p className="font-semibold text-slate-900 leading-snug">
                  {currentConcept.formula.exampleProblem.question}
                </p>
                <div className="bg-white p-3 rounded-lg border border-amber-200/80 space-y-1 font-mono text-[11px] text-slate-700">
                  <div><strong>주어진 조건:</strong> {currentConcept.formula.exampleProblem.given}</div>
                  <div><strong>풀이 과정:</strong> {currentConcept.formula.exampleProblem.solution}</div>
                  <div className="text-amber-800 font-bold pt-1"><strong>정답:</strong> {currentConcept.formula.exampleProblem.answer}</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4. 인터랙티브 시각화 */}
          <div className="space-y-2">
            <ConceptVisualizer
              type={currentConcept.visualizerType}
              promptText={currentConcept.visualizerPrompt}
            />
          </div>

          {/* STEP 5. 실생활 및 공학 사례 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>STEP 5. 실생활 및 전기전자공학 적용 사례</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentConcept.cases.map((cs, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{cs.title}</span>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded">
                      {cs.category}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{cs.description}</p>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-sky-950 font-medium">
                    <strong className="text-sky-800">물리 원리 연계:</strong> {cs.connectionToPhysics}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 6. 개념 확인 문제 (최소 3문제) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>STEP 6. 개념 확인 문제 (개념 · 공식 · 실험 3종)</span>
              </div>
              <span className="text-xs text-slate-400">정답 제출 시 즉시 해설 제공</span>
            </div>

            <div className="space-y-5">
              {currentConcept.quizzes.map((quiz, qIdx) => {
                const userChoice = progress.quizAnswers[quiz.id];
                const hasAnswered = userChoice !== undefined;
                const isCorrect = progress.quizScores[quiz.id] === true;

                return (
                  <div key={quiz.id} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded">
                          {quiz.typeLabel}
                        </span>
                      </div>
                      {hasAnswered && (
                        <span className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                          {isCorrect ? '정답' : '오답'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {quiz.question}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-1.5">
                      {quiz.options.map((opt, oIdx) => {
                        const isChosen = userChoice === oIdx;
                        let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

                        if (hasAnswered) {
                          if (oIdx === quiz.correctAnswer) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleQuizAnswer(quiz.id, oIdx, quiz.correctAnswer)}
                            className={`w-full text-left p-2.5 sm:p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {oIdx + 1}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {hasAnswered && (
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed animate-fade-in">
                        <strong className="text-slate-900 block mb-1">💡 문제 해설:</strong>
                        {quiz.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 7. 핵심 정리 및 다음 학습 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>STEP 7. 핵심 요약 및 실험실 연계</span>
            </div>

            {/* Takeaway Bullets */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900">오늘의 핵심 물리 정리:</div>
              {currentConcept.summaryPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>

            {/* Bidirectional Virtual Lab Link Banner */}
            {currentConcept.simulatorPreset && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-sky-950 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-sky-600" />
                    <span>가상 실험 연계: {currentConcept.simulatorPreset.name}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    {currentConcept.simulatorPreset.description}
                  </p>
                </div>
                <button
                  onClick={handleLaunchSimulatorPreset}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 justify-center"
                >
                  <span>가상 실험하러 가기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Bottom Complete & Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleToggleCompleted(currentConcept.id)}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  progress.completedConceptIds.includes(currentConcept.id)
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {progress.completedConceptIds.includes(currentConcept.id)
                    ? '✓ 학습 완료됨 (클릭하여 취소)'
                    : '이 개념 학습 완료 체크'}
                </span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {currentConcept.nextConceptId && (
                  <button
                    onClick={() => handleSelectConcept(currentConcept.nextConceptId!)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>다음 개념 학습하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
};
