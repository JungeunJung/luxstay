# LUXSTAY Style Guide

> 프리미엄 숙박 예약 서비스 — Tailwind CSS v1.0  
> 한글: 산돌애플고딕 / Apple SD Gothic Neo · 영문: SF Pro Display / SF Pro Text

---

## 목차

1. [폰트 시스템](#1-폰트-시스템)
2. [색상 팔레트](#2-색상-팔레트)
3. [타이포그래피 스케일](#3-타이포그래피-스케일)
4. [간격 시스템](#4-간격-시스템)
5. [버튼 컴포넌트](#5-버튼-컴포넌트)
6. [카드 컴포넌트](#6-카드-컴포넌트)
7. [인풋 컴포넌트](#7-인풋-컴포넌트)
8. [배지 & 태그](#8-배지--태그)
9. [Tailwind 설정](#9-tailwind-설정)

---

## 1. 폰트 시스템

### 폰트 스택

| 용도 | 폰트 | Fallback |
|------|------|----------|
| 한글 UI 전체 | Sandoll AppleGothic | Apple SD Gothic Neo → Noto Sans KR → sans-serif |
| 영문 헤딩 · 숫자 · 레이블 | SF Pro Display / SF Pro Text | -apple-system → BlinkMacSystemFont → Helvetica Neue |

### CSS 변수 정의

```css
:root {
  --font-ko: 'Sandoll AppleGothic', 'Apple SD Gothic Neo', 'Noto Sans KR', -apple-system, sans-serif;
  --font-en: 'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
}
```

### 폰트 웨이트 (산돌애플고딕)

| Weight | 값 | 용도 |
|--------|-----|------|
| Light | 300 | 부가 설명, 서브텍스트 |
| Regular | 400 | 일반 본문, 입력값 |
| Medium | 500 | 레이블, 버튼, 탭 |
| Bold | 700 | 카드 제목, 헤딩, 가격 |
| Black | 900 | 디스플레이, 브랜드 타이틀 |

> **참고** macOS · iOS에서는 `-apple-system`으로 SF Pro, `'Apple SD Gothic Neo'`로 산돌고딕이 자동 렌더링됩니다. 실제 서비스에서 산돌애플고딕 라이선스 폰트를 사용하려면 `@font-face`로 직접 로드해야 합니다.

---

## 2. 색상 팔레트

### Grayscale Scale

| Token | Hex | Tailwind | 용도 |
|-------|-----|----------|------|
| black | `#000000` | `bg-black` | Primary 버튼, 메인 텍스트, 브랜드 로고 |
| gray-900 | `#111111` | `bg-gray-900` | Hover 상태 |
| gray-800 | `#333333` | `bg-gray-800` | 서브 헤딩 |
| gray-500 | `#777777` | `text-gray-500` | 보조 텍스트, 아이콘 |
| gray-400 | `#999999` | `text-gray-400` | Placeholder |
| gray-300 | `#BBBBBB` | `text-gray-300` | 비활성 텍스트 |
| gray-200 | `#DDDDDD` | `border-gray-200` | 테두리, Divider |
| gray-50 | `#F5F5F5` | `bg-gray-50` | 카드 배경, 입력 필드 |
| white | `#FFFFFF` | `bg-white` | 페이지 배경, 버튼 텍스트 |

### Semantic Colors

| 상태 | 텍스트 | 배경 | 테두리 | 용도 |
|------|--------|------|--------|------|
| Success | `text-black` | `bg-gray-50` | `border-gray-200` | 예약 완료, 가용 상태 |
| Danger | `text-black` | `bg-white` | `border-black` (1.5px) | 오류, 예약 불가, 취소 |
| Warning | `text-gray-600` | `bg-gray-50` | `border-gray-300` | 객실 부족, 주의 |
| Info | `text-gray-500` | `bg-gray-50` | `border-gray-200` | 안내, 도움말 |

---

## 3. 타이포그래피 스케일

### Type Scale

| 단계 | 폰트 | 크기 | 굵기 | Tailwind 클래스 | 용도 |
|------|------|------|------|-----------------|------|
| Display | SF Pro | 72px | 700 | `font-en text-7xl font-bold tracking-[-0.04em]` | 브랜드 타이틀 (LUXSTAY) |
| H1 | 산돌애플고딕 | 36px | 700 | `text-4xl font-bold tracking-[-0.025em]` | 페이지 주요 헤딩 |
| H2 | 산돌애플고딕 | 26px | 700 | `text-2xl font-bold tracking-[-0.02em]` | 섹션 헤딩 |
| H3 | 산돌애플고딕 | 20px | 700 | `text-xl font-bold` | 카드 제목, 소제목 |
| Body L | 산돌애플고딕 | 16px | 400 | `text-base leading-relaxed` | 일반 본문 (line-height 1.8) |
| Body S | 산돌애플고딕 | 14px | 400 | `text-sm` | 보조 정보, 설명 (line-height 1.7) |
| Label | SF Pro | 11px | 500 | `font-en text-xs font-medium uppercase tracking-wider` | 섹션 레이블, 카테고리 |
| Price | SF Pro | 20px | 700 | `font-en text-xl font-bold tabular-nums tracking-[-0.03em]` | 가격 표시 |

### 사용 예시

```html
<!-- Display -->
<h1 class="font-en text-7xl font-bold tracking-[-0.04em]">LUXSTAY</h1>

<!-- H1 한글 -->
<h1 class="text-4xl font-bold tracking-[-0.025em]">프리미엄 숙박 예약</h1>

<!-- Label (영문) -->
<span class="font-en text-xs font-medium uppercase tracking-wider text-gray-400">
  Premium Collection
</span>

<!-- 가격 -->
<span class="font-en text-xl font-bold tabular-nums">
  ₩380,000 <span class="text-xs font-normal text-gray-400">/ 박</span>
</span>
```

---

## 4. 간격 시스템

| Token | px | rem | 용도 |
|-------|----|-----|------|
| `space-1` | 4px | 0.25rem | 아이콘 내부 간격 |
| `space-2` | 8px | 0.5rem | 배지·태그 패딩 |
| `space-3` | 12px | 0.75rem | 카드 내 요소 간격 |
| `space-4` | 16px | 1rem | 컴포넌트 기본 패딩 |
| `space-5` | 20px | 1.25rem | 카드 내부 패딩 |
| `space-6` | 24px | 1.5rem | 버튼 수평 패딩, 섹션 내 간격 |
| `space-8` | 32px | 2rem | 그리드 gap, 카드 간격 |
| `space-12` | 48px | 3rem | 섹션 상하 여백 |
| `space-16` | 64px | 4rem | 히어로 패딩 |
| `space-24` | 96px | 6rem | 페이지 최대 상하 여백 |

### Border Radius

| 값 | Tailwind | 용도 |
|----|----------|------|
| 12px | `rounded-xl` | 버튼, 입력 필드 |
| 16px | `rounded-2xl` | 작은 카드 |
| 20px | `rounded-[20px]` | 메인 카드 |
| 9999px | `rounded-full` | Pill 버튼, 배지 |

### Container & Grid

```css
/* Container */
max-w-screen-xl  px-6 md:px-10 lg:px-16

/* Card Grid */
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
```

---

## 5. 버튼 컴포넌트

### Variants

| Variant | 배경 | 텍스트 | 테두리 | 용도 |
|---------|------|--------|--------|------|
| Primary | `bg-black` | `text-white` | — | 핵심 CTA (예약, 검색, 제출) |
| Secondary | `bg-gray-100` | `text-black` | `border border-gray-200` | 보조 액션 |
| Outline | `transparent` | `text-black` | `border-[1.5px] border-black` | 2순위 액션, hover 시 Primary 반전 |
| Ghost | `transparent` | `text-gray-500` | `border border-gray-300` | 3순위 액션 (뒤로가기, 공유) |

### Sizes

| Size | Padding | Font Size | Tailwind |
|------|---------|-----------|----------|
| sm | `py-2 px-4` | 12px | `text-xs` |
| md | `py-3 px-[22px]` | 14px | `text-sm` |
| lg | `py-4 px-8` | 15px | `text-[15px]` |

### 공통 스타일

```html
<!-- Primary -->
<button class="bg-black text-white font-semibold rounded-full py-3 px-[22px]
               hover:bg-gray-800 active:scale-[0.98] transition-all">
  예약하기
</button>

<!-- Secondary -->
<button class="bg-gray-100 text-black font-semibold rounded-full py-3 px-[22px]
               border border-gray-200 hover:border-gray-300 transition-all">
  자세히 보기
</button>

<!-- Outline -->
<button class="bg-transparent text-black font-semibold rounded-full py-3 px-[22px]
               border-[1.5px] border-black hover:bg-black hover:text-white transition-all">
  즐겨찾기
</button>

<!-- Icon Button -->
<button class="w-10 h-10 flex items-center justify-center bg-gray-100
               border border-gray-200 rounded-xl hover:border-gray-400 transition-all">
  ♡
</button>

<!-- Disabled -->
<button class="... opacity-30 cursor-not-allowed" disabled>예약 불가</button>
```

### 사용 규칙

- Primary 버튼은 **페이지당 1개** 원칙
- 모든 버튼은 `font-ko` 적용, 폰트 `font-semibold` (600) 이상
- 버튼 내 아이콘 간격: `gap-1.5` (6px)
- hover 시 `transition-all duration-150`
- active 시 `active:scale-[0.98]`

---

## 6. 카드 컴포넌트

### Property Card (숙소 목록)

```html
<div class="bg-white border border-gray-100 rounded-[20px] overflow-hidden
            hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
  <!-- 이미지 영역 -->
  <div class="h-36 bg-gray-50 relative">
    <img src="..." alt="숙소 이미지" class="w-full h-full object-cover" />
    <!-- 배지 -->
    <span class="absolute top-2.5 left-2.5 bg-black text-white text-[10px]
                 font-semibold px-2.5 py-1.5 rounded-full">신규</span>
    <!-- 즐겨찾기 -->
    <button class="absolute top-2.5 right-2.5 ...">♡</button>
  </div>
  <!-- 정보 영역 -->
  <div class="p-4">
    <p class="font-en text-[11px] text-gray-400 uppercase tracking-wider mb-1">
      제주도 · 서귀포
    </p>
    <h3 class="text-[15px] font-bold text-black tracking-[-0.01em] mb-2.5">
      오션 클리프 빌라
    </h3>
    <div class="flex justify-between items-baseline">
      <span class="font-en text-sm font-bold">
        ₩380,000 <span class="text-[11px] font-normal text-gray-400">/ 박</span>
      </span>
      <span class="font-en text-[11px] text-gray-400">★ 4.9 (128)</span>
    </div>
  </div>
</div>
```

### Info Card

```html
<div class="bg-white border border-gray-100 rounded-[20px] p-[18px]">
  <p class="font-en text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
    편의시설
  </p>
  <h3 class="text-base font-bold text-black tracking-[-0.01em] mb-1.5">
    인피니티 풀 & 스파
  </h3>
  <p class="text-[13px] text-gray-500 leading-relaxed">
    오션 뷰 인피니티 풀과 프라이빗 스파를 포함한 프리미엄 시설을 이용하세요.
  </p>
  <div class="mt-3.5">
    <button class="bg-gray-100 text-black text-xs font-semibold rounded-full py-2 px-4">
      자세히 보기
    </button>
  </div>
</div>
```

### Stat Card

```html
<div class="bg-gray-50 rounded-[20px] p-[18px]">
  <p class="font-en text-xs text-gray-400 mb-1.5">이번 달 예약</p>
  <p class="font-en text-[40px] font-bold text-black tracking-[-0.04em] leading-none">
    247
  </p>
  <p class="font-en text-xs text-gray-400 mt-2">↑ 전월 대비 +18%</p>
</div>
```

### 카드 규칙

- 이미지 영역 최소 높이: `h-36` (144px)
- 카드 패딩: `p-4` (16px)
- border-radius: `rounded-[20px]` 통일
- hover: `hover:shadow-md hover:-translate-y-0.5 transition-all duration-150`
- 배지는 카드당 최대 2개, 좌상단 `absolute top-2.5 left-2.5`

---

## 7. 인풋 컴포넌트

### 기본 구조

```html
<div class="mb-4">
  <!-- Label -->
  <label class="block font-en text-xs font-medium text-gray-500 mb-1.5">
    예약자 이름
  </label>
  <!-- Input -->
  <input
    type="text"
    placeholder="홍길동"
    class="w-full font-ko text-sm text-black bg-gray-50 border-[1.5px] border-transparent
           rounded-xl px-3.5 py-[11px] outline-none
           focus:bg-white focus:border-black transition-all"
  />
  <!-- Hint -->
  <p class="font-en text-[11px] text-gray-400 mt-1">여권상 이름으로 입력하세요</p>
</div>
```

### 상태별 스타일

| 상태 | 배경 | 테두리 | 설명 |
|------|------|--------|------|
| Default | `bg-gray-50` | `border-transparent` | 기본 상태 |
| Focus | `bg-white` | `border-black` | 포커스 활성 |
| Error | `bg-white` | `border-gray-400` (1.5px) | 유효성 실패 |
| Disabled | `bg-gray-50` | `border-transparent` `opacity-30` | 비활성 |

### 컴포넌트 변형

```html
<!-- 아이콘 인풋 -->
<div class="relative">
  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">☎</span>
  <input class="... pl-[38px]" type="tel" placeholder="010-0000-0000" />
</div>

<!-- Select -->
<select class="w-full font-ko text-sm text-black bg-gray-50 border-[1.5px] border-transparent
               rounded-xl px-3.5 py-[11px] outline-none
               focus:bg-white focus:border-black cursor-pointer">
  <option>전체</option>
  <option>빌라</option>
</select>

<!-- Textarea -->
<textarea
  rows="3"
  class="w-full font-ko text-sm text-black bg-gray-50 border-[1.5px] border-transparent
         rounded-xl px-3.5 py-[11px] outline-none resize-y
         focus:bg-white focus:border-black"
  placeholder="특별 요청사항을 입력하세요"
></textarea>
```

### 인풋 규칙

- 높이 기준: `h-11` (44px)
- 레이블: SF Pro `text-xs font-medium text-gray-500 uppercase`
- 힌트/에러 텍스트: SF Pro `text-[11px]` → 힌트 `text-gray-400`, 에러 `text-gray-500 font-medium`
- 2열 레이아웃: `grid grid-cols-2 gap-3`

---

## 8. 배지 & 태그

### Variants

| Variant | Tailwind 클래스 | 용도 |
|---------|-----------------|------|
| Black (Solid) | `bg-black text-white` | 신규, 인기 — 최우선 강조 |
| Outline | `border-[1.5px] border-black text-black bg-transparent` | 특가 — 2순위 강조 |
| Gray | `bg-gray-100 text-gray-500 border border-gray-200` | 예약 가능 — 일반 상태 |
| Muted | `bg-gray-100 text-gray-400` | 마감 임박, 프리미엄 — 약한 강조 |

### 공통 스타일

```html
<span class="font-en text-[11px] font-semibold px-3 py-[5px] rounded-full tracking-[0.01em]
             bg-black text-white">
  신규
</span>
```

### 배지 규칙

- 카드당 최대 **2개**
- 위치: 카드 좌상단 `absolute top-2.5 left-2.5`
- 폰트: SF Pro `font-en` 적용
- 글자 수: **최대 6자** 이내
- 강조 순서: Black → Outline → Gray → Muted

---

## 9. Tailwind 설정

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 한글 — 산돌애플고딕
        ko: [
          'Sandoll AppleGothic',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          '-apple-system',
          'sans-serif',
        ],
        // 기본 sans (한글 우선)
        sans: [
          'Sandoll AppleGothic',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          '-apple-system',
          'sans-serif',
        ],
        // 영문 — SF Pro
        en: [
          'SF Pro Display',
          'SF Pro Text',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      borderRadius: {
        '20': '20px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter2: '-0.03em',
        tight2: '-0.025em',
        tight3: '-0.02em',
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
        '13': '13px',
        '15': '15px',
      },
    },
  },
  plugins: [],
}
```

### CSS 전역 설정

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-ko: 'Sandoll AppleGothic', 'Apple SD Gothic Neo', 'Noto Sans KR', -apple-system, sans-serif;
    --font-en: 'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  }

  html {
    font-family: var(--font-ko);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    word-break: keep-all;
  }

  /* 영문/숫자 전용 클래스 */
  .font-en {
    font-family: var(--font-en);
  }
}
```

---

*© 2026 LUXSTAY. Style Guide v1.0 — 기밀문서 · 내부 배포용*