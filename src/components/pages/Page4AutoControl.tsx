/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Wind, 
  BatteryCharging, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  TrendingUp, 
  ArrowRight,
  Download,
  Gauge
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend 
} from 'recharts';
import { AutoControlParams, AutoControlComparisonResult, NavigationTab } from '../../types';
import { runAutoControlComparison } from '../../physics/thermalModel';

interface Page4AutoControlProps {
  onNavigate: (tab: NavigationTab) => void;
  onSaveComparisonData: (result: AutoControlComparisonResult) => void;
}

export const Page4AutoControl: React.FC<Page4AutoControlProps> = ({
  onNavigate,
  onSaveComparisonData,
}) => {
  // Shared Parameters
  const [cpuPower, setCpuPower] = useState<number>(40);        // 5 ~ 80 W
  const [ambientTemp, setAmbientTemp] = useState<number>(25);    // 10 ~ 40 °C
  const [rThOff, setRThOff] = useState<number>(2.0);             // K/W
  const [rThOn, setRThOn] = useState<number>(0.65);              // K/W
  const [cTh, setCTh] = useState<number>(150);                   // J/K
  const [duration, setDuration] = useState<number>(900);         // 60 ~ 1200 s

  // Hysteresis Auto Control Parameters
  const [tempHigh, setTempHigh] = useState<number>(65);          // Fan ON threshold (°C)
  const [tempLow, setTempLow] = useState<number>(55);           // Fan OFF threshold (°C)
  const [fanPower, setFanPower] = useState<number>(1.5);         // Fan power (W)
  const [tempLimit, setTempLimit] = useState<number>(70);        // Permissible temp limit (°C)

  // Validation
  const [validationError, setValidationError] = useState<string>('');

  const autoControlParams: AutoControlParams = useMemo(() => ({
    cpuPower,
    ambientTemp,
    rThOff,
    rThOn,
    cTh,
    duration,
    tempHigh,
    tempLow,
    fanPower,
    tempLimit,
    initialTemp: ambientTemp,
  }), [cpuPower, ambientTemp, rThOff, rThOn, cTh, duration, tempHigh, tempLow, fanPower, tempLimit]);

  // Run the 3-mode physics comparison
  const comparisonResult: AutoControlComparisonResult = useMemo(() => {
    return runAutoControlComparison(autoControlParams);
  }, [autoControlParams]);

  // Validation check
  const handleTempHighChange = (val: number) => {
    if (val <= tempLow) {
      setValidationError('팬 작동 시작 온도(T_high)는 항상 정지 온도(T_low)보다 높아야 합니다.');
    } else {
      setValidationError('');
    }
    setTempHigh(val);
  };

  const handleTempLowChange = (val: number) => {
    if (val >= tempHigh) {
      setValidationError('팬 정지 온도(T_low)는 항상 시작 온도(T_high)보다 낮아야 합니다.');
    } else {
      setValidationError('');
    }
    setTempLow(val);
  };

  // Recharts combined series
  const chartData = useMemo(() => {
    const { timePoints, offData, onData, autoData } = comparisonResult;
    // Downsample slightly if duration is large for buttery rendering
    const step = duration > 600 ? 2 : 1;
    const series = [];
    for (let i = 0; i < timePoints.length; i += step) {
      series.push({
        time: timePoints[i],
        tempOff: offData[i].temperature,
        tempOn: onData[i].temperature,
        tempAuto: autoData[i].temperature,
        autoFan: autoData[i].fanState ? 1 : 0,
      });
    }
    return series;
  }, [comparisonResult, duration]);

  // Saved notification
  const [savedBadge, setSavedBadge] = useState<boolean>(false);
  const handleSave = () => {
    onSaveComparisonData(comparisonResult);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2500);
  };

  const { offMetrics, onMetrics, autoMetrics, engineeringSummary } = comparisonResult;

  const autoDutyPercent = Math.round((autoMetrics.fanOnTime / duration) * 100);
  const energySavingsPercent = onMetrics.fanEnergyJoules > 0
    ? Math.round(((onMetrics.fanEnergyJoules - autoMetrics.fanEnergyJoules) / onMetrics.fanEnergyJoules) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
            전기전자공학 자동 제어 심화 · Hysteresis ON/OFF Cooling Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            자동 냉각 제어 실험실 (Automatic Control Lab)
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
            반도체 소자의 온도 허용 상한(예: 70°C)을 초과하지 않으면서도 냉각 팬의 소비 에너지를 최소화하기 위해, 
            <strong>① 팬 항시 OFF</strong>, <strong>② 팬 항시 ON</strong>, <strong>③ 히스테리시스 자동 제어</strong>의 
            세 가지 방식을 동일한 물리 조건에서 동시 비교하고 최적의 제어 정책을 탐구합니다.
          </p>
        </div>
        <button
          onClick={() => onNavigate('concepts')}
          className="px-3.5 py-2 text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Info className="w-3.5 h-3.5" />
          <span>관련 개념(자동제어·히스테리시스) 복습하기</span>
        </button>
      </div>

      {/* Control Deck: Two Rows */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        {/* Row 1: Common Physical System Conditions */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-sky-600" />
              공통 물리 조건 (동일 비교군)
            </span>
            <span className="text-[11px] text-slate-400">모든 냉각 모드에 동일하게 적용되는 변수</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>CPU 발열량 (P):</span>
                <span className="font-mono font-bold text-amber-600">{cpuPower} W</span>
              </div>
              <input
                type="range"
                min="10"
                max="75"
                value={cpuPower}
                onChange={(e) => setCpuPower(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>주변 온도 (T_amb):</span>
                <span className="font-mono font-bold text-slate-700">{ambientTemp} °C</span>
              </div>
              <input
                type="range"
                min="15"
                max="35"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>열저항 (OFF / ON):</span>
                <span className="font-mono font-bold text-sky-700">{rThOff} / {rThOn} K/W</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="1.0"
                  max="3.5"
                  step="0.1"
                  value={rThOff}
                  onChange={(e) => setRThOff(Number(e.target.value))}
                  title="OFF 열저항"
                  className="w-1/2 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <input
                  type="range"
                  min="0.3"
                  max="1.5"
                  step="0.05"
                  value={rThOn}
                  onChange={(e) => setRThOn(Number(e.target.value))}
                  title="ON 열저항"
                  className="w-1/2 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>열용량 (C_th) / 시간:</span>
                <span className="font-mono font-bold text-emerald-700">{cTh} J/K · {duration}s</span>
              </div>
              <input
                type="range"
                min="60"
                max="350"
                step="10"
                value={cTh}
                onChange={(e) => setCTh(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Hysteresis Auto-Control Parameters */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-sky-600" />
              히스테리시스 제어 임계값 & 팬 소비전력 설정
            </span>
            <span className="text-[11px] text-slate-400">채터링 방지 히스테리시스 밴드(ΔT_band)</span>
          </div>

          {validationError && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Temp High */}
            <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100 space-y-1">
              <div className="flex justify-between text-xs text-sky-950 font-semibold">
                <span>팬 ON 시작 온도 (T_high):</span>
                <span className="font-mono font-bold text-rose-600">{tempHigh} °C</span>
              </div>
              <input
                type="range"
                min="45"
                max="85"
                value={tempHigh}
                onChange={(e) => handleTempHighChange(Number(e.target.value))}
                className="w-full h-1.5 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <span className="text-[10px] text-slate-500 block">이 온도를 넘으면 팬 강제 가동</span>
            </div>

            {/* Temp Low */}
            <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100 space-y-1">
              <div className="flex justify-between text-xs text-sky-950 font-semibold">
                <span>팬 OFF 정지 온도 (T_low):</span>
                <span className="font-mono font-bold text-sky-600">{tempLow} °C</span>
              </div>
              <input
                type="range"
                min="30"
                max="75"
                value={tempLow}
                onChange={(e) => handleTempLowChange(Number(e.target.value))}
                className="w-full h-1.5 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <span className="text-[10px] text-slate-500 block">이 온도 이하로 냉각되면 팬 정지</span>
            </div>

            {/* Fan Power */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between text-xs text-slate-800 font-semibold">
                <span>팬 소비전력 (P_fan):</span>
                <span className="font-mono font-bold text-amber-600">{fanPower} W</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={fanPower}
                onChange={(e) => setFanPower(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 block">에너지 E_fan = P_fan × t_on</span>
            </div>

            {/* Permissible Limit */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between text-xs text-slate-800 font-semibold">
                <span>허용 한계 온도 (T_limit):</span>
                <span className="font-mono font-bold text-red-600">{tempLimit} °C</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={tempLimit}
                onChange={(e) => setTempLimit(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <span className="text-[10px] text-slate-500 block">초과 시 스로틀링 발생 기준선</span>
            </div>

          </div>
        </div>

      </div>

      {/* Recharts Multi-line Comparison Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              냉각 모드별 시간에 따른 CPU 온도 비교 곡선
            </h3>
            <p className="text-xs text-slate-500">
              동일한 발열 조건(P={cpuPower}W, T_amb={ambientTemp}°C)에서 세 가지 냉각 방식의 실시간 궤적
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-rose-500 rounded-full inline-block" />
              <span className="font-medium text-slate-700">팬 항시 OFF</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-sky-500 rounded-full inline-block" />
              <span className="font-medium text-slate-700">팬 항시 ON</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-emerald-600 rounded-full inline-block" />
              <span className="font-bold text-slate-900">히스테리시스 자동 제어</span>
            </span>
          </div>
        </div>

        <div className="w-full h-84 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                unit="s" 
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                domain={[0, duration]}
                type="number"
              />
              <YAxis 
                unit="°C" 
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                formatter={(val: any, name: any) => {
                  const numVal = Number(val)?.toFixed(2) ?? val;
                  if (name === 'tempOff') return [`${numVal} °C`, '팬 항시 OFF'];
                  if (name === 'tempOn') return [`${numVal} °C`, '팬 항시 ON'];
                  if (name === 'tempAuto') return [`${numVal} °C`, '히스테리시스 자동 제어'];
                  return [val, name];
                }}
                labelFormatter={(label: any) => `시간: ${label}초`}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderRadius: '8px', 
                  color: '#fff', 
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              {/* Permissible Limit Line */}
              <ReferenceLine 
                y={tempLimit} 
                stroke="#dc2626" 
                strokeDasharray="4 4" 
                strokeWidth={1.5}
                label={{ 
                  value: `허용 상한 기준 (${tempLimit}°C)`, 
                  position: 'insideTopRight', 
                  fill: '#dc2626',
                  fontSize: 11
                }} 
              />
              {/* Temp High Threshold Line */}
              <ReferenceLine 
                y={tempHigh} 
                stroke="#f59e0b" 
                strokeDasharray="2 2" 
                label={{ 
                  value: `팬 ON 시작점 (${tempHigh}°C)`, 
                  position: 'insideBottomRight', 
                  fill: '#d97706',
                  fontSize: 10
                }} 
              />
              {/* Temp Low Threshold Line */}
              <ReferenceLine 
                y={tempLow} 
                stroke="#0284c7" 
                strokeDasharray="2 2" 
                label={{ 
                  value: `팬 OFF 정지점 (${tempLow}°C)`, 
                  position: 'insideBottomRight', 
                  fill: '#0284c7',
                  fontSize: 10
                }} 
              />

              {/* 1. Fan Always OFF Line */}
              <Line 
                type="monotone" 
                dataKey="tempOff" 
                name="tempOff"
                stroke="#f43f5e" 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
              {/* 2. Fan Always ON Line */}
              <Line 
                type="monotone" 
                dataKey="tempOn" 
                name="tempOn"
                stroke="#0284c7" 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
              {/* 3. Hysteresis Auto Line */}
              <Line 
                type="monotone" 
                dataKey="tempAuto" 
                name="tempAuto"
                stroke="#059669" 
                strokeWidth={3} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Hysteresis band explanation badge */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Info className="w-3.5 h-3.5 text-sky-600" />
            히스테리시스 밴드 폭: ΔT_band = {tempHigh - tempLow}°C ({tempLow}°C ~ {tempHigh}°C 구간에서 팬 떨림 현상 방지)
          </span>
          <span className="font-mono text-emerald-700 font-semibold">
            녹색 곡선: 자동제어로 온도가 밴드 내에서 파동형으로 안정화됨
          </span>
        </div>
      </div>

      {/* Quantitative Results Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              정량적 시뮬레이션 결과 비교 분석표
            </h3>
            <p className="text-xs text-slate-500">
              세 가지 냉각 방식의 온도 관리 성능과 에너지 소비량을 비교합니다.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{savedBadge ? '✓ 보고서에 저장됨' : '비교 데이터 보고서에 저장'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="p-3 border border-slate-200">평가 지표</th>
                <th className="p-3 border border-slate-200 bg-rose-50/50 text-rose-900">1. 팬 항시 OFF</th>
                <th className="p-3 border border-slate-200 bg-sky-50/50 text-sky-900">2. 팬 항시 ON</th>
                <th className="p-3 border border-slate-200 bg-emerald-50/70 text-emerald-950 font-extrabold">3. 히스테리시스 자동 제어</th>
                <th className="p-3 border border-slate-200">공학적 의미</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold bg-slate-50">최대 온도 (T_max)</td>
                <td className={`p-3 font-mono font-bold ${offMetrics.maxTemp > tempLimit ? 'text-rose-600' : 'text-slate-900'}`}>
                  {offMetrics.maxTemp} °C
                </td>
                <td className="p-3 font-mono font-bold text-sky-700">
                  {onMetrics.maxTemp} °C
                </td>
                <td className={`p-3 font-mono font-extrabold ${autoMetrics.maxTemp > tempLimit ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {autoMetrics.maxTemp} °C
                </td>
                <td className="p-3 text-slate-500 text-[11px]">반도체 소자의 최대 열적 스트레스 지표</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-slate-50">평균 온도 (T_avg)</td>
                <td className="p-3 font-mono">{offMetrics.avgTemp} °C</td>
                <td className="p-3 font-mono">{onMetrics.avgTemp} °C</td>
                <td className="p-3 font-mono font-bold text-emerald-800">{autoMetrics.avgTemp} °C</td>
                <td className="p-3 text-slate-500 text-[11px]">전체 실험 시간 동안의 평균 열 부하</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-slate-50">최종 온도 (T_final)</td>
                <td className="p-3 font-mono">{offMetrics.finalTemp} °C</td>
                <td className="p-3 font-mono">{onMetrics.finalTemp} °C</td>
                <td className="p-3 font-mono font-bold text-emerald-800">{autoMetrics.finalTemp} °C</td>
                <td className="p-3 text-slate-500 text-[11px]">실험 종료 시점의 정상/수렴 온도</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-slate-50">팬 작동 시간 / 비율</td>
                <td className="p-3 font-mono text-slate-400">0초 (0%)</td>
                <td className="p-3 font-mono">{duration}초 (100%)</td>
                <td className="p-3 font-mono font-bold text-emerald-800">
                  {autoMetrics.fanOnTime}초 ({autoDutyPercent}%)
                </td>
                <td className="p-3 text-slate-500 text-[11px]">모터 마모 및 소음 노출 비중</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-slate-50">팬 전기 에너지 소비량 (E_fan)</td>
                <td className="p-3 font-mono text-slate-400">0 J (0 Wh)</td>
                <td className="p-3 font-mono text-rose-700 font-bold">
                  {onMetrics.fanEnergyJoules} J ({onMetrics.fanEnergyWh} Wh)
                </td>
                <td className="p-3 font-mono font-extrabold text-emerald-800">
                  {autoMetrics.fanEnergyJoules} J ({autoMetrics.fanEnergyWh} Wh)
                </td>
                <td className="p-3 text-slate-500 text-[11px]">
                  P_fan × t_on (팬 소비 전력과 CPU 발열량은 구분됨)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-slate-50">허용 한계({tempLimit}°C) 초과 시간</td>
                <td className={`p-3 font-mono font-bold ${offMetrics.timeOverLimit > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                  {offMetrics.timeOverLimit}초
                </td>
                <td className="p-3 font-mono text-slate-400">0초</td>
                <td className={`p-3 font-mono font-bold ${autoMetrics.timeOverLimit > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {autoMetrics.timeOverLimit}초
                </td>
                <td className="p-3 text-slate-500 text-[11px]">성능 저하(서멀 스로틀링) 위험 시간</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Auto-generated physics engineering analysis */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs space-y-2 text-emerald-950">
          <div className="font-bold flex items-center gap-1.5 text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            시뮬레이션 데이터 기반 자동 공학 분석 리포트
          </div>
          <p className="leading-relaxed">
            {engineeringSummary}
          </p>
          <div className="text-[11px] text-emerald-800 pt-1 border-t border-emerald-200/60">
            <strong>에너지 절감 효과:</strong> 항시 팬 가동({onMetrics.fanEnergyJoules} J) 대비 자동 제어 적용 시 
            소비 에너지를 약 <strong>{energySavingsPercent}%</strong> 절감하여 {autoMetrics.fanEnergyJoules} J 로 줄였습니다.
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-medium">
          자동 제어의 원리를 확인했다면, 직접 설계 과제를 해결해 보세요.
        </span>
        <button
          onClick={() => onNavigate('challenges')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
        >
          <span>다음 단계: 공학 설계 챌린지 도전</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
