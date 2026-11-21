/* ==========================================================
   포켓몬 놀이터 · 앱 (라우팅 · 로비 · 도감 · 게임 실행)
   ========================================================== */
import { GAMES, DEX, byId, artUrl, typeColor, shuffle, pick } from './data.js';
import {
  state, save, saveNow, resetProgress, stickerCount, hasSticker,
  sfx, fx, qs, qsa, el, wait, toast, flashText, praise, gentle,
  openModal, closeModal, awardClear, clearModalHTML, preloadPokemon,
  artTag, installImageFallback, PRAISE, GENTLE, starSVG,
} from './core.js';

import hidden from './games/hidden.js';
import diff from './games/diff.js';
import cover from './games/cover.js';
import memory from './games/memory.js';
import shadow from './games/shadow.js';
import height from './games/height.js';
import puzzle from './games/puzzle.js';
import cry from './games/cry.js';
import count from './games/count.js';
import pattern from './games/pattern.js';

const MODULES = { hidden, diff, cover, memory, shadow, height, puzzle, cry, count, pattern };
const screen = document.getElementById('screen');
const topbarTitle = document.getElementById('topbar-title');
const starCountEl = document.getElementById('star-count');
const starPill = document.getElementById('star-pill');
const soundBtn = document.getElementById('sound-btn');
const soundIcon = document.getElementById('sound-icon');
const homeBtn = document.getElementById('home-btn');

let active = null; // { module, ctx, meta }

/* ---------------- 상단바 ---------------- */
function renderTop() {
  starCountEl.textContent = state.stars;
  soundIcon.textContent = sfx.muted ? '🔇' : '🔊';
  soundBtn.setAttribute('aria-label', sfx.muted ? '소리 켜기' : '소리 끄기');
}
function bumpStars(delta) {
  renderTop();
  starPill.classList.remove('bump');
  void starPill.offsetWidth;
  starPill.classList.add('bump');
}
soundBtn.addEventListener('click', () => {
  sfx.setMuted(!sfx.muted);
  renderTop();
  if (!sfx.muted) { sfx.pop(); toast('소리를 켰어요 🔊', 1200); }
  else toast('조용히 놀아요 🔇', 1200);
});

/* ---------------- 라우팅 ---------------- */
function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}
homeBtn.addEventListener('click', () => go('#/'));
window.addEventListener('hashchange', render);

function teardown() {
  if (active && active.destroy) {
    try { active.destroy(); } catch (e) {}
  }
  active = null;
  sfx.stopCry();
}

function render() {
  teardown();
  const hash = location.hash || '#/';
  document.body.classList.remove('in-game');
  if (hash.startsWith('#/play/')) {
    const id = hash.slice('#/play/'.length);
    const meta = GAMES.find((g) => g.id === id);
    if (!meta) return go('#/');
    renderGame(meta);
  } else if (hash === '#/book') {
    renderBook();
  } else {
    renderLobby();
  }
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

/* ---------------- 로비 ---------------- */
function renderLobby() {
  topbarTitle.textContent = '포켓몬 놀이터';
  const stacks = DEX.filter((p) => hasSticker(p.id)).slice(-3).reverse();
  const stack = (stacks.length ? stacks : [byId(25), byId(133), byId(7)]).map((p) => `<img src="${artUrl(p.id)}" alt="" draggable="false">`).join('');
  const cards = GAMES.map((g) => {
    const plays = state.plays[g.id] || 0;
    const mascot = byId(g.mascot) || DEX[0];
    return `
      <button class="game-card" data-game="${g.id}" style="--card-bg:${g.color}">
        ${plays ? `<span class="gc-badge">${starSVG()} ${plays}회</span>` : ''}
        <img class="gc-art" src="${artUrl(mascot.id)}" alt="" draggable="false">
        <span class="gc-title">${g.emoji} ${g.title}</span>
        <span class="gc-tag">${g.tag}</span>
      </button>`;
  }).join('');

  screen.innerHTML = `
    <div class="lobby enter">
      <section class="hero">
        <span class="hero-spark" style="left:46%;top:12%">✨</span>
        <span class="hero-spark" style="right:6%;bottom:14%;animation-delay:.8s">⭐</span>
        <span class="hero-spark" style="left:4%;bottom:8%;animation-delay:1.4s">✨</span>
        <div class="hero-copy">
          <span class="hero-kicker">🎈 5살 친구들을 위한 놀이터</span>
          <h1>포켓몬 <span class="hl">놀이터</span></h1>
          <p class="hero-sub">귀여운 포켓몬 친구들과 <b>10가지 놀이</b>를 해 봐요.<br>놀이를 마치면 <b>포켓몬 스티커</b>를 선물로 받아요!</p>
          <div class="hero-badges">
            <span class="hero-badge">🔍 숨은그림찾기</span>
            <span class="hero-badge">🧩 퍼즐</span>
            <span class="hero-badge">🎵 울음소리</span>
            <span class="hero-badge">${starSVG()} ${state.stars}개 별</span>
          </div>
        </div>
        <div class="hero-art">
          <img src="${artUrl(25)}" alt="피카츄" draggable="false">
          <img src="${artUrl(133)}" alt="이브이" draggable="false">
          <img src="${artUrl(7)}" alt="꼬부기" draggable="false">
        </div>
      </section>

      <section>
        <div class="section-head">
          <h2 class="section-title"><span class="emoji">🎮</span> 오늘은 뭐 하고 놀까?</h2>
          <span class="section-note">놀이를 고르면 바로 시작해요</span>
        </div>
        <div class="game-grid">${cards}</div>
      </section>

      <button class="sticker-banner" id="go-book">
        <div class="sb-stack">${stack}</div>
        <div class="sb-copy">
          <h3>내 스티커 도감</h3>
          <p>놀이를 마치면 새 친구가 도감에 쏙!</p>
        </div>
        <div class="sb-count">${stickerCount()} / ${DEX.length}</div>
        <span class="sb-arrow" aria-hidden="true">›</span>
      </button>

      <div class="lobby-foot">
        <span>그림·울음소리 · PokéAPI</span>
        <span>틀려도 괜찮아요. 다시 하면 돼요!</span>
        <button class="link" id="lobby-reset">진행 초기화</button>
      </div>
    </div>`;

  qsa('[data-game]', screen).forEach((b) => {
    b.addEventListener('click', () => {
      sfx.ensure(); sfx.tap();
      go('#/play/' + b.dataset.game);
    });
  });
  qs('#go-book').addEventListener('click', () => { sfx.tap(); go('#/book'); });
  qs('#lobby-reset').addEventListener('click', () => askReset(renderLobby));
  renderTop();
}

/* ---------------- 스티커 도감 ---------------- */
function renderBook() {
  topbarTitle.textContent = '내 스티커 도감';
  const total = DEX.length;
  const count = stickerCount();
  const pct = Math.round((count / total) * 100);
  const cells = DEX.map((p, i) => {
    const on = hasSticker(p.id);
    return `
      <button class="sticker ${on ? '' : 'locked'}" data-pid="${p.id}" title="${on ? p.n : '아직 만나지 못한 친구'}">
        <img src="${artUrl(p.id)}" alt="${on ? p.n : '아직 모르는 친구'}" loading="lazy" draggable="false">
        <span>${on ? p.n : '???'}</span>
      </button>`;
  }).join('');

  screen.innerHTML = `
    <div class="enter">
      <div class="book-head">
        <h2>내 스티커 도감</h2>
        <span class="book-count">${count} / ${total}</span>
        <div class="book-progress"><i style="width:${pct}%"></i></div>
      </div>
      <p class="rule-note" style="text-align:left;margin:0 2px 14px">놀이를 마칠 때마다 새로운 포켓몬 친구가 도감에 들어와요. 카드를 눌러 울음소리를 들어 보세요!</p>
      <div class="book-grid">${cells}</div>
      <div class="lobby-foot" style="margin-top:22px">
        <span>${count === total ? '🎉 모든 친구를 만났어요! 정말 대단해요!' : '아직 만나지 못한 친구는 놀이를 하면 만날 수 있어요'}</span>
        <button class="link" id="book-reset">진행 초기화</button>
      </div>
    </div>`;

  qsa('.sticker', screen).forEach((b) => {
    b.addEventListener('click', () => {
      const p = byId(Number(b.dataset.pid));
      if (!p) return;
      if (hasSticker(p.id)) { sfx.cry(p.id); toast(`안녕! 나는 ${p.n}이야`, 1400); }
      else { sfx.tap(); toast('놀이를 마치면 이 친구를 만날 수 있어요 ✨', 1800); }
    });
  });
  qs('#book-reset').addEventListener('click', () => askReset(() => { renderBook(); renderTop(); }));
  renderTop();
}

function askReset(after) {
  const { el: box, close } = openModal(`
    <h2>진행을 처음부터 할까요?</h2>
    <p>모은 별 <b>${state.stars}개</b>와 스티커 <b>${stickerCount()}장</b>이 모두 사라져요.<br>이건 되돌릴 수 없어요.</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-act="cancel">그만두기</button>
      <button class="btn btn-primary" data-act="reset">처음부터 하기</button>
    </div>`, { className: 'reset-modal' });
  box.querySelector('[data-act="cancel"]').addEventListener('click', close);
  box.querySelector('[data-act="reset"]').addEventListener('click', () => {
    resetProgress();
    close();
    toast('도감을 새로 시작했어요 🌱');
    renderTop();
    if (after) after();
  });
}

/* ---------------- 게임 실행 ---------------- */
function makeCtx(meta, body, header) {
  let roundTotal = 3;
  const ctx = {
    root: body,
    meta,
    state, sfx, fx, shuffle,
    art: (p, cls = '', extra = '') => artTag(p, cls, extra),
    artUrl, load: preloadPokemon, wait, el, qs, qsa,
    toast, praise, gentle, typeColor,
    setTip(text, icon = '💡') {
      const t = qs('.hb-txt', header);
      const i = qs('.hb-icon', header);
      if (t) { t.innerHTML = text; }
      if (i) i.textContent = icon;
      header.classList.remove('bump');
      void header.offsetWidth;
      header.classList.add('bump');
    },
    setRound(i, total = roundTotal) {
      roundTotal = total;
      const dots = qs('#round-dots');
      if (dots) {
        dots.innerHTML = Array.from({ length: total }, (_, k) =>
          `<i class="${k < i ? 'done' : k === i ? 'on' : ''}"></i>`).join('');
      }
      const p = qs('#game-progress');
      if (p) p.textContent = `${Math.min(i + 1, total)} / ${total}`;
    },
    win(text = '정답!', cb = null) {
      flashText(text);
      sfx.correct();
      const r = body.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + Math.min(r.height / 2, 300);
      fx.burst(x, y, { n: 22, speed: 7 });
      setTimeout(() => { if (cb) cb(); }, 1050);
    },
    gentle(node = null, msg = null) {
      sfx.wrong();
      if (node) { node.classList.remove('wrong'); void node.offsetWidth; node.classList.add('wrong'); }
      toast(msg || gentle(), 1500);
    },
    finish(stars) { endGame(meta, stars); },
    setStars(n) { /* reserved */ },
  };
  return ctx;
}

function renderGame(meta) {
  const mod = MODULES[meta.id];
  topbarTitle.textContent = meta.title;
  document.body.classList.add('in-game');
  screen.innerHTML = `
    <div class="game enter">
      <div class="game-bar">
        <button class="back-btn" id="g-back" aria-label="놀이터로"><span aria-hidden="true">⬅</span><span class="bt">놀이터</span></button>
        <h2>${meta.emoji} ${meta.title}</h2>
        <div class="round-dots" id="round-dots"></div>
        <div class="game-progress" id="game-progress">1 / 3</div>
        <button class="icon-btn" id="g-how" aria-label="놀이 방법" title="놀이 방법" style="width:44px;height:44px;font-size:19px">❓</button>
      </div>
      <div class="help-bubble" id="help-bubble" style="border-color:${meta.color}">
        <span class="hb-icon" aria-hidden="true">💡</span>
        <span class="hb-txt">${mod.howto || meta.tag}</span>
        <img class="hb-poke" src="${artUrl(meta.mascot)}" alt="" draggable="false">
      </div>
      <div id="game-body"></div>
    </div>`;
  qs('#g-back').addEventListener('click', () => go('#/'));
  const header = qs('#help-bubble');
  const body = qs('#game-body');
  const ctx = makeCtx(meta, body, header);
  qs('#g-how').addEventListener('click', () => showHowTo(meta, mod));
  const res = mod.mount(ctx);
  active = { module: mod, ctx, meta, destroy: res && res.destroy };
  renderTop();
}

function showHowTo(meta, mod) {
  const { el: box, close } = openModal(`
    <h2>${meta.emoji} ${meta.title}</h2>
    <p style="margin-top:6px">${(mod.howto || meta.tag)}</p>
    ${mod.tips ? `<ul style="text-align:left;margin:14px auto 0;max-width:380px;padding-left:20px;line-height:1.7;color:#6b6288;font-size:15px">${mod.tips.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}
    <div class="modal-actions"><button class="btn btn-primary" data-act="ok">알겠어요!</button></div>`);
  box.querySelector('[data-act="ok"]').addEventListener('click', close);
}

function endGame(meta, stars) {
  const got = awardClear(meta.id, stars);
  bumpStars(stars);
  sfx.clear();
  fx.confetti(120);
  if (got.pokemon) setTimeout(() => { sfx.cry(got.pokemon.id); }, 700);
  const extra = got.pokemon ? '' : '모든 친구를 만나서 보너스 별을 받았어요!';
  const { el: box } = openModal(clearModalHTML(got, stars, extra), {
    closeable: false,
    className: 'clear-modal',
    onClose: () => {},
  });
  fx.starRain();
  const card = box.querySelector('.sticker-reveal .card');
  if (card) {
    card.addEventListener('animationend', () => {
      if (got.pokemon) sfx.cry(got.pokemon.id);
    }, { once: true });
  }
  box.querySelector('[data-act="again"]').addEventListener('click', () => {
    closeModal();
    renderGame(meta);
  });
  box.querySelector('[data-act="lobby"]').addEventListener('click', () => {
    closeModal();
    go('#/');
  });
}

/* ---------------- 시작 ---------------- */
installImageFallback();
fx.init(document.getElementById('fx'));
renderTop();
if (!location.hash) location.replace('#/');
render();
document.addEventListener('pointerdown', () => sfx.ensure(), { once: true });
document.addEventListener('keydown', () => sfx.ensure(), { once: true });

/* 전역 참조 (디버그·테스트용) */
window.__poke = { state, sfx, fx, GAMES, DEX };
