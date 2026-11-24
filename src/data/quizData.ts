/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'heat_transfer',
    categoryLabel: '열전달 방식',
    type: 'multiple_choice',
    question: '컴퓨터의 CPU에서 발생한 열이 금속 방열판(히트싱크)을 거쳐 공기 중으로 배출되는 과정에서 일어나는 주된 열전달 방식의 연결로 가장 적절한 것은?',
    context: 'CPU 실리콘 다이 → 구리 베이스플레이트 → 알루미늄 핀 → 냉각 팬에 의한 주변 공기 흐름',
    options: [
      'CPU에서 방열판 내부로의 이동은 [전도], 방열판에서 흐르는 공기로의 전달은 [대류]',
      'CPU에서 방열판 내부로의 이동은 [대류], 방열판에서 흐르는 공기로의 전달은 [복사]',
      'CPU에서 방열판 내부로의 이동은 [복사], 방열판에서 흐르는 공기로의 전달은 [전도]',
      '모든 구간에서 전자기파에 의한 [복사]만으로 열이 이동한다'
    ],
    correctAnswer: 0,
    explanation: '고체 금속 내부나 고체 간 접촉면에서는 입자의 직접 이동 없이 진동 전달에 의한 [전도(Conduction)]가 일어나며, 방열판 표면에서 팬의 바람(유체)을 통해 열이 빠져나가는 것은 유체의 흐름에 의한 [대류(Convection, 특히 강제 대류)]입니다.',
    relatedConceptTab: 'concepts',
    conceptSectionId: 'heat-transfer'
  },
  {
    id: 2,
    category: 'first_law',
    categoryLabel: '열역학 제1법칙',
    type: 'ox',
    question: 'CPU와 같은 전자기기는 외부로 기계적인 일(W)을 하지 않으므로(W ≈ 0), 전기적으로 공급된 전력(P)은 내부 에너지 변화율(dU/dt)과 외부로 방출되는 열류(Q_out)의 합과 같다.',
    options: [
      'O (그렇다)',
      'X (아니다)'
    ],
    correctAnswer: 0,
    explanation: '열역학 제1법칙 Q = ΔU + W 에서 전자기기는 기계적 팽창이나 역학적 일(W)을 하지 않으므로 공급된 전기에너지는 100% 열에너지로 전환됩니다. 따라서 공급 열량률 P = dU/dt + dQ_out/dt 가 성립하며, 정상상태(dU/dt=0)에 도달하면 공급 전력과 외부 방출 열량이 완전히 같아집니다.',
    relatedConceptTab: 'concepts',
    conceptSectionId: 'first-law'
  },
  {
    id: 3,
    category: 'thermal_resistance',
    categoryLabel: '열저항 계산',
    type: 'calculation',
    question: '발열량이 P = 40W인 CPU에 열저항 R_th = 0.8 K/W 인 쿨러를 장착하고 주변 온도가 T_amb = 25°C 인 환경에서 장시간 가동했을 때, 정상상태(Steady-state)에서의 CPU 온도는 몇 °C인가?',
    options: [
      '32°C',
      '57°C',
      '65°C',
      '75°C'
    ],
    correctAnswer: 1,
    explanation: '정상상태 온도 상승 공식 ΔT = P × R_th 입니다. ΔT = 40W × 0.8 K/W = 32 K(=32°C) 입니다. 따라서 정상상태 CPU 온도 T = T_amb + ΔT = 25°C + 32°C = 57°C 가 됩니다.',
    relatedConceptTab: 'concepts',
    conceptSectionId: 'thermal-resistance'
  },
  {
    id: 4,
    category: 'heat_capacity',
    categoryLabel: '열용량과 시정수',
    type: 'graph_interpretation',
    question: '두 개의 방열 시스템 A와 B의 열저항 R_th는 동일하지만, B의 방열판 질량이 훨씬 커서 열용량 C_th가 A의 2배이다. 동일한 발열량 P를 가했을 때 시간에 따른 온도 변화에 대한 올바른 설명은?',
    options: [
      'B의 최종 정상상태 온도가 A보다 2배 더 높아진다.',
      'A와 B의 최종 정상상태 온도는 같지만, B가 정상상태에 도달하는 데 걸리는 시간이 더 길다.',
      '열용량이 크면 열저항도 자동으로 비례하여 증가하므로 B의 온도 상승 속도가 더 빠르다.',
      '열용량은 온도 변화와 무관하며 오직 냉각 팬의 회전 속도에 의해서만 결정된다.'
    ],
    correctAnswer: 1,
    explanation: '정상상태 온도 상승 ΔT = P × R_th 는 열저항에만 의존하므로 A와 B의 최종 온도는 동일합니다. 반면 열적 시정수 τ = R_th × C_th 는 B가 2배 더 큽니다. 시정수가 클수록 온도가 서서히 변하므로, B는 초기 급격한 온도 상승을 완충하며 정상상태에 도달하는 데 더 오랜 시간이 걸립니다.',
    relatedConceptTab: 'concepts',
    conceptSectionId: 'thermal-resistance'
  },
  {
    id: 5,
    category: 'auto_control',
    categoryLabel: '히스테리시스 제어',
    type: 'multiple_choice',
    question: '전자기기 냉각 팬의 자동 제어에서 단일 목표 온도(예: 60°C) 대신 상한(65°C ON)과 하한(55°C OFF)을 두는 히스테리시스(Hysteresis) 방식을 사용하는 주된 공학적 이유는 무엇인가?',
    options: [
      '팬의 최대 회전 속도(RPM)를 2배로 증가시키기 위해',
      '목표 온도 부근에서 팬이 아주 짧은 주기로 켜졌다 꺼졌다를 반복하는 채터링(Chattering) 현상을 방지하고 모터 수명을 보호하기 위해',
      '열역학 제2법칙에 의해 엔트로피가 감소하는 것을 막기 위해',
      'CPU의 발열량을 0W로 강제 억제하기 위해'
    ],
    correctAnswer: 1,
    explanation: '만약 60°C 단일 기준값만 있다면 온도가 60.01°C에서 켜지고 59.99°C에서 꺼지는 급격한 떨림 현상(채터링 Chattering)이 발생하여 소음이 심해지고 모터 스위칭 소자가 빠르게 마모됩니다. 상한과 하한 사이의 히스테리시스 폭(Hysteresis band, 10°C)을 두면 안정적인 온/오프 제어가 가능해집니다.',
    relatedConceptTab: 'autocontrol',
    conceptSectionId: 'hysteresis'
  },
  {
    id: 6,
    category: 'heat_transfer',
    categoryLabel: '히트 파이프 원리',
    type: 'multiple_choice',
    question: '노트북 및 고성능 그래픽카드에 사용되는 히트 파이프(Heat Pipe)가 구리 막대보다 수십~수백 배 뛰어난 열전달 성능을 보이는 핵심 물리 원리는 무엇인가?',
    options: [
      '내부 금속의 열팽창에 의한 기계적 진동',
      '내부 냉매(작동 유체)의 기화열과 응결열을 이용한 상변화 잠열(Latent Heat) 전달',
      '초전도 현상에 의한 무저항 전자 이동',
      '공기와의 단열 팽창에 의한 온도 급강하 현상'
    ],
    correctAnswer: 1,
    explanation: '교과서(그림 II-11)에서도 다루듯 히트 파이프 내부는 진공 상태에서 소량의 액체 냉매가 들어있습니다. 뜨거운 CPU 쪽에서 액체가 기화하면서 엄청난 기화열(잠열)을 흡수하고, 방열판 쪽으로 이동하여 응결하면서 열을 방출한 뒤 모세관 현상으로 되돌아오는 상변화 순환을 반복합니다.',
    relatedConceptTab: 'concepts',
    conceptSectionId: 'heat-pipe'
  },
  {
    id: 7,
    category: 'first_law',
    categoryLabel: '에너지 보존 및 전력',
    type: 'calculation',
    question: '소비전력 2.0W인 냉각 팬을 300초 동안 작동시켰을 때, 팬이 소비한 전기 에너지는 몇 J(줄)이며, 몇 Wh(와트시)인가?',
    options: [
      '600 J, 약 0.167 Wh',
      '150 J, 약 0.042 Wh',
      '300 J, 약 0.083 Wh',
      '1200 J, 약 0.333 Wh'
    ],
    correctAnswer: 0,
    explanation: '에너지 E = P × t = 2.0W × 300s = 600 J 입니다. 와트시(Wh)로 환산하면 1 Wh = 3600 J 이므로 600 / 3600 ≈ 0.167 Wh 가 됩니다. 전력(W)과 에너지(J, Wh)의 단위를 구별하는 것이 중요합니다.',
    relatedConceptTab: 'autocontrol',
    conceptSectionId: 'energy-calc'
  },
  {
    id: 8,
    category: 'thermal_resistance',
    categoryLabel: '전기-열 상사(Analogy)',
    type: 'multiple_choice',
    question: '전기회로와 열 시스템의 유사성을 비교할 때, 올바르게 짝지어지지 않은 것은?',
    options: [
      '전압 차이 (ΔV) — 온도 차이 (ΔT)',
      '전류 (I) — 열류 / 열 흐름률 (q 또는 P)',
      '전기저항 (R) — 열용량 (C_th)',
      '전기용량 (C) — 열용량 (C_th)'
    ],
    correctAnswer: 2,
    explanation: '전기저항(R)에 대응되는 열역학적 물리량은 열저항(R_th)입니다. 열용량(C_th)은 전하를 축적하는 전기용량(커패시턴스 C)에 대응됩니다. 옴의 법칙 ΔV = I × R 과 열전달 관계식 ΔT = P × R_th 가 완벽히 대응됩니다.',
    relatedConceptTab: 'concepts',
    conceptSectionId: 'rc-analogy'
  }
];
