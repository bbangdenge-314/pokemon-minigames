/* ==========================================================
   장면(decor) 빌더 — 숨은그림찾기 · 틀린그림찾기 공용
   ========================================================== */

const G = {
  trunk: '#b0805a', trunkDark: '#96684a',
  leaf1: '#61bd72', leaf2: '#7ed08a', leaf3: '#96dda0', leaf4: '#4ea862',
  cloud: '#ffffff', cloudShade: '#e8f4ff',
  rock: '#c9c3d6', rockDark: '#a9a2b8',
  coral: '#ff9db4', coral2: '#ffb98a', coral3: '#c9a4ff',
  sand: '#ffe6b8',
};

export const SHAPES = {
  sun: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="34" fill="#ffd75e"/>
      <circle cx="42" cy="42" r="20" fill="#fff0a8" opacity=".65"/>
      <g stroke="#ffd75e" stroke-width="5" stroke-linecap="round" opacity=".8">
        <path d="M50 2 L50 12"/><path d="M50 88 L50 98"/><path d="M2 50 L12 50"/><path d="M88 50 L98 50"/>
        <path d="M16 16 L23 23"/><path d="M77 77 L84 84"/><path d="M84 16 L77 23"/><path d="M23 77 L16 84"/>
      </g>
    </svg>`,
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
  tree1: `
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
  cloud: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="50" cy="52" rx="36" ry="7" fill="${G.cloudShade}"/>
      <circle cx="34" cy="34" r="17" fill="${G.cloud}"/>
      <circle cx="56" cy="28" r="21" fill="${G.cloud}"/>
      <circle cx="74" cy="38" r="14" fill="${G.cloud}"/>
      <rect x="18" y="36" width="64" height="16" rx="8" fill="${G.cloud}"/>
    </svg>`,
  rock: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="94" rx="34" ry="5" fill="rgba(50,70,45,.12)"/>
      <path d="M14 90 L24 46 Q30 26 52 26 Q76 26 82 50 L88 90 Z" fill="${G.rock}"/>
      <path d="M24 46 Q30 26 52 26 L48 90 L20 90 Z" fill="${G.rockDark}" opacity=".45"/>
      <path d="M60 40 L70 62 L58 58 Z" fill="#fff" opacity=".35"/>
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
  star: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 6 Q58 42 94 50 Q58 58 50 94 Q42 58 6 50 Q42 42 50 6 Z" fill="#fff6b8"/>
    </svg>`,
  planet: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="50" cy="52" rx="44" ry="12" fill="#ffb3cd" opacity=".55" transform="rotate(-18 50 52)"/>
      <circle cx="50" cy="50" r="26" fill="#b9a4ff"/>
      <circle cx="42" cy="42" r="8" fill="#fff" opacity=".3"/>
      <circle cx="60" cy="60" r="5" fill="#8f7ae8" opacity=".6"/>
      <ellipse cx="50" cy="52" rx="44" ry="12" fill="none" stroke="#ffd6e6" stroke-width="4" transform="rotate(-18 50 52)"/>
    </svg>`,
  moon: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M64 12 A38 38 0 1 0 64 88 A30 30 0 1 1 64 12 Z" fill="#fff4c2"/>
      <circle cx="36" cy="36" r="5" fill="#f0e3a8" opacity=".8"/>
      <circle cx="30" cy="62" r="7" fill="#f0e3a8" opacity=".7"/>
    </svg>`,
  sparkle: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 0 Q55 45 100 50 Q55 55 50 100 Q45 55 0 50 Q45 45 50 0 Z" fill="#fff"/>
    </svg>`,
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
  bubble: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="34" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.75)" stroke-width="4"/>
      <circle cx="38" cy="36" r="8" fill="rgba(255,255,255,.65)"/>
    </svg>`,
  rainbow: `
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMax meet">
      <path d="M6 60 A44 44 0 0 1 94 60" fill="none" stroke="#ff9db4" stroke-width="9"/>
      <path d="M14 60 A36 36 0 0 1 86 60" fill="none" stroke="#ffd166" stroke-width="9"/>
      <path d="M22 60 A28 28 0 0 1 78 60" fill="none" stroke="#8fdc9a" stroke-width="9"/>
      <path d="M30 60 A20 20 0 0 1 70 60" fill="none" stroke="#9fd8ff" stroke-width="9"/>
    </svg>`,
  butterfly: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M50 50 Q20 12 10 34 Q4 58 46 58 Z" fill="#ffb3cd"/>
      <path d="M50 50 Q80 12 90 34 Q96 58 54 58 Z" fill="#ffc9dc"/>
      <path d="M50 54 Q26 74 20 66 Q16 56 46 52 Z" fill="#ffd6e6"/>
      <path d="M50 54 Q74 74 80 66 Q84 56 54 52 Z" fill="#ffe3ee"/>
      <ellipse cx="50" cy="52" rx="4" ry="16" fill="#8a6fae"/>
      <circle cx="20" cy="34" r="4" fill="#fff" opacity=".7"/>
      <circle cx="80" cy="34" r="4" fill="#fff" opacity=".7"/>
    </svg>`,
  pond: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <ellipse cx="50" cy="52" rx="49" ry="44" fill="#a8e4f7"/>
      <ellipse cx="50" cy="50" rx="45" ry="40" fill="#8fd8f2"/>
      <ellipse cx="44" cy="44" rx="26" ry="20" fill="#b8ecfa" opacity=".75"/>
      <ellipse cx="60" cy="60" rx="10" ry="6" fill="#fff" opacity=".35"/>
    </svg>`,
  stump: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      <ellipse cx="50" cy="94" rx="34" ry="5" fill="rgba(50,70,45,.14)"/>
      <path d="M18 92 L18 46 Q50 30 82 46 L82 92 Z" fill="#b0805a"/>
      <ellipse cx="50" cy="46" rx="32" ry="12" fill="#d6a87e"/>
      <ellipse cx="50" cy="46" rx="20" ry="7" fill="#c1926a" opacity=".7"/>
      <path d="M18 46 L82 46" stroke="#96684a" stroke-width="3"/>
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
};

const FLOWER_COLORS = ['#ffb3cd', '#ffd166', '#c9b6ff', '#ffa987', '#fff0a0'];

export function decor(item) {
  const { type, x = 0, y = null, bottom = null, w = 10, h = 10, flip = false, color = null, rot = 0, o = 1 } = item;
  let svg = SHAPES[type] || SHAPES.bush;
  if (color && type === 'flower') svg = svg.replaceAll('COLOR', color);
  if (type === 'sand') {
    return `<span class="deco" style="left:0;bottom:0;width:100%;height:11%;opacity:${o};">${svg}</span>`;
  }
  const pos = `left:${x}%;${y != null ? `top:${y}%;` : ''}${bottom != null ? `bottom:${bottom}%;` : ''}width:${w}%;height:${h}%;`;
  const tf = `transform:rotate(${rot}deg) scaleX(${flip ? -1 : 1});`;
  return `<span class="deco" style="${pos}opacity:${o};${tf}">${svg}</span>`;
}

/* 장면별 배경 요소 */
export const THEMES = {
  forest: {
    label: '숲속',
    cls: 'scene-forest',
    back: [
      { type: 'sun', x: 3, y: 3, w: 9, h: 9, o: .9 },
      { type: 'cloud', x: 22, y: 5, w: 22, h: 11, o: .95 },
      { type: 'cloud', x: 62, y: 3, w: 17, h: 9, o: .85 },
      { type: 'cloud', x: 82, y: 17, w: 13, h: 7, o: .6 },
      { type: 'tree', x: -3, y: 22, w: 22, h: 58 },
      { type: 'pine', x: 69, y: 20, w: 20, h: 56 },
      { type: 'tree', x: 86, y: 32, w: 15, h: 40, o: .9 },
      { type: 'tree', x: 28, y: 24, w: 12, h: 30, o: .8 },
      { type: 'bush', x: 20, y: 48, w: 15, h: 15 },
      { type: 'bush', x: 52, y: 44, w: 13, h: 13, o: .9 },
      { type: 'pond', x: 34, y: 58, w: 26, h: 15 },
      { type: 'rock', x: 62, y: 52, w: 9, h: 11 },
    ],
    front: [
      { type: 'bush', x: -6, bottom: -7, w: 28, h: 22 },
      { type: 'bush', x: 24, bottom: -9, w: 26, h: 19 },
      { type: 'bush', x: 52, bottom: -8, w: 28, h: 21 },
      { type: 'bush', x: 80, bottom: -6, w: 26, h: 19 },
      { type: 'grass', x: 8, bottom: 12, w: 8, h: 9 },
      { type: 'grass', x: 44, bottom: 14, w: 8, h: 9 },
      { type: 'grass', x: 66, bottom: 11, w: 7, h: 8 },
      { type: 'mushroom', x: 16, bottom: 16, w: 5, h: 8 },
      { type: 'mushroom', x: 58, bottom: 18, w: 5, h: 8 },
      { type: 'flower', x: 6, bottom: 3, w: 6, h: 9, color: FLOWER_COLORS[0] },
      { type: 'flower', x: 34, bottom: 4, w: 6, h: 9, color: FLOWER_COLORS[1] },
      { type: 'flower', x: 72, bottom: 3, w: 6, h: 9, color: FLOWER_COLORS[2] },
      { type: 'flower', x: 90, bottom: 8, w: 6, h: 9, color: FLOWER_COLORS[3] },
      { type: 'log', x: 78, bottom: 9, w: 13, h: 8 },
    ],
    spots: [
      { x: 11, y: 56, fg: 'bush' }, { x: 21, y: 47, fg: 'grass' }, { x: 33, y: 66, fg: 'flower' },
      { x: 43, y: 53, fg: 'bush' }, { x: 55, y: 61, fg: 'grass' }, { x: 65, y: 47, fg: 'flower' },
      { x: 75, y: 58, fg: 'bush' }, { x: 85, y: 46, fg: 'grass' }, { x: 13, y: 72, fg: 'flower' },
      { x: 46, y: 78, fg: 'bush' }, { x: 68, y: 76, fg: 'grass' }, { x: 89, y: 72, fg: 'bush' },
      { x: 50, y: 24, fg: 'cloud' }, { x: 74, y: 12, fg: 'cloud' },
    ],
  },
  sea: {
    label: '바닷속',
    cls: 'scene-sea',
    back: [
      { type: 'fish', x: 62, y: 10, w: 15, h: 9, flip: true, o: .8 },
      { type: 'fish', x: 16, y: 22, w: 12, h: 7, o: .55 },
      { type: 'fish', x: 40, y: 34, w: 10, h: 6, o: .4 },
      { type: 'bubble', x: 42, y: 6, w: 5, h: 5 },
      { type: 'bubble', x: 72, y: 26, w: 4, h: 4 },
      { type: 'bubble', x: 10, y: 44, w: 4, h: 4 },
      { type: 'coral', x: 2, y: 54, w: 17, h: 26 },
      { type: 'coral', x: 80, y: 52, w: 18, h: 28 },
      { type: 'seaweed', x: 22, y: 56, w: 9, h: 26, o: .9 },
      { type: 'seaweed', x: 65, y: 58, w: 8, h: 24, o: .8 },
      { type: 'rock', x: 48, y: 76, w: 12, h: 14, o: .9 },
    ],
    front: [
      { type: 'sand' },
      { type: 'seaweed', x: -2, bottom: 2, w: 15, h: 24 },
      { type: 'seaweed', x: 36, bottom: 4, w: 12, h: 18 },
      { type: 'seaweed', x: 62, bottom: 2, w: 14, h: 22 },
      { type: 'seaweed', x: 88, bottom: 5, w: 11, h: 18 },
      { type: 'coral', x: 54, bottom: 6, w: 12, h: 16 },
      { type: 'starfish', x: 14, bottom: 6, w: 7, h: 7 },
      { type: 'starfish', x: 74, bottom: 9, w: 6, h: 6 },
      { type: 'bubble', x: 30, bottom: 16, w: 4, h: 4 },
      { type: 'bubble', x: 82, bottom: 22, w: 3, h: 3 },
      { type: 'rock', x: 2, bottom: 4, w: 9, h: 10 },
    ],
    spots: [
      { x: 14, y: 40, fg: 'seaweed' }, { x: 28, y: 56, fg: 'coral' }, { x: 44, y: 30, fg: 'bubble' },
      { x: 58, y: 46, fg: 'seaweed' }, { x: 74, y: 38, fg: 'coral' }, { x: 88, y: 58, fg: 'seaweed' },
      { x: 24, y: 74, fg: 'starfish' }, { x: 48, y: 70, fg: 'rock' }, { x: 68, y: 72, fg: 'seaweed' },
      { x: 90, y: 76, fg: 'coral' }, { x: 6, y: 66, fg: 'seaweed' }, { x: 36, y: 18, fg: 'fish' },
    ],
  },
  flower: {
    label: '꽃밭',
    cls: 'scene-flower',
    back: [
      { type: 'sun', x: 86, y: 4, w: 8, h: 8, o: .85 },
      { type: 'cloud', x: 8, y: 4, w: 22, h: 11 },
      { type: 'cloud', x: 56, y: 7, w: 16, h: 8, o: .85 },
      { type: 'rainbow', x: 62, y: 0, w: 34, h: 20, o: .5 },
      { type: 'tree', x: 78, y: 26, w: 18, h: 44 },
      { type: 'bush', x: 2, y: 48, w: 14, h: 14 },
      { type: 'butterfly', x: 26, y: 22, w: 7, h: 7 },
      { type: 'butterfly', x: 52, y: 38, w: 6, h: 6, o: .85 },
      { type: 'butterfly', x: 70, y: 16, w: 5, h: 5, o: .7 },
      { type: 'pond', x: 46, y: 62, w: 20, h: 12, o: .85 },
    ],
    front: [
      { type: 'flower', x: 3, bottom: 4, w: 8, h: 13, color: FLOWER_COLORS[0] },
      { type: 'flower', x: 15, bottom: 1, w: 7, h: 12, color: FLOWER_COLORS[1] },
      { type: 'flower', x: 28, bottom: 5, w: 8, h: 13, color: FLOWER_COLORS[2] },
      { type: 'flower', x: 40, bottom: 2, w: 7, h: 12, color: FLOWER_COLORS[3] },
      { type: 'flower', x: 58, bottom: 4, w: 8, h: 13, color: FLOWER_COLORS[4] },
      { type: 'flower', x: 71, bottom: 1, w: 7, h: 12, color: FLOWER_COLORS[0] },
      { type: 'flower', x: 84, bottom: 5, w: 8, h: 13, color: FLOWER_COLORS[2] },
      { type: 'bush', x: 32, bottom: -6, w: 24, h: 16 },
      { type: 'bush', x: 66, bottom: -5, w: 22, h: 15 },
      { type: 'grass', x: 8, bottom: 12, w: 7, h: 8 },
      { type: 'grass', x: 50, bottom: 14, w: 7, h: 8 },
      { type: 'grass', x: 90, bottom: 12, w: 6, h: 7 },
    ],
    spots: [
      { x: 12, y: 62, fg: 'flower' }, { x: 24, y: 48, fg: 'butterfly' }, { x: 38, y: 66, fg: 'flower' },
      { x: 50, y: 44, fg: 'bush' }, { x: 64, y: 60, fg: 'flower' }, { x: 78, y: 70, fg: 'grass' },
      { x: 18, y: 78, fg: 'flower' }, { x: 44, y: 80, fg: 'grass' }, { x: 58, y: 76, fg: 'flower' },
      { x: 86, y: 44, fg: 'tree' }, { x: 34, y: 30, fg: 'cloud' }, { x: 72, y: 34, fg: 'butterfly' },
    ],
  },
  space: {
    label: '우주',
    cls: 'scene-space',
    back: [
      { type: 'star', x: 8, y: 8, w: 5, h: 5, o: .95 },
      { type: 'star', x: 26, y: 20, w: 3, h: 3, o: .8 },
      { type: 'star', x: 46, y: 6, w: 4, h: 4, o: .9 },
      { type: 'star', x: 64, y: 26, w: 3, h: 3, o: .7 },
      { type: 'star', x: 82, y: 10, w: 5, h: 5, o: .85 },
      { type: 'star', x: 92, y: 48, w: 3, h: 3, o: .7 },
      { type: 'star', x: 16, y: 46, w: 3, h: 3, o: .6 },
      { type: 'star', x: 38, y: 58, w: 4, h: 4, o: .55 },
      { type: 'star', x: 70, y: 58, w: 3, h: 3, o: .6 },
      { type: 'planet', x: 4, y: 62, w: 20, h: 20 },
      { type: 'moon', x: 74, y: 30, w: 16, h: 16, o: .95 },
      { type: 'planet', x: 40, y: 14, w: 10, h: 10, o: .75 },
    ],
    front: [
      { type: 'planet', x: 82, bottom: 6, w: 18, h: 18, o: .95 },
      { type: 'bubble', x: 30, bottom: 8, w: 4, h: 4 },
      { type: 'bubble', x: 52, bottom: 14, w: 3, h: 3 },
      { type: 'star', x: 60, bottom: 4, w: 4, h: 4, o: .8 },
      { type: 'star', x: 12, bottom: 10, w: 3, h: 3, o: .7 },
      { type: 'moon', x: 22, bottom: 2, w: 8, h: 8, o: .9 },
    ],
    spots: [
      { x: 18, y: 30, fg: 'planet' }, { x: 34, y: 40, fg: 'star' }, { x: 52, y: 22, fg: 'bubble' },
      { x: 66, y: 48, fg: 'moon' }, { x: 86, y: 30, fg: 'planet' }, { x: 24, y: 72, fg: 'star' },
      { x: 46, y: 68, fg: 'bubble' }, { x: 72, y: 72, fg: 'planet' }, { x: 58, y: 84, fg: 'star' },
      { x: 8, y: 82, fg: 'bubble' }, { x: 40, y: 56, fg: 'moon' }, { x: 92, y: 66, fg: 'star' },
    ],
  },
};

/* 바닷속 모래바닥 + 불가사리 (테마 전용) */
SHAPES.sand = `<svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q20 4 40 12 Q60 20 80 8 Q92 2 100 10 L100 20 Z" fill="#ffe0a8"/></svg>`;
SHAPES.starfish = `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><path d="M50 6 L61 38 L96 38 L68 58 L78 92 L50 72 L22 92 L32 58 L4 38 L39 38 Z" fill="#ffb3a0"/><circle cx="50" cy="46" r="6" fill="#ffe0d0"/></svg>`;

/* 앞쪽(front) 레이어에 놓을, 숨은 친구를 살짝 가리는 요소 */
export function hidingDecor(spot) {
  const { x, y, fg } = spot;
  const map = {
    bush: { type: 'bush', x: x - 8, y: y + 0.6, w: 16, h: 13 },
    grass: { type: 'grass', x: x - 5, y: y + 1.2, w: 10, h: 8.5 },
    flower: { type: 'flower', x: x - 2.5, y: y + 0.8, w: 6, h: 10, color: FLOWER_COLORS[(x | 0) % FLOWER_COLORS.length] },
    mushroom: { type: 'mushroom', x: x - 2, y: y + 1.4, w: 5, h: 7.5 },
    cloud: { type: 'cloud', x: x - 10, y: y - 0.5, w: 20, h: 8.5, o: .95 },
    tree: { type: 'tree', x: x - 7, y: y - 5, w: 14, h: 26 },
    pine: { type: 'pine', x: x - 6, y: y - 4, w: 12, h: 24 },
    seaweed: { type: 'seaweed', x: x - 4.5, y: y - 1, w: 9, h: 18 },
    coral: { type: 'coral', x: x - 5, y: y + 0.2, w: 10, h: 14 },
    starfish: { type: 'starfish', x: x - 3.2, y: y + 1, w: 6.4, h: 6.4 },
    bubble: { type: 'bubble', x: x - 4, y: y + 0.5, w: 5.5, h: 5.5, o: .9 },
    planet: { type: 'planet', x: x - 6, y: y + 0.8, w: 12, h: 12, o: .92 },
    moon: { type: 'moon', x: x - 5, y: y + 0.5, w: 10, h: 10, o: .92 },
    star: { type: 'star', x: x - 3, y: y + 0.8, w: 6, h: 6, o: .9 },
    butterfly: { type: 'butterfly', x: x - 4, y: y + 0.6, w: 8, h: 8 },
    rock: { type: 'rock', x: x - 6, y: y + 1, w: 12, h: 12 },
    fish: { type: 'fish', x: x - 7, y: y + 0.5, w: 14, h: 9, o: .8 },
  };
  const item = map[fg];
  return item ? decor(item) : '';
}

export function sceneLayerHTML(themeKey) {
  const t = THEMES[themeKey];
  return `<div class="scene-layer back" aria-hidden="true">${t.back.map(decor).join('')}</div>`;
}
export function sceneFrontHTML(themeKey, extra = '') {
  const t = THEMES[themeKey];
  return `<div class="scene-layer front" aria-hidden="true">${t.front.map(decor).join('')}${extra}</div>`;
}
