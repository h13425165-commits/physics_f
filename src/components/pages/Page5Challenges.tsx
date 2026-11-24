/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  RotateCcw, 
  Sliders, 
  ArrowRight,
  Sparkles,
  Zap,
  TrendingDown,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CHALLENGE_MISSIONS } from '../../data/challengeData';
import { ChallengeMission, ChallengeEvaluation, NavigationTab, SimulationParams } from '../../types';
import { evaluateChallengeDesign } from '../../physics/thermalModel';

interface Page5ChallengesProps {
  onNavigate: (tab: NavigationTab) => void;
  onSaveChallengeSuccess: (missionTitle: string, evalResult: ChallengeEvaluation) => void;
}

export const Page5Challenges: React.FC<Page5ChallengesProps> = ({
  onNavigate,
  onSaveChallengeSuccess,
}) => {
  const [selectedMissionIndex, setSelectedMissionIndex] = useState<number>(0);
  const activeMission: ChallengeMission = CHALLENGE_MISSIONS[selectedMissionIndex];

  // User adjustable design variables for current mission
  const [userRThOn, setUserRThOn] = useState<number>(activeMission.initialParams.rThOn);
  const [userRThOff, setUserRThOff] = useState<number>(activeMission.initialParams.rThOff);
  const [userCTh, setUserCTh] = useState<number>(activeMission.initialParams.cTh);
  const [userFanActive, setUserFanActive] = useState<boolean>(activeMission.initialParams.fanActive);
  const [userFanPower, setUserFanPower] = useState<number>(activeMission.initialParams.fanPower);

  // Evaluation state
  const [evalResult, setEvalResult] = useState<ChallengeEvaluation | null>(null);
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(0);

  // Switch mission
  const handleSelectMission = (idx: number) => {
    setSelectedMissionIndex(idx);
    const m = CHALLENGE_MISSIONS[idx];
    setUserRThOn(m.initialParams.rThOn);
    setUserRThOff(m.initialParams.rThOff);
    setUserCTh(m.initialParams.cTh);
    setUserFanActive(m.initialParams.fanActive);
    setUserFanPower(m.initialParams.fanPower);
    setEvalResult(null);
    setUnlockedHintLevel(0);
  };

  // Run Design Verification
  const handleVerifyDesign = () => {
    const currentParams: SimulationParams = {
      ...activeMission.initialParams,
      rThOn: userRThOn,
      rThOff: userRThOff,
      cTh: userCTh,
      fanActive: userFanActive,
      fanPower: userFanPower,
    };

    const res = evaluateChallengeDesign(
      activeMission.id,
      currentParams,
      activeMission.targetTempLimit,
      activeMission.maxAllowedEnergy
    );

    setEvalResult(res);

    if (res.passed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onSaveChallengeSuccess(activeMission.title, res);
    }
  };

  const handleResetToInitial = () => {
    setUserRThOn(activeMission.initialParams.rThOn);
    setUserRThOff(activeMission.initialParams.rThOff);
    setUserCTh(activeMission.initialParams.cTh);
    setUserFanActive(activeMission.initialParams.fanActive);
    setUserFanPower(activeMission.initialParams.fanPower);
    setEvalResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 space-y-2">
        <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
          실전 공학적 문제 해결 · Engineering Thermal Design Challenges
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          공학적 문제 해결 챌린지
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          실제 반도체 엔지니어처럼 물리 법칙(열저항 R_th, 열용량 C_th, 팬 에너지 소모)을 적용하여 
          과열을 억제하고 에너지를 최적화하는 방열 시스템을 설계하세요.
          '설계 검증'을 누르면 동일한 물리 시뮬레이션 모델로 합격 여부와 공학 점수가 실시간 산출됩니다.
        </p>
      </div>

      {/* Mission Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CHALLENGE_MISSIONS.map((m, idx) => {
          const isSelected = selectedMissionIndex === idx;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectMission(idx)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-sky-50/70 border-sky-400 ring-1 ring-sky-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded">
                  {m.badge}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">0{idx + 1}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{m.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{m.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Main Challenge Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Mission Briefing & Guidelines (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              미션 시나리오
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {activeMission.title}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeMission.scenario}
            </p>
          </div>

          {/* Success Criteria List */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">합격 판정 기준:</div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              {activeMission.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stepped Hints Section */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                물리 개념 힌트 (단계별 해금)
              </span>
              {unlockedHintLevel < activeMission.hints.length && (
                <button
                  onClick={() => setUnlockedHintLevel(prev => Math.min(activeMission.hints.length, prev + 1))}
                  className="text-[11px] text-sky-600 hover:text-sky-700 font-medium underline"
                >
                  {unlockedHintLevel === 0 ? '첫 번째 힌트 보기' : '다음 단계 힌트 보기'}
                </button>
              )}
            </div>

            {unlockedHintLevel === 0 ? (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg">
                설계에 어려움을 겪고 계시다면 힌트 보기 버튼을 눌러 물리 원리를 확인하세요.
              </p>
            ) : (
              <div className="space-y-2">
                {activeMission.hints.slice(0, unlockedHintLevel).map((h, i) => (
                  <div key={i} className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950">
                    {h}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Design Parameters & Evaluation Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Parameter Tuning Deck */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Sliders className="w-4 h-4 text-sky-600" />
                방열 시스템 설계 파라미터 조율
              </span>
              <button
                onClick={handleResetToInitial}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>초기값 복원</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Slider 1: rThOn */}
              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>팬 가동 시 열저항 (R_th_on):</span>
                  <span className="font-mono font-bold text-sky-600">{userRThOn} K/W</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.05"
                  value={userRThOn}
                  onChange={(e) => setUserRThOn(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.2 K/W (수랭/대형핀)</span>
                  <span>1.0 K/W</span>
                  <span>2.0 K/W (소형쿨러)</span>
                </div>
              </div>

              {/* Slider 2: rThOff */}
              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>팬 정지 시 자연 방열 열저항 (R_th_off):</span>
                  <span className="font-mono font-bold text-rose-600">{userRThOff} K/W</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="3.5"
                  step="0.1"
                  value={userRThOff}
                  onChange={(e) => setUserRThOff(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <span className="text-[10px] text-slate-400 block font-mono">
                  자연 대류 성능 (방열판 표면적이 넓을수록 작아짐)
                </span>
              </div>

              {/* Slider 3: cTh */}
              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>방열판 열용량 (C_th = m × c):</span>
                  <span className="font-mono font-bold text-emerald-600">{userCTh} J/K</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="450"
                  step="10"
                  value={userCTh}
                  onChange={(e) => setUserCTh(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[10px] text-slate-400 block font-mono">
                  방열판 무게 및 열완충 용량 (시정수 τ = R_th × C_th)
                </span>
              </div>

              {/* Controls: Fan Toggle & Fan Power */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-700 font-semibold mb-1.5">냉각 팬 가동 정책</div>
                  <button
                    onClick={() => setUserFanActive(!userFanActive)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                      userFanActive
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {userFanActive ? '팬 가동 (ON)' : '팬 미가동 (OFF 자연방열)'}
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                    <span>팬 소비전력:</span>
                    <span className="font-mono text-amber-600">{userFanPower} W</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    value={userFanPower}
                    onChange={(e) => setUserFanPower(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Verification Button */}
            <div className="pt-2">
              <button
                onClick={handleVerifyDesign}
                className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>방열 설계 검증 실행하기</span>
              </button>
            </div>
          </div>

          {/* Evaluation Result Viewport */}
          {evalResult && (
            <div className={`rounded-2xl border p-6 space-y-5 transition-all shadow-sm ${
              evalResult.passed
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-rose-50/60 border-rose-300'
            }`}>
              {/* Verdict Header */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2.5">
                  {evalResult.passed ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Trophy className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <h3 className={`text-base font-bold ${evalResult.passed ? 'text-emerald-950' : 'text-rose-950'}`}>
                      {evalResult.passed ? '설계 합격! (SUCCESS)' : '설계 기준 미달 (NEEDS REVISION)'}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {evalResult.feedback}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">종합 점수</div>
                  <div className={`text-2xl font-extrabold font-mono ${evalResult.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {evalResult.score} / 100
                  </div>
                </div>
              </div>

              {/* 4 Score Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <span className="text-[10px] text-slate-500 block">최고 온도</span>
                  <span className={`text-sm font-bold font-mono ${evalResult.tempPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {evalResult.metrics.maxTemp} °C
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">기준: ≤ {activeMission.targetTempLimit}°C</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <span className="text-[10px] text-slate-500 block">팬 소비에너지</span>
                  <span className={`text-sm font-bold font-mono ${evalResult.energyPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {evalResult.metrics.fanEnergyJoules} J
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">기준: ≤ {activeMission.maxAllowedEnergy}J</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <span className="text-[10px] text-slate-500 block">열 안정성 여유</span>
                  <span className="text-sm font-bold font-mono text-sky-700">
                    {evalResult.stabilityScore}점
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">온도 마진 기반</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <span className="text-[10px] text-slate-500 block">실현 가능성</span>
                  <span className="text-sm font-bold font-mono text-purple-700">
                    {evalResult.feasibilityScore}점
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">부품 크기/무게</span>
                </div>
              </div>

              {/* Engineering Analysis Note */}
              <div className="p-3 bg-white/90 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {evalResult.engineeringAnalysis}
              </div>

              {evalResult.passed && (
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => onNavigate('report')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>성공한 설계로 탐구 보고서 작성하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
