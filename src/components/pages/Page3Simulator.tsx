/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Wind, 
  Flame, 
  Sliders, 
  Info, 
  TrendingUp, 
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { SimulationParams, SimulationResult, NavigationTab } from '../../types';
import { 
  runSimulation, 
  calculateSteadyStateTemp, 
  calculateTimeConstant,
  calculateNextTemperature 
} from '../../physics/thermalModel';

interface Page3SimulatorProps {
  onNavigate: (tab: NavigationTab) => void;
  onSaveExperimentData: (result: SimulationResult, params: SimulationParams) => void;
  presetParams?: Partial<SimulationParams> | null;
}

export const Page3Simulator: React.FC<Page3SimulatorProps> = ({
  onNavigate,
  onSaveExperimentData,
  presetParams,
}) => {
  // Parameters
  const [cpuPower, setCpuPower] = useState<number>(presetParams?.cpuPower ?? 35);
  const [ambientTemp, setAmbientTemp] = useState<number>(presetParams?.ambientTemp ?? 25);
  const [rThOff, setRThOff] = useState<number>(presetParams?.rThOff ?? 2.0);
  const [rThOn, setRThOn] = useState<number>(presetParams?.rThOn ?? 0.7);
  const [cTh, setCTh] = useState<number>(presetParams?.cTh ?? 150);
  const [duration, setDuration] = useState<number>(presetParams?.duration ?? 900);
  const [fanActive, setFanActive] = useState<boolean>(presetParams?.fanActive ?? true);
  const [fanPower, setFanPower] = useState<number>(presetParams?.fanPower ?? 1.5);

  useEffect(() => {
    if (presetParams) {
      if (presetParams.cpuPower !== undefined) setCpuPower(presetParams.cpuPower);
      if (presetParams.ambientTemp !== undefined) setAmbientTemp(presetParams.ambientTemp);
      if (presetParams.rThOff !== undefined) setRThOff(presetParams.rThOff);
      if (presetParams.rThOn !== undefined) setRThOn(presetParams.rThOn);
      if (presetParams.cTh !== undefined) setCTh(presetParams.cTh);
      if (presetParams.duration !== undefined) setDuration(presetParams.duration);
      if (presetParams.fanActive !== undefined) setFanActive(presetParams.fanActive);
      if (presetParams.fanPower !== undefined) setFanPower(presetParams.fanPower);
    }
  }, [presetParams]);

  // Validation warning
  const [rThWarning, setRThWarning] = useState<string>('');

  useEffect(() => {
    if (rThOn >= rThOff) {
      setRThWarning('경고: 팬 ON 상태의 열저항(R_th_on)은 항상 OFF 상태(R_th_off)보다 작아야 합니다 (팬이 돌면 열전달이 촉진되므로).');
    } else {
      setRThWarning('');
    }
  }, [rThOn, rThOff]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(5); // 1x, 5x, 20x, 50x
  const [dataPoints, setDataPoints] = useState<Array<{ time: number; temperature: number; fanState: boolean }>>([
    { time: 0, temperature: 25, fanState: true }
  ]);
  const [currentTemp, setCurrentTemp] = useState<number>(25);

  // Full theoretical run for ground-truth inspection and full chart preview
  const simulationParams: SimulationParams = useMemo(() => ({
    cpuPower,
    ambientTemp,
    rThOff,
    rThOn,
    cTh,
    duration,
    fanActive,
    fanPower,
    initialTemp: ambientTemp,
  }), [cpuPower, ambientTemp, rThOff, rThOn, cTh, duration, fanActive, fanPower]);

  const fullRunResult = useMemo(() => {
    return runSimulation(simulationParams);
  }, [simulationParams]);

  // Reset or initialize on parameter change
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentTemp(ambientTemp);
    setDataPoints([{ time: 0, temperature: ambientTemp, fanState: fanActive }]);
  };

  // Run or step simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prevTime => {
        const nextTime = prevTime + 1;
        if (nextTime > duration) {
          setIsPlaying(false);
          return duration;
        }

        const activeRTh = fanActive ? rThOn : rThOff;
        const nextT = calculateNextTemperature(
          currentTemp,
          ambientTemp,
          cpuPower,
          activeRTh,
          cTh,
          1
        );

        setCurrentTemp(Number(nextT.toFixed(2)));
        setDataPoints(prev => [
          ...prev,
          { time: nextTime, temperature: Number(nextT.toFixed(2)), fanState: fanActive }
        ]);

        return nextTime;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, currentTemp, ambientTemp, cpuPower, fanActive, rThOn, rThOff, cTh, duration]);

  // Fast forward to end
  const handleFastForward = () => {
    setIsPlaying(false);
    setCurrentTime(duration);
    setCurrentTemp(fullRunResult.finalTemp);
    setDataPoints(fullRunResult.data.map(d => ({
      time: d.time,
      temperature: d.temperature,
      fanState: d.fanState
    })));
  };

  // Current calculated physics indicators
  const activeRTh = fanActive ? rThOn : rThOff;
  const steadyStateT = calculateSteadyStateTemp(ambientTemp, cpuPower, activeRTh);
  const timeConst = calculateTimeConstant(activeRTh, cTh);
  const currentDeltaT = Number((currentTemp - ambientTemp).toFixed(2));
  const currentDissipation = Number((currentDeltaT / activeRTh).toFixed(2));

  // Temperature color styling (from icy cyan to blazing red)
  const getTempColor = (temp: number) => {
    if (temp < 40) return '#0284c7'; // Cyan/Blue
    if (temp < 60) return '#059669'; // Emerald
    if (temp < 75) return '#d97706'; // Amber
    if (temp < 90) return '#dc2626'; // Red
    return '#9333ea';               // Purple/Extreme
  };

  const currentTempColor = getTempColor(currentTemp);

  // Apply Presets
  const applyPreset = (preset: 'standard' | 'gaming' | 'laptop' | 'fanless') => {
    setIsPlaying(false);
    if (preset === 'standard') {
      setCpuPower(35);
      setAmbientTemp(25);
      setRThOff(2.0);
      setRThOn(0.7);
      setCTh(150);
      setDuration(900);
      setFanActive(true);
      setCurrentTemp(25);
    } else if (preset === 'gaming') {
      setCpuPower(75);
      setAmbientTemp(25);
      setRThOff(1.6);
      setRThOn(0.4);
      setCTh(280);
      setDuration(900);
      setFanActive(true);
      setCurrentTemp(25);
    } else if (preset === 'laptop') {
      setCpuPower(28);
      setAmbientTemp(25);
      setRThOff(3.2);
      setRThOn(1.1);
      setCTh(70);
      setDuration(600);
      setFanActive(true);
      setCurrentTemp(25);
    } else if (preset === 'fanless') {
      setCpuPower(15);
      setAmbientTemp(25);
      setRThOff(1.8);
      setRThOn(1.8);
      setCTh(180);
      setDuration(900);
      setFanActive(false);
      setCurrentTemp(25);
    }
    setCurrentTime(0);
    setDataPoints([{ time: 0, temperature: 25, fanState: preset !== 'fanless' }]);
  };

  // Export & Save to Report
  const [savedBadge, setSavedBadge] = useState<boolean>(false);
  const handleSaveToReport = () => {
    onSaveExperimentData(fullRunResult, simulationParams);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
            핵심 가상 실험실 · Lumped Thermal Capacitance Model
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            전자기기 발열 및 냉각 시뮬레이터
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            C_th · (dT/dt) = P - (T - T_amb) / R_th 물리 모델에 따른 실시간 온도 갱신 및 방열 거동 분석
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 font-medium mr-1">프리셋:</span>
          <button
            onClick={() => applyPreset('standard')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            사무용 PC (35W)
          </button>
          <button
            onClick={() => applyPreset('gaming')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            게이밍 PC (75W)
          </button>
          <button
            onClick={() => applyPreset('laptop')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            슬림 노트북 (28W)
          </button>
          <button
            onClick={() => applyPreset('fanless')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
          >
            팬리스 미니PC (15W)
          </button>

          <button
            onClick={() => onNavigate('concepts')}
            className="px-3 py-1 text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-md transition-colors flex items-center gap-1 ml-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>관련 물리 개념 복습하기</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Controls Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Sliders className="w-4 h-4 text-sky-600" />
                실험 조건 조절 패널
              </span>
              <button
                onClick={handleReset}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>재설정</span>
              </button>
            </div>

            {rThWarning && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{rThWarning}</span>
              </div>
            )}

            {/* Slider 1: CPU Power */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">CPU 발열량 (P):</span>
                <span className="font-mono font-bold text-amber-600">{cpuPower} W</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={cpuPower}
                onChange={(e) => setCpuPower(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5W (초절전)</span>
                <span>35W (표준)</span>
                <span>80W (고성능)</span>
              </div>
            </div>

            {/* Slider 2: Ambient Temp */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">주변 실내 온도 (T_amb):</span>
                <span className="font-mono font-bold text-slate-700">{ambientTemp} °C</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10°C (냉방실)</span>
                <span>25°C (상온)</span>
                <span>40°C (혹서기)</span>
              </div>
            </div>

            {/* Slider 3: rThOff */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">팬 OFF 열저항 (R_th_off):</span>
                <span className="font-mono font-bold text-rose-600">{rThOff} K/W</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={rThOff}
                onChange={(e) => setRThOff(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.5 K/W (거대 방열판)</span>
                <span>2.0 K/W</span>
                <span>4.0 K/W (밀폐함체)</span>
              </div>
            </div>

            {/* Slider 4: rThOn */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">팬 ON 열저항 (R_th_on):</span>
                <span className="font-mono font-bold text-sky-600">{rThOn} K/W</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.05"
                value={rThOn}
                onChange={(e) => setRThOn(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.2 K/W (수랭/초고속팬)</span>
                <span>0.7 K/W</span>
                <span>3.0 K/W</span>
              </div>
            </div>

            {/* Slider 5: cTh */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">열용량 (C_th = m × c):</span>
                <span className="font-mono font-bold text-emerald-600">{cTh} J/K</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={cTh}
                onChange={(e) => setCTh(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50 J/K (소형 칩)</span>
                <span>150 J/K</span>
                <span>500 J/K (대형 타워쿨러)</span>
              </div>
            </div>

            {/* Slider 6: Duration */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">실험 시간:</span>
                <span className="font-mono font-bold text-slate-800">{duration} 초</span>
              </div>
              <input
                type="range"
                min="60"
                max="1200"
                step="30"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
            </div>

            {/* Manual Fan Toggle Button */}
            <div className="pt-2">
              <button
                onClick={() => setFanActive(!fanActive)}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                  fanActive
                    ? 'bg-sky-600 text-white shadow-xs hover:bg-sky-700'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <Wind className={`w-4 h-4 ${fanActive ? 'animate-spin' : ''}`} />
                <span>냉각 팬 상태: {fanActive ? 'ON (강제 대류 작동 중)' : 'OFF (자연 대류만 작동)'}</span>
              </button>
            </div>
          </div>

          {/* Model info note */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-normal">
            <span className="font-semibold text-slate-700">집중 열용량 모델 안내:</span> 본 시뮬레이터는 고등학교 물리 교육과정에 맞춰 CPU 내부의 복잡한 3차원 열분포를 단일 대표 온도로 가정한 1차 동역학 모형을 사용합니다.
          </div>
        </div>

        {/* CENTER COLUMN: 2D Interactive Visualizer (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between text-white relative overflow-hidden">
          
          {/* Top Status Overlay */}
          <div className="flex items-center justify-between text-xs z-10 border-b border-slate-800 pb-3">
            <span className="font-bold text-slate-300">2D CPU 쿨러 시각화</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">팬 상태:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${fanActive ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                {fanActive ? 'ON (회전 중)' : 'OFF (정지)'}
              </span>
            </div>
          </div>

          {/* Graphic SVG Component */}
          <div className="relative py-4 flex flex-col items-center justify-center">
            
            {/* Ambient Air Inflow/Outflow Arrows */}
            <div className="absolute top-2 left-6 text-xs text-sky-400/80 flex items-center gap-1 font-mono">
              <Wind className="w-3.5 h-3.5 animate-pulse" />
              <span>외기 유입 {ambientTemp}°C</span>
            </div>

            {/* Rotating Fan Assembly */}
            <div className="relative mb-3 flex flex-col items-center">
              <div className={`w-28 h-28 rounded-full border-4 ${fanActive ? 'border-sky-500/60 shadow-lg shadow-sky-500/20' : 'border-slate-700'} flex items-center justify-center relative bg-slate-900`}>
                {/* Fan Blades */}
                <svg
                  viewBox="0 0 100 100"
                  className={`w-24 h-24 text-slate-400 transition-transform ${fanActive ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '0.6s' }}
                >
                  <circle cx="50" cy="50" r="14" fill="#334155" />
                  <path d="M50 36 C42 20 58 10 50 2 C42 10 58 20 50 36 Z" fill={fanActive ? '#38bdf8' : '#64748b'} />
                  <path d="M50 64 C42 80 58 90 50 98 C42 90 58 80 50 64 Z" fill={fanActive ? '#38bdf8' : '#64748b'} />
                  <path d="M36 50 C20 42 10 58 2 50 C10 42 20 58 36 50 Z" fill={fanActive ? '#38bdf8' : '#64748b'} />
                  <path d="M64 50 C80 42 90 58 98 50 C90 42 80 58 64 50 Z" fill={fanActive ? '#38bdf8' : '#64748b'} />
                </svg>
                {/* Fan Label */}
                <span className="absolute text-[9px] font-bold text-white/90">
                  {fanActive ? 'PWM ACTIVE' : 'FAN OFF'}
                </span>
              </div>
            </div>

            {/* Aluminum Heatsink Fins (Airflow channel) */}
            <div className="w-64 bg-slate-800 rounded-lg p-2.5 border border-slate-700 shadow-md space-y-1.5">
              <div className="text-[10px] text-slate-400 text-center font-mono">
                알루미늄 방열핀 (표면적 A 극대화)
              </div>
              <div className="flex justify-between items-center px-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((fin) => (
                  <div
                    key={fin}
                    className="w-2.5 h-12 rounded-t-sm transition-colors"
                    style={{
                      backgroundColor: currentTemp > 70 ? '#f97316' : currentTemp > 50 ? '#eab308' : '#38bdf8',
                      opacity: 0.85
                    }}
                  />
                ))}
              </div>
              {/* Copper Heat Pipes passing through */}
              <div className="h-3 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full shadow-inner flex items-center justify-around px-2">
                <span className="text-[8px] text-slate-900 font-bold">Cu HEAT PIPE (잠열 상변화 순환)</span>
              </div>
            </div>

            {/* Copper Baseplate */}
            <div className="w-40 h-3 bg-amber-700 rounded-sm mt-1 border border-amber-500/40 shadow-xs" />

            {/* Thermal Paste Layer */}
            <div className="w-32 h-1 bg-slate-400/80 my-0.5" title="서멀 구리스 계면 (미세 공기층 제거)" />

            {/* CPU Silicon Die (Dynamic Heat Color Glow) */}
            <div 
              className="w-36 h-14 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-300 shadow-xl"
              style={{
                backgroundColor: currentTempColor,
                borderColor: currentTemp > 75 ? '#f43f5e' : '#38bdf8',
                boxShadow: `0 0 24px ${currentTempColor}88`
              }}
            >
              <span className="text-[10px] font-bold tracking-widest text-white/90">CPU CORE DIE</span>
              <span className="text-xl font-extrabold font-mono text-white tracking-tight">
                {currentTemp.toFixed(1)} °C
              </span>
            </div>

            {/* Motherboard PCB Base */}
            <div className="w-72 h-4 bg-emerald-950 rounded-b border-t-2 border-emerald-600 mt-1 flex justify-center items-center">
              <span className="text-[8px] text-emerald-400 font-mono tracking-widest">
                SYSTEM PCB MAINBOARD
              </span>
            </div>
          </div>

          {/* Bottom Live Metrics Bar */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">발열량 P</span>
              <span className="font-mono font-bold text-amber-400">{cpuPower} W</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">방출 열류 q</span>
              <span className="font-mono font-bold text-sky-400">{currentDissipation} W</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">실제 ΔT</span>
              <span className="font-mono font-bold text-emerald-400">+{currentDeltaT} °C</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">현재 경과 시간</span>
              <span className="font-mono font-bold text-white">{currentTime} s</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-time Analysis Dashboard (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Activity className="w-4 h-4 text-emerald-600" />
                실시간 분석 대시보드
              </span>
              <span className="text-[11px] text-slate-500">이론해와 실시간 비교</span>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">현재 온도</div>
                <div className="text-xl font-bold font-mono mt-0.5" style={{ color: currentTempColor }}>
                  {currentTemp.toFixed(1)} °C
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  ΔT: +{currentDeltaT} °C
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">정상상태 예상 온도 (T_ss)</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                  {steadyStateT.toFixed(1)} °C
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  T_amb + P × R_th
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">열적 시정수 (τ = R_th × C_th)</div>
                <div className="text-base font-bold font-mono text-emerald-700 mt-0.5">
                  {timeConst.toFixed(1)} 초
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  63.2% 도달 시간
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">유효 열저항 (R_th)</div>
                <div className="text-base font-bold font-mono text-sky-700 mt-0.5">
                  {activeRTh.toFixed(2)} K/W
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {fanActive ? '팬 가동 중' : '팬 미가동'}
                </div>
              </div>
            </div>

            {/* Quantitative Equilibrium Check */}
            <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-sky-950 flex items-center justify-between">
                <span>열평형 도달 진행도</span>
                <span className="font-mono">
                  {Math.min(100, Math.round(((currentTemp - ambientTemp) / (steadyStateT - ambientTemp || 1)) * 100))}%
                </span>
              </div>
              <div className="w-full h-2 bg-sky-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-600 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((currentTemp - ambientTemp) / (steadyStateT - ambientTemp || 1)) * 100))}%`
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-600">
                현재 방출 열류는 {currentDissipation}W로 입력 발열량({cpuPower}W)의 {Math.round((currentDissipation / (cpuPower || 1)) * 100)}% 입니다. 100%에 도달하면 완전한 열평형(정상상태)입니다.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={handleSaveToReport}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{savedBadge ? '✓ 보고서에 저장 완료!' : '현재 시뮬레이션 결과 보고서에 저장'}</span>
            </button>
            <button
              onClick={() => onNavigate('autocontrol')}
              className="w-full py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>다음 단계: 자동 냉각 제어 실험실로 이동</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Real Simulation Temperature Graph & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        
        {/* Playback Controls & Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              시간에 따른 CPU 온도 변화 곡선 (T vs t)
            </h3>
            <p className="text-xs text-slate-500">
              실제 1차 미분방정식 해석해로 계산된 데이터 곡선입니다 (X축: 시간 s, Y축: 온도 °C)
            </p>
          </div>

          {/* Playback toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white text-slate-900 rounded-md shadow-xs hover:bg-slate-50 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-sky-600" />}
                <span>{isPlaying ? '일시정지' : '실험 시작'}</span>
              </button>
              <button
                onClick={handleReset}
                title="처음으로 리셋"
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleFastForward}
                title="즉시 전체 완료"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-md transition-colors"
              >
                <FastForward className="w-3.5 h-3.5 text-sky-600" />
                <span>전체 계산</span>
              </button>
            </div>

            {/* Playback Speed Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              <span className="text-[10px] text-slate-500 px-1">배속:</span>
              {[1, 5, 20, 50].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    playbackSpeed === spd
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recharts Chart Viewport */}
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dataPoints}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
                domain={[Math.floor(ambientTemp - 5), Math.ceil(Math.max(steadyStateT, 70) + 10)]}
              />
              <Tooltip 
                formatter={(val: any) => [`${Number(val)?.toFixed(2) ?? val} °C`, 'CPU 온도']}
                labelFormatter={(label: any) => `경과 시간: ${label}초`}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderRadius: '8px', 
                  color: '#fff', 
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              {/* Steady-state asymptote line */}
              <ReferenceLine 
                y={steadyStateT} 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                label={{ 
                  value: `정상상태 목표 T_ss = ${steadyStateT.toFixed(1)}°C`, 
                  position: 'top', 
                  fill: '#d97706',
                  fontSize: 11
                }} 
              />
              {/* Ambient Temp Reference Line */}
              <ReferenceLine 
                y={ambientTemp} 
                stroke="#94a3b8" 
                strokeDasharray="2 2" 
                label={{ 
                  value: `주변온도 T_amb = ${ambientTemp}°C`, 
                  position: 'bottom', 
                  fill: '#64748b',
                  fontSize: 11
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#0284c7" 
                strokeWidth={2.5} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graph Legend & Status Note */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-sky-600 inline-block" />
              <span>실제 계산 온도 곡선 T(t)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-amber-500 inline-block" />
              <span>정상상태 점근선 (T_amb + P × R_th)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
              <span>주변 온도 (T_amb)</span>
            </span>
          </div>
          <div className="font-mono text-slate-600">
            현재 시간: {currentTime}s / {duration}s · 온도: {currentTemp.toFixed(1)}°C
          </div>
        </div>

      </div>

    </div>
  );
};
