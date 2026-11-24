/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, AlertCircle, BookOpen } from 'lucide-react';
import { ALL_CONCEPTS } from '../../data/conceptUnitsData';
import { ConceptQuizItem } from '../../types/concepts';

interface WrongAnswerNotebookProps {
  isOpen: boolean;
  onClose: () => void;
  wrongQuizIds: string[];
  onCorrectWrongQuiz: (quizId: string) => void;
  onNavigateToConcept: (conceptId: string) => void;
}

export const WrongAnswerNotebook: React.FC<WrongAnswerNotebookProps> = ({
  isOpen,
  onClose,
  wrongQuizIds,
  onCorrectWrongQuiz,
  onNavigateToConcept,
}) => {
  const [retryAnswers, setRetryAnswers] = useState<Record<string, number>>({});
  const [retrySubmitted, setRetrySubmitted] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  // Gather all wrong quiz items with their parent concept
  const wrongItems: { quiz: ConceptQuizItem; conceptId: string; conceptTitle: string }[] = [];
  ALL_CONCEPTS.forEach(concept => {
    concept.quizzes.forEach(q => {
      if (wrongQuizIds.includes(q.id)) {
        wrongItems.push({
          quiz: q,
          conceptId: concept.id,
          conceptTitle: concept.title,
        });
      }
    });
  });

  const handleSelectOption = (quizId: string, optIdx: number) => {
    setRetryAnswers(prev => ({ ...prev, [quizId]: optIdx }));
  };

  const handleCheckRetry = (quiz: ConceptQuizItem) => {
    const chosen = retryAnswers[quiz.id];
    if (chosen === undefined) return;

    setRetrySubmitted(prev => ({ ...prev, [quiz.id]: true }));
    if (chosen === quiz.correctAnswer) {
      setTimeout(() => {
        onCorrectWrongQuiz(quiz.id);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">맞춤형 오답 노트 (Mistake Review)</h2>
              <p className="text-xs text-slate-500">틀린 문제를 복습하고 물리적 원인을 분석하여 취약 개념을 극복하세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {wrongItems.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">오답 노트가 비어 있습니다!</h3>
              <p className="text-xs text-slate-500">
                현재 모든 개념 확인 문제를 정답으로 통과했거나 아직 문제를 풀지 않았습니다.
              </p>
            </div>
          ) : (
            wrongItems.map(({ quiz, conceptId, conceptTitle }, idx) => {
              const selectedOption = retryAnswers[quiz.id];
              const isChecked = retrySubmitted[quiz.id];
              const isCorrect = selectedOption === quiz.correctAnswer;

              return (
                <div key={quiz.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded">
                      {conceptTitle} · {quiz.typeLabel}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToConcept(conceptId);
                      }}
                      className="text-[11px] text-slate-500 hover:text-sky-600 flex items-center gap-1 underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>개념 본문 복습하기</span>
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {idx + 1}. {quiz.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-1.5">
                    {quiz.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={isChecked && isCorrect}
                        onClick={() => handleSelectOption(quiz.id, oIdx)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-start gap-2 ${
                          selectedOption === oIdx
                            ? isChecked
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-400 text-rose-950'
                              : 'bg-sky-50 border-sky-400 text-sky-950 font-semibold'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {oIdx + 1}
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>

                  {/* Action & Explanation */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => handleCheckRetry(quiz)}
                      disabled={selectedOption === undefined}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      다시 풀고 채점하기
                    </button>

                    {isChecked && (
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isCorrect ? '✓ 정답입니다! 오답 노트에서 제거됩니다.' : '✗ 다시 생각해 보세요.'}
                      </span>
                    )}
                  </div>

                  {isChecked && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong className="block text-slate-900 mb-1">해설:</strong>
                      {quiz.explanation}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <span>남은 오답: {wrongItems.length}개</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
