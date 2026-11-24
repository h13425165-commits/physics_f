/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChallengeMission } from '../types';

export const CHALLENGE_MISSIONS: ChallengeMission[] = [
  {
    id: 'mission-1',
    title: '미션 1. 고부하 AI 연산 CPU 냉각 설계',
    subtitle: '발열량이 급증한 환경에서 열저항을 제어하여 목표 온도 이하로 유지하기',
    badge: '열저항 최적화',
    scenario: '새로운 AI 워크로드 실행으로 CPU 발열량이 기존 35W에서 65W로 대폭 증가했습니다. 주변 실내 온도는 30°C인 여름철 환경입니다. 허용 최고 온도는 반도체 수명을 위해 75°C 이하로 제한됩니다.',
    description: '방열판 크기와 히트파이프 구조를 고려하여 팬 작동 시의 열저항(R_th_on)과 팬 미작동 시의 열저항(R_th_off), 그리고 방열판 질량(열용량 C_th)을 알맞게 설계하세요.',
    initialParams: {
      cpuPower: 65,
      ambientTemp: 30,
      rThOff: 2.2,
      rThOn: 1.1, // 초기에는 30 + 65 * 1.1 = 101.5°C 로 실패 상태!
      cTh: 150,
      duration: 300,
      fanActive: true,
      fanPower: 2.0,
      initialTemp: 30
    },
    targetTempLimit: 75,
    maxAllowedEnergy: 900, // 300초 * 3W = 900J
    requirements: [
      '최고 온도 75°C 이하 유지 (ΔT = T_max - T_amb ≤ 45°C)',
      '팬 작동 상태 열저항 R_th_on ≤ 0.69 K/W 필요 (30 + 65 × 0.69 ≈ 74.85°C)',
      '실현 가능한 방열판 설계 범위 준수'
    ],
    hints: [
      '1단계 힌트: 정상상태 온도 공식 T_ss = T_amb + P × R_th 를 떠올려보세요.',
      '2단계 힌트: T_amb = 30°C, P = 65W이므로 T_ss ≤ 75°C가 되려면 65 × R_th ≤ 45 이어야 합니다. 즉 R_th ≤ 0.69 K/W 이하로 낮추어야 합니다.',
      '3단계 힌트: 알루미늄 핀 면적을 넓히고 구리 히트파이프를 추가하여 팬 ON 열저항을 0.5~0.65 K/W 수준으로 줄여보세요.'
    ]
  },
  {
    id: 'mission-2',
    title: '미션 2. 그린 데이터센터 냉각 에너지 절약',
    subtitle: '안전 온도를 지키면서 냉각 팬의 전력 소비량을 최소화하기',
    badge: '에너지 효율 극대화',
    scenario: '데이터센터 서버 1만 대에서 소비되는 냉각 에너지를 절약하는 미션입니다. CPU 발열량은 45W, 주변 온도는 25°C입니다. 온도는 반드시 70°C 이하로 유지해야 하며, 300초 동안 팬이 소비하는 에너지는 400 J 이하로 제한됩니다.',
    description: '팬을 무조건 풀가동하면 온도는 낮지만 에너지가 낭비됩니다. 방열판 자체의 자연 방열 성능(R_th_off)을 높이고 열용량(C_th)을 키워 팬 의존도를 줄이는 친환경 고효율 냉각을 설계하세요.',
    initialParams: {
      cpuPower: 45,
      ambientTemp: 25,
      rThOff: 1.8,
      rThOn: 0.6,
      cTh: 120,
      duration: 300,
      fanActive: false,
      fanPower: 1.5,
      initialTemp: 25
    },
    targetTempLimit: 70,
    maxAllowedEnergy: 400,
    requirements: [
      '최고 온도 70°C 이하 유지 (ΔT ≤ 45°C)',
      '300초간 팬 에너지 소비량 400 J 이하',
      '자연 방열 및 열용량 완충 효과 극대화'
    ],
    hints: [
      '1단계 힌트: 팬을 300초 내내 켜면 에너지 소비량이 1.5W × 300s = 450 J로 400 J 제한을 초과합니다.',
      '2단계 힌트: 팬을 끄고도 온도가 너무 치솟지 않도록 R_th_off를 1.0 K/W 이하로 개선하거나, 열용량 C_th를 300 J/K 이상으로 늘려 온도 상승 속도를 늦춰보세요.',
      '3단계 힌트: 팬 소비전력을 1.0W로 낮추거나, 팬 미작동 상태(R_th_off = 0.95 K/W)만으로도 25 + 45 × 0.95 = 67.75°C로 팬 없이 0 J로 클리어할 수도 있습니다!'
    ]
  },
  {
    id: 'mission-3',
    title: '미션 3. 슬림 노트북 순간 과열(서멀 스로틀링) 방어',
    subtitle: '두께 제약으로 작은 열용량을 가진 초경량 기기의 순간 발열 억제',
    badge: '과도 응답 제어',
    scenario: '초슬림 노트북은 내부 공간이 좁아 방열판 무게(열용량 C_th)를 80 J/K 이상 키우기 어렵습니다. 50W의 순간 터보 부스트가 걸릴 때 CPU 온도가 85°C를 넘으면 서멀 스로틀링(성능 강제 저하)이 발생합니다. 주변 온도는 25°C입니다.',
    description: '낮은 열용량으로 인해 온도가 급격히 상승하는 상황에서, 팬의 신속한 냉각 성능(R_th_on)과 방열판 설계를 조율하여 85°C 이하를 방어하세요.',
    initialParams: {
      cpuPower: 50,
      ambientTemp: 25,
      rThOff: 2.5,
      rThOn: 1.4, // 25 + 50 * 1.4 = 95°C 초과
      cTh: 80,
      duration: 200,
      fanActive: true,
      fanPower: 1.8,
      initialTemp: 25
    },
    targetTempLimit: 85,
    maxAllowedEnergy: 400,
    requirements: [
      '최고 온도 85°C 이하 유지',
      '열용량 C_th ≤ 100 J/K (초경량 슬림 폼팩터 제한)',
      '200초 동안 안정적인 정상상태 진입'
    ],
    hints: [
      '1단계 힌트: 열용량이 작으면 시정수 τ = R_th × C_th 가 작아져 온도가 매우 빠르게 상승합니다.',
      '2단계 힌트: 85°C 이하가 되려면 ΔT ≤ 60°C 입니다. 50W × R_th ≤ 60 이므로 팬 ON 열저항 R_th_on은 반드시 1.2 K/W 이하가 되어야 합니다.',
      '3단계 힌트: 팬 ON 열저항을 0.7~0.9 K/W 로 설정하고 열용량을 90~100 J/K 로 맞추면 안전하게 85°C 이하로 제어됩니다.'
    ]
  }
];
