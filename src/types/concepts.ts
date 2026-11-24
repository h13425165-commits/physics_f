/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavigationTab, SimulationParams } from './index';

export type ConceptDifficulty = '기초' | '발전' | '심화';

export type VisualizerType = 
  | 'conduction_rod'     // 열전도 막대 및 푸리에 법칙
  | 'specific_heat'      // 비열과 열용량 비교
  | 'gas_piston'         // 보일-샤를 및 이상 기체 피스톤
  | 'thermo_processes'   // 열역학 4대 과정 (등온, 등적, 등압, 단열) 및 P-V 선도
  | 'carnot_engine'      // 카르노 기관 열효율 및 순환
  | 'entropy_diffusion'  // 엔트로피와 비가역 입자 확산
  | 'rc_thermal_analogy' // 반도체 발열과 RC 열회로 상사성
  | 'heat_pipe_latent'   // 히트 파이프 잠열 순환
  | 'thermal_expansion'; // 열팽창과 선팽창

export interface ConceptFormula {
  latex: string;
  name: string;
  variables: { symbol: string; name: string; unit: string; description: string }[];
  conditions: string;
  physicalMeaning: string;
  exampleProblem: {
    question: string;
    given: string;
    solution: string;
    answer: string;
  };
}

export interface ConceptQuizItem {
  id: string;
  type: 'concept' | 'formula' | 'experiment';
  typeLabel: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface EngineeringCase {
  title: string;
  category: '전기전자공학' | '일상생활' | '첨단산업';
  description: string;
  connectionToPhysics: string;
}

export interface ConceptItem {
  id: string;
  chapterId: string;
  chapterTitle: string;
  title: string;
  difficulty: ConceptDifficulty;
  tags: string[];
  
  // STEP 1. 학습 목표
  objectives: string[];
  
  // STEP 2. 개념 설명
  coreExplanation: string[];
  inDepthExplanation?: string[];
  keyTerms: { term: string; definition: string }[];
  
  // STEP 3. 물리 공식 이해
  formula?: ConceptFormula;
  
  // STEP 4. 인터랙티브 시각화
  visualizerType: VisualizerType;
  visualizerPrompt: string;
  
  // STEP 5. 실생활 및 공학 사례
  cases: EngineeringCase[];
  
  // STEP 6. 개념 확인 문제 (최소 3문제)
  quizzes: ConceptQuizItem[];
  
  // STEP 7. 핵심 정리 & 다음 학습
  summaryPoints: string[];
  nextConceptId?: string;
  
  // 가상 실험 연계 파라미터 (시뮬레이터로 보낼 프리셋)
  simulatorPreset?: {
    name: string;
    description: string;
    params: Partial<SimulationParams>;
    targetTab: NavigationTab;
  };
}

export interface Chapter {
  id: string;
  unitId: string;
  unitTitle: string;
  chapterNumber: string; // '01', '02', etc.
  title: string;
  subtitle: string;
  concepts: ConceptItem[];
}

export interface MajorUnit {
  id: string;
  unitNumber: string; // '대단원 1', '대단원 2'
  title: string;
  description: string;
  chapters: Chapter[];
}

export interface UserConceptProgress {
  completedConceptIds: string[];
  quizAnswers: Record<string, number>; // quizId -> selected option
  quizScores: Record<string, boolean>;  // quizId -> isCorrect
  wrongQuizIds: string[];               // list of wrong quiz IDs for 오답 노트
  lastVisitedConceptId: string;
  viewMode: 'essential' | 'indepth';
}
