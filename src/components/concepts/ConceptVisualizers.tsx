/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { VisualizerType } from '../../types/concepts';
import { 
  Flame, 
  Wind, 
  Zap, 
  RotateCcw, 
  Play, 
  Pause, 
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface VisualizerProps {
  type: VisualizerType;
  promptText: string;
}

export const ConceptVisualizer: React.FC<VisualizerProps> = ({ type, promptText }) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wide">
          <Activity className="w-4 h-4 text-sky-400" />
          인터랙티브 물리 실험대 (STEP 4)
        </span>
        <span className="text-xs text-slate-400 font-mono">
          변수를 직접 조작하며 물리적 변화를 관찰하세요
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
        💡 {promptText}
      </p>

      {/* Render Specific Visualizer by Type */}
      {type === 'conduction_rod' && <ConductionRodSim />}
      {type === 'specific_heat' && <SpecificHeatSim />}
      {type === 'gas_piston' && <GasPistonSim />}
      {type === 'thermo_processes' && <ThermoProcessesSim />}
      {type === 'carnot_engine' && <CarnotEngineSim />}
      {type === 'entropy_diffusion' && <EntropyDiffusionSim />}
      {type === 'rc_thermal_analogy' && <RCThermalSim />}
      {type === 'heat_pipe_latent' && <HeatPipeSim />}
      {type === 'thermal_expansion' && <ThermalExpansionSim />}
    </div>
  );
};

/* 1. 열전도 막대 시뮬레이터 */
const MATERIALS: Record<string, { name: string; k: number; color: string }> = {
  copper: { name: '구리 (Copper)', k: 400, color: '#f97316' },
  aluminum: { name: '알루미늄 (Aluminum)', k: 237, color: '#94a3b8' },
  iron: { name: '철 (Iron)', k: 80, color: '#64748b' },
  glass: { name: '유리 (Glass)', k: 0.8, color: '#38bdf8' },
  air: { name: '공기 (Air)', k: 0.026, color: '#cbd5e1' },
};

const ConductionRodSim: React.FC = () => {
  const [tHot, setTHot] = useState<number>(80);
  const [tCold, setTCold] = useState<number>(20);
  const [materialKey, setMaterialKey] = useState<string>('copper');
  const [lengthCm, setLengthCm] = useState<number>(20); // 20cm = 0.2m

  const currentMat = MATERIALS[materialKey];
  const areaM2 = 0.0004; // 2cm x 2cm = 0.0004 m^2
  const lengthM = lengthCm / 100;
  // Fourier Heat flow Q/t = k * A * (T1 - T2) / L
  const heatFluxWatts = Number(((currentMat.k * areaM2 * (tHot - tCold)) / lengthM).toFixed(2));

  return (
    <div className="space-y-4">
      {/* Visual Rod Canvas */}
      <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-amber-400 font-bold">고온부 T₁ = {tHot}°C</span>
          <span className="text-slate-400 font-mono">길이 L = {lengthCm}cm</span>
          <span className="text-sky-400 font-bold">저온부 T₂ = {tCold}°C</span>
        </div>

        {/* The Rod with Dynamic Gradient */}
        <div 
          className="h-14 w-full rounded-lg shadow-inner border border-slate-700 flex items-center justify-between px-3 relative overflow-hidden"
          style={{
            background: `linear-gradient(to right, rgb(${Math.min(255, 100 + tHot * 1.8)}, 50, 40), rgb(30, 80, ${Math.min(255, 150 + tCold * 2)}))`
          }}
        >
          {/* Animated arrows moving along temperature gradient */}
          <div className="absolute inset-0 flex items-center justify-around opacity-70 pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <span key={i} className="text-white font-bold text-xs animate-pulse">→</span>
            ))}
          </div>
          <span className="text-[11px] font-bold text-white z-10 drop-shadow">HOT (진동 격렬)</span>
          <span className="text-[11px] font-bold text-white z-10 drop-shadow">COLD (진동 완만)</span>
        </div>

        {/* Heat Flow Result HUD */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-800">
          <span className="text-slate-400">선택 재질: <strong className="text-white">{currentMat.name}</strong> (k = {currentMat.k} W/m·K)</span>
          <span className="font-mono text-emerald-400 font-bold">열전달률 (Q/t): {heatFluxWatts} W (J/s)</span>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="text-slate-300 block mb-1">고온부 T₁: <strong className="text-amber-400">{tHot}°C</strong></label>
          <input
            type="range"
            min="40"
            max="120"
            value={tHot}
            onChange={(e) => setTHot(Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded"
          />
        </div>

        <div>
          <label className="text-slate-300 block mb-1">저온부 T₂: <strong className="text-sky-400">{tCold}°C</strong></label>
          <input
            type="range"
            min="0"
            max="40"
            value={tCold}
            onChange={(e) => setTCold(Number(e.target.value))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded"
          />
        </div>

        <div>
          <label className="text-slate-300 block mb-1">막대 길이 L: <strong className="text-white">{lengthCm}cm</strong></label>
          <input
            type="range"
            min="5"
            max="50"
            value={lengthCm}
            onChange={(e) => setLengthCm(Number(e.target.value))}
            className="w-full accent-slate-400 h-1.5 bg-slate-800 rounded"
          />
        </div>

        <div>
          <label className="text-slate-300 block mb-1">물질 종류:</label>
          <select
            value={materialKey}
            onChange={(e) => setMaterialKey(e.target.value)}
            className="w-full bg-slate-800 text-white rounded p-1.5 border border-slate-700 text-xs focus:outline-none"
          >
            {Object.entries(MATERIALS).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

/* 2. 비열과 열용량 비교 시뮬레이터 */
const SUBSTANCES = [
  { name: '물 (Water)', c: 4190, color: '#38bdf8' },
  { name: '알루미늄 (Aluminum)', c: 900, color: '#94a3b8' },
  { name: '철 (Iron)', c: 449, color: '#f59e0b' },
  { name: '구리 (Copper)', c: 385, color: '#f97316' },
];

const SpecificHeatSim: React.FC = () => {
  const [suppliedQ, setSuppliedQ] = useState<number>(3000); // J
  const [massG, setMassG] = useState<number>(100);          // 100g = 0.1kg
  const initialTemp = 20;

  const massKg = massG / 1000;

  return (
    <div className="space-y-4">
      {/* Visual comparison blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SUBSTANCES.map((sub) => {
          // ΔT = Q / (m * c)
          const deltaT = suppliedQ / (massKg * sub.c);
          const finalT = Number((initialTemp + deltaT).toFixed(1));

          return (
            <div key={sub.name} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block">{sub.name}</span>
              <div className="text-[10px] text-slate-500 font-mono">c = {sub.c} J/kg·K</div>

              {/* Simulated Thermometer */}
              <div className="relative w-6 h-28 bg-slate-800 rounded-full mx-auto p-0.5 flex flex-col justify-end overflow-hidden border border-slate-700">
                <div
                  className="w-full rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.min(100, (finalT / 120) * 100)}%`,
                    backgroundColor: sub.color
                  }}
                />
              </div>

              <div className="font-mono">
                <div className="text-sm font-bold text-amber-400">{finalT}°C</div>
                <div className="text-[10px] text-emerald-400">ΔT: +{deltaT.toFixed(1)}°C</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>공급 열량 Q:</span>
            <span className="font-mono text-amber-400 font-bold">{suppliedQ} J</span>
          </div>
          <input
            type="range"
            min="500"
            max="8000"
            step="250"
            value={suppliedQ}
            onChange={(e) => setSuppliedQ(Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>물질 질량 m:</span>
            <span className="font-mono text-emerald-400 font-bold">{massG} g (0.1kg)</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="10"
            value={massG}
            onChange={(e) => setMassG(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded"
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-400 text-center font-mono">
        💡 관찰: 비열이 가장 큰 물(4190)은 온도 상승이 가장 작고, 비열이 작은 금속(구리 385)은 온도가 급격히 상승합니다.
      </p>
    </div>
  );
};

/* 3. 이상 기체 및 보일-샤를 피스톤 시뮬레이터 */
const GasPistonSim: React.FC = () => {
  const [temperatureK, setTemperatureK] = useState<number>(300); // 300K = 27°C
  const [volumeL, setVolumeL] = useState<number>(10);            // 5 ~ 25L
  const nR = 8.314 * 0.4; // constant n*R

  // P = nRT / V
  const pressureKPa = Number(((nR * temperatureK) / volumeL).toFixed(1));

  return (
    <div className="space-y-4">
      {/* Piston Cylinder View */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
        <div className="w-full max-w-md h-40 bg-slate-900 border-2 border-slate-700 rounded-lg relative overflow-hidden flex">
          
          {/* Cylinder gas chamber */}
          <div 
            className="h-full bg-sky-950/40 relative flex items-center justify-center transition-all duration-300"
            style={{ width: `${(volumeL / 25) * 100}%` }}
          >
            {/* Visual gas particles bouncing */}
            <div className="text-[10px] text-sky-400/80 font-mono text-center">
              <div>기체 분자 수 일정 (n)</div>
              <div>평균 분자 운동속도 ∝ √T</div>
            </div>
          </div>

          {/* Movable Piston Head */}
          <div className="w-6 h-full bg-slate-600 border-r-2 border-slate-400 shadow-xl flex items-center justify-center">
            <span className="text-[9px] text-slate-300 font-bold -rotate-90">PISTON</span>
          </div>
        </div>

        {/* Live Gauges */}
        <div className="w-full max-w-md mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">압력 (P)</span>
            <span className="font-mono text-amber-400 font-bold text-sm">{pressureKPa} kPa</span>
          </div>
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">부피 (V)</span>
            <span className="font-mono text-sky-400 font-bold text-sm">{volumeL} L</span>
          </div>
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">절대온도 (T)</span>
            <span className="font-mono text-rose-400 font-bold text-sm">{temperatureK} K ({temperatureK - 273}°C)</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>피스톤 부피 V (보일 법칙 관찰):</span>
            <span className="font-mono text-sky-400 font-bold">{volumeL} L</span>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            value={volumeL}
            onChange={(e) => setVolumeL(Number(e.target.value))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>절대온도 T (샤를 법칙 관찰):</span>
            <span className="font-mono text-rose-400 font-bold">{temperatureK} K</span>
          </div>
          <input
            type="range"
            min="150"
            max="600"
            step="10"
            value={temperatureK}
            onChange={(e) => setTemperatureK(Number(e.target.value))}
            className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded"
          />
        </div>
      </div>
    </div>
  );
};

/* 4. 열역학 제1법칙 4대 과정 & P-V 그래프 시뮬레이터 */
const ThermoProcessesSim: React.FC = () => {
  const [process, setProcess] = useState<'isothermal' | 'isochoric' | 'isobaric' | 'adiabatic'>('isothermal');

  const processInfo = {
    isothermal: {
      name: '등온 팽창 (T=일정)',
      du: '0 (온도 일정)',
      w: '+120 J (외부에 일 함)',
      q: '+120 J (열 흡수 Q = W)',
      desc: '기체 온도가 일정하여 내부 에너지는 변하지 않고, 흡수한 열이 100% 외부에 한 일로 전환됩니다.'
    },
    isochoric: {
      name: '등적 가열 (V=일정)',
      du: '+150 J (온도 상승)',
      w: '0 (부피 변화 없음 W = 0)',
      q: '+150 J (열 흡수 Q = ΔU)',
      desc: '피스톤이 고정되어 외부에 한 일은 0이며, 가한 열이 100% 기체의 내부 에너지를 높여 압력이 급증합니다.'
    },
    isobaric: {
      name: '등압 팽창 (P=일정)',
      du: '+90 J (온도 상승)',
      w: '+60 J (부피 팽창 일)',
      q: '+150 J (Q = ΔU + W)',
      desc: '압력이 일정한 상태에서 열을 흡수하면 기체의 온도가 오르며(ΔU>0) 동시에 부피가 팽창하여 외부에 일(W>0)을 합니다.'
    },
    adiabatic: {
      name: '단열 팽창 (Q=0)',
      du: '-80 J (온도 강하)',
      w: '+80 J (외부에 일 함)',
      q: '0 (열 출입 차단)',
      desc: '외부와의 열 교환이 없으므로 기체가 외부에 일을 하면 내부 에너지가 깎여 기체 온도가 급격히 떨어집니다.'
    }
  };

  const curr = processInfo[process];

  return (
    <div className="space-y-4">
      {/* Process Selection Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {(['isothermal', 'isochoric', 'isobaric', 'adiabatic'] as const).map(p => (
          <button
            key={p}
            onClick={() => setProcess(p)}
            className={`p-2 rounded-lg font-bold border transition-colors ${
              process === p 
                ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {processInfo[p].name.split(' ')[0]} 과정
          </button>
        ))}
      </div>

      {/* Energy Balance Ledger */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
          <span>열역학 제1법칙 에너지 장부:</span>
          <span className="font-mono text-amber-400 font-bold">Q = ΔU + W</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">출입한 열 (Q)</span>
            <span className="font-mono font-bold text-amber-400 mt-1 block">{curr.q}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">내부 에너지 변화 (ΔU)</span>
            <span className="font-mono font-bold text-rose-400 mt-1 block">{curr.du}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-[10px] block">기체가 한 일 (W = PΔV)</span>
            <span className="font-mono font-bold text-sky-400 mt-1 block">{curr.w}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          {curr.desc}
        </p>
      </div>
    </div>
  );
};

/* 5. 카르노 기관 열효율 시뮬레이터 */
const CarnotEngineSim: React.FC = () => {
  const [t1Hot, setT1Hot] = useState<number>(600); // K
  const [t2Cold, setT2Cold] = useState<number>(300); // K
  const q1Input = 1000; // J

  const efficiency = Number((1 - t2Cold / t1Hot).toFixed(3));
  const workOutput = Number((q1Input * efficiency).toFixed(1));
  const q2Rejected = Number((q1Input - workOutput).toFixed(1));

  return (
    <div className="space-y-4">
      {/* Visual Energy Flow Diagram */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center space-y-3">
        {/* High Temp Reservoir */}
        <div className="w-56 bg-rose-950/80 border border-rose-600 rounded-lg p-2 text-center text-xs">
          <span className="text-rose-300 font-bold">고열원 (High-Temp T₁) = {t1Hot} K</span>
          <div className="text-[10px] text-slate-400 font-mono">공급 열량 Q₁ = {q1Input} J</div>
        </div>

        <div className="text-xs text-rose-400 font-bold">↓ Q₁ = {q1Input} J</div>

        {/* Engine and Work output */}
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-sky-400 flex flex-col items-center justify-center text-center text-xs shadow-lg">
            <span className="font-bold text-sky-300">카르노 기관</span>
            <span className="text-[10px] text-slate-400 font-mono">e = {(efficiency * 100).toFixed(1)}%</span>
          </div>

          <div className="text-xs font-mono text-emerald-400 font-bold bg-slate-900 px-3 py-2 rounded-lg border border-emerald-500/50">
            → 한 일 W = {workOutput} J
          </div>
        </div>

        <div className="text-xs text-sky-400 font-bold">↓ Q₂ = {q2Rejected} J (폐열 방출)</div>

        {/* Low Temp Reservoir */}
        <div className="w-56 bg-sky-950/80 border border-sky-600 rounded-lg p-2 text-center text-xs">
          <span className="text-sky-300 font-bold">저열원 (Low-Temp T₂) = {t2Cold} K</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>고열원 온도 T₁:</span>
            <span className="font-mono text-rose-400 font-bold">{t1Hot} K ({t1Hot - 273}°C)</span>
          </div>
          <input
            type="range"
            min="400"
            max="1200"
            step="20"
            value={t1Hot}
            onChange={(e) => setT1Hot(Math.max(t2Cold + 50, Number(e.target.value)))}
            className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>저열원 온도 T₂:</span>
            <span className="font-mono text-sky-400 font-bold">{t2Cold} K ({t2Cold - 273}°C)</span>
          </div>
          <input
            type="range"
            min="200"
            max="500"
            step="10"
            value={t2Cold}
            onChange={(e) => setT2Cold(Math.min(t1Hot - 50, Number(e.target.value)))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded"
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-400 text-center font-mono">
        💡 열효율 100%가 불가능한 이유: e = 1 - T₂/T₁ 에서 효율이 1이 되려면 T₂ = 0K(절대영도)이거나 T₁ = ∞ 이어야 하므로 현실적으로 불가능합니다.
      </p>
    </div>
  );
};

/* 6. 엔트로피 및 비가역 확산 시뮬레이터 */
const EntropyDiffusionSim: React.FC = () => {
  const [partitionRemoved, setPartitionRemoved] = useState<boolean>(false);
  const [leftCount, setLeftCount] = useState<number>(30);
  const [rightCount, setRightCount] = useState<number>(0);

  useEffect(() => {
    if (!partitionRemoved) {
      setLeftCount(30);
      setRightCount(0);
      return;
    }

    const timer = setInterval(() => {
      setLeftCount(prevLeft => {
        if (prevLeft > 15) {
          setRightCount(r => r + 1);
          return prevLeft - 1;
        }
        return prevLeft;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [partitionRemoved]);

  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-amber-400 font-mono">왼쪽 영역: {leftCount}개 분자</span>
          <button
            onClick={() => setPartitionRemoved(!partitionRemoved)}
            className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-bold"
          >
            {partitionRemoved ? '초기 상태로 리셋' : '칸막이 제거하기 (확산 시작)'}
          </button>
          <span className="text-sky-400 font-mono">오른쪽 영역: {rightCount}개 분자</span>
        </div>

        {/* Visual Box */}
        <div className="h-32 bg-slate-900 rounded-lg border-2 border-slate-700 flex relative overflow-hidden">
          {/* Left Chamber */}
          <div className="w-1/2 h-full flex flex-wrap gap-1 p-2 content-start overflow-hidden">
            {Array.from({ length: leftCount }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block" />
            ))}
          </div>

          {/* Central Partition */}
          {!partitionRemoved && (
            <div className="w-2 h-full bg-slate-400 border-x border-slate-600 z-10" />
          )}

          {/* Right Chamber */}
          <div className="w-1/2 h-full flex flex-wrap gap-1 p-2 content-start overflow-hidden bg-slate-950/40">
            {Array.from({ length: rightCount }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse inline-block" />
            ))}
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-300 font-mono text-center">
          {partitionRemoved 
            ? '▲ 엔트로피 증가: 분자가 고르게 퍼져 거시적 확률이 압도적으로 큰 평형 상태로 이동 (비가역 과정)'
            : '▲ 초기 질서 상태 (엔트로피 낮음, 칸막이로 차단됨)'}
        </div>
      </div>
    </div>
  );
};

/* 7. 반도체 발열 및 RC 열회로 상사성 시뮬레이터 */
const RCThermalSim: React.FC = () => {
  const [powerW, setPowerW] = useState<number>(30);
  const [rTh, setRTh] = useState<number>(1.0);
  const [cTh, setCTh] = useState<number>(100);

  const deltaT_ss = powerW * rTh;
  const tau = rTh * cTh;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-xl border border-sky-900/60 space-y-1">
          <span className="font-bold text-sky-400 block">전기 RC 회로</span>
          <div className="font-mono text-slate-300">인가 전류: I = {powerW} A</div>
          <div className="font-mono text-slate-300">전기저항: R = {rTh} Ω</div>
          <div className="font-mono text-slate-300">커패시턴스: C = {cTh} F</div>
          <div className="font-mono text-sky-300 font-bold">최종 충전 전압: V = I·R = {deltaT_ss} V</div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-amber-900/60 space-y-1">
          <span className="font-bold text-amber-400 block">열 시스템 (Thermal System)</span>
          <div className="font-mono text-slate-300">발열량: P = {powerW} W</div>
          <div className="font-mono text-slate-300">열저항: R_th = {rTh} K/W</div>
          <div className="font-mono text-slate-300">열용량: C_th = {cTh} J/K</div>
          <div className="font-mono text-amber-300 font-bold">최종 온도 상승: ΔT = P·R_th = {deltaT_ss} °C</div>
        </div>
      </div>

      <div className="text-xs text-center text-emerald-400 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800">
        열적 시정수 τ = R_th × C_th = {tau.toFixed(1)} 초 (63.2% 도달 시간)
      </div>
    </div>
  );
};

/* 8. 히트 파이프 잠열 순환 시뮬레이터 */
const HeatPipeSim: React.FC = () => {
  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-3">
      <div className="flex justify-between items-center text-slate-300 font-mono text-[11px]">
        <span className="text-rose-400">증발부 (CPU 핫스팟: 기화열 흡수)</span>
        <span className="text-sky-400">응축부 (방열핀: 응결열 방출)</span>
      </div>

      <div className="h-16 w-full bg-slate-900 rounded-lg border-2 border-amber-600 flex items-center justify-between px-4 relative overflow-hidden">
        <div className="text-rose-400 font-bold text-[11px] z-10">액체 → 기체 (기화)</div>
        <div className="flex-1 flex justify-center text-slate-400 text-xs font-mono">
          기체 냉매 고속 이동 ➔
        </div>
        <div className="text-sky-400 font-bold text-[11px] z-10">기체 → 액체 (응결)</div>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        ▲ 모세관 윅(Wick) 구조를 통해 액체 냉매가 다시 증발부로 환류하며, 단순 구리 막대보다 수십 배 높은 유효 열전도도를 발휘합니다.
      </p>
    </div>
  );
};

/* 9. 열팽창 시뮬레이터 */
const ThermalExpansionSim: React.FC = () => {
  const [deltaT, setDeltaT] = useState<number>(50); // °C
  const alpha = 23e-6; // 알루미늄 선팽창계수 (1/K)
  const l0 = 1.0; // 1m

  const deltaL_mm = Number((l0 * alpha * deltaT * 1000).toFixed(2));

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <div className="flex justify-between text-slate-300">
          <span>온도 변화 ΔT: <strong className="text-amber-400 font-mono">+{deltaT}°C</strong></span>
          <span className="font-mono text-emerald-400">늘어난 길이 ΔL: <strong>+{deltaL_mm} mm</strong></span>
        </div>
        <input
          type="range"
          min="0"
          max="150"
          value={deltaT}
          onChange={(e) => setDeltaT(Number(e.target.value))}
          className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded"
        />
        <div className="h-8 bg-slate-800 rounded border border-slate-700 flex items-center px-3 relative">
          <div 
            className="h-4 bg-amber-500 rounded transition-all duration-200"
            style={{ width: `${Math.min(100, 70 + (deltaT / 150) * 30)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
