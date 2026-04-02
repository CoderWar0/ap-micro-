// Import Firebase tools directly from Google's servers
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKCpnm_zV14DXqYI_58NR7h86atoab9DA",
  authDomain: "micro-practice-hub.firebaseapp.com",
  projectId: "micro-practice-hub",
  storageBucket: "micro-practice-hub.firebasestorage.app",
  messagingSenderId: "1093867234657",
  appId: "1:1093867234657:web:9c48993e50a633dd775120",
  measurementId: "G-H3EKV8S1CM"
};

// Initialize Firebase and the Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let currentStudent = null;
let completedUnits = []; // Array to track which units are in the database
let mcqState = {}; // id → { selected: index }
let currentFilter = 1; // Default starting unit
let currentOrder = [...allMCQ];

// ══════════════════════════════════════════
//  LOGIN & FETCH HISTORY
// ══════════════════════════════════════════
window.attemptLogin = async function() {
  const studentId = document.getElementById('student-id-input').value;
  const errorText = document.getElementById('login-error');
  
  if (!studentId) return;

  try {
    const studentRef = doc(db, "Students", studentId);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      currentStudent = { id: studentId, name: studentSnap.data().name };

      // 1. Ask Firebase which units this student has already submitted
      completedUnits = [];
      const q = query(collection(db, "Results"), where("studentId", "==", studentId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        completedUnits.push(doc.data().unitTested); // e.g., 1, 2, 3
      });

      // 2. Hide login screen, show the app
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('main-app').style.display = 'block';
      
      // 3. Lock the tabs they already finished
      applyUnitLocks(); 
      showToast(`Welcome, ${currentStudent.name}!`);

    } else {
      errorText.style.display = 'block';
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    alert("Error connecting to database. Please check your internet connection.");
  }
};

// ══════════════════════════════════════════
//  UNIT LOCKING LOGIC (With Release Dates)
// ══════════════════════════════════════════
const UNIT_RELEASE_DATES = {
  1: new Date('2024-01-01T00:00:00'), // Past date = unlocked immediately
  2: new Date('2024-01-01T00:00:00'), // Past date = unlocked immediately
  3: new Date('2026-04-02T08:00:00'), // Unlocks March 1, 2026 at 8:00 AM
  4: new Date('2026-04-15T08:00:00'), 
  5: new Date('2026-04-20T08:00:00'),
  6: new Date('2026-04-25T08:00:00'),
  'all': new Date('2026-05-01T08:00:00') 
};

function applyUnitLocks() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeTabLocked = false;
  const now = new Date();

  filterBtns.forEach(btn => {
    let unitVal = null;
    let originalText = btn.textContent.replace('✓ ', '').replace('🔒 ', ''); 
    
    if (originalText.includes('Unit 1')) unitVal = 1;
    else if (originalText.includes('Unit 2')) unitVal = 2;
    else if (originalText.includes('Unit 3')) unitVal = 3;
    else if (originalText.includes('Unit 4')) unitVal = 4;
    else if (originalText.includes('Unit 5')) unitVal = 5;
    else if (originalText.includes('Unit 6')) unitVal = 6;
    else if (originalText.includes('All')) unitVal = 'all';

    const isCompleted = unitVal !== null && completedUnits.includes(unitVal);
    const releaseDate = UNIT_RELEASE_DATES[unitVal];
    const isLockedByDate = releaseDate && (now < releaseDate);

    if (isCompleted || isLockedByDate) {
      btn.disabled = true;
      btn.style.opacity = '0.4';
      btn.style.cursor = 'not-allowed';
      
      if (isCompleted) {
        btn.style.textDecoration = 'line-through';
        btn.textContent = '✓ ' + originalText;
        btn.title = "Exam Completed";
      } else if (isLockedByDate) {
        btn.textContent = '🔒 ' + originalText;
        const dateString = releaseDate.toLocaleDateString([], {month: 'short', day: 'numeric'});
        btn.title = `Unlocks on ${dateString}`; 
      }
      
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeTabLocked = true;
      }
    } else {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.style.textDecoration = 'none';
      btn.textContent = originalText;
      btn.title = "";
    }
  });

  if (activeTabLocked || !document.querySelector('.filter-btn.active')) {
    const firstAvail = Array.from(filterBtns).find(b => !b.disabled);
    if (firstAvail) {
      firstAvail.click(); 
    } else {
      const anyLeftToTake = Array.from(filterBtns).some(b => b.textContent.includes('🔒'));
      
      if (anyLeftToTake) {
        document.getElementById('mcq-container').innerHTML = '<h3 style="text-align:center; padding: 3rem; color: #888;">⏳ Next exam unit is not available yet! Check back soon.</h3>';
      } else {
        document.getElementById('mcq-container').innerHTML = '<h3 style="text-align:center; padding: 3rem; color: var(--green);">🎉 Congratulations! You have completed all AP Micro Exam Units.</h3>';
      }
      
      document.getElementById('submit-btn').style.display = 'none';
      document.querySelector('.controls-bar').style.display = 'none';
    }
  }
}

// ══════════════════════════════════════════
//  SUBMIT EXAM & GRADE
// ══════════════════════════════════════════
window.finishAndSubmitExam = async function(event) {
  if (!currentStudent) return alert("You must be logged in to submit a score!");
  
  if (completedUnits.includes(currentFilter)) {
    return alert("You have already submitted this exam.");
  }

  let answeredCount = 0;
  let correctCount = 0;
  
  Object.keys(mcqState).forEach(id => {
    const q = allMCQ.find(x => x.id == id);
    const state = mcqState[id];
    if (q && state.selected !== undefined && (q.unit === currentFilter || currentFilter === 'all')) {
      answeredCount++;
      if (state.selected === q.correct) correctCount++;
    }
  });

  if (answeredCount === 0) return alert("You haven't answered any questions yet!");

  const scorePercentage = Math.round((correctCount / answeredCount) * 100);

  try {
    const btn = event.target;
    btn.textContent = "⏳ Submitting...";
    btn.disabled = true;

    await addDoc(collection(db, "Results"), {
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      unitTested: currentFilter,
      score: scorePercentage,
      questionsAnswered: answeredCount,
      timestamp: new Date().toISOString()
    });

    showToast('✅ Score submitted successfully!');
    
    completedUnits.push(currentFilter);
    
    btn.textContent = "✅ Submit Exam Score";
    btn.disabled = false;

    mcqState = {}; 

    applyUnitLocks(); 
    window.scrollTo({top: 0, behavior: 'smooth'});

  } catch (error) {
    console.error("Error saving score: ", error);
    alert("There was an error saving your score. Please try again.");
    event.target.textContent = "✅ Submit Exam Score";
    event.target.disabled = false;
  }
};

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
    const card = document.createElement('div');
    card.className = 'mcq-card';
    card.id = 'card-' + q.id;

    const letters = ['A','B','C','D'];
    const choicesHTML = q.choices.map((c, i) => {
      let cls = 'choice-btn';
      if (i === state.selected) cls += ' selected';

      return `<li><button class="${cls}" onclick="selectMCQ(${q.id}, ${i})">
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
      <ul class="choices">${choicesHTML}</ul>`;
    container.appendChild(card);
  });
}

function selectMCQ(id, chosen) {
  mcqState[id] = { selected: chosen };
  renderMCQ();
}

window.filterMCQ = function(unit, btn) {
  if (completedUnits.includes(unit)) return; 
  currentFilter = unit;
  
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  mcqState = {}; 
  renderMCQ();
}

// ══════════════════════════════════════════
//  RENDER FRQ, GUIDE, FORMULAS, GRAPHS
// ══════════════════════════════════════════
function renderFRQ() {
  const container = document.getElementById('frq-container');
  if(!container) return;
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

window.toggleRubric = function(btn, idx) {
  const box = document.getElementById('rubric-'+idx);
  const showing = box.classList.toggle('show');
  btn.textContent = showing ? '🙈 Hide Rubric' : '📋 Show Scoring Rubric';
}

function renderGuide() {
  const grid = document.getElementById('guide-grid');
  if(!grid) return;
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

function renderFormulas() {
  const grid = document.getElementById('formula-grid');
  if(!grid) return;
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
  if (!grid || typeof graphData === 'undefined') return;
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
window.showTab = function(tab) {
  tab = tab.toLowerCase();
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  const panel = document.getElementById('panel-'+tab);
  if (panel) panel.classList.add('active');
  
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabMap = { mcq:0, frq:1, guide:2, formulas:3, graphs:4 };
  const i = tabMap[tab];
  if (tabBtns[i]) tabBtns[i].classList.add('active');
}

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
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

// Expose internal functions to the HTML elements
window.selectMCQ = selectMCQ;
window.attemptLogin = attemptLogin;