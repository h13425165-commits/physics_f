/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Download, 
  Printer, 
  HelpCircle, 
  ArrowRight,
  BookOpen,
  Award,
  Sparkles,
  Save,
  Check
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { 
  NavigationTab, 
  UserHypothesis, 
  SimulationResult, 
  SimulationParams, 
  AutoControlComparisonResult,
  InquiryReportData 
} from '../../types';

interface Page6ReportProps {
  onNavigate: (tab: NavigationTab) => void;
  hypothesis: UserHypothesis;
  latestSimulatorRun: { result: SimulationResult; params: SimulationParams } | null;
  latestAutoControlRun: AutoControlComparisonResult | null;
  latestChallengeSuccess: { missionTitle: string; score: number } | null;
}

export const Page6Report: React.FC<Page6ReportProps> = ({
  onNavigate,
  hypothesis,
  latestSimulatorRun,
  latestAutoControlRun,
  latestChallengeSuccess,
}) => {
  // Tabs inside Page 6: Quiz vs Report
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'report'>('quiz');

  // Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const totalQuestions = QUIZ_QUESTIONS.length;
  const correctCount = Object.keys(selectedAnswers).filter(
    (qIdStr) => {
      const q = QUIZ_QUESTIONS.find(x => x.id === Number(qIdStr));
      return q && selectedAnswers[Number(qIdStr)] === q.correctAnswer;
    }
  ).length;

  // Report States
  const [studentName, setStudentName] = useState<string>('홍길동');
  const [studentId, setStudentId] = useState<string>('2학년 3반 15번');
  const [schoolName, setSchoolName] = useState<string>('한국과학고등학교');
  const [reportTitle, setReportTitle] = useState<string>('전자기기 발열과 방열 조건에 따른 온도 변화 및 자동 제어 탐구');

  // Student reflections and analysis text fields
  const [physicalAnalysis, setPhysicalAnalysis] = useState<string>(
    '열역학 제1법칙과 정상상태 공식(ΔT = P × R_th)에 따라, CPU 발열량 P가 증가하면 온도는 선형적으로 상승함을 확인했습니다. 또한 냉각 팬을 가동하여 열저항 R_th를 낮추면 목표 온도를 안정적으로 제어할 수 있었습니다.'
  );
  const [modelLimitations, setModelLimitations] = useState<string>(
    '본 실험은 집중 열용량 모형(Lumped Model)을 적용하여 CPU 전체 온도를 단일 값으로 가정했습니다. 실제 반도체는 국소적인 핫스팟(Hotspot)과 3차원 열전도 구배가 존재하며, 팬 속도에 따른 비선형 난류 대류가 발생한다는 한계가 있습니다.'
  );
  const [engineeringApplication, setEngineeringApplication] = useState<string>(
    '자동 제어(히스테리시스)를 도입하면 팬을 100% 항시 가동하지 않고도 온도를 안전 마진 내로 유지하면서 에너지 소비를 절감할 수 있었습니다. 이는 데이터센터의 PUE(전력효율지수) 개선과 스마트폰 및 노트북의 배터리 수명 관리에 직접 응용됩니다.'
  );
  const [personalReflection, setPersonalReflection] = useState<string>(
    '물리 교과서에서 수식으로만 접하던 비열, 열용량, 열역학 제1법칙이 실제 컴퓨터 쿨러 설계와 어떻게 직결되는지 체감할 수 있었습니다. 특히 에너지 절약과 온도 관리 사이의 공학적 절충(Trade-off)을 직접 시뮬레이션해 본 점이 매우 흥미로웠습니다.'
  );

  const [reportSaved, setReportSaved] = useState<boolean>(false);
  const handleSaveReportToLocalStorage = () => {
    const reportData: InquiryReportData = {
      title: reportTitle,
      studentName,
      studentId,
      schoolName,
      date: new Date().toLocaleDateString('ko-KR'),
      sourceExperiment: latestAutoControlRun ? 'autocontrol' : 'simulator',
      independentVariable: 'CPU 발열량(P), 냉각 팬 ON/OFF(열저항 R_th), 열용량(C_th)',
      dependentVariable: '시간에 따른 CPU 온도 T(t), 최고 온도 T_max, 팬 소비 에너지',
      controlledVariables: '주변 대기 온도 T_amb, 실험 시간 duration',
      experimentalConditions: {
        cpuPower: latestSimulatorRun?.params.cpuPower || 35,
        ambientTemp: latestSimulatorRun?.params.ambientTemp || 25,
        rThOff: latestSimulatorRun?.params.rThOff || 2.0,
        rThOn: latestSimulatorRun?.params.rThOn || 0.7,
        cTh: latestSimulatorRun?.params.cTh || 150,
        duration: latestSimulatorRun?.params.duration || 900,
        modeDescription: latestAutoControlRun ? '히스테리시스 자동 제어 비교 실험' : '단일 쿨러 시뮬레이션'
      },
      resultsSummary: {
        maxTemp: latestSimulatorRun?.result.maxTemp || 49.5,
        finalTemp: latestSimulatorRun?.result.finalTemp || 49.5,
        avgTemp: latestSimulatorRun?.result.avgTemp || 42.1,
        steadyStateTemp: latestSimulatorRun?.result.steadyStateTemp || 49.5,
        fanRunRatio: latestAutoControlRun ? Math.round((latestAutoControlRun.autoMetrics.fanOnTime / 900) * 100) : 100,
        fanEnergyJoules: latestSimulatorRun?.result.fanEnergyJoules || 1350,
      },
      hypothesisSummary: hypothesis.situationA.selectedOption ? '가설 설정 완료' : '미작성',
      hypothesisComparison: '가설과 시뮬레이션 결과가 일치함',
      physicalInterpretation: physicalAnalysis,
      modelLimitations,
      engineeringApplication,
      personalReflection,
    };

    localStorage.setItem('thermolab_report', JSON.stringify(reportData));
    setReportSaved(true);
    setTimeout(() => setReportSaved(false), 2500);
  };

  // Export to CSV
  const handleDownloadCSV = () => {
    const dataToExport = latestAutoControlRun?.autoData || latestSimulatorRun?.result.data || [];
    if (dataToExport.length === 0) {
      alert('내보낼 시뮬레이션 데이터가 없습니다. 먼저 [발열·냉각 시뮬레이터]에서 실험을 실행해 주세요.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Time_s,Temperature_C,DeltaT_C,HeatDissipation_W,FanState,FanEnergy_J\n';

    dataToExport.forEach(row => {
      csvContent += `${row.time},${row.temperature},${row.deltaT},${row.heatDissipation},${row.fanState ? 'ON' : 'OFF'},${row.fanEnergy}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `thermolab_experiment_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="no-print border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
            학습 종합 마무리 · Assessment & Scientific Inquiry Report
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            학습 평가 및 탐구 보고서
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            개념 퀴즈로 물리학적 지식을 점검하고, 실험 결과를 과학적 탐구 보고서 양식으로 체계화하여 인쇄 및 CSV로 저장합니다.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeSubTab === 'quiz'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>1. 물리 개념 퀴즈 (8문항)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('report')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeSubTab === 'report'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. 과학 탐구 보고서</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CONCEPT QUIZ */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6">
          
          {/* Score Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">물리학 「열과 에너지」 핵심 개념 진단</h2>
                <p className="text-xs text-slate-500">
                  열전달, 열역학 제1법칙, 열저항, 열용량, 자동 제어에 관한 종합 8문항
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {quizSubmitted ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">최종 득점</span>
                    <span className="text-xl font-black font-mono text-sky-700">
                      {correctCount} / {totalQuestions} ({Math.round((correctCount / totalQuestions) * 100)}점)
                    </span>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>다시 풀기</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  제출 및 채점하기
                </button>
              )}
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isSubmitted = quizSubmitted;
              const isCorrect = selectedIdx === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-rose-300 bg-rose-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        {q.categoryLabel}
                      </span>
                    </div>

                    {isSubmitted && (
                      <div className="flex items-center gap-1 font-bold text-xs">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            정답
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            오답
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    {q.question}
                  </h3>

                  {q.context && (
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600 mb-3 font-mono">
                      {q.context}
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2 mt-3">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-700';

                      if (isSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'border-sky-500 bg-sky-50 text-sky-950 font-semibold ring-1 ring-sky-400';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-start gap-2.5 ${optionStyle}`}
                        >
                          <span className="w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 border-slate-300 text-[10px]">
                            {optIdx + 1}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Concept Return Link (After Submit) */}
                  {isSubmitted && (
                    <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                      <div className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                        <span className="font-bold text-slate-900 block mb-1">💡 물리적 해설:</span>
                        {q.explanation}
                      </div>

                      {!isCorrect && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => onNavigate(q.relatedConceptTab)}
                            className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-semibold underline pt-1"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>관련 개념({q.categoryLabel}) 다시 복습하기</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Bottom Switcher */}
          <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl">
            <span className="text-xs text-slate-600">
              퀴즈 평가를 마쳤다면, 탐구 보고서를 완성해 보세요.
            </span>
            <button
              onClick={() => setActiveSubTab('report')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
            >
              <span>탐구 보고서 작성으로 이동</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: SCIENTIFIC INQUIRY REPORT */}
      {activeSubTab === 'report' && (
        <div className="space-y-6">
          
          {/* Action Toolbar (no-print) */}
          <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">보고서 도구:</span>
              {reportSaved && (
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
                  ✓ 브라우저에 저장 완료
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveReportToLocalStorage}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5 text-sky-600" />
                <span>보고서 임시 저장</span>
              </button>
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>실험 데이터 CSV 내보내기</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>보고서 인쇄 / PDF 저장</span>
              </button>
            </div>
          </div>

          {/* Printable Report Canvas */}
          <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-sm space-y-8 text-slate-900 printable-canvas">
            
            {/* Title Header */}
            <div className="text-center border-b-2 border-slate-900 pb-6 space-y-3">
              <div className="text-xs font-bold tracking-widest text-sky-800 uppercase">
                고등학교 물리학 2022 개정 교육과정 「열과 에너지」 단원 탐구활동
              </div>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="text-2xl sm:text-3xl font-black text-center w-full focus:outline-none focus:ring-1 focus:ring-sky-500 rounded p-1"
              />
              
              {/* Metadata Table */}
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs pt-2 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">학교:</span>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="border-b border-slate-300 px-1 py-0.5 text-center w-36 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">학번:</span>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="border-b border-slate-300 px-1 py-0.5 text-center w-32 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">성명:</span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="border-b border-slate-300 px-1 py-0.5 text-center w-24 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">실험 일자:</span>
                  <span>{new Date().toLocaleDateString('ko-KR')}</span>
                </div>
              </div>
            </div>

            {/* 1. 탐구 목적 및 핵심 질문 */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                1. 탐구 목적 및 핵심 탐구 질문
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong>핵심 질문:</strong> "전자기기에서 발생하는 열은 어떤 물리 법칙에 따라 이동하며, 냉각 조건을 어떻게 설계해야 효율적으로 온도를 제어할 수 있을까?"<br />
                <strong>목적:</strong> 열전달 3방식(전도·대류·복사), 열역학 제1법칙(에너지 보존), 열저항(R_th) 및 열용량(C_th)의 물리적 관계를 바탕으로, CPU 발열 시스템의 정상상태 온도 상승과 과도 열적 시정수를 검증하고 자동 제어를 통한 에너지 최적화를 탐구한다.
              </p>
            </div>

            {/* 2. 탐구 가설 (Page 2 연동) */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                2. 실험 전 설정한 탐구 가설
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">상황 A (발열량 2배)</div>
                  <p className="text-slate-600 text-[11px]">
                    {hypothesis.situationA.selectedOption
                      ? `선택: [${hypothesis.situationA.selectedOption}]`
                      : '온도 상승량 ΔT = P × R_th 에 의해 발열량 증가 시 2배 상승 예측'}
                  </p>
                  {hypothesis.situationA.reasoning && (
                    <p className="text-[10px] text-slate-500 italic mt-1">"{hypothesis.situationA.reasoning}"</p>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">상황 B (냉각 팬 작동)</div>
                  <p className="text-slate-600 text-[11px]">
                    {hypothesis.situationB.selectedOption
                      ? `선택: [${hypothesis.situationB.selectedOption}]`
                      : '열저항 급감으로 지수함수적 온도 하강 후 새 정상상태 수렴 예측'}
                  </p>
                  {hypothesis.situationB.reasoning && (
                    <p className="text-[10px] text-slate-500 italic mt-1">"{hypothesis.situationB.reasoning}"</p>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">상황 C (열용량 2배)</div>
                  <p className="text-slate-600 text-[11px]">
                    {hypothesis.situationC.selectedOption
                      ? `선택: [${hypothesis.situationC.selectedOption}]`
                      : '최종 온도는 동일하나 시정수 τ = R_th × C_th 증가로 완만하게 상승 예측'}
                  </p>
                  {hypothesis.situationC.reasoning && (
                    <p className="text-[10px] text-slate-500 italic mt-1">"{hypothesis.situationC.reasoning}"</p>
                  )}
                </div>
              </div>
            </div>

            {/* 3. 탐구 변수 및 실험 조건 */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                3. 변수 통제 및 실험 조건
              </h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse border border-slate-300">
                  <tbody>
                    <tr>
                      <th className="bg-slate-100 p-2.5 border border-slate-300 w-32 font-semibold">독립변수</th>
                      <td className="p-2.5 border border-slate-300">
                        CPU 발열량 P(W), 냉각 팬 ON/OFF 상태(강제대류 여부), 방열판 표면적 및 열용량 C_th
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-100 p-2.5 border border-slate-300 font-semibold">종속변수</th>
                      <td className="p-2.5 border border-slate-300">
                        시간에 따른 전자기기 온도 T(t), 정상상태 도달 시간, 최대 온도, 팬 전기 에너지 소비량
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-100 p-2.5 border border-slate-300 font-semibold">통제변수</th>
                      <td className="p-2.5 border border-slate-300">
                        주변 실내 온도(T_amb = 25°C), 대기압(1 atm), 방열판 기본 재질 물성
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-100 p-2.5 border border-slate-300 font-semibold">적용 물리 모델</th>
                      <td className="p-2.5 border border-slate-300 font-mono text-[11px]">
                        집중 열용량 모델: C_th · (dT/dt) = P - (T - T_amb) / R_th
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. 시뮬레이션 계산 결과 요약 */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                4. 시뮬레이션 정량 데이터 및 가설 검증 결과
              </h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse border border-slate-300 text-center">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-2 border border-slate-300">실험 항목</th>
                      <th className="p-2 border border-slate-300">발열량 P</th>
                      <th className="p-2 border border-slate-300">유효 열저항 R_th</th>
                      <th className="p-2 border border-slate-300">열용량 C_th</th>
                      <th className="p-2 border border-slate-300">시정수 τ</th>
                      <th className="p-2 border border-slate-300">이론 T_ss</th>
                      <th className="p-2 border border-slate-300">실제 최종온도</th>
                      <th className="p-2 border border-slate-300">팬 에너지(J)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-slate-300 font-medium">수동 시뮬레이터</td>
                      <td className="p-2 border border-slate-300 font-mono">{latestSimulatorRun?.params.cpuPower || 35} W</td>
                      <td className="p-2 border border-slate-300 font-mono">
                        {latestSimulatorRun ? (latestSimulatorRun.params.fanActive ? latestSimulatorRun.params.rThOn : latestSimulatorRun.params.rThOff) : 0.7} K/W
                      </td>
                      <td className="p-2 border border-slate-300 font-mono">{latestSimulatorRun?.params.cTh || 150} J/K</td>
                      <td className="p-2 border border-slate-300 font-mono">{latestSimulatorRun?.result.timeConstant || 105} s</td>
                      <td className="p-2 border border-slate-300 font-mono">{latestSimulatorRun?.result.steadyStateTemp || 49.5} °C</td>
                      <td className="p-2 border border-slate-300 font-mono font-bold text-sky-700">
                        {latestSimulatorRun?.result.finalTemp || 49.5} °C
                      </td>
                      <td className="p-2 border border-slate-300 font-mono">{latestSimulatorRun?.result.fanEnergyJoules || 1350} J</td>
                    </tr>
                    {latestAutoControlRun && (
                      <tr>
                        <td className="p-2 border border-slate-300 font-medium">자동 제어 (히스테리시스)</td>
                        <td className="p-2 border border-slate-300 font-mono">{latestAutoControlRun.params.cpuPower} W</td>
                        <td className="p-2 border border-slate-300 font-mono">{latestAutoControlRun.params.rThOn}~{latestAutoControlRun.params.rThOff} K/W</td>
                        <td className="p-2 border border-slate-300 font-mono">{latestAutoControlRun.params.cTh} J/K</td>
                        <td className="p-2 border border-slate-300 font-mono">-</td>
                        <td className="p-2 border border-slate-300 font-mono">&lt; {latestAutoControlRun.params.tempHigh} °C</td>
                        <td className="p-2 border border-slate-300 font-mono font-bold text-emerald-700">
                          {latestAutoControlRun.autoMetrics.finalTemp} °C
                        </td>
                        <td className="p-2 border border-slate-300 font-mono font-bold text-emerald-700">
                          {latestAutoControlRun.autoMetrics.fanEnergyJoules} J
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. 학생 심화 서술 영역 (Editable) */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                  5. 물리적 결과 분석 및 원인 해석 (열역학 제1법칙 및 열전달 원리)
                </label>
                <textarea
                  value={physicalAnalysis}
                  onChange={(e) => setPhysicalAnalysis(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 leading-relaxed bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                  6. 물리 모델의 가정과 한계점 (집중 열용량 모형 vs 실제 전자기기)
                </label>
                <textarea
                  value={modelLimitations}
                  onChange={(e) => setModelLimitations(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 leading-relaxed bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                  7. 전기전자공학 및 반도체 산업과의 연계성 (자동 제어 및 방열 최적화)
                </label>
                <textarea
                  value={engineeringApplication}
                  onChange={(e) => setEngineeringApplication(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 leading-relaxed bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 border-l-3 border-sky-600 pl-2">
                  8. 탐구 소감 및 발전 과제
                </label>
                <textarea
                  value={personalReflection}
                  onChange={(e) => setPersonalReflection(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 leading-relaxed bg-slate-50/50"
                />
              </div>
            </div>

            {/* Sign-off footer */}
            <div className="pt-6 border-t border-slate-300 flex justify-between items-center text-xs text-slate-500">
              <span>ThermoLab — 전자기기 냉각 가상 실험실</span>
              <span>지도 교사 확인: (인) &nbsp; / &nbsp; 학생 서명: {studentName}</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
