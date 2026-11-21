/* ==========================================================
   2. 틀린그림찾기 — 두 장면에서 다른 곳 찾기
   ========================================================== */
import { byId, DEX, pick, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';
import { decor } from './scene.js';

const ART = (p) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;

const ROUNDS = [
  { keys: ['main', 'cloud', 'flower'] },
  { keys: ['main', 'cloud', 'flower', 'butterfly'] },
  { keys: ['main', 'cloud', 'flower', 'butterfly', 'sun'] },
];

/* 차이 지점 (장면 기준 %) */
const HOT = {
  main: { x: 54, y: 66, w: 32, h: 36, label: '가운데 포켓몬' },
  cloud: { x: 55, y: 14, w: 26, h: 16, label: '구름' },
  flower: { x: 27, y: 86, w: 18, h: 16, label: '꽃' },
  butterfly: { x: 71, y: 33, w: 16, h: 16, label: '나비' },
  sun: { x: 84, y: 12, w: 18, h: 18, label: '해' },
};

function cloudHTML(x, y, w, h) { return decor({ type: 'cloud', x, y, w, h }); }

function apple(x, y, w) {
  return `<span class="deco" style="left:${x}%;top:${y}%;width:${w}%;height:${w}%;opacity:1">
    <svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="34" fill="#ff6f7f"/><circle cx="40" cy="46" r="10" fill="#fff" opacity=".45"/><path d="M50 22 Q54 8 66 8 Q58 18 56 24 Z" fill="#5eb06a"/><rect x="47" y="16" width="5" height="14" rx="2" fill="#8a5a3b"/></svg></span>`;
}

function smallFlower(x, y, color, w = 9) {
  return `<span class="deco" style="left:${x}%;top:${y}%;width:${w}%;height:${(w * 1.5).toFixed(1)}%">
    <svg viewBox="0 0 100 150"><path d="M50 148 L50 70" stroke="#63b96f" stroke-width="8" stroke-linecap="round"/>
    <circle cx="50" cy="48" r="14" fill="#ffd166"/><circle cx="50" cy="22" r="16" fill="${color}"/>
    <circle cx="76" cy="40" r="16" fill="${color}"/><circle cx="68" cy="66" r="16" fill="${color}"/>
    <circle cx="32" cy="66" r="16" fill="${color}"/><circle cx="24" cy="40" r="16" fill="${color}"/></svg></span>`;
}

/* 한쪽 그림 만들기 */
function paneHTML(side, keys, pack) {
  const diff = (k) => keys.includes(k);
  const main = side === 'a' ? pack.mainA : pack.mainB;
  const cloudGone = diff('cloud') && side === 'b';
  const bflyGone = diff('butterfly') && side === 'b';
  const flowerColor = diff('flower') && side === 'b' ? '#b9a4ff' : '#ff9db4';
  const sunChange = diff('sun') && side === 'b';

  return `
    <div class="diff-scene">
      <div class="sun-deco${sunChange ? ' orange' : ''}"></div>
      <span class="diff-hill h1"></span><span class="diff-hill h2"></span>
      ${decor({ type: 'cloud', x: 4, y: 6, w: 28, h: 15 })}
      ${cloudGone ? '' : cloudHTML(48, 10, 24, 13)}
      ${decor({ type: 'cloud', x: 80, y: 24, w: 16, h: 9, o: .8 })}
      ${decor({ type: 'tree', x: 0, y: 24, w: 22, h: 54 })}
      ${decor({ type: 'bush', x: 78, y: 66, w: 22, h: 20 })}
      ${decor({ type: 'pond', x: 58, y: 84, w: 20, h: 11, o: .9 })}
      ${decor({ type: 'log', x: 34, y: 84, w: 14, h: 8 })}
      ${decor({ type: 'fence', x: 88, y: 58, w: 13, h: 24, o: .95 })}
      ${smallFlower(8, 82, '#ffd166')}
      ${smallFlower(20, 86, flowerColor)}
      ${smallFlower(36, 84, '#fff0a0')}
      ${smallFlower(66, 86, '#ff9db4')}
      ${smallFlower(82, 84, '#c9b6ff')}
      <span class="diff-poke small" style="left:28%;top:70%;width:14%">
        <img src="${ART(pack.small)}" alt="" draggable="false">
      </span>
      <span class="diff-poke main" style="left:54%;top:66%;width:25%">
        <img src="${ART(main)}" alt="${main.n}" draggable="false">
      </span>
      ${bflyGone ? '' : `<span class="diff-bfly" style="left:71%;top:33%;width:8%">
        <svg viewBox="0 0 100 100"><path d="M50 50 Q18 8 8 34 Q2 60 46 58 Z" fill="#ffb3cd"/>
        <path d="M50 50 Q82 8 92 34 Q98 60 54 58 Z" fill="#ffc9dc"/>
        <path d="M50 54 Q24 76 18 66 Q14 54 46 52 Z" fill="#ffd6e6"/>
        <path d="M50 54 Q76 76 82 66 Q86 54 54 52 Z" fill="#ffe3ee"/>
        <ellipse cx="50" cy="52" rx="4" ry="16" fill="#8a6fae"/></svg></span>`}
      ${keys.map((k) => {
        const h = HOT[k];
        return `<button class="diff-hot" data-k="${k}" aria-label="${h.label}에서 다른 곳 찾기"
          style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%"></button>`;
      }).join('')}
    </div>`;
}

export default {
  id: 'diff',
  howto: '두 그림을 잘 보세요. 서로 다른 곳을 찾아 콕 누르면 돼요. 다른 곳은 3~5곳이에요!',
  tips: [
    '가운데 포켓몬부터 천천히 비교해 보세요.',
    '구름·꽃·나비도 달라질 수 있어요.',
    '찾은 곳에는 빨간 동그라미가 생겨요.',
  ],
  mount(ctx) {
    let round = 0;
    let found = new Set();
    let done = false;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      const cfg = ROUNDS[round];
      const keys = cfg.keys;
      const mains = pickMany(DEX.filter((p) => p.h >= 0.6 && p.h <= 1.8), 2);
      const pack = { mainA: mains[0], mainB: mains[1], small: pick(DEX.filter((p) => p.h <= 0.8)) };
      found = new Set();
      done = false;
      ctx.setRound(round, ROUNDS.length);
      ctx.setTip(`두 그림에서 <b>다른 곳 ${keys.length}군데</b>를 찾아보세요!`, '🧐');

      body.innerHTML = `
        <div class="stage diff-stage">
          <div class="diff-board" id="board">
            <div class="diff-pane" data-side="a"><span class="pane-tag">그림 1</span>${paneHTML('a', keys, pack)}</div>
            <div class="diff-pane" data-side="b"><span class="pane-tag">그림 2</span>${paneHTML('b', keys, pack)}</div>
          </div>
          <div class="diff-foot">
            <span class="diff-score">찾은 곳 <b id="d-score">0</b> / ${keys.length}</span>
            <div class="diff-pips" id="d-pips">${keys.map(() => '<i></i>').join('')}</div>
            <button class="btn btn-sm btn-sun" id="d-hint">💡 힌트</button>
          </div>
        </div>`;

      const board = qs('#board', body);
      board.addEventListener('click', (e) => {
        const hot = e.target.closest('.diff-hot');
        if (hot) { onFind(hot.dataset.k); return; }
        ctx.sfx.tap();
        if (Date.now() - lastWrong > 2200) { lastWrong = Date.now(); ctx.toast('조금만 더 자세히 살펴볼까?', 1400); }
      });
      qs('#d-hint', body).addEventListener('click', hint);
      ctx.load([pack.mainA, pack.mainB, pack.small]);
    }

    let lastWrong = 0;

    function onFind(k) {
      if (done || found.has(k)) return;
      found.add(k);
      ctx.sfx.pop();
      ctx.sfx.correct();
      const hotspots = qsa(`.diff-hot[data-k="${k}"]`, body);
      hotspots.forEach((h) => {
        h.classList.add('found');
        const r = h.getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 12, speed: 4.5 });
      });
      const score = qs('#d-score', body);
      if (score) score.textContent = String(found.size);
      const pips = qsa('#d-pips i', body);
      if (pips[found.size - 1]) pips[found.size - 1].classList.add('on');
      if (found.size === ROUNDS[round].keys.length) {
        done = true;
        const isLast = round >= ROUNDS.length - 1;
        later(() => ctx.win(isLast ? '모두 찾았어!' : '정답!'), 260);
        later(() => {
          round++;
          if (round >= ROUNDS.length) ctx.finish(5);
          else render();
        }, 1900);
      } else {
        ctx.toast(`찾았다! ${found.size}곳째 🎉`, 1000);
      }
    }

    function hint() {
      const left = ROUNDS[round].keys.filter((k) => !found.has(k));
      if (!left.length) return;
      const k = left[0];
      const h = qs(`.diff-hot[data-k="${k}"]`, body);
      if (h) {
        h.classList.add('hint');
        ctx.sfx.pop();
        setTimeout(() => h.classList.remove('hint'), 2400);
      }
    }

    render();
    return { destroy() { timers.forEach((t) => clearTimeout(t)); } };
  },
};
