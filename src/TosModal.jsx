import React from "react";

export function TosModal({ onClose }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#0f172a" }}>Terms of Service & Privacy</h3>
          <span style={styles.badge}>UIL Trainer</span>
        </div>
        <div style={styles.tosScroll}>
          <p style={{ marginTop: 0 }}><b>1. Educational Purpose:</b> This platform generates AI-assisted mental math drills modeled after Texas UIL High School Number Sense exams. It is an independent practice tool and is not officially affiliated with UIL or TMSCA.</p>
          <p><b>2. AI Content Disclaimer:</b> Problems and mental shortcuts are generated dynamically by AI. Occasional mathematical or formatting variations may occur.</p>
          <p><b>3. Account & Data Privacy:</b> Your email address is used strictly for authentication and storing your adaptive topic accuracy in Supabase. Your personal information is never sold or shared.</p>
          <p style={{ marginBottom: 0 }}><b>4. Fair Use:</b> Users agree not to scrape, automate, or abuse the question generation endpoints.</p>
        </div>
        <button style={styles.primaryBtn} onClick={onClose}>
          Got It
        </button>
      </div>
    </div>
  );
}

export const styles = {
  container: { maxWidth: "820px", margin: "0 auto", padding: "24px 20px" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", marginBottom: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" },
  brand: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "800", fontSize: "1.05rem", color: "#0f172a", letterSpacing: "-0.02em" },
  badge: { fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", padding: "3px 8px", borderRadius: "999px", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
  navBtn: { padding: "7px 13px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#f8fafc", color: "#334155", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" },
  navBtnActive: { padding: "7px 13px", borderRadius: "8px", border: "1px solid #0f172a", background: "#0f172a", color: "#ffffff", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" },
  card: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 20px -2px rgba(15,23,42,0.06)" },
  label: { display: "block", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", color: "#475569", marginTop: "20px", marginBottom: "8px" },
  row: { display: "flex", gap: "12px", justifyContent: "space-between", alignItems: "center", marginTop: "14px" },
  toggle: { flex: 1, padding: "14px 16px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "#f8fafc", color: "#334155", fontSize: "0.95rem", fontWeight: "600", cursor: "pointer", textAlign: "left" },
  activeToggle: { flex: 1, padding: "14px 16px", border: "2px solid #2563eb", borderRadius: "12px", background: "#eff6ff", color: "#1e3a8a", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", textAlign: "left" },
  input: { width: "100%", padding: "11px 14px", fontSize: "1rem", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a" },
  primaryBtn: { marginTop: "22px", width: "100%", padding: "13px 18px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "10px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", letterSpacing: "-0.01em" },
  dangerBtn: { padding: "8px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" },
  testHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", marginBottom: "24px" },
  timerPill: { fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", fontWeight: "700", padding: "6px 14px", borderRadius: "999px", background: "#f1f5f9", color: "#0f172a" },
  questionBox: { fontFamily: "'JetBrains Mono', monospace", fontSize: "2rem", fontWeight: "700", padding: "36px 24px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", textAlign: "center", marginBottom: "20px", color: "#0f172a" },
  qNum: { color: "#94a3b8", marginRight: "12px", fontSize: "1.4rem" },
  answerInput: { width: "100%", padding: "16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "1.5rem", fontWeight: "700", textAlign: "center", borderRadius: "12px", border: "2px solid #2563eb", background: "#ffffff", color: "#0f172a" },
  scoreBanner: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "#0f172a", color: "#ffffff", borderRadius: "14px", marginBottom: "20px" },
  reviewList: { maxHeight: "360px", overflowY: "auto", marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" },
  reviewItem: { padding: "12px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" },
  statRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 },
  modalContent: { background: "#ffffff", padding: "28px", borderRadius: "16px", maxWidth: "500px", width: "92%", boxShadow: "0 20px 25px -5px rgba(15,23,42,0.15)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  tosScroll: { maxHeight: "230px", overflowY: "auto", fontSize: "0.88rem", lineHeight: "1.55", color: "#475569", border: "1px solid #e2e8f0", background: "#f8fafc", padding: "14px", borderRadius: "10px" },
  smallText: { marginTop: "14px", fontSize: "0.875rem", color: "#2563eb", fontWeight: "600", cursor: "pointer", textAlign: "center" }
};
