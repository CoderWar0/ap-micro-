// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let mcqState = {}; // id → { answered, correct }
let currentFilter = 'all';
let currentOrder = [...allMCQ];

/*
function getScore() {
  let correct = 0, wrong = 0;
  Object.values(mcqState).forEach(s => {
    if (s.answered) { if (s.correct) correct++; else wrong++; }
  });
  return { correct, wrong, total: correct + wrong };
}


function updateScoreBar() {
  const {correct, wrong, total} = getScore();
  document.getElementById('score-correct').textContent = correct;
  document.getElementById('score-wrong').textContent = wrong;
  const pct = total > 0 ? Math.round(correct/total*100) : '—';
  document.getElementById('score-pct').textContent = total > 0 ? pct + '%' : '—';
  const prog = total / allMCQ.length * 100;
  document.getElementById('prog-fill').style.width = prog + '%';
  document.getElementById('prog-label').textContent = total + ' of ' + allMCQ.length + ' answered';
}
*/

// ══════════════════════════════════════════
//  RENDER MCQ
// ══════════════════════════════════════════
function renderMCQ() {
  const container = document.getElementById('mcq-container');
  let filtered = currentFilter === 'all' ? currentOrder : currentOrder.filter(q => q.unit === currentFilter);
  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = '<p style="color:#888;padding:1rem">No questions match this filter.</p>';
    return;
  }
  filtered.forEach((q, idx) => {
    const state = mcqState[q.id] || {};
    const answered = state.answered;
    const card = document.createElement('div');
    card.className = 'mcq-card';
    card.id = 'card-' + q.id;

    const letters = ['A','B','C','D'];
    const choicesHTML = q.choices.map((c, i) => {
      let cls = 'choice-btn';
      if (answered) {
        if (i === q.correct) cls += ' reveal-correct';
        if (i === state.chosen && i !== q.correct) cls += ' wrong';
        if (i === state.chosen && i === q.correct) cls = 'choice-btn correct';
      }
      return `<li><button class="${cls}" onclick="answerMCQ(${q.id}, ${i})" ${answered ? 'disabled' : ''}>
        <span class="choice-letter">${letters[i]}</span>
        <span>${c}</span>
      </button></li>`;
    }).join('');

    card.innerHTML = `
      <div class="q-meta">
        <span class="q-num">#${idx+1}</span>
        <span class="unit-badge ${UNIT_COLORS[q.unit]}">Unit ${q.unit}: ${UNIT_NAMES[q.unit]}</span>
        <span class="diff-badge diff-${q.diff}">${q.diff}</span>
      </div>
      <p class="q-text">${q.q}</p>
      <ul class="choices">${choicesHTML}</ul>
      <div class="explanation ${answered ? 'show' : ''}" id="exp-${q.id}">
        <strong>Explanation:</strong> ${q.explain}
      </div>`;
    container.appendChild(card);
  });
  // updateScoreBar();
}

function answerMCQ(id, chosen) {
  const q = allMCQ.find(x => x.id === id);
  if (!q || (mcqState[id] && mcqState[id].answered)) return;
  const correct = chosen === q.correct;
  mcqState[id] = { answered: true, correct, chosen };
  renderMCQ();
  showToast(correct ? '✅ Correct!' : '❌ Incorrect — see explanation below');
}

function filterMCQ(unit, btn) {
  currentFilter = unit;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMCQ();
}

function shuffleMCQ() {
  currentOrder = [...allMCQ].sort(() => Math.random() - 0.5);
  renderMCQ();
  showToast('🔀 Questions shuffled!');
}

function resetMCQ() {
  mcqState = {};
  currentOrder = [...allMCQ];
  renderMCQ();
  showToast('↺ Progress reset');
}

// ══════════════════════════════════════════
//  RENDER FRQ
// ══════════════════════════════════════════
function renderFRQ() {
  const container = document.getElementById('frq-container');
  frqData.forEach((frq, fi) => {
    const partsHTML = frq.parts.map((p, pi) => `
      <div class="frq-part">
        <p>${p.text}</p>
        <span class="frq-pts">${p.pts} point${p.pts>1?'s':''}</span>
        <br><br>
        <textarea class="answer-area" placeholder="Write your response here…" rows="4"></textarea>
      </div>`).join('');

    const rubricHTML = frq.rubric.points.map(pt => `<li>${pt}</li>`).join('');

    const card = document.createElement('div');
    card.className = 'frq-card';
    card.innerHTML = `
      <div class="frq-header">
        <div>
          <h3>${frq.title}</h3>
          <div style="font-size:0.78rem;color:rgba(255,255,255,0.65);margin-top:0.2rem">
            <span class="unit-badge ${UNIT_COLORS[frq.unit]}" style="margin-right:0.5rem">Unit ${frq.unit}</span>
            Total: ${frq.pts} points
          </div>
        </div>
        <span class="frq-type">${frq.type}</span>
      </div>
      <div class="frq-body">
        <div class="frq-scenario">${frq.scenario}</div>
        <div class="frq-parts">${partsHTML}</div>
        <button class="rubric-toggle" onclick="toggleRubric(this, ${fi})">📋 Show Scoring Rubric</button>
        <div class="rubric-box" id="rubric-${fi}">
          <h4>${frq.rubric.title}</h4>
          <ul>${rubricHTML}</ul>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function toggleRubric(btn, idx) {
  const box = document.getElementById('rubric-'+idx);
  const showing = box.classList.toggle('show');
  btn.textContent = showing ? '🙈 Hide Rubric' : '📋 Show Scoring Rubric';
}

// ══════════════════════════════════════════
//  RENDER GUIDE
// ══════════════════════════════════════════
function renderGuide() {
  const grid = document.getElementById('guide-grid');
  guideData.forEach(d => {
    const card = document.createElement('div');
    card.className = 'unit-card';
    const conceptsHTML = d.concepts.map(c => `<li>${c}</li>`).join('');
    card.innerHTML = `
      <div class="unit-card-header">
        <div class="unit-icon" style="background:var(--blue-light)">${UNIT_ICONS[d.unit]}</div>
        <div>
          <h3>Unit ${d.unit}: ${UNIT_NAMES[d.unit]}</h3>
          <div class="weight">Exam weight: ${UNIT_WEIGHTS[d.unit]}</div>
        </div>
      </div>
      <ul class="key-concepts">${conceptsHTML}</ul>`;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════
//  RENDER FORMULAS
// ══════════════════════════════════════════
function renderFormulas() {
  const grid = document.getElementById('formula-grid');
  formulas.forEach(f => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.innerHTML = `
      <div class="fname">${f.name}</div>
      <code class="fexpr">${f.expr}</code>
      <div class="fdesc">${f.desc}</div>`;
    grid.appendChild(card);
  });
}

function renderGraphs() {
  const grid = document.getElementById('graph-grid');
  if (!grid) return;
  graphData.forEach(g => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.innerHTML = `
      <div class="fname">${g.title}</div>
      <div class="fdesc">${g.desc}</div>`;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════
function showTab(tab) {
  tab = tab.toLowerCase();
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('panel-'+tab);
  if (panel) panel.classList.add('active');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const navBtns = document.querySelectorAll('.nav-links button');
  const tabMap = { mcq:0, frq:1, guide:2, formulas:3, graphs:4 };
  const i = tabMap[tab];
  if (tabBtns[i]) tabBtns[i].classList.add('active');
  if (navBtns[i]) navBtns[i].classList.add('active');
}

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
renderMCQ();
renderFRQ();
renderGuide();
renderFormulas();
renderGraphs();