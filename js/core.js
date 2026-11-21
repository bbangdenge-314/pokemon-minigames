/* ==========================================================
   포켓몬 놀이터 · 코어 (상태 · 소리 · 이펙트 · 공용 UI)
   ========================================================== */
import { DEX, byId, artUrl, cryUrl, shuffle, pick, typeColor } from './data.js';

/* ---------------- DOM 도우미 ---------------- */
export const qs = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
export function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- 저장소 ---------------- */
const KEY = 'pokemon-playground-v1';
const DEFAULT_STATE = { v: 1, stars: 0, stickers: {}, plays: {}, sound: true };

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const s = JSON.parse(raw);
    return {
      v: 1,
      stars: Number(s.stars) || 0,
      stickers: s.stickers && typeof s.stickers === 'object' ? s.stickers : {},
      plays: s.plays && typeof s.plays === 'object' ? s.plays : {},
      sound: s.sound !== false,
    };
  } catch (e) {
    return { ...DEFAULT_STATE };
  }
}
export const state = loadState();
let saveTimer = null;
export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 저장 공간이 없어도 놀이는 계속 */ }
  }, 60);
}
export function saveNow() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
}
export function resetProgress() {
  state.stars = 0;
  state.stickers = {};
  state.plays = {};
  saveNow();
}
export const stickerCount = () => Object.keys(state.stickers).length;
export const hasSticker = (id) => !!state.stickers[id];

/* ---------------- 그림 ---------------- */
const PLACEHOLDER = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="54" fill="#f3eefc" stroke="#d9cff0" stroke-width="4"/>
    <path d="M60 6a54 54 0 0 1 54 54H6A54 54 0 0 1 60 6z" fill="#ffd0de"/>
    <circle cx="60" cy="60" r="16" fill="#fff" stroke="#c9b9e8" stroke-width="5"/>
    <rect x="6" y="55" width="108" height="10" fill="#c9b9e8"/>
  </svg>`);

export function artTag(p, cls = '', extra = '') {
  return `<img class="${cls}" src="${artUrl(p.id)}" alt="${p.n}" loading="lazy" decoding="async" draggable="false" ${extra}>`;
}
export function crySrc(id) { return `media/cries/${id}.mp3`; }

const preloaded = new Map();
export function preloadPokemon(list) {
  const imgs = (list || []).map((p) => {
    const url = artUrl(p.id);
    if (preloaded.has(url)) return preloaded.get(url);
    const img = new Image();
    img.decoding = 'async';
    const pr = new Promise((res) => {
      img.onload = () => res(true);
      img.onerror = () => res(false);
      setTimeout(() => res(false), 4000);
    });
    img.src = url;
    preloaded.set(url, pr);
    return pr;
  });
  return Promise.race([Promise.all(imgs), wait(2500)]);
}

/* 이미지가 깨져도 놀이가 멈추지 않도록 대체 그림 */
export function installImageFallback() {
  document.addEventListener('error', (e) => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.fallback) {
      t.dataset.fallback = '1';
      t.src = PLACEHOLDER;
      t.classList.add('img-fallback');
    }
  }, true);
}

/* ---------------- 소리 ---------------- */
class Sfx {
  constructor() {
    this.ac = null;
    this.master = null;
    this.muted = !state.sound;
    this.cryAudio = null;
    this.cryId = null;
    this.cryFail = new Set();
  }
  ensure() {
    try {
      if (!this.ac) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this.ac = new AC();
        this.master = this.ac.createGain();
        this.master.gain.value = 0.85;
        this.master.connect(this.ac.destination);
      }
      if (this.ac.state === 'suspended') this.ac.resume().catch(() => {});
      return this.ac;
    } catch (e) { return null; }
  }
  setMuted(m) {
    this.muted = m;
    state.sound = !m;
    save();
    if (m && this.cryAudio) { try { this.cryAudio.pause(); } catch (e) {} }
  }
  tone(freq, when = 0, dur = 0.18, type = 'sine', gain = 0.16) {
    if (this.muted) return;
    const ac = this.ensure();
    if (!ac) return;
    try {
      const t = ac.currentTime + when;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + dur + 0.03);
    } catch (e) {}
  }
  noise(dur = 0.18, gain = 0.12, when = 0, freq = 1800) {
    if (this.muted) return;
    const ac = this.ensure();
    if (!ac) return;
    try {
      const t = ac.currentTime + when;
      const len = Math.max(1, Math.floor(ac.sampleRate * dur));
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = ac.createBufferSource(); src.buffer = buf;
      const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.9;
      const g = ac.createGain(); g.gain.value = gain;
      src.connect(bp); bp.connect(g); g.connect(this.master);
      src.start(t); src.stop(t + dur);
    } catch (e) {}
  }
  tap() { this.tone(720, 0, 0.07, 'triangle', 0.07); }
  pop() { this.tone(880, 0, 0.09, 'sine', 0.1); this.tone(1320, 0.05, 0.1, 'sine', 0.06); }
  correct() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => this.tone(f, i * 0.085, 0.26, 'triangle', 0.15));
    this.tone(1567.98, 0.36, 0.34, 'sine', 0.09);
    this.noise(0.35, 0.05, 0.34, 3200);
  }
  wrong() {
    this.tone(392, 0, 0.16, 'sine', 0.1);
    this.tone(311, 0.14, 0.24, 'sine', 0.09);
  }
  clear() {
    const seq = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5];
    seq.forEach((f, i) => this.tone(f, i * 0.12, 0.3, 'triangle', 0.16));
    this.tone(523.25, 0.85, 0.7, 'sine', 0.1);
    this.tone(659.25, 0.85, 0.7, 'sine', 0.08);
    this.tone(1046.5, 0.85, 0.8, 'sine', 0.09);
    this.applause(0.62);
  }
  applause(when = 0.15) {
    for (let i = 0; i < 16; i++) {
      const t = when + i * 0.045 + Math.random() * 0.03;
      this.noise(0.09 + Math.random() * 0.05, 0.035 + Math.random() * 0.03, t, 1400 + Math.random() * 2200);
    }
  }
  star(i = 0) { this.tone(1046.5 * Math.pow(1.12, i), i * 0.1, 0.25, 'sine', 0.12); }
  chirp() {
    if (this.muted) return;
    this.tone(900, 0, 0.09, 'square', 0.05);
    this.tone(1300, 0.09, 0.12, 'square', 0.05);
  }
  cry(id) {
    if (this.muted || !id) return;
    try {
      if (!this.cryAudio) {
        this.cryAudio = new Audio();
        this.cryAudio.preload = 'auto';
        this.cryAudio.volume = 0.6;
      }
      const a = this.cryAudio;
      const wantRemote = this.cryFail.has(id);
      const src = wantRemote ? cryUrl(id) : crySrc(id);
      if (this.cryId !== id || a.src.indexOf(String(id)) === -1) {
        a.src = src;
        this.cryId = id;
      }
      a.currentTime = 0;
      const pr = a.play();
      if (pr && pr.catch) pr.catch(() => {
        if (!wantRemote) { this.cryFail.add(id); try { a.src = cryUrl(id); a.play().catch(() => this.chirp()); } catch (e) { this.chirp(); } }
        else this.chirp();
      });
    } catch (e) { this.chirp(); }
  }
  stopCry() { if (this.cryAudio) { try { this.cryAudio.pause(); } catch (e) {} } }
}
export const sfx = new Sfx();

/* ---------------- 이펙트 (별가루 · 색종이) ---------------- */
export const fx = {
  canvas: null, c: null, dpr: 1, parts: [], raf: 0, last: 0,
  init(canvas) {
    this.canvas = canvas;
    this.c = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.parts.length = 0; });
  },
  resize() {
    if (!this.canvas) return;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.floor(innerWidth * this.dpr);
    this.canvas.height = Math.floor(innerHeight * this.dpr);
  },
  spawn(p) {
    if (this.parts.length > 420) this.parts.splice(0, 80);
    this.parts.push(p);
    if (!this.raf) { this.last = performance.now(); this.raf = requestAnimationFrame(this.tick); }
  },
  add(x, y, opt = {}) {
    const {
      n = 14, colors = ['#ffd166', '#ff8fb1', '#8fe0bd', '#b9a4ff', '#7ec8f2'], speed = 5,
      gravity = 0.16, size = 8, shape = 'star', life = 900,
    } = opt;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = speed * (0.35 + Math.random() * 0.9);
      this.spawn({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - speed * 0.35,
        g: gravity, life: life * (0.7 + Math.random() * 0.6), age: 0,
        size: size * (0.55 + Math.random() * 0.9), color: colors[(Math.random() * colors.length) | 0],
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, shape,
      });
    }
  },
  burst(x, y, opt = {}) { this.add(x, y, { n: 18, speed: 6, shape: 'star', ...opt }); },
  confetti(n = 90) {
    const colors = ['#ffd166', '#ff8fb1', '#8fe0bd', '#b9a4ff', '#7ec8f2', '#ffa987', '#fff'];
    for (let i = 0; i < n; i++) {
      this.spawn({
        x: Math.random() * innerWidth, y: -30 - Math.random() * innerHeight * 0.3,
        vx: (Math.random() - 0.5) * 2.4, vy: 2 + Math.random() * 3.4, g: 0.028,
        life: 3600 + Math.random() * 2000, age: 0,
        size: 6 + Math.random() * 9, color: colors[(Math.random() * colors.length) | 0],
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.24,
        shape: Math.random() < 0.45 ? 'star' : 'rect',
      });
    }
  },
  starRain() {
    for (let i = 0; i < 40; i++) {
      this.spawn({
        x: Math.random() * innerWidth, y: -20, vx: (Math.random() - 0.5) * 1.6, vy: 2.2 + Math.random() * 3,
        g: 0.01, life: 2600 + Math.random() * 1600, age: 0, size: 8 + Math.random() * 10,
        color: ['#ffd166', '#fff2a8', '#ffb3cd'][(Math.random() * 3) | 0], rot: 0, vr: (Math.random() - .5) * .2, shape: 'star',
      });
    }
  },
  starPath(c, x, y, r, rot) {
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? r * 0.46 : r;
      const a = rot - Math.PI / 2 + (i * Math.PI) / 5;
      const px = x + Math.cos(a) * rr;
      const py = y + Math.sin(a) * rr;
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.closePath();
  },
  tick: (now) => {
    const f = fx;
    const dt = Math.min(48, now - f.last); f.last = now;
    const c = f.c;
    c.setTransform(f.dpr, 0, 0, f.dpr, 0, 0);
    c.clearRect(0, 0, innerWidth, innerHeight);
    const k = dt / 16.67;
    for (let i = f.parts.length - 1; i >= 0; i--) {
      const p = f.parts[i];
      p.age += dt;
      if (p.age > p.life) { f.parts.splice(i, 1); continue; }
      p.vy += p.g * k; p.x += p.vx * k; p.y += p.vy * k; p.rot += p.vr * k;
      const t = 1 - p.age / p.life;
      c.globalAlpha = Math.min(1, t * 2.2);
      c.fillStyle = p.color;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      if (p.shape === 'star') { f.starPath(c, 0, 0, p.size, 0); c.fill(); }
      else if (p.shape === 'circle') { c.beginPath(); c.arc(0, 0, p.size * 0.6, 0, 7); c.fill(); }
      else { c.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.62); }
      c.restore();
    }
    c.globalAlpha = 1;
    if (f.parts.length) f.raf = requestAnimationFrame(f.tick);
    else { f.raf = 0; c.clearRect(0, 0, innerWidth, innerHeight); }
  },
};

/* ---------------- 토스트 / 플래시 ---------------- */
const toastLayer = () => document.getElementById('toast-layer');
export function toast(msg, ms = 1900) {
  const layer = toastLayer();
  if (!layer) return;
  const n = el('div', 'toast', msg);
  layer.appendChild(n);
  while (layer.children.length > 2) layer.removeChild(layer.firstElementChild);
  setTimeout(() => {
    n.classList.add('out');
    setTimeout(() => n.remove(), 320);
  }, ms);
}
export function flashText(text, kind = '') {
  const n = el('div', 'round-flash ' + kind, text);
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 950);
}
export const PRAISE = ['정말 잘했어! 👏', '우와, 최고야!', '딱 맞았어!', '똑똑하구나! ✨', '완벽해! 🌟', '멋지다! 👍', '찾았다! 🎉'];
export const GENTLE = ['괜찮아, 다시 해볼까?', '조금만 더! 한 번 더 찾아보자', '거의 다 왔어! 다시 해보자', '음~ 다시 한번 해볼까?', '천천히, 같이 찾아보자!'];
export const praise = () => pick(PRAISE);
export const gentle = () => pick(GENTLE);

/* ---------------- 모달 ---------------- */
let modalEsc = null;
export function openModal(html, opt = {}) {
  const layer = document.getElementById('modal-layer');
  if (!layer) return { close() {} };
  const { closeable = true, className = '', onClose = null } = opt;
  layer.classList.add('active');
  layer.innerHTML = `<div class="modal-backdrop"></div><div class="modal ${className}" role="dialog" aria-modal="true">${html}</div>`;
  const box = layer.querySelector('.modal');
  const close = () => {
    layer.classList.remove('active');
    layer.innerHTML = '';
    document.removeEventListener('keydown', onKey);
    modalEsc = null;
    if (onClose) onClose();
  };
  const onKey = (e) => { if (e.key === 'Escape' && closeable) close(); };
  modalEsc = close;
  document.addEventListener('keydown', onKey);
  if (closeable) {
    const bd = layer.querySelector('.modal-backdrop');
    bd.addEventListener('click', close);
  }
  return { close, el: box, layer };
}
export function closeModal() { if (modalEsc) modalEsc(); }
export function isModalOpen() { return !!(modalEsc); }

/* ---------------- 별 아이콘 (이모지 대신 또렷한 SVG) ---------------- */
export const STAR_PATH = 'M12 2.4l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.47 6.1 20.57l1.13-6.57L2.45 9.34l6.6-.96z';
export const starSVG = (cls = '') => `<svg class="ic-star ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${STAR_PATH}"/></svg>`;

/* ---------------- 보상 ---------------- */
export function awardClear(gameId, stars) {
  const owned = new Set(Object.keys(state.stickers).map(Number));
  const pool = DEX.filter((p) => !owned.has(p.id));
  let got = null;
  let bonus = 0;
  if (pool.length) {
    got = pick(pool);
    state.stickers[got.id] = Date.now();
  } else {
    bonus = 3;
  }
  state.stars += stars + bonus;
  state.plays[gameId] = (state.plays[gameId] || 0) + 1;
  saveNow();
  return { pokemon: got, bonus, firstPlay: state.plays[gameId] === 1 };
}

export function clearModalHTML(sticker, stars, extra = '') {
  const st = sticker.pokemon;
  const starHTML = Array.from({ length: 5 }, (_, i) =>
    `<span class="st ${i < stars ? 'on' : ''}" style="animation-delay:${0.14 * i + 0.3}s">${starSVG()}</span>`).join('');
  const chips = st ? st.t.map((t) => `<span class="type-chip" style="background:${typeColor(t)}">${t}</span>`).join('') : '';
  return `
    <h2 class="clear-confetti-title">참 잘했어요!</h2>
    <p class="clear-sub">${extra || '놀이를 멋지게 마쳤어요'}</p>
    ${st ? `
    <div class="sticker-reveal">
      <div class="halo"></div>
      <div class="card">
        <span class="new-tag">새 친구를 만났어요!</span>
        <img src="${artUrl(st.id)}" alt="${st.n}" draggable="false">
      </div>
      <div class="reveal-name">${st.n}</div>
      <div class="type-chips">${chips}</div>
    </div>` : `
    <div class="sticker-reveal"><div class="halo"></div>
      <div class="card" style="display:grid;place-items:center;aspect-ratio:1;font-size:64px">🏆</div>
    </div>
    <div class="reveal-name">도감을 다 모았어요!</div>`}
    <div class="star-row">${starHTML}</div>
    <div class="modal-actions">
      <button class="btn btn-mint" data-act="again">한 번 더 🎮</button>
      <button class="btn btn-primary" data-act="lobby">놀이터로 🏠</button>
    </div>`;
}
