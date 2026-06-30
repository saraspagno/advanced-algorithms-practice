/* Advanced Algorithms practice tracker — UI logic. */
(function () {
  "use strict";

  const STORAGE_KEY = "aa-practice-done-v1";
  const REVEAL_KEY = "aa-practice-reveal-v1";

  // ---- Persistent state ------------------------------------------------
  function loadSet(key) {
    try {
      const raw = localStorage.getItem(key);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) {
      return new Set();
    }
  }
  function saveSet(key, set) {
    try {
      localStorage.setItem(key, JSON.stringify([...set]));
    } catch (e) {
      /* storage may be unavailable; ignore */
    }
  }

  const doneSet = loadSet(STORAGE_KEY);
  let revealAnswers = localStorage.getItem(REVEAL_KEY) === "1";

  // ---- DOM refs --------------------------------------------------------
  const els = {
    rows: document.getElementById("rows"),
    emptyState: document.getElementById("emptyState"),
    resultCount: document.getElementById("resultCount"),
    search: document.getElementById("search"),
    filterUnit: document.getElementById("filterUnit"),
    filterTopic: document.getElementById("filterTopic"),
    filterDifficulty: document.getElementById("filterDifficulty"),
    filterSource: document.getElementById("filterSource"),
    filterSet: document.getElementById("filterSet"),
    filterStatus: document.getElementById("filterStatus"),
    clearFilters: document.getElementById("clearFilters"),
    resetBtn: document.getElementById("resetBtn"),
    // dashboard
    solvedCount: document.getElementById("solvedCount"),
    totalCount: document.getElementById("totalCount"),
    ringProgress: document.getElementById("ringProgress"),
    easyFrac: document.getElementById("easyFrac"),
    medFrac: document.getElementById("medFrac"),
    hardFrac: document.getElementById("hardFrac"),
    easyBar: document.getElementById("easyBar"),
    medBar: document.getElementById("medBar"),
    hardBar: document.getElementById("hardBar"),
    unitStats: document.getElementById("unitStats"),
  };

  const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // r = 52

  // ---- Populate filter dropdowns --------------------------------------
  function uniqueSorted(values) {
    return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
  }

  function populateFilters() {
    uniqueSorted(QUESTIONS.map((q) => q.unit)).forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u;
      opt.textContent = UNIT_NAMES[u] || "Unit " + u;
      els.filterUnit.appendChild(opt);
    });
    uniqueSorted(QUESTIONS.map((q) => q.topic)).forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      els.filterTopic.appendChild(opt);
    });
    // Sets ordered: exams chronologically, then homeworks
    const sets = uniqueSorted(QUESTIONS.map((q) => q.set));
    sets.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      els.filterSet.appendChild(opt);
    });
  }

  // ---- Filtering -------------------------------------------------------
  function getFilters() {
    return {
      search: els.search.value.trim().toLowerCase(),
      unit: els.filterUnit.value,
      topic: els.filterTopic.value,
      difficulty: els.filterDifficulty.value,
      source: els.filterSource.value,
      set: els.filterSet.value,
      status: els.filterStatus.value,
    };
  }

  function matches(q, f) {
    if (f.unit && String(q.unit) !== f.unit) return false;
    if (f.topic && q.topic !== f.topic) return false;
    if (f.difficulty && q.difficulty !== f.difficulty) return false;
    if (f.source && q.source !== f.source) return false;
    if (f.set && q.set !== f.set) return false;
    if (f.status === "done" && !doneSet.has(q.id)) return false;
    if (f.status === "todo" && doneSet.has(q.id)) return false;
    if (f.search) {
      const hay = [
        q.id, q.set, q.number, q.topic, q.subtag, q.difficulty,
        q.type, q.prompt, q.answer, UNIT_NAMES[q.unit],
      ].join(" ").toLowerCase();
      if (!hay.includes(f.search)) return false;
    }
    return true;
  }

  // ---- Rendering -------------------------------------------------------
  function rowTemplate(q) {
    const done = doneSet.has(q.id);
    const row = document.createElement("div");
    row.className = "row" + (done ? " done" : "");
    row.dataset.id = q.id;

    row.innerHTML = `
      <div class="row-main">
        <div class="col-status">
          <input type="checkbox" class="check" ${done ? "checked" : ""} aria-label="Mark solved" />
        </div>
        <div class="q-title">
          <span class="q-id"><span class="q-set">${escapeHtml(q.set)}</span> · ${escapeHtml(q.number)}
            <span class="type-pill">${escapeHtml(q.type)}</span>
          </span>
          <span class="q-prompt">${escapeHtml(q.prompt)}</span>
        </div>
        <div class="col-topic">
          <div class="q-meta-tags"><span class="topic-tag">${escapeHtml(q.topic)}</span></div>
          ${q.subtag ? `<div class="subtag">${escapeHtml(q.subtag)}</div>` : ""}
        </div>
        <div class="col-diff"><span class="badge ${q.difficulty}">${q.difficulty}</span></div>
        <div class="col-unit"><span class="unit-pill" title="${escapeHtml(UNIT_NAMES[q.unit] || "")}">${q.unit}</span></div>
      </div>
      <div class="row-detail">
        <div class="detail-block">
          <div class="detail-label">Question</div>
          <div class="detail-text">${escapeHtml(q.prompt)}</div>
        </div>
        <div class="answer-wrap" ${revealAnswers ? "" : "hidden"}>
          <div class="detail-block">
            <div class="detail-label">Solution</div>
            <div class="detail-text answer">${escapeHtml(q.answer)}</div>
          </div>
        </div>
        <button class="reveal-btn">${revealAnswers ? "Hide solution" : "Show solution"}</button>
      </div>
    `;
    return row;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render() {
    const f = getFilters();
    const visible = QUESTIONS.filter((q) => matches(q, f));

    els.rows.innerHTML = "";
    const frag = document.createDocumentFragment();
    visible.forEach((q) => frag.appendChild(rowTemplate(q)));
    els.rows.appendChild(frag);

    els.emptyState.hidden = visible.length !== 0;
    els.resultCount.textContent =
      visible.length + " of " + QUESTIONS.length + " questions" +
      (visible.length !== QUESTIONS.length ? " (filtered)" : "");
  }

  // ---- Stats dashboard -------------------------------------------------
  function updateStats() {
    const total = QUESTIONS.length;
    const solved = QUESTIONS.filter((q) => doneSet.has(q.id)).length;

    els.solvedCount.textContent = solved;
    els.totalCount.textContent = total;
    const pct = total ? solved / total : 0;
    els.ringProgress.style.strokeDasharray = RING_CIRCUMFERENCE;
    els.ringProgress.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - pct);

    const byDiff = { Easy: [0, 0], Medium: [0, 0], Hard: [0, 0] };
    QUESTIONS.forEach((q) => {
      byDiff[q.difficulty][1]++;
      if (doneSet.has(q.id)) byDiff[q.difficulty][0]++;
    });
    setDiff(els.easyFrac, els.easyBar, byDiff.Easy);
    setDiff(els.medFrac, els.medBar, byDiff.Medium);
    setDiff(els.hardFrac, els.hardBar, byDiff.Hard);

    renderUnitStats();
  }

  function setDiff(fracEl, barEl, pair) {
    fracEl.textContent = pair[0] + " / " + pair[1];
    barEl.style.width = (pair[1] ? (pair[0] / pair[1]) * 100 : 0) + "%";
  }

  function renderUnitStats() {
    const units = uniqueSorted(QUESTIONS.map((q) => q.unit));
    els.unitStats.innerHTML = "";
    units.forEach((u) => {
      const items = QUESTIONS.filter((q) => q.unit === u);
      const solved = items.filter((q) => doneSet.has(q.id)).length;
      const card = document.createElement("div");
      card.className = "unit-card";
      const pct = items.length ? (solved / items.length) * 100 : 0;
      card.innerHTML = `
        <div class="unit-name">${escapeHtml(UNIT_NAMES[u] || "Unit " + u)}</div>
        <div class="unit-frac">${solved}<small> / ${items.length}</small></div>
        <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
      `;
      els.unitStats.appendChild(card);
    });
  }

  // ---- Events ----------------------------------------------------------
  function toggleDone(id, checked) {
    if (checked) doneSet.add(id);
    else doneSet.delete(id);
    saveSet(STORAGE_KEY, doneSet);
    updateStats();
  }

  els.rows.addEventListener("click", function (e) {
    const row = e.target.closest(".row");
    if (!row) return;
    const id = row.dataset.id;

    if (e.target.classList.contains("check")) {
      // checkbox handled on 'change'
      e.stopPropagation();
      return;
    }
    if (e.target.classList.contains("reveal-btn")) {
      revealAnswers = !revealAnswers;
      localStorage.setItem(REVEAL_KEY, revealAnswers ? "1" : "0");
      // update all currently rendered rows
      document.querySelectorAll(".row").forEach((r) => {
        const wrap = r.querySelector(".answer-wrap");
        const btn = r.querySelector(".reveal-btn");
        if (wrap) wrap.hidden = !revealAnswers;
        if (btn) btn.textContent = revealAnswers ? "Hide solution" : "Show solution";
      });
      return;
    }
    // otherwise toggle expand
    row.classList.toggle("open");
  });

  els.rows.addEventListener("change", function (e) {
    if (!e.target.classList.contains("check")) return;
    const row = e.target.closest(".row");
    const id = row.dataset.id;
    toggleDone(id, e.target.checked);
    row.classList.toggle("done", e.target.checked);
  });

  [
    els.search, els.filterUnit, els.filterTopic, els.filterDifficulty,
    els.filterSource, els.filterSet, els.filterStatus,
  ].forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  els.clearFilters.addEventListener("click", function () {
    els.search.value = "";
    [els.filterUnit, els.filterTopic, els.filterDifficulty, els.filterSource, els.filterSet, els.filterStatus]
      .forEach((s) => (s.value = ""));
    render();
  });

  els.resetBtn.addEventListener("click", function () {
    if (!confirm("Reset all solved progress? This cannot be undone.")) return;
    doneSet.clear();
    saveSet(STORAGE_KEY, doneSet);
    render();
    updateStats();
  });

  // ---- Init ------------------------------------------------------------
  populateFilters();
  render();
  updateStats();
})();
