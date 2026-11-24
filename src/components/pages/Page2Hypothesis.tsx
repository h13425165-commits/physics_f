/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, ArrowRight, BookmarkCheck, Sparkles, HelpCircle } from 'lucide-react';
import { NavigationTab, UserHypothesis } from '../../types';

interface Page2HypothesisProps {
  onNavigate: (tab: NavigationTab) => void;
  hypothesis: UserHypothesis;
  onSaveHypothesis: (hyp: UserHypothesis) => void;
}

export const Page2Hypothesis: React.FC<Page2HypothesisProps> = ({
  onNavigate,
  hypothesis,
  onSaveHypothesis,
}) => {
  const [situationAOpt, setSituationAOpt] = useState<string>(hypothesis.situationA.selectedOption || '');
  const [situationAReason, setSituationAReason] = useState<string>(hypothesis.situationA.reasoning || '');

  const [situationBOpt, setSituationBOpt] = useState<string>(hypothesis.situationB.selectedOption || '');
  const [situationBReason, setSituationBReason] = useState<string>(hypothesis.situationB.reasoning || '');

  const [situationCOpt, setSituationCOpt] = useState<string>(hypothesis.situationC.selectedOption || '');
  const [situationCReason, setSituationCReason] = useState<string>(hypothesis.situationC.reasoning || '');

  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  const handleSave = () => {
    const updated: UserHypothesis = {
      situationA: {
        selectedOption: situationAOpt,
        reasoning: situationAReason,
      },
      situationB: {
        selectedOption: situationBOpt,
        reasoning: situationBReason,
      },
      situationC: {
        selectedOption: situationCOpt,
        reasoning: situationCReason,
      },
      savedAt: new Date().toISOString(),
    };
    onSaveHypothesis(updated);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const isFormComplete = situationAOpt !== '' && situationBOpt !== '' && situationCOpt !== '';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
          탐구 과학의 제1단계 · 과학적 예측
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          가설 설정 및 결과 예측 (Hypothesis & Prediction)
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          실제 실험을 시작하기 전에 앞서 배운 물리 법칙(ΔT = P × R_th, τ = R_th × C_th)을 적용하여 결과를 논리적으로 예측해 보세요.
          설정한 가설은 저장되어 시뮬레이션 종료 후 <strong>[탐구 보고서]</strong>에서 실제 계산 결과와 직접 대조·분석하게 됩니다.
          (※ 과학적 탐구의 공정성을 위해 정답은 실험 전 미리 공개되지 않습니다.)
        </p>
      </div>

      {/* 상황 A: CPU 발열량 변화 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
            A
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-700 uppercase">독립변수: CPU 발열량(P) 조작</span>
            <h2 className="text-lg font-bold text-slate-900">
              상황 A. 냉각 성능(열저항)이 일정할 때, 발열량이 2배 증가하면 정상상태 온도는?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              주변 온도가 25°C이고 쿨러의 열저항 R_th = 1.0 K/W로 일정할 때, CPU 발열량이 30W에서 60W로 2배 증가한다면 정상상태 온도 상승량(ΔT)과 최종 온도는 어떻게 될까요?
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
          {[
            {
              id: 'A1',
              label: '온도 상승량(ΔT)은 2배가 되며, 최종 온도는 25°C + (2 × ΔT_기존)이 된다.',
              hint: '공식 ΔT = P × R_th 적용 시 P가 2배가 됨',
            },
            {
              id: 'A2',
              label: '발열량이 2배라도 대류에 의해 열이 더 빨리 빠져나가므로 온도 상승량은 1.4배(√2배)만 증가한다.',
              hint: '선형 집중 모형과 차이가 있을 것이라는 예상',
            },
            {
              id: 'A3',
              label: '최종 절대온도(K) 자체가 2배로 증가하여 500K 이상으로 폭등한다.',
              hint: '온도 상승분(ΔT)과 절대온도(T)의 차이 혼동',
            },
            {
              id: 'A4',
              label: '열용량이 온도를 흡수하므로 정상상태 최종 온도는 발열량과 무관하게 일정하다.',
              hint: '열용량의 완충 작용과 최종 온도의 혼동',
            },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSituationAOpt(opt.id)}
              className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                situationAOpt === opt.id
                  ? 'border-sky-500 bg-sky-50/70 text-sky-950 font-semibold ring-1 ring-sky-400'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                  situationAOpt === opt.id ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                }`}>
                  {situationAOpt === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span>{opt.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Student Reasoning Text Input */}
        <div className="pl-14">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            나의 물리적 가설 및 근거 서술:
          </label>
          <textarea
            value={situationAReason}
            onChange={(e) => setSituationAReason(e.target.value)}
            placeholder="예: 열역학 제1법칙 및 열저항 공식 ΔT = P × R_th 에 따르면 R_th가 고정되어 있을 때 온도 상승량 ΔT는 발열량 P에 정비례하므로..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
        </div>
      </section>

      {/* 상황 B: 냉각 팬 작동 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
            B
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-sky-700 uppercase">독립변수: 냉각 팬 가동 (열저항 R_th 감소)</span>
            <h2 className="text-lg font-bold text-slate-900">
              상황 B. 일정한 발열량에서 냉각 팬이 작동하면 시간에 따른 CPU 온도는?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              동일한 발열량(35W)에서 냉각 팬을 켜서 강제 대류를 일으키면 열저항이 2.0 K/W(자연대류)에서 0.7 K/W(강제대류)로 급감합니다. 이때 시간에 따른 온도 곡선의 거동은?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
          {[
            {
              id: 'B1',
              label: '팬을 켜는 순간 즉시 계단식으로 온도가 수직 하강하여 바닥 온도로 고정된다.',
            },
            {
              id: 'B2',
              label: '새로운 낮은 정상상태 온도를 향해 지수함수적(Exponential) 곡선을 그리며 서서히 하강한다.',
            },
            {
              id: 'B3',
              label: '온도가 일정 속도(선형적 직선)로 계속 떨어져 주변 온도보다 더 차갑게 영하까지 내려간다.',
            },
            {
              id: 'B4',
              label: '팬 자체의 전력 소비로 인해 오히려 내부 에너지가 증가하여 온도가 더 올라간다.',
            },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSituationBOpt(opt.id)}
              className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                situationBOpt === opt.id
                  ? 'border-sky-500 bg-sky-50/70 text-sky-950 font-semibold ring-1 ring-sky-400'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                  situationBOpt === opt.id ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                }`}>
                  {situationBOpt === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span>{opt.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="pl-14">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            나의 물리적 가설 및 근거 서술:
          </label>
          <textarea
            value={situationBReason}
            onChange={(e) => setSituationBReason(e.target.value)}
            placeholder="예: 열용량 C_th가 존재하므로 온도 변화에는 시정수 τ = R_th_on × C_th 에 비례하는 시간이 필요하며, 새로운 열평형점 T_ss = T_amb + P × R_th_on 을 향해 완만하게 지수 감쇄할 것이다..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
        </div>
      </section>

      {/* 상황 C: 열용량 변화 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            C
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase">독립변수: 방열판 열용량(C_th) 증가</span>
            <h2 className="text-lg font-bold text-slate-900">
              상황 C. 방열판 질량이 커져 열용량이 2배 증가하면, 최종 온도와 도달 시간은?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              열저항 R_th는 동일하지만 방열판의 금속 덩치가 커져 열용량 C_th가 150 J/K에서 300 J/K로 2배 증가한 경우입니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
          {[
            {
              id: 'C1',
              label: '최종 정상상태 온도는 절반으로 줄어들고 도달 시간은 동일하다.',
            },
            {
              id: 'C2',
              label: '최종 정상상태 온도는 동일하지만, 정상상태에 도달하는 데 걸리는 시간(시정수)이 2배로 길어진다.',
            },
            {
              id: 'C3',
              label: '열용량이 크면 열을 계속 가두므로 최종 온도가 훨씬 더 높아진다.',
            },
            {
              id: 'C4',
              label: '온도 변화 곡선과 시간 모두 아무런 영향을 받지 않는다.',
            },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSituationCOpt(opt.id)}
              className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                situationCOpt === opt.id
                  ? 'border-sky-500 bg-sky-50/70 text-sky-950 font-semibold ring-1 ring-sky-400'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                  situationCOpt === opt.id ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                }`}>
                  {situationCOpt === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span>{opt.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="pl-14">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            나의 물리적 가설 및 근거 서술:
          </label>
          <textarea
            value={situationCReason}
            onChange={(e) => setSituationCReason(e.target.value)}
            placeholder="예: 최종 온도는 오직 발열량과 열저항(ΔT = P × R_th)에 의해서만 결정되므로 불변이지만, 열적 시정수 τ = R_th × C_th 가 2배 증가하므로 온도 상승 속도가 완만해질 것이다..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
        </div>
      </section>

      {/* Action Strip */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-100 p-5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          {savedNotification ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              가설이 성공적으로 저장되었습니다!
            </span>
          ) : (
            <span className="text-xs text-slate-600">
              {isFormComplete
                ? '모든 상황에 대한 예측이 완료되었습니다. 가설을 저장하고 실험실에서 검증해 보세요.'
                : '각 상황에 대해 가장 타당하다고 생각되는 선택지를 골라주세요.'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl text-xs border border-slate-300 transition-colors shadow-xs"
          >
            <BookmarkCheck className="w-4 h-4 text-sky-600" />
            <span>가설 저장하기</span>
          </button>
          <button
            onClick={() => {
              handleSave();
              onNavigate('simulator');
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
          >
            <span>실험실로 이동하여 검증하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
