/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Page1Concepts } from './components/pages/Page1Concepts';
import { Page2Hypothesis } from './components/pages/Page2Hypothesis';
import { Page3Simulator } from './components/pages/Page3Simulator';
import { Page4AutoControl } from './components/pages/Page4AutoControl';
import { Page5Challenges } from './components/pages/Page5Challenges';
import { Page6Report } from './components/pages/Page6Report';
import { 
  NavigationTab, 
  UserHypothesis, 
  SimulationResult, 
  SimulationParams, 
  AutoControlComparisonResult,
  ChallengeEvaluation 
} from './types';

const INITIAL_HYPOTHESIS: UserHypothesis = {
  situationA: { selectedOption: '', reasoning: '' },
  situationB: { selectedOption: '', reasoning: '' },
  situationC: { selectedOption: '', reasoning: '' },
  savedAt: '',
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('concepts');

  // Stored State (Loaded from LocalStorage if available)
  const [hypothesis, setHypothesis] = useState<UserHypothesis>(() => {
    try {
      const saved = localStorage.getItem('thermolab_hypothesis');
      return saved ? JSON.parse(saved) : INITIAL_HYPOTHESIS;
    } catch {
      return INITIAL_HYPOTHESIS;
    }
  });

  const [latestSimulatorRun, setLatestSimulatorRun] = useState<{
    result: SimulationResult;
    params: SimulationParams;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('thermolab_latest_sim');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [latestAutoControlRun, setLatestAutoControlRun] = useState<AutoControlComparisonResult | null>(() => {
    try {
      const saved = localStorage.getItem('thermolab_latest_autocontrol');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [latestChallengeSuccess, setLatestChallengeSuccess] = useState<{
    missionTitle: string;
    score: number;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('thermolab_latest_challenge');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Handlers
  const handleSaveHypothesis = (newHyp: UserHypothesis) => {
    setHypothesis(newHyp);
    localStorage.setItem('thermolab_hypothesis', JSON.stringify(newHyp));
  };

  const handleSaveExperimentData = (result: SimulationResult, params: SimulationParams) => {
    const data = { result, params };
    setLatestSimulatorRun(data);
    localStorage.setItem('thermolab_latest_sim', JSON.stringify(data));
  };

  const handleSaveComparisonData = (result: AutoControlComparisonResult) => {
    setLatestAutoControlRun(result);
    localStorage.setItem('thermolab_latest_autocontrol', JSON.stringify(result));
  };

  const handleSaveChallengeSuccess = (missionTitle: string, evalResult: ChallengeEvaluation) => {
    const data = { missionTitle, score: evalResult.score };
    setLatestChallengeSuccess(data);
    localStorage.setItem('thermolab_latest_challenge', JSON.stringify(data));
  };

  const handleResetAllData = () => {
    if (window.confirm('모든 실험 데이터와 가설 설정을 초기화하시겠습니까?')) {
      localStorage.removeItem('thermolab_hypothesis');
      localStorage.removeItem('thermolab_latest_sim');
      localStorage.removeItem('thermolab_latest_autocontrol');
      localStorage.removeItem('thermolab_latest_challenge');
      localStorage.removeItem('thermolab_report');
      setHypothesis(INITIAL_HYPOTHESIS);
      setLatestSimulatorRun(null);
      setLatestAutoControlRun(null);
      setLatestChallengeSuccess(null);
      setCurrentTab('concepts');
    }
  };

  const [simulatorPresetParams, setSimulatorPresetParams] = useState<Partial<SimulationParams> | null>(null);

  const handleApplySimulatorPreset = (params: Partial<SimulationParams>, targetTab: NavigationTab) => {
    setSimulatorPresetParams(params);
    setCurrentTab(targetTab);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* 3-Zone Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onResetAll={handleResetAllData}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'concepts' && (
          <Page1Concepts 
            onNavigate={setCurrentTab} 
            onApplySimulatorPreset={handleApplySimulatorPreset}
          />
        )}

        {currentTab === 'hypothesis' && (
          <Page2Hypothesis 
            onNavigate={setCurrentTab}
            hypothesis={hypothesis}
            onSaveHypothesis={handleSaveHypothesis}
          />
        )}

        {currentTab === 'simulator' && (
          <Page3Simulator 
            onNavigate={setCurrentTab}
            onSaveExperimentData={handleSaveExperimentData}
            presetParams={simulatorPresetParams}
          />
        )}

        {currentTab === 'autocontrol' && (
          <Page4AutoControl 
            onNavigate={setCurrentTab}
            onSaveComparisonData={handleSaveComparisonData}
          />
        )}

        {currentTab === 'challenges' && (
          <Page5Challenges 
            onNavigate={setCurrentTab}
            onSaveChallengeSuccess={handleSaveChallengeSuccess}
          />
        )}

        {currentTab === 'report' && (
          <Page6Report 
            onNavigate={setCurrentTab}
            hypothesis={hypothesis}
            latestSimulatorRun={latestSimulatorRun}
            latestAutoControlRun={latestAutoControlRun}
            latestChallengeSuccess={latestChallengeSuccess}
          />
        )}
      </main>

      {/* Clean Scientific Footer (No slop, quiet copyright and curriculum attribution) */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ThermoLab</span>
            <span>·</span>
            <span>2022 개정 교육과정 고등학교 물리학 「열과 에너지」 가상 실험실</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>집중 열용량 모델(Lumped Thermal Model)</span>
            <span>·</span>
            <span>전기전자공학 열관리 탐구</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
