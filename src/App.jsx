import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { TosModal, styles } from "./TosModal.jsx";

// PASTE YOUR 2 SUPABASE KEYS BELOW (GROQ IS HANDLED BY VERCEL):
const SUPABASE_URL = "https://qhazamgltkvliucbcxqp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_VJzuVqPDm1Rwb29JxiSH5w_eU9SuLQq";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const UIL_TOPICS = [
  const UIL_TOPICS = [
  // Q1–20: Fundamental Speed & Mental Arithmetic
  { id: "add_sub_left_right", name: "Q1–20: Multi-Digit Addition & Subtraction (Left-to-Right)" },
  { id: "pemdas_grouping", name: "Q1–20: Order of Operations & Strategic Grouping" },
  { id: "mult_11_111", name: "Q1–20: Multiplying by 11, 111 & 1111" },
  { id: "mult_101_1001", name: "Q1–20: Multiplying by 101, 1001 & 99/999" },
  { id: "mult_25_50_75", name: "Q1–20: Multiplying & Dividing by 5, 25, 50 & 75" },
  { id: "mult_125_625", name: "Q1–20: Multiplying & Dividing by 125 & 625" },
  { id: "mult_12_15_18", name: "Q1–20: Multiplying by 12, 15, 18 & 45" },
  { id: "mult_37_3367", name: "Q1–20: Multiplying by 37 (37 × 3 = 111) & 3367" },
  { id: "halving_doubling", name: "Q1–20: Halving & Doubling Multiplication" },
  { id: "two_digit_foil", name: "Q1–20: General Two-Digit FOIL Multiplication" },
  { id: "three_by_two_foil", name: "Q1–20: Three-Digit by Two-Digit Multiplication" },
  { id: "mult_over_100", name: "Q1–20: Multiplying Two Numbers Just Over 100 (e.g. 104 × 107)" },
  { id: "mult_under_100", name: "Q1–20: Multiplying Two Numbers Just Under 100 (e.g. 94 × 97)" },
  { id: "mult_straddle_100", name: "Q1–20: Multiplying One Over & One Under 100 (e.g. 96 × 105)" },
  { id: "mult_near_200_500", name: "Q1–20: Multiplying Numbers Near 200, 500 or 1000" },
  { id: "reverse_digit_prod", name: "Q1–20: Reverse-Digit Products (ab × ba)" },
  { id: "reverse_digit_sum_diff", name: "Q1–20: Reverse-Digit Sums (ab + ba) & Differences (ab − ba)" },
  { id: "same_tens_units10", name: "Q1–20: Same Tens Digit, Units Add to 10 (e.g. 43 × 47)" },
  { id: "same_units_tens10", name: "Q1–20: Same Units Digit, Tens Add to 10 (e.g. 36 × 76)" },
  { id: "tens_differ_1_units10", name: "Q1–20: Tens Differ by 1 & Units Add to 10 (e.g. 44 × 56)" },
  { id: "diff_of_squares", name: "Q1–20: Difference of Squares (a² − b²)" },
  { id: "equidistant_prod", name: "Q1–20: Equidistant Products ((a−d)(a+d) = a² − d²)" },
  { id: "square_end_5", name: "Q1–20: Squaring Numbers Ending in 5 (2-Digit & 3-Digit)" },
  { id: "square_near_50", name: "Q1–20: Squaring Numbers Near 50 (41² to 59²)" },
  { id: "square_near_100", name: "Q1–20: Squaring Numbers Near 100 (85² to 115²)" },
  { id: "square_two_digit", name: "Q1–20: Squaring Any Two-Digit Number (a² + 2ab + b²)" },
  { id: "cubes_memorized", name: "Q1–20: Cubes (1³ to 15³) & Sum/Diff of Cubes" },
  { id: "exact_sq_cube_roots", name: "Q1–20: Exact Square Roots & Cube Roots of Perfect Powers" },
  { id: "distributive_common", name: "Q1–20: Distributive Factoring (ab + ac = a(b + c))" },
  { id: "hidden_common_factor", name: "Q1–20: Hidden Common Factor Extraction (e.g. 18 × 27 + 36 × 11)" },
  { id: "frac_add_sub", name: "Q1–20: Fraction Addition & Subtraction (Butterfly / LCD)" },
  { id: "frac_mult_div", name: "Q1–20: Fraction Multiplication, Cross-Canceling & Division" },
  { id: "mixed_num_ops", name: "Q1–20: Mixed Number Addition, Subtraction & Multiplication" },
  { id: "whole_times_mixed", name: "Q1–20: Whole Number Times Mixed Number (e.g. 16 × 16 1/4)" },
  { id: "reciprocal_sum_ab_ba", name: "Q1–20: Fraction Reciprocal Sums (a/b + b/a = 2 + (a−b)²/ab)" },
  { id: "near_one_fractions", name: "Q1–20: Multiplying Fractions Near 1 (e.g. 14/15 × 15/16)" },
  { id: "frac_dec_pct_equiv", name: "Q1–20: Standard Fraction-Decimal-Percent Equivalents (6ths, 8ths, 12ths, 16ths)" },
  { id: "pure_repeating_dec", name: "Q1–20: Pure Repeating Decimals to Fractions (e.g. 0.3636...)" },
  { id: "mixed_repeating_dec", name: "Q1–20: Mixed-Prefix Repeating Decimals to Fractions (e.g. 0.12424...)" },
  { id: "percent_of_number", name: "Q1–20: Finding Percentages of Numbers (e.g. 37.5% of 64)" },
  { id: "percent_change_disc", name: "Q1–20: Percent Increase/Decrease, Markup & Successive Discounts" },
  { id: "simple_interest", name: "Q1–20: Simple Interest (I = Prt) & Percent Proportions" },
  { id: "roman_to_arabic", name: "Q1–20: Converting Roman Numerals to Arabic Numbers" },
  { id: "arabic_to_roman", name: "Q1–20: Converting Arabic Numbers to Roman Numerals" },
  { id: "roman_arithmetic", name: "Q1–20: Adding & Subtracting Roman Numerals" },
  { id: "metric_conversions", name: "Q1–20: Metric Prefix Conversions (mm, cm, m, km, g, L)" },
  { id: "customary_length_wt", name: "Q1–20: Customary Length & Weight (in, ft, yd, mi, oz, lb, ton)" },
  { id: "customary_volume", name: "Q1–20: Customary Capacity (tsp, tbsp, fl oz, cup, pt, qt, gal)" },
  { id: "area_vol_unit_conv", name: "Q1–20: Square & Cubic Unit Conversions (sq ft to sq yd, cu ft)" },
  { id: "time_temp_conv", name: "Q1–20: Time Conversions & Fahrenheit/Celsius (°F ↔ °C)" },

  // Q10–80: Estimation
  { id: "est_products_quot", name: "Q10–80: (*) Estimation of Large Products & Quotients" },
  { id: "est_roots_powers", name: "Q10–80: (*) Estimation of Square Roots, Cube Roots & Large Powers" },
  { id: "est_pi_e_series", name: "Q10–80: (*) Estimation Involving π, e, Factorials & Long Sums" },

  // Q21–40: Number Theory, Pre-Algebra & Statistics
  { id: "mean_median_mode", name: "Q1–30: Mean, Median, Mode & Range of Data Sets" },
  { id: "weighted_missing_avg", name: "Q21–40: Weighted Averages & Finding a Missing Score for Target Mean" },
  { id: "gcd_lcm_basic", name: "Q21–40: Finding GCD and LCM of Two or Three Numbers" },
  { id: "gcd_lcm_product", name: "Q21–40: GCD × LCM = a × b Identity Problems" },
  { id: "num_of_divisors", name: "Q21–40: Number of Positive Integral Divisors τ(n)" },
  { id: "sum_of_divisors", name: "Q21–40: Sum of Positive Integral Divisors σ(n)" },
  { id: "prod_of_divisors", name: "Q31–50: Product of Positive Integral Divisors (n^(τ(n)/2))" },
  { id: "euler_totient", name: "Q21–50: Euler's Totient Function φ(n) (Relatively Prime Count)" },
  { id: "prime_factor_count", name: "Q21–40: Prime Factorization, Distinct Prime Factors & Power of p in n!" },
  { id: "divisibility_rules", name: "Q21–40: Divisibility Rules (3, 4, 6, 7, 8, 9, 11, 12) & Missing Digits" },
  { id: "modular_remainders", name: "Q21–40: Modular Arithmetic & Remainder of Large Expressions" },
  { id: "units_digit_power", name: "Q21–40: Units Digit of aⁿ (Cyclicity of Last Digits)" },
  { id: "last_two_digits", name: "Q31–50: Last Two Digits of Powers (Mod 100 Shortcuts)" },
  { id: "base_10_to_b", name: "Q21–40: Converting Base 10 to Bases 2, 3, 4, 5, 6, 7, 8, 9, 12, 16" },
  { id: "base_b_to_10", name: "Q21–40: Converting Bases 2–16 into Base 10" },
  { id: "base_to_base_shortcut", name: "Q21–40: Direct Binary ↔ Octal ↔ Hexadecimal & Base b ↔ b²" },
  { id: "base_n_arithmetic", name: "Q21–40: Addition, Subtraction & Multiplication in Base-N" },
  { id: "ratios_proportions", name: "Q21–40: Ratios, Proportions & Map/Scale Problems" },
  { id: "direct_inverse_var", name: "Q21–40: Direct, Inverse & Joint Variation" },
  { id: "work_rate_pipes", name: "Q21–40: Combined Work Rate & Filling/Draining Pipe Problems" },
  { id: "distance_rate_time", name: "Q21–40: Distance-Rate-Time & Harmonic Mean Round-Trip Speed" },
  { id: "mixture_coin_age", name: "Q21–40: Mixture, Solution Concentration, Coin & Age Word Problems" },
  { id: "subsets_proper", name: "Q21–40: Number of Subsets (2ⁿ) & Proper Subsets (2ⁿ − 1)" },
  { id: "set_venn_union", name: "Q21–40: Set Union, Intersection & Two/Three-Circle Venn Diagrams" },
  { id: "fibonacci_lucas", name: "Q21–50: Fibonacci & Lucas Sequences (Nth Term & Sum Identities)" },

  // Q21–60: Algebra & Geometry
  { id: "slope_intercepts", name: "Q21–40: Slope, x/y-Intercepts & Parallel/Perpendicular Lines" },
  { id: "midpoint_distance", name: "Q21–40: Midpoint & Distance Between Two Points" },
  { id: "coord_triangle_area", name: "Q31–60: Area of a Triangle from Coordinate Vertices (Shoelace)" },
  { id: "linear_systems", name: "Q21–40: Solving 2×2 Systems of Linear Equations & Special Sums (x+y)" },
  { id: "abs_value_eq_ineq", name: "Q21–50: Absolute Value Equations, Inequalities & Integer Solutions" },
  { id: "quadratic_discrim", name: "Q21–50: Quadratic Discriminant (b² − 4ac) & Nature of Roots" },
  { id: "quadratic_vertex", name: "Q21–50: Parabola Vertex, Axis of Symmetry & Min/Max Value" },
  { id: "vieta_sum_prod", name: "Q21–50: Vieta's Formulas: Sum (−b/a) & Product (c/a) of Roots" },
  { id: "vieta_derived_roots", name: "Q31–60: Sum of Squares (r₁² + r₂²) & Reciprocals (1/r₁ + 1/r₂) of Roots" },
  { id: "remainder_factor_thm", name: "Q31–60: Polynomial Remainder Theorem & Factor Theorem" },
  { id: "cubic_vieta_roots", name: "Q41–70: Cubic Polynomial Vieta's (Sum, Pairwise Product, Product of Roots)" },
  { id: "exponent_laws", name: "Q31–50: Laws of Exponents, Negative & Fractional Exponents" },
  { id: "exponential_eqns", name: "Q31–50: Solving Exponential Equations by Common Base" },
  { id: "simplifying_radicals", name: "Q31–50: Simplifying Radicals, Rationalizing Denominators & Surd Ops" },
  { id: "nested_radicals", name: "Q31–60: Infinite & Finite Nested Radicals (√(a + √(a + ...)))" },
  { id: "log_evaluation", name: "Q31–60: Evaluating Logarithms & Change-of-Base Chains" },
  { id: "log_laws_eqns", name: "Q31–60: Log Addition/Subtraction Laws & Solving Log Equations" },
  { id: "arith_seq_series", name: "Q21–50: Arithmetic Sequences (Nth Term) & Arithmetic Series Sums" },
  { id: "geom_seq_series", name: "Q31–60: Geometric Sequences (Nth Term) & Finite Geometric Sums" },
  { id: "infinite_geom_series", name: "Q31–60: Infinite Geometric Series (a₁ / (1 − r)) & Telescoping Sums" },
  { id: "figurate_numbers", name: "Q31–60: Triangular, Square, Pentagonal, Hexagonal & Tetrahedral Numbers" },
  { id: "polygon_angles_diag", name: "Q21–50: Polygon Interior/Exterior Angles, Side Counts & Diagonals" },
  { id: "pythag_triples", name: "Q21–50: Pythagorean Triples & Right Triangle Missing Sides" },
  { id: "special_right_tri", name: "Q21–50: 30-60-90 & 45-45-90 Special Right Triangles" },
  { id: "triangle_area_heron", name: "Q31–60: Triangle Area, Equilateral Triangle Area & Heron's Formula" },
  { id: "inradius_circumradius", name: "Q41–70: Triangle Inradius (A/s) & Circumradius (abc/4A)" },
  { id: "circle_arcs_angles", name: "Q31–60: Circle Central/Inscribed Angles, Arcs & Sector Area/Arc Length" },
  { id: "power_of_point", name: "Q31–60: Circle Power of a Point (Intersecting Chords, Secants & Tangents)" },
  { id: "quad_trapezoid_area", name: "Q21–50: Area of Trapezoids, Rhombi, Kites & Regular Polygons" },
  { id: "solid_3d_vol_sa", name: "Q31–60: 3D Volume & Surface Area (Prisms, Cylinders, Pyramids, Cones, Spheres)" },

  // Q41–80: Combinatorics, Pre-Calculus, Linear Algebra & Calculus
  { id: "perms_combos_fact", name: "Q31–60: Factorials, Permutations (nPr) & Combinations (nCr)" },
  { id: "circular_word_perms", name: "Q41–70: Circular Permutations ((n−1)!) & Distinguishable Word Arrangements" },
  { id: "derangements_stars", name: "Q41–70: Derangements (!n), Stars & Bars, and Pigeonhole Principle" },
  { id: "probability_odds", name: "Q41–70: Dice, Card, Coin & Marble Probability and Odds" },
  { id: "expected_value", name: "Q41–70: Expected Value & Conditional Probability" },
  { id: "binomial_theorem", name: "Q41–70: Binomial Expansion Specific Terms & Sum of Coefficients" },
  { id: "trig_unit_circle", name: "Q41–70: Exact Unit Circle Trig Values & Radian/Degree Conversions" },
  { id: "inverse_trig", name: "Q41–70: Inverse Trig Principal Values (arcsin, arccos, arctan)" },
  { id: "trig_identities", name: "Q51–80: Pythagorean, Cofunction, Double-Angle & Half-Angle Identities" },
  { id: "law_sines_cosines", name: "Q51–80: Law of Sines, Law of Cosines & Trig Triangle Area (½ab sin C)" },
  { id: "complex_powers_ops", name: "Q41–70: Powers of i, Complex Arithmetic & Complex Conjugates" },
  { id: "complex_modulus_polar", name: "Q51–80: Complex Modulus |a + bi|, Argument & De Moivre's Theorem" },
  { id: "conics_circle_parab", name: "Q51–80: Conics: Circle Center/Radius & Parabola Focus/Directrix/Latus Rectum" },
  { id: "conics_ellipse_hyper", name: "Q51–80: Conics: Ellipse & Hyperbola Foci, Vertices, Eccentricity & Asymptotes" },
  { id: "matrices_2x2_3x3", name: "Q51–80: Matrix Operations, Trace, 2×2 & 3×3 Determinants & Cramer's Rule" },
  { id: "vectors_polar_param", name: "Q61–80: 2D/3D Vectors (Magnitude, Dot & Cross Product), Polar & Parametric Eqns" },
  { id: "limits_derivatives", name: "Q61–80: Limits (Algebraic & L'Hôpital's), Derivatives, Tangent Slope & Extrema" },
  { id: "definite_integrals", name: "Q61–80: Definite Integrals (Polynomial, Trig, Exponential) & Area Under Curves" }
];

];


export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [agreedTos, setAgreedTos] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);

  const [view, setView] = useState("setup");
  const [mode, setMode] = useState("normal");
  const [questionCount, setQuestionCount] = useState(40);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const [topicStats, setTopicStats] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserStats(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserStats(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserStats = async (userId) => {
    const { data } = await supabase.from("user_progress").select("topic_stats").eq("user_id", userId).maybeSingle();
    if (data?.topic_stats) setTopicStats(data.topic_stats);
  };

  const saveUserStats = async (userId, newStats) => {
     
    await supabase.from("user_progress").upsert({ user_id: userId, topic_stats: newStats }, { onConflict: "user_id" });
  };

  useEffect(() => {
    if (view !== "test") return;
    if (timeLeft <= 0) { finishTest(); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  useEffect(() => {
    if (view === "test" && inputRef.current) inputRef.current.focus();
  }, [view, currentIndex]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthMessage("");
    if (isSignUp && !agreedTos) {
      setAuthMessage("Please check the box to agree to the Terms of Service.");
      return;
    }
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setAuthMessage(error ? error.message : "Account created! You can now sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthMessage(error.message);
    }
  };

  const getTargetTopics = () => {
    if (mode === "normal") return UIL_TOPICS.map((t) => t.name);
    const scored = UIL_TOPICS.map((t) => {
      const s = topicStats[t.id] || { correct: 0, attempted: 0 };
      const acc = s.attempted === 0 ? 0.5 : s.correct / s.attempted;
      return { ...t, acc };
    });
    scored.sort((a, b) => a.acc - b.acc);
    return scored.slice(0, 4).map((t) => t.name);
  };

  const startTest = async () => {
    setLoading(true);
    const targetTopics = getTargetTopics();
        const prompt = `Generate ${questionCount} authentic Texas UIL High School Number Sense mental math problems.
Mode: ${mode.toUpperCase()}. Focus topics: ${targetTopics.join(", ")}.

CRITICAL RULES FOR AUTHENTIC UIL COVERAGE & ZERO CLUSTERING:
1. NEVER repeat the same topicId or trick back-to-back. Every consecutive question MUST switch to a completely different shortcut and topicId from the previous question.
2. In NORMAL mode, spread questions evenly across the full Q1–Q80 UIL progression proportional to ${questionCount} questions:
   - First 25%: basic ops/PEMDAS, 11s/101s/111s, 25s/50s/75s/125s, 12s/15s/18s/37s, 2-digit FOIL, mult near 100/200, reverse-digit products, same tens/units add to 10, same units/tens add to 10, diff of squares, squaring ending in 5 or near 50/100, cubes/roots, distributive factoring, fraction/mixed ops, a/b + b/a, repeating decimals, % change, Roman numerals, unit conversions.
   - Second 25%: mean/median/mode, GCD/LCM, number & sum of divisors, Euler's totient, divisibility/mods, units digit of powers, base conversions & base-N arithmetic, ratios/variation, work/rate/mixture, sets/subsets, Fibonacci/Lucas sequences, slope/distance, coordinate triangle area, abs value/inequalities.
   - Third 25%: quadratic discriminant/vertex, Vieta's root formulas, polynomial remainder/factor theorems, fractional exponents/surds, nested radicals, logarithms, arithmetic/geometric/infinite/telescoping series, figurate numbers, polygon angles/diagonals, Pythagorean triples/special triangles, Heron's/inradius/circumradius, circle theorems, 3D volume/surface area.
   - Final 25%: nCr/nPr/circular perms, derangements/stars & bars, probability/expected value, binomial theorem, unit circle/inverse trig, trig identities/Law of Sines/Cosines, complex numbers/De Moivre's, conic sections, matrix ops/2x2 & 3x3 determinants/Cramer's rule, 2D/3D vectors, polar/parametric equations, limits, derivatives, definite integrals.
3. In ADAPTIVE mode, heavily shuffle and interleave across the selected focus topics so no two adjacent questions use the same formula.
4. Every 10th question (Q10, Q20, Q30, etc.) MUST be a UIL estimation problem prefixed with "(*)" (e.g., "(*) 418 x 592 =") using topicId "estimation_star", with the exact calculated number as the answer.
5. Every problem must be solvable mentally in 5–15 seconds using standard UIL shortcuts. Format answers cleanly (simplified improper fractions as a/b, exact decimals, or integers).

Return ONLY valid JSON: {"questions":[{"number":1,"topicId":"mult_12_15_18_37","question":"37 x 27 =","answer":"999","trick":"37 x 3 = 111, so 37 x 27 = 111 x 9 = 999."}]}
Valid topicIds: ${UIL_TOPICS.map((t) => t.id).join(", ")}`;


    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      const parsed = JSON.parse(data.choices[0].message.content);
      const generatedQuestions = parsed.questions || [];
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill(""));
      setCurrentIndex(0);
      setUserInput("");
      setTimeLeft(timeLimitMinutes * 60);
      setView("test");
    } catch (err) {
      alert("Exact Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updated = [...answers];
      updated[currentIndex] = userInput.trim();
      setAnswers(updated);
      setUserInput("");
      if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1);
      else finishTest(updated);
    }
  };
  const parseNumericValue = (str) => {
    const clean = str.trim();
    if (!clean) return NaN;
    // Mixed number like "1 1/2" or "-2 3/4"
    const mixed = clean.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) {
      const whole = parseFloat(mixed);
      const frac = parseFloat(mixed) / parseFloat(mixed);
      return whole < 0 ? whole - frac : whole + frac;
    }
    // Simple fraction like "3/2" or "-5/8"
    const frac = clean.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (frac) return parseFloat(frac) / parseFloat(frac);
    // Standard integer or decimal (strip commas)
    const num = Number(clean.replace(/,/g, ""));
    return isNaN(num) ? NaN : num;
  };

  const checkAnswer = (userRaw, keyRaw, questionText = "") => {
    const uClean = userRaw.replace(/\s+/g, "").toLowerCase();
    const kClean = keyRaw.replace(/\s+/g, "").toLowerCase();
    if (!uClean) return false;

    const isEstimation = questionText.includes("(*)");
    const uNum = parseNumericValue(userRaw);
    const kNum = parseNumericValue(keyRaw);

    if (isEstimation && !isNaN(uNum) && !isNaN(kNum)) {
      if (kNum === 0) return uNum === 0;
      const relError = Math.abs(uNum - kNum) / Math.abs(kNum);
      return relError <= 0.05;
    }

    if (!isNaN(uNum) && !isNaN(kNum)) {
      return Math.abs(uNum - kNum) < 1e-6;
    }
    return uClean === kClean;
  };

  const calculateUILGrade = (finalAnswers) => {
    let lastAttemptedIdx = -1;
    for (let i = finalAnswers.length - 1; i >= 0; i--) {
      if (finalAnswers[i] !== "") { lastAttemptedIdx = i; break; }
    }
    let correct = 0;
    let wrongOrSkipped = 0;
    const newStats = { ...topicStats };
    for (let i = 0; i <= lastAttemptedIdx; i++) {
      const q = questions[i];
      const isCorrect = checkAnswer(finalAnswers[i], q.answer, q.question);
      if (!newStats[q.topicId]) newStats[q.topicId] = { correct: 0, attempted: 0 };
      newStats[q.topicId].attempted += 1;
      if (isCorrect) { correct++; newStats[q.topicId].correct += 1; }
      else wrongOrSkipped++;
    }
    return { score: correct * 5 - wrongOrSkipped * 4, correct, wrongOrSkipped, lastAttemptedIdx, newStats };
  };

  const finishTest = async (submittedAnswers = answers) => {
    const res = calculateUILGrade(submittedAnswers);
    setTopicStats(res.newStats);
    setView("results");
    if (user) await saveUserStats(user.id, res.newStats);
  };
  const renderMath = (text) => {
    if (!text) return "";
    const str = String(text);

    if (typeof window !== "undefined" && window.katex) {
      try {
        const latexReady = str
          .replace(/\$+/g, "")
          .replace(/(\d)\s*[xX]\s*(\d)/g, "$1 \\times $2")
          .replace(/×/g, "\\times ")
          .replace(/÷/g, "\\div ");

        const html = window.katex.renderToString(latexReady, {
          throwOnError: false,
          displayMode: false
        });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span>{str}</span>;
      }
    }

    return <span>{str}</span>;
  };

  const formatTime = (secs) => `${Math.floor(secs / 60)}:${secs % 60 < 10 ? "0" : ""}${secs % 60}`;
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, maxWidth: "440px", margin: "40px auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={styles.badge}>UIL High School</span>
          </div>
          <h1 style={{ fontSize: "1.6rem", margin: "8px 0 6px", letterSpacing: "-0.02em" }}>Number Sense Trainer</h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem", marginTop: 0, marginBottom: "20px" }}>
            {isSignUp ? "Create an account with your Gmail to save progress." : "Sign in to load your adaptive speed profile."}
          </p>
          <form onSubmit={handleAuth}>
            <input type="email" placeholder="Gmail address" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            <input type="password" placeholder="Password (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...styles.input, marginTop: "10px" }} />
            {isSignUp && (
              <label style={{ display: "flex", gap: "8px", marginTop: "14px", fontSize: "0.85rem", color: "#475569" }}>
                <input type="checkbox" checked={agreedTos} onChange={(e) => setAgreedTos(e.target.checked)} />
                <span>I agree to the <u style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => setShowTosModal(true)}>Terms of Service & Privacy Policy</u></span>
              </label>
            )}
            <button type="submit" style={styles.primaryBtn}>{isSignUp ? "Create Account" : "Sign In"}</button>
          </form>
          {authMessage && <p style={{ color: "#dc2626", fontSize: "0.88rem", marginTop: "12px" }}>{authMessage}</p>}
          <p style={styles.smallText} onClick={() => { setIsSignUp(!isSignUp); setAuthMessage(""); }}>
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up with Gmail"}
          </p>
        </div>
        {showTosModal && <TosModal onClose={() => setShowTosModal(false)} />}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <span>UIL Number Sense</span>
          <span style={styles.badge}>HS Adaptive</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button style={view === "setup" || view === "test" ? styles.navBtnActive : styles.navBtn} onClick={() => setView("setup")}>Practice</button>
          <button style={view === "analytics" ? styles.navBtnActive : styles.navBtn} onClick={() => setView("analytics")}>Analytics</button>
          <button style={styles.navBtn} onClick={() => setShowTosModal(true)}>ToS</button>
          <button style={styles.navBtn} onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      </nav>
      {showTosModal && <TosModal onClose={() => setShowTosModal(false)} />}

      {view === "setup" && (
        <div style={styles.card}>
          <h2 style={{ marginTop: 0, fontSize: "1.35rem", letterSpacing: "-0.02em" }}>Configure Speed Drill</h2>
          <label style={styles.label}>Training Mode</label>
          <div style={styles.row}>
            <button style={mode === "normal" ? styles.activeToggle : styles.toggle} onClick={() => setMode("normal")}>
              <div>Standard UIL Progression</div>
              <div style={{ fontSize: "0.8rem", fontWeight: "400", opacity: 0.8, marginTop: "4px" }}>Follows Q1 → Q80 topic sequence</div>
            </button>
            <button style={mode === "adaptive" ? styles.activeToggle : styles.toggle} onClick={() => setMode("adaptive")}>
              <div>Adaptive Weakness Focus</div>
              <div style={{ fontSize: "0.8rem", fontWeight: "400", opacity: 0.8, marginTop: "4px" }}>Targets your lowest-accuracy tricks</div>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={styles.label}>Questions (5–80)</label>
              <input type="number" min="5" max="80" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Time Limit (Minutes)</label>
              <input type="number" min="1" max="30" value={timeLimitMinutes} onChange={(e) => setTimeLimitMinutes(Number(e.target.value))} style={styles.input} />
            </div>
          </div>
          <button style={styles.primaryBtn} onClick={startTest} disabled={loading}>{loading ? "Generating UIL Problems..." : "Start Timed Test"}</button>
        </div>
      )}

      {view === "test" && questions[currentIndex] && (
        <div style={styles.card}>
          <div style={styles.testHeader}>
            <span style={{ fontWeight: "700", color: "#475569" }}>Problem {currentIndex + 1} of {questions.length}</span>
            <span style={{ ...styles.timerPill, color: timeLeft < 30 ? "#dc2626" : "#0f172a", background: timeLeft < 30 ? "#fef2f2" : "#f1f5f9" }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div style={styles.questionBox}>
            <span style={styles.qNum}>({currentIndex + 1})</span>
            <span>{renderMath(questions[currentIndex].question)}</span>
          </div>
          <input ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Enter answer..." style={styles.answerInput} />
          <div style={styles.row}>
            <small style={{ color: "#64748b" }}>Press <b>Enter</b> to submit & advance immediately (leave blank to skip).</small>
            <button style={styles.dangerBtn} onClick={() => finishTest()}>Finish Early</button>
          </div>
        </div>
      )}

      {view === "results" && (() => {
        const res = calculateUILGrade(answers);
        return (
          <div style={styles.card}>
            <div style={styles.scoreBanner}>
              <div>
                <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.75 }}>Official UIL Score (+5 / -4)</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "2.5rem", fontWeight: "800" }}>{res.score}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: "0.9rem", lineHeight: "1.6" }}>
                <div>Stopped at <b>Q{res.lastAttemptedIdx + 1}</b></div>
                <div>Correct: <b>{res.correct}</b> (+{res.correct * 5}) • Misses: <b>{res.wrongOrSkipped}</b> (-{res.wrongOrSkipped * 4})</div>
              </div>
            </div>
            <div style={styles.reviewList}>
              {questions.slice(0, res.lastAttemptedIdx + 1).map((q, idx) => {
                const uAns = answers[idx] || "(Skipped)";
                const isRight = checkAnswer(answers[idx] || "", q.answer, q.question);
                return (
                  <div key={idx} style={{ ...styles.reviewItem, borderLeft: isRight ? "4px solid #16a34a" : "4px solid #dc2626" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.95rem" }}>
                      <b>({idx + 1}) {renderMath(q.question)}</b> &nbsp;|&nbsp; Yours: <b>{uAns}</b> &nbsp;|&nbsp; Key: <b>{renderMath(q.answer)}</b>
                    </div>
                    {!isRight && <div style={{ fontSize: "0.85rem", color: "#475569", marginTop: "4px" }}>Shortcut: {q.trick}</div>}
                  </div>
                );
              })}
            </div>
            <div style={styles.row}>
              <button style={styles.primaryBtn} onClick={startTest}>Run Another {mode === "adaptive" ? "Adaptive" : "Standard"} Test</button>
              <button style={{ ...styles.navBtn, marginTop: "22px", padding: "13px 18px" }} onClick={() => setView("analytics")}>Analytics</button>
            </div>
          </div>
        );
      })()}

      {view === "analytics" && (
        <div style={styles.card}>
          <h2 style={{ marginTop: 0, fontSize: "1.35rem", letterSpacing: "-0.02em" }}>Topic Mastery & Priority Drills</h2>
          <p style={{ color: "#64748b", fontSize: "0.92rem", marginTop: 0 }}>Adaptive mode automatically prioritizes your lowest-accuracy UIL topic bands.</p>
          {UIL_TOPICS.map((topic) => {
            const stat = topicStats[topic.id] || { correct: 0, attempted: 0 };
            const pct = stat.attempted === 0 ? null : Math.round((stat.correct / stat.attempted) * 100);
            const status = pct === null ? "Untested" : pct >= 80 ? "Strong" : pct >= 50 ? "Needs Speed" : "Priority Practice";
            const color = pct === null ? "#64748b" : pct >= 80 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
            return (
              <div key={topic.id} style={styles.statRow}>
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>{topic.name}</strong>
                  <div style={{ fontSize: "0.82rem", color: "#64748b" }}>{stat.correct} / {stat.attempted} solved</div>
                </div>
                <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>
                  <span style={{ fontWeight: "700", color }}>{pct !== null ? `${pct}%` : "--"} · {status}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
            <footer style={{ textAlign: "center", marginTop: "32px", paddingBottom: "16px", fontSize: "0.85rem", color: "#64748b" }}>
        Made by <strong style={{ color: "#0f172a" }}>Reyansh Chakka</strong>
      </footer>

    </div>
  );
}
