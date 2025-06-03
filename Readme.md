# 1. 프로젝트 개요 및 개선 전/후 결과 요약
## 프로젝트 개요
- **프로젝트 유형:** Vanilla JavaScript + 정적 HTML/CSS
- **배포 주소:** https://chapter4-2.netlify.app/
- **목표:** Lighthouse Performance, Accessibility, Best Practices, SEO 점수 90 이상 달성, Core Web Vitals(특히 FCP·LCP·CLS) 개선

<br/>

## 성능 개선 전/후 스크린샷
|개선 전|개선 후|
|---|---|
|<img src="https://github.com/KumJungMin/front_5th_chapter4-2_basic/blob/main/images/previous-perormance.png" />|<img src="https://github.com/KumJungMin/front_5th_chapter4-2_basic/blob/main/images/performance-results.png" />|

- 위 두 이미지는 각각 최적화 전과 후의 Lighthouse 보고서 요약 화면입니다.

<br/><br/><br/>

# 2. Lighthouse 점수 및 Core Web Vitals 개선 분석

###  🎯 2.1 Lighthouse 점수 변화
| 카테고리 |  개선 전 | 개선 후|변동|
|----------|------|------|------|
| 성능 | 86% | 99% |+13%P|
| 접근성 | 82%| 94% | +12%P|
| 권장사항 |75%| 100% | +25%P|
| 검색엔진 최적화 | 82% | 100%| 	+18%P|

- **성능: 86 → 99 (+13%P)**
  - FCP, LCP, TBT, Speed Index 등 주요 지표가 개선되었습니다.
- **접근성: 82 → 94 (+12%P)**
  - 시맨틱 헤딩 구조, alt 속성 보강, ARIA 레이블 추가 등을 통해 스크린 리더 호환성을 높였습니다.
- **권장사항: 75 → 100 (+25%P)**
  - 렌더 블로킹 리소스 제거, 지원 중단 API 제거 등으로 수치를 개선하였습니다.
- **검색엔진 최적화: 82 → 100 (+18%P)**
  - `<meta>` 태그 보강, 헤더 태그 순서 정리, ARIA 사용 등으로 검색 최적화 지표가 향상되었습니다.
 
<br/>

### 📊 2.2 Core Web Vitals 변화
| 메트릭 | 개선 전 | 개선 후|변동|
|--------|------|--------|------|
| FCP | 0.6s | 0.3s |–0.3초 (감소)|
| LCP | 2.5s | 0.7s | –1.8초 (감소)|
| CLS | 0.015s | 0.017s | +0.002 (증가) |

- **FCP:** 0.6 → 0.3 (50% 단축)
- **LCP:** 2.5 → 0.7 (72% 단축)
- **CLS:** 0.015 → 0.017 (거의 차이 없음, 하지만 최종 지표는 0.1 이내로 “Green” 구역 유지)

FCP·LCP 개선은 “렌더 블로킹 리소스 제거”와 “이미지 최적화”가 핵심이었습니다.<br/> 
CLS 역시 이미지 크기·시맨틱 마크업 보강으로 안정적인 값으로 유지되었습니다.


<br/><br/><br/>

# 3. 구체적 최적화 작업

## 3.1 이미지 최적화
> Lighthouse 보고서에서 특히 uses-optimized-images, uses-responsive-images, image-aspect-ratio 경고가 여러 개 나왔습니다.<br/>총 이미지 리소스가 컸을 뿐 아니라, 이미지 비율을 맞추지 않아 CLS 이슈가 발생했습니다.

### 개선 사항
- **PNG → WebP 포맷 전환**
- **Lighthouse에서 권장하는 이미지 크기로, 이미지 크기 변경**
- **Lazy Loading 처리**
  - 사용자가 스크롤해서 화면에 도달할 때까지 이미지를 로드하지 않기에 초기 페이지 로드가 빨라집니다.
- **alt 속성 적용**
  - 접근성 관점에서 각 이미지에 적절한 대체 텍스트(alt)를 달아야 스크린 리더 사용자가 내용을 이해할 수 있습니다.
- **width/height 속성 명시**
  - CLS(레이아웃 시프트)를 방지하려면, 이미지를 로드하기 전에도 브라우저가 이미지 영역(placeholder)을 확보할 수 있도록 가로×세로 값을 정의해야 합니다.
  - 🚨 적용 시 주의점은, 실제 이미지 파일의 가로세로 비율과 동일하게 지정하지 않으면 **사용자 접근성 수치가 낮아집**니다.
- **이미지 영역 높이 고정**
  - `height: auto`만 지정하면 브라우저가 너비만 맞추고 높이는 컨텐츠에 따라 렌더링을 유추하기에, 레이아웃 변경이 발생합니다.

<br/>

## 3.2 스크립트 최적화
> `.js` 파일이 HTML `<script>` 태그로 선언되어 있기에, 로드 방식이 성능에 영향을 줄 수 있습니다.

### 개선 사항
- **`<script defer>` 처리**
  - `<script>` 태그에 `defer`처리를 하지 않으면, 해당 스크립트를 읽는 동안 렌더링 차단이 발생합니다.
  ```html
  <!-- Before: 동기 로드 -->
  <script src="/js/main.js"></script>
  <script src="/js/products.js"></script>

  <!-- After: defer 속성 적용 -->
  <script src="/js/main.js" defer></script>
  <script src="/js/products.js" defer></script>
  ```

- **Cookie Consent 스크립트 이벤트 기반 실행**
  - `Cookie Consent` 라이브러리는 외부 도메인에서 스크립트를 불러오고, 페이지 로딩 시 쿠키 정책 팝업을 띄우는데, 초기 렌더링 단계에서 불러오면 TBT가 발생할 수 있습니다.
  - `DOMContentLoaded` 이벤트로 묶으면, 브라우저가 주요 콘텐츠를 렌더링한 뒤에 쿠키 스크립트가 실행되므로 TBT를 최소화합니다.
  ```html
  <!-- Cookie Consent JS를 defer로 로드 -->
  <script src="//www.freeprivacypolicy.com/public/cookie-consent/4.1.0/cookie-consent.js" defer></script>
  <script defer>
    document.addEventListener('DOMContentLoaded', function () {
      cookieconsent.run({
        notice_banner_type: "simple",
        consent_type: "express",
        palette: "light",
        language: "en",
        page_load_consent_levels: ["strictly-necessary"],
        notice_banner_reject_button_hide: false,
        preferences_center_close_button_hide: false,
        page_refresh_confirmation_buttons: false,
        website_name: "Performance Course"
      });
    });
  </script>
  ```

- **폰트 Preload**
  - 외부 웹폰트 로드로 인한 FOUT(Flash of Unstyled Text) 또는 FOIT(Flash of Invisible Text) 문제를 줄이고, 초기 렌더링 시 폰트 로딩을 최적화합니다.
  - `<link rel="preload" as="style">` 뒤에 반드시 `media="print"`와 `onload="this.media='all'"` 트릭을 적용해야 합니다.
```html
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Preload & 비동기 로드 -->
  <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css?family=Heebo:300,400,600,700&display=swap" />
  <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,600,700&display=swap"
        rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript>
    <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,600,700&display=swap"
        rel="stylesheet" />
  </noscript>
  ```

- **스타일 Preload은 미적용 ❌** 
  - **이유**) global CSS(styles.css)를 preload했을 때 CLS(0.1 이상 레이아웃 시프트)를 경험했습니다.

<br/>



## 3.3 SEO 최적화
> 검색엔진 노출을 위해 메타 태그, 헤더 구조, ARIA 최적화 등을 반영했습니다.

### 개선 사항
- **헤더 태그 순서 정리**
  - SEO와 접근성 모두 “헤딩(h1~h6)의 계층 구조”가 중요하기에 순서를 지켜주었습니다.
  - 그래서, `<h1>`을 한 번만 쓰고, “페이지 제목(Tech Shop) → 섹션 제목(h2) → 제품 제목(h3)” 계층을 맞추었습니다.

- **`<meta>` 태그 보강**
  - 검색 엔진에 노출될 때, 페이지 요약 및 키워드 정보를 명확히 전달해야 합니다.
  ```html
  <meta name="description" content="~~">
  <meta name="keywords" content="VR, VR 헤드셋, Apple Headset, Playstation Headset, Oculus Headset, Tech Shop">
  ```

- **`<nav>` 및 `aria-label` 활용**
  - 네비게이션 메뉴를 논리적인 그룹으로 묶어 스크린 리더 사용자에게 의도를 명확히 전달합니다.
  ```html
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="about.html">About us</a></li>
      <li><a href="#best-sellers-section">Best Sellers</a></li>
      <li><a href="#newsletter-section">Newsletter</a></li>
    </ul>
  </nav>
  ```

<br/><br/><br/>

# 4. 결론
> 이번 과제에서는 바닐라 JavaScript 기반의 정적 웹사이트를 대상으로, Lighthouse의 권고사항을 중심으로 최적화를 수행했습니다.<br/>주요 개선 항목별로 요약하면 다음과 같습니다.

- 이미지 최적화
  - PNG→WebP 변환, Lighthouse 권장 크기로 리사이즈 및 압축, srcset·반응형 이미지 적용 등을 통해 네트워크 전송 용량을 크게 줄였습니다.
  - loading="lazy"를 적절히 사용해 초기 로드 시점의 데이터 요청을 분산시키고, width/height 속성 및 CSS aspect-ratio로 **레이아웃 시프트(CLS)** 를 최소화했습니다.
  - **특히, 아이콘 이미지를 잘못된 비율로 지정했을 때 접근성(Accessibility) 점수가 낮아지는 문제를 경험**하며, **“반드시 실제 이미지 비율과 일치하도록 지정하라”는 교훈**을 얻었습니다.

- 스크립트 최적화
  - 모든 자바스크립트 파일에 defer를 적용하여 HTML 파싱을 막는 렌더 블로킹을 제거하고, 특히 Cookie Consent 스크립트는 DOMContentLoaded 이벤트 후에 실행하도록 재배치했습니다.
  - 또한, 폰트 로드를 위해 `<link rel="preload" as="style">` + `media="print" onload` 트릭을 사용했으며,
  - **글로벌 CSS를 단순히 preload만 적용했을 때 CLS 문제가 발생한 경험**을 했습니다.

- SEO 및 접근성 최적화
  - `<h1>`을 한 페이지당 한 번만 쓰고, “사이트 제목(h1) → 섹션 제목(h2) → 제품 제목(h3)” 계층 구조를 명확히 맞춰 헤딩 순서 경고를 해소했습니다.
  - `<meta name="description">`, `<meta name="keywords">`를 보강하여 검색엔진에 페이지 요약 정보와 키워드를 제공했고,
  - `<nav aria-label="...">`를 통해 스크린 리더가 네비게이션을 올바르게 인식하도록 보조했습니다.
