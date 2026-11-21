/* ==========================================================
   1. 숨은그림찾기 — 32가지 도안에서 친구 찾기 (쉬움/보통/어려움)
   ========================================================== */
import { byId, SMALL_IDS, pick, pickMany } from '../data.js';
import { qs, qsa, save } from '../core.js';
import {
  THEMES, sceneLayerHTML, sceneFrontHTML, hidingDecor, makeSpots, nextTheme, themeInfo,
} from './scene.js';

const CFG = {
  easy: { n: 3, cols: 3, rows: 3, size: [1.45, 1.7], cover: .95, minCover: 11, extraCover: 0, decoys: 0 },
  normal: { n: 5, cols: 4, rows: 3, size: [1, 1.18], cover: 1.05, minCover: 7.5, extraCover: 0, decoys: 0 },
  hard: { n: 7, cols: 5, rows: 4, size: [.7, .88], cover: 1.2, minCover: 5, extraCover: 1, decoys: 5 },
};
const ROUNDS = 3;

export default {
  id: 'hidden',
  howto: '도안 속에 포켓몬 친구들이 숨어 있어요. 찾은 친구를 콕 눌러 주세요!',
  tips: [
    '나뭇잎 뒤, 구름 속, 소품 사이를 살짝 들여다보세요.',
    '모르겠으면 아래 <b>힌트</b> 버튼을 눌러도 괜찮아요.',
    '🎨 도안 버튼으로 다른 그림을 골라도 돼요.',
    '어려움에서는 숨은 친구가 아닌 방해 친구도 있어요!',
  ],
  mount(ctx) {
    const D = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let found = 0;
    let targets = [];
    let themeKey = ctx.state.lastTheme?.hidden || null;
    let done = false;
    let lastWrong = 0;
    const timers = [];
    const body = ctx.root;
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

    function pickNewTheme(avoid) {
      themeKey = nextTheme([avoid, ctx.state.lastTheme?.hidden].filter(Boolean));
      stateRemember('hidden', themeKey);
      return themeKey;
    }

    function stateRemember(game, key) {
      ctx.state.lastTheme = ctx.state.lastTheme || {};
      ctx.state.lastTheme[game] = key;
      save();
    }

    function render(useTheme = null) {
      if (useTheme) { themeKey = useTheme; stateRemember('hidden', themeKey); }
      else if (!themeKey) pickNewTheme();
      const theme = themeInfo(themeKey);
      const total = D.n + D.decoys;
      const friends = pickMany(SMALL_IDS, D.n).map(byId);
      const spots = makeSpots(themeKey, total, { cols: D.cols, rows: D.rows });
      while (spots.length < total) spots.push({ ...spots[0], x: 20 + Math.random() * 60 });
      targets = friends.map((p, i) => ({
        p, spot: spots[i], f: D.size[0] + Math.random() * (D.size[1] - D.size[0]), found: false,
      }));
      const decoyPool = SMALL_IDS.filter((id) => !friends.some((f) => f.id === id));
      const decoys = pickMany(decoyPool, D.decoys).map((id, i) => ({
        p: byId(id), spot: spots[D.n + i],
      }));
      found = 0;
      done = false;
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`${theme.emoji} <b>${theme.label}</b>에 <b>${D.n}명</b>이 숨어 있어요. 잘 찾아보세요!`, '🔍');

      const hiders = targets.map((t, i) => `
        <button class="hid" data-i="${i}" aria-label="${t.p.n} 찾기"
          style="left:${t.spot.x}%;top:${t.spot.y}%;width:calc(clamp(34px,4.2vw,62px) * ${t.f.toFixed(2)});height:calc(clamp(34px,4.2vw,62px) * ${t.f.toFixed(2)});transform:translate(-50%,-50%) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg)">
          <img src="${ctx.artUrl(t.p.id)}" alt="${t.p.n}" draggable="false">
        </button>`).join('');

      const decoyHTML = decoys.map((d, i) => `
        <button class="hid decoy" data-d="${i}" aria-label="지나가는 친구"
          style="left:${d.spot.x}%;top:${d.spot.y}%;width:calc(clamp(34px,4.2vw,62px) * ${(D.size[0] * 0.95).toFixed(2)});height:calc(clamp(34px,4.2vw,62px) * ${(D.size[0] * 0.95).toFixed(2)});transform:translate(-50%,-50%) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg)">
          <img src="${ctx.artUrl(d.p.id)}" alt="" draggable="false">
        </button>`).join('');

      const covers = targets.map((t) =>
        hidingDecor(t.spot, D.cover, D.minCover) +
        (D.extraCover ? hidingDecor({ ...t.spot, x: t.spot.x + 3.2, y: t.spot.y - 1.6, fg: t.spot.fg }, 1.0, D.minCover * .7) : '')
      ).join('');

      body.innerHTML = `
        <div class="stage hidden-stage">
          <div class="hidden-bar">
            <span class="found-label">🔍 숨은 친구 <b id="found-n">0</b> / ${D.n}</span>
            <span class="chip scene-chip" id="scene-chip">${theme.emoji} ${theme.label}</span>
            <span class="bar-btns">
              <button class="btn btn-sm btn-ghost" id="theme-pick">🎨 도안</button>
              <button class="btn btn-sm btn-sun hint-btn" id="hint">💡 힌트</button>
            </span>
          </div>
          <div class="scene" id="scene" style="background:${theme.sky}">
            ${sceneLayerHTML(themeKey)}
            <div class="scene-layer" id="hid-layer" style="z-index:3">${hiders}${decoyHTML}</div>
            ${sceneFrontHTML(themeKey, covers)}
          </div>
          <div class="found-tray" id="tray">
            ${friends.map((p) => `<span class="found-slot" title="${p.n}"><img src="${ctx.artUrl(p.id)}" alt="${p.n}"></span>`).join('')}
          </div>
        </div>`;

      const scene = qs('#scene', body);
      scene.addEventListener('click', (e) => {
        const decoy = e.target.closest('.hid.decoy');
        if (decoy) return onDecoy(decoy);
        const btn = e.target.closest('.hid');
        if (btn) return onFind(btn, e, scene);
        ripple(scene, e);
        const now = Date.now();
        if (now - lastWrong > 2400) {
          lastWrong = now;
          ctx.sfx.tap();
          ctx.toast(pick(['어디 있을까~ 다시 찾아보자!', '조금만 더 찾아볼까?', '소품 사이를 잘 봐!']), 1400);
        }
      });
      qs('#hint', body).addEventListener('click', () => {
        const left = qsa('.hid:not(.found):not(.decoy)', scene);
        if (!left.length) return;
        const t = left[0];
        ctx.sfx.pop();
        t.classList.add('hint');
        setTimeout(() => t.classList.remove('hint'), 2200);
      });
      qs('#theme-pick', body).addEventListener('click', openPicker);
      ctx.load(friends.concat(decoys.map((d) => d.p)));
    }

    function openPicker() {
      const modal = ctx.openModal(`
        <h2>🎨 어떤 그림에서 놀까요?</h2>
        <p class="picker-sub">도안을 고르면 바로 그 그림으로 바뀌어요 (${THEMES[themeKey].label})</p>
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
        render(k === '__random' ? pickNewTheme(themeKey) : k);
      });
    }

    function onFind(btn, e, scene) {
      if (done || btn.classList.contains('found')) return;
      const i = Number(btn.dataset.i);
      const t = targets[i];
      if (!t || t.found) return;
      t.found = true;
      btn.classList.add('found');
      btn.dataset.name = t.p.n;
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
        later(() => {
          ctx.win(round >= ROUNDS - 1 ? '다 찾았어!' : '한 판 성공!');
        }, 420);
        later(() => next(), 1600);
      }
    }

    function onDecoy(node) {
      if (done) return;
      ctx.sfx.tap();
      node.classList.remove('wrong');
      void node.offsetWidth;
      node.classList.add('wrong', 'decoy-hit');
      later(() => node.classList.remove('decoy-hit'), 900);
      const now = Date.now();
      if (now - lastWrong > 1800) {
        lastWrong = now;
        ctx.toast('앗, 이 친구는 숨어 있던 친구가 아니야! 다시 찾아보자 😊', 1600);
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
      if (round >= ROUNDS) { ctx.finish(5); return; }
      pickNewTheme();
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
