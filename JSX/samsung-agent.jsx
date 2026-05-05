import { useState, useRef, useEffect } from "react";

const SYSTEM = `당신은 Samsung Galaxy S 시리즈 AP 아키텍처 전문가입니다.
웹 검색 도구를 적극적으로 활용하여 최신 정보를 찾아 답변하세요.

## 핵심 지식 베이스

### 폰 프로젝트 코드네임
S20:Hubble · S21:Unbound · S22:Rainbow · S23:Diamond · S24:Eureka(처음엔 Muse) · S25:Paradigm
S26: Miracle (M1=S26 · M2=S26+ · M3=S26 Ultra) — GalaxyClub 확인
S27: 미정 · S28: 미정

### S26 Galaxy (Miracle) 스펙
- S26 (M1): 6.3인치 · 4,300mAh · 25W · 50MP · SD 8 Elite Gen5(북미·일본·중국) / Exynos 2600(그 외)
- S26+ (M2): 6.7인치 · 4,900mAh · 45W · 50MP · 동일 칩셋 정책
- S26 Ultra (M3): 6.9인치 · 5,000mAh · 60W(최고) · 200MP f/1.4 · S펜 · Privacy Display 세계 최초 · 전 세계 SD 8 Elite Gen5 단일
- 출시: 2026년 2월 25일 발표, 3월 11일 출시 · Android 16 / One UI 8.5

### Exynos SoC 코드네임
Pamir=2200(S22,4nm) · Quadra=2300(S23 취소) · (미공개)=2400(S24,4nm) · Solomon=2500(S25,3nm GAA) · Thetis=2600(S26,2nm GAA) · Ulysses=2700(S27,SF2P) · Vanguard=2800(S28,SF2P+)

### CPU Pipeline / Cache
- Cortex-X2 S22: ARMv9.0-A · 5-wide · 13단계 · L1-I 192KB · L2 512KB · L3 8MB DSU
- Cortex-X3 S23 SD: ARMv9.0-A · 5-wide · 14단계 · L1-I 96KB · L3 8MB · SLC 8MB
- Cortex-X4 S24: ARMv9.2-A · 5-wide · 14단계+ · L1-I 256KB · L2 1.5MB · L3 12MB
- Oryon Gen2 S25 SD: ARMv8.7-A★커스텀 · 6-wide 추정 · L1-I 192KB Prime/128KB Perf · L2 12MB/클러스터(24MB총) · L3없음 · SLC 8MB
- Oryon Gen3 S26 SD: ARMv9.2-A · HW매트릭스가속 추가 · L2 24MB · SLC 8MB
- C1-Ultra S26 Exynos: ARMv9.3-A ARM Lumex · 6-wide 추정 · L1-I 256KB · L2 2MB · L3 16MB DSU

### Bus / Interconnect
- Exynos: AMBA AXI 패브릭 · CoreLink CI-700/CI-720 · 128-bit
- Snapdragon: Qualcomm LLCC · SLC 8MB (GPU/NPU/ISP 전체 공유)
- Exynos 2700(Ulysses): LPDDR6 14.4Gbps 첫 탑재
- SM8975 Pro: LPDDR6 — Android 최초

### GPU
- Xclipse 920(S22): RDNA2 · 4WGP/8CU · 512SP · 572MHz — 첫 AMD 모바일 GPU
- Xclipse 940(S24): RDNA3 · 6WGP/12CU · 768SP · 890MHz · Mesh Shading
- Xclipse 950(S25): RDNA3+ · 8WGP/16CU 2-shader engine · 1024SP · RT+28%
- Xclipse 960(S26): RDNA3+ 개선 · 8+WGP
- Adreno 830 S25: 3슬라이스 1.1GHz · 40%↑ · RT+35%
- Adreno 850 S26: GMEM 18MB · HW매트릭스가속
- SM8950: Adreno 845 GMEM 12MB | SM8975 Pro: Adreno 850 GMEM 18MB
- Vanguard(S28): 삼성 자체 GPU 최초 — AMD 탈피

### NPU
- Exynos 2200: 30TOPS · 16K MAC
- Exynos 2400: 50TOPS · 24K MAC · 2x↑
- Exynos 2500(Solomon): 60TOPS · 32K MAC
- Exynos 2600(Thetis): 80TOPS · 32K MAC · GenAI+113% · PQC보안 · 가상화 최초
- SD 8 Elite Gen2: Hexagon Scalar8+Vector6 · 45TOPS
- SD 8 Elite Gen5: Hexagon Gen3 · HW매트릭스가속 최초 · +46%

### ISP
- Imagiq 790(S22): 2.7GP/s · 3센서
- Imagiq 990(S24): 3.6GP/s · 4센서 · 200MP
- Imagiq 1100+VPS(S25): 4.0GP/s · MLNR · DRC
- VPS 2세대(S26): DVNR · APV코덱 · 320MP
- Spectra 신설계(S25 SD): RAW도메인 직접처리 · NPU직결 · 4.3GP/s · 320MP

### Oryon 세대
Gen1: ARMv8.7-A · PC전용 · 12코어 · 4.3GHz · L2 36MB
Gen2: ARMv8.7-A · 모바일전용 · 2P+6E · L2 24MB총 · SLC 8MB · E코어 제거
Gen3: ARMv9.2-A · 모바일+PC 통합 · 2P(4.61G)+6E · HW매트릭스가속 최초 · +20%
Gen3+: SM8950(N2)/SM8975(N2P) · 2+3+3 · Adreno845/850 · LPDDR5X/6(Pro)

최신 정보가 필요하면 web_search 도구를 사용하세요. 한국어로 답변하세요.`;

const QUICK = [
  "S26 Galaxy Miracle 코드네임 M1 M2 M3 상세",
  "Exynos 2300 Quadra 취소 이유",
  "Oryon Gen2와 Cortex-X4 캐시 구조 차이",
  "S26 Ultra Privacy Display 기술",
  "SM8950 vs SM8975 Pro GPU GMEM 차이",
  "Exynos 2600 Thetis 2nm GAA 성능",
  "S28 Vanguard 자체 GPU AMD 탈피",
  "ARM ISA 버전 ARMv8.7 vs ARMv9.2 차이",
];

function timeStr() {
  return new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

function MsgBubble({ role, content, time, isTyping }) {
  const isUser = role === "user";
  const formatText = (t) =>
    t
      .replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong style="color:#00e5cc">${m}</strong>`)
      .replace(/`(.*?)`/g, (_, m) => `<code style="background:#0a1a28;border:1px solid #0e2a3a;border-radius:3px;padding:1px 5px;font-size:9px;color:#80d0f0;font-family:inherit">${m}</code>`)
      .replace(/\n/g, "<br>");

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: isUser ? "row-reverse" : "row", animation: "fadeIn .3s ease" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, flexShrink: 0, marginTop: 2,
        background: isUser ? "linear-gradient(135deg,#1a3060,#0a1840)" : "linear-gradient(135deg,#003050,#001830)",
        border: isUser ? "1px solid #3a6090" : "1px solid rgba(0,207,255,.3)",
        boxShadow: isUser ? "none" : "0 0 8px rgba(0,207,255,.15)",
      }}>{isUser ? "👤" : "🤖"}</div>
      <div>
        {isTyping ? (
          <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "10px 14px", background: "#030e18", border: "1px solid rgba(0,207,255,.15)", borderRadius: "4px 12px 12px 12px" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#00cfff", animation: `bounce .8s ${i * .15}s infinite` }} />
            ))}
          </div>
        ) : (
          <div
            style={{
              maxWidth: 600, padding: "10px 14px", fontSize: 10, lineHeight: 1.75,
              background: isUser ? "#0d2040" : "#030e18",
              border: `1px solid ${isUser ? "#1a4070" : "rgba(0,207,255,.18)"}`,
              color: isUser ? "#c8e4f8" : "#b8d8e8",
              borderRadius: isUser ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
            }}
            dangerouslySetInnerHTML={{ __html: formatText(content) }}
          />
        )}
        {!isTyping && <div style={{ fontSize: 8, color: "#2e5060", marginTop: 4, textAlign: isUser ? "right" : "left" }}>{isUser ? "나" : "AP Agent"} · {time}</div>}
      </div>
    </div>
  );
}

export default function SamsungAgent() {
  const [msgs, setMsgs] = useState([
    { role: "ai", content: "안녕하세요! Samsung Galaxy S 시리즈 AP 아키텍처 전문 AI입니다.\n\n**S22~S28 전 세대** 데이터를 보유하고 있습니다:\n• 폰 프로젝트 코드네임 (**Miracle**, Diamond, Eureka 등)\n• Exynos 코드네임 (Pamir · Quadra취소 · Thetis · Ulysses · **Vanguard**)\n• CPU Pipeline · Decode Width · Cache (L1/L2/L3/SLC)\n• GPU WGP · GMEM · NPU TOPS · ISP 처리량\n• ARM ISA 버전 · Oryon Gen 1~3+ · SM8950/SM8975\n\n필요 시 **웹 검색**으로 최신 정보도 찾아드립니다.", time: timeStr() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const msgEnd = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (q) => {
    const text = (q || input).trim();
    if (!text || loading) return;
    setInput("");

    const userMsg = { role: "user", content: text, time: timeStr() };
    setMsgs(prev => [...prev, userMsg]);
    setLoading(true);

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);

    // Add typing indicator
    setMsgs(prev => [...prev, { role: "ai", content: "", time: "", isTyping: true }]);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM,
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
              max_uses: 3,
            }
          ],
          messages: newHistory,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMsgs(prev => prev.filter(m => !m.isTyping).concat({ role: "ai", content: `⚠ 오류: ${data.error.message}`, time: timeStr() }));
        setLoading(false);
        return;
      }

      // Collect all text content (including after tool use)
      const replyText = data.content
        .map(block => (block.type === "text" ? block.text : ""))
        .filter(Boolean)
        .join("\n");

      const finalReply = replyText || "응답을 받지 못했습니다.";
      const newAssist = { role: "assistant", content: finalReply };
      setHistory(prev => [...prev, newAssist]);
      setMsgs(prev => prev.filter(m => !m.isTyping).concat({ role: "ai", content: finalReply, time: timeStr() }));
    } catch (e) {
      setMsgs(prev => prev.filter(m => !m.isTyping).concat({ role: "ai", content: `⚠ 네트워크 오류: ${e.message}`, time: timeStr() }));
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div style={{ height: "100vh", background: "#020507", display: "flex", flexDirection: "column", fontFamily: "'Share Tech Mono', 'Courier New', monospace", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#020507}::-webkit-scrollbar-thumb{background:#0d2030;border-radius:2px}
        textarea{resize:none;outline:none}
        textarea::placeholder{color:#2e5060}
        button{cursor:pointer}
      `}</style>

      {/* Header */}
      <div style={{ padding: "12px 18px", background: "linear-gradient(135deg,#020d18,#040f1c)", borderBottom: "1px solid rgba(0,207,255,.2)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00cfff,#0055aa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 0 12px rgba(0,207,255,.4)", flexShrink: 0 }}>🤖</div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3, color: "#00cfff", textShadow: "0 0 10px rgba(0,207,255,.5)" }}>SAMSUNG AP AGENT</div>
          <div style={{ fontSize: 9, color: "#2e5060", marginTop: 1 }}>Galaxy S22~S28 · Exynos · Oryon · Pipeline · Cache · ISA 전문가 + 웹 검색</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "#2e5060" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: loading ? "#ffcc00" : "#00ff88", boxShadow: `0 0 6px ${loading ? "#ffcc00" : "#00ff88"}`, animation: "pulse 2s infinite" }} />
          {loading ? "검색/응답중..." : "Ready"}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.map((m, i) => <MsgBubble key={i} {...m} />)}
        <div ref={msgEnd} />
      </div>

      {/* Quick questions */}
      <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(0,207,255,.08)", background: "#020b14", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {QUICK.map((q, i) => (
            <button key={i} onClick={() => send(q)} disabled={loading}
              style={{ padding: "4px 10px", background: "#0a1a28", border: "1px solid rgba(0,207,255,.18)", borderRadius: 20, fontSize: 9, color: "#70a8c8", transition: "all .15s", fontFamily: "inherit", whiteSpace: "nowrap", opacity: loading ? .4 : 1 }}
              onMouseOver={e => { e.target.style.background = "#0d2038"; e.target.style.borderColor = "#00cfff"; e.target.style.color = "#00cfff"; }}
              onMouseOut={e => { e.target.style.background = "#0a1a28"; e.target.style.borderColor = "rgba(0,207,255,.18)"; e.target.style.color = "#70a8c8"; }}>
              {q.length > 20 ? q.slice(0, 20) + "…" : q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,207,255,.12)", background: "#020b14", display: "flex", gap: 10, alignItems: "flex-end", flexShrink: 0 }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
          onKeyDown={handleKey}
          disabled={loading}
          placeholder="질문 입력... (Enter 전송 · Shift+Enter 줄바꿈)"
          rows={1}
          style={{ flex: 1, background: "#08141e", border: `1.5px solid ${loading ? "rgba(0,207,255,.1)" : "rgba(0,207,255,.25)"}`, borderRadius: 8, padding: "10px 14px", color: "#c0dce8", fontSize: 10, minHeight: 42, maxHeight: 120, lineHeight: 1.5, fontFamily: "inherit", transition: "border-color .15s" }}
          onFocus={e => e.target.style.borderColor = "#00cfff"}
          onBlur={e => e.target.style.borderColor = "rgba(0,207,255,.25)"}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{ width: 42, height: 42, background: loading ? "#0a1a28" : "linear-gradient(135deg,#00cfff,#0066cc)", border: "none", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, transition: "all .15s", boxShadow: loading ? "none" : "0 0 12px rgba(0,207,255,.3)", opacity: (!input.trim() || loading) ? .4 : 1, color: "#fff" }}>
          {loading ? "⏳" : "➤"}
        </button>
      </div>
    </div>
  );
}
