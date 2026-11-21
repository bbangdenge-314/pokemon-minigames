/* ==========================================================
   장면(decor) 빌더 — 숨은그림찾기 · 틀린그림찾기 공용
   32가지 배경 도안 · SVG 소품 라이브러리
   ========================================================== */

const G = {
  trunk: '#b0805a', trunkDark: '#96684a',
  leaf1: '#61bd72', leaf2: '#7ed08a', leaf3: '#96dda0', leaf4: '#4ea862',
  cloud: '#ffffff', cloudShade: '#e8f4ff',
  rock: '#c9c3d6', rockDark: '#a9a2b8',
  coral: '#ff9db4', coral2: '#ffb98a', coral3: '#c9a4ff',
  sand: '#ffe6b8',
};

/* ---------------- 소품 SVG ---------------- */
export const SHAPES = {
  /* 하늘 */
  sun: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="34" fill="#ffd75e"/>
      <circle cx="42" cy="42" r="20" fill="#fff0a8" opacity=".65"/>
      <g stroke="#ffd75e" stroke-width="5" stroke-linecap="round" opacity=".8">
        <path d="M50 2 L50 12"/><path d="M50 88 L50 98"/><path d="M2 50 L12 50"/><path d="M88 50 L98 50"/>
        <path d="M16 16 L23 23"/><path d="M77 77 L84 84"/><path d="M84 16 L77 23"/><path d="M23 77 L16 84"/>
      </g>
    </svg>`,
  cloud: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="50" cy="52" rx="36" ry="7" fill="${G.cloudShade}"/>
      <circle cx="34" cy="34" r="17" fill="${G.cloud}"/>
      <circle cx="56" cy="28" r="21" fill="${G.cloud}"/>
      <circle cx="74" cy="38" r="14" fill="${G.cloud}"/>
      <rect x="18" y="36" width="64" height="16" rx="8" fill="${G.cloud}"/>
    </svg>`,
  moon: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M64 12 A38 38 0 1 0 64 88 A30 30 0 1 1 64 12 Z" fill="#fff4c2"/>
      <circle cx="36" cy="36" r="5" fill="#f0e3a8" opacity=".8"/>
      <circle cx="30" cy="62" r="7" fill="#f0e3a8" opacity=".7"/>
    </svg>`,
  star: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 6 Q58 42 94 50 Q58 58 50 94 Q42 58 6 50 Q42 42 50 6 Z" fill="#fff6b8"/>
    </svg>`,
  sparkle: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 0 Q55 45 100 50 Q55 55 50 100 Q45 55 0 50 Q45 45 50 0 Z" fill="#fff"/>
    </svg>`,
  planet: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="50" cy="52" rx="44" ry="12" fill="#ffb3cd" opacity=".55" transform="rotate(-18 50 52)"/>
      <circle cx="50" cy="50" r="26" fill="#b9a4ff"/>
      <circle cx="42" cy="42" r="8" fill="#fff" opacity=".3"/>
      <circle cx="60" cy="60" r="5" fill="#8f7ae8" opacity=".6"/>
      <ellipse cx="50" cy="52" rx="44" ry="12" fill="none" stroke="#ffd6e6" stroke-width="4" transform="rotate(-18 50 52)"/>
    </svg>`,
  rocket: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 4 Q70 26 70 54 H30 Q30 26 50 4 Z" fill="#f4f0ff"/>
      <circle cx="50" cy="34" r="10" fill="#9fd8ff" stroke="#8a6fae" stroke-width="4"/>
      <path d="M30 50 L14 72 L30 66 Z" fill="#ff8fb1"/><path d="M70 50 L86 72 L70 66 Z" fill="#ff8fb1"/>
      <path d="M38 54 h24 v10 q-12 12 -24 0 Z" fill="#ffd166"/>
      <path d="M44 68 q6 26 12 0 q-6 12 -12 0Z" fill="#ff9a3c"/>
    </svg>`,
  aurora: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0 44 Q20 2 42 36 Q62 68 82 28 Q93 8 100 24 L100 44 Q90 26 82 48 Q62 86 42 52 Q20 20 0 62Z" fill="#7ef0c1" opacity=".4"/>
      <path d="M0 58 Q22 20 44 54 Q66 84 100 42 L100 58 Q66 98 44 68 Q22 38 0 74Z" fill="#b9a4ff" opacity=".3"/>
    </svg>`,
  balloon: `
    <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet">
      <path d="M50 6 Q86 16 82 52 Q78 78 50 90 Q22 78 18 52 Q14 16 50 6Z" fill="#ff9fc0"/>
      <path d="M50 6 Q34 20 32 52 Q32 78 50 90Z" fill="#ffd166"/>
      <path d="M50 6 Q66 20 68 52 Q68 78 50 90Z" fill="#9fd8ff"/>
      <path d="M40 90 h20" stroke="#8a6fae" stroke-width="3"/>
      <rect x="40" y="94" width="20" height="14" rx="4" fill="#c98a4a"/>
    </svg>`,
  rainbow: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMax meet">
      <path d="M6 60 A44 44 0 0 1 94 60" fill="none" stroke="#ff9db4" stroke-width="9"/>
      <path d="M14 60 A36 36 0 0 1 86 60" fill="none" stroke="#ffd166" stroke-width="9"/>
      <path d="M22 60 A28 28 0 0 1 78 60" fill="none" stroke="#8fdc9a" stroke-width="9"/>
      <path d="M30 60 A20 20 0 0 1 70 60" fill="none" stroke="#9fd8ff" stroke-width="9"/>
    </svg>`,
  bunting: `
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      <path d="M0 6 Q50 22 100 6" stroke="#c9b6ff" stroke-width="3" fill="none"/>
      <g><path d="M8 8 L16 8 L12 24Z" fill="#ff8fb1"/><path d="M24 12 L32 12 L28 28Z" fill="#ffd166"/>
      <path d="M40 15 L48 15 L44 31Z" fill="#8fe0bd"/><path d="M56 15 L64 15 L60 31Z" fill="#9fd8ff"/>
      <path d="M72 12 L80 12 L76 28Z" fill="#c9b6ff"/><path d="M88 8 L96 8 L92 24Z" fill="#ffa987"/></g>
    </svg>`,

  /* 나무 · 풀 */
  tree: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="96" rx="22" ry="4" fill="rgba(50,70,45,.14)"/>
      <rect x="45" y="56" width="10" height="40" rx="5" fill="${G.trunk}"/>
      <rect x="45" y="56" width="4" height="40" rx="2" fill="${G.trunkDark}" opacity=".35"/>
      <circle cx="50" cy="46" r="26" fill="${G.leaf1}"/>
      <circle cx="28" cy="56" r="19" fill="${G.leaf2}"/>
      <circle cx="72" cy="56" r="19" fill="${G.leaf2}"/>
      <circle cx="50" cy="30" r="18" fill="${G.leaf3}"/>
      <circle cx="38" cy="42" r="7" fill="#fff" opacity=".18"/>
      <circle cx="34" cy="60" r="3.4" fill="#ff8f6e"/>
      <circle cx="64" cy="52" r="3.4" fill="#ffd166"/>
      <circle cx="56" cy="66" r="3.4" fill="#ff8f6e"/>
    </svg>`,
  pine: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="97" rx="20" ry="3.5" fill="rgba(50,70,45,.14)"/>
      <rect x="46" y="78" width="8" height="19" rx="4" fill="${G.trunk}"/>
      <path d="M50 8 L78 44 H22 Z" fill="${G.leaf4}"/>
      <path d="M50 26 L82 66 H18 Z" fill="${G.leaf1}"/>
      <path d="M50 46 L86 86 H14 Z" fill="${G.leaf2}"/>
      <path d="M50 20 L64 40 H36 Z" fill="${G.leaf3}" opacity=".55"/>
    </svg>`,
  palm: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="97" rx="20" ry="3" fill="rgba(50,70,45,.14)"/>
      <path d="M54 96 Q46 68 42 44" stroke="#bd8f5e" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M42 44 Q20 34 6 42 Q24 22 44 34" fill="#4ea862"/>
      <path d="M42 44 Q24 20 32 6 Q46 20 47 36" fill="#61bd72"/>
      <path d="M42 44 Q52 14 70 12 Q66 32 47 40" fill="#7ed08a"/>
      <path d="M42 44 Q66 32 88 42 Q66 56 45 50" fill="#4ea862"/>
      <path d="M42 44 Q22 52 14 66 Q34 62 45 52" fill="#7ed08a"/>
      <circle cx="46" cy="48" r="5" fill="#8a5a3b"/><circle cx="54" cy="50" r="4" fill="#8a5a3b"/>
    </svg>`,
  bamboo: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g stroke="#7fbf5a" stroke-width="10" stroke-linecap="round">
        <path d="M26 98 L26 14"/><path d="M50 98 L50 8"/><path d="M74 98 L74 20"/>
      </g>
      <g stroke="#a8d97f" stroke-width="3">
        <path d="M20 78 H32"/><path d="M20 54 H32"/><path d="M20 32 H32"/>
        <path d="M44 70 H56"/><path d="M44 46 H56"/><path d="M44 24 H56"/>
        <path d="M68 80 H80"/><path d="M68 58 H80"/><path d="M68 38 H80"/>
      </g>
      <path d="M50 24 Q36 14 24 18 Q38 30 50 28" fill="#8fd06a"/>
      <path d="M50 42 Q66 30 80 34 Q64 46 50 46" fill="#8fd06a"/>
    </svg>`,
  maple: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="96" rx="20" ry="4" fill="rgba(70,50,30,.14)"/>
      <rect x="45" y="56" width="10" height="40" rx="5" fill="#8a5a3b"/>
      <circle cx="50" cy="44" r="26" fill="#e8734a"/>
      <circle cx="28" cy="54" r="18" fill="#f08a5c"/>
      <circle cx="72" cy="54" r="18" fill="#d95f3f"/>
      <circle cx="50" cy="28" r="17" fill="#f6a06a"/>
      <circle cx="38" cy="40" r="7" fill="#fff" opacity=".22"/>
      <circle cx="60" cy="62" r="3.4" fill="#c94a2a"/>
      <circle cx="34" cy="66" r="3.2" fill="#ffd166"/>
    </svg>`,
  cherry: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="97" rx="20" ry="3.4" fill="rgba(90,60,80,.12)"/>
      <path d="M50 96 L50 50 Q42 36 30 30" stroke="#8a5a3b" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M50 62 Q64 48 70 34" stroke="#8a5a3b" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="30" cy="26" r="17" fill="#ffc0da"/><circle cx="52" cy="20" r="19" fill="#ffd3e6"/>
      <circle cx="70" cy="34" r="15" fill="#ffc0da"/><circle cx="44" cy="38" r="14" fill="#ffe0ee"/>
      <circle cx="26" cy="44" r="12" fill="#ffd3e6"/>
      <circle cx="40" cy="22" r="5" fill="#fff" opacity=".55"/>
      <circle cx="64" cy="42" r="3" fill="#ff9fc0"/>
    </svg>`,
  snowPine: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="97" rx="20" ry="3.5" fill="rgba(90,120,150,.16)"/>
      <rect x="46" y="80" width="8" height="17" rx="4" fill="#96684a"/>
      <path d="M50 10 L78 46 H22 Z" fill="#4a8f6a"/>
      <path d="M50 28 L82 68 H18 Z" fill="#56a377"/>
      <path d="M50 48 L86 88 H14 Z" fill="#4a8f6a"/>
      <path d="M50 14 L68 40 H46 Q52 30 50 14Z" fill="#fff" opacity=".92"/>
      <path d="M24 66 Q50 58 78 66 Q56 74 24 66Z" fill="#fff" opacity=".88"/>
      <path d="M18 86 Q50 78 84 86 Q54 94 18 86Z" fill="#fff" opacity=".9"/>
    </svg>`,
  deadTree: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 98 V44 M50 66 L26 44 M50 58 L76 36 M50 50 L40 26 M26 44 L18 34" stroke="#4a3a5c" stroke-width="7" fill="none" stroke-linecap="round"/>
    </svg>`,
  bush: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="92" rx="42" ry="6" fill="rgba(50,70,45,.13)"/>
      <circle cx="30" cy="66" r="24" fill="${G.leaf2}"/>
      <circle cx="68" cy="64" r="26" fill="${G.leaf1}"/>
      <circle cx="50" cy="54" r="26" fill="${G.leaf3}"/>
      <circle cx="36" cy="46" r="12" fill="#fff" opacity=".22"/>
      <circle cx="42" cy="72" r="3" fill="#ff8f6e"/>
      <circle cx="62" cy="60" r="3" fill="#ffd166"/>
    </svg>`,
  jungleLeaf: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 98 Q8 62 16 14 Q62 12 86 54 Q66 82 50 98Z" fill="#3f9b58"/>
      <path d="M50 98 Q42 60 18 20" stroke="#2f7f45" stroke-width="4" fill="none"/>
      <path d="M30 46 Q44 50 52 60 M40 64 Q52 66 60 74 M26 30 Q38 36 44 44" stroke="#2f7f45" stroke-width="3" fill="none"/>
    </svg>`,
  vine: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMin meet">
      <path d="M50 0 Q34 26 50 44 Q66 62 50 84 Q44 92 48 100" stroke="#4ea862" stroke-width="5" fill="none"/>
      <g fill="#7ed08a"><circle cx="42" cy="18" r="6"/><circle cx="58" cy="36" r="6"/><circle cx="42" cy="56" r="6"/><circle cx="58" cy="74" r="6"/></g>
    </svg>`,
  cactus: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="96" rx="24" ry="4" fill="rgba(80,70,50,.14)"/>
      <rect x="40" y="26" width="20" height="70" rx="10" fill="#5fae6a"/>
      <path d="M40 56 Q24 56 22 40" stroke="#5fae6a" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M60 46 Q78 46 80 32" stroke="#6fbd78" stroke-width="13" fill="none" stroke-linecap="round"/>
      <g stroke="#d8f0c0" stroke-width="2"><path d="M50 34 v10"/><path d="M50 54 v8"/><path d="M50 74 v8"/></g>
      <circle cx="50" cy="24" r="6" fill="#ff8fa3"/>
    </svg>`,
  mushroom: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="42" y="52" width="16" height="40" rx="8" fill="#fff3e0"/>
      <path d="M18 54 Q18 20 50 20 Q82 20 82 54 Z" fill="#ff8fa3"/>
      <circle cx="38" cy="38" r="6" fill="#fff" opacity=".85"/>
      <circle cx="60" cy="34" r="4.5" fill="#fff" opacity=".85"/>
      <circle cx="66" cy="46" r="3.5" fill="#fff" opacity=".85"/>
    </svg>`,
  grass: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M20 98 Q24 66 16 44 Q34 64 32 98 Z" fill="#7ed08a"/>
      <path d="M46 98 Q50 56 44 34 Q62 60 60 98 Z" fill="#8fdc9a"/>
      <path d="M72 98 Q78 70 74 52 Q88 70 84 98 Z" fill="#6cc97a"/>
    </svg>`,
  flower: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 96 L50 52" stroke="#63b96f" stroke-width="6" stroke-linecap="round"/>
      <path d="M50 74 Q34 66 32 54 Q48 56 50 70 Z" fill="#7ed08a"/>
      <circle cx="50" cy="34" r="9" fill="#ffd166"/>
      <circle cx="50" cy="16" r="10" fill="COLOR"/>
      <circle cx="68" cy="28" r="10" fill="COLOR"/>
      <circle cx="62" cy="48" r="10" fill="COLOR"/>
      <circle cx="38" cy="48" r="10" fill="COLOR"/>
      <circle cx="32" cy="28" r="10" fill="COLOR"/>
      <circle cx="46" cy="28" r="4" fill="#fff" opacity=".4"/>
    </svg>`,
  sunflower: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 96 V40" stroke="#5aa85f" stroke-width="7" stroke-linecap="round"/>
      <path d="M50 74 Q32 68 30 56 Q48 58 50 70Z" fill="#6cbf72"/>
      <g fill="#ffc93c"><circle cx="50" cy="16" r="10"/><circle cx="70" cy="28" r="10"/><circle cx="74" cy="48" r="10"/><circle cx="50" cy="58" r="10"/><circle cx="26" cy="48" r="10"/><circle cx="30" cy="28" r="10"/></g>
      <circle cx="50" cy="38" r="15" fill="#8a5a3b"/><circle cx="46" cy="34" r="4" fill="#b0805a"/>
    </svg>`,
  lilypad: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 90 A40 30 0 1 1 50 30 A40 30 0 0 1 50 90Z" fill="#7ed08a"/>
      <path d="M50 90 L70 60" stroke="#a9e392" stroke-width="6"/>
      <circle cx="50" cy="50" r="7" fill="#ffb3cd"/>
    </svg>`,
  reed: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g stroke="#a9c94e" stroke-width="4" fill="none"><path d="M30 98 Q28 60 30 26"/><path d="M50 98 Q48 56 52 18"/><path d="M70 98 Q68 62 70 32"/></g>
      <g fill="#b98cd6"><ellipse cx="30" cy="20" rx="6" ry="13"/><ellipse cx="52" cy="12" rx="6" ry="13"/><ellipse cx="70" cy="26" rx="6" ry="13"/></g>
    </svg>`,

  /* 바위 · 지형 */
  rock: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="94" rx="34" ry="5" fill="rgba(50,70,45,.12)"/>
      <path d="M14 90 L24 46 Q30 26 52 26 Q76 26 82 50 L88 90 Z" fill="${G.rock}"/>
      <path d="M24 46 Q30 26 52 26 L48 90 L20 90 Z" fill="${G.rockDark}" opacity=".45"/>
      <path d="M60 40 L70 62 L58 58 Z" fill="#fff" opacity=".35"/>
    </svg>`,
  icePeak: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M2 96 L34 26 L54 60 L68 38 L98 96 Z" fill="#a9c4e0"/>
      <path d="M34 26 L44 46 L34 44 L26 52 Z" fill="#fff"/>
      <path d="M68 38 L76 56 L68 54 L62 60 Z" fill="#fff"/>
      <path d="M54 60 L64 80 L44 80 Z" fill="#fff" opacity=".7"/>
    </svg>`,
  volcano: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M2 96 L34 24 L50 34 L66 24 L98 96 Z" fill="#5b4550"/>
      <path d="M34 24 L50 34 L66 24 L60 32 L50 28 L40 32 Z" fill="#ff8a3c"/>
      <path d="M46 30 Q44 50 50 64 Q56 50 54 30" fill="#ff6b2c" opacity=".85"/>
      <circle cx="30" cy="70" r="4" fill="#ff9a4a" opacity=".7"/>
      <circle cx="72" cy="80" r="5" fill="#ff9a4a" opacity=".6"/>
    </svg>`,
  dune: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M0 96 Q26 40 52 62 Q74 82 100 52 L100 96 Z" fill="#e8b06a"/>
      <path d="M0 96 Q30 66 60 80 Q82 90 100 78 L100 96 Z" fill="#d99b55"/>
    </svg>`,
  pyramid: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M6 96 L50 24 L94 96 Z" fill="#e0c08a"/>
      <path d="M50 24 L50 96 L22 96 Z" fill="#cdad78" opacity=".6"/>
      <path d="M50 24 L62 44 L50 52 L38 44 Z" fill="#f0d8a8"/>
      <path d="M30 72 H70 M22 84 H78" stroke="#cdad78" stroke-width="3"/>
    </svg>`,
  pillar: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="34" y="18" width="32" height="8" rx="2" fill="#e2dccb"/>
      <rect x="38" y="26" width="24" height="60" fill="#f0ece0"/>
      <path d="M44 26 V86 M56 26 V86" stroke="#ded8c8" stroke-width="3"/>
      <rect x="30" y="86" width="40" height="10" rx="2" fill="#e2dccb"/>
      <path d="M38 26 h24 v6 h-24z" fill="#cfc7b4" opacity=".6"/>
    </svg>`,
  arch: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M12 96 V44 Q50 6 88 44 V96 H72 V50 Q50 24 28 50 V96Z" fill="#e8e2d0"/>
      <path d="M12 44 Q50 6 88 44 L82 48 Q50 18 18 48Z" fill="#d6cfb9"/>
      <path d="M20 70 h8 M72 70 h8" stroke="#c9c1aa" stroke-width="3"/>
    </svg>`,
  pagoda: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="42" y="76" width="16" height="20" fill="#8a5a3b"/>
      <path d="M14 76 H86 L74 62 H26 Z" fill="#c0573f"/>
      <path d="M20 62 H80 L70 48 H30 Z" fill="#d46a4d"/>
      <path d="M26 48 H74 L66 34 H34 Z" fill="#c0573f"/>
      <path d="M34 34 H66 L58 20 H42 Z" fill="#d46a4d"/>
      <rect x="48" y="8" width="4" height="14" fill="#8a5a3b"/>
      <circle cx="50" cy="8" r="4" fill="#ffd166"/>
      <rect x="46" y="82" width="8" height="14" fill="#3d2a1e"/>
    </svg>`,
  gem: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 6 L74 34 L64 92 H36 L26 34 Z" fill="#8fe0ef"/>
      <path d="M50 6 L50 92 H36 L26 34 Z" fill="#c8f5fc" opacity=".85"/>
      <path d="M26 34 H74" stroke="#fff" stroke-width="3" opacity=".7"/>
      <path d="M74 34 L64 92" stroke="#5fc7d8" stroke-width="3"/>
      <path d="M38 20 L44 34" stroke="#fff" stroke-width="4" opacity=".8"/>
    </svg>`,
  crystal: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M28 96 L34 52 L46 40 L52 96Z" fill="#b9a4ff"/>
      <path d="M46 96 L54 34 L66 24 L74 96Z" fill="#cbb8ff"/>
      <path d="M12 96 L20 66 L30 60 L34 96Z" fill="#a88ff0"/>
      <path d="M54 34 L60 60 L48 66Z" fill="#fff" opacity=".4"/>
    </svg>`,
  stalactite: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMin meet">
      <path d="M0 0 H100 V10 L88 52 L80 10 L66 70 L58 12 L44 44 L36 10 L22 60 L14 10 L0 34Z" fill="#6b5b86"/>
    </svg>`,

  /* 바다 */
  coral: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 96 L50 54" stroke="${G.coral}" stroke-width="10" stroke-linecap="round"/>
      <path d="M50 72 Q28 66 26 40" stroke="${G.coral}" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M50 62 Q74 56 76 30" stroke="${G.coral2}" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="26" cy="38" r="7" fill="${G.coral2}"/>
      <circle cx="76" cy="28" r="8" fill="${G.coral}"/>
      <circle cx="50" cy="50" r="8" fill="${G.coral3}"/>
    </svg>`,
  seaweed: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 100 Q30 74 44 56 Q58 38 44 18" stroke="#4fbf8f" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M68 100 Q56 80 66 62 Q74 50 66 40" stroke="#7ad9ac" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M30 100 Q22 82 30 68" stroke="#3aa87a" stroke-width="7" fill="none" stroke-linecap="round"/>
    </svg>`,
  fish: `
    <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="46" cy="35" rx="30" ry="19" fill="#ffb98a"/>
      <path d="M74 35 L96 18 L92 35 L96 52 Z" fill="#ffcf9e"/>
      <circle cx="30" cy="30" r="4" fill="#4a3a76"/>
      <path d="M46 18 Q52 8 60 18" fill="#ffd6b8"/>
      <circle cx="58" cy="42" r="4" fill="#fff" opacity=".5"/>
    </svg>`,
  jellyfish: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M14 48 Q14 10 50 10 Q86 10 86 48 Q68 58 50 48 Q32 58 14 48Z" fill="#ffb3cd" opacity=".9"/>
      <g stroke="#ffd6e6" stroke-width="5" fill="none" stroke-linecap="round">
        <path d="M30 52 Q24 70 32 92"/><path d="M44 54 Q40 74 46 94"/><path d="M58 54 Q62 74 56 92"/><path d="M72 52 Q78 70 70 90"/>
      </g>
      <circle cx="40" cy="26" r="5" fill="#fff" opacity=".5"/>
    </svg>`,
  shell: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 92 Q8 76 14 44 Q50 8 86 44 Q92 76 50 92Z" fill="#ffe0c8"/>
      <g stroke="#f2b894" stroke-width="3" fill="none"><path d="M50 88 L30 34"/><path d="M50 88 L40 24"/><path d="M50 88 L50 20"/><path d="M50 88 L60 24"/><path d="M50 88 L70 34"/></g>
      <circle cx="50" cy="86" r="6" fill="#f7a6cf"/>
    </svg>`,
  starfish: `
    <svg viewBox="0 0 100 100" preset="xMidYMid meet">
      <path d="M50 6 L61 38 L96 38 L68 58 L78 92 L50 72 L22 92 L32 58 L4 38 L39 38 Z" fill="#ffb3a0"/>
      <circle cx="50" cy="46" r="6" fill="#ffe0d0"/>
    </svg>`,
  bubble: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="34" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.75)" stroke-width="4"/>
      <circle cx="38" cy="36" r="8" fill="rgba(255,255,255,.65)"/>
    </svg>`,
  waves: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M0 92 Q18 74 34 86 Q50 98 66 86 Q82 74 100 88 L100 100 H0Z" fill="#5fc7ea"/>
      <path d="M0 96 Q16 84 32 92 Q48 100 64 92 Q80 84 100 94 L100 100 H0Z" fill="#3aa9d8"/>
    </svg>`,
  pond: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <ellipse cx="50" cy="52" rx="49" ry="44" fill="#a8e4f7"/>
      <ellipse cx="50" cy="50" rx="45" ry="40" fill="#8fd8f2"/>
      <ellipse cx="44" cy="44" rx="26" ry="20" fill="#b8ecfa" opacity=".75"/>
      <ellipse cx="60" cy="60" rx="10" ry="6" fill="#fff" opacity=".35"/>
    </svg>`,

  /* 건물 · 놀이 */
  center: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="14" y="46" width="72" height="50" rx="8" fill="#fffdf6"/>
      <path d="M10 48 Q50 8 90 48 Z" fill="#ff8fb1"/>
      <rect x="44" y="62" width="12" height="34" rx="4" fill="#9fd8ff"/>
      <circle cx="50" cy="40" r="11" fill="#fff" stroke="#f2648f" stroke-width="4"/>
      <path d="M50 33 v14 M43 40 h14" stroke="#f2648f" stroke-width="4" stroke-linecap="round"/>
      <rect x="20" y="58" width="16" height="12" rx="3" fill="#bfe9ff"/>
      <rect x="64" y="58" width="16" height="12" rx="3" fill="#bfe9ff"/>
    </svg>`,
  tent: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 14 L92 96 H8 Z" fill="#f4a259"/>
      <path d="M50 14 L62 96 H38 Z" fill="#e8873c"/>
      <path d="M50 14 L50 30" stroke="#8a5a3b" stroke-width="4"/>
      <path d="M50 62 L60 96 H40 Z" fill="#8a4c2a"/>
      <path d="M8 96 L50 14 L92 96" fill="none" stroke="#c9782f" stroke-width="4"/>
    </svg>`,
  campfire: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g stroke="#8a5a3b" stroke-width="9" stroke-linecap="round"><path d="M22 92 L78 84"/><path d="M24 84 L76 92"/></g>
      <path d="M50 40 Q64 60 60 76 Q56 88 50 88 Q44 88 40 76 Q36 60 50 40Z" fill="#ff9a3c"/>
      <path d="M50 54 Q58 68 55 78 Q52 85 50 85 Q48 85 45 78 Q42 68 50 54Z" fill="#ffe066"/>
    </svg>`,
  lantern: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="47" y="6" width="6" height="12" fill="#8a6fae"/>
      <rect x="30" y="16" width="40" height="10" rx="4" fill="#c9b6ff"/>
      <rect x="24" y="26" width="52" height="46" rx="14" fill="#ffe9a8" stroke="#f2b53f" stroke-width="4"/>
      <path d="M38 26 v46 M62 26 v46" stroke="#f2b53f" stroke-width="3"/>
      <rect x="32" y="72" width="36" height="8" rx="4" fill="#c9b6ff"/>
      <rect x="48" y="80" width="4" height="10" fill="#8a6fae"/>
    </svg>`,
  streetlamp: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="20" y="90" width="30" height="6" rx="3" fill="#57617a"/>
      <rect x="32" y="24" width="6" height="68" rx="3" fill="#57617a"/>
      <path d="M35 24 Q35 10 58 10" stroke="#57617a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="14" r="10" fill="#ffe08a"/>
      <circle cx="60" cy="14" r="15" fill="#ffe08a" opacity=".22"/>
    </svg>`,
  ferris: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <circle cx="50" cy="40" r="30" fill="none" stroke="#8f7ae8" stroke-width="5"/>
      <g stroke="#a99ae8" stroke-width="3">
        <path d="M50 40 L50 10"/><path d="M50 40 L80 40"/><path d="M50 40 L50 70"/><path d="M50 40 L20 40"/>
        <path d="M50 40 L71 19"/><path d="M50 40 L71 61"/><path d="M50 40 L29 61"/><path d="M50 40 L29 19"/>
      </g>
      <circle cx="50" cy="40" r="6" fill="#ff8fb1"/>
      <g fill="#ffd166"><rect x="46" y="4" width="8" height="8" rx="2"/><rect x="46" y="68" width="8" height="8" rx="2"/>
      <rect x="76" y="36" width="8" height="8" rx="2"/><rect x="16" y="36" width="8" height="8" rx="2"/>
      <rect x="65" y="15" width="8" height="8" rx="2"/><rect x="65" y="57" width="8" height="8" rx="2"/></g>
      <path d="M50 46 L34 96 M50 46 L66 96" stroke="#8f7ae8" stroke-width="6" stroke-linecap="round"/>
      <rect x="26" y="94" width="48" height="4" rx="2" fill="#6a5aa8"/>
    </svg>`,
  carousel: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 8 L92 34 H8 Z" fill="#ff9fc0"/>
      <path d="M50 8 L92 34 H8 Z" fill="none" stroke="#fff" stroke-width="4"/>
      <path d="M14 34 v62 M50 34 v62 M86 34 v62" stroke="#e0cbb0" stroke-width="5"/>
      <rect x="10" y="30" width="80" height="8" rx="4" fill="#ffd166"/>
      <g fill="#fff"><circle cx="26" cy="66" r="7"/><circle cx="50" cy="66" r="7"/><circle cx="74" cy="66" r="7"/></g>
      <path d="M20 74 q6 10 12 0 M44 74 q6 10 12 0 M68 74 q6 10 12 0" stroke="#8a6fae" stroke-width="3" fill="none"/>
      <rect x="8" y="94" width="84" height="4" rx="2" fill="#c9b6ff"/>
    </svg>`,
  slide: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M30 96 V30 h10 V96" fill="#9fd8ff"/>
      <path d="M36 30 Q70 40 84 96" stroke="#ffd166" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M30 30 h44" stroke="#4aa8e0" stroke-width="8" stroke-linecap="round"/>
      <circle cx="30" cy="24" r="6" fill="#ff8fb1"/>
    </svg>`,
  swing: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M20 96 L50 20 L80 96" fill="none" stroke="#b0805a" stroke-width="7" stroke-linecap="round"/>
      <path d="M32 70 h36" stroke="#b0805a" stroke-width="5"/>
      <g stroke="#8a6fae" stroke-width="2"><path d="M38 70 v24"/><path d="M56 70 v24"/></g>
      <rect x="34" y="92" width="26" height="6" rx="3" fill="#ffd166"/>
    </svg>`,
  seesaw: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M50 92 L34 92 L50 62 L66 92Z" fill="#c9b6ff"/>
      <rect x="10" y="58" width="80" height="8" rx="4" fill="#ffd166" transform="rotate(-6 50 62)"/>
      <circle cx="20" cy="52" r="6" fill="#ff8fb1"/><circle cx="80" cy="66" r="6" fill="#8fe0bd"/>
    </svg>`,
  bench: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="12" y="46" width="76" height="8" rx="4" fill="#c98a4a"/>
      <path d="M20 46 v-16 h60 v16" stroke="#b0805a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <rect x="20" y="54" width="6" height="26" fill="#8a5a3b"/><rect x="74" y="54" width="6" height="26" fill="#8a5a3b"/>
    </svg>`,
  windmill: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M36 96 L42 44 H58 L64 96Z" fill="#fff8ec"/>
      <path d="M42 44 L50 30 L58 44Z" fill="#ff8fb1"/>
      <g stroke="#8a6fae" stroke-width="5" stroke-linecap="round"><path d="M50 42 L50 6"/><path d="M50 42 L80 26"/><path d="M50 42 L50 78"/><path d="M50 42 L20 26"/></g>
      <circle cx="50" cy="42" r="5" fill="#ffd166"/>
      <rect x="45" y="76" width="10" height="20" rx="3" fill="#c98a4a"/>
    </svg>`,
  hay: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="62" rx="34" ry="30" fill="#f2c96a"/>
      <ellipse cx="50" cy="62" rx="26" ry="22" fill="#ffda85"/>
      <path d="M26 50 Q50 62 74 50 M24 70 Q50 82 76 70" stroke="#e0b154" stroke-width="3" fill="none"/>
    </svg>`,
  sheep: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g fill="#fff"><circle cx="42" cy="52" r="20"/><circle cx="62" cy="48" r="16"/><circle cx="54" cy="66" r="16"/><circle cx="34" cy="66" r="13"/></g>
      <circle cx="74" cy="58" r="12" fill="#f0e6ff"/><circle cx="78" cy="54" r="2" fill="#3d3357"/>
      <path d="M38 78 v12 M52 80 v10 M64 78 v12" stroke="#4a3a76" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  train: `
    <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMax meet">
      <rect x="10" y="18" width="62" height="34" rx="8" fill="#4a6fb5"/>
      <rect x="16" y="10" width="30" height="12" rx="4" fill="#6b8fd6"/>
      <rect x="60" y="8" width="10" height="10" rx="2" fill="#3a2f60"/>
      <circle cx="24" cy="56" r="9" fill="#3a2f60"/><circle cx="42" cy="56" r="9" fill="#3a2f60"/><circle cx="62" cy="56" r="9" fill="#3a2f60"/>
      <circle cx="24" cy="56" r="4" fill="#c9c3d6"/><circle cx="42" cy="56" r="4" fill="#c9c3d6"/><circle cx="62" cy="56" r="4" fill="#c9c3d6"/>
      <rect x="20" y="24" width="14" height="12" rx="3" fill="#bfe9ff"/><rect x="40" y="24" width="14" height="12" rx="3" fill="#bfe9ff"/>
      <rect x="72" y="34" width="18" height="14" rx="4" fill="#5b4550"/><circle cx="80" cy="56" r="6" fill="#3a2f60"/>
    </svg>`,
  rail: `
    <svg viewBox="0 0 100 20" preserveAspectRatio="none">
      <g stroke="#8a7a9b" stroke-width="3"><path d="M0 8 H100"/><path d="M0 15 H100"/></g>
      <g stroke="#b0a3c2" stroke-width="3"><path d="M6 4 v15"/><path d="M22 4 v15"/><path d="M38 4 v15"/><path d="M54 4 v15"/><path d="M70 4 v15"/><path d="M86 4 v15"/></g>
    </svg>`,
  clock: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="34" fill="#fffdf6" stroke="#8a6fae" stroke-width="6"/>
      <path d="M50 30v22l16 10" stroke="#3d3357" stroke-width="5" fill="none" stroke-linecap="round"/>
    </svg>`,
  bookshelf: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="10" y="10" width="80" height="86" rx="6" fill="#b0805a"/>
      <g fill="#fff8ec"><rect x="16" y="18" width="68" height="20"/><rect x="16" y="44" width="68" height="20"/><rect x="16" y="70" width="68" height="20"/></g>
      <g>
        <rect x="19" y="20" width="7" height="16" fill="#ff8fb1"/><rect x="28" y="22" width="6" height="14" fill="#8fd0f0"/><rect x="36" y="19" width="7" height="17" fill="#ffd166"/><rect x="45" y="23" width="6" height="13" fill="#a9c94e"/><rect x="53" y="20" width="7" height="16" fill="#c9b6ff"/><rect x="62" y="22" width="6" height="14" fill="#ffa987"/><rect x="70" y="19" width="7" height="17" fill="#8fe0bd"/>
        <rect x="19" y="46" width="7" height="16" fill="#8fe0bd"/><rect x="28" y="48" width="6" height="14" fill="#c9b6ff"/><rect x="36" y="45" width="7" height="17" fill="#ff8fb1"/><rect x="45" y="49" width="6" height="13" fill="#ffd166"/><rect x="53" y="46" width="7" height="16" fill="#8fd0f0"/><rect x="62" y="48" width="6" height="14" fill="#a9c94e"/><rect x="70" y="45" width="7" height="17" fill="#ffa987"/>
        <rect x="19" y="72" width="7" height="16" fill="#ffd166"/><rect x="28" y="74" width="6" height="14" fill="#ff8fb1"/><rect x="36" y="71" width="7" height="17" fill="#c9b6ff"/><rect x="45" y="75" width="6" height="13" fill="#8fe0bd"/><rect x="53" y="72" width="7" height="16" fill="#ffa987"/><rect x="62" y="74" width="6" height="14" fill="#8fd0f0"/>
      </g>
    </svg>`,
  window: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <rect x="8" y="8" width="84" height="84" rx="8" fill="#bfe9ff" stroke="#fff" stroke-width="6"/>
      <path d="M50 8v84M8 50h84" stroke="#fff" stroke-width="6"/>
      <path d="M14 40 Q34 20 46 40" fill="#fff" opacity=".5"/>
    </svg>`,
  cake: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="18" y="52" width="64" height="42" rx="8" fill="#fff0f6"/>
      <rect x="18" y="46" width="64" height="14" rx="7" fill="#ff9fc0"/>
      <rect x="26" y="66" width="48" height="8" rx="4" fill="#ffd166" opacity=".85"/>
      <g stroke="#ff8fb1" stroke-width="4" stroke-linecap="round"><path d="M36 22 v22"/><path d="M50 16 v28"/><path d="M64 22 v22"/></g>
      <g fill="#ffe066"><circle cx="36" cy="18" r="4"/><circle cx="50" cy="12" r="4"/><circle cx="64" cy="18" r="4"/></g>
    </svg>`,
  cupcake: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M28 54 h44 l-6 42 h-32 z" fill="#e8c9a0"/>
      <path d="M26 56 q4 -26 24 -26 q20 0 24 26 z" fill="#ffc0da"/>
      <circle cx="50" cy="26" r="6" fill="#ff5c8a"/>
      <path d="M34 62 h32 M36 74 h28" stroke="#d6a87e" stroke-width="3"/>
    </svg>`,
  awning: `
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      <rect width="100" height="22" fill="#ff8fb1"/>
      <g fill="#fff" opacity=".92"><rect x="0" width="12.5" height="22"/><rect x="25" width="12.5" height="22"/><rect x="50" width="12.5" height="22"/><rect x="75" width="12.5" height="22"/></g>
      <g fill="#ff8fb1"><circle cx="6" cy="22" r="6.3"/><circle cx="18" cy="22" r="6.3"/><circle cx="31" cy="22" r="6.3"/><circle cx="43" cy="22" r="6.3"/><circle cx="56" cy="22" r="6.3"/><circle cx="68" cy="22" r="6.3"/><circle cx="81" cy="22" r="6.3"/><circle cx="93" cy="22" r="6.3"/></g>
    </svg>`,
  table: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="10" y="46" width="80" height="10" rx="5" fill="#c99a6a"/>
      <rect x="16" y="56" width="8" height="40" fill="#b0805a"/><rect x="76" y="56" width="8" height="40" fill="#b0805a"/>
      <rect x="24" y="92" width="52" height="4" rx="2" fill="#8a5a3b"/>
    </svg>`,
  ship: `
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMax meet">
      <path d="M8 56 H92 L80 76 H20 Z" fill="#8a5a3b"/>
      <path d="M8 56 H92" stroke="#b0805a" stroke-width="5"/>
      <rect x="48" y="8" width="6" height="50" fill="#8a5a3b"/>
      <path d="M54 12 Q78 22 54 40 Z" fill="#fff8ec"/>
      <path d="M48 18 L26 34 L48 40 Z" fill="#ffd166"/>
      <path d="M54 6 L54 14 L70 8Z" fill="#3d3357"/>
      <circle cx="26" cy="62" r="3" fill="#3a2f60"/><circle cx="40" cy="62" r="3" fill="#3a2f60"/><circle cx="60" cy="62" r="3" fill="#3a2f60"/><circle cx="74" cy="62" r="3" fill="#3a2f60"/>
    </svg>`,
  sail: `
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMax meet">
      <path d="M12 62 H88 L76 76 H24 Z" fill="#c98a4a"/>
      <rect x="48" y="14" width="4" height="48" fill="#8a5a3b"/>
      <path d="M52 18 Q72 32 52 46Z" fill="#fff8ec"/>
      <path d="M48 22 L30 40 L48 44Z" fill="#ff9fc0"/>
    </svg>`,
  lighthouse: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M34 96 L40 30 H60 L66 96 Z" fill="#fffdf6"/>
      <path d="M36 66 H64 L66 96 H34 Z" fill="#ff8fb1"/>
      <rect x="38" y="18" width="24" height="14" rx="4" fill="#ffd166"/>
      <path d="M40 18 L50 6 L60 18Z" fill="#f2648f"/>
      <circle cx="50" cy="25" r="4" fill="#fff6c9"/>
      <circle cx="50" cy="25" r="12" fill="#fff6c9" opacity=".3"/>
    </svg>`,
  cityTower: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="14" y="34" width="30" height="62" rx="3" fill="#3b3560"/>
      <rect x="50" y="16" width="26" height="80" rx="3" fill="#4a4270"/>
      <rect x="22" y="20" width="14" height="14" fill="#2f2a4d"/>
      <g fill="#ffd166"><rect x="20" y="44" width="6" height="7"/><rect x="32" y="44" width="6" height="7"/><rect x="20" y="58" width="6" height="7"/><rect x="32" y="58" width="6" height="7"/><rect x="56" y="26" width="6" height="7"/><rect x="66" y="40" width="6" height="7"/><rect x="56" y="54" width="6" height="7"/><rect x="66" y="68" width="6" height="7"/></g>
      <g fill="#fff1a8" opacity=".55"><rect x="20" y="72" width="6" height="7"/><rect x="66" y="82" width="6" height="7"/></g>
    </svg>`,
  tank: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <rect x="6" y="12" width="88" height="80" rx="10" fill="#9fe0f5" opacity=".8" stroke="#fff" stroke-width="6"/>
      <rect x="14" y="20" width="72" height="64" rx="6" fill="#5fc7ea" opacity=".35"/>
      <path d="M20 80 Q34 66 48 80" stroke="#ffe0a8" stroke-width="6" fill="none"/>
      <circle cx="30" cy="42" r="3" fill="#fff" opacity=".7"/><circle cx="42" cy="34" r="2.4" fill="#fff" opacity=".6"/>
      <path d="M56 44 q10 -8 20 0 q-10 8 -20 0z" fill="#ffb98a"/>
    </svg>`,
  glassPane: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g fill="#dff2ff" opacity=".5" stroke="#fff" stroke-width="4"><path d="M6 40 L50 8 L94 40Z"/><rect x="10" y="40" width="80" height="54"/></g>
      <g stroke="#fff" stroke-width="3" opacity=".9"><path d="M50 8 V94"/><path d="M10 62 H90"/><path d="M30 30 V94"/><path d="M70 30 V94"/></g>
    </svg>`,
  gate: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M18 96 V44 Q50 16 82 44 V96" fill="none" stroke="#2f2444" stroke-width="10"/>
      <g fill="#2f2444"><rect x="8" y="40" width="16" height="56"/><rect x="76" y="40" width="16" height="56"/><path d="M8 40 L16 22 L24 40Z"/><path d="M76 40 L84 22 L92 40Z"/></g>
      <circle cx="50" cy="60" r="4" fill="#c9b6ff"/>
    </svg>`,
  castle: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g fill="#4b3768">
        <rect x="10" y="44" width="20" height="52"/><rect x="39" y="26" width="22" height="70"/><rect x="70" y="44" width="20" height="52"/>
        <path d="M10 44 L20 26 L30 44 Z"/><path d="M39 26 L50 4 L61 26 Z"/><path d="M70 44 L80 26 L90 44 Z"/>
      </g>
      <g fill="#ffd166"><rect x="16" y="56" width="8" height="11" rx="3"/><rect x="46" y="40" width="8" height="11" rx="3"/><rect x="46" y="64" width="8" height="11" rx="3"/><rect x="76" y="58" width="8" height="11" rx="3"/></g>
      <path d="M42 96 v-18 q8 -8 16 0 v18z" fill="#221a38"/>
      <g fill="#c9b6ff" opacity=".55"><circle cx="50" cy="12" r="2"/><circle cx="22" cy="18" r="1.6"/><circle cx="78" cy="22" r="1.6"/></g>
    </svg>`,
  bat: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
      <path d="M50 30 Q34 6 12 12 Q22 24 14 34 Q30 32 38 44 Q44 34 50 30 Q56 34 62 44 Q70 32 86 34 Q78 24 88 12 Q66 6 50 30Z" fill="#4b3a6b"/>
      <circle cx="47" cy="28" r="2.2" fill="#ffd166"/><circle cx="53" cy="28" r="2.2" fill="#ffd166"/>
    </svg>`,
  pumpkin: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="62" rx="38" ry="30" fill="#ff9a3c"/>
      <ellipse cx="50" cy="62" rx="24" ry="30" fill="#ffab55"/>
      <ellipse cx="50" cy="62" rx="10" ry="30" fill="#ffc172"/>
      <path d="M50 32 q2 -10 10 -12" stroke="#4f8a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M34 58 l10 0 l-5 8z M56 58 l10 0 l-5 8z" fill="#3a2f60"/>
    </svg>`,
  iceberg: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M6 96 L26 34 L46 52 L62 22 L94 96 Z" fill="#cdeeff"/>
      <path d="M26 34 L46 52 L62 22 L58 50 L46 60 L34 48Z" fill="#fff" opacity=".85"/>
      <path d="M6 96 H94" stroke="#a9dcf2" stroke-width="4"/>
    </svg>`,
  igloo: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <path d="M8 94 Q8 34 50 34 Q92 34 92 94Z" fill="#f4fbff" stroke="#cde8f7" stroke-width="3"/>
      <path d="M34 94 v-22 q16 -14 32 0 v22z" fill="#bfe0f0"/>
      <path d="M22 58 h12 M40 46 h12 M62 52 h14" stroke="#d6ecf8" stroke-width="3"/>
    </svg>`,
  snowman: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <circle cx="50" cy="76" r="22" fill="#fff"/><circle cx="50" cy="46" r="16" fill="#fff"/><circle cx="50" cy="24" r="12" fill="#fff"/>
      <circle cx="46" cy="22" r="2" fill="#3d3357"/><circle cx="54" cy="22" r="2" fill="#3d3357"/>
      <path d="M50 26 l8 3 -8 3z" fill="#ff9a3c"/>
      <path d="M50 56 l0 8" stroke="#ff8fb1" stroke-width="3"/><path d="M42 62 h16" stroke="#ff8fb1" stroke-width="3"/>
      <path d="M34 16 h32 l-4 -10 h-24z" fill="#4a6fb5"/><path d="M28 8 h44" stroke="#4a6fb5" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  island: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M14 48 Q50 26 86 48 Q50 62 14 48Z" fill="#8ed57c"/>
      <path d="M14 48 Q30 62 24 82 Q46 92 50 96 Q56 88 76 82 Q72 62 86 48 Q50 62 14 48Z" fill="#a8846a" opacity=".9"/>
      <path d="M30 40 Q50 30 68 40" stroke="#6cc97a" stroke-width="4" fill="none"/>
      <circle cx="38" cy="36" r="3" fill="#ffd166"/><circle cx="62" cy="38" r="3" fill="#ffb3cd"/>
    </svg>`,
  fence: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <g fill="#fff6e6" stroke="#e0cbb0" stroke-width="3">
        <rect x="8" y="30" width="14" height="66" rx="5"/><rect x="42" y="22" width="14" height="74" rx="5"/>
        <rect x="76" y="30" width="14" height="66" rx="5"/>
        <rect x="0" y="46" width="100" height="10" rx="4"/><rect x="0" y="70" width="100" height="10" rx="4"/>
      </g>
    </svg>`,
  log: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMax meet">
      <rect x="4" y="18" width="92" height="34" rx="17" fill="#b0805a"/>
      <ellipse cx="18" cy="35" rx="13" ry="17" fill="#d6a87e"/>
      <ellipse cx="18" cy="35" rx="7" ry="9" fill="#c1926a"/>
    </svg>`,
  stump: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="94" rx="34" ry="5" fill="rgba(50,70,45,.14)"/>
      <path d="M18 92 L18 46 Q50 30 82 46 L82 92 Z" fill="#b0805a"/>
      <ellipse cx="50" cy="46" rx="32" ry="12" fill="#d6a87e"/>
      <ellipse cx="50" cy="46" rx="20" ry="7" fill="#c1926a" opacity=".7"/>
      <path d="M18 46 L82 46" stroke="#96684a" stroke-width="3"/>
    </svg>`,
  butterfly: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 50 Q20 12 10 34 Q4 58 46 58 Z" fill="#ffb3cd"/>
      <path d="M50 50 Q80 12 90 34 Q96 58 54 58 Z" fill="#ffc9dc"/>
      <path d="M50 54 Q26 74 20 66 Q16 56 46 52 Z" fill="#ffd6e6"/>
      <path d="M50 54 Q74 74 80 66 Q84 56 54 52 Z" fill="#ffe3ee"/>
      <ellipse cx="50" cy="52" rx="4" ry="16" fill="#8a6fae"/>
      <circle cx="20" cy="34" r="4" fill="#fff" opacity=".7"/><circle cx="80" cy="34" r="4" fill="#fff" opacity=".7"/>
    </svg>`,

  hill: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="none">
      <path d="M0 60 Q22 6 48 24 Q72 40 100 12 L100 60 Z" fill="COLOR"/>
    </svg>`,
  hill2: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="none">
      <path d="M0 60 Q30 18 58 34 Q80 46 100 30 L100 60 Z" fill="COLOR"/>
    </svg>`,

  /* 바닥 띠 */
  bandSand: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q20 4 40 12 Q60 20 80 8 Q92 2 100 10 L100 20Z" fill="#ffe0a8"/></svg>`,
  bandSnow: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q18 2 38 10 Q58 18 78 6 Q90 0 100 8 L100 20Z" fill="#ffffff"/><path d="M0 20 Q24 10 46 16 Q68 22 100 12 L100 20Z" fill="#eaf7ff"/></svg>`,
  bandGrass: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q22 6 44 14 Q66 22 100 10 L100 20Z" fill="#7cc95f"/><path d="M0 20 Q30 14 60 18 Q80 20 100 17 L100 20Z" fill="#69b950"/></svg>`,
  bandDarkGrass: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q22 4 44 12 Q66 20 100 8 L100 20Z" fill="#3f8a4f"/><path d="M0 20 Q30 12 60 16 Q80 19 100 15 L100 20Z" fill="#357946"/></svg>`,
  bandLava: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q20 4 40 10 Q60 16 80 6 Q92 0 100 8 L100 20Z" fill="#3a2530"/><path d="M12 16 q8 -6 16 0 M44 12 q10 -6 18 2 M74 14 q8 -4 16 2" stroke="#ff7a2c" stroke-width="2.4" fill="none"/></svg>`,
  bandWaves: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q10 6 20 14 Q30 22 40 12 Q50 2 60 12 Q70 22 80 12 Q90 2 100 12 L100 20Z" fill="#8fe0f5" opacity=".9"/><path d="M0 20 Q14 12 28 18 Q42 24 56 16 Q70 8 84 16 Q92 20 100 16 L100 20Z" fill="#5fc7ea"/></svg>`,
  bandPath: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q26 2 52 10 Q78 18 100 4 L100 20Z" fill="#e6ddca"/><path d="M0 20 Q30 10 60 16 Q80 20 100 14 L100 20Z" fill="#d6cbae"/></svg>`,
  bandDeck: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><rect y="4" width="100" height="16" fill="#b98a5a"/><g stroke="#9a6f45" stroke-width="1.2"><path d="M0 8h100M0 13h100M0 18h100"/><path d="M10 4v16M30 4v16M50 4v16M70 4v16M90 4v16"/></g></svg>`,
  bandTile: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><rect y="2" width="100" height="18" fill="#f3ece0"/><g stroke="#ded3c0" stroke-width="1.2"><path d="M0 8h100M0 14h100M12 2v18M36 2v18M60 2v18M84 2v18"/></g></svg>`,
  bandCave: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q22 4 44 12 Q66 20 100 6 L100 20Z" fill="#3a3050"/><path d="M0 20 Q30 12 60 17 Q80 20 100 15 L100 20Z" fill="#2d2540"/></svg>`,
  bandCloud: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q16 4 32 12 Q48 20 64 10 Q80 0 100 10 L100 20Z" fill="#ffffff" opacity=".85"/></svg>`,
  bandStone: `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q24 6 48 12 Q72 18 100 8 L100 20Z" fill="#cfc6b4"/><path d="M0 20 Q34 12 66 17 Q84 20 100 16 L100 20Z" fill="#bdb3a0"/></svg>`,
};

const FLOWER_COLORS = ['#ffb3cd', '#ffd166', '#c9b6ff', '#ffa987', '#fff0a0'];

/* ---------------- 렌더 ---------------- */
export function decor(item, attrs = '') {
  const {
    t, x = 0, y = null, b = null, w = 10, h = 10, f = false, c = null, color = null,
    r = 0, o = 1, hu = 0, br = 1, sa = 1, sc = 1, id = null, n = '',
  } = item;
  if (!t) return '';
  const col = c || color;
  let svg = SHAPES[t] || SHAPES.bush;
  if (col) svg = svg.replaceAll('COLOR', col);
  if (t === 'poke') {
    return `<span class="deco deco-poke" ${attrs} style="left:${x}%;top:${y != null ? y : 100 - (b || 0) - h}%;width:${w}%;height:${h}%;opacity:${o};transform:rotate(${r}deg) scaleX(${f ? -1 : 1}) scale(${sc});">
      <img src="${ART(id)}" alt="${n}" draggable="false"></span>`;
  }
  if (t.startsWith('band')) {
    return `<span class="deco band" ${attrs} style="left:0;bottom:0;width:100%;height:${h}%;opacity:${o};">${svg}</span>`;
  }
  const pos = `left:${x}%;${y != null ? `top:${y}%;` : `bottom:${b != null ? b : 0}%;`}width:${w}%;height:${h}%;`;
  const tf = `transform:rotate(${r}deg) scaleX(${f ? -1 : 1}) scale(${sc});`;
  const fl = (hu || br !== 1 || sa !== 1) ? `filter:hue-rotate(${hu}deg) brightness(${br}) saturate(${sa});` : '';
  return `<span class="deco" ${attrs} style="${pos}opacity:${o};${tf}${fl}">${svg}</span>`;
}

const ART = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

/* ---------------- 32가지 도안 ---------------- */
export const THEMES = {
  forest: {
    label: '초록 숲속', emoji: '🌳',
    sky: 'linear-gradient(180deg,#bfe9ff 0%,#e3f8ff 32%,#dcf8c8 32%,#a9e392 64%,#8ed57c 100%)',
    cover: ['bush', 'flower', 'grass', 'mushroom', 'tree', 'cloud', 'log'],
    items: [
      { t: 'hill', x: -8, b: 24, w: 66, h: 24, c: '#a9e392' },
      { t: 'hill2', x: 42, b: 18, w: 70, h: 20, c: '#86cf6f' },
      { t: 'sun', x: 4, y: 3, w: 9, h: 9, o: .9 },
      { t: 'cloud', x: 20, y: 5, w: 22, h: 11, o: .95 },
      { t: 'cloud', x: 60, y: 3, w: 16, h: 8, o: .85 },
      { t: 'tree', x: -4, b: 8, w: 22, h: 52 },
      { t: 'pine', x: 68, b: 7, w: 20, h: 50 },
      { t: 'tree', x: 86, b: 5, w: 15, h: 38, o: .95 },
      { t: 'bush', x: 20, b: 11, w: 15, h: 15 },
      { t: 'bush', x: 52, b: 9, w: 13, h: 13, o: .95 },
      { t: 'pond', x: 34, b: 12, w: 26, h: 14 },
      { t: 'rock', x: 62, b: 10, w: 9, h: 11 },
      { t: 'stump', x: 77, b: 8, w: 9, h: 9 },
    ],
    front: [
      { t: 'bush', x: -6, b: -6, w: 26, h: 20 },
      { t: 'bush', x: 26, b: -7, w: 24, h: 18 },
      { t: 'bush', x: 54, b: -6, w: 26, h: 20 },
      { t: 'bush', x: 82, b: -5, w: 22, h: 17 },
      { t: 'grass', x: 8, b: 12, w: 8, h: 9 },
      { t: 'flower', x: 30, b: 3, w: 6, h: 9, c: '#ffb3cd' },
      { t: 'flower', x: 66, b: 4, w: 6, h: 9, c: '#ffd166' },
      { t: 'mushroom', x: 46, b: 6, w: 5, h: 8 },
      { t: 'log', x: 70, b: 2, w: 13, h: 8 },
    ],
  },
  sea: {
    label: '산호 바닷속', emoji: '🐠',
    sky: 'linear-gradient(180deg,#8ee0f8 0%,#4fbdea 24%,#1b8cc9 62%,#0f6ba3 100%)',
    spotY: [20, 82],
    cover: ['seaweed', 'coral', 'starfish', 'bubble', 'fish', 'shell', 'rock'],
    items: [
      { t: 'fish', x: 62, y: 8, w: 15, h: 9, f: true, o: .85 },
      { t: 'fish', x: 16, y: 16, w: 12, h: 7, o: .6 },
      { t: 'fish', x: 40, y: 28, w: 10, h: 6, o: .45, f: true },
      { t: 'jellyfish', x: 80, y: 12, w: 12, h: 18, o: .85 },
      { t: 'bubble', x: 42, y: 6, w: 5, h: 5 },
      { t: 'bubble', x: 72, y: 30, w: 4, h: 4 },
      { t: 'coral', x: 2, b: 16, w: 17, h: 26 },
      { t: 'coral', x: 80, b: 14, w: 18, h: 28 },
      { t: 'seaweed', x: 22, b: 16, w: 9, h: 26, o: .9 },
      { t: 'seaweed', x: 65, b: 18, w: 8, h: 24, o: .85 },
      { t: 'rock', x: 46, b: 8, w: 12, h: 14, o: .9 },
      { t: 'bandSand', h: 10 },
    ],
    front: [
      { t: 'seaweed', x: -2, b: 2, w: 15, h: 24 },
      { t: 'seaweed', x: 36, b: 4, w: 12, h: 18 },
      { t: 'seaweed', x: 62, b: 2, w: 14, h: 22 },
      { t: 'seaweed', x: 88, b: 5, w: 11, h: 18 },
      { t: 'shell', x: 14, b: 4, w: 8, h: 7 },
      { t: 'starfish', x: 74, b: 6, w: 7, h: 7 },
      { t: 'bubble', x: 30, b: 16, w: 4, h: 4 },
      { t: 'bubble', x: 82, b: 22, w: 3, h: 3 },
      { t: 'rock', x: 2, b: 2, w: 9, h: 10 },
    ],
  },
  flower: {
    label: '봄 꽃밭', emoji: '🌸',
    sky: 'linear-gradient(180deg,#cfeaff 0%,#ffeaf6 30%,#eafbd2 30%,#bcec99 64%,#a4df85 100%)',
    cover: ['flower', 'bush', 'grass', 'butterfly', 'cloud', 'mushroom'],
    items: [
      { t: 'hill', x: -10, b: 22, w: 70, h: 22, c: '#c3eea0' },
      { t: 'hill2', x: 46, b: 16, w: 66, h: 18, c: '#aee18c' },
      { t: 'sun', x: 86, y: 4, w: 8, h: 8, o: .85 },
      { t: 'cloud', x: 8, y: 4, w: 22, h: 11 },
      { t: 'cloud', x: 56, y: 6, w: 16, h: 8, o: .85 },
      { t: 'rainbow', x: 60, y: 0, w: 34, h: 20, o: .55 },
      { t: 'tree', x: 78, b: 10, w: 18, h: 44 },
      { t: 'bush', x: 2, b: 14, w: 14, h: 14 },
      { t: 'butterfly', x: 26, y: 20, w: 7, h: 7 },
      { t: 'butterfly', x: 52, y: 36, w: 6, h: 6, o: .85 },
      { t: 'pond', x: 46, b: 14, w: 20, h: 11, o: .9 },
      { t: 'sunflower', x: 22, b: 10, w: 9, h: 20 },
    ],
    front: [
      { t: 'flower', x: 3, b: 4, w: 8, h: 13, c: FLOWER_COLORS[0] },
      { t: 'flower', x: 15, b: 1, w: 7, h: 12, c: FLOWER_COLORS[1] },
      { t: 'flower', x: 28, b: 5, w: 8, h: 13, c: FLOWER_COLORS[2] },
      { t: 'flower', x: 40, b: 2, w: 7, h: 12, c: FLOWER_COLORS[3] },
      { t: 'flower', x: 58, b: 4, w: 8, h: 13, c: FLOWER_COLORS[4] },
      { t: 'flower', x: 71, b: 1, w: 7, h: 12, c: FLOWER_COLORS[0] },
      { t: 'flower', x: 84, b: 5, w: 8, h: 13, c: FLOWER_COLORS[2] },
      { t: 'bush', x: 32, b: -6, w: 24, h: 16 },
      { t: 'bush', x: 66, b: -5, w: 22, h: 15 },
      { t: 'grass', x: 8, b: 12, w: 7, h: 8 },
      { t: 'grass', x: 50, b: 14, w: 7, h: 8 },
      { t: 'grass', x: 90, b: 12, w: 6, h: 7 },
    ],
  },
  space: {
    label: '밤하늘 우주', emoji: '🌌',
    sky: 'radial-gradient(circle at 72% 22%,#4b3a86 0%,#2a2058 46%,#161034 100%)',
    spotY: [14, 84],
    cover: ['star', 'planet', 'moon', 'bubble', 'cloud'],
    items: [
      { t: 'star', x: 8, y: 8, w: 5, h: 5, o: .95 },
      { t: 'star', x: 26, y: 20, w: 3, h: 3, o: .8 },
      { t: 'star', x: 46, y: 6, w: 4, h: 4, o: .9 },
      { t: 'star', x: 64, y: 26, w: 3, h: 3, o: .7 },
      { t: 'star', x: 82, y: 10, w: 5, h: 5, o: .85 },
      { t: 'star', x: 92, y: 48, w: 3, h: 3, o: .7 },
      { t: 'star', x: 16, y: 46, w: 3, h: 3, o: .6 },
      { t: 'star', x: 38, y: 60, w: 4, h: 4, o: .55 },
      { t: 'planet', x: 4, y: 60, w: 20, h: 20 },
      { t: 'moon', x: 74, y: 30, w: 16, h: 16, o: .95 },
      { t: 'planet', x: 40, y: 14, w: 10, h: 10, o: .75 },
      { t: 'rocket', x: 30, b: 10, w: 13, h: 22 },
      { t: 'aurora', x: 0, y: 34, w: 100, h: 26, o: .28 },
    ],
    front: [
      { t: 'island', x: 76, b: 2, w: 22, h: 18, o: .9 },
      { t: 'bubble', x: 30, b: 8, w: 4, h: 4 },
      { t: 'bubble', x: 52, b: 14, w: 3, h: 3 },
      { t: 'star', x: 60, b: 4, w: 4, h: 4, o: .8 },
      { t: 'star', x: 12, b: 10, w: 3, h: 3, o: .7 },
      { t: 'moon', x: 22, b: 2, w: 8, h: 8, o: .9 },
    ],
  },
  snow: {
    label: '눈 덮인 설산', emoji: '🏔️',
    sky: 'linear-gradient(180deg,#cde6fb 0%,#e8f6ff 42%,#f7fdff 70%,#ffffff 100%)',
    cover: ['snowPine', 'rock', 'cloud', 'icicle', 'snowman'],
    items: [
      { t: 'icePeak', x: 44, b: 12, w: 58, h: 58 },
      { t: 'icePeak', x: -8, b: 10, w: 44, h: 40, o: .95 },
      { t: 'cloud', x: 8, y: 6, w: 22, h: 11 },
      { t: 'cloud', x: 64, y: 4, w: 18, h: 9, o: .9 },
      { t: 'snowPine', x: 2, b: 10, w: 16, h: 34 },
      { t: 'snowPine', x: 20, b: 8, w: 12, h: 26 },
      { t: 'snowPine', x: 82, b: 8, w: 14, h: 30 },
      { t: 'snowman', x: 66, b: 14, w: 12, h: 17 },
      { t: 'rock', x: 34, b: 12, w: 8, h: 9, o: .9 },
      { t: 'bandSnow', h: 14 },
    ],
    front: [
      { t: 'bandSnow', h: 8 },
      { t: 'snowPine', x: -4, b: -2, w: 18, h: 28 },
      { t: 'snowPine', x: 86, b: -1, w: 16, h: 26 },
      { t: 'rock', x: 44, b: 4, w: 9, h: 9 },
      { t: 'rock', x: 10, b: 8, w: 7, h: 7 },
    ],
  },
  desert: {
    label: '사막 오아시스', emoji: '🏜️',
    sky: 'linear-gradient(180deg,#ffe9b0 0%,#ffd98a 46%,#f6c789 62%,#e8b06a 100%)',
    cover: ['cactus', 'palm', 'dune', 'rock', 'bush'],
    items: [
      { t: 'sun', x: 72, y: 6, w: 14, h: 14, o: .95 },
      { t: 'pyramid', x: 44, b: 20, w: 30, h: 24, o: .9 },
      { t: 'dune', x: -10, b: 18, w: 70, h: 20 },
      { t: 'dune', x: 46, b: 14, w: 62, h: 16 },
      { t: 'palm', x: 6, b: 14, w: 18, h: 30 },
      { t: 'palm', x: 86, b: 12, w: 14, h: 24, f: true },
      { t: 'cactus', x: 30, b: 12, w: 10, h: 18 },
      { t: 'cactus', x: 66, b: 10, w: 8, h: 14 },
      { t: 'rock', x: 56, b: 10, w: 8, h: 8 },
      { t: 'pond', x: 42, b: 6, w: 20, h: 8, o: .85 },
      { t: 'bandSand', h: 12 },
    ],
    front: [
      { t: 'bandSand', h: 6 },
      { t: 'bush', x: 18, b: 2, w: 10, h: 8, o: .9 },
      { t: 'rock', x: 74, b: 3, w: 8, h: 7 },
      { t: 'cactus', x: 50, b: 1, w: 7, h: 10 },
    ],
  },
  volcano: {
    label: '뜨거운 화산', emoji: '🌋',
    sky: 'linear-gradient(180deg,#4a2f45 0%,#8a3f3a 46%,#5b2f36 72%,#3a2530 100%)',
    cover: ['rock', 'cloud', 'flower', 'bush'],
    items: [
      { t: 'volcano', x: 8, b: 16, w: 74, h: 66 },
      { t: 'cloud', x: 40, y: 2, w: 24, h: 12, o: .55 },
      { t: 'cloud', x: 12, y: 8, w: 18, h: 9, o: .4 },
      { t: 'rock', x: 2, b: 12, w: 12, h: 14 },
      { t: 'rock', x: 84, b: 10, w: 12, h: 12 },
      { t: 'rock', x: 66, b: 8, w: 8, h: 8 },
      { t: 'bandLava', h: 16 },
    ],
    front: [
      { t: 'bandLava', h: 8 },
      { t: 'rock', x: 20, b: 2, w: 10, h: 9 },
      { t: 'rock', x: 72, b: 3, w: 9, h: 8 },
      { t: 'crystal', x: 46, b: 2, w: 6, h: 8, o: .9 },
    ],
  },
  ghost: {
    label: '으스스 유령성', emoji: '🏰',
    sky: 'linear-gradient(180deg,#241c3d 0%,#3b2b56 58%,#1b1430 100%)',
    cover: ['bush', 'rock', 'moon', 'gate', 'deadTree'],
    items: [
      { t: 'moon', x: 76, y: 6, w: 14, h: 14, o: .95 },
      { t: 'cloud', x: 10, y: 8, w: 22, h: 10, o: .18 },
      { t: 'castle', x: 18, b: 16, w: 62, h: 56 },
      { t: 'bat', x: 62, y: 14, w: 9, h: 6 },
      { t: 'bat', x: 14, y: 26, w: 7, h: 5, o: .8 },
      { t: 'deadTree', x: -2, b: 12, w: 16, h: 30 },
      { t: 'gate', x: 78, b: 12, w: 16, h: 24 },
      { t: 'pumpkin', x: 12, b: 12, w: 9, h: 10 },
      { t: 'bandDarkGrass', h: 14 },
    ],
    front: [
      { t: 'bandDarkGrass', h: 7 },
      { t: 'bush', x: 30, b: 2, w: 14, h: 12, hu: 250, br: .7 },
      { t: 'bush', x: 62, b: 1, w: 12, h: 10, hu: 250, br: .7 },
      { t: 'rock', x: 46, b: 3, w: 8, h: 8 },
    ],
  },
  center: {
    label: '포켓몬 센터', emoji: '🏥',
    sky: 'linear-gradient(180deg,#cfeaff 0%,#f2fbff 44%,#eaf7ff 58%,#dff2e8 100%)',
    cover: ['bush', 'flower', 'grass', 'bench', 'cloud'],
    items: [
      { t: 'sun', x: 6, y: 5, w: 8, h: 8, o: .85 },
      { t: 'cloud', x: 62, y: 6, w: 20, h: 10, o: .95 },
      { t: 'center', x: 18, b: 16, w: 62, h: 48 },
      { t: 'streetlamp', x: 4, b: 14, w: 8, h: 22 },
      { t: 'bench', x: 82, b: 14, w: 14, h: 10 },
      { t: 'bush', x: 8, b: 14, w: 12, h: 12 },
      { t: 'bush', x: 78, b: 12, w: 14, h: 13 },
      { t: 'bandPath', h: 16 },
    ],
    front: [
      { t: 'flower', x: 6, b: 3, w: 6, h: 9, c: '#ffb3cd' },
      { t: 'flower', x: 24, b: 2, w: 6, h: 9, c: '#ffd166' },
      { t: 'flower', x: 70, b: 3, w: 6, h: 9, c: '#c9b6ff' },
      { t: 'grass', x: 46, b: 2, w: 7, h: 8 },
      { t: 'bush', x: 56, b: -4, w: 16, h: 12 },
    ],
  },
  playground: {
    label: '신나는 놀이터', emoji: '🛝',
    sky: 'linear-gradient(180deg,#bfe9ff 0%,#e8f8ff 36%,#e9fbd6 36%,#b9ea99 66%,#a4df85 100%)',
    cover: ['bush', 'grass', 'flower', 'seesaw', 'cloud'],
    items: [
      { t: 'sun', x: 84, y: 5, w: 9, h: 9, o: .9 },
      { t: 'cloud', x: 10, y: 5, w: 20, h: 10 },
      { t: 'bunting', x: 0, y: 8, w: 100, h: 10, o: .95 },
      { t: 'slide', x: 4, b: 14, w: 30, h: 40 },
      { t: 'swing', x: 38, b: 14, w: 26, h: 38 },
      { t: 'seesaw', x: 66, b: 14, w: 28, h: 22 },
      { t: 'carousel', x: 30, b: 8, w: 22, h: 20, o: .9 },
      { t: 'bush', x: 0, b: 12, w: 12, h: 10 },
      { t: 'tree', x: 90, b: 12, w: 12, h: 26, o: .95 },
      { t: 'bandGrass', h: 14 },
    ],
    front: [
      { t: 'bandGrass', h: 7 },
      { t: 'bush', x: 12, b: 2, w: 14, h: 11 },
      { t: 'bush', x: 64, b: 1, w: 13, h: 10 },
      { t: 'flower', x: 40, b: 3, w: 6, h: 9, c: '#ffd166' },
      { t: 'flower', x: 86, b: 4, w: 6, h: 9, c: '#ffb3cd' },
      { t: 'grass', x: 28, b: 6, w: 7, h: 8 },
    ],
  },
  camping: {
    label: '별빛 캠핑장', emoji: '⛺',
    sky: 'linear-gradient(180deg,#1f2a4d 0%,#33406b 42%,#3f5a63 70%,#2f4a3f 100%)',
    cover: ['pine', 'tent', 'campfire', 'bush', 'moon', 'cloud'],
    items: [
      { t: 'moon', x: 78, y: 6, w: 12, h: 12, o: .95 },
      { t: 'star', x: 12, y: 8, w: 4, h: 4 },
      { t: 'star', x: 30, y: 16, w: 3, h: 3, o: .9 },
      { t: 'star', x: 56, y: 6, w: 3, h: 3, o: .85 },
      { t: 'star', x: 90, y: 30, w: 3, h: 3, o: .8 },
      { t: 'pine', x: 0, b: 12, w: 18, h: 42 },
      { t: 'pine', x: 84, b: 10, w: 18, h: 38 },
      { t: 'tent', x: 20, b: 12, w: 30, h: 26 },
      { t: 'campfire', x: 58, b: 12, w: 12, h: 12 },
      { t: 'lantern', x: 72, b: 13, w: 7, h: 11 },
      { t: 'bandDarkGrass', h: 14 },
    ],
    front: [
      { t: 'bandDarkGrass', h: 7 },
      { t: 'bush', x: 8, b: 2, w: 14, h: 11, br: .8 },
      { t: 'bush', x: 50, b: 1, w: 12, h: 10, br: .8 },
      { t: 'rock', x: 34, b: 3, w: 7, h: 7 },
      { t: 'mushroom', x: 76, b: 3, w: 5, h: 7 },
    ],
  },
  waterfall: {
    label: '시원한 폭포', emoji: '💦',
    sky: 'linear-gradient(180deg,#bfe9ff 0%,#ddf6ff 34%,#a9e0d0 54%,#6fc7b6 100%)',
    cover: ['bush', 'flower', 'rock', 'cloud', 'fish', 'seaweed'],
    items: [
      { t: 'icePeak', x: -12, b: 14, w: 44, h: 52, o: .9 },
      { t: 'icePeak', x: 74, b: 12, w: 40, h: 48, o: .85 },
      { t: 'waves', x: 30, y: 14, w: 26, h: 58, o: .95 },
      { t: 'cloud', x: 8, y: 5, w: 18, h: 9 },
      { t: 'rainbow', x: 40, y: 8, w: 30, h: 18, o: .45 },
      { t: 'pond', x: 28, b: 10, w: 40, h: 16 },
      { t: 'bush', x: 2, b: 12, w: 16, h: 14 },
      { t: 'bush', x: 80, b: 10, w: 18, h: 15 },
      { t: 'rock', x: 58, b: 12, w: 9, h: 10 },
      { t: 'palm', x: 86, b: 8, w: 12, h: 22, f: true },
    ],
    front: [
      { t: 'fish', x: 38, b: 6, w: 10, h: 6, o: .9 },
      { t: 'flower', x: 8, b: 3, w: 6, h: 9, c: '#ffb3cd' },
      { t: 'flower', x: 78, b: 4, w: 6, h: 9, c: '#ffd166' },
      { t: 'grass', x: 24, b: 8, w: 7, h: 8 },
      { t: 'rock', x: 66, b: 2, w: 9, h: 8 },
    ],
  },
  bamboo: {
    label: '대나무 숲', emoji: '🎋',
    sky: 'linear-gradient(180deg,#d6f5e2 0%,#eafbe6 36%,#cdeeb3 36%,#a8dd8c 72%,#8fce72 100%)',
    cover: ['bamboo', 'bush', 'grass', 'rock', 'mushroom'],
    items: [
      { t: 'bamboo', x: 0, b: 10, w: 20, h: 78, o: .95 },
      { t: 'bamboo', x: 20, b: 8, w: 18, h: 70, o: .8 },
      { t: 'bamboo', x: 78, b: 10, w: 20, h: 76, o: .95 },
      { t: 'bamboo', x: 60, b: 8, w: 16, h: 66, o: .75 },
      { t: 'lantern', x: 34, b: 12, w: 8, h: 12 },
      { t: 'rock', x: 44, b: 10, w: 12, h: 12 },
      { t: 'rock', x: 30, b: 8, w: 8, h: 8, o: .9 },
      { t: 'bandGrass', h: 12 },
    ],
    front: [
      { t: 'bush', x: 4, b: 2, w: 16, h: 12 },
      { t: 'bush', x: 70, b: 2, w: 16, h: 12 },
      { t: 'grass', x: 30, b: 5, w: 8, h: 9 },
      { t: 'mushroom', x: 52, b: 3, w: 5, h: 8 },
      { t: 'bamboo', x: 88, b: -2, w: 14, h: 40, o: .9 },
    ],
  },
  cherry: {
    label: '벚꽃 공원', emoji: '🌸',
    sky: 'linear-gradient(180deg,#ffe6f2 0%,#fff3f8 34%,#eafbdd 34%,#c2ec9f 68%,#a8e08a 100%)',
    cover: ['cherry', 'bush', 'flower', 'bench', 'grass', 'cloud'],
    items: [
      { t: 'hill', x: -6, b: 20, w: 64, h: 22, c: '#cdeeb2' },
      { t: 'hill2', x: 44, b: 14, w: 66, h: 18, c: '#b6e598' },
      { t: 'sun', x: 8, y: 4, w: 8, h: 8, o: .75 },
      { t: 'cloud', x: 54, y: 5, w: 22, h: 11, o: .9 },
      { t: 'cherry', x: 2, b: 12, w: 26, h: 50 },
      { t: 'cherry', x: 70, b: 10, w: 28, h: 56 },
      { t: 'cherry', x: 40, b: 8, w: 18, h: 32, o: .9 },
      { t: 'bench', x: 36, b: 12, w: 16, h: 11 },
      { t: 'pond', x: 50, b: 10, w: 22, h: 12, o: .9 },
      { t: 'bush', x: 24, b: 12, w: 12, h: 11 },
      { t: 'bandGrass', h: 12 },
    ],
    front: [
      { t: 'bandGrass', h: 6 },
      { t: 'bush', x: 8, b: 2, w: 14, h: 11 },
      { t: 'bush', x: 76, b: 2, w: 14, h: 11 },
      { t: 'flower', x: 30, b: 4, w: 6, h: 9, c: '#ffc0da' },
      { t: 'flower', x: 58, b: 3, w: 6, h: 9, c: '#ffd166' },
      { t: 'grass', x: 46, b: 8, w: 7, h: 8 },
    ],
  },
  rainbow: {
    label: '무지개 언덕', emoji: '🌈',
    sky: 'linear-gradient(180deg,#cdeaff 0%,#eaf8ff 40%,#eafbdd 40%,#c8ecab 70%,#b3e395 100%)',
    cover: ['bush', 'flower', 'butterfly', 'cloud', 'balloon', 'grass'],
    items: [
      { t: 'hill', x: -8, b: 26, w: 62, h: 24, c: '#d3f0bb' },
      { t: 'hill2', x: 40, b: 18, w: 68, h: 22, c: '#bde7a3' },
      { t: 'rainbow', x: 18, y: 6, w: 64, h: 40, o: .75 },
      { t: 'cloud', x: 4, y: 18, w: 18, h: 9, o: .9 },
      { t: 'cloud', x: 78, y: 16, w: 18, h: 9, o: .9 },
      { t: 'balloon', x: 8, y: 34, w: 10, h: 16 },
      { t: 'balloon', x: 82, y: 30, w: 9, h: 15, o: .9 },
      { t: 'butterfly', x: 34, y: 26, w: 6, h: 6 },
      { t: 'bush', x: 4, b: 16, w: 16, h: 12 },
      { t: 'bush', x: 78, b: 14, w: 16, h: 12 },
      { t: 'flower', x: 20, b: 12, w: 7, h: 10, c: '#ffb3cd' },
      { t: 'bandGrass', h: 16 },
    ],
    front: [
      { t: 'bandGrass', h: 8 },
      { t: 'bush', x: 16, b: 2, w: 16, h: 12 },
      { t: 'bush', x: 62, b: 1, w: 18, h: 13 },
      { t: 'flower', x: 44, b: 4, w: 6, h: 9, c: '#c9b6ff' },
      { t: 'flower', x: 86, b: 5, w: 6, h: 9, c: '#ffd166' },
      { t: 'grass', x: 34, b: 7, w: 7, h: 8 },
    ],
  },
  ruins: {
    label: '고대 신전 유적', emoji: '🏛️',
    sky: 'linear-gradient(180deg,#ffd9a8 0%,#ffe9c9 40%,#e8d3a8 40%,#d9bd8a 74%,#c9a976 100%)',
    cover: ['pillar', 'arch', 'bush', 'rock', 'vase'],
    items: [
      { t: 'sun', x: 70, y: 8, w: 12, h: 12, o: .9 },
      { t: 'arch', x: 24, b: 16, w: 52, h: 44 },
      { t: 'pillar', x: 8, b: 14, w: 12, h: 34 },
      { t: 'pillar', x: 80, b: 14, w: 12, h: 32, o: .95 },
      { t: 'pillar', x: 40, b: 10, w: 9, h: 20, o: .85 },
      { t: 'bush', x: 14, b: 14, w: 14, h: 11 },
      { t: 'rock', x: 64, b: 12, w: 10, h: 10 },
      { t: 'vine', x: 30, y: 22, w: 10, h: 34, o: .9 },
      { t: 'vine', x: 68, y: 24, w: 9, h: 30, o: .85 },
      { t: 'bandSand', h: 14 },
    ],
    front: [
      { t: 'bandSand', h: 7 },
      { t: 'rock', x: 20, b: 2, w: 10, h: 8 },
      { t: 'flower', x: 52, b: 3, w: 6, h: 9, c: '#ffd166' },
      { t: 'bush', x: 72, b: 1, w: 12, h: 9 },
    ],
  },
  skyisland: {
    label: '구름 위 하늘섬', emoji: '☁️',
    sky: 'linear-gradient(180deg,#8fd0f5 0%,#c9eaff 44%,#eaf8ff 74%,#ffffff 100%)',
    spotY: [34, 72],
    cover: ['cloud', 'bush', 'flower', 'balloon', 'island'],
    items: [
      { t: 'sun', x: 78, y: 6, w: 10, h: 10, o: .85 },
      { t: 'cloud', x: 6, y: 10, w: 26, h: 13 },
      { t: 'cloud', x: 60, y: 6, w: 22, h: 11, o: .95 },
      { t: 'cloud', x: 22, y: 40, w: 20, h: 10, o: .9 },
      { t: 'cloud', x: 74, y: 48, w: 22, h: 11, o: .9 },
      { t: 'island', x: 20, b: 22, w: 60, h: 46 },
      { t: 'tree', x: 30, b: 42, w: 16, h: 28, o: .95 },
      { t: 'bush', x: 50, b: 42, w: 12, h: 11 },
      { t: 'balloon', x: 80, y: 24, w: 10, h: 16 },
      { t: 'rainbow', x: 2, y: 24, w: 40, h: 24, o: .5 },
    ],
    front: [
      { t: 'cloud', x: 40, b: 2, w: 24, h: 12, o: .95 },
      { t: 'cloud', x: 0, b: 6, w: 20, h: 10, o: .85 },
      { t: 'cloud', x: 76, b: 8, w: 18, h: 9, o: .8 },
      { t: 'flower', x: 36, b: 30, w: 5, h: 8, c: '#ffb3cd' },
    ],
  },
  cave: {
    label: '보석 동굴', emoji: '💎',
    sky: 'radial-gradient(circle at 50% 40%,#3f3566 0%,#2b2448 52%,#191430 100%)',
    spotY: [24, 84],
    cover: ['gem', 'crystal', 'rock', 'sparkle', 'stalactite'],
    items: [
      { t: 'stalactite', x: 0, y: 0, w: 100, h: 16 },
      { t: 'gem', x: 6, b: 16, w: 14, h: 26 },
      { t: 'gem', x: 78, b: 14, w: 16, h: 30 },
      { t: 'crystal', x: 28, b: 14, w: 12, h: 18 },
      { t: 'crystal', x: 60, b: 12, w: 14, h: 20, o: .9 },
      { t: 'rock', x: 42, b: 10, w: 16, h: 14 },
      { t: 'rock', x: 20, b: 12, w: 10, h: 9, o: .85 },
      { t: 'sparkle', x: 50, y: 22, w: 5, h: 5 },
      { t: 'sparkle', x: 72, y: 34, w: 4, h: 4, o: .8 },
      { t: 'sparkle', x: 16, y: 36, w: 3, h: 3, o: .7 },
      { t: 'bandCave', h: 14 },
    ],
    front: [
      { t: 'bandCave', h: 7 },
      { t: 'rock', x: 4, b: 2, w: 14, h: 11 },
      { t: 'rock', x: 84, b: 2, w: 13, h: 10 },
      { t: 'gem', x: 46, b: 2, w: 8, h: 12 },
      { t: 'crystal', x: 66, b: 2, w: 8, h: 10 },
    ],
  },
  ranch: {
    label: '푸른 목장', emoji: '🐑',
    sky: 'linear-gradient(180deg,#bfe9ff 0%,#e6f8ff 36%,#e2fbd2 36%,#b7e995 68%,#a2dc82 100%)',
    cover: ['sheep', 'hay', 'bush', 'grass', 'flower', 'fence'],
    items: [
      { t: 'hill', x: -6, b: 22, w: 68, h: 22, c: '#c9efab' },
      { t: 'hill2', x: 44, b: 16, w: 68, h: 18, c: '#b2e491' },
      { t: 'sun', x: 6, y: 6, w: 9, h: 9, o: .9 },
      { t: 'cloud', x: 30, y: 6, w: 22, h: 11 },
      { t: 'cloud', x: 66, y: 12, w: 18, h: 9, o: .9 },
      { t: 'windmill', x: 62, b: 16, w: 20, h: 40 },
      { t: 'hay', x: 12, b: 14, w: 14, h: 12 },
      { t: 'hay', x: 30, b: 12, w: 11, h: 10, o: .95 },
      { t: 'sheep', x: 44, b: 12, w: 14, h: 12 },
      { t: 'fence', x: 0, b: 12, w: 30, h: 14, o: .9 },
      { t: 'tree', x: 84, b: 12, w: 16, h: 30 },
      { t: 'bandGrass', h: 14 },
    ],
    front: [
      { t: 'bandGrass', h: 7 },
      { t: 'bush', x: 6, b: 2, w: 14, h: 11 },
      { t: 'bush', x: 70, b: 1, w: 16, h: 12 },
      { t: 'flower', x: 36, b: 3, w: 6, h: 9, c: '#ffb3cd' },
      { t: 'flower', x: 54, b: 4, w: 6, h: 9, c: '#ffd166' },
      { t: 'grass', x: 26, b: 6, w: 7, h: 8 },
    ],
  },
  amusement: {
    label: '관람차 놀이공원', emoji: '🎡',
    sky: 'linear-gradient(180deg,#ffd0e0 0%,#ffe8c8 34%,#cfeaff 58%,#e9f6ff 100%)',
    cover: ['bush', 'balloon', 'flower', 'cloud', 'bench', 'bunting'],
    items: [
      { t: 'ferris', x: 6, b: 14, w: 34, h: 54 },
      { t: 'carousel', x: 58, b: 14, w: 30, h: 34 },
      { t: 'bunting', x: 0, y: 6, w: 100, h: 12, o: .9 },
      { t: 'balloon', x: 82, y: 12, w: 8, h: 13 },
      { t: 'balloon', x: 30, y: 8, w: 7, h: 12, o: .9 },
      { t: 'cloud', x: 44, y: 4, w: 18, h: 9, o: .9 },
      { t: 'bench', x: 44, b: 12, w: 12, h: 9 },
      { t: 'bush', x: 0, b: 12, w: 12, h: 10 },
      { t: 'streetlamp', x: 90, b: 12, w: 8, h: 20 },
      { t: 'bandPath', h: 14 },
    ],
    front: [
      { t: 'bandPath', h: 7 },
      { t: 'flower', x: 14, b: 3, w: 6, h: 9, c: '#ffb3cd' },
      { t: 'flower', x: 66, b: 3, w: 6, h: 9, c: '#ffd166' },
      { t: 'bush', x: 80, b: 1, w: 14, h: 10 },
      { t: 'grass', x: 40, b: 5, w: 7, h: 8 },
    ],
  },
  library: {
    label: '아늑한 도서관', emoji: '📚',
    sky: 'linear-gradient(180deg,#f7ecd9 0%,#f3e3c9 58%,#e8d3b4 58%,#dcc3a0 100%)',
    spotY: [26, 82],
    cover: ['bookshelf', 'bench', 'table', 'bush', 'window'],
    items: [
      { t: 'window', x: 34, y: 8, w: 20, h: 26 },
      { t: 'bookshelf', x: 2, b: 14, w: 22, h: 52 },
      { t: 'bookshelf', x: 76, b: 14, w: 22, h: 52 },
      { t: 'bookshelf', x: 28, b: 12, w: 18, h: 38, o: .95 },
      { t: 'lantern', x: 58, b: 20, w: 7, h: 11 },
      { t: 'table', x: 48, b: 12, w: 26, h: 16 },
      { t: 'bench', x: 62, b: 14, w: 12, h: 9 },
      { t: 'bandTile', h: 14 },
    ],
    front: [
      { t: 'bandTile', h: 7 },
      { t: 'bookshelf', x: 40, b: 2, w: 10, h: 16, o: .9 },
      { t: 'bush', x: 12, b: 2, w: 12, h: 9, hu: 60, br: .9 },
      { t: 'table', x: 66, b: 2, w: 22, h: 12 },
    ],
  },
  bakery: {
    label: '달콤 베이커리', emoji: '🧁',
    sky: 'linear-gradient(180deg,#ffeede 0%,#ffdfc4 56%,#f6d3b4 56%,#ecc3a0 100%)',
    spotY: [26, 82],
    cover: ['cake', 'cupcake', 'table', 'awning', 'bush'],
    items: [
      { t: 'awning', x: 0, y: 4, w: 100, h: 14 },
      { t: 'window', x: 12, y: 20, w: 16, h: 20, o: .95 },
      { t: 'table', x: 40, b: 16, w: 30, h: 16 },
      { t: 'cake', x: 44, b: 26, w: 14, h: 18 },
      { t: 'cupcake', x: 62, b: 26, w: 8, h: 11 },
      { t: 'table', x: 4, b: 14, w: 24, h: 14 },
      { t: 'cupcake', x: 10, b: 22, w: 7, h: 10 },
      { t: 'cake', x: 76, b: 14, w: 12, h: 15 },
      { t: 'lantern', x: 90, y: 20, w: 6, h: 9 },
      { t: 'bandTile', h: 14 },
    ],
    front: [
      { t: 'bandTile', h: 7 },
      { t: 'table', x: 30, b: 2, w: 20, h: 11 },
      { t: 'cupcake', x: 34, b: 9, w: 6, h: 9 },
      { t: 'bush', x: 66, b: 2, w: 14, h: 9, hu: 40 },
    ],
  },
  station: {
    label: '기차역 플랫폼', emoji: '🚂',
    sky: 'linear-gradient(180deg,#cfe6f7 0%,#e6f3fb 52%,#dbe6ef 52%,#cfd9e4 100%)',
    cover: ['bench', 'streetlamp', 'clock', 'fence', 'bush'],
    items: [
      { t: 'cloud', x: 8, y: 6, w: 20, h: 10, o: .9 },
      { t: 'cloud', x: 66, y: 8, w: 18, h: 9, o: .8 },
      { t: 'train', x: 4, b: 20, w: 54, h: 32 },
      { t: 'rail', x: 0, b: 14, w: 100, h: 8 },
      { t: 'streetlamp', x: 62, b: 14, w: 8, h: 24 },
      { t: 'clock', x: 76, y: 12, w: 10, h: 10 },
      { t: 'bench', x: 72, b: 12, w: 16, h: 10 },
      { t: 'fence', x: 84, b: 10, w: 16, h: 16, o: .9 },
      { t: 'bandDeck', h: 12 },
    ],
    front: [
      { t: 'bandDeck', h: 6 },
      { t: 'bush', x: 8, b: 2, w: 12, h: 9 },
      { t: 'bush', x: 58, b: 1, w: 12, h: 9 },
      { t: 'bench', x: 24, b: 4, w: 14, h: 9 },
      { t: 'streetlamp', x: 90, b: 4, w: 7, h: 18 },
    ],
  },
  pirate: {
    label: '바다 위 해적선', emoji: '🏴‍☠️',
    sky: 'linear-gradient(180deg,#ffd9a0 0%,#ffe9c0 30%,#7fd0ee 40%,#2f9bc8 78%,#1b7ba6 100%)',
    spotY: [14, 80],
    cover: ['fish', 'bubble', 'sail', 'coral', 'cloud'],
    items: [
      { t: 'sun', x: 8, y: 6, w: 12, h: 12, o: .9 },
      { t: 'cloud', x: 60, y: 6, w: 20, h: 10, o: .9 },
      { t: 'ship', x: 16, b: 20, w: 70, h: 52 },
      { t: 'sail', x: 80, b: 16, w: 18, h: 16, o: .95 },
      { t: 'waves', x: 0, b: 10, w: 100, h: 14, o: .9 },
      { t: 'fish', x: 20, b: 8, w: 10, h: 6, o: .8, f: true },
      { t: 'coral', x: 4, b: 6, w: 12, h: 14, o: .85 },
      { t: 'island', x: 76, b: 14, w: 22, h: 14, o: .9 },
    ],
    front: [
      { t: 'waves', x: 0, b: 0, w: 100, h: 10 },
      { t: 'bubble', x: 32, b: 16, w: 4, h: 4 },
      { t: 'bubble', x: 60, b: 22, w: 3, h: 3 },
      { t: 'palm', x: 80, b: 18, w: 12, h: 20, o: .9 },
    ],
  },
  arctic: {
    label: '북극 빙하', emoji: '🧊',
    sky: 'linear-gradient(180deg,#c9e8ff 0%,#e6f7ff 44%,#f4fcff 68%,#ffffff 100%)',
    cover: ['iceberg', 'snowPine', 'snowman', 'rock', 'igloo'],
    items: [
      { t: 'aurora', x: 0, y: 2, w: 100, h: 38, o: .9 },
      { t: 'iceberg', x: -2, b: 16, w: 36, h: 40 },
      { t: 'iceberg', x: 62, b: 12, w: 34, h: 44 },
      { t: 'igloo', x: 38, b: 14, w: 24, h: 20 },
      { t: 'snowman', x: 28, b: 16, w: 10, h: 15 },
      { t: 'snowPine', x: 86, b: 10, w: 12, h: 24 },
      { t: 'snowPine', x: 0, b: 12, w: 10, h: 22 },
      { t: 'rock', x: 58, b: 12, w: 8, h: 8, o: .9 },
      { t: 'bandSnow', h: 16 },
    ],
    front: [
      { t: 'bandSnow', h: 8 },
      { t: 'snowPine', x: 74, b: 0, w: 12, h: 18 },
      { t: 'rock', x: 16, b: 4, w: 9, h: 7 },
      { t: 'rock', x: 48, b: 3, w: 7, h: 6 },
    ],
  },
  jungle: {
    label: '열대 정글', emoji: '🌴',
    sky: 'linear-gradient(180deg,#bfe8c4 0%,#a8dfb4 30%,#5fa86a 58%,#3f8a4f 100%)',
    cover: ['jungleLeaf', 'vine', 'palm', 'bush', 'flower'],
    items: [
      { t: 'sun', x: 74, y: 4, w: 10, h: 10, o: .5 },
      { t: 'jungleLeaf', x: -6, b: 6, w: 26, h: 50 },
      { t: 'jungleLeaf', x: 80, b: 4, w: 26, h: 52, f: true },
      { t: 'palm', x: 30, b: 16, w: 22, h: 44 },
      { t: 'vine', x: 10, y: 0, w: 12, h: 40, o: .9 },
      { t: 'vine', x: 60, y: 0, w: 10, h: 34, o: .85 },
      { t: 'vine', x: 88, y: 0, w: 8, h: 30, o: .8 },
      { t: 'bush', x: 48, b: 14, w: 16, h: 13 },
      { t: 'flower', x: 56, b: 16, w: 7, h: 11, c: '#ff8fb1' },
      { t: 'bandDarkGrass', h: 14 },
    ],
    front: [
      { t: 'bandDarkGrass', h: 7 },
      { t: 'jungleLeaf', x: 30, b: -2, w: 20, h: 18, o: .95 },
      { t: 'jungleLeaf', x: 58, b: -3, w: 18, h: 16, f: true, o: .95 },
      { t: 'flower', x: 14, b: 4, w: 6, h: 9, c: '#ffd166' },
      { t: 'bush', x: 76, b: 1, w: 14, h: 11 },
    ],
  },
  autumn: {
    label: '가을 단풍길', emoji: '🍁',
    sky: 'linear-gradient(180deg,#ffe3bf 0%,#ffeed6 34%,#f7e0b8 34%,#e8c98f 70%,#d9b878 100%)',
    cover: ['maple', 'bush', 'grass', 'mushroom', 'log'],
    items: [
      { t: 'hill', x: -8, b: 22, w: 66, h: 22, c: '#f0d6a4' },
      { t: 'hill2', x: 42, b: 16, w: 68, h: 18, c: '#e8c68e' },
      { t: 'sun', x: 70, y: 6, w: 10, h: 10, o: .8 },
      { t: 'cloud', x: 10, y: 6, w: 20, h: 10, o: .9 },
      { t: 'maple', x: 0, b: 14, w: 24, h: 46 },
      { t: 'maple', x: 74, b: 12, w: 26, h: 50 },
      { t: 'maple', x: 36, b: 10, w: 18, h: 32, o: .9 },
      { t: 'log', x: 48, b: 14, w: 14, h: 8 },
      { t: 'mushroom', x: 62, b: 14, w: 6, h: 9 },
      { t: 'rock', x: 30, b: 12, w: 8, h: 8 },
      { t: 'bandPath', h: 14 },
    ],
    front: [
      { t: 'bandPath', h: 7 },
      { t: 'bush', x: 10, b: 2, w: 14, h: 10, hu: 320, br: .95 },
      { t: 'bush', x: 66, b: 1, w: 16, h: 11, hu: 320, br: .95 },
      { t: 'mushroom', x: 44, b: 4, w: 5, h: 8 },
      { t: 'grass', x: 28, b: 6, w: 7, h: 8 },
      { t: 'flower', x: 86, b: 4, w: 6, h: 9, c: '#ffa987' },
    ],
  },
  aquarium: {
    label: '대형 수족관', emoji: '🐟',
    sky: 'linear-gradient(180deg,#2a5c86 0%,#1f4a70 40%,#16405f 70%,#0f3049 100%)',
    spotY: [20, 82],
    cover: ['fish', 'bubble', 'seaweed', 'coral', 'shell', 'tank'],
    items: [
      { t: 'tank', x: 4, b: 18, w: 44, h: 44 },
      { t: 'tank', x: 52, b: 14, w: 44, h: 48, o: .95 },
      { t: 'fish', x: 10, y: 30, w: 12, h: 7, o: .9 },
      { t: 'fish', x: 60, y: 24, w: 10, h: 6, o: .85, f: true },
      { t: 'jellyfish', x: 76, y: 18, w: 10, h: 14, o: .85 },
      { t: 'bubble', x: 20, y: 22, w: 4, h: 4, o: .8 },
      { t: 'bubble', x: 68, y: 36, w: 3, h: 3, o: .7 },
      { t: 'seaweed', x: 46, b: 16, w: 8, h: 20, o: .85 },
      { t: 'starfish', x: 30, b: 14, w: 7, h: 7, o: .9 },
      { t: 'coral', x: 84, b: 12, w: 12, h: 18, o: .9 },
      { t: 'bandTile', h: 14 },
    ],
    front: [
      { t: 'bandTile', h: 7 },
      { t: 'bubble', x: 38, b: 10, w: 5, h: 5 },
      { t: 'bubble', x: 58, b: 16, w: 3, h: 3 },
      { t: 'fish', x: 70, b: 8, w: 10, h: 6, o: .9 },
      { t: 'shell', x: 14, b: 3, w: 8, h: 7 },
    ],
  },
  greenhouse: {
    label: '비밀 온실 정원', emoji: '🌿',
    sky: 'linear-gradient(180deg,#e6f7ec 0%,#f2fdf4 42%,#dff3d8 42%,#c8e8bd 76%,#b8dfae 100%)',
    cover: ['glassPane', 'flower', 'bush', 'table', 'lilypad'],
    items: [
      { t: 'glassPane', x: 0, y: 2, w: 100, h: 52, o: .95 },
      { t: 'flower', x: 8, b: 16, w: 9, h: 15, c: '#ffb3cd' },
      { t: 'flower', x: 22, b: 14, w: 8, h: 14, c: '#ffd166' },
      { t: 'flower', x: 84, b: 14, w: 9, h: 15, c: '#c9b6ff' },
      { t: 'bush', x: 34, b: 14, w: 16, h: 14 },
      { t: 'bush', x: 62, b: 12, w: 18, h: 15 },
      { t: 'table', x: 66, b: 16, w: 22, h: 12 },
      { t: 'flower', x: 70, b: 24, w: 6, h: 10, c: '#ffa987' },
      { t: 'pond', x: 38, b: 10, w: 20, h: 10, o: .85 },
      { t: 'lilypad', x: 42, b: 14, w: 6, h: 6 },
      { t: 'butterfly', x: 52, y: 28, w: 6, h: 6 },
      { t: 'bandGrass', h: 12 },
    ],
    front: [
      { t: 'bandGrass', h: 6 },
      { t: 'flower', x: 12, b: 2, w: 7, h: 10, c: '#ff8fb1' },
      { t: 'flower', x: 46, b: 3, w: 7, h: 10, c: '#ffd166' },
      { t: 'bush', x: 74, b: 0, w: 14, h: 11 },
      { t: 'grass', x: 30, b: 5, w: 7, h: 8 },
    ],
  },
  lighthouse: {
    label: '등대 바닷가', emoji: '🗼',
    sky: 'linear-gradient(180deg,#ffd9b8 0%,#ffe9d4 26%,#8fd8f0 38%,#3faad4 72%,#1f86b4 100%)',
    spotY: [18, 80],
    cover: ['rock', 'sail', 'fish', 'bush', 'cloud'],
    items: [
      { t: 'sun', x: 8, y: 6, w: 12, h: 12, o: .9 },
      { t: 'cloud', x: 56, y: 6, w: 22, h: 11, o: .95 },
      { t: 'lighthouse', x: 66, b: 16, w: 20, h: 46 },
      { t: 'sail', x: 12, b: 22, w: 20, h: 18, o: .95 },
      { t: 'waves', x: 0, b: 12, w: 100, h: 14, o: .9 },
      { t: 'rock', x: 36, b: 12, w: 14, h: 12 },
      { t: 'rock', x: 52, b: 10, w: 9, h: 8 },
      { t: 'bush', x: 88, b: 16, w: 12, h: 10 },
      { t: 'fish', x: 20, b: 8, w: 10, h: 6, o: .8 },
      { t: 'bandSand', h: 12 },
    ],
    front: [
      { t: 'waves', x: 0, b: 0, w: 100, h: 9 },
      { t: 'shell', x: 30, b: 4, w: 8, h: 7 },
      { t: 'starfish', x: 48, b: 5, w: 7, h: 7 },
      { t: 'rock', x: 4, b: 3, w: 10, h: 8 },
    ],
  },
  nightpark: {
    label: '도시 야경 공원', emoji: '🌃',
    sky: 'linear-gradient(180deg,#1d2347 0%,#2f3560 46%,#3f3f66 66%,#2b2f4f 100%)',
    cover: ['bush', 'bench', 'streetlamp', 'cityTower', 'moon', 'flower'],
    items: [
      { t: 'moon', x: 80, y: 6, w: 11, h: 11, o: .95 },
      { t: 'star', x: 16, y: 8, w: 3, h: 3, o: .9 },
      { t: 'star', x: 40, y: 12, w: 3, h: 3, o: .8 },
      { t: 'star', x: 62, y: 6, w: 3, h: 3, o: .75 },
      { t: 'cityTower', x: 0, b: 18, w: 22, h: 34 },
      { t: 'cityTower', x: 76, b: 16, w: 24, h: 40 },
      { t: 'streetlamp', x: 30, b: 14, w: 8, h: 24 },
      { t: 'streetlamp', x: 60, b: 14, w: 8, h: 22 },
      { t: 'bench', x: 42, b: 14, w: 16, h: 11 },
      { t: 'bush', x: 22, b: 14, w: 12, h: 10 },
      { t: 'tree', x: 54, b: 12, w: 12, h: 24, o: .8, br: .55 },
      { t: 'bandPath', h: 14 },
    ],
    front: [
      { t: 'bandPath', h: 7 },
      { t: 'bush', x: 8, b: 1, w: 14, h: 10, br: .7 },
      { t: 'bush', x: 68, b: 2, w: 14, h: 10, br: .7 },
      { t: 'flower', x: 30, b: 3, w: 6, h: 9, c: '#ff8fb1' },
      { t: 'flower', x: 54, b: 3, w: 6, h: 9, c: '#ffd166' },
    ],
  },
  temple: {
    label: '단풍 사찰 마을', emoji: '🏯',
    sky: 'linear-gradient(180deg,#ffdcc0 0%,#ffe9d6 32%,#f2dcbe 32%,#dfc39a 74%,#cdb083 100%)',
    cover: ['maple', 'pagoda', 'lantern', 'bush', 'rock'],
    items: [
      { t: 'sun', x: 12, y: 6, w: 10, h: 10, o: .75 },
      { t: 'maple', x: -4, b: 14, w: 24, h: 44 },
      { t: 'maple', x: 76, b: 12, w: 26, h: 48 },
      { t: 'pagoda', x: 34, b: 14, w: 30, h: 48 },
      { t: 'lantern', x: 26, b: 14, w: 8, h: 12 },
      { t: 'lantern', x: 70, b: 14, w: 8, h: 12 },
      { t: 'rock', x: 14, b: 12, w: 9, h: 8 },
      { t: 'bush', x: 50, b: 12, w: 14, h: 11 },
      { t: 'stairs', x: 46, b: 8, w: 16, h: 8, o: .9 },
      { t: 'bandStone', h: 14 },
    ],
    front: [
      { t: 'bandStone', h: 7 },
      { t: 'bush', x: 6, b: 2, w: 14, h: 10, hu: 320 },
      { t: 'bush', x: 66, b: 1, w: 16, h: 11, hu: 320 },
      { t: 'flower', x: 40, b: 4, w: 6, h: 9, c: '#ffa987' },
      { t: 'rock', x: 82, b: 3, w: 8, h: 7 },
    ],
  },
};

/* 문(계단) 소품 */
SHAPES.stairs = `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet"><g fill="#e2dccb"><rect x="6" y="72" width="88" height="10"/><rect x="14" y="58" width="72" height="10"/><rect x="22" y="44" width="56" height="10"/></g></svg>`;

export const THEME_KEYS = Object.keys(THEMES);

/* ---------------- 숨는 자리 만들기 ---------------- */
const HIDE_MAP = {
  bush: { t: 'bush', w: 17, h: 15 },
  grass: { t: 'grass', w: 11, h: 9.5 },
  flower: { t: 'flower', w: 7.5, h: 12 },
  mushroom: { t: 'mushroom', w: 6, h: 9 },
  cloud: { t: 'cloud', w: 22, h: 10, o: .97 },
  tree: { t: 'tree', w: 18, h: 30 },
  pine: { t: 'pine', w: 16, h: 28 },
  seaweed: { t: 'seaweed', w: 10, h: 19 },
  coral: { t: 'coral', w: 11, h: 15 },
  rock: { t: 'rock', w: 13, h: 13 },
  starfish: { t: 'starfish', w: 7, h: 7 },
  bubble: { t: 'bubble', w: 6, h: 6, o: .92 },
  fish: { t: 'fish', w: 15, h: 10, o: .85 },
  shell: { t: 'shell', w: 8, h: 8 },
  snowPine: { t: 'snowPine', w: 16, h: 27 },
  snowman: { t: 'snowman', w: 11, h: 15 },
  cactus: { t: 'cactus', w: 11, h: 17 },
  palm: { t: 'palm', w: 17, h: 24 },
  dune: { t: 'dune', w: 22, h: 12 },
  gate: { t: 'gate', w: 15, h: 22 },
  deadTree: { t: 'deadTree', w: 13, h: 24 },
  bench: { t: 'bench', w: 15, h: 11 },
  streetlamp: { t: 'streetlamp', w: 8, h: 20 },
  clock: { t: 'clock', w: 9, h: 9 },
  tent: { t: 'tent', w: 20, h: 17 },
  campfire: { t: 'campfire', w: 11, h: 11 },
  lantern: { t: 'lantern', w: 8, h: 12 },
  bamboo: { t: 'bamboo', w: 14, h: 40 },
  cherry: { t: 'cherry', w: 20, h: 26 },
  maple: { t: 'maple', w: 20, h: 26 },
  balloon: { t: 'balloon', w: 9, h: 14 },
  island: { t: 'island', w: 20, h: 15 },
  gem: { t: 'gem', w: 12, h: 16 },
  crystal: { t: 'crystal', w: 11, h: 14 },
  sparkle: { t: 'sparkle', w: 5, h: 5 },
  stalactite: { t: 'stalactite', w: 24, h: 14 },
  sheep: { t: 'sheep', w: 14, h: 12 },
  hay: { t: 'hay', w: 14, h: 12 },
  iceberg: { t: 'iceberg', w: 20, h: 16 },
  igloo: { t: 'igloo', w: 17, h: 14 },
  jungleLeaf: { t: 'jungleLeaf', w: 17, h: 19 },
  vine: { t: 'vine', w: 10, h: 22 },
  tank: { t: 'tank', w: 26, h: 22 },
  glassPane: { t: 'glassPane', w: 24, h: 22 },
  cityTower: { t: 'cityTower', w: 17, h: 22 },
  bookshelf: { t: 'bookshelf', w: 18, h: 22 },
  cake: { t: 'cake', w: 12, h: 14 },
  cupcake: { t: 'cupcake', w: 8, h: 11 },
  table: { t: 'table', w: 18, h: 12 },
  awning: { t: 'awning', w: 30, h: 10 },
  sail: { t: 'sail', w: 16, h: 13 },
  pagoda: { t: 'pagoda', w: 20, h: 24 },
  pillar: { t: 'pillar', w: 11, h: 20 },
  arch: { t: 'arch', w: 22, h: 20 },
  log: { t: 'log', w: 16, h: 9 },
  butterfly: { t: 'butterfly', w: 8, h: 8 },
  star: { t: 'star', w: 6, h: 6 },
  planet: { t: 'planet', w: 15, h: 15, o: .95 },
  moon: { t: 'moon', w: 12, h: 12, o: .95 },
  icicle: { t: 'crystal', w: 9, h: 13, o: .9 },
  seesaw: { t: 'seesaw', w: 18, h: 15 },
  vase: { t: 'pillar', w: 8, h: 12 },
  fence: { t: 'fence', w: 22, h: 15, o: .95 },
  bunting: { t: 'bunting', w: 26, h: 9, o: .95 },
  window: { t: 'window', w: 14, h: 14 },
  lilypad: { t: 'lilypad', w: 9, h: 8 },
};

export function hidingDecor(spot, scale = 1, minW = 0) {
  const m = HIDE_MAP[spot.fg];
  if (!m) return '';
  if (minW && m.w * scale < minW) scale = minW / m.w;
  const w = m.w * scale, h = m.h * scale;
  const color = m.t === 'flower'
    ? FLOWER_COLORS[Math.abs(Math.floor(spot.x)) % FLOWER_COLORS.length] : null;
  return decor({
    t: m.t, x: spot.x - w / 2, y: spot.y - h * 0.55, w, h,
    o: m.o != null ? m.o : 1, c: color, hu: m.hu || 0, br: m.br || 1,
  });
}

export const COVER_TYPES = Object.keys(HIDE_MAP).filter((k) => HIDE_MAP[k]);

export function sceneLayerHTML(themeKey, extraClass = '') {
  const t = THEMES[themeKey];
  return `<div class="scene-layer back ${extraClass}" aria-hidden="true">${t.items.map((i) => decor(i)).join('')}</div>`;
}
export function sceneFrontHTML(themeKey, extra = '') {
  const t = THEMES[themeKey];
  return `<div class="scene-layer front" aria-hidden="true">${t.front.map((i) => decor(i)).join('')}${extra}</div>`;
}

/* 숨는 자리 후보 생성 — 겹치지 않는 격자 + 약간의 흔들림 */
export function makeSpots(themeKey, n, opt = {}) {
  const theme = THEMES[themeKey];
  const cols = opt.cols || 4;
  const rows = opt.rows || 3;
  const [y0, y1] = theme.spotY || [38, 86];
  const fgPool = (theme.cover && theme.cover.length ? theme.cover : ['bush']).filter((k) => HIDE_MAP[k]);
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ c, r });
  // 서로 붙지 않게 골라 퍼뜨리기
  const picked = [];
  for (const cell of shuffle(cells)) {
    if (picked.length >= n) break;
    if (picked.every((p) => Math.abs(p.c - cell.c) > 0 || Math.abs(p.r - cell.r) > 0)) picked.push(cell);
  }
  for (const cell of shuffle(cells)) {
    if (picked.length >= n) break;
    if (!picked.includes(cell)) picked.push(cell);
  }
  const fgs = shuffle(fgPool);
  return picked.map((cell, i) => {
    const cw = 84 / cols, ch = (y1 - y0) / rows;
    const x = 8 + (cell.c + 0.5) * cw + (Math.random() - 0.5) * cw * 0.5;
    const y = y0 + (cell.r + 0.5) * ch + (Math.random() - 0.5) * ch * 0.45;
    return {
      x: Math.max(9, Math.min(91, x)),
      y: Math.max(y0, Math.min(y1, y)),
      fg: fgs[i % fgs.length],
      c: null,
    };
  });
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* 도안 고르기: 같은 도안이 연달아 나오지 않게 */
let queue = [];
export function resetThemeQueue() { queue = []; }
export function nextTheme(avoid = []) {
  const avoidSet = new Set(avoid.filter(Boolean));
  for (let tries = 0; tries < 40; tries++) {
    if (!queue.length) queue = shuffle(THEME_KEYS);
    const k = queue.pop();
    if (!avoidSet.has(k)) { return k; }
  }
  return THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];
}
export const themeInfo = (k) => THEMES[k] || THEMES.forest;
