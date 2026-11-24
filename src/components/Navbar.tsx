/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { SourceCodeModal } from './common/SourceCodeModal';
import { 
  BookOpen, 
  Lightbulb, 
  Cpu, 
  Sliders, 
  Trophy, 
  FileText,
  RotateCcw,
  Download
} from 'lucide-react';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onResetAll?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onResetAll,
}) => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'concepts', label: '물리 개념 학습', icon: BookOpen },
    { id: 'hypothesis', label: '가설 설정 및 예측', icon: Lightbulb },
    { id: 'simulator', label: '발열·냉각 시뮬레이터', icon: Cpu },
    { id: 'autocontrol', label: '자동 냉각 제어', icon: Sliders },
    { id: 'challenges', label: '공학 설계 챌린지', icon: Trophy },
    { id: 'report', label: '평가 및 탐구 보고서', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => onSelectTab('concepts')}
            className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg px-1 py-1"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-700 transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors whitespace-nowrap block leading-tight">
                ThermoLab
              </span>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap block">
                전자기기 냉각 실험실
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-200 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCodeModalOpen(true)}
              title="전체 소스코드 열람, 복사 및 다운로드"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>전체 코드 복사 / 다운로드</span>
            </button>
            {onResetAll && (
              <button
                onClick={onResetAll}
                title="실험 상태 초기화"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>데이터 초기화</span>
              </button>
            )}
            <button
              onClick={() => onSelectTab(currentTab === 'report' ? 'simulator' : 'report')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{currentTab === 'report' ? '시뮬레이터로 복귀' : '탐구 보고서 보기'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Source Code Modal */}
      <SourceCodeModal 
        isOpen={isCodeModalOpen} 
        onClose={() => setIsCodeModalOpen(false)} 
      />
    </header>
  );
};
