/* ==========================================================
   1. 숨은그림찾기 — 숲속 · 바닷속 · 꽃밭에서 친구 찾기
   ========================================================== */
import { byId, SMALL_IDS, pick, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';
import { THEMES, sceneLayerHTML, sceneFrontHTML, hidingDecor } from './scene.js';

const ROUNDS = [
  { theme: 'forest', n: 4 },
  { theme: 'sea', n: 5 },
  { theme: 'flower', n: 5 },
];
const COVER_OK = new Set(['bush', 'flower', 'grass', 'mushroom', 'cloud', 'seaweed', 'coral', 'starfish', 'bubble', 'planet', 'moon', 'star', 'butterfly']);

function chooseSpots(themeKey, n) {
  const all = THEMES[themeKey].spots.filter((s) => COVER_OK.has(s.fg));
  const chosen = [];
  for (const s of pickMany(all, all.length)) {
    if (chosen.length >= n) break;
    if (chosen.every((c) => Math.abs(c.x - s.x) > 16 || Math.abs(c.y - s.y) > 15)) chosen.push(s);
  }
  if (chosen.length < n) {
    for (const s of all) {
      if (chosen.length >= n) break;
      if (!chosen.includes(s)) chosen.push(s);
    }
  }
  return chosen.slice(0, n);
}

export default {
  id: 'hidden',
  howto: '숲속·바닷속·꽃밭에 포켓몬 친구들이 숨어 있어요. 찾은 친구를 콕 눌러 주세요!',
  tips: [
    '나뭇잎 뒤, 구름 속, 꽃 사이를 살짝 들여다보세요.',
    '모르겠으면 아래 <b>힌트</b> 버튼을 눌러도 괜찮아요.',
    '틀려도 벌은 없어요. 천천히 다시 찾아보면 돼요.',
  ],
  mount(ctx) {
    let round = 0;
    let found = 0;
    let targets = [];
    let done = false;
    let lastWrong = 0;
    const timers = [];
    const body = ctx.root;
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

    function render() {
      const cfg = ROUNDS[round];
      const theme = THEMES[cfg.theme];
      const friends = pickMany(SMALL_IDS, cfg.n).map(byId);
      const spots = chooseSpots(cfg.theme, cfg.n);
      targets = friends.map((p, i) => ({ p, spot: spots[i] || spots[0], size: Math.round(50 + Math.random() * 14), found: false }));
      found = 0;
      done = false;
      ctx.setRound(round, ROUNDS.length);
      ctx.setTip(`${theme.label}에 <b>${cfg.n}명</b>의 친구가 숨어 있어요. 잘 찾아보세요!`, '🔍');

      const hiders = targets.map((t, i) => `
        <button class="hid" data-i="${i}" aria-label="${t.p.n} 찾기"
          style="left:${t.spot.x}%;top:${t.spot.y}%;width:${t.size}px;height:${t.size}px;transform:translate(-50%,-50%) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg)">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${t.p.id}.png" alt="${t.p.n}" draggable="false">
        </button>`).join('');

      const covers = targets.map((t) => hidingDecor(t.spot)).join('');

      body.innerHTML = `
        <div class="stage hidden-stage">
          <div class="hidden-bar">
            <span class="found-label">🔍 숨은 친구 <b id="found-n">0</b> / ${cfg.n}</span>
            <span class="chip">${theme.label}</span>
            <button class="btn btn-sm btn-sun hint-btn" id="hint">💡 힌트</button>
          </div>
          <div class="scene ${theme.cls}" id="scene">
            ${sceneLayerHTML(cfg.theme)}
            <div class="scene-layer" id="hid-layer" style="z-index:3">${hiders}</div>
            ${sceneFrontHTML(cfg.theme, covers)}
          </div>
          <div class="found-tray" id="tray">
            ${friends.map((p) => `<span class="found-slot" title="${p.n}"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png" alt="${p.n}"></span>`).join('')}
          </div>
        </div>`;

      const scene = qs('#scene', body);
      scene.addEventListener('click', (e) => {
        const btn = e.target.closest('.hid');
        if (btn) return onFind(btn, e, scene);
        ripple(scene, e);
        const now = Date.now();
        if (now - lastWrong > 2400) {
          lastWrong = now;
          ctx.sfx.tap();
          ctx.toast(pick(['어디 있을까~ 다시 찾아보자!', '조금만 더 찾아볼까?', '나뭇잎 사이를 잘 봐!']), 1400);
        }
      });
      qs('#hint', body).addEventListener('click', () => {
        const left = qsa('.hid:not(.found)', scene);
        if (!left.length) return;
        const t = left[0];
        ctx.sfx.pop();
        t.classList.add('hint');
        setTimeout(() => t.classList.remove('hint'), 2200);
      });
      ctx.load(friends);
    }

    function onFind(btn, e, scene) {
      if (done || btn.classList.contains('found')) return;
      const i = Number(btn.dataset.i);
      const t = targets[i];
      if (!t || t.found) return;
      t.found = true;
      btn.classList.add('found');
      found++;
      const r = btn.getBoundingClientRect();
      ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 16, speed: 5.5 });
      ctx.sfx.cry(t.p.id);
      ctx.sfx.correct();
      const slot = qsa('.found-slot', body)[i];
      if (slot) slot.classList.add('on');
      const fn = qs('#found-n', body);
      if (fn) fn.textContent = String(found);

      if (found === targets.length) {
        done = true;
        const nr = qs('#found-n', body);
        later(() => {
          ctx.win(round >= ROUNDS.length - 1 ? '다 찾았어!' : '한 판 성공!');
        }, 420);
        later(() => next(), 1600);
      } else {
        ctx.toast(`찾았다! ${t.p.n} 🎉`, 1200);
      }
    }

    function ripple(scene, e) {
      const r = scene.getBoundingClientRect();
      const d = document.createElement('span');
      d.className = 'ripple';
      d.style.left = `${e.clientX - r.left}px`;
      d.style.top = `${e.clientY - r.top}px`;
      scene.appendChild(d);
      setTimeout(() => d.remove(), 620);
    }

    function next() {
      round++;
      if (round >= ROUNDS.length) { ctx.finish(5); return; }
      render();
    }

    render();
    return {
      destroy() {
        done = true;
        timers.forEach((t) => clearTimeout(t));
        ctx.sfx.stopCry();
      },
    };
  },
};
