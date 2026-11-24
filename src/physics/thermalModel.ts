/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SimulationParams,
  SimulationDataPoint,
  SimulationResult,
  AutoControlParams,
  AutoControlComparisonResult,
} from '../types';

/**
 * 전자기기 집중 열용량 모형 (Lumped Thermal Capacitance Model) 계산 엔진
 * 
 * 미분방정식:
 *   C_th * (dT/dt) = P - (T - T_amb) / R_th
 * 
 * 해석해(단일 시간 간격 dt 동안 P와 R_th가 일정할 때):
 *   T_next = T_amb + P * R_th + (T_current - T_amb - P * R_th) * exp(-dt / (R_th * C_th))
 */

export function calculateNextTemperature(
  tCurrent: number,
  tAmb: number,
  power: number,
  rTh: number,
  cTh: number,
  dt: number
): number {
  if (rTh <= 0 || cTh <= 0) return tAmb;
  const tSS = tAmb + power * rTh;
  const tau = rTh * cTh;
  const decay = Math.exp(-dt / tau);
  return tSS + (tCurrent - tSS) * decay;
}

export function calculateSteadyStateTemp(tAmb: number, power: number, rTh: number): number {
  return tAmb + power * rTh;
}

export function calculateTimeConstant(rTh: number, cTh: number): number {
  return rTh * cTh;
}

/**
 * 전체 시간 구간에 대한 시뮬레이션 계산
 * (정확한 1초 간격으로 샘플링하여 데이터 배열 생성)
 */
export function runSimulation(params: SimulationParams): SimulationResult {
  const {
    cpuPower,
    ambientTemp,
    rThOff,
    rThOn,
    cTh,
    duration,
    fanActive,
    fanPower,
    initialTemp = ambientTemp,
  } = params;

  // 팬 상태에 따른 유효 열저항 결정
  const activeRTh = fanActive ? rThOn : rThOff;
  const data: SimulationDataPoint[] = [];

  let currentTemp = initialTemp;
  let cumFanEnergy = 0;
  let maxTemp = currentTemp;
  let minTemp = currentTemp;
  let tempSum = 0;
  let fanOnSeconds = 0;

  // 시뮬레이션 샘플링 스텝 (기본 1초)
  const dt = 1;
  const totalSteps = Math.floor(duration / dt);

  for (let step = 0; step <= totalSteps; step++) {
    const time = step * dt;
    const deltaT = currentTemp - ambientTemp;
    const heatDissipation = deltaT / activeRTh;

    if (fanActive) {
      fanOnSeconds += dt;
      cumFanEnergy += fanPower * dt;
    }

    data.push({
      time,
      temperature: Number(currentTemp.toFixed(2)),
      deltaT: Number(deltaT.toFixed(2)),
      heatDissipation: Number(heatDissipation.toFixed(2)),
      fanState: fanActive,
      fanEnergy: Number(cumFanEnergy.toFixed(2)),
    });

    maxTemp = Math.max(maxTemp, currentTemp);
    minTemp = Math.min(minTemp, currentTemp);
    tempSum += currentTemp;

    // 다음 온도 계산
    currentTemp = calculateNextTemperature(currentTemp, ambientTemp, cpuPower, activeRTh, cTh, dt);
  }

  const steadyStateTemp = calculateSteadyStateTemp(ambientTemp, cpuPower, activeRTh);
  const timeConstant = calculateTimeConstant(activeRTh, cTh);
  const finalTemp = data[data.length - 1].temperature;
  const avgTemp = Number((tempSum / (totalSteps + 1)).toFixed(2));

  return {
    data,
    maxTemp: Number(maxTemp.toFixed(2)),
    minTemp: Number(minTemp.toFixed(2)),
    finalTemp: Number(finalTemp.toFixed(2)),
    avgTemp,
    steadyStateTemp: Number(steadyStateTemp.toFixed(2)),
    timeConstant: Number(timeConstant.toFixed(1)),
    fanOnTime: fanActive ? duration : 0,
    fanEnergyJoules: Number(cumFanEnergy.toFixed(1)),
    fanEnergyWh: Number((cumFanEnergy / 3600).toFixed(3)),
    timeOverLimit: 0,
  };
}

/**
 * 3가지 냉각 모드(항시 OFF, 항시 ON, 히스테리시스 자동 제어)를
 * 동일한 초기 조건과 물리 매개변수로 비교 시뮬레이션
 */
export function runAutoControlComparison(params: AutoControlParams): AutoControlComparisonResult {
  const {
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
    initialTemp = ambientTemp,
  } = params;

  const dt = 1; // 1초 간격
  const totalSteps = Math.floor(duration / dt);

  const offData: SimulationDataPoint[] = [];
  const onData: SimulationDataPoint[] = [];
  const autoData: SimulationDataPoint[] = [];
  const timePoints: number[] = [];

  // 상태 변수 초기화
  let tOff = initialTemp;
  let tOn = initialTemp;
  let tAuto = initialTemp;
  let autoFanState = false;

  let offMax = tOff, onMax = tOn, autoMax = tAuto;
  let offSum = 0, onSum = 0, autoSum = 0;
  let autoFanOnSec = 0;
  let offOverLimitSec = 0;
  let onOverLimitSec = 0;
  let autoOverLimitSec = 0;

  for (let step = 0; step <= totalSteps; step++) {
    const time = step * dt;
    timePoints.push(time);

    // 1. 팬 항상 OFF
    offData.push({
      time,
      temperature: Number(tOff.toFixed(2)),
      deltaT: Number((tOff - ambientTemp).toFixed(2)),
      heatDissipation: Number(((tOff - ambientTemp) / rThOff).toFixed(2)),
      fanState: false,
      fanEnergy: 0,
    });
    offMax = Math.max(offMax, tOff);
    offSum += tOff;
    if (tOff > tempLimit) offOverLimitSec += dt;

    // 2. 팬 항상 ON
    const onEnergy = fanPower * time;
    onData.push({
      time,
      temperature: Number(tOn.toFixed(2)),
      deltaT: Number((tOn - ambientTemp).toFixed(2)),
      heatDissipation: Number(((tOn - ambientTemp) / rThOn).toFixed(2)),
      fanState: true,
      fanEnergy: Number(onEnergy.toFixed(1)),
    });
    onMax = Math.max(onMax, tOn);
    onSum += tOn;
    if (tOn > tempLimit) onOverLimitSec += dt;

    // 3. 히스테리시스 자동 제어 (ON/OFF Hysteresis)
    if (tAuto >= tempHigh) {
      autoFanState = true;
    } else if (tAuto <= tempLow) {
      autoFanState = false;
    }

    if (autoFanState) {
      autoFanOnSec += dt;
    }

    const autoCumEnergy = fanPower * autoFanOnSec;
    const currentAutoRTh = autoFanState ? rThOn : rThOff;

    autoData.push({
      time,
      temperature: Number(tAuto.toFixed(2)),
      deltaT: Number((tAuto - ambientTemp).toFixed(2)),
      heatDissipation: Number(((tAuto - ambientTemp) / currentAutoRTh).toFixed(2)),
      fanState: autoFanState,
      fanEnergy: Number(autoCumEnergy.toFixed(1)),
    });
    autoMax = Math.max(autoMax, tAuto);
    autoSum += tAuto;
    if (tAuto > tempLimit) autoOverLimitSec += dt;

    // 다음 스텝 계산
    tOff = calculateNextTemperature(tOff, ambientTemp, cpuPower, rThOff, cTh, dt);
    tOn = calculateNextTemperature(tOn, ambientTemp, cpuPower, rThOn, cTh, dt);
    tAuto = calculateNextTemperature(tAuto, ambientTemp, cpuPower, currentAutoRTh, cTh, dt);
  }

  const offFinal = offData[offData.length - 1].temperature;
  const onFinal = onData[onData.length - 1].temperature;
  const autoFinal = autoData[autoData.length - 1].temperature;

  const count = totalSteps + 1;

  const offMetrics: SimulationResult = {
    data: offData,
    maxTemp: Number(offMax.toFixed(2)),
    minTemp: initialTemp,
    finalTemp: Number(offFinal.toFixed(2)),
    avgTemp: Number((offSum / count).toFixed(2)),
    steadyStateTemp: Number(calculateSteadyStateTemp(ambientTemp, cpuPower, rThOff).toFixed(2)),
    timeConstant: Number(calculateTimeConstant(rThOff, cTh).toFixed(1)),
    fanOnTime: 0,
    fanEnergyJoules: 0,
    fanEnergyWh: 0,
    timeOverLimit: offOverLimitSec,
  };

  const onMetrics: SimulationResult = {
    data: onData,
    maxTemp: Number(onMax.toFixed(2)),
    minTemp: initialTemp,
    finalTemp: Number(onFinal.toFixed(2)),
    avgTemp: Number((onSum / count).toFixed(2)),
    steadyStateTemp: Number(calculateSteadyStateTemp(ambientTemp, cpuPower, rThOn).toFixed(2)),
    timeConstant: Number(calculateTimeConstant(rThOn, cTh).toFixed(1)),
    fanOnTime: duration,
    fanEnergyJoules: Number((fanPower * duration).toFixed(1)),
    fanEnergyWh: Number(((fanPower * duration) / 3600).toFixed(3)),
    timeOverLimit: onOverLimitSec,
  };

  const autoFanEnergyJoules = fanPower * autoFanOnSec;
  const autoMetrics: SimulationResult = {
    data: autoData,
    maxTemp: Number(autoMax.toFixed(2)),
    minTemp: initialTemp,
    finalTemp: Number(autoFinal.toFixed(2)),
    avgTemp: Number((autoSum / count).toFixed(2)),
    steadyStateTemp: Number(calculateSteadyStateTemp(ambientTemp, cpuPower, rThOn).toFixed(2)), // 최소 하한
    timeConstant: Number(calculateTimeConstant(rThOn, cTh).toFixed(1)),
    fanOnTime: autoFanOnSec,
    fanEnergyJoules: Number(autoFanEnergyJoules.toFixed(1)),
    fanEnergyWh: Number((autoFanEnergyJoules / 3600).toFixed(3)),
    timeOverLimit: autoOverLimitSec,
  };

  // 공학적 분석 코멘터리 생성 (실제 시뮬레이션 결과에 기반)
  const energySavingsPercent = onMetrics.fanEnergyJoules > 0
    ? Math.round(((onMetrics.fanEnergyJoules - autoMetrics.fanEnergyJoules) / onMetrics.fanEnergyJoules) * 100)
    : 0;

  const fanDutyPercent = Math.round((autoFanOnSec / duration) * 100);

  let engineeringSummary = '';
  if (offMetrics.maxTemp > tempLimit && autoMetrics.maxTemp <= tempLimit) {
    engineeringSummary = `팬을 항시 끈 상태에서는 최고 온도가 ${offMetrics.maxTemp}°C에 도달하여 허용 기준(${tempLimit}°C)을 ${offOverLimitSec}초간 초과했습니다. 반면 자동 제어(히스테리시스) 방식을 적용하면 최고 온도를 ${autoMetrics.maxTemp}°C로 안전하게 제어하면서도, 팬 작동 시간을 전체의 ${fanDutyPercent}%(${autoFanOnSec}초)로 줄여 항시 작동 대비 전력 소비를 약 ${energySavingsPercent}% 절약할 수 있습니다.`;
  } else if (autoMetrics.maxTemp > tempLimit) {
    engineeringSummary = `현재 설정된 시작 온도(${tempHigh}°C) 또는 냉각 성능(R_th_on: ${rThOn}K/W)으로는 허용 기준(${tempLimit}°C)을 완전히 충족하지 못하고 ${autoOverLimitSec}초간 초과했습니다. 방열판 성능을 개선(R_th_on 낮춤)하거나 팬 시작 온도를 더 낮추는 재설계가 필요합니다.`;
  } else {
    engineeringSummary = `팬 항시 작동 시 온도는 ${onMetrics.maxTemp}°C로 가장 낮지만 팬 에너지(${onMetrics.fanEnergyJoules}J)가 지속적으로 소모됩니다. 히스테리시스 자동 제어는 온도를 ${tempLow}°C~${tempHigh}°C 사이로 유지하면서 팬 소비 에너지를 ${autoMetrics.fanEnergyJoules}J로 줄여 약 ${energySavingsPercent}%의 에너지를 절감하는 효율적인 공학적 절충(Trade-off)을 보여줍니다.`;
  }

  return {
    params,
    timeStep: dt,
    timePoints,
    offData,
    onData,
    autoData,
    offMetrics,
    onMetrics,
    autoMetrics,
    engineeringSummary,
  };
}

/**
 * 챌린지 미션 검증 엔진
 */
export function evaluateChallengeDesign(
  missionId: string,
  params: SimulationParams,
  targetTempLimit: number,
  maxAllowedEnergy: number
): {
  passed: boolean;
  score: number;
  tempPassed: boolean;
  energyPassed: boolean;
  stabilityScore: number;
  feasibilityScore: number;
  metrics: SimulationResult;
  feedback: string;
  engineeringAnalysis: string;
} {
  const sim = runSimulation(params);
  const tempPassed = sim.maxTemp <= targetTempLimit;
  const energyPassed = sim.fanEnergyJoules <= maxAllowedEnergy;

  // 안정성 점수: 정상상태 온도가 허용 한계보다 여유가 있는가?
  const margin = targetTempLimit - sim.maxTemp;
  let stabilityScore = 50;
  if (margin >= 5) stabilityScore = 95;
  else if (margin >= 2) stabilityScore = 80;
  else if (margin >= 0) stabilityScore = 70;
  else stabilityScore = Math.max(10, Math.round(50 + margin * 5));

  // 실현 가능성 점수: 현실적인 방열 부품 파라미터인가?
  let feasibilityScore = 85;
  if (params.rThOn < 0.3) feasibilityScore -= 15; // 너무 극단적인 액체질소급 수치 감점
  if (params.cTh > 400) feasibilityScore -= 10;   // 지나치게 무거운 방열판 감점
  if (params.rThOff < 1.0) feasibilityScore -= 15; // 팬 없이 너무 낮은 열저항은 거대 방열판 필요

  let totalScore = 0;
  if (tempPassed && energyPassed) {
    totalScore = Math.min(100, Math.round(60 + (stabilityScore * 0.2) + (feasibilityScore * 0.2)));
  } else if (tempPassed && !energyPassed) {
    totalScore = Math.round(45 + stabilityScore * 0.2);
  } else if (!tempPassed && energyPassed) {
    totalScore = Math.round(40 + feasibilityScore * 0.2);
  } else {
    totalScore = Math.max(20, Math.round(30 - (sim.maxTemp - targetTempLimit) * 2));
  }

  const passed = tempPassed && energyPassed;

  let feedback = '';
  let engineeringAnalysis = '';

  if (passed) {
    feedback = `축하합니다! 최고 온도 ${sim.maxTemp}°C(기준: ${targetTempLimit}°C 이하)와 에너지 소비 ${sim.fanEnergyJoules}J(기준: ${maxAllowedEnergy}J 이하)를 모두 성공적으로 충족했습니다.`;
    engineeringAnalysis = `물리적 분석: 열저항 R_th=${params.fanActive ? params.rThOn : params.rThOff}K/W 설계를 통해 발열량 P=${params.cpuPower}W에 대한 정상상태 온도 상승을 ΔT=${(params.cpuPower * (params.fanActive ? params.rThOn : params.rThOff)).toFixed(1)}°C로 성공적으로 억제했습니다. 열용량 C_th=${params.cTh}J/K는 초기 급격한 온도 상승을 완충하는 데 기여했습니다.`;
  } else if (!tempPassed && energyPassed) {
    feedback = `에너지 기준(${sim.fanEnergyJoules}J <= ${maxAllowedEnergy}J)은 충족했으나, 최고 온도(${sim.maxTemp}°C)가 허용 한계(${targetTempLimit}°C)를 ${Math.abs(Number(margin.toFixed(1)))}°C 초과했습니다.`;
    engineeringAnalysis = `힌트: 정상상태 온도 T_ss = T_amb + P * R_th 입니다. 온도를 낮추기 위해서는 열저항(R_th)을 더 낮추거나 팬을 적절히 가동해야 합니다.`;
  } else if (tempPassed && !energyPassed) {
    feedback = `온도 기준(${sim.maxTemp}°C <= ${targetTempLimit}°C)은 만족했으나, 팬 에너지 소비량(${sim.fanEnergyJoules}J)이 허용 기준(${maxAllowedEnergy}J)을 초과했습니다.`;
    engineeringAnalysis = `힌트: 냉각 팬을 계속 가동하면 온도는 낮아지지만 에너지가 과다 소모됩니다. 자연 방열(방열판 크기 또는 열용량 확대)을 활용하여 팬 가동 시간이나 소비전력을 줄여보세요.`;
  } else {
    feedback = `온도(${sim.maxTemp}°C > ${targetTempLimit}°C)와 에너지(${sim.fanEnergyJoules}J > ${maxAllowedEnergy}J) 모두 기준을 초과했습니다.`;
    engineeringAnalysis = `힌트: 열용량 C_th를 높여 온도 상승 속도를 지연시키고, 팬 ON 열저항 R_th_on을 낮추는 종합적인 방열 구조 개선이 필요합니다.`;
  }

  return {
    passed,
    score: totalScore,
    tempPassed,
    energyPassed,
    stabilityScore,
    feasibilityScore,
    metrics: sim,
    feedback,
    engineeringAnalysis,
  };
}
