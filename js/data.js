/*
 * Advanced Algorithms (3501) — Practice question bank.
 *
 * Every question from the past final exams (2023 Moed A/B, 2024 Moed A/B/C,
 * 2025 Moed A/B/C) and every homework problem (Problem Sets 1–4 from the
 * booklet). Each true/false statement counts as a single question; each open
 * problem (including its sub-parts) counts as a single question.
 *
 * Fields per question:
 *   id         unique stable key (used for localStorage progress)
 *   source     "Exam" | "Homework"
 *   set        human-readable origin, e.g. "2025 Moed A" or "Homework Set 1"
 *   number     short label, e.g. "Q1a" or "Q4"
 *   type       "T/F" | "Open"
 *   unit       1 | 2 | 3 | 4   (booklet unit)
 *   topic      main recurring tag
 *   subtag     optional finer tag ("" if none)
 *   difficulty "Easy" | "Medium" | "Hard"
 *   prompt     the question text
 *   answer     concise solution / answer
 */

const UNIT_NAMES = {
  1: "Unit 1 · Randomized Algorithms",
  2: "Unit 2 · Algebraic Algorithms",
  3: "Unit 3 · Linear Programming",
  4: "Unit 4 · Approximation Algorithms",
};

const QUESTIONS = [
  // =====================================================================
  // 2023 — Moed A
  // =====================================================================
  {
    id: "2023A-Q1a", source: "Exam", set: "2023 Moed A", number: "Q1a", type: "T/F",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Degeneracy", difficulty: "Medium",
    prompt: "T/F: In the simplex algorithm as presented in class, it is possible that the algorithm moves to a different vertex while the objective value at the new vertex equals its value at the previous vertex.",
    answer: "False. The algorithm only moves to a different vertex when it can strictly decrease the objective. In degenerate cases the basis changes but the vertex stays the same.",
  },
  {
    id: "2023A-Q1b", source: "Exam", set: "2023 Moed A", number: "Q1b", type: "T/F",
    unit: 1, topic: "Isolation Lemma", subtag: "", difficulty: "Medium",
    prompt: "T/F: The isolation lemma remains true even if we define the weight of a set to be the product of its elements' weights instead of their sum.",
    answer: "True. Take logs: w_ℓ(x) = log w(x) is an order-preserving bijection turning products into sums, so the original (additive) lemma applies and the unique min-weight set maps back to a unique min set.",
  },
  {
    id: "2023A-Q1c", source: "Exam", set: "2023 Moed A", number: "Q1c", type: "T/F",
    unit: 1, topic: "BPP & Error Reduction", subtag: "Chernoff", difficulty: "Medium",
    prompt: "T/F: BPP(1/8, 1/4) = BPP(2^-n, 1 - 2^-n), where n is the input length.",
    answer: "True. The ⊆ direction is trivial; the reverse follows from the Chernoff bound — run the gap-(1/8,1/4) machine O(n) times with fresh coins and threshold the count to amplify the gap to (2^-n, 1-2^-n).",
  },
  {
    id: "2023A-Q1d", source: "Exam", set: "2023 Moed A", number: "Q1d", type: "T/F",
    unit: 2, topic: "Matrix Multiplication", subtag: "Strassen", difficulty: "Easy",
    prompt: "T/F: There exists an algorithm for multiplying two 4×4 matrices using at most 49 multiplications.",
    answer: "True. Strassen multiplies 2×2 matrices with 7 multiplications. Treat the 4×4 matrices as 2×2 block matrices and recurse one level: 7 × 7 = 49.",
  },
  {
    id: "2023A-Q2", source: "Exam", set: "2023 Moed A", number: "Q2", type: "Open",
    unit: 3, topic: "Integer Programming", subtag: "IP Formulation", difficulty: "Easy",
    prompt: "Write an integer program for Minimum Dominating Set: find a smallest D ⊆ V such that every vertex is in D or has a neighbor in D. Explain the variables and why feasible solutions correspond to dominating sets.",
    answer: "Variable x_v ∈ {0,1} per vertex (in D or not). minimize Σ x_v subject to x_v + Σ_{u:(u,v)∈E} x_u ≥ 1 for all v, x_v ∈ {0,1}. The constraint forces every v to be covered by itself or a neighbor.",
  },
  {
    id: "2023A-Q3", source: "Exam", set: "2023 Moed A", number: "Q3", type: "Open",
    unit: 4, topic: "Randomized Approximation", subtag: "Conditional Expectation", difficulty: "Medium",
    prompt: "Give an efficient 2/3-approximation for Maximum Triple Cut: partition V into V1,V2,V3 maximizing edges with endpoints in different parts.",
    answer: "Assign each vertex independently to one of the 3 parts uniformly. Each edge crosses with probability 2/3, so E[ALG] ≥ (2/3)·|E| ≥ (2/3)OPT. Derandomize with the method of conditional expectations.",
  },
  {
    id: "2023A-Q4", source: "Exam", set: "2023 Moed A", number: "Q4", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Matching/Vertex Cover", difficulty: "Hard",
    prompt: "Maximum Matching IP. (a) Relax (drop integrality) and write the LP in standard form. (b) Write its dual, simplified. (c) Adding integrality to the dual gives a well-known graph problem — which?",
    answer: "(a) minimize −1ᵀx s.t. A_G x + I s = 1, x,s ≥ 0 (A_G = incidence matrix). (b) Dual simplifies to: minimize 1ᵀy s.t. A_Gᵀ y ≥ 1, y ≥ 0 (fractional vertex cover). (c) Integral dual = Minimum Vertex Cover; by LP duality on bipartite graphs this is König's theorem (max matching = min vertex cover).",
  },
  {
    id: "2023A-Q5", source: "Exam", set: "2023 Moed A", number: "Q5", type: "Open",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "Determinant & Rank", difficulty: "Hard",
    prompt: "Matrix Completion: given an n×n matrix with some entries marked '*', find the maximum achievable rank over real substitutions. Give an efficient randomized algorithm; prove correctness, running time, error probability.",
    answer: "Replace each '*' with an independent uniform integer in {1,…,10n}, compute the rank r, return r. If r' is the true max rank, an r'×r' submatrix has nonzero determinant polynomial P in the star-variables (P ≢ 0 since it's nonzero at the optimal assignment). By Schwartz-Zippel, Pr[P=0] ≤ n/(10n) = 1/10, so the computed rank equals r' w.p. ≥ 9/10.",
  },
  {
    id: "2023A-Q6", source: "Exam", set: "2023 Moed A", number: "Q6", type: "Open",
    unit: 2, topic: "FFT", subtag: "Polynomial Multiplication", difficulty: "Medium",
    prompt: "Given A, B ⊆ {1,…,n}, compute in O(n log n) the sumset A+B = {a+b} and, for each c, how many ways c = a+b with a∈A, b∈B.",
    answer: "Let f_A = Σ_{i∈A} xⁱ and f_B = Σ_{j∈B} xʲ. The coefficient of xᵏ in f_A·f_B counts the pairs (i,j) with i+j=k, i∈A, j∈B. Multiply via FFT in O(n log n).",
  },

  // =====================================================================
  // 2023 — Moed B
  // =====================================================================
  {
    id: "2023B-Q1a", source: "Exam", set: "2023 Moed B", number: "Q1a", type: "T/F",
    unit: 3, topic: "LP Duality", subtag: "Strong Duality", difficulty: "Medium",
    prompt: "T/F: In an LP, if the primal polyhedron is bounded and non-empty, the optima of the primal and dual are equal.",
    answer: "True. By strong duality, if the primal is feasible and bounded then the dual is feasible and their optimal objective values coincide.",
  },
  {
    id: "2023B-Q1b", source: "Exam", set: "2023 Moed B", number: "Q1b", type: "T/F",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Pivoting", difficulty: "Easy",
    prompt: "T/F: Each pivoting step in the simplex algorithm takes polynomial time in the input length.",
    answer: "True. A pivot picks an entering variable via the reduced-cost vector, a leaving variable via the ratio test, and performs matrix inversions/multiplications — all polynomial time.",
  },
  {
    id: "2023B-Q1c", source: "Exam", set: "2023 Moed B", number: "Q1c", type: "T/F",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "", difficulty: "Medium",
    prompt: "T/F: There exists a non-zero polynomial in five variables that evaluates to zero for every assignment of integers to the variables.",
    answer: "False. If f has degree d, by Schwartz-Zippel there exist α₁,…,α₅ ∈ {1,…,d+1} with f(α) ≠ 0, so it cannot vanish on all integers.",
  },
  {
    id: "2023B-Q1d", source: "Exam", set: "2023 Moed B", number: "Q1d", type: "T/F",
    unit: 1, topic: "Random Walks & Spectral Graphs", subtag: "Mixing", difficulty: "Hard",
    prompt: "T/F: For a regular graph whose normalized adjacency eigenvalues (except the largest) are ≤ 1/2 in absolute value, there is a constant C such that for every s,t, a random walk from s reaches t within C·log n steps with probability ≥ 1/(2n).",
    answer: "True. With all non-top eigenvalues ≤ 1/2, after k = O(log n) steps Aᵏv = (1/n)·1 + ε with ‖ε‖ ≤ n^-100, so every coordinate (including t) has probability ≥ 1/(2n).",
  },
  {
    id: "2023B-Q2", source: "Exam", set: "2023 Moed B", number: "Q2", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Weak Duality", difficulty: "Medium",
    prompt: "State and prove the weak duality theorem for LPs in standard form.",
    answer: "For (P) min cᵀx s.t. Ax=b, x≥0 and dual (D) max bᵀy s.t. Aᵀy≤c: for any feasible x,y we have cᵀx ≥ bᵀy. Proof: Aᵀy≤c and x≥0 give xᵀAᵀy ≤ xᵀc, i.e. yᵀAx ≤ cᵀx; since Ax=b, bᵀy ≤ cᵀx.",
  },
  {
    id: "2023B-Q3", source: "Exam", set: "2023 Moed B", number: "Q3", type: "Open",
    unit: 4, topic: "LP Rounding", subtag: "Vertex Cover", difficulty: "Medium",
    prompt: "Give an efficient 3-approximation for vertex cover in a 3-uniform hypergraph (every edge has 3 vertices; cover every edge).",
    answer: "Combinatorial: repeatedly pick an uncovered edge {u,v,w}, add all three to C, remove incident edges. The k chosen edges are disjoint so any cover needs ≥ k vertices, while |C| = 3k → ratio 3. Alternatively, relax the IP (x_u+x_v+x_w ≥ 1) and round x_v ≥ 1/3 up.",
  },
  {
    id: "2023B-Q4", source: "Exam", set: "2023 Moed B", number: "Q4", type: "Open",
    unit: 3, topic: "Integer Programming", subtag: "TSP / Subtour", difficulty: "Hard",
    prompt: "TSP as an IP with degree constraints. (a) Show every Hamiltonian cycle is feasible. (b) Show the converse fails (give a feasible solution that isn't a Hamiltonian cycle). (c) Adding subtour-elimination constraints Σ_{u,v∈Q} x_{uv} ≤ |Q|−1 — prove every feasible solution is now a Hamiltonian cycle.",
    answer: "(a) A Hamiltonian cycle gives in-degree = out-degree = 1 at every vertex → feasible. (b) Two disjoint cycles satisfy the degree constraints but aren't a single Hamiltonian cycle. (c) If the solution were several disjoint cycles, a cycle on a proper subset Q₀ ⊊ V would violate the subtour constraint (its internal-edge sum equals |Q₀|), forcing a single cycle through all vertices.",
  },
  {
    id: "2023B-Q5", source: "Exam", set: "2023 Moed B", number: "Q5", type: "Open",
    unit: 2, topic: "Matrix Multiplication", subtag: "Transitive Closure", difficulty: "Medium",
    prompt: "Given a directed graph G, compute its transitive closure G* with total (not parallel) running time asymptotically smaller than n³.",
    answer: "Let A' = A + I. Then (A')ᵏ_{ij} > 0 iff there is a path of length ≤ k from i to j; any reachability path has length ≤ n. Compute (A')ⁿ by fast matrix multiplication + repeated squaring: O(nᵚ log n) = o(n³).",
  },
  {
    id: "2023B-Q6", source: "Exam", set: "2023 Moed B", number: "Q6", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Union Bound / Discrepancy", difficulty: "Hard",
    prompt: "Small Discrepancy: given a family F of m subsets of {1,…,n}, find (w.h.p.) a red/blue coloring h with disc_h(F) = max_S |#red(S) − #blue(S)| ≤ C·√(n log m).",
    answer: "Color each element ±1 uniformly at random; disc on S is Σ_{i∈S} X_i with mean 0. By Chernoff, Pr[disc(S) ≥ C√(n log m)] ≤ 1/(10m²) for large C. Union bound over m sets gives overall failure ≤ 1/(10m).",
  },

  // =====================================================================
  // 2024 — Moed A
  // =====================================================================
  {
    id: "2024A-Q1a", source: "Exam", set: "2024 Moed A", number: "Q1a", type: "T/F",
    unit: 3, topic: "LP Duality", subtag: "Strong Duality", difficulty: "Easy",
    prompt: "T/F: For an LP (P) in standard form and its dual (D), it is possible that both are feasible while the optimum of (P) is strictly greater than the optimum of (D).",
    answer: "False. By strong duality, if both (P) and (D) are feasible their optimal values are equal.",
  },
  {
    id: "2024A-Q1b", source: "Exam", set: "2024 Moed A", number: "Q1b", type: "T/F",
    unit: 4, topic: "SDP & PSD", subtag: "PSD Matrices", difficulty: "Easy",
    prompt: "T/F: If A is symmetric and det(A) ≥ 0, then A is PSD.",
    answer: "False. A = diag(−1,−1) has determinant 1 but eigenvalues −1, so it is not PSD.",
  },
  {
    id: "2024A-Q1c", source: "Exam", set: "2024 Moed A", number: "Q1c", type: "T/F",
    unit: 2, topic: "Linear Algebra", subtag: "Gram-Schmidt", difficulty: "Easy",
    prompt: "T/F: There is a polynomial-time algorithm that, given v1,…,vk ∈ Rⁿ, finds an orthonormal basis for their span.",
    answer: "True. Gram-Schmidt produces an orthogonal basis in polynomial time (drop dependent vectors greedily); normalize each vector to get an orthonormal basis.",
  },
  {
    id: "2024A-Q1d", source: "Exam", set: "2024 Moed A", number: "Q1d", type: "T/F",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Reduced Cost", difficulty: "Medium",
    prompt: "T/F: For a basic feasible solution x with basis B, if every entry of the reduced-cost vector c̃_N is strictly positive, then x is the unique optimal solution.",
    answer: "True. For feasible y, cᵀy = c_BᵀA_B⁻¹b + c̃_Nᵀy_N. Strictly positive c̃_N means any y with y_N ≠ 0 has larger cost; y_N = 0 forces y = x. So x is the unique optimum.",
  },
  {
    id: "2024A-Q2", source: "Exam", set: "2024 Moed A", number: "Q2", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Approximate Counting", difficulty: "Medium",
    prompt: "For a CNF φ on n variables, D(φ) is the fraction of satisfying assignments. Give a randomized poly-time algorithm outputting A(φ) with |A(φ) − D(φ)| ≤ 1/10 with probability ≥ 1 − 2^-n.",
    answer: "Sample t = O(n) uniform assignments, evaluate φ on each, output the empirical satisfying fraction. With X = Σ X_i, E[X/t] = D(φ); by Chernoff Pr[|X/t − D(φ)| ≥ 1/10] ≤ e^{−O(t)} ≤ 2^-n.",
  },
  {
    id: "2024A-Q3", source: "Exam", set: "2024 Moed A", number: "Q3", type: "Open",
    unit: 1, topic: "Isolation Lemma", subtag: "Unique Shortest Path", difficulty: "Hard",
    prompt: "Prove there is a polynomial p(n) so that assigning each edge a uniform random weight in {1,…,p(n)} yields, with probability ≥ 0.9, a unique minimum-weight path between every pair u,v.",
    answer: "Take p(n) = 10n⁵. Fix u,v; the family of u–v paths is a set system with ≤ n² 'elements' (edges). By the isolation lemma the min-weight u–v path is unique w.p. ≥ 1 − m/p(n) ≥ 1 − 1/(10n³). Union bound over ≤ n² pairs gives failure ≤ 1/(10n).",
  },
  {
    id: "2024A-Q4", source: "Exam", set: "2024 Moed A", number: "Q4", type: "Open",
    unit: 3, topic: "Integer Programming", subtag: "IP Formulation", difficulty: "Medium",
    prompt: "Write an ILP for weighted Max-SAT (each clause C_j has weight w_j; maximize total weight of satisfied clauses). Explain variables and correctness.",
    answer: "Variable y_i ∈ {0,1} per literal-variable, z_j ∈ {0,1} per clause. maximize Σ w_j z_j s.t. z_j ≤ Σ_{i∈C_j⁺} y_i + Σ_{i∈C_j⁻}(1−y_i), y_i,z_j ∈ {0,1}. The constraint lets z_j = 1 only if some literal of C_j is satisfied.",
  },
  {
    id: "2024A-Q5", source: "Exam", set: "2024 Moed A", number: "Q5", type: "Open",
    unit: 2, topic: "FFT", subtag: "Convolution", difficulty: "Medium",
    prompt: "Given f, g : {0,…,n} → C (as value lists), compute their convolution (f∗g)(m) = Σ_{i+j=m} f(i)g(j) for all m in O(n log n).",
    answer: "Let P_f = Σ f(i)xⁱ, P_g = Σ g(i)xⁱ. Then (f∗g)(m) is the coefficient of xᵐ in P_f·P_g; multiply via FFT in O(n log n).",
  },
  {
    id: "2024A-Q6", source: "Exam", set: "2024 Moed A", number: "Q6", type: "Open",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "Determinant & Rank", difficulty: "Hard",
    prompt: "Given matrices B1,…,Bk ∈ Rⁿˣⁿ, decide (poly time, randomized) whether some linear combination Σ x_i B_i is invertible.",
    answer: "Sample α_i ∈ {1,…,10n} uniformly, say YES iff Σ α_i B_i is invertible. P(x) = det(Σ x_i B_i) is degree ≤ n. An invertible combination exists iff P ≢ 0. By Schwartz-Zippel, if P ≢ 0 then Pr[P(α)=0] ≤ 1/10, so we answer YES w.p. ≥ 9/10.",
  },

  // =====================================================================
  // 2024 — Moed B
  // =====================================================================
  {
    id: "2024B-Q1a", source: "Exam", set: "2024 Moed B", number: "Q1a", type: "T/F",
    unit: 3, topic: "Integer Programming", subtag: "NP-hardness", difficulty: "Easy",
    prompt: "T/F: If integer linear programs can be solved in polynomial time, then P = NP.",
    answer: "True. NP-complete problems (e.g. maximum independent set) reduce in polynomial time to ILP, so a poly-time ILP solver would solve them all.",
  },
  {
    id: "2024B-Q1b", source: "Exam", set: "2024 Moed B", number: "Q1b", type: "T/F",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Vertices", difficulty: "Medium",
    prompt: "T/F: There is an efficient algorithm that, given an LP in standard form and a point y, decides whether y is a vertex of the polytope.",
    answer: "True. Check feasibility (Ay=b, y≥0); then y is a vertex iff the submatrix A_y of columns where y_i > 0 has full column rank — computable in poly time via rank.",
  },
  {
    id: "2024B-Q1c", source: "Exam", set: "2024 Moed B", number: "Q1c", type: "T/F",
    unit: 4, topic: "Lattices & LLL", subtag: "Shortest Vector", difficulty: "Medium",
    prompt: "T/F: If b1,…,bn is an orthogonal basis of a lattice L with ‖b1‖ ≤ … ≤ ‖bn‖, then b1 is a shortest non-zero vector of L.",
    answer: "True. For v = Σ λ_i b_i (λ_i ∈ Z), orthogonality gives ‖v‖² = Σ λ_i²‖b_i‖². Some λ_j ≠ 0 has λ_j² ≥ 1, so ‖v‖ ≥ ‖b_j‖ ≥ ‖b1‖.",
  },
  {
    id: "2024B-Q1d", source: "Exam", set: "2024 Moed B", number: "Q1d", type: "T/F",
    unit: 2, topic: "Determinant & Char. Polynomial", subtag: "Symmetric Functions", difficulty: "Medium",
    prompt: "T/F: For A ∈ C^{2n×2n} with eigenvalues λ1,…,λ2n, there is an efficient algorithm computing Σ_{|S|=n} Π_{i∈S} λ_i.",
    answer: "True. This is the n-th elementary symmetric polynomial of the eigenvalues = (−1)ⁿ times the coefficient of xⁿ in the characteristic polynomial, all of whose coefficients we can compute efficiently.",
  },
  {
    id: "2024B-Q2", source: "Exam", set: "2024 Moed B", number: "Q2", type: "Open",
    unit: 2, topic: "FFT", subtag: "Walsh-Hadamard", difficulty: "Medium",
    prompt: "For the Walsh-Hadamard matrix H_n (N = 2ⁿ), prove there is an algorithm computing H_n·x for x ∈ Rᴺ in O(N log N).",
    answer: "Recurse like FFT: write x = (x₀,x₁). Then H_n x = (H_{n-1}x₀ + H_{n-1}x₁ , H_{n-1}x₀ − H_{n-1}x₁). Compute the two half-transforms recursively, combine in O(N). T(N) = 2T(N/2) + O(N) = O(N log N).",
  },
  {
    id: "2024B-Q3", source: "Exam", set: "2024 Moed B", number: "Q3", type: "Open",
    unit: 1, topic: "Karger Min-Cut", subtag: "Counting Argument", difficulty: "Medium",
    prompt: "Prove that an undirected graph G has at most n(n−1)/2 minimum cuts. (Hint: Karger's success probability.)",
    answer: "Each fixed min cut is returned by Karger w.p. ≥ 2/(n(n−1)); these events are disjoint across distinct cuts. Summing, 1 ≥ Σ Pr ≥ |M(G)|·2/(n(n−1)), so |M(G)| ≤ n(n−1)/2.",
  },
  {
    id: "2024B-Q4", source: "Exam", set: "2024 Moed B", number: "Q4", type: "Open",
    unit: 2, topic: "Matrix Multiplication", subtag: "Diameter / APSP", difficulty: "Medium",
    prompt: "Given a strongly connected digraph G, compute its diameter max_{u≠v} d(u,v) in time asymptotically smaller than n³.",
    answer: "B = A + I; (Bᵏ)_{ij} > 0 iff a path of length ≤ k exists. Diameter ≤ n. Binary search on k using Bᵏ (repeated squaring, O(nᵚ log n)); precomputing B^{2ⁱ} gives total O(nᵚ log n) = o(n³).",
  },
  {
    id: "2024B-Q5", source: "Exam", set: "2024 Moed B", number: "Q5", type: "Open",
    unit: 4, topic: "LP Rounding", subtag: "Set Cover Variant", difficulty: "Medium",
    prompt: "Given weights w_i and sets T1,…,Tk with |T_j| ≤ d, a representative set hits every T_j. Give a d-approximation for minimum-weight representative set via LP relaxation and rounding.",
    answer: "Relax min Σ w_i x_i s.t. Σ_{i∈T_j} x_i ≥ 1 to 0 ≤ x_i ≤ 1; solve for x*. Round x_i = 1 iff x*_i ≥ 1/d. Each T_j (size ≤ d) has some x*_i ≥ 1/d, so it's hit. Since x_i ≤ d·x*_i, w(H) ≤ d·LPOPT ≤ d·OPT.",
  },
  {
    id: "2024B-Q6", source: "Exam", set: "2024 Moed B", number: "Q6", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Union Bound", difficulty: "Hard",
    prompt: "Show a randomized poly-time algorithm that, on input n, outputs (w.p. ≥ 0.9) a (C·log n, 1/100)-balanced bipartite graph: for all m ≥ k and |S|=|T|=m, | |E(S,T)| − m²/2 | ≤ m²/100.",
    answer: "Include each of the n² possible edges independently w.p. 1/2. For fixed S,T of size m, E[|E(S,T)|] = m²/2 and by Chernoff Pr[deviation ≥ m²/100] ≤ e^{−cm²}. There are ≤ n^{2m} choices, so failure ≤ n^{2m}e^{−cm²} = e^{2m ln n − cm²}; choosing C large makes this ≤ 1/(10n) at m = C log n, then union bound over m.",
  },

  // =====================================================================
  // 2024 — Moed C
  // =====================================================================
  {
    id: "2024C-Q1a", source: "Exam", set: "2024 Moed C", number: "Q1a", type: "T/F",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Vertices", difficulty: "Easy",
    prompt: "T/F: For a standard-form polytope P = {x : Ax=b, x≥0} ⊆ Rⁿ, the number of vertices of P is at most 2ⁿ.",
    answer: "True. A vertex is determined by which columns of A are 'active' (where y > 0), and that submatrix must have full column rank; there are only 2ⁿ subsets of columns.",
  },
  {
    id: "2024C-Q1b", source: "Exam", set: "2024 Moed C", number: "Q1b", type: "T/F",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "", difficulty: "Easy",
    prompt: "T/F: For a non-zero polynomial f(x1,…,xn) of degree d over Q, there exist α1,…,αn ∈ {1,…,d+1} with f(α) ≠ 0.",
    answer: "True. By Schwartz-Zippel over S = {1,…,d+1}, Pr[f(α)=0] ≤ d/(d+1) < 1, so some assignment makes f non-zero.",
  },
  {
    id: "2024C-Q1c", source: "Exam", set: "2024 Moed C", number: "Q1c", type: "T/F",
    unit: 1, topic: "BPP & Error Reduction", subtag: "", difficulty: "Medium",
    prompt: "T/F: BPP(1/2, 1/2) = BPP(1/3, 2/3).",
    answer: "False. BPP(1/2,1/2) contains every language (even undecidable ones — just flip a coin), whereas BPP(1/3,2/3) only contains decidable languages (decidable in exponential time).",
  },
  {
    id: "2024C-Q1d", source: "Exam", set: "2024 Moed C", number: "Q1d", type: "T/F",
    unit: 2, topic: "Determinant & Char. Polynomial", subtag: "Parity of Matchings", difficulty: "Medium",
    prompt: "T/F: There is an efficient algorithm deciding, given a bipartite graph G, whether the number of perfect matchings is odd.",
    answer: "True. #perfect matchings = Σ_σ Π A_{i,σ(i)} (permanent), and det(A) = Σ_σ (−1)^{sgn σ} Π A_{i,σ(i)}; these agree mod 2. So det(A) mod 2 = 1 iff the count is odd — compute det mod 2.",
  },
  {
    id: "2024C-Q2", source: "Exam", set: "2024 Moed C", number: "Q2", type: "Open",
    unit: 2, topic: "Matrix Multiplication", subtag: "Boolean", difficulty: "Easy",
    prompt: "Given {0,1} matrices A,B, compute their boolean product (A∘B)_{ij} = ⋁_k (A_{ik} ∧ B_{kj}) in time asymptotically smaller than n³.",
    answer: "(A∘B)_{ij} = 1 iff (A·B)_{ij} > 0. Compute C = A·B by fast matrix multiplication in O(nᵚ), then threshold each entry (>0 → 1) in O(n²).",
  },
  {
    id: "2024C-Q3", source: "Exam", set: "2024 Moed C", number: "Q3", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Union Bound", difficulty: "Medium",
    prompt: "Given S ⊆ {0,1}ⁿ with |S| ≤ n^2024, find (w.p. ≥ 0.9) a vector u with Hamming distance d(u,v) ≥ n/3 for every v ∈ S.",
    answer: "Pick u uniform in {0,1}ⁿ. For fixed v, E[d(u,v)] = n/2 and by Chernoff Pr[d(u,v) ≤ n/3] ≤ e^{−cn}. Union bound: Pr[∃ bad v] ≤ |S|·e^{−cn} ≤ n^2024·e^{−cn} ≤ 0.1 for large n.",
  },
  {
    id: "2024C-Q4", source: "Exam", set: "2024 Moed C", number: "Q4", type: "Open",
    unit: 3, topic: "Integer Programming", subtag: "IP Formulation", difficulty: "Medium",
    prompt: "Write an ILP for Bin Packing: pack n items of weights w_i (0 ≤ w_i ≤ B) into the fewest bins of capacity B. Explain variables and correctness.",
    answer: "y_j ∈ {0,1} (bin j used), x_{ij} ∈ {0,1} (item i in bin j). minimize Σ y_j s.t. Σ_j x_{ij} = 1 (each item placed once), Σ_i w_i x_{ij} ≤ B·y_j (capacity, forces y_j=1 if used). At most n bins suffice.",
  },
  {
    id: "2024C-Q5", source: "Exam", set: "2024 Moed C", number: "Q5", type: "Open",
    unit: 4, topic: "Lattices & LLL", subtag: "LLL Bound", difficulty: "Hard",
    prompt: "For a reduced basis b1,…,bn from LLL, prove ‖b1‖ ≤ 2^{(n−1)/4}·(det L)^{1/n}.",
    answer: "Reduced basis satisfies ‖b̃_i‖² ≥ ½‖b̃_{i-1}‖², so by induction ‖b̃_i‖² ≥ 2^{-(i-1)}‖b1‖². Multiply over i: (det L)² = Π‖b̃_i‖² ≥ 2^{-n(n-1)/2}‖b1‖^{2n}. Take 2n-th root.",
  },
  {
    id: "2024C-Q6", source: "Exam", set: "2024 Moed C", number: "Q6", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Farkas Lemma", difficulty: "Hard",
    prompt: "Prove the strong-duality case: for (P) min cᵀx s.t. Ax=b, x≥0 and (D) max bᵀy s.t. Aᵀy≤c, if (P) is infeasible and (D) is feasible then (D) is unbounded.",
    answer: "By Farkas, infeasibility of (P) gives y' with (y')ᵀA ≥ 0 and (y')ᵀb < 0. Take any dual-feasible y; for λ > 0, y_λ = y − λy' stays feasible (Aᵀy_λ ≤ c) and bᵀy_λ = bᵀy − λbᵀy' → +∞ since bᵀy' < 0. Hence (D) is unbounded.",
  },

  // =====================================================================
  // 2025 — Moed A
  // =====================================================================
  {
    id: "2025A-Q1a", source: "Exam", set: "2025 Moed A", number: "Q1a", type: "T/F",
    unit: 4, topic: "Randomized Approximation", subtag: "Max-3SAT", difficulty: "Medium",
    prompt: "T/F: For every 3-CNF formula with m clauses, there exists an assignment satisfying at most 7m/8 clauses.",
    answer: "True. A uniformly random assignment satisfies 7m/8 clauses in expectation, so some assignment satisfies at most that many (and some satisfies at least that many).",
  },
  {
    id: "2025A-Q1b", source: "Exam", set: "2025 Moed A", number: "Q1b", type: "T/F",
    unit: 2, topic: "FFT", subtag: "Repeated Squaring", difficulty: "Medium",
    prompt: "T/F: There is an algorithm that, given a degree-n polynomial f(x), computes the coefficients of f(x)ⁿ with O(n² log n) arithmetic operations (n a power of 2).",
    answer: "True. Repeated squaring f², f⁴, …, fⁿ uses log n multiplications; the i-th multiplies degree-(n·2ⁱ) polynomials, total Σ O(n·2ⁱ log(n·2ⁱ)) = O(n² log n).",
  },
  {
    id: "2025A-Q1c", source: "Exam", set: "2025 Moed A", number: "Q1c", type: "T/F",
    unit: 2, topic: "Matrix Multiplication", subtag: "", difficulty: "Easy",
    prompt: "T/F: For an n×n matrix A and linearly independent v1,…,vn, computing the products Av1,…,Avn requires time n³.",
    answer: "False. Stacking the vectors as a matrix and using fast matrix multiplication computes all products in O(nᵚ), regardless of independence.",
  },
  {
    id: "2025A-Q1d", source: "Exam", set: "2025 Moed A", number: "Q1d", type: "T/F",
    unit: 1, topic: "Random Walks & Spectral Graphs", subtag: "Eigenspaces", difficulty: "Medium",
    prompt: "T/F: For a connected regular undirected graph with adjacency matrix A, the dimension of {v ∈ Rⁿ : Av = v} is exactly 1.",
    answer: "True. This is the eigenspace of eigenvalue 1, spanned by the all-ones vector; connectivity makes the eigenvalue 1 simple (multiplicity exactly 1).",
  },
  {
    id: "2025A-Q2", source: "Exam", set: "2025 Moed A", number: "Q2", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Strong Duality", difficulty: "Medium",
    prompt: "For symmetric A, (P): min cᵀx s.t. Ax ≥ c, x ≥ 0. (a) Compute the dual. (b) Show that if x* satisfies Ax*=c and x*≥0, then x* is optimal for (P).",
    answer: "(a) Putting (P) in standard form and dualizing (using Aᵀ=A) gives (D): max cᵀz s.t. Az ≤ c, z ≥ 0. (b) x* with Ax*=c, x*≥0 is feasible for both (P) and (D) with equal objective cᵀx*; by strong duality it is optimal for both.",
  },
  {
    id: "2025A-Q3", source: "Exam", set: "2025 Moed A", number: "Q3", type: "Open",
    unit: 3, topic: "Integer Programming", subtag: "IP Formulation", difficulty: "Easy",
    prompt: "Write an ILP for Minimum Makespan: assign n jobs (times p_i) to m machines minimizing the maximum machine load.",
    answer: "x_{ij} ∈ {0,1} (job i on machine j), T = makespan. minimize T s.t. Σ_j x_{ij} = 1 (each job assigned), Σ_i x_{ij} p_i ≤ T (load ≤ T), x_{ij} ∈ {0,1}.",
  },
  {
    id: "2025A-Q4", source: "Exam", set: "2025 Moed A", number: "Q4", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Union Bound", difficulty: "Hard",
    prompt: "A set S ⊆ {−1,1}ⁿ is ε-unbiased if for every non-empty I, |Σ_{v∈S} e_I(v)| ≤ ε|S| where e_I(v) = Π_{i∈I} v_i. Give a randomized poly-time algorithm outputting (w.p. ≥ 0.99) an ε-unbiased set of size O(n/ε²).",
    answer: "Pick s = O(n/ε²) vectors uniformly from {−1,1}ⁿ. For fixed I, each e_I(v) is uniform ±1, so by Chernoff Pr[|Σ e_I(v_j)| > εs] ≤ e^{−cε²s}. Choose s so this is ≤ 2^{-2n}; union bound over < 2ⁿ subsets I gives failure ≤ 2^-n.",
  },
  {
    id: "2025A-Q5", source: "Exam", set: "2025 Moed A", number: "Q5", type: "Open",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "Determinant & Rank", difficulty: "Medium",
    prompt: "Two digraphs are 'determinantally equivalent' if their symbolic adjacency matrices have identical determinant polynomials. Give an efficient randomized algorithm deciding equivalence with error < 0.1.",
    answer: "Pick r_{ij} ∈ {1,…,100n} uniformly, substitute into both symbolic determinants, declare equivalent iff equal. Let P = det(A1) − det(A2), deg ≤ n. If equivalent, P ≡ 0 (always equal). Else P ≢ 0 and by Schwartz-Zippel Pr[P=0] ≤ n/(100n) = 1/100 < 0.1.",
  },

  // =====================================================================
  // 2025 — Moed B
  // =====================================================================
  {
    id: "2025B-Q1a", source: "Exam", set: "2025 Moed B", number: "Q1a", type: "T/F",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "Roots of Unity", difficulty: "Medium",
    prompt: "T/F: Let Ω_m be the m-th roots of unity. There exists a non-zero polynomial f(x1,…,xn) with deg(f) < m vanishing on all a1,…,an ∈ Ω_m.",
    answer: "False. Since |Ω_m| = m, by Schwartz-Zippel Pr[f=0] ≤ deg(f)/m < 1, so some assignment in Ω_m gives f ≠ 0.",
  },
  {
    id: "2025B-Q1b", source: "Exam", set: "2025 Moed B", number: "Q1b", type: "T/F",
    unit: 2, topic: "Matrix Multiplication", subtag: "Block", difficulty: "Easy",
    prompt: "T/F: There is an algorithm multiplying an n×n matrix by an n×n² matrix using fewer than n⁴ arithmetic operations.",
    answer: "True. Split the n×n² matrix into n blocks of size n×n; AB = [AB1 | … | ABn]. That's n products of n×n matrices: n·nᵚ = n^{ω+1} < n⁴.",
  },
  {
    id: "2025B-Q1c", source: "Exam", set: "2025 Moed B", number: "Q1c", type: "T/F",
    unit: 1, topic: "Markov & Probabilistic Method", subtag: "Markov", difficulty: "Easy",
    prompt: "T/F: At most half of the students in the exam receive a grade that is at least twice the average grade.",
    answer: "True. Let X be a random student's grade (mean E[X]). By Markov's inequality, Pr[X ≥ 2E[X]] ≤ 1/2.",
  },
  {
    id: "2025B-Q1d", source: "Exam", set: "2025 Moed B", number: "Q1d", type: "T/F",
    unit: 1, topic: "Random Walks & Spectral Graphs", subtag: "Bipartiteness", difficulty: "Medium",
    prompt: "T/F: For a connected regular graph with normalized adjacency matrix A, if det(A + I) = 0 then G is bipartite.",
    answer: "True. det(A+I)=0 means −1 is an eigenvalue (Av = −v for some v ≠ 0). A regular graph is bipartite iff −1 is an eigenvalue of A.",
  },
  {
    id: "2025B-Q2", source: "Exam", set: "2025 Moed B", number: "Q2", type: "Open",
    unit: 4, topic: "LP Rounding", subtag: "Set Cover", difficulty: "Medium",
    prompt: "Set cover with weights c_i. (a) Write the ILP. (b) For frequency-f set cover (each element in ≤ f sets), give an f-approximation via LP relaxation and rounding.",
    answer: "(a) min Σ c_i x_i s.t. Σ_{i:S_i∋j} x_i ≥ 1 for all j, x_i ∈ {0,1}. (b) Relax to 0 ≤ x_i ≤ 1, solve for x*, include S_i iff x*_i ≥ 1/f. Each element j is covered (some set has x*_i ≥ 1/f since ≤ f sets share the ≥1 mass). Since x_i ≤ f·x*_i, ALG ≤ f·LPOPT ≤ f·OPT.",
  },
  {
    id: "2025B-Q3", source: "Exam", set: "2025 Moed B", number: "Q3", type: "Open",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Reduced Cost", difficulty: "Medium",
    prompt: "For a basic feasible solution x with basis B and reduced-cost vector c̃_N, prove that if c̃_N ≥ 0 then x is optimal.",
    answer: "From A_B x_B + A_N x_N = b, x_B = A_B⁻¹b − A_B⁻¹A_N x_N, so cᵀx = c_BᵀA_B⁻¹b + c̃_Nᵀx_N. At x, x_N=0. For any feasible y ≥ 0, cᵀy = c_BᵀA_B⁻¹b + c̃_Nᵀy_N ≥ c_BᵀA_B⁻¹b = cᵀx. Hence x optimal.",
  },
  {
    id: "2025B-Q4", source: "Exam", set: "2025 Moed B", number: "Q4", type: "Open",
    unit: 2, topic: "FFT", subtag: "Interpolation / Division", difficulty: "Hard",
    prompt: "Given polynomials f, g with deg(g) ≤ deg(f) < n, where h with g·h = f exists and g(ωⁱ) ≠ 0 for all i (ω a primitive n-th root of unity), find the coefficients of h in O(n log n).",
    answer: "(1) Evaluate f, g at 1, ω, …, ω^{n-1} via FFT. (2) Compute f(ωⁱ)/g(ωⁱ) (n divisions; denominators non-zero). (3) Interpolate the degree-(deg f − deg g) polynomial h via inverse FFT. Steps 1,3 are O(n log n); h is uniquely determined since deg(h) < n.",
  },
  {
    id: "2025B-Q5", source: "Exam", set: "2025 Moed B", number: "Q5", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Approximate Counting", difficulty: "Medium",
    prompt: "The versatility R(G) is the fraction of legal 3-colorings of G among all 3ⁿ colorings. Give a randomized poly-time algorithm outputting A(G) with |A(G) − R(G)| ≤ 1/n with probability ≥ 1 − 2^-n.",
    answer: "Sample t = O(n³) uniform 3-colorings, test legality of each, output the empirical legal fraction. With X = Σ X_i, E[X/t] = R(G); by Chernoff Pr[|X/t − R(G)| ≥ 1/n] ≤ e^{−O(t/n²)} ≤ 2^-n. Legality checks are linear time.",
  },

  // =====================================================================
  // 2025 — Moed C
  // =====================================================================
  {
    id: "2025C-Q1a", source: "Exam", set: "2025 Moed C", number: "Q1a", type: "T/F",
    unit: 2, topic: "Roots of Unity", subtag: "", difficulty: "Easy",
    prompt: "T/F: If k | n (n divisible by k), then every root of unity of order k is also a root of unity of order n.",
    answer: "True. Write n = km. If ωᵏ = 1 then ωⁿ = (ωᵏ)ᵐ = 1ᵐ = 1.",
  },
  {
    id: "2025C-Q1b", source: "Exam", set: "2025 Moed C", number: "Q1b", type: "T/F",
    unit: 2, topic: "Matrix Multiplication", subtag: "Strassen", difficulty: "Medium",
    prompt: "T/F: Let α_k be the minimal number of multiplications for k×k matrix multiplication. Then α_{k²} ≤ (α_k)².",
    answer: "True. Partition k²×k² matrices into k×k blocks of k×k matrices. Multiply the block matrix with α_k block multiplications, each a k×k product using α_k scalar multiplications: total α_k·α_k.",
  },
  {
    id: "2025C-Q1c", source: "Exam", set: "2025 Moed C", number: "Q1c", type: "T/F",
    unit: 1, topic: "Isolation Lemma", subtag: "", difficulty: "Medium",
    prompt: "T/F: Assigning each edge a uniform weight in {1,…,4|E|} yields, w.p. ≥ 1/2, both a unique minimum-weight cut and a unique maximum-weight cut.",
    answer: "True. By the isolation lemma the min-weight cut is non-unique w.p. ≤ 1/4, and likewise the max-weight cut w.p. ≤ 1/4; union bound gives ≤ 1/2 failure, so ≥ 1/2 both are unique.",
  },
  {
    id: "2025C-Q1d", source: "Exam", set: "2025 Moed C", number: "Q1d", type: "T/F",
    unit: 3, topic: "Simplex & LP Geometry", subtag: "Optimality vs Vertices", difficulty: "Easy",
    prompt: "T/F: For an LP (P), x is an optimal solution iff x is a vertex.",
    answer: "False. E.g. 'min 0 s.t. 0 ≤ x ≤ 1' makes every point optimal (not just vertices); conversely vertices need not be optimal.",
  },
  {
    id: "2025C-Q2", source: "Exam", set: "2025 Moed C", number: "Q2", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Complementary Slackness", difficulty: "Hard",
    prompt: "Set cover. (a) Show (D): max Σ y_j s.t. Σ_{j∈S_i} y_j ≤ c_i, y ≥ 0 is the dual of the LP relaxation. (b) For optimal y*, show the sets whose constraint is tight form a cover. (c) Give an f-approximation based on solving (D).",
    answer: "(a) Write the relaxed primal in standard form ([−A | I]; min cᵀx); its dual simplifies (after y → −y) to (D). (b) If some element j were uncovered, every S_i ∋ j has slack, so increasing y_j by ε keeps feasibility and improves the objective — contradicting optimality. (c) Pick the tight sets C. Then Σ_{S_i∈C} c_i = Σ_{S_i∈C} Σ_{j∈S_i} y*_j ≤ f·Σ_j y*_j = f·LPOPT ≤ f·OPT.",
  },
  {
    id: "2025C-Q3", source: "Exam", set: "2025 Moed C", number: "Q3", type: "Open",
    unit: 1, topic: "Random Walks & Spectral Graphs", subtag: "Lazy Walk", difficulty: "Hard",
    prompt: "For a connected regular graph and vertices s,t, consider the lazy walk: stay w.p. 1/3, else move to a uniform neighbor. Prove that after poly(n) steps the probability to reach t is ≥ 1/(2n).",
    answer: "Let A be the normalized adjacency matrix with eigenvalues μ_n ≤ … ≤ μ1 = 1, μ2 ≤ 1 − 1/(4n⁵). The walk matrix is C = (1/3)I + (2/3)A with eigenvalues λ_i = 1/3 + (2/3)μ_i: λ1 = 1, |λ2| ≤ 1 − 1/(6n⁵), and all |λ_i| ≤ |λ2| (since λ_n ≥ −1/3). Same mixing analysis as in class then gives the bound.",
  },
  {
    id: "2025C-Q4", source: "Exam", set: "2025 Moed C", number: "Q4", type: "Open",
    unit: 2, topic: "Schwartz-Zippel & PIT", subtag: "Branching Programs", difficulty: "Medium",
    prompt: "A branching program is 3×3 matrices A1,…,Am (entries are variables or rationals) computing the (1,1) entry of A1···Am. Decide (randomized, error < 0.1) whether two branching programs compute the same polynomial.",
    answer: "Both polynomials have degree ≤ m. Assign each variable a uniform value in {1,…,100m}, multiply the matrices, compare the (1,1) entries. By Schwartz-Zippel, if the polynomials differ the difference is non-zero and vanishes w.p. ≤ m/(100m) < 0.1.",
  },
  {
    id: "2025C-Q5", source: "Exam", set: "2025 Moed C", number: "Q5", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Union Bound", difficulty: "Hard",
    prompt: "A matrix A ∈ {0,1,2}^{n×n} is k-tertiary if for every b ∈ {0,1,2} and all |S|=|T| ≤ k, | #{(i,j)∈S×T : A_{ij}=b} − |S||T|/3 | ≤ 0.01|S||T|. Show a randomized poly-time algorithm outputting (w.p. ≥ 0.9) a k-tertiary matrix with k = C log n.",
    answer: "Choose each entry uniformly from {0,1,2}. For fixed S,T of size m and value b, the count has mean |S||T|/3; by Chernoff Pr[deviation ≥ 0.01|S||T|] ≤ e^{−cm²}. Over b ∈ {0,1,2} and ≤ n^{2m} choices of S,T, failure ≤ n^{2m}e^{−c'm²} = e^{2m ln n − c'm²}; pick C large so this is ≤ 1/(10n) at m = C log n, then union bound over m.",
  },

  // =====================================================================
  // Homework — Problem Set 1 (Unit 1)
  // =====================================================================
  {
    id: "HW1-Q1", source: "Homework", set: "Homework Set 1", number: "Q1", type: "Open",
    unit: 1, topic: "Schwartz-Zippel & PIT", subtag: "Proof", difficulty: "Hard",
    prompt: "Prove the Schwartz-Zippel lemma: for a non-zero degree-d polynomial f over Q and finite S, Pr[f(α)=0] ≤ d/|S| when α_i are independent uniform over S.",
    answer: "Induction on n. Base (n=1): a non-zero univariate degree-d polynomial has ≤ d roots. Step: write f = Σ_i x_nⁱ f_i(x1,…,x_{n-1}), top index k, f_k ≢ 0, deg f_k ≤ d−k. Two-stage sampling: Case A (f_k(α)=0) has prob ≤ (d−k)/|S| by induction; Case B (f_k≠0) leaves a non-zero degree-k univariate in x_n, prob ≤ k/|S|. Total ≤ d/|S|.",
  },
  {
    id: "HW1-Q2", source: "Homework", set: "Homework Set 1", number: "Q2", type: "Open",
    unit: 1, topic: "Algebraic Complexity", subtag: "Formula Size", difficulty: "Medium",
    prompt: "Prove that a formula of size s computes a polynomial of degree at most s.",
    answer: "Induction on s. Base: a leaf is a variable (deg 1) or scalar (deg 0) ≤ 1. Step: root is + or × with subformulas of size s1, s2, s1+s2+1=s. For +: deg = max ≤ s1+s2 < s. For ×: deg = deg F1 + deg F2 ≤ s1+s2 < s.",
  },
  {
    id: "HW1-Q3", source: "Homework", set: "Homework Set 1", number: "Q3", type: "Open",
    unit: 1, topic: "Karger Min-Cut", subtag: "Counting Argument", difficulty: "Medium",
    prompt: "Prove a connected undirected graph on n vertices has at most n(n−1)/2 minimum cuts.",
    answer: "Karger outputs any fixed min cut C w.p. ≥ 2/(n(n−1)). These events are disjoint, so 1 ≥ Σ_i Pr[output C_i] ≥ t·2/(n(n−1)), giving t ≤ n(n−1)/2 = C(n,2).",
  },
  {
    id: "HW1-Q4", source: "Homework", set: "Homework Set 1", number: "Q4", type: "Open",
    unit: 1, topic: "Schwartz-Zippel & PIT", subtag: "Determinant & Rank", difficulty: "Medium",
    prompt: "Given B1,…,Bk ∈ Q^{n×n}, decide in poly time (error ≤ 0.1) whether Σ x_i B_i is invertible for some x.",
    answer: "p(x) = det(Σ x_i B_i) is degree ≤ n (entries linear in x). Invertible combination exists iff p ≢ 0. Sample α_i ∈ {1,…,10n}, output YES iff det(Σ α_i B_i) ≠ 0. By Schwartz-Zippel error ≤ n/(10n) = 0.1.",
  },
  {
    id: "HW1-Q5", source: "Homework", set: "Homework Set 1", number: "Q5", type: "Open",
    unit: 1, topic: "Schwartz-Zippel & PIT", subtag: "Cauchy-Binet", difficulty: "Hard",
    prompt: "Given U, V ∈ R^{n×m} of rank n, decide (randomized) whether there is a common basis B ⊆ [m], |B|=n, with both U_B and V_B full rank.",
    answer: "Let Y = diag(y1,…,ym), D = UYVᵀ. By Cauchy-Binet, det(D) = Σ_{|B|=n} det(U_B)det(V_B) y_B. A common basis exists iff some coefficient is non-zero iff det(D) ≢ 0. Sample β_i ∈ {1,…,10n}, test det(U·diag(β)·Vᵀ) ≠ 0; Schwartz-Zippel error ≤ 0.1.",
  },
  {
    id: "HW1-Q6", source: "Homework", set: "Homework Set 1", number: "Q6", type: "Open",
    unit: 1, topic: "Chernoff Bound", subtag: "Union Bound", difficulty: "Hard",
    prompt: "Construct (w.p. ≥ 0.99) an ε-balanced set S ⊆ {−1,1}ⁿ of size O(n/ε²): for every non-empty I, |Σ_{v∈S} e_I(v)| ≤ ε|S|, where e_I(v)=Π_{i∈I}v_i.",
    answer: "Sample k = cn/ε² vectors uniformly. For fixed I, each e_I(v) is a fair ±1 coin, so by Chernoff Pr[|Σ| ≥ εk] ≤ 2e^{−ε²k/2}. Union bound over ≤ 2ⁿ subsets: Pr[bad] ≤ 2^{n+1}e^{−ε²k/2}; with k = cn/ε² the ε² cancels and for large c this is ≤ 0.01.",
  },

  // =====================================================================
  // Homework — Problem Set 2 (Units 1–2)
  // =====================================================================
  {
    id: "HW2-Q1", source: "Homework", set: "Homework Set 2", number: "Q1", type: "Open",
    unit: 2, topic: "Random Walks & Spectral Graphs", subtag: "Spectral Gap", difficulty: "Hard",
    prompt: "For a connected d-regular graph with B = ½I + ½A (normalized), prove the spectral gap bound λ2 ≤ 1 − 1/(4dn³). (Guided: large coordinate, sign flip, large edge difference, Rayleigh quotient.)",
    answer: "(a) Normalized eigenvector x of λ2 has some |x_i| ≥ 1/√n. (b) ⟨1,x⟩=0 forces some x_j ≤ 0. (c) A path from i to j (length < n) yields an edge with |x_u−x_v| ≥ 1/(n√n). (d) λ2 = 1 − ½ Σ B_{kℓ}(x_k−x_ℓ)² (using x_k x_ℓ = ½(x_k²+x_ℓ²−(x_k−x_ℓ)²)); the single edge (u,v) with B_{uv}=1/(2d) gives ≥ 1/(2dn³), so λ2 ≤ 1 − 1/(4dn³).",
  },
  {
    id: "HW2-Q2", source: "Homework", set: "Homework Set 2", number: "Q2", type: "Open",
    unit: 2, topic: "Random Walks & Spectral Graphs", subtag: "Expander Mixing", difficulty: "Hard",
    prompt: "Prove the Expander Mixing Lemma: for a d-regular graph with λ = max(λ2, |λn|), | |E(S,T)| − d|S||T|/n | ≤ λ√(|S||T|).",
    answer: "|E(S,T)| = 1_Sᵀ A 1_T. Expand 1_S, 1_T in the orthonormal eigenbasis: |E(S,T)| = Σ_i α_i β_i λ_i. The i=1 term (v1 = 1/√n, λ1=d) gives d|S||T|/n. Bound the rest by λ Σ_{i≥2}|α_i||β_i| ≤ λ·√|S|·√|T| via Cauchy-Schwarz and Parseval.",
  },
  {
    id: "HW2-Q3", source: "Homework", set: "Homework Set 2", number: "Q3", type: "Open",
    unit: 2, topic: "Isolation Lemma", subtag: "Common Basis (Search)", difficulty: "Hard",
    prompt: "Given U,V ∈ R^{n×m} of rank n, actually find a common basis B* (not just decide existence) using the Isolation Lemma.",
    answer: "Sample weights w_i ∈ {2,…,2m+1}, set y_i = 2^{w_i}, compute N = det(UYVᵀ). The largest power of 2 dividing N encodes w* = min common-basis weight. For each i, recompute with y_i → 2^{w_i−1}; i ∈ B* iff the min weight drops to w*−1. Verify |B|=n and full ranks. Isolation lemma gives a unique min-weight basis w.p. ≥ 1/2; repeat to amplify.",
  },
  {
    id: "HW2-Q4", source: "Homework", set: "Homework Set 2", number: "Q4", type: "Open",
    unit: 2, topic: "Matrix Multiplication", subtag: "Transitive Closure", difficulty: "Medium",
    prompt: "Given a digraph G on n vertices, compute the transitive closure G* in O(nᵚ log n).",
    answer: "Let M = I ∨ A (self-loops). (Mᵏ)_{ij} = 1 iff a walk of length ≤ k exists; paths have length ≤ n−1. Compute M^{2^⌈log n⌉} by repeated squaring (entries are monotone, so this equals M^{n−1}): O(log n) boolean matrix multiplications, each O(nᵚ), total O(nᵚ log n) = o(n³).",
  },
  {
    id: "HW2-Q5", source: "Homework", set: "Homework Set 2", number: "Q5", type: "Open",
    unit: 2, topic: "FFT", subtag: "Walsh-Hadamard", difficulty: "Medium",
    prompt: "Given x ∈ Rᴺ (N=2ⁿ), compute the Walsh-Hadamard transform H_n x in O(N log N).",
    answer: "Recursive WHT: split x = (x⁽¹⁾, x⁽²⁾), recursively compute y⁽¹⁾, y⁽²⁾, return (y⁽¹⁾+y⁽²⁾, y⁽¹⁾−y⁽²⁾). Correct by the block structure of H_n. T(N)=2T(N/2)+O(N)=O(N log N).",
  },
  {
    id: "HW2-Q6", source: "Homework", set: "Homework Set 2", number: "Q6", type: "Open",
    unit: 2, topic: "SDP & PSD", subtag: "PSD Characterizations", difficulty: "Medium",
    prompt: "Prove the three equivalent characterizations of a real symmetric PSD matrix A: (a) PSD ⇒ all eigenvalues ≥ 0; (b) eigenvalues ≥ 0 ⇒ A = BᵀB; (c) A = BᵀB ⇒ PSD.",
    answer: "(a) For eigenpair (λ,v): vᵀAv = λ‖v‖² ≥ 0 ⇒ λ ≥ 0. (b) Spectral theorem A = QDQᵀ with D ≥ 0; set B = √D·Qᵀ, then BᵀB = Q D Qᵀ = A. (c) Aᵀ = (BᵀB)ᵀ = A symmetric, and vᵀAv = ‖Bv‖² ≥ 0.",
  },

  // =====================================================================
  // Homework — Problem Set 3 (Unit 3)
  // =====================================================================
  {
    id: "HW3-Q1", source: "Homework", set: "Homework Set 3", number: "Q1", type: "Open",
    unit: 3, topic: "LP Formulation", subtag: "Diet Problem", difficulty: "Easy",
    prompt: "Salad bar LP: vegetable salad 50/kg, chicken salad 70/kg, with tomato/cucumber/chicken content and minimum requirements. Formulate and solve the LP.",
    answer: "min 50x + 70y s.t. 100x+130y ≥ 200, 150x+110y ≥ 350, 80y ≥ 120, x,y ≥ 0. Optimum x* = 37/30, y* = 3/2, cost 500/3 ≈ 166.67 (chicken and cucumber constraints tight, tomato slack).",
  },
  {
    id: "HW3-Q2", source: "Homework", set: "Homework Set 3", number: "Q2", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Complementary Slackness", difficulty: "Medium",
    prompt: "Write the dual of the salad-bar LP and solve it via complementary slackness; verify strong duality.",
    answer: "Dual: max 200p+350q+120r s.t. 100p+150q ≤ 50, 130p+110q+80r ≤ 70, p,q,r ≥ 0. Tomato slack ⇒ p=0; x*,y* > 0 ⇒ both dual constraints tight ⇒ q=1/3, r=5/12. Dual value 350/3 + 50 = 500/3 matches the primal.",
  },
  {
    id: "HW3-Q3", source: "Homework", set: "Homework Set 3", number: "Q3", type: "Open",
    unit: 3, topic: "LP Rounding", subtag: "Densest Subgraph", difficulty: "Hard",
    prompt: "Densest subgraph via LP: max Σ x_{uv} s.t. x_{uv} ≤ y_u, x_{uv} ≤ y_v, Σ y_v ≤ 1, all ≥ 0. Show the LP optimum equals max_S D(S) = |E_S|/|S| via a threshold-rounding argument.",
    answer: "LP ≥ max D(S): set y_v = 1/|S|, x_{uv}=1/|S| on S. WLOG x_{uv} = min(y_u,y_v). For threshold r∈[0,1], S(r)={v:y_v≥r}, E(r)={(u,v):x_{uv}≥r} satisfy u,v∈S(r) ⟺ (u,v)∈E(r). E_r[|S(r)|] = Σ y_v ≤ 1, E_r[|E(r)|] = Σ x_{uv} = α. If |E(r)| < α|S(r)| for all r then α < α — contradiction; so some r* gives D(S(r*)) ≥ α.",
  },
  {
    id: "HW3-Q4", source: "Homework", set: "Homework Set 3", number: "Q4", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Farkas Lemma", difficulty: "Medium",
    prompt: "Derive Farkas' Lemma I from Farkas' Lemma II: if {Ax=b, x≥0} is infeasible then ∃y with yᵀA ≥ 0 and yᵀb < 0.",
    answer: "Rewrite Ax=b, x≥0 as Cx ≤ d with C = (Aᵀ, −Aᵀ, −I)ᵀ, d = (bᵀ, −bᵀ, 0)ᵀ. Farkas II gives z = (z⁺,z⁻,z⁰) ≥ 0 with zᵀC = 0, zᵀd < 0. Then y = z⁺ − z⁻ satisfies yᵀA = (z⁰)ᵀ ≥ 0 and yᵀb < 0.",
  },
  {
    id: "HW3-Q5", source: "Homework", set: "Homework Set 3", number: "Q5", type: "Open",
    unit: 3, topic: "LP Duality", subtag: "Farkas Lemma", difficulty: "Hard",
    prompt: "Partial strong duality via Farkas: (a) (P) infeasible and (D) feasible ⇒ (D) unbounded; (b) (D) infeasible and (P) feasible ⇒ (P) unbounded.",
    answer: "(a) Farkas gives y' with (y')ᵀA ≥ 0, (y')ᵀb < 0. For dual-feasible y and λ>0, y−λy' stays feasible and bᵀ(y−λy') → +∞. (b) (D) infeasible ⇒ Farkas II gives z ≥ 0 with Az=0, cᵀz < 0; for primal-feasible x, x+λz is feasible and cᵀ(x+λz) → −∞.",
  },

  // =====================================================================
  // Homework — Problem Set 4 (Unit 4)
  // =====================================================================
  {
    id: "HW4-Q1", source: "Homework", set: "Homework Set 4", number: "Q1", type: "Open",
    unit: 4, topic: "Farkas & Ellipsoid", subtag: "Volume Bounds", difficulty: "Hard",
    prompt: "Volume bounds for the ellipsoid algorithm on Cx ≤ d. (a) Infeasibility is preserved under perturbation to Cx ≤ d + 2^{−L'}1. (b) A feasible system contains a ball of radius 2^{−2L'}.",
    answer: "(a) Farkas II gives z ≥ 0 with zᵀC=0, zᵀd<0; the same z certifies infeasibility of the perturbed system once L' ≥ poly(L) makes 2^{−L'}zᵀ1 < |zᵀd| (Cramer bounds the certificate's size). (b) Take a vertex x̂ (|x̂_j| ≤ 2^L); any x within 2^{−2L'} satisfies c_iᵀx ≤ d_i + ‖c_i‖·2^{−2L'} ≤ d_i + 2^{−L'} for L' ≥ poly(L). So feasible ⇒ volume ≥ 2^{−Θ(L'n)}.",
  },
  {
    id: "HW4-Q2", source: "Homework", set: "Homework Set 4", number: "Q2", type: "Open",
    unit: 4, topic: "Integer Programming", subtag: "IP Formulation", difficulty: "Medium",
    prompt: "Give IP formulations for (a) Max-Clique, (b) Subset-Sum, (c) Min-Coloring.",
    answer: "(a) max Σ x_v s.t. x_u+x_v ≤ 1 for every non-edge {u,v}∉E, x_v∈{0,1}. (b) find x∈{0,1}ⁿ s.t. Σ w_i x_i = t. (c) min Σ y_k s.t. Σ_k x_{v,k}=1 ∀v, x_{u,k}+x_{v,k} ≤ 1 ∀(u,v)∈E ∀k, x_{v,k} ≤ y_k, all ∈{0,1}.",
  },
  {
    id: "HW4-Q3", source: "Homework", set: "Homework Set 4", number: "Q3", type: "Open",
    unit: 4, topic: "LP Rounding", subtag: "Set Cover (Randomized)", difficulty: "Medium",
    prompt: "Randomized rounding for set cover. (a) IP/LP. (b) Expected size when including each S with prob x*_S. (c) Each element covered w.p. ≥ 1−1/e. (d) T = ln(n/ε) rounds give an O(log n)-approx covering all elements w.p. ≥ 1−ε.",
    answer: "(a) min Σ x_S s.t. Σ_{S∋i} x_S ≥ 1, relax to [0,1]. (b) E[|S|] = Σ x*_S = LPOPT ≤ OPT. (c) Pr[i uncovered] = Π(1−x*_S) ≤ e^{−Σ x*_S} ≤ 1/e. (d) Over T rounds, Pr[i uncovered] ≤ e^{−T} = ε/n; union bound ⇒ all covered w.p. ≥ 1−ε; expected size T·LPOPT ≤ OPT·ln(n/ε).",
  },
  {
    id: "HW4-Q4", source: "Homework", set: "Homework Set 4", number: "Q4", type: "Open",
    unit: 4, topic: "SDP & PSD", subtag: "Goemans-Williamson", difficulty: "Hard",
    prompt: "Show Max-2-LIN (constraints x_i x_j = ±1 over ±1 variables) has a 0.878-approximation via the Goemans-Williamson SDP + random hyperplane rounding.",
    answer: "SDP relaxes x_v to unit vectors; equality terms (1+⟨v_i,v_j⟩)/2, inequality terms (1−⟨v_i,v_j⟩)/2. Random hyperplane rounding: inequality constraints satisfied w.p. θ_{ij}/π, GW gives ratio ≥ α ≈ 0.878. Equality constraints use φ_{ij} = π−θ_{ij}, giving the same ratio. Hence E[ALG] ≥ α·SDPOPT ≥ α·OPT.",
  },
];

if (typeof module !== "undefined") {
  module.exports = { QUESTIONS, UNIT_NAMES };
}
