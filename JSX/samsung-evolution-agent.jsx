import { useState, useRef, useEffect } from "react";

const PHONES = [
  {
    id: "s23",
    name: "Galaxy S23",
    year: 2023,
    color: "#4FC3F7",
    chip: "Snapdragon 8 Gen 2",
    ram: "8GB",
    storage: "128/256GB",
    display: "6.1\" Dynamic AMOLED 2X, 120Hz",
    camera: "50MP 트리플 카메라",
    battery: "3900mAh",
    os: "Android 13 / One UI 5.1",
    ai: "기본 AI 보조",
    highlight: "최적화된 Snapdragon 8 Gen 2 For Galaxy",
    score: 62,
    features: ["Nightography 카메라", "Expert RAW", "Bixby 음성인식", "AR Zone"],
    emoji: "📱",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "s24",
    name: "Galaxy S24",
    year: 2024,
    color: "#00E5FF",
    chip: "Snapdragon 8 Gen 3",
    ram: "8GB",
    storage: "128/256GB",
    display: "6.2\" Dynamic AMOLED 2X, 120Hz",
    camera: "50MP 트리플 카메라 + AI 줌",
    battery: "4000mAh",
    os: "Android 14 / One UI 6.1",
    ai: "Galaxy AI (온디바이스 + 클라우드)",
    highlight: "Galaxy AI 시대의 서막",
    score: 73,
    features: ["Circle to Search", "라이브 번역", "채팅 어시스트", "노트 어시스트"],
    emoji: "🤖",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "s25",
    name: "Galaxy S25",
    year: 2025,
    color: "#69F0AE",
    chip: "Snapdragon 8 Elite",
    ram: "12GB",
    storage: "128/256/512GB",
    display: "6.2\" Dynamic LTPO AMOLED 2X, 1~120Hz",
    camera: "50MP 트리플 + 전면 12MP",
    battery: "4000mAh",
    os: "Android 15 / One UI 7",
    ai: "Galaxy AI 2.0 + Gemini 통합",
    highlight: "Gemini 네이티브 통합 & 에이전트 AI",
    score: 84,
    features: ["Now Brief/Bar", "Cross-app Actions", "AI 영상편집", "Sketch to Image"],
    emoji: "✨",
    gradient: "from-emerald-400 to-cyan-500",
  },
  {
    id: "s26",
    name: "Galaxy S26",
    year: 2026,
    color: "#FF6E40",
    chip: "Snapdragon 8 Elite 2 (예상)",
    ram: "12/16GB",
    storage: "256/512GB/1TB",
    display: "6.3\" Dynamic LTPO AMOLED 3X, 1~144Hz",
    camera: "200MP 멀티포컬 + AI 프로세싱",
    battery: "4500mAh (초고속 충전 65W)",
    os: "Android 16 / One UI 8",
    ai: "Galaxy AI 3.0 + 멀티모달 에이전트",
    highlight: "멀티모달 AI 퍼스트 디바이스",
    score: 91,
    features: ["AI 실시간 영상통역", "홀로그램 UI", "뇌파 센서 (연구용)", "자율 배터리 최적화"],
    emoji: "🔮",
    gradient: "from-orange-400 to-red-500",
    isFuture: true,
  },
  {
    id: "s27",
    name: "Galaxy S27",
    year: 2027,
    color: "#E040FB",
    chip: "Exynos 2700 + Neural NPU (예상)",
    ram: "16/24GB",
    storage: "512GB/1TB/2TB",
    display: "6.4\" Under-Glass OLED, 1~165Hz 폴더블 연동",
    camera: "300MP 어레이 + 광학 AI 줌 ×50",
    battery: "5000mAh (무선 역충전 강화)",
    os: "Android 17 / One UI 9",
    ai: "Galaxy AI 4.0 (완전 자율 에이전트)",
    highlight: "완전 자율 AI 에이전트 & 확장현실 통합",
    score: 98,
    features: ["자율 에이전트 태스크 실행", "AR 글래스 연동", "감성 AI 인터랙션", "DNA 기반 헬스 분석"],
    emoji: "🚀",
    gradient: "from-purple-500 to-pink-500",
    isFuture: true,
  },
];

const SYSTEM_PROMPT = `당신은 삼성 갤럭시 S 시리즈 플래그십 스마트폰 전문 분석 에이전트입니다.
S23부터 S27까지의 진화를 깊이 있게 설명합니다.

다음은 각 모델의 핵심 데이터입니다:
- S23 (2023): Snapdragon 8 Gen 2, Galaxy AI 이전 시대, Nightography 카메라
- S24 (2024): Snapdragon 8 Gen 3, Galaxy AI 론칭, Circle to Search, 라이브 번역
- S25 (2025): Snapdragon 8 Elite, Galaxy AI 2.0 + Gemini 통합, Now Brief/Bar, Cross-app Actions
- S26 (2026, 예상): Snapdragon 8 Elite 2, Galaxy AI 3.0, 멀티모달 에이전트, 200MP 카메라
- S27 (2027, 예상): Exynos 2700 + 차세대 NPU, Galaxy AI 4.0 완전 자율 에이전트, AR 글래스 연동

분석 시 다음을 포함하세요:
1. 기술적 진화의 핵심 포인트
2. AI 기능의 세대별 발전
3. 사용자 경험 변화
4. 미래 전망 (S26, S27은 예측/추정임을 명시)

답변은 한국어로, 명확하고 흥미롭게 해주세요. 마크다운 형식을 사용하되 간결하게 답변하세요.`;

export default function SamsungEvolutionAgent() {
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "안녕하세요! 저는 갤럭시 S 시리즈 진화 분석 에이전트입니다 🤖\n\nS23부터 S27까지의 플래그십 여정을 함께 탐구해봐요. 카드를 선택하거나 질문을 입력해보세요!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = [
    "S23 → S27 가장 큰 변화는?",
    "Galaxy AI는 어떻게 진화했나요?",
    "카메라 발전 과정 요약",
    "S26/S27 예측 근거는?",
  ];

  const callClaude = async (userMsg, context = "") => {
    setLoading(true);
    const fullMsg = context ? `${context}\n\n질문: ${userMsg}` : userMsg;
    const history = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: fullMsg }],
        }),
      });
      const data = await response.json();
      const reply = data.content?.map((c) => c.text || "").join("") || "응답을 받지 못했습니다.";
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userMsg },
        { role: "assistant", content: reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userMsg },
        { role: "assistant", content: "오류가 발생했습니다. 다시 시도해주세요." },
      ]);
    }
    setLoading(false);
  };

  const handlePhoneSelect = (phone) => {
    if (compareMode) {
      setCompareList((prev) =>
        prev.find((p) => p.id === phone.id)
          ? prev.filter((p) => p.id !== phone.id)
          : prev.length < 3
          ? [...prev, phone]
          : prev
      );
    } else {
      setSelected(selected?.id === phone.id ? null : phone);
      if (selected?.id !== phone.id) {
        callClaude(
          `${phone.name} (${phone.year})의 핵심 혁신과 이전 모델 대비 발전 포인트를 3가지로 요약해주세요.`,
        );
      }
    }
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    callClaude(input.trim());
    setInput("");
  };

  const handleCompare = () => {
    if (compareList.length < 2) return;
    const names = compareList.map((p) => p.name).join(", ");
    callClaude(`${names}를 다음 항목으로 비교 분석해주세요: 성능, AI 기능, 카메라, 배터리, 혁신성`);
  };

  const formatMessage = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-bold text-cyan-300 mt-2">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return <p key={i} className="ml-3 text-slate-300">• {line.slice(2)}</p>;
      }
      if (/^\d+\./.test(line)) {
        return <p key={i} className="ml-3 text-slate-300">{line}</p>;
      }
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-slate-300">
            {parts.map((p, j) => j % 2 === 1 ? <span key={j} className="font-semibold text-cyan-200">{p}</span> : p)}
          </p>
        );
      }
      return line ? <p key={i} className="text-slate-300">{line}</p> : <br key={i} />;
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Rajdhani', 'Noto Sans KR', sans-serif",
        background: "linear-gradient(135deg, #050a18 0%, #0a1628 50%, #050a18 100%)",
        minHeight: "100vh",
        color: "#e2e8f0",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a1628; }
        ::-webkit-scrollbar-thumb { background: #1e40af; border-radius: 2px; }
        .phone-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .phone-card:hover { transform: translateY(-8px) scale(1.02); }
        .phone-card.selected { transform: translateY(-12px) scale(1.03); }
        .score-bar { transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .glow-text { text-shadow: 0 0 20px currentColor; }
        .grid-bg {
          background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .chat-bubble-in { animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .timeline-line { background: linear-gradient(to right, #4FC3F7, #00E5FF, #69F0AE, #FF6E40, #E040FB); }
        .compare-btn { transition: all 0.2s; }
        .compare-btn:hover { transform: scale(1.05); }
      `}</style>

      {/* Header */}
      <div
        className="grid-bg"
        style={{
          borderBottom: "1px solid rgba(0,229,255,0.15)",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "linear-gradient(135deg, #00E5FF, #7B2FBE)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🛰️
            </div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#00E5FF",
                fontFamily: "'Rajdhani', sans-serif",
              }}
              className="glow-text"
            >
              GALAXY EVOLUTION AGENT
            </h1>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", letterSpacing: "0.12em" }}>
            S23 → S27 · FLAGSHIP INTELLIGENCE SIMULATION
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => { setCompareMode(!compareMode); setCompareList([]); }}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: `1px solid ${compareMode ? "#FF6E40" : "rgba(0,229,255,0.3)"}`,
              background: compareMode ? "rgba(255,110,64,0.15)" : "rgba(0,229,255,0.08)",
              color: compareMode ? "#FF6E40" : "#00E5FF",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {compareMode ? "⊗ 비교 OFF" : "⊕ 비교 모드"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 85px)" }}>
        {/* Left Panel: Phone Cards */}
        <div
          style={{
            width: "58%",
            padding: "24px 20px",
            overflowY: "auto",
          }}
        >
          {/* Timeline */}
          <div style={{ marginBottom: 28, padding: "0 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}>
              <div className="timeline-line" style={{ height: 3, flex: 1, borderRadius: 2, opacity: 0.7 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              {PHONES.map((p) => (
                <div key={p.id} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: p.color, fontWeight: 600, letterSpacing: "0.05em" }}>
                    {p.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {PHONES.map((phone) => {
              const isSelected = selected?.id === phone.id;
              const isInCompare = compareList.find((p) => p.id === phone.id);
              return (
                <div
                  key={phone.id}
                  className={`phone-card${isSelected ? " selected" : ""}`}
                  onClick={() => handlePhoneSelect(phone)}
                  style={{
                    borderRadius: 16,
                    border: `1px solid ${isSelected || isInCompare ? phone.color : "rgba(255,255,255,0.06)"}`,
                    background: isSelected || isInCompare
                      ? `linear-gradient(160deg, rgba(0,0,0,0.6), rgba(${hexToRgb(phone.color)},0.12))`
                      : "rgba(255,255,255,0.03)",
                    padding: "16px 12px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isSelected ? `0 0 24px rgba(${hexToRgb(phone.color)},0.3)` : "none",
                  }}
                >
                  {phone.isFuture && (
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: 9,
                        background: "rgba(255,110,64,0.2)",
                        border: "1px solid rgba(255,110,64,0.5)",
                        color: "#FF6E40",
                        padding: "2px 6px",
                        borderRadius: 4,
                        letterSpacing: "0.05em",
                        fontWeight: 700,
                      }}
                    >
                      예측
                    </div>
                  )}
                  {isInCompare && (
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: phone.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#000",
                      }}
                    >
                      {compareList.findIndex((p) => p.id === phone.id) + 1}
                    </div>
                  )}

                  {/* Phone Visual */}
                  <div
                    style={{
                      width: 48,
                      height: 80,
                      margin: "8px auto 12px",
                      borderRadius: 10,
                      border: `2px solid ${phone.color}`,
                      background: `linear-gradient(160deg, rgba(${hexToRgb(phone.color)},0.15), rgba(0,0,0,0.8))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      boxShadow: `0 4px 20px rgba(${hexToRgb(phone.color)},0.2)`,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        width: 16,
                        height: 3,
                        borderRadius: 2,
                        background: phone.color,
                        opacity: 0.6,
                      }}
                    />
                    {phone.emoji}
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: phone.color,
                      letterSpacing: "0.05em",
                      marginBottom: 4,
                    }}
                  >
                    {phone.name.replace("Galaxy ", "")}
                  </div>

                  {/* AI Score */}
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 9, color: "#64748b", letterSpacing: "0.08em" }}>AI SCORE</span>
                      <span style={{ fontSize: 10, color: phone.color, fontWeight: 700 }}>{phone.score}</span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="score-bar"
                        style={{
                          height: "100%",
                          width: `${phone.score}%`,
                          background: `linear-gradient(to right, ${phone.color}, white)`,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Phone Detail */}
          {selected && !compareMode && (
            <div
              style={{
                borderRadius: 16,
                border: `1px solid rgba(${hexToRgb(selected.color)},0.3)`,
                background: `linear-gradient(160deg, rgba(0,0,0,0.7), rgba(${hexToRgb(selected.color)},0.07))`,
                padding: "20px 24px",
                animation: "slideIn 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 32 }}>{selected.emoji}</div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: selected.color, letterSpacing: "0.05em" }}>
                    {selected.name}
                  </h2>
                  <p style={{ fontSize: 12, color: "#64748b" }}>{selected.highlight}</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  ["🔧 칩셋", selected.chip],
                  ["💾 RAM", selected.ram],
                  ["📺 디스플레이", selected.display],
                  ["📷 카메라", selected.camera],
                  ["🔋 배터리", selected.battery],
                  ["🤖 AI", selected.ai],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{val}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, letterSpacing: "0.1em" }}>
                  KEY FEATURES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selected.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: `rgba(${hexToRgb(selected.color)},0.12)`,
                        border: `1px solid rgba(${hexToRgb(selected.color)},0.3)`,
                        fontSize: 11,
                        color: selected.color,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Compare Result Panel */}
          {compareMode && compareList.length >= 2 && (
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(255,110,64,0.3)",
                background: "rgba(255,110,64,0.05)",
                padding: "16px 20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#FF6E40", letterSpacing: "0.05em" }}>
                  비교 선택: {compareList.map((p) => p.name).join(" vs ")}
                </h3>
                <button
                  onClick={handleCompare}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    background: "rgba(255,110,64,0.2)",
                    border: "1px solid rgba(255,110,64,0.5)",
                    color: "#FF6E40",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  AI 비교 분석 →
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${compareList.length}, 1fr)`, gap: 8 }}>
                {compareList.map((phone) => (
                  <div key={phone.id} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{phone.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: phone.color }}>{phone.name}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: phone.color, marginTop: 4 }}>
                      {phone.score}
                    </div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>AI Score</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: AI Chat */}
        <div
          style={{
            width: "42%",
            borderLeft: "1px solid rgba(0,229,255,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(0,229,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#69F0AE",
              }}
              className="pulse-dot"
            />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", color: "#00E5FF" }}>
              EVOLUTION AI AGENT
            </span>
          </div>

          {/* Quick Questions */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => !loading && callClaude(q)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 20,
                  background: "rgba(0,229,255,0.07)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: 11,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.target.style.color = "#00E5FF"; e.target.style.borderColor = "rgba(0,229,255,0.5)"; }}
                onMouseLeave={(e) => { e.target.style.color = "#94a3b8"; e.target.style.borderColor = "rgba(0,229,255,0.2)"; }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className="chat-bubble-in"
                style={{
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #1e40af, #7B2FBE)"
                      : "linear-gradient(135deg, #00E5FF, #69F0AE)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {msg.role === "user" ? "👤" : "🤖"}
                </div>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, rgba(30,64,175,0.6), rgba(123,47,190,0.4))"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${msg.role === "user" ? "rgba(30,64,175,0.4)" : "rgba(255,255,255,0.07)"}`,
                    fontSize: 13,
                    lineHeight: 1.65,
                  }}
                >
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #00E5FF, #69F0AE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🤖</div>
                <div style={{ display: "flex", gap: 4, padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: "4px 14px 14px 14px", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00E5FF",
                        animation: `pulse 1.2s ${d * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "14px 16px",
              borderTop: "1px solid rgba(0,229,255,0.1)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="갤럭시 진화에 대해 물어보세요..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,229,255,0.2)",
                color: "#e2e8f0",
                fontSize: 13,
                outline: "none",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.2)")}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                background: loading || !input.trim()
                  ? "rgba(0,229,255,0.1)"
                  : "linear-gradient(135deg, #00E5FF, #0066ff)",
                border: "none",
                color: loading || !input.trim() ? "#64748b" : "#000",
                cursor: loading || !input.trim() ? "default" : "pointer",
                fontSize: 14,
                fontWeight: 700,
                transition: "all 0.2s",
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
