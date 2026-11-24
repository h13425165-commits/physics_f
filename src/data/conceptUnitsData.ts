/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MajorUnit, ConceptItem } from '../types/concepts';

export const MAJOR_UNITS_DATA: MajorUnit[] = [
  {
    id: 'unit-1',
    unitNumber: '대단원 1',
    title: '열과 일',
    description: '열의 이동 방식, 비열과 열용량, 상태 변화와 기체 법칙, 그리고 에너지 보존을 나타내는 열역학 제1법칙을 학습합니다.',
    chapters: [
      {
        id: 'ch-01',
        unitId: 'unit-1',
        unitTitle: '열과 일',
        chapterNumber: '01',
        title: '열전달과 우리 생활',
        subtitle: '전도, 대류, 복사의 원리와 단열, 열팽창, CPU 방열판 기술',
        concepts: [
          {
            id: 'c-01-01',
            chapterId: 'ch-01',
            chapterTitle: '01. 열전달과 우리 생활',
            title: '열과 온도의 차이 및 열평형',
            difficulty: '기초',
            tags: ['온도', '열에너지', '열평형', '열운동'],
            objectives: [
              '온도와 열의 물리적 정의의 차이를 미시적 분자 운동 관점에서 설명할 수 있다.',
              '온도가 다른 두 물체가 접촉했을 때 일어나는 열평형 과정을 열역학적으로 서술할 수 있다.'
            ],
            coreExplanation: [
              '일상에서 "온도"와 "열"을 혼용하지만 물리학적으로 두 개념은 명확히 다릅니다.',
              '온도(Temperature)는 물질을 구성하는 분자들의 평균 운동 에너지를 나타내는 상태량입니다. 즉 온도가 높다는 것은 분자들의 불규칙한 무작위 열운동이 더 빠르고 격렬함을 의미합니다.',
              '열(Heat)은 온도가 다른 두 계(물체) 사이에 온도 차이로 인해 이동하는 에너지의 형태입니다. 물체는 "열을 가지고 있다"고 표현하지 않으며, "내부 에너지를 가지고 있고, 온도가 다를 때 열이 이동한다"고 표현합니다.',
              '온도가 높은 물체와 낮은 물체가 접촉하면, 고온 물체의 분자가 저온 물체의 분자와 충돌하여 에너지를 넘겨줍니다. 시간이 지나면 두 물체의 평균 운동 에너지가 같아져 더 이상 알짜 열 이동이 없는 열평형(Thermal Equilibrium) 상태에 도달합니다.'
            ],
            inDepthExplanation: [
              '열역학 제0법칙(Zeroth Law of Thermodynamics): 물체 A와 B가 각각 물체 C와 열평형 상태에 있다면, A와 B도 서로 열평형 상태에 있습니다. 이 법칙이 바로 "온도계"로 온도를 측정할 수 있는 물리학적 근거가 됩니다.',
              '절대온도(K)는 분자 운동이 이론적으로 정지하는 -273.15°C를 0K로 정의한 온도로, 기체의 평균 운동 에너지는 절대온도 T에 정비례합니다(E_k = (3/2)k_B·T).'
            ],
            keyTerms: [
              { term: '온도 (Temperature)', definition: '물체를 구성하는 입자들의 평균 열운동 에너지의 척도 (단위: °C, K)' },
              { term: '열 (Heat)', definition: '온도 차이에 의해 고온에서 저온으로 이동하는 에너지 (단위: J)' },
              { term: '열평형 (Thermal Equilibrium)', definition: '접촉한 두 물체의 온도가 같아져 알짜 열에너지 이동이 0이 된 상태' }
            ],
            visualizerType: 'conduction_rod',
            visualizerPrompt: '고온부와 저온부의 온도 차이를 조절하여 접촉 지점에서 열이 이동하여 평형을 이루어가는 과정을 확인해 보세요.',
            cases: [
              {
                title: '금속 의자와 천 의자의 체감 온도 차이',
                category: '일상생활',
                description: '겨울철 같은 방에 놓인 금속 의자와 천 의자는 열평형을 이루어 온도가 같지만, 금속이 손의 열을 훨씬 빠르게 빼앗아가므로 더 차갑게 느껴집니다.',
                connectionToPhysics: '온도가 같더라도 열전도도가 큰 물질이 손과 접촉할 때 초기 열전달률(Q/t)이 커서 차갑게 체감됩니다.'
              },
              {
                title: '전자기기 온도 센서(Thermistor)의 열평형 측정',
                category: '전기전자공학',
                description: 'CPU 내부의 디지털 온도 다이오드는 실리콘 다이와 열평형을 이룰 때의 전압-전류 특성을 측정하여 온도를 감지합니다.',
                connectionToPhysics: '센서가 피측정체와 정확한 열평형 상태에 도달해야 올바른 칩 온도를 보고할 수 있습니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-01-01-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '열과 온도의 개념에 대한 설명으로 물리학적으로 가장 올바른 것은?',
                options: [
                  '온도는 물체가 보유하고 있는 총 열에너지의 양을 의미한다.',
                  '열은 온도가 같은 두 물체 사이에서도 질량 차이에 의해 이동한다.',
                  '온도는 분자들의 평균 열운동 에너지의 척도이며, 열은 온도차에 의해 이동하는 에너지이다.',
                  '물체의 질량이 2배가 되면 온도도 항상 2배가 된다.'
                ],
                correctAnswer: 2,
                explanation: '온도는 입자 1개당 평균 운동 에너지 척도이며, 열은 온도가 다른 두 물체 사이에서 이동하는 에너지의 형태입니다.'
              },
              {
                id: 'q-01-01-2',
                type: 'formula',
                typeLabel: '원리 적용',
                question: '온도가 80°C인 쇠구슬을 20°C의 물이 담긴 단열 용기에 넣고 충분한 시간이 흘렀을 때 일어나는 현상으로 옳은 것은?',
                options: [
                  '쇠구슬과 물의 최종 온도는 각각 80°C와 20°C를 유지한다.',
                  '쇠구슬이 잃은 열량은 물이 얻은 열량과 같으며 두 물체의 온도가 같아진다.',
                  '물이 쇠구슬로 열을 전달하여 쇠구슬의 온도가 100°C로 상승한다.',
                  '쇠구슬의 모든 내부 에너지가 물로 이동하여 쇠구슬의 절대온도는 0K가 된다.'
                ],
                correctAnswer: 1,
                explanation: '외부 열 출입이 차단된 단열 용기에서 고온의 쇠구슬이 방출한 열량은 저온의 물이 흡수한 열량과 같으며 최종적으로 열평형 온도에 도달합니다.'
              },
              {
                id: 'q-01-01-3',
                type: 'experiment',
                typeLabel: '실험 예측',
                question: '질량과 온도가 같은 알루미늄 블록과 구리 블록을 각각 80°C 온수 속에 동시에 넣었을 때 열평형에 도달하는 거동에 대한 설명은?',
                options: [
                  '두 금속 모두 온도가 같아질 때까지 온수로부터 열을 흡수하며, 비열이 작은 구리가 알루미늄보다 더 빠르게 온도가 상승한다.',
                  '두 금속은 온수보다 온도가 더 높아진 후 식는다.',
                  '비열이 큰 물질일수록 적은 열량으로도 온도가 빠르게 오른다.',
                  '열평형에 도달해도 두 금속의 최종 온도는 서로 다르다.'
                ],
                correctAnswer: 0,
                explanation: '온수와 열평형을 이룰 때까지 열을 흡수하며, 구리는 비열(385 J/kg·K)이 알루미늄(900 J/kg·K)보다 작아 같은 열량에서 온도가 더 빠르게 상승합니다.'
              }
            ],
            summaryPoints: [
              '온도는 물질 내부 분자들의 평균 열운동 속도의 척도입니다.',
              '열은 고온에서 저온으로 온도 차이에 의해 이동하는 에너지입니다.',
              '두 물체가 접촉하면 에너지를 교환하여 온도가 같아지는 열평형 상태에 도달합니다.'
            ],
            nextConceptId: 'c-01-02',
            simulatorPreset: {
              name: 'CPU 열평형 관찰 실험',
              description: '발열량이 일정한 CPU가 외기(25°C)와 열평형을 이룰 때까지의 온도 상승 관찰',
              params: { cpuPower: 35, ambientTemp: 25, fanActive: true, rThOn: 0.7, duration: 600 },
              targetTab: 'simulator'
            }
          },
          {
            id: 'c-01-02',
            chapterId: 'ch-01',
            chapterTitle: '01. 열전달과 우리 생활',
            title: '열전도와 푸리에 열전도 법칙',
            difficulty: '발전',
            tags: ['전도', '푸리에법칙', '열전도도', '방열'],
            objectives: [
              '고체 내부에서 일어나는 전도의 미시적 메커니즘을 설명할 수 있다.',
              '푸리에 열전도 법칙 수식을 이해하고 단면적, 두께, 재질에 따른 열전달량을 정량적으로 계산할 수 있다.'
            ],
            coreExplanation: [
              '전도(Conduction)는 물질을 구성하는 입자가 직접 이동하지 않고, 이웃한 입자들과의 충돌 및 격자 진동(Phonon) 전달을 통해 에너지가 전달되는 방식입니다.',
              '금속에서는 자유 전자가 자유롭게 이동하면서 에너지를 매우 신속하게 전달하므로 비금속보다 열전도도가 수백~수천 배 큽니다.',
              '푸리에 법칙에 따르면, 단위 시간당 전달되는 열량(열류 Q/t)은 단면적(A)과 양단의 온도차(T₁-T₂)에 비례하고, 이동 거리인 두께(L)에 반비례합니다.'
            ],
            inDepthExplanation: [
              '열전도율 식을 옴의 법칙(I = ΔV/R)과 비교하면, 열류(q = Q/t)는 전도 열저항 R_cond = L / (k·A)에 대해 q = ΔT / R_cond 로 완벽히 대응됩니다.',
              '따라서 방열 부품의 열전도를 극대화하려면 열전도도(k)가 큰 구리나 알루미늄을 쓰고, 단면적(A)을 넓히며, 열이 이동하는 두께(L)를 최대한 얇게 설계해야 합니다.'
            ],
            keyTerms: [
              { term: '열전도 (Conduction)', definition: '입자의 직접 이동 없이 이웃 입자와의 상호작용으로 열이 전달되는 현상' },
              { term: '열전도도 (Thermal Conductivity, k)', definition: '물질 고유의 열전달 능력을 나타내는 물리량 (W/m·K)' },
              { term: '푸리에 열전도 법칙', definition: 'Q = k·A·(ΔT/L)·t' }
            ],
            formula: {
              latex: 'Q = k \\cdot A \\cdot \\frac{T_1 - T_2}{L} \\cdot t',
              name: '푸리에 열전도 법칙 (Fourier\'s Law of Heat Conduction)',
              variables: [
                { symbol: 'Q', name: '이동한 열에너지', unit: 'J (줄)', description: '전도에 의해 이동한 총 열량' },
                { symbol: 'k', name: '열전도도', unit: 'W/(m·K)', description: '물질 고유의 열전도 특성 (구리: 400, 알루미늄: 237, 공기: 0.026)' },
                { symbol: 'A', name: '열전달 단면적', unit: 'm²', description: '열이 통과하는 표면적' },
                { symbol: 'T₁ - T₂', name: '양단 온도 차이', unit: 'K 또는 °C', description: '고온부와 저온부의 온도차' },
                { symbol: 'L', name: '열전달 거리 (두께)', unit: 'm', description: '열이 통과하는 물체의 두께' },
                { symbol: 't', name: '시간', unit: 's (초)', description: '열이 이동한 시간' }
              ],
              conditions: '1차원 정상상태 전도(온도 구배가 시간에 따라 일정할 때)',
              physicalMeaning: '온도 구배(ΔT/L)와 단면적(A), 재질의 열전도도(k)가 클수록 열이 빠르게 흐름',
              exampleProblem: {
                question: '단면적이 0.0004 m²(2cm × 2cm)이고 두께가 0.005 m(5mm)인 구리 베이스플레이트(k = 400 W/m·K)의 양단 온도차가 10°C일 때, 1초 동안 전달되는 열량은 몇 J인가?',
                given: 'k = 400 W/m·K, A = 0.0004 m², L = 0.005 m, ΔT = 10 K, t = 1 s',
                solution: 'Q = 400 × 0.0004 × (10 / 0.005) × 1 = 400 × 0.0004 × 2000 = 320 J',
                answer: '320 J (초당 320W의 열류 전달)'
              }
            },
            visualizerType: 'conduction_rod',
            visualizerPrompt: '재질(구리 vs 유리 vs 공기)을 바꿔보고 막대 길이를 줄였을 때 열류(W)가 어떻게 급증하는지 확인해 보세요.',
            cases: [
              {
                title: '서멀 컴파운드(Thermal Paste)의 공기층 제거 원리',
                category: '전기전자공학',
                description: 'CPU 다이와 방열판 금속 표면의 미세한 흠집 사이에 갇힌 공기(k=0.026 W/m·K)를 제거하고 열전도도가 수십 배 높은 페이스트(k=5~12 W/m·K)를 채웁니다.',
                connectionToPhysics: '공기층의 극도로 높은 열저항을 낮추어 칩에서 쿨러로의 전도 열전달량을 비약적으로 증가시킵니다.'
              },
              {
                title: '순수 구리 히트스프레더와 베이스플레이트',
                category: '전기전자공학',
                description: '고성능 쿨러는 알루미늄 대신 열전도도가 약 1.7배 높은 구리(k=400 W/m·K)를 CPU와 맞닿는 베이스에 배치합니다.',
                connectionToPhysics: '푸리에 법칙에 의해 동일한 단면적과 두께에서 k가 클수록 전달 열류 Q/t가 정비례하여 증가합니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-01-02-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '금속이 비금속(유리, 나무 등)에 비해 열전도도가 압도적으로 높은 물리적 이유는 무엇인가?',
                options: [
                  '금속 원자의 질량이 비금속보다 훨씬 무겁기 때문',
                  '금속 내부에 자유롭게 이동할 수 있는 자유 전자가 에너지를 빠르게 운반하기 때문',
                  '금속은 진공 속에서만 열을 전달하기 때문',
                  '금속 내부의 압력이 외부 대기압보다 항상 높기 때문'
                ],
                correctAnswer: 1,
                explanation: '금속 내부의 자유 전자는 격자 진동보다 훨씬 빠른 속도로 고온부에서 저온부로 에너지를 직접 운반하므로 열전도도가 매우 큽니다.'
              },
              {
                id: 'q-01-02-2',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '푸리에 법칙에 따라 방열판 베이스의 두께 L을 절반으로 줄이고, 접촉 단면적 A를 2배로 넓히면 열전달률(Q/t)은 몇 배가 되는가?',
                options: [
                  '변함없다 (1배)',
                  '2배',
                  '4배',
                  '8배'
                ],
                correctAnswer: 2,
                explanation: 'Q/t ∝ A / L 입니다. A가 2배, L이 1/2배가 되면 (2 / 0.5) = 4배로 열전달률이 증가합니다.'
              },
              {
                id: 'q-01-02-3',
                type: 'experiment',
                typeLabel: '실험 설계',
                question: '서멀 그리스를 바르지 않고 쿨러를 장착했을 때 CPU 온도가 급상승하는 현상을 푸리에 법칙으로 설명한 것으로 옳은 것은?',
                options: [
                  '접촉면 사이 미세한 틈새에 열전도도가 극히 낮은 공기(k=0.026)가 차서 유효 전도율이 급감하기 때문',
                  '쿨러 금속의 선팽창 계수가 0이 되기 때문',
                  'CPU가 외부에 일을 하지 못하게 방해하기 때문',
                  '주변 대기 온도가 자동으로 100°C로 상승하기 때문'
                ],
                correctAnswer: 0,
                explanation: '공기는 고체 금속에 비해 열전도도가 수천 배 낮아 훌륭한 단열재 역할을 합니다. 따라서 공기층이 차면 열이 빠져나가지 못하고 칩에 열이 축적됩니다.'
              }
            ],
            summaryPoints: [
              '전도는 고체 내부에서 입자의 진동과 자유 전자의 이동으로 열이 전달되는 방식입니다.',
              '푸리에 법칙: 열전달률은 단면적과 온도차에 비례하고, 두께에 반비례합니다.',
              '구리와 알루미늄은 높은 열전도도를 가져 전자기기 쿨러의 필수 소재입니다.'
            ],
            nextConceptId: 'c-01-03',
            simulatorPreset: {
              name: '열저항(R_th) 변화에 따른 CPU 온도 실험',
              description: '방열판 열저항을 2.0에서 0.7로 낮추었을 때의 냉각 효과 비교',
              params: { cpuPower: 45, rThOff: 2.5, rThOn: 0.6, fanActive: true, duration: 600 },
              targetTab: 'simulator'
            }
          },
          {
            id: 'c-01-03',
            chapterId: 'ch-01',
            chapterTitle: '01. 열전달과 우리 생활',
            title: '대류와 복사',
            difficulty: '발전',
            tags: ['대류', '복사', '강제대류', '방사율'],
            objectives: [
              '자연 대류와 강제 대류의 차이점을 유체 유동 메커니즘으로 설명할 수 있다.',
              '복사에 의한 전자기파 에너지 전달과 슈테판-볼츠만 법칙의 개념을 설명할 수 있다.'
            ],
            coreExplanation: [
              '대류(Convection)는 기체나 액체와 같은 유체가 직접 이동하면서 열을 전달하는 현상입니다. 가열된 유체는 팽창하여 밀도가 작아져 위로 뜨고, 차가운 유체가 아래로 내려오는 순환 흐름을 형성합니다.',
              '자연 대류(Natural Convection)는 팬 없이 온도 차이에 의한 부력만으로 일어나며, 강제 대류(Forced Convection)는 냉각 팬이나 펌프로 유체를 강제로 밀어붙여 열전달 계수를 10배 이상 비약적으로 향상시킵니다.',
              '복사(Radiation)는 물질 매개체 없이 빛(전자기파, 주로 적외선)의 형태로 에너지가 직접 방출되는 현상입니다. 절대영도(0K) 이상의 모든 물체는 표면에서 전자기파를 방출하며, 방출 에너지는 절대온도의 4제곱(T⁴)에 비례합니다.'
            ],
            inDepthExplanation: [
              '뉴턴의 냉각 법칙: 대류 열전달률은 q = h·A·(T_s - T_amb)로 기술됩니다. 여기서 h는 대류 열전달 계수로, 공기가 정체된 자연대류에서는 5~25 W/m²·K이지만 팬을 돌리면 50~250 W/m²·K로 급증합니다.',
              '흑체 복사(Blackbody Radiation): 표면의 방사율(ε)이 1인 이상적인 흑체는 슈테판-볼츠만 법칙 q = σ·A·T⁴에 따라 복사열을 방출합니다. 광택 금속은 ε ≈ 0.05에 불과하지만 흑색 코팅을 하면 ε ≈ 0.9로 복사 방열이 대폭 커집니다.'
            ],
            keyTerms: [
              { term: '대류 (Convection)', definition: '유체의 직접적인 순환 흐름에 의해 열에너지가 운반되는 과정' },
              { term: '강제 대류 (Forced Convection)', definition: '팬이나 펌프로 유체에 외력을 가해 빠른 유속으로 열을 전달하는 방식' },
              { term: '복사 (Radiation)', definition: '전자기파(주로 적외선)의 형태로 진공을 통해서도 전달되는 열에너지' },
              { term: '방사율 (Emissivity, ε)', definition: '물체 표면이 전자기파를 방출하는 능력을 0과 1 사이로 나타낸 비율' }
            ],
            visualizerType: 'conduction_rod',
            visualizerPrompt: '자연 대류 상태와 냉각 팬이 작동하는 강제 대류 상태의 열저항 및 열전달 계수 차이를 비교해 보세요.',
            cases: [
              {
                title: '컴퓨터 냉각 팬(PWM Fan)의 강제 대류',
                category: '전기전자공학',
                description: '방열판 핀 사이로 차가운 공기를 불어넣어 정체된 공기 경계층(Boundary Layer)을 깨뜨리고 대류 계수 h를 극대화합니다.',
                connectionToPhysics: '뉴턴 냉각 법칙에서 h가 커져 동일한 온도차에서도 단위 시간당 방출 열류 q가 비약적으로 증가합니다.'
              },
              {
                title: '팬리스 미니PC의 흑색 아노다이징(Black Anodizing) 하우징',
                category: '전기전자공학',
                description: '팬이 없는 무소음 전자기기 알루미늄 외피를 검은색으로 산화 처리하여 복사 방사율(ε)을 0.05에서 0.85로 17배 증가시킵니다.',
                connectionToPhysics: '슈테판-볼츠만 법칙에 의해 복사 방열 비중이 전체 냉각의 25% 이상으로 대폭 증가합니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-01-03-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '태양열이 진공인 우주 공간을 건너 지구에 도달하는 유일한 열전달 방식은 무엇인가?',
                options: [
                  '전도',
                  '대류',
                  '복사',
                  '단열 팽창'
                ],
                correctAnswer: 2,
                explanation: '진공 공간에는 입자가 없으므로 전도와 대류는 일어날 수 없으며, 전자기파 형태로 빛의 속도로 전파되는 복사(Radiation)만 가능합니다.'
              },
              {
                id: 'q-01-03-2',
                type: 'experiment',
                typeLabel: '실험 비교',
                question: '팬을 껐을 때(자연대류)와 켰을 때(강제대류)의 방열판 성능 변화로 올바른 것은?',
                options: [
                  '팬을 켜면 공기 유속이 증가하여 대류 열전달 계수 h가 커지므로 열저항이 감소한다.',
                  '팬을 켜면 방열판의 질량이 감소하여 열용량이 0이 된다.',
                  '팬을 켜면 복사 방사율이 0으로 떨어진다.',
                  '팬의 바람은 온도를 항상 절대영도(0K)로 만든다.'
                ],
                correctAnswer: 0,
                explanation: '냉각 팬은 방열판 표면의 공기 유속을 높여 대류 열전달 계수 h를 높이고, 결과적으로 대류 열저항 R_conv = 1/(h·A)를 크게 낮춥니다.'
              },
              {
                id: 'q-01-03-3',
                type: 'formula',
                typeLabel: '원리 적용',
                question: '슈테판-볼츠만 법칙에 따르면 절대온도 T가 300K에서 600K로 2배 상승했을 때, 표면에서 방출되는 단위 면적당 복사 에너지는 몇 배가 되는가?',
                options: [
                  '2배',
                  '4배',
                  '8배',
                  '16배'
                ],
                correctAnswer: 3,
                explanation: '복사 에너지는 절대온도의 4제곱에 비례(E ∝ T⁴)합니다. 온도가 2배가 되면 2⁴ = 16배로 급격히 증가합니다.'
              }
            ],
            summaryPoints: [
              '대류는 유체의 흐름으로 열이 전달되며, 팬을 쓰는 강제 대류는 자연 대류보다 열전달 계수가 훨씬 큽니다.',
              '복사는 매개체 없이 전자기파로 열이 전파되며 절대온도의 4제곱(T⁴)에 비례합니다.',
              '방열판은 핀 구조(대류 면적 극대화)와 흑색 표면(복사 방사율 향상)을 결합하여 냉각 효율을 극대화합니다.'
            ],
            nextConceptId: 'c-01-04',
            simulatorPreset: {
              name: '자연 대류 vs 강제 대류 비교 실험',
              description: '팬 OFF(자연대류 2.0 K/W)와 팬 ON(강제대류 0.7 K/W)의 온도 차이 확인',
              params: { cpuPower: 40, rThOff: 2.0, rThOn: 0.7, fanActive: false, duration: 900 },
              targetTab: 'autocontrol'
            }
          },
          {
            id: 'c-01-04',
            chapterId: 'ch-01',
            chapterTitle: '01. 열전달과 우리 생활',
            title: '단열과 열전달 (에어캡, 복층 유리)',
            difficulty: '기초',
            tags: ['단열', '복층유리', '에어캡', '열손실'],
            objectives: [
              '단열의 원리와 다양한 단열재의 물리적 특성을 설명할 수 있다.',
              '복층 유리와 패시브 하우스 등 일상과 건축 기술에 적용된 단열 기술을 분석할 수 있다.'
            ],
            coreExplanation: [
              '단열(Thermal Insulation)은 두 물체 또는 실내와 실외 사이의 열전달을 최대한 차단하여 온도를 일정하게 유지하는 기술입니다.',
              '공기는 열전도도가 k = 0.026 W/m·K로 매우 우수한 단열 물질입니다. 그러나 공기층이 넓으면 내부에서 "대류"가 발생하여 열을 운반해 버립니다.',
              '따라서 우수한 단열재(스타이로폼, 솜, 에어캡)는 미세한 기포 속에 공기를 가두어 <strong>대류의 발생을 억제</strong>함으로써 공기의 낮은 전도도 특성만을 극대화하는 원리를 사용합니다.'
            ],
            inDepthExplanation: [
              '복층 유리(Double Glazing Window): 유리 두 장 사이에 건조 공기나 열전도도가 공기보다 훨씬 낮은 아르곤(Ar, k=0.016) 가스를 채우고 간격을 12~16mm로 유지합니다. 간격이 너무 좁으면 전도가 일어나고, 너무 넓으면 내부 대류 롤(Roll)이 생기므로 최적 간격 설계가 핵심입니다.',
              '로이(Low-E) 유리: 유리 표면에 은(Ag) 박막을 코팅하여 가시광선은 투과시키고 실내 난방열인 원적외선 복사파는 반사하여 실내로 되돌려 보냅니다.'
            ],
            keyTerms: [
              { term: '단열 (Thermal Insulation)', definition: '전도, 대류, 복사에 의한 열의 이동을 최소화하는 기술' },
              { term: '단열재', definition: '열전도도가 매우 낮고 공기 대류를 억제하는 다공질 구조를 가진 물질' }
            ],
            visualizerType: 'conduction_rod',
            visualizerPrompt: '공기층과 유리 재질의 열전도도를 비교하여 단열재가 열류를 어떻게 막아내는지 확인해 보세요.',
            cases: [
              {
                title: '창문에 붙이는 뽁뽁이(에어캡)의 단열 메커니즘',
                category: '일상생활',
                description: '밀폐된 비닐 캡 안에 공기를 가두어 창문 표면의 전도 열손실과 차가운 공기의 대류를 동시에 억제하여 실내 온도를 2~3°C 보존합니다.',
                connectionToPhysics: '공기의 낮은 열전도도를 이용하되 밀폐 공간으로 대류를 원천 차단하는 전형적인 단열 원리입니다.'
              },
              {
                title: '전자기기 배터리팩의 방열-단열 복합 설계',
                category: '전기전자공학',
                description: '스마트폰 내부에서 뜨거운 AP 칩의 열이 리튬이온 배터리로 직접 전달되지 않도록 에어로겔(Aerogel) 단열 시트를 삽입합니다.',
                connectionToPhysics: '배터리의 열폭주(Thermal Runaway)를 방지하기 위해 칩 쪽은 외피로 열전도를 유도하고 배터리 쪽은 단열합니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-01-04-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '스티로폼이나 패딩솜이 탁월한 보온 효과를 내는 핵심 물리적 원리는?',
                options: [
                  '스스로 열을 발생시키는 발열 물질을 함유하고 있기 때문',
                  '미세한 그물망 구조 속에 공기를 가두어 대류를 막고 공기의 낮은 전도성을 활용하기 때문',
                  '빛의 속도로 에너지를 방출하기 때문',
                  '주변 기압을 진공 상태로 만들기 때문'
                ],
                correctAnswer: 1,
                explanation: '단열재는 미세한 공간에 공기를 포획하여 유체 이동(대류)을 원천 차단함으로써 공기 자체의 매우 낮은 열전도도를 극대화합니다.'
              },
              {
                id: 'q-01-04-2',
                type: 'formula',
                typeLabel: '원리 적용',
                question: '단일 유리창(두께 5mm)을 같은 두께의 아르곤 가스층(열전도도 유리의 약 1/50)을 둔 복층 유리로 교체했을 때 전도 열손실량의 변화는?',
                options: [
                  '열손실량이 대폭 감소한다.',
                  '열손실량이 50배 증가한다.',
                  '아무런 변화가 없다.',
                  '실내 온도가 0K로 급랭된다.'
                ],
                correctAnswer: 0,
                explanation: '열전도도가 훨씬 작은 기체층이 삽입되면 총 열저항이 급증하여 전도 열손실량 Q = k·A·(ΔT/L)·t 가 대폭 줄어듭니다.'
              },
              {
                id: 'q-01-04-3',
                type: 'experiment',
                typeLabel: '실험 예측',
                question: '보온병 내부가 이중 벽 사이를 진공으로 비워두고 내벽을 은으로 도금한 이유에 대한 설명으로 옳은 것은?',
                options: [
                  '진공층은 전도와 대류를 차단하고, 은 도금은 복사열을 반사하여 3가지 열전달 방식을 모두 막기 위함이다.',
                  '오직 무게를 줄여 휴대성을 높이기 위함이다.',
                  '물이 증발하지 못하도록 압력을 높이기 위함이다.',
                  '차가운 물만 보관할 수 있게 하기 위함이다.'
                ],
                correctAnswer: 0,
                explanation: '진공은 매질이 없어 전도와 대류를 원천 차단하고, 은빛 거울면은 적외선 복사파를 반사하므로 전도·대류·복사 3대 열전달을 모두 차단하는 완벽한 단열 구조입니다.'
              }
            ],
            summaryPoints: [
              '단열은 전도, 대류, 복사에 의한 열 손실을 억제하는 기술입니다.',
              '공기는 뛰어난 단열체이나 대류를 방지해야 효과가 유지됩니다.',
              '보온병과 복층 유리는 복합적인 단열 원리를 결합한 대표적 공학 사례입니다.'
            ],
            nextConceptId: 'c-01-05'
          },
          {
            id: 'c-01-05',
            chapterId: 'ch-01',
            chapterTitle: '01. 열전달과 우리 생활',
            title: '열팽창과 선팽창 계수',
            difficulty: '발전',
            tags: ['열팽창', '선팽창계수', '바이메탈', '반도체패키징'],
            objectives: [
              '온도 상승에 따른 물질의 열팽창 원리를 입자 간 평균 거리 변화로 설명할 수 있다.',
              '선팽창 공식(ΔL = α·L₀·ΔT)을 이용하여 온도 변화에 따른 길이 변화를 계산할 수 있다.'
            ],
            coreExplanation: [
              '대부분의 고체 물질은 온도가 올라가면 길이와 부피가 팽창하는데 이를 열팽창(Thermal Expansion)이라고 합니다.',
              '미시적 원인: 원자 사이의 퍼텐셜 에너지 곡선은 비대칭적입니다. 온도가 올라가 원자의 진동 에너지가 커지면, 서로 밀어내는 반발력이 더 강하게 작용하여 원자 간 평균 거리가 증가합니다.',
              '고체의 길이 변화량(ΔL)은 처음 길이(L₀)와 온도 변화량(ΔT)에 비례하며, 비례 상수를 선팽창 계수(Linear Expansion Coefficient, α)라고 합니다.'
            ],
            inDepthExplanation: [
              '바이메탈(Bimetal): 선팽창 계수가 서로 다른 두 금속판을 맞붙여 놓으면 온도가 올라갈 때 팽창이 더 큰 쪽이 덜 팽창하는 쪽으로 휘어집니다. 이를 이용해 기계식 온도 스위치나 과전류 차단기를 만듭니다.',
              '철근 콘크리트의 기적: 철(α ≈ 12×10⁻⁶ /K)과 콘크리트(α ≈ 12×10⁻⁶ /K)의 선팽창 계수가 거의 완벽히 일치하기 때문에 사계절 온도 변화에도 균열 없이 거대한 건물이 유지될 수 있습니다.'
            ],
            keyTerms: [
              { term: '열팽창 (Thermal Expansion)', definition: '온도가 상승함에 따라 원자 간 평균 거리가 증가하여 부피나 길이가 늘어나는 현상' },
              { term: '선팽창 계수 (α)', definition: '온도가 1K(=1°C) 변할 때 처음 길이에 대해 늘어난 길이의 비율 (단위: 10⁻⁶ /K)' }
            ],
            formula: {
              latex: '\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T',
              name: '선팽창 공식 (Linear Thermal Expansion)',
              variables: [
                { symbol: 'ΔL', name: '늘어난 길이', unit: 'm', description: '온도 상승에 의한 길이 변화량' },
                { symbol: 'α', name: '선팽창 계수', unit: 'K⁻¹ 또는 °C⁻¹', description: '물질 고유의 팽창 특성 (철: 12×10⁻⁶, 알루미늄: 23×10⁻⁶)' },
                { symbol: 'L₀', name: '처음 길이', unit: 'm', description: '가열하기 전 고체의 초기 길이' },
                { symbol: 'ΔT', name: '온도 변화량', unit: 'K 또는 °C', description: 'T_final - T_initial' }
              ],
              conditions: '온도 변화 폭이 너무 크지 않은 고체 물질',
              physicalMeaning: '처음 길이가 길수록, 온도차가 클수록, 선팽창 계수가 큰 물질일수록 더 많이 늘어남',
              exampleProblem: {
                question: '길이가 100m인 철로(철의 선팽창계수 α = 12 × 10⁻⁶ /K)가 겨울(-10°C)에서 여름(40°C)으로 50°C 상승했을 때 늘어난 길이는 몇 cm인가?',
                given: 'L₀ = 100 m, α = 12 × 10⁻⁶ /K, ΔT = 50 K',
                solution: 'ΔL = (12 × 10⁻⁶) × 100 × 50 = 0.06 m = 6 cm',
                answer: '6 cm (따라서 철로 이음매 사이에 유격을 두어야 휘어짐을 방지할 수 있음)'
              }
            },
            visualizerType: 'thermal_expansion',
            visualizerPrompt: '온도 변화 슬라이더를 움직여 금속 막대의 선팽창량(mm)을 관찰해 보세요.',
            cases: [
              {
                title: '반도체 패키징의 열팽창 불일치(CTE Mismatch) 스트레스',
                category: '전기전자공학',
                description: '실리콘 다이(α ≈ 2.6×10⁻⁶)와 PCB 기판(α ≈ 15×10⁻⁶)의 팽창률 차이로 인해 가열/냉각 시 솔더볼(Solder Ball) 접합부에 피로 파괴가 발생할 수 있습니다.',
                connectionToPhysics: '선팽창 계수 차이에 의한 전단 응력을 완화하기 위해 언더필(Underfill) 수지를 주입합니다.'
              },
              {
                title: '철도 레일의 이음매 틈과 가스관 ㄷ자 벤드',
                category: '일상생활',
                description: '여름철 철로 레일이 팽창하여 휘어지는 사고를 막기 위해 일정한 틈새를 두며, 긴 파이프라인 중간에 ㄷ자형 곡관을 설치합니다.',
                connectionToPhysics: '선팽창 공식에 따라 계산된 최대 ΔL 만큼의 신축 여유 공간을 설계에 반영합니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-01-05-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '선팽창 계수가 큰 알루미늄판과 작은 철판을 맞붙여 만든 바이메탈을 가열했을 때 휘어지는 방향은?',
                options: [
                  '알루미늄 쪽으로 휜다.',
                  '철판 쪽으로 휜다.',
                  '전혀 휘지 않고 직선을 유지한다.',
                  '두 금속이 서로 분리된다.'
                ],
                correctAnswer: 1,
                explanation: '알루미늄이 철보다 길이가 더 많이 늘어나므로, 길이가 더 길어진 알루미늄이 바깥쪽을 이루며 상대적으로 덜 늘어난 철판 쪽으로 오목하게 휘어집니다.'
              },
              {
                id: 'q-01-05-2',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '선팽창 계수가 20 × 10⁻⁶ /K인 2m 길이의 구리관 온도가 30°C 상승했을 때 늘어난 길이는?',
                options: [
                  '0.6 mm',
                  '1.2 mm',
                  '2.4 mm',
                  '6.0 mm'
                ],
                correctAnswer: 1,
                explanation: 'ΔL = (20 × 10⁻⁶) × 2m × 30K = 0.0012 m = 1.2 mm 입니다.'
              },
              {
                id: 'q-01-05-3',
                type: 'experiment',
                typeLabel: '공학 적용',
                question: '컴퓨터 메인보드에 CPU 쿨러를 나사로 고정할 때 강철 스프링 나사를 사용하는 주된 물리적 이유는?',
                options: [
                  '쿨러의 무게를 가볍게 하기 위해',
                  'CPU 가열 시 발생하는 금속 및 기판의 열팽창/수축에도 일정한 접촉 압력을 유지하기 위해',
                  '전기 전도성을 높이기 위해',
                  '냉각 팬의 회전 속도를 올리기 위해'
                ],
                correctAnswer: 1,
                explanation: '부품들의 열팽창 계수 차이로 미세한 두께 변화가 발생해도 스프링의 탄성 복원력이 서멀 그리스 계면에 균일한 압력을 지속적으로 제공하여 들뜸을 방지합니다.'
              }
            ],
            summaryPoints: [
              '온도가 오르면 원자 간 평균 거리가 멀어져 열팽창이 일어납니다.',
              '길이 변화량은 ΔL = α·L₀·ΔT 로 계산됩니다.',
              '반도체 패키징과 건축 구조물 설계 시 부품 간 열팽창 계수의 정합성이 매우 중요합니다.'
            ],
            nextConceptId: 'c-01-06'
          },
          {
            id: 'c-01-06',
            chapterId: 'ch-01',
            chapterTitle: '01. 열전달과 우리 생활',
            title: 'CPU 방열판의 작동 원리와 핀(Fin) 구조',
            difficulty: '심화',
            tags: ['히트싱크', '방열핀', '열저항', '전자기기냉각'],
            objectives: [
              'CPU 방열판이 전도, 대류, 복사 원리를 어떻게 복합적으로 활용하는지 종합 설명할 수 있다.',
              '방열 핀의 표면적 증가가 총 열저항 감소에 미치는 영향을 정량적으로 분석할 수 있다.'
            ],
            coreExplanation: [
              'CPU 방열판(Heat Sink)은 손톱만 한 크기의 실리콘 칩(면적 약 1~4 cm²)에서 발생하는 고밀도 열을 넓은 공간으로 확산시켜 공기 중으로 방출하는 핵심 장치입니다.',
              '1단계(전도): 칩에서 발생한 열이 서멀 그리스를 거쳐 열전도도가 높은 구리 베이스플레이트로 빠르게 전도됩니다.',
              '2단계(확산 및 핀 전달): 구리 베이스에서 히트파이프나 촘촘한 수십 장의 알루미늄 방열 핀(Fins)으로 열이 퍼져나갑니다.',
              '3단계(강제 대류): 냉각 팬의 공기 흐름이 핀 사이를 고속으로 통과하면서 넓은 표면적(A)을 통해 대기로 열을 대류 방출합니다.'
            ],
            inDepthExplanation: [
              '대류 열저항 R_conv = 1 / (h·A) 공식에 따르면, 핀을 얇고 촘촘하게 배열하여 표면적 A를 100배(예: 0.001 m² → 0.1 m²) 넓히면 대류 열저항은 1/100로 급감합니다.',
              '그러나 핀 간격이 너무 좁으면 공기 유동 저항(압력 강하)이 커져 팬의 풍량이 줄어들므로, 유체역학적 최적 간격(일반적으로 1.5~2.5mm)을 유지해야 합니다.'
            ],
            keyTerms: [
              { term: '방열판 (Heat Sink)', definition: '열전달 표면적을 극대화하여 고체에서 유체로의 열 방출을 촉진하는 금속 구조물' },
              { term: '방열 핀 (Fins)', definition: '공기와 접촉하는 표면적을 넓히기 위해 얇게 돌출된 금속 날개 구조' }
            ],
            visualizerType: 'conduction_rod',
            visualizerPrompt: '방열 핀의 개수와 표면적 확장이 대류 열저항을 어떻게 줄여 CPU 온도를 떨어뜨리는지 실험해 보세요.',
            cases: [
              {
                title: '타워형 CPU 쿨러의 스택 알루미늄 핀 구조',
                category: '전기전자공학',
                description: '50장 이상의 알루미늄 핀을 촘촘히 적층하여 총 표면적을 0.3~0.5 m²(책상 절반 크기) 이상으로 확장합니다.',
                connectionToPhysics: '좁은 PC 케이스 안에서 핀 구조를 통해 유효 접촉 표면적 A를 기하급수적으로 확장하여 R_th를 0.2 K/W 이하로 낮춥니다.'
              },
              {
                title: '냉장고 뒷면의 방열 와이어 및 에어컨 실외기 핀',
                category: '일상생활',
                description: '냉매가 압축되면서 발생한 열을 실외 공기로 버리기 위해 얇은 알루미늄 핀과 팬을 조합하여 강제 대류 방열합니다.',
                connectionToPhysics: 'CPU 쿨러와 완전히 동일한 전도-강제대류 방열 시스템 구조입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-01-06-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '방열판을 통짜 금속 덩어리로 만들지 않고 얇은 핀(Fin) 구조로 촘촘히 제작하는 핵심 이유는?',
                options: [
                  '금속 내부의 자유 전자를 증발시키기 위해',
                  '공기와 접촉하는 유효 열전달 표면적(A)을 극대화하여 대류 열저항을 대폭 낮추기 위해',
                  '쿨러의 고유 진동수를 높여 음악 소리를 내기 위해',
                  '선팽창 계수를 0으로 고정하기 위해'
                ],
                correctAnswer: 1,
                explanation: '대류 열류 q = h·A·ΔT 이므로 표면적 A가 커질수록 같은 온도차에서 방출되는 열량이 정비례하여 증가합니다.'
              },
              {
                id: 'q-01-06-2',
                type: 'experiment',
                typeLabel: '실험 예측',
                question: 'CPU 발열량이 60W일 때, 방열 핀에 먼지가 꽉 차서 공기 유로가 막혔을 때 발생하는 현상으로 옳은 것은?',
                options: [
                  '공기 유속이 0이 되어 대류 계수 h가 급감하고 대류 열저항이 치솟아 CPU 온도가 급상승(과열)한다.',
                  '먼지가 열을 흡수하여 CPU 온도가 영하로 떨어진다.',
                  'CPU의 전력 소비량이 0W로 줄어든다.',
                  '팬의 회전 속도가 음수가 된다.'
                ],
                correctAnswer: 0,
                explanation: '먼지가 핀 사이를 막으면 강제 대류 흐름이 차단되어 대류 열저항 R_th가 급증하며, 정상상태 온도 공식 ΔT = P × R_th 에 의해 CPU가 과열됩니다.'
              },
              {
                id: 'q-01-06-3',
                type: 'formula',
                typeLabel: '수식 계산',
                question: '주변 온도가 25°C이고 CPU 발열량이 40W입니다. 쿨러 방열판의 전체 열저항이 R_th = 0.5 K/W 일 때 정상상태 CPU 온도는?',
                options: [
                  '20°C',
                  '45°C',
                  '65°C',
                  '85°C'
                ],
                correctAnswer: 1,
                explanation: 'ΔT = P × R_th = 40W × 0.5 K/W = 20°C 이며, 최종 온도 T = T_amb + ΔT = 25°C + 20°C = 45°C 입니다.'
              }
            ],
            summaryPoints: [
              'CPU 쿨러는 전도(베이스), 확산(히트파이프), 강제대류(방열핀+팬)가 결합된 종합 열관리 시스템입니다.',
              '핀 구조는 공기와의 접촉 표면적을 수백 배 넓혀 대류 열저항을 획기적으로 낮춥니다.',
              '열저항이 낮을수록 같은 CPU 발열량에서도 정상상태 온도를 안전하게 억제할 수 있습니다.'
            ],
            nextConceptId: 'c-02-01',
            simulatorPreset: {
              name: '방열판 핀 표면적 확장 시뮬레이션',
              description: '팬 ON 상태에서 열저항을 0.5 K/W 로 낮췄을 때 60W CPU 냉각 성능 관찰',
              params: { cpuPower: 60, rThOn: 0.5, rThOff: 1.8, fanActive: true, duration: 600 },
              targetTab: 'simulator'
            }
          }
        ]
      },
      {
        id: 'ch-02',
        unitId: 'unit-1',
        unitTitle: '열과 일',
        chapterNumber: '02',
        title: '물질의 상태 변화와 이상 기체',
        subtitle: '비열, 열용량, 잠열과 보일·샤를 법칙, 히트 파이프 냉매 순환',
        concepts: [
          {
            id: 'c-02-01',
            chapterId: 'ch-02',
            chapterTitle: '02. 물질의 상태 변화와 이상 기체',
            title: '비열과 열용량',
            difficulty: '기초',
            tags: ['비열', '열용량', 'Q=cmΔT', '시정수'],
            objectives: [
              '비열(c)과 열용량(C)의 개념을 정의하고 단위와 물리적 차이를 명확히 구분할 수 있다.',
              '열량 공식 Q = cmΔT = CΔT 를 적용하여 다양한 물질의 온도 변화를 계산할 수 있다.'
            ],
            coreExplanation: [
              '비열(Specific Heat, c)은 어떤 물질 <strong>1kg의 온도를 1K(=1°C) 올리는 데 필요한 열에너지</strong>입니다. 단위는 J/(kg·K)입니다.',
              '비열은 물질마다 고유한 특성값입니다. 예를 들어 물의 비열은 4190 J/kg·K로 자연계에서 매우 큰 편이며, 알루미늄은 900, 철은 449, 구리는 385 J/kg·K입니다.',
              '열용량(Heat Capacity, C)은 <strong>어떤 물체 전체의 온도를 1K 올리는 데 필요한 열량</strong>으로, 비열(c)에 물체의 질량(m)을 곱한 값(C = m·c)입니다. 단위는 J/K입니다.',
              '열용량이 큰 물체는 같은 양의 열을 가해도 온도가 천천히 변하므로, 열적 완충재(Thermal Mass) 역할을 합니다.'
            ],
            inDepthExplanation: [
              '열역학 제1법칙과 연결: 전자기기에 공급된 전력 P 중 외부로 방출되지 못한 열류는 고스란히 내부 에너지를 증가시키며, dU/dt = C_th · (dT/dt) 가 됩니다.',
              '따라서 방열판의 열용량 C_th가 클수록 온도 상승 속도(dT/dt = P_net / C_th)가 완만해져 순간적인 부하 스파이크 시 과열을 방어할 수 있습니다.'
            ],
            keyTerms: [
              { term: '비열 (Specific Heat, c)', definition: '물질 1kg의 온도를 1°C 높이는 데 필요한 열에너지 [J/(kg·K)]' },
              { term: '열용량 (Heat Capacity, C)', definition: '어떤 물체 전체의 온도를 1°C 높이는 데 필요한 열에너지 [J/K], C = m·c' }
            ],
            formula: {
              latex: 'Q = c \\cdot m \\cdot \\Delta T = C \\cdot \\Delta T',
              name: '열량 및 열용량 공식',
              variables: [
                { symbol: 'Q', name: '이동한 열량', unit: 'J', description: '물체가 흡수하거나 방출한 열에너지' },
                { symbol: 'c', name: '비열', unit: 'J/(kg·K)', description: '물질 고유의 비열' },
                { symbol: 'm', name: '질량', unit: 'kg', description: '물체의 질량' },
                { symbol: 'C', name: '열용량', unit: 'J/K', description: 'C = m × c' },
                { symbol: 'ΔT', name: '온도 변화량', unit: 'K 또는 °C', description: 'T_final - T_initial' }
              ],
              conditions: '상태 변화가 일어나지 않는 단일상 물질',
              physicalMeaning: '비열과 질량(열용량)이 클수록 같은 열을 받아도 온도 변화가 작음',
              exampleProblem: {
                question: '질량 0.5kg의 알루미늄 방열판(c = 900 J/kg·K)에 4500 J의 열을 공급했을 때 상승하는 온도 ΔT는 몇 °C인가?',
                given: 'm = 0.5 kg, c = 900 J/kg·K, Q = 4500 J',
                solution: '열용량 C = m × c = 0.5 × 900 = 450 J/K. ΔT = Q / C = 4500 / 450 = 10°C',
                answer: '10°C 상승'
              }
            },
            visualizerType: 'specific_heat',
            visualizerPrompt: '동일한 열량 Q를 공급했을 때 비열이 큰 물과 비열이 작은 금속들의 온도 상승률을 비교해 보세요.',
            cases: [
              {
                title: '해안 지역과 내륙 지역의 일교차 차이',
                category: '일상생활',
                description: '바다의 물은 비열(4190)이 모래나 흙(약 800)보다 훨씬 커서 낮에 태양열을 받아도 온도가 서서히 오르고 밤에도 천천히 식어 해안가는 연교차와 일교차가 작습니다.',
                connectionToPhysics: 'Q = cmΔT 에서 비열 c가 큰 물질은 온도 변화 ΔT가 매우 작게 유지됩니다.'
              },
              {
                title: '수랭식(Water Cooling) 쿨러의 탁월한 열 흡수 성능',
                category: '전기전자공학',
                description: '공기 대신 물을 순환시키는 수랭 쿨러는 냉매(물)의 비열이 공기보다 수천 배 높아 CPU의 고열을 급격한 온도 상승 없이 흡수합니다.',
                connectionToPhysics: '물의 거대한 비열과 유량 덕분에 워터블록 계면의 온도 상승을 극도로 억제할 수 있습니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-02-01-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '동일한 질량의 물과 철에 같은 양의 열에너지를 공급했을 때 철의 온도가 물보다 훨씬 더 빨리 치솟는 까닭은?',
                options: [
                  '철의 비열이 물의 비열보다 훨씬 작기 때문',
                  '철의 질량이 가열 도중 사라지기 때문',
                  '물이 외부에 더 많은 일을 하기 때문',
                  '철의 열용량이 무한대이기 때문'
                ],
                correctAnswer: 0,
                explanation: 'ΔT = Q / (m·c) 공식에서 물의 비열(4190)이 철의 비열(449)의 약 9배이므로, 철의 온도 상승량이 물보다 약 9배 큽니다.'
              },
              {
                id: 'q-02-01-2',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '열용량이 150 J/K인 CPU 쿨러에 30W의 발열이 10초 동안 외부 방출 없이 모두 축적되었다면, 온도는 몇 °C 상승하는가?',
                options: [
                  '1°C',
                  '2°C',
                  '5°C',
                  '15°C'
                ],
                correctAnswer: 1,
                explanation: '공급 열량 Q = P × t = 30W × 10s = 300 J. 온도 상승 ΔT = Q / C = 300 / 150 = 2°C 입니다.'
              },
              {
                id: 'q-02-01-3',
                type: 'experiment',
                typeLabel: '실험 설계',
                question: '방열판의 질량을 키워 열용량 C_th를 2배로 늘렸을 때 시뮬레이션 결과에 미치는 영향은?',
                options: [
                  '정상상태 최종 온도는 동일하지만, 최고 온도에 도달하는 시간(시정수 τ)이 2배로 길어져 초기 온도 상승이 완만해진다.',
                  '정상상태 온도가 절반으로 떨어진다.',
                  '냉각 팬의 소비전력이 2배 증가한다.',
                  'CPU 발열량이 자동으로 0W가 된다.'
                ],
                correctAnswer: 0,
                explanation: '최종 정상상태 온도 ΔT_ss = P × R_th 는 열용량과 무관하지만, 시정수 τ = R_th × C_th 가 2배가 되어 온도가 훨씬 천천히 완만하게 상승합니다.'
              }
            ],
            summaryPoints: [
              '비열(c)은 1kg을 1°C 올리는 열량이며, 열용량(C)은 물체 전체를 1°C 올리는 열량입니다.',
              '비열이 큰 물질은 같은 열을 받아도 온도 변화가 작습니다.',
              '방열판의 열용량은 단기 발열 스파이크를 흡수하는 완충 역할을 수행합니다.'
            ],
            nextConceptId: 'c-02-02',
            simulatorPreset: {
              name: '열용량(C_th) 완충 효과 비교 실험',
              description: '열용량을 50에서 350 J/K로 키웠을 때 온도 상승 곡선의 기울기 변화 관찰',
              params: { cpuPower: 50, cTh: 300, duration: 600 },
              targetTab: 'simulator'
            }
          },
          {
            id: 'c-02-02',
            chapterId: 'ch-02',
            chapterTitle: '02. 물질의 상태 변화와 이상 기체',
            title: '상태 변화와 잠열 (융해열, 기화열)',
            difficulty: '발전',
            tags: ['잠열', '상태변화', '기화열', '히트파이프'],
            objectives: [
              '물질이 상태 변화를 겪는 동안 온도가 일정하게 유지되는 물리적 이유를 입자 간 결합 에너지 관점에서 설명할 수 있다.',
              '잠열(Latent Heat)을 이용한 열에너지 저장 및 이동 기술의 원리를 분석할 수 있다.'
            ],
            coreExplanation: [
              '얼음이 녹아 물이 되거나(융해), 물이 끓어 수증기가 되는(기화) 상태 변화 동안에는 열을 계속 공급해도 온도가 변하지 않습니다.',
              '이때 가해 준 열에너지는 분자의 열운동 속도를 높여 온도를 올리는 데 쓰이지 않고, <strong>분자 사이의 인력을 끊고 배열을 바꾸는 데 100% 소비</strong>되기 때문입니다.',
              '물질 1kg이 온도의 변화 없이 상태가 변할 때 흡수하거나 방출하는 열량을 잠열(Latent Heat)이라고 합니다.',
              '기화열(Heat of Vaporization)은 융해열보다 훨씬 큽니다. 물의 기화열은 2.26 × 10⁶ J/kg(약 2260 kJ/kg)에 달해, 물 1kg을 1°C 올리는 데 필요한 열(4.19 kJ)의 500배가 넘는 엄청난 에너지를 기화 시 흡수합니다.'
            ],
            inDepthExplanation: [
              '상변화 물질(PCM, Phase Change Material): 특정 온도에서 고체-액체 상변화를 일으키며 대량의 잠열을 흡수/방출하는 물질로, 우주선 온도 제어나 건축용 스마트 단열재로 연구됩니다.',
              '스마트폰의 베이퍼 챔버(Vapor Chamber) 역시 내부 작동 유체가 기화열을 흡수하여 열을 평면 전체로 초고속 분산시킵니다.'
            ],
            keyTerms: [
              { term: '잠열 (Latent Heat)', definition: '물질의 상태가 변할 때 온도 변화 없이 흡수되거나 방출되는 열에너지' },
              { term: '기화열', definition: '액체가 기체로 변할 때 주위로부터 흡수하는 열량' },
              { term: '응결열', definition: '기체가 액체로 응축될 때 주위로 방출하는 열량' }
            ],
            formula: {
              latex: 'Q = m \\cdot L',
              name: '잠열 공식',
              variables: [
                { symbol: 'Q', name: '출입한 잠열량', unit: 'J', description: '상태 변화 시 흡수/방출된 총 열량' },
                { symbol: 'm', name: '상태 변화한 질량', unit: 'kg', description: '변화한 물질의 질량' },
                { symbol: 'L', name: '비잠열 (융해열 / 기화열)', unit: 'J/kg', description: '물질 고유의 잠열값 (물의 기화열: 2.26 × 10⁶ J/kg)' }
              ],
              conditions: '상태 변화가 진행 중인 상평형 구간 (녹는점, 끓는점)',
              physicalMeaning: '온도 변화 없이 오직 물질의 질량과 상변화 종류에 비례하여 열이 출입함',
              exampleProblem: {
                question: '100°C의 물 0.01kg(10g)이 완전히 100°C 수증기로 기화할 때 흡수하는 기화열은 몇 J인가? (물의 기화열 L_v = 2.26 × 10⁶ J/kg)',
                given: 'm = 0.01 kg, L_v = 2.26 × 10⁶ J/kg',
                solution: 'Q = m × L_v = 0.01 × 2.26 × 10⁶ = 22,600 J',
                answer: '22,600 J (22.6 kJ)'
              }
            },
            visualizerType: 'heat_pipe_latent',
            visualizerPrompt: '증발부에서 액체 냉매가 기화열을 흡수하고, 응축부에서 응결열을 방출하며 열을 운반하는 과정을 관찰하세요.',
            cases: [
              {
                title: '땀의 증발과 에어컨 냉매의 원리',
                category: '일상생활',
                description: '피부 표면의 땀 1방울이 기화할 때 피부로부터 막대한 기화열(2260 kJ/kg)을 빼앗아 가 체온을 떨어뜨립니다.',
                connectionToPhysics: '상태 변화 시 흡수되는 잠열을 활용한 대표적인 자연 냉각 메커니즘입니다.'
              },
              {
                title: '노트북 및 그래픽카드 히트 파이프(Heat Pipe)',
                category: '전기전자공학',
                description: '진공관 속 소량의 물/알코올 냉매가 CPU 핫스팟에서 순식간에 기화하며 열을 흡수하고, 방열판으로 이동해 액체로 응결하며 열을 방출합니다.',
                connectionToPhysics: '구리 봉의 단순 전도에 비해 잠열 순환을 이용하면 유효 열전도도가 수십~수백 배 급증합니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-02-02-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '0°C의 얼음이 녹아 0°C의 물이 되는 동안 계속 가열해도 온도가 변하지 않는 이유는?',
                options: [
                  '공급된 열에너지가 분자 간 결합 인력을 약화시키는 데 쓰이기 때문',
                  '얼음이 열을 외부로 즉시 반사하기 때문',
                  '분자의 평균 운동 에너지가 감소하기 때문',
                  '대기압이 순간적으로 0이 되기 때문'
                ],
                correctAnswer: 0,
                explanation: '상태 변화 구간에서 가해진 열은 분자의 운동 속도(온도)를 높이는 대신 분자 간 위치 에너지를 높여 결합을 끊는 잠열로 사용됩니다.'
              },
              {
                id: 'q-02-02-2',
                type: 'experiment',
                typeLabel: '원리 적용',
                question: '히트 파이프 내부를 고진공 상태로 감압해 두는 주된 물리적 이유는 무엇인가?',
                options: [
                  '압력이 낮아지면 냉매의 끓는점이 상온(30~50°C) 수준으로 낮아져 CPU 열로 쉽게 기화할 수 있기 때문',
                  '냉매가 팽창하여 파이프를 파괴하는 것을 막기 위해',
                  '공기를 채우면 열전도도가 무한대가 되기 때문',
                  '냉매를 고체 상태로 얼리기 위해'
                ],
                correctAnswer: 0,
                explanation: '밀폐 용기 내부 기압을 대기압(101 kPa)보다 훨씬 낮추면 물의 끓는점이 35~50°C 수준으로 떨어져 CPU가 발열하자마자 격렬한 기화 잠열 순환이 시작됩니다.'
              },
              {
                id: 'q-02-02-3',
                type: 'formula',
                typeLabel: '계산 적용',
                question: '100W의 CPU 열을 100% 물의 기화열(2.26 × 10⁶ J/kg)로만 흡수하여 증발시킨다면, 1초당 기화되는 물의 양은 약 얼마인가?',
                options: [
                  '약 0.044 g (44 mg)',
                  '약 4.4 g',
                  '약 44 g',
                  '약 440 g'
                ],
                correctAnswer: 0,
                explanation: '1초 동안 열량 Q = 100 J. 질량 m = Q / L_v = 100 / (2.26 × 10⁶) ≈ 4.42 × 10⁻⁵ kg = 0.0442 g 입니다. 극소량의 액체만으로도 100W를 거뜬히 운반합니다.'
              }
            ],
            summaryPoints: [
              '상태 변화 중에는 열을 흡수/방출해도 온도가 변하지 않으며, 이 출입 열을 잠열이라고 합니다.',
              '기화열은 융해열보다 훨씬 커서 대량의 열에너지를 빠르게 이동시킬 수 있습니다.',
              '히트 파이프는 내부 감압과 기화-응결 잠열 순환을 활용하여 초고속 열전달을 달성합니다.'
            ],
            nextConceptId: 'c-02-03'
          },
          {
            id: 'c-02-03',
            chapterId: 'ch-02',
            chapterTitle: '02. 물질의 상태 변화와 이상 기체',
            title: '보일 법칙, 샤를 법칙',
            difficulty: '발전',
            tags: ['보일법칙', '샤를법칙', '압력', '기체분자'],
            objectives: [
              '온도가 일정할 때 기체의 압력과 부피의 반비례 관계(보일 법칙)를 분자 충돌로 설명할 수 있다.',
              '압력이 일정할 때 기체의 절대온도와 부피의 비례 관계(샤를 법칙)를 설명할 수 있다.'
            ],
            coreExplanation: [
              '기체의 압력은 기체 분자들이 용기 벽면에 끊임없이 충돌하면서 단위 면적당 가하는 힘입니다.',
              '<strong>보일 법칙(Boyle\'s Law)</strong>: 온도가 일정할 때, 일정량 기체의 부피(V)를 절반으로 줄이면 분자들이 벽면에 충돌하는 빈도가 2배로 증가하여 압력(P)이 2배가 됩니다 (P·V = 일정).',
              '<strong>샤를 법칙(Charles\'s Law)</strong>: 압력이 일정할 때, 온도를 높이면 분자들의 평균 운동 속도가 빨라져 벽면을 더 세게, 더 자주 밉니다. 따라서 외부 압력과 균형을 맞추기 위해 기체의 부피가 팽창합니다 (V/T = 일정).'
            ],
            inDepthExplanation: [
              '절대영도의 발견: 샤를의 실험에서 기체의 부피-온도 그래프를 저온으로 외삽(연장)하면, 기체의 종류에 관계없이 모든 기체의 부피가 이론적으로 0이 되는 교점(-273.15°C = 0K)이 도출됩니다.',
              '온도와 압력의 관계(게이-뤼삭 법칙): 부피가 일정한 밀폐 용기에서 절대온도를 높이면 압력이 정비례하여 증가합니다 (P/T = 일정).'
            ],
            keyTerms: [
              { term: '기체의 압력 (P)', definition: '기체 분자가 용기 벽면과 충돌하여 단위 면적에 수직으로 작용하는 평균 힘 (Pa = N/m²)' },
              { term: '보일 법칙 (Boyle\'s Law)', definition: '온도가 일정할 때 기체의 압력과 부피는 반비례한다 (P₁V₁ = P₂V₂)' },
              { term: '샤를 법칙 (Charles\'s Law)', definition: '압력이 일정할 때 기체의 부피는 절대온도에 비례한다 (V₁/T₁ = V₂/T₂)' }
            ],
            formula: {
              latex: 'P_1 V_1 = P_2 V_2 \\quad (T=일정), \\quad \\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\quad (P=일정)',
              name: '보일 법칙 및 샤를 법칙',
              variables: [
                { symbol: 'P', name: '기체 압력', unit: 'Pa 또는 atm', description: '기체 분자의 충돌 압력' },
                { symbol: 'V', name: '기체 부피', unit: 'm³ 또는 L', description: '기체가 차지하는 공간의 크기' },
                { symbol: 'T', name: '절대온도', unit: 'K', description: '섭씨온도 + 273.15' }
              ],
              conditions: '기체 분자 수가 일정하고 이상 기체 모형을 따를 때',
              physicalMeaning: '부피 압축 시 충돌 빈도 증가, 온도 상승 시 분자 운동 에너지 증가로 인한 팽창',
              exampleProblem: {
                question: '27°C(300K)에서 부피가 2.0L인 주사기 속 기체를 압력을 일정하게 유지하면서 127°C(400K)로 가열했을 때 기체의 부피는?',
                given: 'T₁ = 300 K, V₁ = 2.0 L, T₂ = 400 K, P = 일정',
                solution: '샤를 법칙 V₁/T₁ = V₂/T₂ 에 대입: 2.0 / 300 = V₂ / 400. V₂ = 2.0 × (400 / 300) = 2.67 L',
                answer: '약 2.67 L'
              }
            },
            visualizerType: 'gas_piston',
            visualizerPrompt: '피스톤을 눌러 부피를 줄이거나 온도를 높였을 때 압력 게이지와 분자 운동이 어떻게 반응하는지 확인해 보세요.',
            cases: [
              {
                title: '높은 산에 올라갔을 때 과자 봉지의 팽창',
                category: '일상생활',
                description: '산 정상에 올라가면 주변 대기압이 낮아지므로, 봉지 내부 기체가 외부 압력과 같아질 때까지 부피가 팽창하여 빵빵해집니다.',
                connectionToPhysics: '보일 법칙: 외부 압력 P가 감소하면 내부 기체 부피 V가 증가합니다.'
              },
              {
                title: '겨울철 자동차 타이어 공기압 경고등',
                category: '일상생활',
                description: '기온이 영하로 떨어지면 타이어 속 공기의 부피가 고정된 상태에서 절대온도 T가 낮아져 압력 P가 줄어들어 공기압 경고가 뜹니다.',
                connectionToPhysics: '게이-뤼삭 관계: 부피 일정 시 기체의 압력은 절대온도에 비례합니다 (P ∝ T).'
              }
            ],
            quizzes: [
              {
                id: 'q-02-03-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '온도가 일정한 상태에서 주사기 피스톤을 눌러 부피를 1/3로 압축했을 때 기체의 압력은 어떻게 변하는가?',
                options: [
                  '1/3로 감소한다.',
                  '변함없이 일정하다.',
                  '3배로 증가한다.',
                  '9배로 증가한다.'
                ],
                correctAnswer: 2,
                explanation: '보일 법칙에 따라 온도가 일정할 때 P × V = 일정이므로, 부피가 1/3이 되면 압력은 3배가 됩니다.'
              },
              {
                id: 'q-02-03-2',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '0°C(273K)에서 부피가 10L인 기체가 있다. 압력을 일정하게 유지하면서 온도를 273°C(546K)로 올렸을 때 기체의 부피는?',
                options: [
                  '10L',
                  '15L',
                  '20L',
                  '40L'
                ],
                correctAnswer: 2,
                explanation: '샤를 법칙은 섭씨온도가 아닌 절대온도(K)에 비례합니다. 절대온도가 273K에서 546K로 2배가 되었으므로 부피도 2배인 20L가 됩니다.'
              },
              {
                id: 'q-02-03-3',
                type: 'experiment',
                typeLabel: '실험 해석',
                question: '밀폐된 금속 캔을 불 위에 올려 가열하면 폭발하는 까닭을 기체 분자 운동으로 가장 잘 설명한 것은?',
                options: [
                  '부피가 일정한 상태에서 온도가 오르면 분자의 평균 속도가 증가하여 캔 벽면에 가하는 충돌 충격력(압력)이 용기 한계를 초과하기 때문',
                  '금속 캔의 선팽창 계수가 0이 되기 때문',
                  '기체 분자의 질량이 100배 증가하기 때문',
                  '기체가 고체로 상태 변화하기 때문'
                ],
                correctAnswer: 0,
                explanation: '밀폐 용기(부피 일정)에서 온도 상승은 분자 운동에너지를 높여 벽면 충돌 압력을 급격히 치솟게 하므로 용기가 견디지 못하고 파열합니다.'
              }
            ],
            summaryPoints: [
              '보일 법칙: 온도가 일정할 때 기체의 압력과 부피는 반비례합니다 (PV = 일정).',
              '샤를 법칙: 압력이 일정할 때 기체의 부피는 절대온도에 정비례합니다 (V/T = 일정).',
              '이 법칙들은 이상 기체 상태 방정식의 기본 토대가 됩니다.'
            ],
            nextConceptId: 'c-02-04'
          },
          {
            id: 'c-02-04',
            chapterId: 'ch-02',
            chapterTitle: '02. 물질의 상태 변화와 이상 기체',
            title: '이상 기체 법칙 (PV = nRT)',
            difficulty: '심화',
            tags: ['이상기체', '상태방정식', '볼츠만상수', '분자운동론'],
            objectives: [
              '이상 기체의 가정(분자 자체 부피 무시, 인력/반발력 무시, 완전 탄성 충돌)을 설명할 수 있다.',
              '이상 기체 상태 방정식 PV = nRT = N·k_B·T 를 활용하여 압력, 부피, 온도, 몰수 간의 관계를 계산할 수 있다.'
            ],
            coreExplanation: [
              '보일 법칙(V ∝ 1/P), 샤를 법칙(V ∝ T), 아보가드로 법칙(V ∝ n)을 하나로 통합한 식이 바로 <strong>이상 기체 상태 방정식(Ideal Gas Law)</strong>입니다.',
              '이상 기체(Ideal Gas)는 다음을 가정한 가상의 물리 모형입니다:',
              '1. 기체 분자 자체의 크기(부피)는 용기 전체 부피에 비해 무시할 수 있다.',
              '2. 분자 사이에 인력이나 반발력이 작용하지 않는다.',
              '3. 분자 간 또는 용기 벽면과의 모든 충돌은 역학적 에너지가 보존되는 완전 탄성 충돌이다.',
              '실제 기체도 온도가 충분히 높고 압력이 매우 낮아 밀도가 희박한 조건에서는 이상 기체 법칙에 매우 잘 들어맞습니다.'
            ],
            inDepthExplanation: [
              '미시적 형태: PV = N·k_B·T (N: 총 분자 수, k_B: 볼츠만 상수 = 1.38 × 10⁻²³ J/K).',
              '기체의 내부 에너지: 단원자 분자 이상 기체의 내부 에너지는 분자들의 운동 에너지의 총합이므로 U = (3/2)nRT = (3/2)N·k_B·T 로 주어지며, 오직 "절대온도 T"에 의해서만 결정됩니다.'
            ],
            keyTerms: [
              { term: '이상 기체 (Ideal Gas)', definition: '분자 자체 부피와 분자 간 상호작용력을 무시한 단순화된 물리 모형' },
              { term: '기체 상수 (R)', definition: '8.314 J/(mol·K)' },
              { term: '볼츠만 상수 (k_B)', definition: '1.38 × 10⁻²³ J/K' }
            ],
            formula: {
              latex: 'P \\cdot V = n \\cdot R \\cdot T = N \\cdot k_B \\cdot T',
              name: '이상 기체 상태 방정식 (Ideal Gas Equation)',
              variables: [
                { symbol: 'P', name: '압력', unit: 'Pa (N/m²)', description: '기체의 압력' },
                { symbol: 'V', name: '부피', unit: 'm³', description: '기체가 차지하는 부피' },
                { symbol: 'n', name: '몰수', unit: 'mol', description: '기체 분자의 몰수' },
                { symbol: 'R', name: '기체 상수', unit: '8.314 J/(mol·K)', description: '보편 기체 상수' },
                { symbol: 'T', name: '절대온도', unit: 'K', description: '섭씨온도 + 273.15' }
              ],
              conditions: '고온 저압의 희박한 기체',
              physicalMeaning: '기체의 거시적 상태량(P, V, T)과 미시적 입자 수(n, N) 사이의 불변 관계식',
              exampleProblem: {
                question: '1몰의 이상 기체가 27°C(300K)에서 0.0249 m³의 부피를 가질 때의 압력은 약 몇 Pa인가? (R = 8.314 J/mol·K)',
                given: 'n = 1 mol, T = 300 K, V = 0.0249 m³',
                solution: 'P = nRT / V = (1 × 8.314 × 300) / 0.0249 = 2494.2 / 0.0249 ≈ 100,168 Pa ≈ 1 atm (1기압)',
                answer: '약 1.0 × 10⁵ Pa (약 1기압)'
              }
            },
            visualizerType: 'gas_piston',
            visualizerPrompt: '온도 T와 부피 V를 동시에 변화시키며 기체 상태 방정식이 만족되는 압력 궤적을 확인하세요.',
            cases: [
              {
                title: '열기구(Hot Air Balloon)의 부력 발생 원리',
                category: '일상생활',
                description: '기구 내부의 공기를 가열하면 압력이 대기압과 같게 유지된 상태에서 부피가 팽창하여 공기 일부가 밖으로 빠져나가며 내부 밀도가 작아져 떠오릅니다.',
                connectionToPhysics: 'PV = nRT에서 P가 일정할 때 T가 상승하면 동일 질량당 부피가 커져 밀도가 감소합니다.'
              },
              {
                title: '반도체 증착 공정(CVD)의 진공 챔버 가스 제어',
                category: '전기전자공학',
                description: '웨이퍼 표면에 원자층을 균일하게 증착하기 위해 초고진공 챔버 내부의 온도와 압력을 PV=nRT 법칙으로 정밀 제어합니다.',
                connectionToPhysics: '반응 가스의 몰수(n)와 유량을 온도 및 압력 측정을 통해 정밀하게 조절합니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-02-04-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '이상 기체 모형에 대한 설명으로 물리학적으로 타당한 것은?',
                options: [
                  '실제 기체와 달리 분자 간의 인력이나 반발력을 무시한다.',
                  '절대온도가 올라가면 분자 자체의 크기가 커진다.',
                  '분자 간 충돌 시 운동 에너지가 열로 소실된다.',
                  '저온 고압일수록 이상 기체 법칙에 더 잘 맞는다.'
                ],
                correctAnswer: 0,
                explanation: '이상 기체는 분자 자체의 크기를 점 입자로 취급하고 분자 간 상호작용력을 무시하여 수식을 단순화한 물리 모형입니다.'
              },
              {
                id: 'q-02-04-2',
                type: 'formula',
                typeLabel: '수식 계산',
                question: '밀폐 용기 속 기체의 절대온도가 2배가 되고 부피가 3배가 되었을 때 압력은 처음의 몇 배가 되는가?',
                options: [
                  '6배',
                  '2/3배',
                  '3/2배',
                  '변함없다'
                ],
                correctAnswer: 1,
                explanation: 'P = nRT / V 입니다. T가 2배, V가 3배가 되었으므로 P는 (2/3)배가 됩니다.'
              },
              {
                id: 'q-02-04-3',
                type: 'experiment',
                typeLabel: '원리 해석',
                question: '단원자 분자 이상 기체의 내부 에너지를 결정하는 유일한 물리량은 무엇인가?',
                options: [
                  '기체의 부피',
                  '기체의 절대온도',
                  '기체 용기의 모양',
                  '외부 대기압'
                ],
                correctAnswer: 1,
                explanation: '이상 기체는 분자 간 위치 에너지가 0이므로 내부 에너지는 오직 분자들의 병진 운동 에너지 총합(U = 3/2 nRT)이며, 절대온도 T에만 비례합니다.'
              }
            ],
            summaryPoints: [
              '이상 기체 상태 방정식은 PV = nRT 로 기술됩니다.',
              '실제 기체는 고온 저압일수록 이상 기체 법칙에 가깝게 거동합니다.',
              '이상 기체의 내부 에너지는 오직 절대온도(T)에 의해서만 결정됩니다.'
            ],
            nextConceptId: 'c-03-01'
          }
        ]
      },
      {
        id: 'ch-03',
        unitId: 'unit-1',
        unitTitle: '열과 일',
        chapterNumber: '03',
        title: '열역학 제1법칙',
        subtitle: '내부 에너지, 기체가 하는 일(W=PΔV), 4대 과정과 P-V 선도',
        concepts: [
          {
            id: 'c-03-01',
            chapterId: 'ch-03',
            chapterTitle: '03. 열역학 제1법칙',
            title: '내부 에너지와 기체가 하는 일 (W = PΔV)',
            difficulty: '기초',
            tags: ['내부에너지', '기체가하는일', 'PV선도', '팽창과압축'],
            objectives: [
              '기체의 내부 에너지(U)와 절대온도의 비례 관계를 설명할 수 있다.',
              '기체의 부피 변화와 압력에 의해 외부에 하는 일(W = P·ΔV)의 물리적 의미를 P-V 그래프 아래 넓이로 설명할 수 있다.'
            ],
            coreExplanation: [
              '기체의 내부 에너지(U)는 계 내부를 구성하는 모든 분자들의 무작위 운동 에너지(및 분자 간 상호작용 에너지)의 총합입니다. 이상 기체에서 내부 에너지는 오직 절대온도 T에 비례합니다.',
              '기체가 들어있는 실린더의 피스톤이 외부로 밀려나며 팽창하면, 기체는 외부에 일(W > 0)을 합니다.',
              '압력 P가 일정할 때 기체가 피스톤을 미는 힘은 F = P·A 이고, 피스톤이 이동한 거리를 ΔL이라 하면 한 일은 W = F·ΔL = P·(A·ΔL) = P·ΔV 가 됩니다.',
              '따라서 P-V(압력-부피) 그래프에서 <strong>곡선 아래의 면적은 기체가 외부에 한 일(W)</strong>을 나타냅니다. 부피가 팽창(ΔV > 0)하면 W > 0, 압축(ΔV < 0)되면 외부로부터 일을 받은 것(W < 0)입니다.'
            ],
            inDepthExplanation: [
              '공기 압축 점화 장치(교과서 그림 II-18): 피스톤을 순간적으로 힘껏 누르면 외부에서 기체에 급격히 일(W < 0)을 해 주어 기체의 내부 에너지가 폭발적으로 상승(온도 급상승)하고, 그 결과 바닥의 솜에 스스로 불이 붙습니다.',
              '부피 변화가 없으면(등적 과정, ΔV = 0) 피스톤이 움직이지 않으므로 기체가 외부에 한 일은 정확히 0입니다 (W = 0).'
            ],
            keyTerms: [
              { term: '내부 에너지 (U)', definition: '계 내부의 모든 분자들의 운동 에너지와 위치 에너지의 총합' },
              { term: '기체가 하는 일 (W)', definition: '기체가 팽창할 때 외부에 전달하는 역학적 일, W = P·ΔV (P-V 그래프 아래 넓이)' }
            ],
            formula: {
              latex: 'W = P \\cdot \\Delta V = P \\cdot (V_2 - V_1)',
              name: '기체가 하는 일 공식',
              variables: [
                { symbol: 'W', name: '기체가 외부에 한 일', unit: 'J', description: '기체의 부피 변화에 의한 역학적 일' },
                { symbol: 'P', name: '기체의 압력', unit: 'Pa (N/m²)', description: '기체가 피스톤에 가하는 압력' },
                { symbol: 'ΔV', name: '부피 변화량', unit: 'm³', description: 'V₂ - V₁ (팽창 시 양수, 압축 시 음수)' }
              ],
              conditions: '압력이 일정하게 유지되는 등압 과정 또는 미소 부피 변화',
              physicalMeaning: 'P-V 그래프에서 상태 변화 곡선 아래 면적이 바로 기체가 외부에 한 일',
              exampleProblem: {
                question: '압력이 2.0 × 10⁵ Pa(약 2기압)로 일정한 상태에서 기체의 부피가 0.01 m³에서 0.03 m³로 팽창했다면 기체가 외부에 한 일은 몇 J인가?',
                given: 'P = 2.0 × 10⁵ Pa, V₁ = 0.01 m³, V₂ = 0.03 m³',
                solution: 'ΔV = 0.03 - 0.01 = 0.02 m³. W = P × ΔV = 2.0 × 10⁵ × 0.02 = 4000 J',
                answer: '4000 J (4 kJ의 일을 외부에 함)'
              }
            },
            visualizerType: 'thermo_processes',
            visualizerPrompt: '등압 팽창 과정을 선택하여 피스톤이 밀려나며 외부에 일을 하는 모습과 에너지 장부를 확인하세요.',
            cases: [
              {
                title: '디젤 엔진의 압축 착화 원리',
                category: '일상생활',
                description: '실린더 내부의 공기를 피스톤으로 급격히 압축(일 W < 0 받음)하여 공기 온도를 500°C 이상으로 올린 후 연료를 분사해 점화 플러그 없이 자연 폭발시킵니다.',
                connectionToPhysics: '외부에서 기체에 해 준 역학적 일(W)이 내부 에너지를 급증시켜 온도를 폭등시키는 원리입니다.'
              },
              {
                title: '공압 액추에이터와 반도체 이송 로봇',
                category: '전기전자공학',
                description: '고압 공기의 팽창 일(W = P·ΔV)을 실린더 피스톤 운동으로 변환하여 정밀 웨이퍼 이송 로봇의 그리퍼를 구동합니다.',
                connectionToPhysics: '기체의 압력 에너지를 기계적 운동 일로 변환하는 공학적 응용입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-03-01-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '기체의 부피가 증가할 때(팽창)와 감소할 때(압축) 기체가 한 일의 부호로 올바른 것은?',
                options: [
                  '팽창: W > 0 (외부에 일 함), 압축: W < 0 (외부로부터 일 받음)',
                  '팽창: W < 0, 압축: W > 0',
                  '팽창과 압축 모두 항상 W = 0',
                  '팽창 시에는 온도가 무조건 절대영도가 된다'
                ],
                correctAnswer: 0,
                explanation: 'W = P·ΔV 이므로 부피가 늘어나면 외부에 일을 하여 W > 0 이고, 부피가 줄어들면 외부로부터 일을 받으므로 W < 0 입니다.'
              },
              {
                id: 'q-03-01-2',
                type: 'formula',
                typeLabel: '공식 적용',
                question: '압력-부피(P-V) 그래프에서 상태가 A에서 B로 변할 때 기체가 외부에 한 일을 구하는 방법은?',
                options: [
                  '곡선의 기울기를 구한다.',
                  '상태 A와 B 사이의 곡선 아래 면적(적분 넓이)을 구한다.',
                  '압력과 부피를 서로 더한다.',
                  '항상 0J이다.'
                ],
                correctAnswer: 1,
                explanation: '일의 정의 W = ∫ P dV 에 따라 P-V 평면에서 경로 곡선 아래쪽이 만드는 도형의 넓이가 바로 기체가 외부에 한 일의 양입니다.'
              },
              {
                id: 'q-03-01-3',
                type: 'experiment',
                typeLabel: '현상 분석',
                question: '부피가 일정한 강철 용기(ΔV = 0)에 갇힌 기체를 가열했을 때 기체가 외부에 한 일 W는 얼마인가?',
                options: [
                  '0 J',
                  '가열한 열량의 2배',
                  '무한대',
                  '-100 J'
                ],
                correctAnswer: 0,
                explanation: '부피 변화가 없으므로(ΔV = 0), 피스톤이 전혀 이동하지 않아 기체가 외부에 한 역학적 일은 정확히 0 J입니다.'
              }
            ],
            summaryPoints: [
              '기체의 내부 에너지는 분자 운동 에너지 총합이며 절대온도에 비례합니다.',
              '기체가 팽창하면 외부에 일(W = P·ΔV)을 하고, 압축되면 일을 받습니다.',
              'P-V 그래프 아래의 면적은 기체가 외부에 한 일의 크기입니다.'
            ],
            nextConceptId: 'c-03-02'
          },
          {
            id: 'c-03-02',
            chapterId: 'ch-03',
            chapterTitle: '03. 열역학 제1법칙',
            title: '열역학 제1법칙 (Q = ΔU + W)',
            difficulty: '발전',
            tags: ['열역학제1법칙', '에너지보존', '열과일', '계와환경'],
            objectives: [
              '열역학 제1법칙(Q = ΔU + W)의 의미와 각 항의 부호 규약을 설명할 수 있다.',
              '기체 계뿐만 아니라 전자기기(CPU)에서의 에너지 보존 관계를 정량적으로 비교 분석할 수 있다.'
            ],
            coreExplanation: [
              '열역학 제1법칙(First Law of Thermodynamics)은 열에너지를 포함한 <strong>에너지 보존 법칙</strong>입니다.',
              '계(System)에 외부로부터 열 Q를 가하면, 그 열은 계의 <strong>내부 에너지를 증가(ΔU)</strong>시키거나 계가 <strong>외부에 역학적인 일(W)</strong>을 하는 데 사용됩니다.',
              '부호 규약:',
              '• Q > 0: 계가 열을 흡수할 때 / Q < 0: 계가 열을 방출할 때',
              '• W > 0: 계가 외부에 일을 할 때(팽창) / W < 0: 외부로부터 일을 받을 때(압축)',
              '• ΔU > 0: 온도가 상승할 때 / ΔU < 0: 온도가 하강할 때',
              '전자기기(CPU)의 경우: 피스톤처럼 팽창하지 않으므로 외부에 하는 역학적 일은 W = 0입니다. 따라서 공급된 전기 전력 P는 전량 칩의 내부 에너지 증가(C_th·dT/dt)와 외부 방열(q_out)로 완벽히 보존됩니다.'
            ],
            inDepthExplanation: [
              '열역학 제1법칙의 미분형: dQ = dU + dW = n·C_v·dT + P·dV.',
              '제1종 영구기관(Perpetual Motion Machine of the 1st Kind)의 불가능성: 에너지를 외부로부터 공급받지 않고 스스로 계속해서 일을 해내는 기계는 열역학 제1법칙(에너지 보존)에 위배되므로 결코 제작할 수 없습니다.'
            ],
            keyTerms: [
              { term: '열역학 제1법칙', definition: '외부에서 가한 열은 내부 에너지 변화와 외부에 한 일의 합과 같다 (Q = ΔU + W)' },
              { term: '계 (System)', definition: '물리학적 관심의 대상이 되는 물질의 집합 (예: 실린더 속 기체, CPU 다이)' },
              { term: '주변 환경 (Surroundings)', definition: '계를 제외한 나머지 모든 외부 공간' }
            ],
            formula: {
              latex: 'Q = \\Delta U + W = \\Delta U + P \\cdot \\Delta V',
              name: '열역학 제1법칙 (First Law of Thermodynamics)',
              variables: [
                { symbol: 'Q', name: '계에 출입한 열량', unit: 'J', description: '흡수 시 (+), 방출 시 (-)' },
                { symbol: 'ΔU', name: '내부 에너지 변화량', unit: 'J', description: '온도 상승 시 (+), 하강 시 (-)' },
                { symbol: 'W', name: '계가 외부에 한 일', unit: 'J', description: '팽창 시 (+), 압축 시 (-)' }
              ],
              conditions: '모든 닫힌 열역학 계',
              physicalMeaning: '에너지는 형태만 바뀔 뿐 스스로 생성되거나 소멸되지 않는다 (에너지 보존)',
              exampleProblem: {
                question: '기체에 3000 J의 열을 공급하였더니 기체가 팽창하면서 외부에 1200 J의 일을 하였다. 기체의 내부 에너지는 어떻게 변하였는가?',
                given: 'Q = +3000 J, W = +1200 J',
                solution: 'Q = ΔU + W 에서 ΔU = Q - W = 3000 - 1200 = +1800 J',
                answer: '내부 에너지가 1800 J 만큼 증가하였다 (온도 상승)'
              }
            },
            visualizerType: 'thermo_processes',
            visualizerPrompt: '다양한 과정에서 Q, ΔU, W 사이의 에너지 밸런스가 어떻게 항상 일치하는지 확인해 보세요.',
            cases: [
              {
                title: '전자기기(CPU)의 100% 열 전환과 에너지 보존',
                category: '전기전자공학',
                description: 'CPU는 기계적 일을 하지 않으므로(W=0) 소비한 65W의 전력은 100% 열에너지로 바뀝니다. 이 열은 칩 온도를 올리거나(ΔU) 쿨러를 통해 공기 중으로 배출(Q_out)됩니다.',
                connectionToPhysics: '전기 에너지 입력 = 내부 에너지 변화량 + 외부 방출 열량 (열역학 제1법칙의 완벽한 적용).'
              },
              {
                title: '증기 기관(Steam Engine)의 열-일 전환',
                category: '일상생활',
                description: '석탄을 태워 얻은 열(Q)로 고압 증기를 만들어 피스톤을 밀어 기차를 달리게 하는 역학적 일(W)을 수행합니다.',
                connectionToPhysics: '열역학 제1법칙에 따라 열에너지를 유용한 역학적 일로 변환하는 장치가 열기관입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-03-02-1',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '외부에서 기체에 2500 J의 열을 가했더니 기체의 내부 에너지가 1500 J 증가했다. 이때 기체가 외부에 한 일은?',
                options: [
                  '1000 J',
                  '2500 J',
                  '4000 J',
                  '-1000 J'
                ],
                correctAnswer: 0,
                explanation: 'Q = ΔU + W 에서 W = Q - ΔU = 2500 - 1500 = 1000 J 입니다.'
              },
              {
                id: 'q-03-02-2',
                type: 'concept',
                typeLabel: '개념 적용',
                question: '열역학 제1법칙(Q = ΔU + W)을 전자기기(CPU) 냉각에 적용할 때 일어나는 물리적 특성은?',
                options: [
                  'CPU는 피스톤처럼 팽창하지 않으므로 외부에 하는 일 W ≈ 0 이다.',
                  'CPU는 온도가 오를수록 내부 에너지가 무조건 감소한다.',
                  'CPU에 공급된 전기 전력의 90%는 중력 에너지로 사라진다.',
                  'CPU는 열역학 제1법칙을 위배한다.'
                ],
                correctAnswer: 0,
                explanation: '고체 전자기기는 기계적 팽창 일(W)을 하지 않으므로 공급된 전기에너지는 100% 열로 전환되어 내부 에너지 축적과 외부 열류 방출로만 나뉩니다.'
              },
              {
                id: 'q-03-02-3',
                type: 'concept',
                typeLabel: '부호 판정',
                question: '기체가 외부로부터 500 J의 일을 받고(W = -500 J), 동시에 외부로 800 J의 열을 방출했다(Q = -800 J). 내부 에너지 변화량 ΔU는?',
                options: [
                  '-300 J (온도 하강)',
                  '+300 J (온도 상승)',
                  '-1300 J',
                  '+1300 J'
                ],
                correctAnswer: 0,
                explanation: 'ΔU = Q - W = (-800) - (-500) = -300 J 입니다. 따라서 내부 에너지는 300 J 감소하고 온도는 떨어집니다.'
              }
            ],
            summaryPoints: [
              '열역학 제1법칙: 계에 출입한 열은 내부 에너지 변화와 외부에 한 일의 합입니다 (Q = ΔU + W).',
              '에너지는 형태만 바뀔 뿐 총량은 보존됩니다.',
              '전자기기는 기계적 일을 하지 않으므로(W=0) 소비 전력이 100% 열로 전환되어 방열 대책이 필수적입니다.'
            ],
            nextConceptId: 'c-03-03'
          },
          {
            id: 'c-03-03',
            chapterId: 'ch-03',
            chapterTitle: '03. 열역학 제1법칙',
            title: '4대 열역학 과정과 P-V 선도 해석',
            difficulty: '심화',
            tags: ['등온과정', '등적과정', '등압과정', '단열과정', 'PV선도'],
            objectives: [
              '등온, 등적, 등압, 단열 과정의 조건과 열역학 제1법칙의 변형식을 구별할 수 있다.',
              'P-V 그래프 상에서 4대 과정의 곡선 특징과 일(W), 내부 에너지 변화(ΔU), 출입 열량(Q)을 해석할 수 있다.'
            ],
            coreExplanation: [
              '열역학 계의 상태 변화는 크게 4가지 대표 과정으로 분류됩니다:',
              '<strong>1. 등온 과정(Isothermal, T=일정)</strong>: 온도가 일정하므로 내부 에너지 변화 ΔU = 0 입니다. 따라서 <strong>Q = W</strong> 가 되어 흡수한 열이 100% 외부에 한 일로 전환됩니다. P-V 그래프에서 반비례 쌍곡선(PV = 일정)을 그립니다.',
              '<strong>2. 등적 과정(Isochoric, V=일정)</strong>: 부피 변화가 없으므로 외부에 한 일 W = 0 입니다. 따라서 <strong>Q = ΔU</strong> 가 되어 가한 열이 100% 기체의 내부 에너지를 높이고 온도를 올립니다.',
              '<strong>3. 등압 과정(Isobaric, P=일정)</strong>: 압력이 일정한 상태로 가열하면 온도도 오르고 부피도 팽창합니다 (<strong>Q = ΔU + W</strong>, W = P·ΔV).',
              '<strong>4. 단열 과정(Adiabatic, Q=0)</strong>: 외부와의 열 출입이 차단된 상태입니다. <strong>0 = ΔU + W</strong>, 즉 <strong>ΔU = -W</strong> 입니다. 기체가 팽창(W > 0)하면 내부 에너지가 감소하여 온도가 급강하(단열 팽창)하고, 압축(W < 0)되면 온도가 급상승(단열 압축)합니다.'
            ],
            inDepthExplanation: [
              'P-V 선도에서 단열 곡선의 기울기: 단열 곡선(PV^γ = 일정, γ = C_p/C_v > 1)은 등온 곡선(PV = 일정)보다 항상 더 가파릅니다. 팽창 시 열을 공급받지 못해 온도가 떨어지므로 압력이 등온선보다 훨씬 더 빠르게 곤두박질치기 때문입니다.',
              '자연계의 단열 팽창 사례: 지표면의 공기 덩어리가 상승하면 주변 기압이 낮아져 단열 팽창하며, 내부 에너지가 소모되어 온도가 이슬점 이하로 떨어져 구름이 형성됩니다.'
            ],
            keyTerms: [
              { term: '등온 과정 (Isothermal)', definition: '온도가 일정하게 유지되는 과정 (ΔU = 0, Q = W)' },
              { term: '등적 과정 (Isochoric)', definition: '부피가 일정하게 유지되는 과정 (W = 0, Q = ΔU)' },
              { term: '등압 과정 (Isobaric)', definition: '압력이 일정하게 유지되는 과정 (Q = ΔU + PΔV)' },
              { term: '단열 과정 (Adiabatic)', definition: '열 출입이 없는 과정 (Q = 0, ΔU = -W)' }
            ],
            visualizerType: 'thermo_processes',
            visualizerPrompt: '4가지 버튼을 번갈아 클릭하며 피스톤의 이동, 온도계 변화, P-V 곡선 위의 좌표 이동을 관찰하세요.',
            cases: [
              {
                title: '구름의 생성과 푄(Foehn) 현상',
                category: '일상생활',
                description: '산맥을 타고 상승하는 공기는 주변 기압 감소로 단열 팽창(Q=0, W>0)하여 온도가 급락해 비를 뿌리고, 산을 넘어 내려올 때는 단열 압축되어 고온 건조해집니다.',
                connectionToPhysics: '단열 팽창 시 ΔU = -W < 0 에 의해 공기 온도가 떨어지는 열역학 제1법칙 현상입니다.'
              },
              {
                title: '에어로졸 스프레이 캔 분사 시 캔이 차가워지는 현상',
                category: '일상생활',
                description: '먼지 제거 스프레이를 길게 누르면 고압 기체가 노즐을 통해 급격히 팽창하면서 외부에 일을 하고, 열을 흡수할 틈이 없어 캔 온도가 영하로 떨어집니다.',
                connectionToPhysics: '급격한 기체 분출에 의한 단열 팽창 냉각 현상입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-03-03-1',
                type: 'concept',
                typeLabel: '과정 구별',
                question: '열의 출입이 전혀 없는 단열 용기에서 기체를 급격히 팽창시켰을 때 기체의 온도와 내부 에너지 변화는?',
                options: [
                  '기체가 외부에 일을 하므로 내부 에너지가 감소하고 온도가 낮아진다.',
                  '열을 받지 않으므로 온도는 변함없이 일정하다.',
                  '내부 에너지가 증가하고 온도가 급상승한다.',
                  '기체의 압력이 무한대가 된다.'
                ],
                correctAnswer: 0,
                explanation: '단열 과정에서는 Q = 0 이므로 0 = ΔU + W, 즉 ΔU = -W 입니다. 기체가 팽창하여 외부에 일(W > 0)을 하면 내부 에너지는 반드시 감소(ΔU < 0)하여 온도가 떨어집니다.'
              },
              {
                id: 'q-03-03-2',
                type: 'formula',
                typeLabel: 'P-V 선도 해석',
                question: 'P-V 그래프에서 등온선과 단열선의 기울기를 비교했을 때 옳은 설명은?',
                options: [
                  '단열선이 등온선보다 기울기가 더 가파르다.',
                  '등온선이 단열선보다 기울기가 더 가파르다.',
                  '두 곡선의 기울기는 항상 완전히 같다.',
                  '단열선은 항상 수평 직선이다.'
                ],
                correctAnswer: 0,
                explanation: '단열 팽창 시에는 열을 공급받지 못해 온도가 떨어지므로, 같은 부피 팽창에 대해 압력이 등온선보다 훨씬 더 급격하게 감소합니다.'
              },
              {
                id: 'q-03-03-3',
                type: 'concept',
                typeLabel: '원리 적용',
                question: '기체의 부피를 일정하게 유지한 채(등적 과정) 열량 Q를 가했을 때 성립하는 식으로 옳은 것은?',
                options: [
                  'Q = ΔU (가한 열이 전부 내부 에너지를 올림)',
                  'Q = W (가한 열이 전부 일을 함)',
                  'ΔU = 0',
                  'W = Q + ΔU'
                ],
                correctAnswer: 0,
                explanation: '부피가 변하지 않으면 외부에 한 일 W = P·ΔV = 0 이므로, 열역학 제1법칙 Q = ΔU + W 에서 Q = ΔU 가 됩니다.'
              }
            ],
            summaryPoints: [
              '등온(T일정): ΔU=0, Q=W / 등적(V일정): W=0, Q=ΔU.',
              '등압(P일정): Q=ΔU+PΔV / 단열(Q=0): ΔU = -W.',
              'P-V 선도에서 단열선은 등온선보다 기울기가 더 가파릅니다.'
            ],
            nextConceptId: 'c-04-01'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: '대단원 2',
    title: '열기관과 엔트로피',
    description: '열에너지를 역학적 일로 바꾸는 열기관, 이상적인 카르노 기관, 비가역 현상의 방향성을 설명하는 열역학 제2법칙과 엔트로피, 그리고 전기전자공학의 열관리 기술을 학습합니다.',
    chapters: [
      {
        id: 'ch-04',
        unitId: 'unit-2',
        unitTitle: '열기관과 엔트로피',
        chapterNumber: '04',
        title: '열기관과 우리 생활',
        subtitle: '열기관의 작동 원리, 열효율(e), 카르노 기관과 이론적 한계',
        concepts: [
          {
            id: 'c-04-01',
            chapterId: 'ch-04',
            chapterTitle: '04. 열기관과 우리 생활',
            title: '열기관의 작동 원리와 열효율',
            difficulty: '기초',
            tags: ['열기관', '열효율', '에너지변환', '고열원저열원'],
            objectives: [
              '열기관이 고열원에서 열을 흡수하여 일하고 저열원으로 열을 방출하는 순환 과정을 설명할 수 있다.',
              '열효율 공식 e = W/Q₁ = 1 - Q₂/Q₁ 을 이용하여 열기관의 효율을 계산할 수 있다.'
            ],
            coreExplanation: [
              '열기관(Heat Engine)은 고열원으로부터 열에너지(Q₁)를 흡수하여 유용한 역학적인 일(W)을 하고, 남은 열(Q₂)을 저열원(주변 대기 등)으로 방출하는 순환 장치입니다.',
              '한 번의 순환(Cycle)을 마치면 작동 물질은 처음 상태로 되돌아오므로 내부 에너지 변화는 0(ΔU = 0)입니다. 따라서 에너지 보존 법칙에 의해 한 일은 <strong>W = Q₁ - Q₂</strong> 가 됩니다.',
              '열기관의 열효율(Thermal Efficiency, e)은 공급받은 열량(Q₁) 중 유용한 일(W)로 전환된 비율입니다:',
              'e = W / Q₁ = (Q₁ - Q₂) / Q₁ = 1 - (Q₂ / Q₁)',
              '열효율이 1(100%)이 되려면 저열원으로 방출하는 열 Q₂ = 0 이어야 하지만, 이는 열역학 제2법칙에 의해 자연계에서 결코 일어날 수 없습니다.'
            ],
            inDepthExplanation: [
              '현대 열기관의 실제 효율: 초기 와트 증기기관의 효율은 5% 미만이었으며, 현대 가솔린 자동차 엔진은 약 25~35%, 고효율 디젤 엔진은 약 40~45%, 초대형 복합 화력 발전소는 약 50~60%의 열효율을 보입니다.',
              '버려지는 폐열(Q₂): 아무리 뛰어난 엔진이라도 연료 에너지의 50% 이상은 배기가스와 라디에이터 냉각수를 통해 대기 중으로 방출됩니다.'
            ],
            keyTerms: [
              { term: '열기관 (Heat Engine)', definition: '열에너지를 역학적 일로 변환하는 장치 (증기기관, 가솔린엔진, 가스터빈)' },
              { term: '열효율 (Thermal Efficiency, e)', definition: '흡수한 총 열량에 대해 열기관이 한 유용한 일의 비율 (e = W / Q₁)' },
              { term: '고열원과 저열원', definition: '열을 공급하는 고온 저장소(T₁)와 폐열을 흡수하는 저온 저장소(T₂)' }
            ],
            formula: {
              latex: 'e = \\frac{W}{Q_1} = \\frac{Q_1 - Q_2}{Q_1} = 1 - \\frac{Q_2}{Q_1}',
              name: '열기관의 열효율 공식',
              variables: [
                { symbol: 'e', name: '열효율', unit: '단위 없음 (0 ~ 1)', description: '백분율 표기 시 × 100%' },
                { symbol: 'W', name: '열기관이 한 일', unit: 'J', description: 'W = Q₁ - Q₂' },
                { symbol: 'Q₁', name: '고열원에서 흡수한 열량', unit: 'J', description: '공급된 연료 연소열' },
                { symbol: 'Q₂', name: '저열원으로 방출한 열량', unit: 'J', description: '버려지는 폐열' }
              ],
              conditions: '순환 과정을 거치는 모든 열기관',
              physicalMeaning: '흡수한 에너지 중 유용한 일로 전환된 비율 (Q₂ > 0 이므로 항상 e < 1)',
              exampleProblem: {
                question: '어떤 열기관이 고열원에서 4000 J의 열을 흡수하여 1000 J의 일을 하고 나머지를 대기 중으로 방출하였다. 이 열기관의 열효율과 방출 열량 Q₂는?',
                given: 'Q₁ = 4000 J, W = 1000 J',
                solution: 'Q₂ = Q₁ - W = 4000 - 1000 = 3000 J. 열효율 e = W / Q₁ = 1000 / 4000 = 0.25 (25%)',
                answer: '열효율 25% (0.25), 방출 열량 3000 J'
              }
            },
            visualizerType: 'carnot_engine',
            visualizerPrompt: '고열원 공급 열량 Q₁과 한 일 W를 바꾸며 방출 열량 Q₂와 열효율(e)을 확인하세요.',
            cases: [
              {
                title: '화력 발전소와 냉각탑의 거대한 수증기',
                category: '일상생활',
                description: '발전소 냉각탑에서 뿜어져 나오는 흰 연기는 고열원에서 터빈을 돌리고 남은 폐열(Q₂)을 강물이나 대기(저열원)로 버리는 과정에서 발생합니다.',
                connectionToPhysics: 'W = Q₁ - Q₂ 에서 전기를 생산하고 남은 Q₂를 방출해야만 증기가 응축되어 순환 사이클이 완성됩니다.'
              },
              {
                title: '자동차 라디에이터(냉각기)의 역할',
                category: '일상생활',
                description: '엔진 폭발열 중 일로 바뀌지 못한 60% 이상의 폐열을 냉각수와 라디에이터 방열판을 통해 외기로 버립니다.',
                connectionToPhysics: '열역학적으로 저열원으로의 폐열 방출 없이는 엔진이 연속 가동될 수 없습니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-04-01-1',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '열효율이 30%(0.3)인 열기관이 한 순환 동안 600 J의 일을 하였다. 이때 고열원으로부터 흡수한 열량 Q₁은?',
                options: [
                  '180 J',
                  '1200 J',
                  '2000 J',
                  '3000 J'
                ],
                correctAnswer: 2,
                explanation: 'e = W / Q₁ 이므로 Q₁ = W / e = 600 / 0.3 = 2000 J 입니다.'
              },
              {
                id: 'q-04-01-2',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '열효율이 100%(e = 1)인 열기관을 제작할 수 없는 물리적 이유는?',
                options: [
                  '흡수한 열의 일부를 저열원으로 방출하지 않고는 순환 과정이 성립하지 않기 때문(열역학 제2법칙)',
                  '금속의 마찰 계수를 0으로 만들 수 없기 때문',
                  '전선에 저항이 존재하기 때문',
                  '대기압이 항상 변하기 때문'
                ],
                correctAnswer: 0,
                explanation: '켈빈-플랑크 서술에 따르면 단 하나의 열원으로부터 열을 흡수하여 이를 전량 역학적 일로 바꾸는 순환 열기관은 불가능합니다(Q₂ > 0 필수).'
              },
              {
                id: 'q-04-01-3',
                type: 'formula',
                typeLabel: '에너지 보존',
                question: '고열원에서 5000 J의 열을 흡수하고 3500 J의 열을 저열원으로 방출하는 열기관이 외부에 한 일(W)은?',
                options: [
                  '1500 J',
                  '3500 J',
                  '5000 J',
                  '8500 J'
                ],
                correctAnswer: 0,
                explanation: '에너지 보존에 의해 W = Q₁ - Q₂ = 5000 - 3500 = 1500 J 입니다.'
              }
            ],
            summaryPoints: [
              '열기관은 고열원에서 Q₁을 흡수해 일 W를 하고 저열원으로 Q₂를 방출합니다.',
              '열효율은 e = W/Q₁ = 1 - Q₂/Q₁ 로 계산됩니다.',
              '폐열 방출(Q₂ > 0)은 불가피하며 열효율 100%인 열기관은 존재할 수 없습니다.'
            ],
            nextConceptId: 'c-04-02'
          },
          {
            id: 'c-04-02',
            chapterId: 'ch-04',
            chapterTitle: '04. 열기관과 우리 생활',
            title: '카르노 기관과 이론적 최대 열효율',
            difficulty: '심화',
            tags: ['카르노기관', '카르노효율', '이상적열기관', '가역순환'],
            objectives: [
              '카르노 기관(등온 팽창 → 단열 팽창 → 등온 압축 → 단열 압축)의 가역 순환 과정을 설명할 수 있다.',
              '카르노 열효율 공식 e = 1 - T₂/T₁ 을 도출하고 두 열원의 온도가 효율에 미치는 영향을 계산할 수 있다.'
            ],
            coreExplanation: [
              '프랑스의 물리학자 카르노(Sadi Carnot)는 마찰이나 열 손실이 없는 이상적인 가역 열기관인 <strong>카르노 기관(Carnot Engine)</strong>을 고안했습니다.',
              '카르노 사이클은 4단계 가역 과정으로 구성됩니다:',
              '① A→B: 고온(T₁) 열원과 접촉하여 열 Q₁을 흡수하는 <strong>등온 팽창</strong> (기체가 외부에 일 W₁ 수행)',
              '② B→C: 열 출입 없이 부피가 늘어나는 <strong>단열 팽창</strong> (온도가 T₁에서 T₂로 하강, 일 W₂ 수행)',
              '③ C→D: 저온(T₂) 열원에 열 Q₂를 방출하는 <strong>등온 압축</strong> (외부로부터 일 W₃ 받음)',
              '④ D→A: 열 출입 없이 압축되는 <strong>단열 압축</strong> (온도가 T₂에서 T₁으로 상승하여 처음 상태로 복귀)',
              '카르노 기관의 열효율은 오직 <strong>두 열원의 절대온도(T₁, T₂)에 의해서만 결정</strong>됩니다:',
              'e_carnot = 1 - (T₂ / T₁)'
            ],
            inDepthExplanation: [
              '카르노 정리(Carnot\'s Theorem): 온도가 T₁과 T₂인 두 열원 사이에서 작동하는 그 어떤 실제 열기관도 카르노 기관의 열효율을 초과할 수 없습니다 (e_real < e_carnot).',
              '열효율을 높이는 공학적 방법: e = 1 - T₂/T₁ 이므로, 고열원 온도 T₁을 최대한 높이거나 저열원 온도 T₂를 최대한 낮추어야 합니다. 가스 터빈이나 로켓 엔진이 고열을 견디는 세라믹 코팅을 적용하는 이유입니다.'
            ],
            keyTerms: [
              { term: '카르노 기관 (Carnot Engine)', definition: '마찰이 없는 가역 등온/단열 과정으로만 구성된 이론상 최대 효율의 이상적 열기관' },
              { term: '카르노 열효율', definition: 'e = 1 - (T₂ / T₁) (T는 절대온도 K)' }
            ],
            formula: {
              latex: 'e_{\\text{carnot}} = 1 - \\frac{T_2}{T_1} = \\frac{T_1 - T_2}{T_1}',
              name: '카르노 열효율 공식',
              variables: [
                { symbol: 'e_carnot', name: '카르노 열효율', unit: '0 ~ 1', description: '동일 온도차에서 가능한 이론적 최대 효율' },
                { symbol: 'T₁', name: '고열원의 절대온도', unit: 'K', description: '반드시 절대온도(°C + 273)를 대입' },
                { symbol: 'T₂', name: '저열원의 절대온도', unit: 'K', description: '반드시 절대온도(°C + 273)를 대입' }
              ],
              conditions: '완전 가역 카르노 사이클',
              physicalMeaning: '고온과 저온의 온도 차이(T₁ - T₂)가 크고 고열원 온도가 높을수록 열효율이 높아짐',
              exampleProblem: {
                question: '고열원의 온도가 400°C(673K)이고 저열원의 온도가 27°C(300K)인 열기관의 이론적인 최대 열효율은 약 몇 %인가?',
                given: 'T₁ = 400 + 273 = 673 K, T₂ = 27 + 273 = 300 K',
                solution: 'e = 1 - (300 / 673) = 1 - 0.4457 = 0.5543 ≈ 55.4%',
                answer: '약 55.4%'
              }
            },
            visualizerType: 'carnot_engine',
            visualizerPrompt: '고열원 T₁과 저열원 T₂의 슬라이더를 조절하며 카르노 효율 곡선이 어떻게 상승하는지 확인하세요.',
            cases: [
              {
                title: '발전소 터빈의 초임계 고온 증기 기술',
                category: '첨단산업',
                description: '발전 효율을 50% 이상으로 끌어올리기 위해 물을 600°C 이상의 초임계 압력 고온 증기로 가열하여 터빈에 공급합니다.',
                connectionToPhysics: '카르노 법칙 e = 1 - T₂/T₁ 에 따라 고열원 온도 T₁을 극대화하여 열효율을 비약적으로 개선합니다.'
              },
              {
                title: '해양 온도차 발전(OTEC)',
                category: '첨단산업',
                description: '표층 온수(25°C=298K)와 심해 냉수(5°C=278K)의 온도차를 이용하는 발전소는 카르노 최대 효율 자체가 1 - (278/298) ≈ 6.7%에 불과하여 거대한 유량이 필요합니다.',
                connectionToPhysics: '두 열원의 온도차가 작으면 이론적 최대 효율 자체가 매우 낮음을 보여주는 대표 사례입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-04-02-1',
                type: 'formula',
                typeLabel: '공식 계산',
                question: '온도가 600K인 고열원과 300K인 저열원 사이에서 작동하는 카르노 기관의 열효율은?',
                options: [
                  '25%',
                  '50%',
                  '75%',
                  '100%'
                ],
                correctAnswer: 1,
                explanation: 'e = 1 - T₂/T₁ = 1 - (300 / 600) = 0.5 = 50% 입니다.'
              },
              {
                id: 'q-04-02-2',
                type: 'concept',
                typeLabel: '개념 적용',
                question: '카르노 열기관의 열효율이 1(100%)이 되기 위한 조건으로 수학적으로 유일하게 가능한 것은?',
                options: [
                  '저열원의 온도가 절대영도(T₂ = 0 K)이거나 고열원의 온도가 무한대(T₁ = ∞)일 때',
                  '고열원과 저열원의 온도가 같을 때',
                  '마찰 계수를 0으로 만들었을 때',
                  '가스 부피를 0으로 줄였을 때'
                ],
                correctAnswer: 0,
                explanation: 'e = 1 - T₂/T₁ 에서 e = 1 이 되려면 T₂/T₁ = 0 이어야 하므로 T₂ = 0K(절대영도)이거나 T₁ = ∞ 이어야 합니다. 이는 열역학 제3법칙에 의해 도달 불가능합니다.'
              },
              {
                id: 'q-04-02-3',
                type: 'experiment',
                typeLabel: '성능 비교',
                question: '온도가 500K와 300K인 열원 사이에서 가동되는 어떤 실제 가솔린 엔진의 효율을 측정한 결과 45%가 나왔다고 주장한다. 이 주장에 대한 평가는?',
                options: [
                  '불가능하다. 해당 온도 구간의 카르노 최대 효율은 40%이므로 실제 엔진이 45%가 될 수 없다.',
                  '충분히 가능하다. 기술 발전으로 카르노 효율을 초과할 수 있다.',
                  '가솔린 엔진의 효율은 항상 100%이다.',
                  '온도와 효율은 아무런 상관이 없다.'
                ],
                correctAnswer: 0,
                explanation: '카르노 최대 효율 e_max = 1 - (300/500) = 40% 입니다. 열역학 제2법칙에 의해 그 어떤 실제 기관도 카르노 효율(40%)을 초과할 수 없으므로 45%라는 주장은 거짓입니다.'
              }
            ],
            summaryPoints: [
              '카르노 기관은 가역 등온 과정과 가역 단열 과정으로 이루어진 이상적 열기관입니다.',
              '카르노 열효율 e = 1 - T₂/T₁ 은 동일 열원 사이에서 가능한 이론적 상한선입니다.',
              '열효율을 높이려면 고열원 온도를 높이고 저열원 온도를 낮추어야 합니다.'
            ],
            nextConceptId: 'c-05-01'
          }
        ]
      },
      {
        id: 'ch-05',
        unitId: 'unit-2',
        unitTitle: '열기관과 엔트로피',
        chapterNumber: '05',
        title: '엔트로피와 열역학 제2법칙',
        subtitle: '가역과 비가역, 미시상태와 거시상태, 자연 현상의 방향성',
        concepts: [
          {
            id: 'c-05-01',
            chapterId: 'ch-05',
            chapterTitle: '05. 엔트로피와 열역학 제2법칙',
            title: '가역 과정과 비가역 과정',
            difficulty: '기초',
            tags: ['가역과정', '비가역과정', '방향성', '시간의화살'],
            objectives: [
              '가역 과정과 비가역 과정의 정의를 구분하고 자연 현상이 대부분 비가역적인 이유를 설명할 수 있다.',
              '열역학 제1법칙(에너지 보존)을 만족하더라도 자발적으로 역방향 변화가 일어나지 않는 이유를 설명할 수 있다.'
            ],
            coreExplanation: [
              '<strong>가역 과정(Reversible Process)</strong>: 어떤 변화가 일어난 후 외부 환경에 아무런 흔적이나 변화를 남기지 않고 스스로 처음 상태로 완전히 되돌아갈 수 있는 이상적인 과정입니다. 마찰이나 공기 저항이 전혀 없는 진자 운동이 이에 해당합니다.',
              '<strong>비가역 과정(Irreversible Process)</strong>: 한 번 일어나면 자발적으로 거꾸로 처음 상태로 되돌아가지 않는 과정입니다.',
              '예를 들어 물에 떨어뜨린 잉크 방울은 저절로 물 전체로 퍼져나가지만(확산), 퍼진 잉크 분자들이 저절로 다시 한 방울로 뭉쳐지지 않습니다.',
              '뜨거운 커피는 가만히 두면 식어 실내 온도와 같아지지만, 식은 커피가 실내 열을 스스로 흡수하여 다시 끓어오르지 않습니다.',
              '중요한 점은 식은 커피가 저절로 뜨거워진다고 해도 에너지 보존 법칙(열역학 제1법칙)에는 전혀 위배되지 않는다는 점입니다. 그럼에도 역방향이 일어나지 않는 이유는 자연에 <strong>변화의 방향성</strong>이 존재하기 때문입니다.'
            ],
            inDepthExplanation: [
              '미시적 가역성과 거시적 비가역성(교과서 83쪽): 기체 분자 2개가 충돌하여 튕겨 나가는 미시적 과정은 운동량 보존에 의해 가역적입니다. 그러나 수조 개의 분자가 무작위 충돌을 거듭하면 거시적으로는 통계적 확률에 의해 단 하나의 방향으로만 비가역적으로 진행됩니다.',
              '시간의 화살(Arrow of Time): 비가역성은 과거와 미래를 물리적으로 구별해 주는 기준이 됩니다.'
            ],
            keyTerms: [
              { term: '가역 과정 (Reversible Process)', definition: '외부에 아무런 변화를 남기지 않고 원래 상태로 되돌릴 수 있는 이상적 과정' },
              { term: '비가역 과정 (Irreversible Process)', definition: '자연계에서 자발적으로 역방향 진행이 불가능한 한 방향의 변화' }
            ],
            visualizerType: 'entropy_diffusion',
            visualizerPrompt: '칸막이를 열었을 때 입자들이 자발적으로 퍼져나가며 다시는 한쪽으로 뭉치지 않는 비가역성을 관찰하세요.',
            cases: [
              {
                title: '깨진 유리컵과 진자의 정지',
                category: '일상생활',
                description: '바닥에 떨어져 깨진 유리컵의 파편이 스스로 붙어 원래 컵으로 복원되지 않으며, 진자는 공기 마찰로 결국 멈추고 잃어버린 역학적 에너지는 돌아오지 않습니다.',
                connectionToPhysics: '마찰과 충돌에 의해 역학적 에너지가 무질서한 열에너지로 흩어지는 비가역 현상입니다.'
              },
              {
                title: '전자기기 접촉 단자의 마찰 마모',
                category: '전기전자공학',
                description: 'USB 커넥터를 꽂고 뺄 때 발생하는 금속 마찰 마모는 비가역적이어서 깎여나간 금속 원자가 스스로 재생되지 않습니다.',
                connectionToPhysics: '기계적 마찰은 100% 비가역 과정입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-05-01-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '물에 떨어뜨린 잉크가 고르게 퍼진 후 다시 한 방울로 모이지 않는 물리적 까닭은?',
                options: [
                  '자연계의 자발적 변화는 비가역적인 방향성을 가지기 때문',
                  '에너지 보존 법칙에 위배되기 때문',
                  '잉크 분자의 질량이 사라지기 때문',
                  '물의 온도가 0K로 떨어지기 때문'
                ],
                correctAnswer: 0,
                explanation: '에너지가 보존되더라도 잉크 분자들이 무작위 열운동을 통해 다시 한곳으로 우연히 모일 확률은 사실상 0에 수렴하는 비가역 과정입니다.'
              },
              {
                id: 'q-05-01-2',
                type: 'concept',
                typeLabel: '원리 판정',
                question: '차가운 물체에서 뜨거운 물체로 열이 저절로 이동하지 않는 현상에 대한 설명으로 옳은 것은?',
                options: [
                  '열역학 제1법칙에는 어긋나지 않지만, 열역학 제2법칙에 의해 금지된다.',
                  '에너지 보존 법칙에 위배되기 때문에 일어나지 않는다.',
                  '열전도도가 음수가 되기 때문이다.',
                  '진공 상태에서만 일어난다.'
                ],
                correctAnswer: 0,
                explanation: '차가운 물체에서 뜨거운 물체로 열이 이동해도 총 에너지는 보존되므로 제1법칙은 만족하지만, 자연의 비가역적 방향성을 서술하는 열역학 제2법칙에 위배됩니다.'
              },
              {
                id: 'q-05-01-3',
                type: 'experiment',
                typeLabel: '사고 실험',
                question: '기체 분자 2개의 탄성 충돌(미시적 현상)과 방 전체로 기체가 퍼지는 확산(거시적 현상)의 성질 연결로 옳은 것은?',
                options: [
                  '미시적 충돌: 가역적 / 거시적 확산: 비가역적',
                  '미시적 충돌: 비가역적 / 거시적 확산: 가역적',
                  '둘 다 완전 가역적',
                  '둘 다 완전 비가역적'
                ],
                correctAnswer: 0,
                explanation: '교과서(83쪽)에 명시되어 있듯 미시적인 분자 충돌은 가역적이지만, 수많은 분자가 얽힌 거시적인 분포 변화는 압도적인 확률에 의해 비가역적입니다.'
              }
            ],
            summaryPoints: [
              '자연계에서 일어나는 모든 자발적인 현상은 한 방향으로만 진행하는 비가역 과정입니다.',
              '열은 고온에서 저온으로만 자발적으로 흐릅니다.',
              '비가역성은 에너지 보존(제1법칙)만으로는 설명할 수 없는 자연의 고유한 방향성입니다.'
            ],
            nextConceptId: 'c-05-02'
          },
          {
            id: 'c-05-02',
            chapterId: 'ch-05',
            chapterTitle: '05. 엔트로피와 열역학 제2법칙',
            title: '엔트로피와 열역학 제2법칙',
            difficulty: '심화',
            tags: ['엔트로피', '열역학제2법칙', '미시상태', '거시상태', '무질서도'],
            objectives: [
              '미시적 상태 수(W)와 거시적 상태의 확률을 바탕으로 엔트로피(Entropy)를 통계적으로 정의할 수 있다.',
              '고립계에서 엔트로피가 감소하지 않는다는 열역학 제2법칙을 설명할 수 있다.'
            ],
            coreExplanation: [
              '주사위 2개를 던질 때, 숫자 합이 2가 나오는 경우의 수(미시 상태)는 (1,1)의 1가지뿐이지만, 합이 7이 나오는 경우는 (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)의 6가지나 됩니다. 따라서 주사위를 던지면 확률이 큰 숫자 7 부근이 압도적으로 많이 관찰됩니다.',
              '<strong>엔트로피(Entropy, S)</strong>는 특정한 거시적 상태를 나타낼 수 있는 <strong>미시적 상태의 수(W, 경우의 수)의 척도</strong>입니다 (볼츠만 공식: S = k_B · ln W).',
              '자연 현상은 항상 경우의 수(확률)가 극히 적은 질서 있는 상태에서, 경우의 수가 압도적으로 많은 무질서한 상태로 자발적으로 진행합니다.',
              '<strong>열역학 제2법칙(Second Law of Thermodynamics)</strong>:',
              '1. 클라우지우스 서술: 열은 저온의 물체에서 고온의 물체로 아무런 외부 변화 없이 저절로 이동하지 않는다.',
              '2. 켈빈 서술: 흡수한 열을 100% 일로만 전환하는 열기관은 불가능하다.',
              '3. 엔트로피 서술: <strong>외부와 상호작용이 없는 고립계의 엔트로피는 항상 증가하거나 일정하며, 결코 감소하지 않는다 (ΔS_isolated ≥ 0).</strong>'
            ],
            inDepthExplanation: [
              '온도 균일화와 엔트로피: 고온 물체와 저온 물체의 온도 차이가 큰 상태는 에너지가 편중되어 미시상태 수 W가 적고 엔트로피가 낮습니다. 열이 이동하여 두 물체의 온도가 같아진 열평형 상태는 에너지가 고르게 퍼져 엔트로피가 최대가 된 상태입니다.',
              '우주의 열사(Heat Death of the Universe): 우주 전체가 고립계라면 시간이 흐름에 따라 모든 온도차가 사라져 최대 엔트로피 상태에 도달하고 더 이상 유용한 일을 뽑아낼 수 없게 됩니다.'
            ],
            keyTerms: [
              { term: '엔트로피 (Entropy, S)', definition: '계의 거시적 상태를 만족하는 미시적 상태의 수(무질서도와 확률)의 척도' },
              { term: '열역학 제2법칙', definition: '고립계의 총 엔트로피는 자발적 과정에서 항상 증가한다 (ΔS ≥ 0)' },
              { term: '미시적 상태와 거시적 상태', definition: '개별 분자들의 구체적 배열(미시)과 온도, 압력 등 겉보기 관찰량(거시)' }
            ],
            formula: {
              latex: '\\Delta S \\ge 0 \\quad (고립계), \\quad S = k_B \\cdot \\ln W',
              name: '엔트로피와 열역학 제2법칙 (볼츠만 엔트로피 식)',
              variables: [
                { symbol: 'S', name: '엔트로피', unit: 'J/K', description: '무질서도 및 확률의 척도' },
                { symbol: 'k_B', name: '볼츠만 상수', unit: '1.38 × 10⁻²³ J/K', description: '물리 상수' },
                { symbol: 'W', name: '미시 상태의 수', unit: '경우의 수', description: '해당 거시 상태를 만드는 분자 배열 가짓수' }
              ],
              conditions: '외부와 열이나 물질 교환이 없는 고립계',
              physicalMeaning: '자연계의 자발적 변화는 항상 확률이 큰 방향(엔트로피 증가)으로만 진행함',
              exampleProblem: {
                question: '온도가 각각 80°C와 20°C인 두 물체를 고립된 단열 상자 안에서 접촉시켰을 때, 열평형에 도달하는 과정에서 전체 엔트로피는 어떻게 되는가?',
                given: '고온부 80°C, 저온부 20°C, 고립계',
                solution: '고온부는 열을 방출하여 엔트로피가 감소(ΔS_hot = -Q/T₁)하지만, 저온부는 더 낮은 온도에서 열을 흡수하여 엔트로피가 더 크게 증가(ΔS_cold = +Q/T₂)합니다. T₁ > T₂ 이므로 전체 ΔS_total = Q(1/T₂ - 1/T₁) > 0 입니다.',
                answer: '전체 엔트로피는 증가한다 (ΔS > 0)'
              }
            },
            visualizerType: 'entropy_diffusion',
            visualizerPrompt: '밀폐된 상자 안에서 주사위 경우의 수와 분자 확산으로 엔트로피가 증가하는 통계적 원리를 체험해 보세요.',
            cases: [
              {
                title: '냉장고가 내부를 차갑게 만들 수 있는 이유',
                category: '일상생활',
                description: '냉장고는 내부 온도를 낮추어 내부 엔트로피를 줄이지만, 이를 위해 전기 모터를 돌려 뒷면으로 더 많은 열을 방출하므로 부엌을 포함한 전체 엔트로피는 항상 증가합니다.',
                connectionToPhysics: '외부에서 전기적 일(W)을 공급해야만 저온에서 고온으로 열을 퍼 올릴 수 있습니다.'
              },
              {
                title: '디지털 컴퓨터의 정보 소거와 란다우어 원리(Landauer\'s Principle)',
                category: '전기전자공학',
                description: '컴퓨터 메모리에서 1비트의 정보를 지우면 정보 엔트로피가 감소하는 대신 최소 k_B·T·ln(2) 만큼의 열이 발생하여 환경 엔트로피를 증가시킵니다.',
                connectionToPhysics: '컴퓨터 반도체 연산의 궁극적인 발열 한계를 설명하는 현대 물리학의 핵심 법칙입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-05-02-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '열역학 제2법칙에 대한 서술 중 물리학적으로 옳은 것만을 고른 것은?',
                options: [
                  '외부와의 상호작용이 없는 고립계의 엔트로피는 결코 감소하지 않는다.',
                  '열은 항상 저온에서 고온으로 자발적으로 이동한다.',
                  '모든 실제 열기관의 열효율은 100%이다.',
                  '깨진 컵이 스스로 다시 붙는 것은 엔트로피가 증가하기 때문이다.'
                ],
                correctAnswer: 0,
                explanation: '고립계의 총 엔트로피는 항상 증가하거나 가역 과정에서 0으로 유지되며, 자발적으로 감소하지 않는다는 것이 열역학 제2법칙의 핵심입니다.'
              },
              {
                id: 'q-05-02-2',
                type: 'concept',
                typeLabel: '통계적 확률',
                question: '주사위 2개를 굴릴 때 숫자 합이 2보다 7이 나올 확률이 훨씬 높은 이유를 엔트로피 개념과 연결한 것으로 옳은 것은?',
                options: [
                  '숫자 7을 만드는 미시적 조합의 수(6가지)가 2를 만드는 조합(1가지)보다 훨씬 많아 엔트로피가 더 크기 때문',
                  '주사위 눈금 7의 질량이 더 무겁기 때문',
                  '주사위가 외부에 일을 하기 때문',
                  '숫자 2는 에너지 보존 법칙을 위배하기 때문'
                ],
                correctAnswer: 0,
                explanation: '거시 상태 7은 미시 상태의 수(W=6)가 2(W=1)보다 훨씬 많아 엔트로피(S = k ln W)가 크며, 자연은 확률이 가장 큰 상태로 진행합니다.'
              },
              {
                id: 'q-05-02-3',
                type: 'experiment',
                typeLabel: '원리 해석',
                question: '방 안에서 작동 중인 냉장고의 문을 하루 종일 열어두면 방 안의 온도는 장기적으로 어떻게 되는가?',
                options: [
                  '냉장고의 냉각 기능 때문에 방 안이 얼어붙는다.',
                  '냉장고가 소비한 전기에너지가 결국 열로 방출되므로 방 안 전체 온도는 오히려 올라간다.',
                  '방 안 온도는 영원히 0°C로 유지된다.',
                  '방 안의 공기가 모두 사라진다.'
                ],
                correctAnswer: 1,
                explanation: '냉장고 문을 열어두면 내부에서 빼앗은 열과 모터가 소비한 전기 에너지(P)가 모두 방 안으로 방출되므로, 방 안 전체는 난로를 튼 것과 같아져 온도가 상승합니다.'
              }
            ],
            summaryPoints: [
              '엔트로피는 거시 상태를 이루는 미시적 상태의 수(확률)를 나타냅니다.',
              '고립계의 총 엔트로피는 결코 감소하지 않으며 자발적 변화는 무질서도가 증가하는 방향으로 진행합니다.',
              '열역학 제2법칙은 자연계에서 일어나는 모든 변화의 비가역적 방향성을 규정합니다.'
            ],
            nextConceptId: 'c-06-01'
          }
        ]
      },
      {
        id: 'ch-06',
        unitId: 'unit-2',
        unitTitle: '열기관과 엔트로피',
        chapterNumber: '06',
        title: '전기전자공학 심화 학습',
        subtitle: '반도체 줄 발열, 열저항·열용량, RC 상사성, 히스테리시스 자동 제어',
        concepts: [
          {
            id: 'c-06-01',
            chapterId: 'ch-06',
            chapterTitle: '06. 전기전자공학 심화 학습',
            title: '반도체 발열 원인과 전자기기 내부 열전달',
            difficulty: '심화',
            tags: ['줄발열', 'CMOS', '스위칭손실', 'TIM', '서멀스로틀링'],
            objectives: [
              '반도체 칩에서 열이 발생하는 두 가지 메커니즘(줄 발열 및 동적 스위칭 손실)을 설명할 수 있다.',
              '실리콘 다이에서 외기까지의 직렬 열저항 네트워크를 분석할 수 있다.'
            ],
            coreExplanation: [
              '최신 CPU와 GPU는 손톱만 한 실리콘 면적에 수백억 개의 트랜지스터(MOSFET)가 집적되어 있어 전구 표면보다 높은 극단적인 열류 밀도(100 W/cm² 이상)를 발생시킵니다.',
              '<strong>1. 줄 발열(Joule Heating, 정적 누설 전력)</strong>: 트랜지스터가 꺼져 있을 때도 미세한 누설 전류가 저항을 통과하며 P = I²·R = V·I_leak 의 열을 방출합니다.',
              '<strong>2. 동적 스위칭 손실(Dynamic Switching Power)</strong>: 트랜지스터가 0과 1을 초당 수십억 번(수 GHz) 전환할 때마다 게이트 기생 커패시터(C)를 충·방전하며 소비되는 전력입니다 (P_dynamic = α · C · V² · f). 동작 클럭(f)과 전압(V)이 높을수록 발열량이 급증합니다.',
              '칩 내부에서 발생한 열은 <strong>실리콘 다이 → TIM(서멀 구리스) → IHS(금속 덮개) → 히트싱크 베이스 → 핀 → 공기</strong>의 직렬 열저항 경로를 거쳐 방출됩니다.'
            ],
            inDepthExplanation: [
              '서멀 스로틀링(Thermal Throttling): 칩 온도가 안전 한계(보통 95~105°C)에 도달하면 하드웨어가 스스로 동작 클럭(f)과 전압(V)을 강제로 낮추어 발열량을 줄이는 자동 보호 기능입니다.',
              '직렬 열저항 합성: 전체 열저항은 R_total = R_die + R_tim + R_sink + R_conv 이며, 이 중 가장 열저항이 큰 취약 구간(병목 지점)을 개선하는 것이 열설계(Thermal Management)의 핵심입니다.'
            ],
            keyTerms: [
              { term: '줄 발열 (Joule Heating)', definition: '도체에 전류가 흐를 때 저항에 의해 전기 에너지가 열로 전환되는 현상 (P = I²R)' },
              { term: '동적 스위칭 전력', definition: 'P = C · V² · f (전압의 제곱과 클럭 주파수에 비례하여 열 발생)' },
              { term: '서멀 스로틀링 (Thermal Throttling)', definition: '과열 시 칩을 보호하기 위해 클럭과 전력을 강제로 다운시키는 기술' }
            ],
            formula: {
              latex: 'P_{\\text{total}} = P_{\\text{static}} + P_{\\text{dynamic}} = V \\cdot I_{\\text{leak}} + \\alpha \\cdot C \\cdot V^2 \\cdot f',
              name: 'CMOS 반도체 총 소비전력(발열량) 공식',
              variables: [
                { symbol: 'P_total', name: '총 발열 전력', unit: 'W (와트)', description: '전자기기 칩에서 발생하는 총 열량률' },
                { symbol: 'V', name: '인가 전압', unit: 'V (볼트)', description: '코어 공급 전압' },
                { symbol: 'f', name: '동작 주파수 (클럭)', unit: 'Hz (GHz)', description: '초당 트랜지스터 온/오프 횟수' },
                { symbol: 'C', name: '게이트 커패시턴스', unit: 'F', description: '트랜지스터의 기생 용량' },
                { symbol: 'α', name: '스위칭 활동 지수', unit: '0 ~ 1', description: '실제 연산 시 활성화되는 트랜지스터 비율' }
              ],
              conditions: '현대 CMOS 기반 마이크로프로세서',
              physicalMeaning: '클럭을 2배 높이면 발열이 2배, 전압을 2배 높이면 발열이 4배로 폭발적 증가',
              exampleProblem: {
                question: '전압 1.0V에서 4.0GHz로 동작하는 CPU의 클럭을 오버클럭하여 5.0GHz로 25% 올리고 안정화를 위해 전압을 1.2V로 20% 올렸다. 동적 발열량은 기존의 몇 배가 되는가?',
                given: 'V_new = 1.2 × V_old, f_new = 1.25 × f_old',
                solution: 'P ∝ V² · f 이므로 P_new / P_old = (1.2)² × 1.25 = 1.44 × 1.25 = 1.8배',
                answer: '기존 대비 1.8배(80% 증가)로 발열량 급증'
              }
            },
            visualizerType: 'rc_thermal_analogy',
            visualizerPrompt: '반도체 발열량 P를 높였을 때 열저항 경로를 따라 각 지점의 온도가 어떻게 형성되는지 관찰하세요.',
            cases: [
              {
                title: '스마트폰 게임 구동 시 프레임 드랍(스로틀링)',
                category: '전기전자공학',
                description: '밀폐된 스마트폰에서 3D 게임을 15분 이상 구동하면 방열 한계로 AP 온도가 85°C에 도달하여 클럭을 절반으로 낮추며 버벅임(프레임 저하)이 발생합니다.',
                connectionToPhysics: '반도체 소자의 실리콘 접합 수명을 보호하기 위한 열역학적 피드백 제어입니다.'
              },
              {
                title: '인공지능(AI) 데이터센터 수랭 랙 도입',
                category: '첨단산업',
                description: '엔비디아 H100 등 AI 가속기 칩 1개의 발열량이 700W에 달하여 공랭 팬으로는 냉각이 불가능해져 칩 표면에 냉각수가 직접 흐르는 직접 액체 냉각(Direct Liquid Cooling)을 채택합니다.',
                connectionToPhysics: '공기보다 밀도와 비열이 훨씬 높은 물을 사용하여 직렬 열저항을 극도로 낮춥니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-06-01-1',
                type: 'formula',
                typeLabel: '공식 분석',
                question: 'CMOS 반도체의 동적 소비전력 공식 P = α·C·V²·f 에 근거하여, 발열량을 가장 크게 줄일 수 있는 설계 전략은?',
                options: [
                  '인가 전압 V를 미세하게 낮춘다 (발열이 전압의 제곱에 비례하므로 언더볼팅 효과가 가장 큼).',
                  '클럭 주파수를 10배 올린다.',
                  'CPU 주변의 온도를 100°C로 높인다.',
                  '트랜지스터 크기를 10배 키운다.'
                ],
                correctAnswer: 0,
                explanation: '발열 전력은 전압의 제곱(V²)에 비례하므로 전압을 낮추는 언더볼팅(Undervolting)이 발열 억제에 가장 결정적인 효과를 발휘합니다.'
              },
              {
                id: 'q-06-01-2',
                type: 'concept',
                typeLabel: '공학 해석',
                question: 'CPU에서 발생하는 열전달 경로 중 TIM(Thermal Interface Material)의 역할로 옳은 것은?',
                options: [
                  '실리콘 다이와 히트스프레더 사이의 미세 공기층을 메워 접촉 열저항을 낮춘다.',
                  '전기를 통하게 하여 CPU 코어를 단락시킨다.',
                  'CPU 발열량을 0W로 강제 변환한다.',
                  '팬의 회전 속도를 올린다.'
                ],
                correctAnswer: 0,
                explanation: 'TIM은 금속 간 미세한 공극(Air pocket)을 채워 직렬 열저항 경로 중 가장 큰 병목 지점인 접촉 계면 열저항을 최소화합니다.'
              },
              {
                id: 'q-06-01-3',
                type: 'experiment',
                typeLabel: '실험 관찰',
                question: '컴퓨터의 고사양 렌더링 작업 시 CPU 온도가 95°C에 도달하자 렌더링 속도가 갑자기 절반으로 떨어진 원인은?',
                options: [
                  '하드웨어가 칩의 열 파괴를 막기 위해 클럭과 전압을 강제로 낮추는 서멀 스로틀링이 작동했기 때문',
                  '전원 플러그가 뽑혔기 때문',
                  '열역학 제1법칙이 파괴되었기 때문',
                  '실내 공기가 진공이 되었기 때문'
                ],
                correctAnswer: 0,
                explanation: '서멀 스로틀링은 온도가 임계치에 도달했을 때 동적 스위칭 전력(P = α·C·V²·f)의 클럭 f를 강제로 떨어뜨려 발열량을 줄이는 안전 보호 장치입니다.'
              }
            ],
            summaryPoints: [
              '반도체 발열은 누설 전류에 의한 줄 발열과 초고속 스위칭 손실(P ∝ V²f)에 기인합니다.',
              '열은 다이에서 대기까지 직렬 열저항 네트워크를 따라 이동합니다.',
              '한계 온도 초과 시 칩은 스스로 클럭을 낮추는 서멀 스로틀링을 발동합니다.'
            ],
            nextConceptId: 'c-06-02',
            simulatorPreset: {
              name: '고부하 발열(75W)과 스로틀링 방어 실험',
              description: 'AI 고부하 75W 환경에서 열저항 설계에 따른 정상상태 온도 관찰',
              params: { cpuPower: 75, rThOn: 0.5, rThOff: 2.0, fanActive: true, duration: 600 },
              targetTab: 'simulator'
            }
          },
          {
            id: 'c-06-02',
            chapterId: 'ch-06',
            chapterTitle: '06. 전기전자공학 심화 학습',
            title: '열저항·열용량과 RC 회로 상사성',
            difficulty: '심화',
            tags: ['열저항', '열용량', 'RC회로', '시정수', '상사성'],
            objectives: [
              '전기 RC 회로와 열 시스템 사이의 물리량 1:1 상사성(Analogy)을 도출할 수 있다.',
              '열적 시정수 τ = R_th × C_th 가 전자기기 과도 온도 상승에 미치는 영향을 정량 분석할 수 있다.'
            ],
            coreExplanation: [
              '전기회로에서 커패시터 충전 전압 공식: V(t) = I·R · (1 - e^(-t / RC)).',
              '열 시스템에서 온도 상승 공식: ΔT(t) = P·R_th · (1 - e^(-t / R_th·C_th)).',
              '두 시스템은 형태상 완전히 일치하는 1차 선형 미분방정식을 따릅니다:',
              '• 전압차(ΔV) ↔ 온도차(ΔT = T - T_amb)',
              '• 전류(I, 전하 흐름) ↔ 열류(P, 에너지 흐름)',
              '• 전기저항(R) ↔ 열저항(R_th, K/W)',
              '• 전기용량(C) ↔ 열용량(C_th, J/K)',
              '• 시정수(τ = RC) ↔ 열적 시정수(τ = R_th × C_th [초])',
              '열적 시정수(Time Constant, τ)는 온도가 최종 정상상태 상승분의 <strong>63.2%에 도달하는 데 걸리는 시간</strong>입니다. 3τ가 지나면 95%, 5τ가 지나면 99.3%에 도달하여 사실상 정상상태가 됩니다.'
            ],
            inDepthExplanation: [
              '물리적 차이점: 전기회로는 도선 경로를 따라 전자만 이동하지만, 열 시스템은 고체 전도뿐 아니라 사방으로의 공기 대류 및 T⁴에 비례하는 비선형 복사 방열이 복합적으로 일어납니다.',
              '또한 실제 전자기기는 칩, 히트스프레더, 방열판마다 각기 다른 R과 C가 결합된 다단 RC 사다리꼴(Foster / Cauer Network) 구조를 가집니다.'
            ],
            keyTerms: [
              { term: '열저항 (Thermal Resistance, R_th)', definition: '열류를 방해하는 정도 (ΔT = P × R_th) [K/W]' },
              { term: '열용량 (Thermal Capacitance, C_th)', definition: '열을 저장하는 용량 (Q = C_th × ΔT) [J/K]' },
              { term: '열적 시정수 (τ = R_th × C_th)', definition: '온도가 정상상태 상승분의 63.2%까지 오르는 데 걸리는 특성 시간 [초]' }
            ],
            formula: {
              latex: '\\Delta T(t) = P \\cdot R_{\\text{th}} \\cdot \\left(1 - e^{-\\frac{t}{R_{\\text{th}} \\cdot C_{\\text{th}}}}\\right), \\quad \\tau = R_{\\text{th}} \\cdot C_{\\text{th}}',
              name: '집중 열용량 1차 과도 응답 및 시정수 공식',
              variables: [
                { symbol: 'ΔT(t)', name: '시간 t에서의 온도 상승분', unit: 'K 또는 °C', description: 'T(t) - T_amb' },
                { symbol: 'P', name: '발열량', unit: 'W', description: '인가된 열류 (전기 전류 I에 대응)' },
                { symbol: 'R_th', name: '열저항', unit: 'K/W', description: '전기저항 R에 대응' },
                { symbol: 'C_th', name: '열용량', unit: 'J/K', description: '전기 커패시턴스 C에 대응' },
                { symbol: 'τ', name: '열적 시정수', unit: 's (초)', description: 'τ = R_th × C_th' }
              ],
              conditions: '집중 열용량 모형 (Lumped Parameter Model)',
              physicalMeaning: '초기에는 열용량이 열을 흡수하여 온도가 지수적으로 오르고, 시간이 흐르면 정상상태 ΔT_ss = P·R_th 로 수렴함',
              exampleProblem: {
                question: '열저항 R_th = 0.8 K/W 이고 열용량 C_th = 150 J/K 인 쿨러의 열적 시정수 τ는 몇 초이며, 35W 발열 시 63.2% 온도에 도달하는 시간은?',
                given: 'R_th = 0.8 K/W, C_th = 150 J/K, P = 35 W',
                solution: 'τ = R_th × C_th = 0.8 × 150 = 120초. 정상상태 63.2%에 도달하는 시간은 정확히 1τ 이므로 120초(2분)입니다.',
                answer: '시정수 120초, 도달 시간 120초'
              }
            },
            visualizerType: 'rc_thermal_analogy',
            visualizerPrompt: '열저항과 열용량을 변경하며 지수적 온도 상승 곡선(ΔT)과 시정수(τ)를 실시간으로 확인하세요.',
            cases: [
              {
                title: 'SPICE 회로 시뮬레이터를 이용한 반도체 열해석',
                category: '전기전자공학',
                description: '회로 설계 엔지니어들은 전자회로 시뮬레이터(SPICE)에 열저항을 저항 소자로, 열용량을 커패시터 소자로 입력하여 칩 온도를 전압처럼 시뮬레이션합니다.',
                connectionToPhysics: '전기-열 상사성 덕분에 복잡한 3차원 열역학 편미분방정식을 회로망 해석법으로 빠르게 계산합니다.'
              },
              {
                title: '터보 부스트(Turbo Boost) 클럭 유지 시간',
                category: '전기전자공학',
                description: 'CPU가 기본 35W에서 80W로 순간 부스트를 켤 때, 열용량 C_th 덕분에 온도가 즉시 90°C로 튀지 않고 시정수 τ 동안 완만히 오르므로 15~30초간 고속 연산이 가능합니다.',
                connectionToPhysics: '커패시터가 전압 급변을 막듯 열용량이 온도 급변을 막아주는 물리적 완충 원리입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-06-02-1',
                type: 'formula',
                typeLabel: '상사성 비교',
                question: '전기 RC 회로와 열 시스템을 비교할 때 바르게 짝지어진 것은?',
                options: [
                  '전압차(ΔV) - 온도차(ΔT), 전류(I) - 열류(P), 저항(R) - 열저항(R_th), 전기용량(C) - 열용량(C_th)',
                  '전압차 - 열용량, 전류 - 열저항',
                  '전기저항 - 온도차, 커패시턴스 - 열류',
                  '두 시스템은 수학적으로 아무런 공통점이 없다'
                ],
                correctAnswer: 0,
                explanation: '옴의 법칙 ΔV = I·R 과 정상상태 열전달 공식 ΔT = P·R_th 는 완벽히 1:1로 대응됩니다.'
              },
              {
                id: 'q-06-02-2',
                type: 'formula',
                typeLabel: '시정수 계산',
                question: '방열판의 열저항이 0.5 K/W이고 열용량이 200 J/K이다. 이 시스템의 열적 시정수 τ는?',
                options: [
                  '50초',
                  '100초',
                  '200초',
                  '400초'
                ],
                correctAnswer: 1,
                explanation: 'τ = R_th × C_th = 0.5 × 200 = 100초 입니다.'
              },
              {
                id: 'q-06-02-3',
                type: 'experiment',
                typeLabel: '과도 응답 해석',
                question: '방열판 열용량이 매우 큰 거대한 쿨러를 장착했을 때, 컴퓨터 부팅 직후 풀로드를 걸었을 때 나타나는 온도 거동은?',
                options: [
                  '시정수 τ가 매우 크므로 초기 온도 상승 속도가 매우 완만하다.',
                  '부팅 즉시 100°C로 수직 상승한다.',
                  '최종 정상상태 온도가 0°C가 된다.',
                  '온도가 전혀 변하지 않는다.'
                ],
                correctAnswer: 0,
                explanation: '초기 온도 변화율 dT/dt = P / C_th 이므로 열용량이 크면 온도 상승 기울기가 매우 완만해져 초기 급열을 부드럽게 흡수합니다.'
              }
            ],
            summaryPoints: [
              '전기 RC 회로와 집중 열 시스템은 동일한 1차 지수 미분방정식으로 기술됩니다.',
              '열적 시정수 τ = R_th × C_th 는 정상상태 63.2% 도달 시간입니다.',
              '열용량은 순간적인 부하 변동 시 온도의 급상승을 막아주는 결정적인 완충 역할을 합니다.'
            ],
            nextConceptId: 'c-06-03',
            simulatorPreset: {
              name: 'RC 열회로 시정수(τ) 실시간 검증',
              description: 'R_th=0.7 K/W, C_th=150 J/K 설정 시 정확히 105초에서 63.2% 온도에 도달하는지 관찰',
              params: { cpuPower: 35, rThOn: 0.7, cTh: 150, duration: 600 },
              targetTab: 'simulator'
            }
          },
          {
            id: 'c-06-03',
            chapterId: 'ch-06',
            chapterTitle: '06. 전기전자공학 심화 학습',
            title: '온도 센서와 냉각 팬의 피드백 제어 (히스테리시스)',
            difficulty: '심화',
            tags: ['히스테리시스', '자동제어', '채터링방지', 'PWM팬', '에너지절약'],
            objectives: [
              '단일 임계값 ON/OFF 제어에서 발생하는 채터링(Chattering) 문제와 이를 해결하는 히스테리시스(Hysteresis) 밴드의 원리를 설명할 수 있다.',
              '온도 제어 안정성과 냉각 팬 에너지 소비량(E_fan) 사이의 공학적 절충(Trade-off)을 분석할 수 있다.'
            ],
            coreExplanation: [
              '전자기기 냉각 팬을 24시간 100% 최고 속도로 가동하면 온도는 낮게 유지되지만, 소음(Noise)이 심하고 팬 모터 전력 소비량이 과다하며 베어링 수명이 급격히 줄어듭니다.',
              '반대로 단 하나의 목표 온도(예: 60°C)에서만 켜지고 꺼지도록 단순 설계하면, 온도가 60.01°C와 59.99°C 사이를 오갈 때 팬이 1초에도 수십 번 켜졌다 꺼졌다를 반복하는 <strong>채터링(Chattering) 떨림 현상</strong>이 일어납니다.',
              '이를 방지하기 위해 <strong>히스테리시스 ON/OFF 제어(Hysteresis Control)</strong>를 적용합니다:',
              '• <strong>T ≥ T_high (예: 65°C)</strong>: 팬 가동 시작 (ON, 강제 대류로 열저항 감소)',
              '• <strong>T ≤ T_low (예: 55°C)</strong>: 팬 가동 정지 (OFF, 자연 대류로 복귀)',
              '• <strong>55°C < T < 65°C</strong>: 이전 팬 상태를 그대로 유지 (Deadband)',
              '상한과 하한 사이의 히스테리시스 폭(ΔT_band = 10°C) 덕분에 팬이 안정적인 주기로 회전하며, 에너지를 대폭 절감할 수 있습니다.'
            ],
            inDepthExplanation: [
              '팬의 전기에너지 소비량 vs CPU 발열량: CPU 발열량 P(35W)는 반도체 연산으로 발생하는 열류이며, 팬 소비전력 P_fan(1.5W)은 냉각 팬 모터를 돌리기 위해 외부 전원에서 공급되는 전기입니다. 팬 가동 시간(t_on) 동안 소모된 에너지는 E_fan = P_fan × t_on (J)로 명확히 구분됩니다.',
              'PWM(Pulse Width Modulation) 속도 제어: 현대 PC는 단순 ON/OFF를 넘어 마더보드에서 25kHz의 PWM 신호를 주어 온도가 오를수록 팬의 듀티비(0~100%)를 연속 비례 조절하여 소음과 온도를 최적화합니다.'
            ],
            keyTerms: [
              { term: '히스테리시스 제어 (Hysteresis Control)', definition: '스위치 켜짐 온도(T_high)와 꺼짐 온도(T_low)를 다르게 두어 안정적인 온/오프를 달성하는 제어' },
              { term: '채터링 현상 (Chattering)', definition: '단일 기준값 부근에서 잡음이나 미세 변동으로 스위치가 고속 진동하듯 떨리는 불량 현상' },
              { term: '팬 소비에너지 (E_fan)', definition: 'E_fan = P_fan × t_on (팬 모터의 누적 전기에너지)' }
            ],
            formula: {
              latex: 'E_{\\text{fan}} = P_{\\text{fan}} \\cdot t_{\\text{on}} \\quad [\\text{J}], \\quad \\text{Fan State} = \\begin{cases} \\text{ON} & T \\ge T_{\\text{high}} \\\\ \\text{OFF} & T \\le T_{\\text{low}} \\\\ \\text{Previous} & T_{\\text{low}} < T < T_{\\text{high}} \\end{cases}',
              name: '히스테리시스 상태 전이 및 팬 에너지 소비 공식',
              variables: [
                { symbol: 'T_high', name: '팬 작동 시작 온도', unit: '°C', description: '온도가 이 상한을 넘으면 팬 가동 (예: 65°C)' },
                { symbol: 'T_low', name: '팬 작동 정지 온도', unit: '°C', description: '온도가 이 하한 아래로 떨어지면 팬 정지 (예: 55°C)' },
                { symbol: 'P_fan', name: '팬 소비전력', unit: 'W', description: '팬 모터 소비전력 (보통 1~3W)' },
                { symbol: 't_on', name: '팬 누적 작동 시간', unit: 's (초)', description: '전체 시간 중 팬이 회전한 시간' },
                { symbol: 'E_fan', name: '팬 소비 에너지', unit: 'J 또는 Wh', description: 'P_fan × t_on' }
              ],
              conditions: 'T_low < T_high 필수 만족',
              physicalMeaning: '온도를 허용 구간 내로 가두면서 팬의 가동 시간(듀티비)을 최소화하여 전력을 절약함',
              exampleProblem: {
                question: '소비전력 2.0W인 팬을 장착하고 900초 동안 히스테리시스 제어를 실행했더니 팬이 총 360초 동안만 작동(듀티비 40%)했다. 팬이 소비한 전기 에너지는 몇 J이며, 항시 가동(900초) 대비 몇 %의 에너지를 절감했는가?',
                given: 'P_fan = 2.0 W, t_on = 360 s, t_total = 900 s',
                solution: '실제 소비 E_fan = 2.0 × 360 = 720 J. 항시 가동 시 E_always = 2.0 × 900 = 1800 J. 절감율 = (1800 - 720) / 1800 = 60% 절감',
                answer: '소비 에너지 720 J (0.2 Wh), 절감율 60%'
              }
            },
            visualizerType: 'rc_thermal_analogy',
            visualizerPrompt: '자동 냉각 제어 실험실로 이동하여 팬 항시 OFF, 항시 ON, 히스테리시스 자동 제어의 세 곡선을 비교해 보세요.',
            cases: [
              {
                title: '전기밥솥과 다리미의 바이메탈/전자식 온도 제어',
                category: '일상생활',
                description: '가정용 전열기는 설정 온도에 도달하면 히터를 끄고, 일정 온도 이하로 내려가면 다시 켜는 히스테리시스 제어로 화재를 막고 전기를 아낍니다.',
                connectionToPhysics: '온도 상한과 하한 사이를 왕복하는 피드백 제어의 전형적인 일상 응용입니다.'
              },
              {
                title: '서버 데이터센터의 동적 팬 스피드 제어',
                category: '첨단산업',
                description: '수십만 대의 서버 팬이 24시간 풀가동되면 메가와트(MW) 급 전력이 낭비되므로, CPU 부하와 온도에 따라 히스테리시스 및 PWM 제어로 냉각 전력을 40% 이상 절감합니다.',
                connectionToPhysics: 'PUE(전력효율지수) 개선을 위한 전기전자공학 자동 제어 최적화입니다.'
              }
            ],
            quizzes: [
              {
                id: 'q-06-03-1',
                type: 'concept',
                typeLabel: '개념 이해',
                question: '단일 기준 온도(예: 60°C) 대신 상한(65°C ON)과 하한(55°C OFF)의 히스테리시스 밴드를 두는 가장 중요한 목적은?',
                options: [
                  '기준 온도 부근에서 팬이 고속으로 켜졌다 꺼졌다를 반복하는 채터링(떨림) 현상을 방지하기 위해',
                  '팬 모터의 회전 속도를 0 RPM으로 영구 고정하기 위해',
                  'CPU 발열량을 2배로 증폭시키기 위해',
                  '외부 대기 온도를 0K로 만들기 위해'
                ],
                correctAnswer: 0,
                explanation: '히스테리시스 밴드를 두면 온도가 오르내릴 때 안정적인 주기를 형성하여 스위치 채터링과 모터 피로 마모를 완벽히 방지합니다.'
              },
              {
                id: 'q-06-03-2',
                type: 'formula',
                typeLabel: '에너지 계산',
                question: '소비전력 1.5W인 냉각 팬이 600초 동안 40%의 작동 비율(Duty ratio)로 가동되었다면 팬이 소비한 전기 에너지는?',
                options: [
                  '360 J',
                  '600 J',
                  '900 J',
                  '1500 J'
                ],
                correctAnswer: 0,
                explanation: '팬 작동 시간 t_on = 600s × 0.4 = 240s. 소비 에너지 E = 1.5W × 240s = 360 J 입니다.'
              },
              {
                id: 'q-06-03-3',
                type: 'experiment',
                typeLabel: '공학적 절충(Trade-off)',
                question: '팬을 항상 켜두는 방식과 히스테리시스 자동 제어 방식을 비교한 설명으로 가장 타당한 것은?',
                options: [
                  '팬을 항상 켜두면 온도는 가장 낮게 유지되지만 팬 에너지 소모와 소음이 크고, 자동 제어는 허용 온도 내에서 에너지를 대폭 절약할 수 있다.',
                  '팬을 항상 켜두면 CPU 발열량이 0W가 된다.',
                  '자동 제어는 에너지 소모량이 항상 항시 가동보다 10배 더 크다.',
                  '두 방식의 에너지 소비량은 항상 완전히 같다.'
                ],
                correctAnswer: 0,
                explanation: '냉각 엔지니어링의 핵심은 온도 마진과 전력/소음 사이의 트레이드오프(Trade-off)이며, 자동 제어는 목표 온도를 방어하면서 팬 에너지를 최적화합니다.'
              }
            ],
            summaryPoints: [
              '히스테리시스 제어는 시작(T_high)과 정지(T_low) 온도를 분리하여 스위치 채터링을 방지합니다.',
              '팬 에너지(E_fan = P_fan × t_on)는 CPU 발열량과 구별되는 별개의 전력 소비량입니다.',
              '자동 제어는 반도체 안전 온도 유지와 에너지 절감 사이의 최적의 공학적 균형점을 제공합니다.'
            ],
            nextConceptId: 'c-01-01',
            simulatorPreset: {
              name: '히스테리시스 자동 제어 3방식 비교 실험실',
              description: 'T_high=65°C, T_low=55°C 설정으로 팬 항시 OFF vs 항시 ON vs 자동 제어 비교',
              params: { cpuPower: 40, duration: 900 },
              targetTab: 'autocontrol'
            }
          }
        ]
      }
    ]
  }
];

// Helper to flatten all concepts for rapid lookup & search
export const ALL_CONCEPTS: ConceptItem[] = MAJOR_UNITS_DATA.flatMap(unit =>
  unit.chapters.flatMap(ch => ch.concepts)
);

export const GLOSSARY_ITEMS = [
  { term: '온도 (Temperature)', definition: '물질을 구성하는 입자들의 평균 열운동 에너지의 거시적 척도 [°C, K]' },
  { term: '열 (Heat)', definition: '온도 차이에 의해 고온에서 저온으로 이동하는 에너지의 형태 [J]' },
  { term: '열평형 (Thermal Equilibrium)', definition: '접촉한 두 물체의 온도가 같아져 알짜 열에너지 이동이 0이 된 상태' },
  { term: '전도 (Conduction)', definition: '물질 내부에서 입자의 직접 이동 없이 격자 진동과 전자 충돌로 열이 전달되는 현상' },
  { term: '열전도도 (Thermal Conductivity, k)', definition: '물질 고유의 열전달 성능을 나타내는 계수 [W/m·K]' },
  { term: '대류 (Convection)', definition: '기체나 액체 등 유체의 순환 이동에 의해 열에너지가 운반되는 현상' },
  { term: '복사 (Radiation)', definition: '물질 매개체 없이 전자기파(적외선) 형태로 전달되는 열에너지' },
  { term: '비열 (Specific Heat, c)', definition: '어떤 물질 1kg의 온도를 1K(=1°C) 올리는 데 필요한 열에너지 [J/kg·K]' },
  { term: '열용량 (Heat Capacity, C)', definition: '어떤 물체 전체의 온도를 1K 올리는 데 필요한 열에너지 (C = m·c) [J/K]' },
  { term: '잠열 (Latent Heat)', definition: '상태 변화 시 온도 변화 없이 흡수되거나 방출되는 열에너지 (융해열, 기화열) [J/kg]' },
  { term: '선팽창 계수 (α)', definition: '온도가 1K 상승할 때 처음 길이에 대해 늘어난 길이의 비율 [10⁻⁶ /K]' },
  { term: '이상 기체 법칙', definition: '기체의 압력, 부피, 몰수, 절대온도 사이의 상태 방정식 (PV = nRT)' },
  { term: '열역학 제1법칙', definition: '열에너지를 포함한 에너지 보존 법칙 (Q = ΔU + W)' },
  { term: '카르노 기관', definition: '동일한 두 열원 사이에서 작동하는 이상적인 최대 효율의 가역 열기관' },
  { term: '엔트로피 (Entropy, S)', definition: '계의 거시적 상태를 나타내는 미시적 상태의 수(경우의 수 및 무질서도)의 척도' },
  { term: '열역학 제2법칙', definition: '고립계의 총 엔트로피는 결코 감소하지 않으며 자연 현상은 한 방향으로만 비가역적으로 진행함' },
  { term: '열저항 (Thermal Resistance, R_th)', definition: '열류의 흐름을 방해하는 정도 (ΔT = P × R_th) [K/W]' },
  { term: '열적 시정수 (τ)', definition: '온도가 정상상태 상승분의 63.2%까지 오르는 데 걸리는 특성 시간 (τ = R_th × C_th) [초]' },
  { term: '히스테리시스 제어', definition: 'ON 온도(T_high)와 OFF 온도(T_low)를 다르게 두어 스위치 채터링을 방지하는 안정적 제어' },
  { term: '서멀 스로틀링', definition: '칩 과열 시 손상을 방지하기 위해 CPU가 스스로 클럭과 전압을 낮추는 보호 기술' }
];
