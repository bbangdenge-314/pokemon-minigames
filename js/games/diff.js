/* ==========================================================
   2. 틀린그림찾기 — 32가지 도안에서 다른 곳 찾기 (쉬움/보통/어려움)
   ========================================================== */
import { byId, DEX, pick, pickMany } from '../data.js';
import { qs, qsa, save } from '../core.js';
import { THEMES, decor, sceneFrontHTML, nextTheme, themeInfo } from './scene.js';

const CFG = {
  easy: { n: 3, minW: 12, muts: ['gone', 'swap', 'hue'] },
  normal: { n: 5, minW: 8, muts: ['gone', 'swap', 'hue', 'big', 'flip'] },
  hard: { n: 7, minW: 5, muts: ['gone', 'swap', 'hue', 'big', 'flip', 'rot'] },
};
const ROUNDS = 3;

/* 좌우 반전해도 티가 안 나는 모양 */
const SYMMETRIC = new Set([
  'sun', 'star', 'sparkle', 'bubble', 'moon', 'planet', 'flower', 'pond', 'cloud',
  'gem', 'crystal', 'igloo', 'snowman', 'balloon', 'rainbow', 'hay', 'pumpkin',
  'rails', 'bandSand', 'bandSnow', 'bandGrass', 'bandLava', 'bandWaves', 'bandPath',
  'bandDeck', 'bandTile', 'bandCave', 'bandStone', 'bandCloud', 'bandDarkGrass',
  'bamboo', 'arch', 'pyramid', 'tank', 'glassPane', 'pond', 'dune', 'hill', 'hill2',
  'table', 'window', 'bench', 'pillar', 'stairs',
]);

/* 색이 거의 없어 hue 회전이 티나지 않는 소품 */
const NEUTRAL = new Set([
  'pillar', 'arch', 'pyramid', 'rock', 'cloud', 'table', 'bench', 'stairs', 'log', 'stump',
  'fence', 'rail', 'clock', 'gem', 'crystal', 'iceberg', 'igloo', 'snowman', 'sheep', 'hay',
  'dune', 'tank', 'glassPane', 'window', 'lighthouse', 'cityTower', 'train', 'bookshelf', 'tower',
  'moon', 'sun', 'snowman', 'igloo', 'iceberg', 'sheep', 'snowPine', 'hay', 'star', 'sparkle',
  'bubble', 'planet', 'bamboo', 'stairs',
]);

/* 배경 판이라 '차이'로 쓰기엔 티가 안 나는 요소 */
const BACKGROUND = new Set(['hill', 'hill2', 'dune', 'aurora', 'pond', 'waves', 'bandSand', 'bandSnow',
  'bandGrass', 'bandLava', 'bandWaves', 'bandPath', 'bandDeck', 'bandTile', 'bandCave', 'bandStone',
  'bandCloud', 'bandDarkGrass']);
/* 크기를 키워도 티가 잘 안 나는 요소 */
const NO_BIG = new Set(['cloud', 'moon', 'sun', 'star', 'sparkle', 'bubble', 'snowman', 'igloo',
  'iceberg', 'hay', 'snowPine', 'sheep']);

const POKE_SLOTS = [
  { x: 44, y: 50, w: 23, h: 23 },
  { x: 15, y: 64, w: 12, h: 12 },
];

function isBand(item) { return (item.t || '').startsWith('band') || item.w >= 90; }

/* 후보 아이템에 차이 만들기 */
function mutate(item, kind, altId) {
  switch (kind) {
    case 'gone': return null;
    case 'hue': return { ...item, hu: 150 + Math.random() * 60 };
    case 'flip': return { ...item, f: !item.f };
    case 'big': return { ...item, sc: 1.32 };
    case 'rot': return { ...item, r: (item.r || 0) + (Math.random() < 0.5 ? 26 : -26) };
    case 'swap': return { ...item, id: altId };
    default: return item;
  }
}

function center(item) {
  const top = item.y != null ? item.y + item.h / 2 : 100 - (item.b || 0) - item.h / 2;
  return { x: item.x + item.w / 2, top };
}

function hotspotStyle(item) {
  const c = center(item);
  const w = Math.max(7, Math.min(19, item.w * 1.1));
  const h = Math.max(9, Math.min(19, item.h * 1.1));
  return `left:${c.x}%;top:${c.top}%;width:${w}%;height:${h}%`;
}

export default {
  id: 'diff',
  howto: '두 그림을 잘 보세요. 서로 다른 곳을 찾아 콕 누르면 돼요. 난이도에 따라 3~7곳이에요!',
  tips: [
    '포켓몬부터 천천히 비교해 보세요.',
    '구름·꽃·나무 색이나 방향도 달라질 수 있어요.',
    '찾은 곳에는 빨간 동그라미가 생겨요.',
    '🎨 도안 버튼으로 다른 배경에서도 놀 수 있어요.',
  ],
  mount(ctx) {
    const D = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let themeKey = ctx.state.lastTheme?.diff || null;
    let diffs = [];
    let found = new Set();
    let done = false;
    let lastWrong = 0;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function remember(k) {
      themeKey = k;
      ctx.state.lastTheme = ctx.state.lastTheme || {};
      ctx.state.lastTheme.diff = k;
      save();
    }
    function newTheme(avoid) {
      remember(nextTheme([avoid, ctx.state.lastTheme?.diff].filter(Boolean)));
      return themeKey;
    }

    function buildRound() {
      const theme = themeInfo(themeKey);
      const base = theme.items.filter((i) => !isBand(i) && !BACKGROUND.has(i.t) && i.w >= D.minW && i.h >= D.minW * 0.7 && (i.o == null || i.o > 0.6));
      // 난이도에 따라 크기가 큰 소품 ~ 작은 소품 고르기
      const sorted = base.slice().sort((a, b) => b.w * b.h - a.w * a.h);
      let pool;
      if (ctx.difficulty === 'easy') pool = sorted.slice(0, Math.max(10, D.n * 3));
      else if (ctx.difficulty === 'hard') pool = sorted.slice(Math.floor(sorted.length / 3));
      else pool = sorted.slice(0, Math.max(14, Math.floor(sorted.length * 0.75)));

      const pokes = pickMany(DEX.filter((p) => p.h >= 0.6 && p.h <= 1.9), 2);
      const pokeItems = POKE_SLOTS.map((s, i) => ({
        t: 'poke', x: s.x, y: s.y, w: s.w, h: s.h, id: pokes[i].id, n: pokes[i].n,
      }));

      const chosen = [];
      const wantN = D.n;
      // 1) 포켓몬 차이 하나는 꼭 넣기
      chosen.push({ item: pokeItems[0], kind: 'swap', alt: pokes[1].id });

      // 2) 나머지 소품 차이
      const shuffled = pickMany(pool, pool.length);
      for (const it of shuffled) {
        if (chosen.length >= wantN) break;
        const c = center(it);
        const farEnough = chosen.every((ch) => {
          const cc = center(ch.item);
          return Math.abs(cc.x - c.x) > 19 || Math.abs(cc.top - c.top) > 18;
        });
        if (!farEnough) continue;
        let kinds = D.muts.filter((k) => k !== 'swap');
        if (SYMMETRIC.has(it.t)) kinds = kinds.filter((k) => k !== 'flip' && k !== 'rot');
        if (NEUTRAL.has(it.t)) kinds = kinds.filter((k) => k !== 'hue');
        if (NO_BIG.has(it.t)) kinds = kinds.filter((k) => k !== 'big');
        if (!kinds.length) kinds = ['gone'];
        const kind = pick(kinds);
        chosen.push({ item: it, kind });
      }
      // 3) 자리가 모자라면 조금 덜 떨어진 후보까지 (겹치지 않을 만큼만)
      if (chosen.length < wantN) {
        for (const it of shuffled) {
          if (chosen.length >= wantN) break;
          if (chosen.some((c) => c.item === it)) continue;
          const c = center(it);
          const ok2 = chosen.every((ch) => {
            const cc = center(ch.item);
            return Math.abs(cc.x - c.x) > 11 || Math.abs(cc.top - c.top) > 11;
          });
          if (!ok2) continue;
          let kinds = D.muts.filter((k) => k !== 'swap'
            && !(SYMMETRIC.has(it.t) && (k === 'flip' || k === 'rot'))
            && !(k === 'hue' && NEUTRAL.has(it.t))
            && !(k === 'big' && NO_BIG.has(it.t)));
          if (!kinds.length) kinds = ['gone'];
          chosen.push({ item: it, kind: pick(kinds) });
        }
      }
      return { theme, pokeItems, chosen };
    }

    function paneHTML(side, pack) {
      const items = pack.theme.items.concat(pack.pokeItems);
      const changed = new Map(pack.chosen.map((c) => [c.item, c]));
      const body = items.map((it, i) => {
        const ch = changed.get(it);
        if (side === 'b' && ch) {
          const m = mutate(it, ch.kind, ch.alt);
          return m ? decor(m, `data-di="${i}"`) : '';
        }
        return decor(it, `data-di="${i}"`);
      }).join('');
      const hots = pack.chosen.map((c, i) => `
        <button class="diff-hot" data-i="${i}" aria-label="다른 곳 ${i + 1}"
          style="${hotspotStyle(c.item)}"></button>`).join('');
      return `
        <div class="diff-scene-wrap">
          <div class="scene diff-scene" style="background:${pack.theme.sky}">
            <div class="scene-layer back" aria-hidden="true">${body}</div>
            ${sceneFrontHTML(themeKey)}
            ${hots}
          </div>
        </div>`;
    }

    function render(useTheme = null) {
      if (useTheme) remember(useTheme);
      else if (!themeKey) newTheme();
      const pack = buildRound();
      diffs = pack.chosen;
      if (typeof window !== 'undefined') {
        window.__diffDebug = pack.chosen.map((c) => ({ t: c.item.t, kind: c.kind, w: c.item.w, h: c.item.h, x: c.item.x }));
      }
      found = new Set();
      done = false;
      const theme = pack.theme;
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`${theme.emoji} <b>${theme.label}</b>에서 두 그림의 <b>다른 곳 ${diffs.length}군데</b>를 찾아보세요!`, '🧐');

      body.innerHTML = `
        <div class="stage diff-stage">
          <div class="diff-board" id="board">
            <div class="diff-pane" data-side="a"><span class="pane-tag">그림 1</span>${paneHTML('a', pack)}</div>
            <div class="diff-pane" data-side="b"><span class="pane-tag">그림 2</span>${paneHTML('b', pack)}</div>
          </div>
          <div class="diff-foot">
            <span class="diff-score">찾은 곳 <b id="d-score">0</b> / ${diffs.length}</span>
            <div class="diff-pips" id="d-pips">${diffs.map(() => '<i></i>').join('')}</div>
            <span class="chip scene-chip">${theme.emoji} ${theme.label}</span>
            <span class="bar-btns">
              <button class="btn btn-sm btn-ghost" id="d-theme">🎨 도안</button>
              <button class="btn btn-sm btn-sun" id="d-hint">💡 힌트</button>
            </span>
          </div>
        </div>`;

      const board = qs('#board', body);
      board.addEventListener('click', (e) => {
        const hot = e.target.closest('.diff-hot');
        if (hot) { onFind(Number(hot.dataset.i)); return; }
        ctx.sfx.tap();
        if (Date.now() - lastWrong > 2200) { lastWrong = Date.now(); ctx.toast('조금만 더 자세히 살펴볼까?', 1400); }
      });
      qs('#d-hint', body).addEventListener('click', hint);
      qs('#d-theme', body).addEventListener('click', openPicker);
      ctx.load(pack.pokeItems.map((p) => byId(p.id)));
    }

    function openPicker() {
      const modal = ctx.openModal(`
        <h2>🎨 어떤 도안에서 놀까요?</h2>
        <p class="picker-sub">지금은 ${THEMES[themeKey].emoji} ${THEMES[themeKey].label} — 다른 그림을 골라 보세요</p>
        <div class="theme-grid">
          <button class="theme-btn random" data-k="__random"><span class="tb-emoji">🎲</span><span class="tb-name">랜덤으로</span></button>
          ${Object.entries(THEMES).map(([k, t]) => `
            <button class="theme-btn ${k === themeKey ? 'on' : ''}" data-k="${k}">
              <span class="tb-emoji">${t.emoji}</span><span class="tb-name">${t.label}</span>
            </button>`).join('')}
        </div>`);
      modal.el.addEventListener('click', (e) => {
        const b = e.target.closest('.theme-btn');
        if (!b) return;
        const k = b.dataset.k;
        ctx.sfx.pop();
        modal.close();
        if (k === '__random') { newTheme(themeKey); render(); } else render(k);
      });
    }

    function onFind(i) {
      if (done || found.has(i)) return;
      found.add(i);
      ctx.sfx.pop();
      ctx.sfx.correct();
      qsa(`.diff-hot[data-i="${i}"]`, body).forEach((h) => {
        h.classList.add('found');
        const r = h.getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 12, speed: 4.5 });
      });
      const score = qs('#d-score', body);
      if (score) score.textContent = String(found.size);
      const pips = qsa('#d-pips i', body);
      if (pips[found.size - 1]) pips[found.size - 1].classList.add('on');
      if (found.size === diffs.length) {
        done = true;
        const isLast = round >= ROUNDS - 1;
        later(() => ctx.win(isLast ? '모두 찾았어!' : '정답!'), 260);
        later(() => {
          round++;
          if (round >= ROUNDS) ctx.finish(5);
          else { newTheme(); render(); }
        }, 1900);
      } else {
        ctx.toast(`찾았다! ${found.size}곳째 🎉`, 1000);
      }
    }

    function hint() {
      const left = diffs.map((_, i) => i).filter((i) => !found.has(i));
      if (!left.length) return;
      const h = qs(`.diff-hot[data-i="${left[0]}"]`, body);
      if (h) {
        h.classList.add('hint');
        ctx.sfx.pop();
        setTimeout(() => h.classList.remove('hint'), 2400);
      }
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};
