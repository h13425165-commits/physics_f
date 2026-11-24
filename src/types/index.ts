/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NavigationTab = 
  | 'concepts'     // PAGE 1. 물리 개념 학습
  | 'hypothesis'   // PAGE 2. 가설 설정 및 결과 예측
  | 'simulator'    // PAGE 3. 전자기기 발열 및 냉각 시뮬레이터
  | 'autocontrol'  // PAGE 4. 자동 냉각 제어 실험실
  | 'challenges'   // PAGE 5. 공학적 문제 해결 챌린지
  | 'report';      // PAGE 6. 학습 평가 및 탐구 보고서

export interface SimulationParams {
  cpuPower: number;       // CPU 발열량 P (W, 5~80W)
  ambientTemp: number;    // 주변 온도 T_amb (°C, 10~40°C)
  rThOff: number;         // 팬 OFF 상태 열저항 (K/W, 0.5~4.0)
  rThOn: number;          // 팬 ON 상태 열저항 (K/W, 0.2~3.0)
  cTh: number;            // 열용량 (J/K, 50~500 J/K)
  duration: number;       // 실험 시간 (s, 60~1200초)
  fanActive: boolean;     // 현재 수동 팬 상태 (ON/OFF)
  fanPower: number;       // 팬 소비전력 (W, 기본 1.5W)
  initialTemp?: number;   // 초기 온도 (°C, 기본 T_amb)
}

export interface SimulationDataPoint {
  time: number;           // 시간 (초)
  temperature: number;    // 현재 CPU 온도 (°C)
  deltaT: number;         // 주변 온도와의 차이 (K or °C)
  heatDissipation: number;// 방출 열류 (W)
  fanState: boolean;      // 팬 작동 여부
  fanEnergy: number;      // 누적 팬 소비 에너지 (J)
}

export interface SimulationResult {
  data: SimulationDataPoint[];
  maxTemp: number;
  minTemp: number;
  finalTemp: number;
  avgTemp: number;
  steadyStateTemp: number;
  timeConstant: number;
  fanOnTime: number;
  fanEnergyJoules: number;
  fanEnergyWh: number;
  timeOverLimit: number;
}

export interface AutoControlParams {
  cpuPower: number;
  ambientTemp: number;
  rThOff: number;
  rThOn: number;
  cTh: number;
  duration: number;
  tempHigh: number;       // 팬 ON 임계 온도 (°C)
  tempLow: number;        // 팬 OFF 임계 온도 (°C)
  fanPower: number;       // 팬 소비전력 (W)
  tempLimit: number;      // 허용 한계 온도 (°C)
  initialTemp?: number;
}

export interface AutoControlComparisonResult {
  params: AutoControlParams;
  timeStep: number;
  timePoints: number[];
  offData: SimulationDataPoint[];
  onData: SimulationDataPoint[];
  autoData: SimulationDataPoint[];
  offMetrics: SimulationResult;
  onMetrics: SimulationResult;
  autoMetrics: SimulationResult;
  engineeringSummary: string;
}

export interface UserHypothesis {
  situationA: {
    selectedOption: string;
    reasoning: string;
    verified?: boolean;
    actualOutcome?: string;
  };
  situationB: {
    selectedOption: string;
    reasoning: string;
    verified?: boolean;
    actualOutcome?: string;
  };
  situationC: {
    selectedOption: string;
    reasoning: string;
    verified?: boolean;
    actualOutcome?: string;
  };
  savedAt: string;
}

export interface ChallengeMission {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  scenario: string;
  initialParams: SimulationParams;
  targetTempLimit: number;
  maxAllowedEnergy: number;
  requirements: string[];
  hints: string[];
}

export interface ChallengeEvaluation {
  passed: boolean;
  score: number; // 0 ~ 100
  tempPassed: boolean;
  energyPassed: boolean;
  stabilityScore: number;
  feasibilityScore: number;
  metrics: SimulationResult;
  feedback: string;
  engineeringAnalysis: string;
}

export interface QuizQuestion {
  id: number;
  category: 'heat_transfer' | 'first_law' | 'thermal_resistance' | 'heat_capacity' | 'auto_control';
  categoryLabel: string;
  type: 'multiple_choice' | 'ox' | 'calculation' | 'graph_interpretation';
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedConceptTab: NavigationTab;
  conceptSectionId?: string;
}

export interface InquiryReportData {
  title: string;
  studentName: string;
  studentId: string;
  schoolName: string;
  date: string;
  sourceExperiment: 'simulator' | 'autocontrol' | 'challenge';
  
  // Independent / Dependent / Controlled variables
  independentVariable: string;
  dependentVariable: string;
  controlledVariables: string;
  
  // Experimental setup and conditions
  experimentalConditions: {
    cpuPower: number;
    ambientTemp: number;
    rThOff: number;
    rThOn: number;
    cTh: number;
    duration: number;
    modeDescription: string;
  };
  
  // Quantitative Simulation Results
  resultsSummary: {
    maxTemp: number;
    finalTemp: number;
    avgTemp: number;
    steadyStateTemp: number;
    fanRunRatio: number;
    fanEnergyJoules: number;
  };
  
  // Student Analysis Text Fields
  hypothesisSummary: string;
  hypothesisComparison: string;
  physicalInterpretation: string;
  modelLimitations: string;
  engineeringApplication: string;
  personalReflection: string;
}
