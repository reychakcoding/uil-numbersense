import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { TosModal, styles } from "./TosModal.jsx";

// PASTE YOUR 3 KEYS INSIDE THE QUOTES BELOW:
const SUPABASE_URL = "https://qhazamgltkvliucbcxqp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_VJzuVqPDm1Rwb29JxiSH5w_eU9SuLQq";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const UIL_TOPICS = [
  { id: "q1_20_arith", name: "Q1–20: Fast Arithmetic, FOIL & 11s/25s" },
  { id: "fractions_pct", name: "Q1–20: Fractions, Decimals & Percents" },
  { id: "bases_mods", name: "Q21–40: Number Bases & Modular Arithmetic" },
  { id: "sequences_series", name: "Q21–40: Sequences, Series & Summation" },
  { id: "quadratics_roots", name: "Q21–40: Quadratics, Sum & Product of Roots" },
  { id: "logs_exponents", name: "Q31–50: Logarithms & Exponent Laws" },
  { id: "combos_perms", name: "Q31–50: Combinations, Permutations & Sets" },
  { id: "trig_complex", name: "Q41–60: Trig Identities & Complex Numbers" },
  { id: "matrices_vectors", name: "Q51–70: Matrices, Determinants & Vectors" },
  { id: "calculus_limits", name: "Q61–80: Limits, Derivatives & Integrals" }
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
    const { data } = await supabase.from("user_progress").select("topic_stats").eq("user_id", userId).single();
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
Rules: Every question must be solvable mentally in 5-15 seconds using UIL shortcuts. Format answers cleanly (fractions as a/b, decimals, exact numbers).
Return ONLY valid JSON: {"questions":[{"number":1,"topicId":"q1_20_arith","question":"24 x 26 =","answer":"624","trick":"Multiply tens digit by next integer (2x3=6), attach units product (4x6=24)."}]}
Valid topicIds: ${UIL_TOPICS.map((t) => t.id).join(", ")}`;

    try {
      const response = await fetch("https://groq.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      if (!response.ok) throw new Error(data.error?.message || "HTTP " + response.status);
      const generatedQuestions = parsed.questions || [];
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill(""));
      setCurrentIndex(0);
      setUserInput("");
      setTimeLeft(timeLimitMinutes * 60);
      setView("test");
    } catch (err) {
      alert("Exact Error: "+ err.message);
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
      const isCorrect = finalAnswers[i].replace(/\s+/g, "").toLowerCase() === q.answer.replace(/\s+/g, "").toLowerCase();
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
            <span>{questions[currentIndex].question}</span>
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
                const isRight = uAns.replace(/\s+/g, "").toLowerCase() === q.answer.replace(/\s+/g, "").toLowerCase();
                return (
                  <div key={idx} style={{ ...styles.reviewItem, borderLeft: isRight ? "4px solid #16a34a" : "4px solid #dc2626" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.95rem" }}>
                      <b>({idx + 1}) {q.question}</b> &nbsp;|&nbsp; Yours: <b>{uAns}</b> &nbsp;|&nbsp; Key: <b>{q.answer}</b>
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
    </div>
  );
}

