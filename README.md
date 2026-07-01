# Advanced Algorithms (3501) — Practice Tracker

A NeetCode/LeetCode-style study tracker for the **Advanced Algorithms** course
(Units 1–4: Randomized Algorithms, Algebraic Algorithms, Linear Programming,
Approximation Algorithms).

It contains **every question** from the past final exams and the homework
problem sets, each tagged with:

- **Source & title** — e.g. `2025 Moed A · Q1a`, `Homework Set 3 · Q2`
- **Topic** — the main recurring theme (Schwartz-Zippel, Chernoff, LP Duality,
  Isolation Lemma, FFT, …) plus an optional finer sub-tag
- **Difficulty** — Easy / Medium / Hard
- **Unit** — 1–4 from the booklet
- **Question text** and a **concise worked solution** (hidden until you reveal it)

## Features

- ✅ **Mark questions as solved** — progress is saved in your browser
  (`localStorage`) and persists across visits.
- 📊 **Progress dashboard** — overall solved ring, Easy/Medium/Hard breakdown,
  and per-unit progress bars.
- 🔎 **Filtering** — by unit, topic, difficulty, source (exam/homework), specific
  exam set, solved/unsolved status, plus free-text search.
- 💡 **Reveal solutions** — click any row to expand the full question and toggle
  the solution.

## Question counts

- 8 exams: 2023 Moed A/B, 2024 Moed A/B/C, 2025 Moed A/B/C
- Homework sets:
  - **2026** (the booklet's Problem Sets 1–4)
  - **2025** and **2023** past-year assignments
- Homework problems identical to an exam question (or to another homework
  already listed) are not duplicated. Question codes carry the year so the
  sources stay distinguishable, e.g. `2026HW1Q1`, `2025HW1Q3`, `2023HW2Q1`.
- Each true/false statement is one question; each open problem (with its parts)
  is one question.

## Running locally

It's a static site — no build step. Just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment (GitHub Pages)

This repo is set up to deploy from the root via GitHub Pages. After pushing:

1. Go to **Settings → Pages**.
2. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

## Editing the question bank

All questions live in [`js/data.js`](js/data.js) as a single `QUESTIONS` array.
Add or edit entries there; the UI updates automatically.
