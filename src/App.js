<<<<<<< HEAD
import { useState, useRef, useEffect, useCallback } from "react";

// ─── NSE Stock Master (Nifty 500 subset — most common holdings) ───────────────
const STOCK_MASTER = [
  { t: "ABBOTINDIA",   n: "Abbott India",            s: "Pharma" },
  { t: "ADANIENT",     n: "Adani Enterprises",       s: "Infrastructure" },
  { t: "ADANIPORTS",   n: "Adani Ports",             s: "Infrastructure" },
  { t: "ADANIPOWER",   n: "Adani Power",             s: "Power" },
  { t: "AMBUJACEM",    n: "Ambuja Cements",          s: "Cement" },
  { t: "APOLLOHOSP",   n: "Apollo Hospitals",        s: "Healthcare" },
  { t: "ASIANPAINT",   n: "Asian Paints",            s: "Paints" },
  { t: "AUROPHARMA",   n: "Aurobindo Pharma",        s: "Pharma" },
  { t: "AXISBANK",     n: "Axis Bank",               s: "Private Bank" },
  { t: "BAJAJFINSV",   n: "Bajaj Finserv",           s: "NBFC" },
  { t: "BAJFINANCE",   n: "Bajaj Finance",           s: "NBFC" },
  { t: "BAJAJ-AUTO",   n: "Bajaj Auto",              s: "Auto" },
  { t: "BALKRISIND",   n: "Balkrishna Industries",   s: "Auto Ancillary" },
  { t: "BANDHANBNK",   n: "Bandhan Bank",            s: "Private Bank" },
  { t: "BANKBARODA",   n: "Bank of Baroda",          s: "PSU Bank" },
  { t: "BEL",          n: "Bharat Electronics",      s: "Defence" },
  { t: "BHARTIARTL",   n: "Bharti Airtel",           s: "Telecom" },
  { t: "BHEL",         n: "BHEL",                    s: "Capital Goods" },
  { t: "BOSCHLTD",     n: "Bosch",                   s: "Auto Ancillary" },
  { t: "BPCL",         n: "BPCL",                    s: "Oil & Gas" },
  { t: "BRITANNIA",    n: "Britannia Industries",    s: "FMCG" },
  { t: "CANBK",        n: "Canara Bank",             s: "PSU Bank" },
  { t: "CIPLA",        n: "Cipla",                   s: "Pharma" },
  { t: "COALINDIA",    n: "Coal India",              s: "Mining" },
  { t: "COLPAL",       n: "Colgate-Palmolive",       s: "FMCG" },
  { t: "CRISIL",       n: "CRISIL",                  s: "Financial Services" },
  { t: "DABUR",        n: "Dabur India",             s: "FMCG" },
  { t: "DIXON",        n: "Dixon Technologies",      s: "Consumer Electronics" },
  { t: "DLF",          n: "DLF",                     s: "Real Estate" },
  { t: "DRREDDY",      n: "Dr. Reddy's Labs",        s: "Pharma" },
  { t: "EICHERMOT",    n: "Eicher Motors",           s: "Auto" },
  { t: "ETERNAL",      n: "Eternal (Zomato)",        s: "QSR / Food Tech" },
  { t: "GAIL",         n: "GAIL India",              s: "Oil & Gas" },
  { t: "GRASIM",       n: "Grasim Industries",       s: "Diversified / Cement" },
  { t: "HCLTECH",      n: "HCL Technologies",        s: "IT Services" },
  { t: "HDFCBANK",     n: "HDFC Bank",               s: "Private Bank" },
  { t: "HDBFS",        n: "HDB Financial Services",  s: "NBFC" },
  { t: "HDFC",         n: "HDFC",                    s: "Housing Finance" },
  { t: "HEROMOTOCO",   n: "Hero MotoCorp",           s: "Auto" },
  { t: "HINDALCO",     n: "Hindalco Industries",     s: "Metals" },
  { t: "HINDUNILVR",   n: "Hindustan Unilever",      s: "FMCG" },
  { t: "HYUNDAI",      n: "Hyundai Motor India",     s: "Auto" },
  { t: "ICICIBANK",    n: "ICICI Bank",              s: "Private Bank" },
  { t: "ICICIGI",      n: "ICICI Lombard",           s: "Insurance" },
  { t: "ICICIPRULI",   n: "ICICI Prudential Life",   s: "Insurance" },
  { t: "IDFCFIRSTB",   n: "IDFC First Bank",         s: "Private Bank" },
  { t: "IGL",          n: "Indraprastha Gas",        s: "Utilities" },
  { t: "INDUSINDBK",   n: "IndusInd Bank",           s: "Private Bank" },
  { t: "INFY",         n: "Infosys",                 s: "IT Services" },
  { t: "IOC",          n: "Indian Oil Corp",         s: "Oil & Gas" },
  { t: "IRCTC",        n: "IRCTC",                   s: "Travel & Tourism" },
  { t: "JIOFIN",       n: "Jio Financial Services",  s: "Financial Services" },
  { t: "JSWSTEEL",     n: "JSW Steel",               s: "Steel" },
  { t: "JUBLFOOD",     n: "Jubilant FoodWorks",      s: "QSR / Food" },
  { t: "KAYNES",       n: "Kaynes Technology",       s: "Consumer Electronics" },
  { t: "KOTAKBANK",    n: "Kotak Mahindra Bank",     s: "Private Bank" },
  { t: "LICI",         n: "LIC India",               s: "Insurance" },
  { t: "LT",           n: "Larsen & Toubro",         s: "Capital Goods" },
  { t: "LTIM",         n: "LTIMindtree",             s: "IT Services" },
  { t: "LUPIN",        n: "Lupin",                   s: "Pharma" },
  { t: "M&M",          n: "Mahindra & Mahindra",     s: "Auto" },
  { t: "MARUTI",       n: "Maruti Suzuki",           s: "Auto" },
  { t: "MCDOWELL-N",   n: "United Spirits",          s: "FMCG" },
  { t: "MOTHERSON",    n: "Samvardhana Motherson",   s: "Auto Ancillary" },
  { t: "MUTHOOTFIN",   n: "Muthoot Finance",         s: "NBFC" },
  { t: "NESTLEIND",    n: "Nestlé India",            s: "FMCG" },
  { t: "NHPC",         n: "NHPC",                    s: "PSU Power" },
  { t: "NTPC",         n: "NTPC",                    s: "PSU Power" },
  { t: "ONGC",         n: "ONGC",                    s: "Oil & Gas" },
  { t: "PIIND",        n: "PI Industries",           s: "Agrochemicals" },
  { t: "PIDILITIND",   n: "Pidilite Industries",     s: "Specialty Chemicals" },
  { t: "PNB",          n: "Punjab National Bank",    s: "PSU Bank" },
  { t: "POWERGRID",    n: "Power Grid Corp",         s: "PSU Power" },
  { t: "RAYMOND",      n: "Raymond",                 s: "Textiles" },
  { t: "RAYMONDLSL",   n: "Raymond Lifestyle",       s: "Textiles" },
  { t: "RECLTD",       n: "REC Limited",             s: "NBFC" },
  { t: "RELIANCE",     n: "Reliance Industries",     s: "Energy / Retail" },
  { t: "SAIL",         n: "Steel Authority of India",s: "PSU Steel" },
  { t: "SBICARD",      n: "SBI Cards",               s: "Financial Services" },
  { t: "SBILIFE",      n: "SBI Life Insurance",      s: "Insurance" },
  { t: "SBIN",         n: "State Bank of India",     s: "PSU Bank" },
  { t: "SHREECEM",     n: "Shree Cement",            s: "Cement" },
  { t: "SIEMENS",      n: "Siemens India",           s: "Capital Goods" },
  { t: "SPELS",        n: "SPEL Semiconductor",      s: "Electronics" },
  { t: "SUNPHARMA",    n: "Sun Pharmaceutical",      s: "Pharma" },
  { t: "TATACHEM",     n: "Tata Chemicals",          s: "Specialty Chemicals" },
  { t: "TATACONSUM",   n: "Tata Consumer Products",  s: "FMCG" },
  { t: "TATAMOTORS",   n: "Tata Motors",             s: "Auto" },
  { t: "TATAPOWER",    n: "Tata Power",              s: "Power" },
  { t: "TATASTEEL",    n: "Tata Steel",              s: "Steel" },
  { t: "TCS",          n: "TCS",                     s: "IT Services" },
  { t: "TECHM",        n: "Tech Mahindra",           s: "IT Services" },
  { t: "TIINDIA",      n: "Tube Investments",        s: "Auto Ancillary" },
  { t: "TITAN",        n: "Titan Company",           s: "Consumer Goods" },
  { t: "TMCV",         n: "Tata Motors (CV)",        s: "Auto" },
  { t: "TMPV",         n: "Tata Motors (PV)",        s: "Auto" },
  { t: "TORNTPHARM",   n: "Torrent Pharmaceuticals", s: "Pharma" },
  { t: "TRENT",        n: "Trent (Westside)",        s: "Retail" },
  { t: "ULTRACEMCO",   n: "UltraTech Cement",        s: "Cement" },
  { t: "UPL",          n: "UPL",                     s: "Agrochemicals" },
  { t: "VEDL",         n: "Vedanta",                 s: "Metals" },
  { t: "WIPRO",        n: "Wipro",                   s: "IT Services" },
  { t: "YESBANK",      n: "Yes Bank",                s: "Private Bank" },
  { t: "ZOMATO",       n: "Zomato",                  s: "QSR / Food Tech" },
];

const API = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY || "";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n) { return Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
function fmtK(n) {
  const v = Math.abs(n);
  if (v >= 1e7) return (n / 1e7).toFixed(2) + " Cr";
  if (v >= 1e5) return (n / 1e5).toFixed(2) + " L";
  if (v >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return Number(n).toFixed(0);
}

function getSector(ticker) {
  const s = STOCK_MASTER.find(x => x.t === ticker?.toUpperCase());
  return s ? s.s : "Diversified";
}

function getCompanyName(ticker) {
  const s = STOCK_MASTER.find(x => x.t === ticker?.toUpperCase());
  return s ? s.n : ticker;
}

async function callClaude(messages, system = "") {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { "x-api-key": API_KEY, "anthropic-version": "2023-06-01" } : {})
    },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("\n") || "Sorry, no response.";
}

function generateBollinger(base) {
  const prices = [];
  let p = base || 100;
  for (let i = 0; i < 30; i++) { p = p * (1 + (Math.random() - 0.48) * 0.025); prices.push(+p.toFixed(2)); }
  const sma = prices.reduce((a, b) => a + b, 0) / prices.length;
  const std = Math.sqrt(prices.reduce((a, b) => a + (b - sma) ** 2, 0) / prices.length);
  return { prices, sma: +sma.toFixed(2), upper: +(sma + 2 * std).toFixed(2), lower: +(sma - 2 * std).toFixed(2) };
}

// ─── Stock Selector Screen ────────────────────────────────────────────────────

function StockSearchInput({ onAdd, existingTickers }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query.trim().length > 0
    ? STOCK_MASTER.filter(s =>
        !existingTickers.includes(s.t) &&
        (s.t.toLowerCase().includes(query.toLowerCase()) ||
         s.n.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#fff", border: "1.5px solid #ddd6fe", borderRadius: 12, padding: "10px 14px" }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search stock — type RELIANCE, INFY, TCS…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#1e1530", background: "transparent", fontFamily: "inherit" }}
        />
        {query && <button onClick={() => { setQuery(""); setOpen(false); }} style={{ background: "none", border: "none", color: "#b8a9d4", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>}
      </div>

      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #ddd6fe", borderRadius: 12, boxShadow: "0 8px 32px rgba(109,40,217,0.12)", zIndex: 100, overflow: "hidden" }}>
          {filtered.map(s => (
            <div key={s.t}
              onClick={() => { onAdd(s.t); setQuery(""); setOpen(false); }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", cursor: "pointer", borderBottom: "1px solid #f3f0f9", transition: "background 0.12s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8f5ff"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1e1530" }}>{s.t}</div>
                <div style={{ fontSize: 11.5, color: "#7a6e91", marginTop: 1 }}>{s.n}</div>
              </div>
              <span style={{ fontSize: 10.5, color: "#8b5cf6", background: "#ede9fe", borderRadius: 20, padding: "2px 9px", fontWeight: 600 }}>{s.s}</span>
            </div>
          ))}
        </div>
      )}

      {open && query.trim().length > 1 && filtered.length === 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #ddd6fe", borderRadius: 12, padding: "14px 16px", zIndex: 100, boxShadow: "0 8px 32px rgba(109,40,217,0.12)" }}>
          <div style={{ fontSize: 13, color: "#a89cc0" }}>No match — try a different ticker or name</div>
        </div>
      )}
    </div>
  );
}

function HoldingRow({ holding, onChange, onRemove }) {
  const company = getCompanyName(holding.ticker);
  const sector = getSector(holding.ticker);
  const currentVal = holding.qty * holding.avgPrice;

  return (
    <div style={{ background: "#fff", border: "1.5px solid #ede8f8", borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      {/* Stock header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1e1530" }}>{holding.ticker}</div>
          <div style={{ fontSize: 11.5, color: "#7a6e91", marginTop: 1 }}>{company}</div>
          <span style={{ display: "inline-block", marginTop: 4, fontSize: 10, color: "#8b5cf6", background: "#ede9fe", borderRadius: 20, padding: "2px 8px", fontWeight: 600 }}>{sector}</span>
        </div>
        <button onClick={() => onRemove(holding.id)} style={{ background: "#fff0f0", border: "1px solid #fecaca", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#dc2626", cursor: "pointer", fontWeight: 600 }}>Remove</button>
      </div>

      {/* Input row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label style={{ fontSize: 11, color: "#a89cc0", fontWeight: 600, display: "block", marginBottom: 5 }}>QUANTITY HELD</label>
          <input
            type="number"
            min="1"
            value={holding.qty || ""}
            onChange={e => onChange(holding.id, "qty", Number(e.target.value))}
            placeholder="e.g. 50"
            style={{ width: "100%", background: "#f8f5ff", border: "1.5px solid #e9d5ff", borderRadius: 10, padding: "9px 12px", fontSize: 14, fontWeight: 600, color: "#1e1530", outline: "none", fontFamily: "inherit" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, color: "#a89cc0", fontWeight: 600, display: "block", marginBottom: 5 }}>AVG BUY PRICE (₹)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={holding.avgPrice || ""}
            onChange={e => onChange(holding.id, "avgPrice", Number(e.target.value))}
            placeholder="e.g. 1500.00"
            style={{ width: "100%", background: "#f8f5ff", border: "1.5px solid #e9d5ff", borderRadius: 10, padding: "9px 12px", fontSize: 14, fontWeight: 600, color: "#1e1530", outline: "none", fontFamily: "inherit" }}
          />
        </div>
      </div>

      {holding.qty > 0 && holding.avgPrice > 0 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#f8f5ff", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#7a6e91" }}>Invested value</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#6d28d9" }}>₹{fmt(currentVal)}</span>
        </div>
      )}
    </div>
  );
}

function SelectorScreen({ onDone }) {
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState("");

  const addStock = useCallback((ticker) => {
    setHoldings(prev => [...prev, { id: Date.now(), ticker, qty: "", avgPrice: "" }]);
  }, []);

  const updateHolding = useCallback((id, field, value) => {
    setHoldings(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  }, []);

  const removeHolding = useCallback((id) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
  }, []);

  const handleAnalyse = () => {
    const valid = holdings.filter(h => h.qty > 0 && h.avgPrice > 0);
    if (valid.length === 0) {
      setError("Please add at least one stock with a quantity and buy price.");
      return;
    }
    const incomplete = holdings.filter(h => !h.qty || !h.avgPrice);
    if (incomplete.length > 0) {
      setError(`Fill in qty and avg price for: ${incomplete.map(h => h.ticker).join(", ")}`);
      return;
    }
    setError("");

    // Build portfolio objects — use avg as proxy for LTP (user can refine later)
    // We simulate a ±15% market move for demo P&L
    const portfolio = valid.map(h => {
      const ltp = +(h.avgPrice * (0.85 + Math.random() * 0.45)).toFixed(2);
      const current = ltp * h.qty;
      const invested = h.avgPrice * h.qty;
      const pl = current - invested;
      const plPct = +((pl / invested) * 100).toFixed(2);
      return {
        name: h.ticker,
        qty: h.qty,
        avg: h.avgPrice,
        ltp,
        current,
        invested,
        pl,
        plPct,
      };
    });
    onDone(portfolio);
  };

  const totalInvested = holdings.reduce((a, h) => a + (h.qty * h.avgPrice || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f4fd", fontFamily: "'Figtree', sans-serif", color: "#1e1530" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeup { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tape { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #ede8f8", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 20 }}>
        <div>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: -0.5 }}>
            <span style={{ color: "#7c3aed" }}>Quant</span><span style={{ color: "#1e1530" }}>folio</span>
          </div>
          <div style={{ fontSize: 11, color: "#b8a9d4", fontWeight: 500, marginTop: 1 }}>Portfolio Intelligence · NSE &amp; BSE</div>
        </div>
        {holdings.length > 0 && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>₹{fmtK(totalInvested)}</div>
            <div style={{ fontSize: 10, color: "#b8a9d4" }}>{holdings.length} stock{holdings.length > 1 ? "s" : ""} · invested</div>
          </div>
        )}
      </div>

      {/* Ticker tape */}
      <div style={{ overflow: "hidden", borderBottom: "1px solid #ede8f8", padding: "8px 0", background: "#fdfbff" }}>
        <div style={{ display: "flex", gap: 28, animation: "tape 22s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {["NIFTY 50 ▲ 0.34%","SENSEX ▲ 0.41%","RELIANCE ▲ 1.2%","TCS ▼ 0.3%","INFY ▲ 0.8%","HDFC ▲ 0.5%","BAJFINANCE ▲ 1.1%","WIPRO ▼ 0.2%","ICICIBANK ▲ 0.7%","NIFTY 50 ▲ 0.34%","SENSEX ▲ 0.41%","RELIANCE ▲ 1.2%","TCS ▼ 0.3%","INFY ▲ 0.8%","HDFC ▲ 0.5%","BAJFINANCE ▲ 1.1%","WIPRO ▼ 0.2%","ICICIBANK ▲ 0.7%"].map((t, i) => (
            <span key={i} style={{ fontSize: 11.5, fontFamily: "'DM Mono', monospace", color: t.includes("▼") ? "#e07070" : "#5aaa7a", fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 48px" }}>

        {/* Hero */}
        <div style={{ padding: "24px 0 20px", animation: "fadeup 0.4s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ede9fe", border: "1px solid #ddd6fe", borderRadius: 20, padding: "5px 13px", fontSize: 12, color: "#6d28d9", fontWeight: 600, marginBottom: 14 }}>
            ✦ &nbsp;Educational · Not SEBI-registered advice
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 10, letterSpacing: -0.7 }}>
            Build your portfolio<br /><span style={{ color: "#7c3aed" }}>get instant analysis</span>
          </h1>
          <p style={{ fontSize: 14, color: "#5e5275", lineHeight: 1.7 }}>
            Search for any NSE stock, enter your quantity and average buy price. We'll generate Bollinger Bands, risk scores, buy/sell signals, swap suggestions, and an AI chatbot for your exact holdings.
          </p>
        </div>

        {/* Search */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #ede8f8", padding: 18, marginBottom: 14, boxShadow: "0 2px 16px rgba(124,58,237,0.07)", animation: "fadeup 0.4s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#b8a9d4", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 12 }}>Add Stocks</div>
          <StockSearchInput onAdd={addStock} existingTickers={holdings.map(h => h.ticker)} />
          {holdings.length === 0 && (
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 7 }}>
              <div style={{ fontSize: 11.5, color: "#a89cc0", width: "100%", marginBottom: 4 }}>Quick add popular stocks:</div>
              {["RELIANCE","INFY","HDFCBANK","TCS","BAJFINANCE","TATAMOTORS","SBIN","WIPRO"].map(t => (
                <button key={t}
                  onClick={() => addStock(t)}
                  style={{ background: "#f8f5ff", border: "1.5px solid #e9d5ff", borderRadius: 20, padding: "5px 13px", fontSize: 12, color: "#6d28d9", cursor: "pointer", fontWeight: 600 }}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Holdings list */}
        {holdings.length > 0 && (
          <div style={{ animation: "fadeup 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#6d28d9" }}>{holdings.length} stock{holdings.length > 1 ? "s" : ""} in portfolio</span>
              <button onClick={() => setHoldings([])} style={{ background: "none", border: "none", color: "#b8a9d4", fontSize: 12, cursor: "pointer" }}>Clear all</button>
            </div>

            {holdings.map(h => (
              <HoldingRow key={h.id} holding={h} onChange={updateHolding} onRemove={removeHolding} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#991b1b", lineHeight: 1.6 }}>
            ⚠ {error}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleAnalyse}
          disabled={holdings.length === 0}
          style={{
            width: "100%", padding: "16px 20px", borderRadius: 16, marginTop: 4, marginBottom: 12,
            background: holdings.length > 0 ? "linear-gradient(135deg, #6d28d9, #8b5cf6)" : "#ede9fe",
            border: "none", color: holdings.length > 0 ? "#fff" : "#c4b5fd",
            fontSize: 15.5, fontWeight: 700, cursor: holdings.length > 0 ? "pointer" : "default",
            boxShadow: holdings.length > 0 ? "0 4px 18px rgba(109,40,217,0.28)" : "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (holdings.length > 0) e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
        >
          {holdings.length === 0 ? "Add stocks to begin" : `Analyse ${holdings.length} Stock${holdings.length > 1 ? "s" : ""} →`}
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#c4b5fd", marginBottom: 28 }}>
          Instant analysis · no login required · educational only
        </p>

        {/* Feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {[["📊","Bollinger Bands","#dbeafe","#2563eb"],["⚡","Buy/Sell Signals","#fef9c3","#ca8a04"],["🔄","Swap Ideas","#ede9fe","#7c3aed"],["⚠️","Risk Flags","#fee2e2","#dc2626"],["🤖","AI Chat","#dcfce7","#16a34a"],["📈","Sector Analysis","#fce7f3","#be185d"]].map(([i,l,bg,c]) => (
            <span key={l} style={{ display:"inline-flex", alignItems:"center", gap:5, background:bg, borderRadius:20, padding:"5px 12px", fontSize:12, color:c, fontWeight:600 }}>{i} {l}</span>
          ))}
        </div>

        <div style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 14, padding: "14px 16px", fontSize: 12.5, color: "#78350f", lineHeight: 1.75 }}>
          <strong>⚠️ Educational only.</strong> Quantfolio is not SEBI-registered. All signals and scores are illustrative for learning purposes. Consult a SEBI-registered investment advisor before making any financial decisions.
        </div>
      </div>
    </div>
  );
}

// ─── Engine Components ────────────────────────────────────────────────────────

function ScoreBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "#7a6e91", marginBottom: 3 }}>
        <span>{label}</span><span style={{ color, fontWeight: 600 }}>{value.toFixed(1)}/10</span>
      </div>
      <div style={{ background: "#ede8f8", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${(value / 10) * 100}%`, background: color, height: "100%", borderRadius: 4, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

function BollingerChart({ stock }) {
  const { prices, sma, upper, lower } = generateBollinger(stock.ltp);
  const all = [...prices, upper, lower];
  const minP = Math.min(...all), maxP = Math.max(...all), range = maxP - minP || 1;
  const W = 300, H = 100, P = 8;
  const toY = v => P + ((maxP - v) / range) * (H - 2 * P);
  const toX = i => P + (i / (prices.length - 1)) * (W - 2 * P);
  const path = prices.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const last = prices[prices.length - 1];
  const sig = last > upper ? "SELL" : last < lower ? "BUY" : "HOLD";
  const sc = sig === "BUY" ? "#16a34a" : sig === "SELL" ? "#dc2626" : "#d97706";

  return (
    <div style={{ background: "#f8f5ff", borderRadius: 10, padding: 12, marginTop: 8, border: "1px solid #ede8f8" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: "#7a6e91" }}>Bollinger Bands (30D simulated)</span>
        <span style={{ background: sc + "20", color: sc, fontSize: 11, padding: "2px 8px", borderRadius: 4, fontWeight: 700, border: `1px solid ${sc}40` }}>{sig}</span>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
        <line x1={P} y1={toY(upper)} x2={W-P} y2={toY(upper)} stroke="#dc262640" strokeDasharray="4,3" strokeWidth={1.5} />
        <line x1={P} y1={toY(sma)}   x2={W-P} y2={toY(sma)}   stroke="#d9770640" strokeDasharray="4,3" strokeWidth={1.5} />
        <line x1={P} y1={toY(lower)} x2={W-P} y2={toY(lower)} stroke="#16a34a40" strokeDasharray="4,3" strokeWidth={1.5} />
        <path d={path} fill="none" stroke="#7c3aed" strokeWidth={2} />
        <circle cx={toX(prices.length-1)} cy={toY(last)} r={3.5} fill="#7c3aed" />
      </svg>
      <div style={{ display: "flex", gap: 14, marginTop: 6, fontSize: 10.5, fontFamily: "'DM Mono', monospace" }}>
        <span style={{ color: "#dc2626" }}>▲ ₹{fmt(upper)}</span>
        <span style={{ color: "#d97706" }}>— ₹{fmt(sma)}</span>
        <span style={{ color: "#16a34a" }}>▼ ₹{fmt(lower)}</span>
      </div>
    </div>
  );
}

function StockCard({ stock }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("metrics");
  const sector = getSector(stock.name);
  const company = getCompanyName(stock.name);

  // Simulated fundamental metrics seeded by stock P&L for consistency
  const seed = Math.abs(stock.plPct) % 1;
  const pe    = +(14 + seed * 38).toFixed(1);
  const pbv   = +(1.1 + seed * 5).toFixed(2);
  const roce  = +(10 + seed * 24).toFixed(1);
  const sharpe = +((stock.plPct / 100 - 0.065) / 0.18).toFixed(2);

  const peS     = Math.max(1, Math.min(10, 10 - (pe - 14) / 5));
  const pbvS    = Math.max(1, Math.min(10, 10 - (pbv - 1) * 1.5));
  const roceS   = Math.min(10, roce / 3.2);
  const sharpeS = Math.min(10, Math.max(1, sharpe * 3 + 5));
  const momS    = stock.plPct > 100 ? 9 : stock.plPct > 50 ? 7.5 : stock.plPct > 20 ? 6 : stock.plPct > 0 ? 4.5 : 2;
  const score   = +((peS + pbvS + roceS + sharpeS + momS) / 5).toFixed(1);

  const sig = score >= 7.5 ? "STRONG BUY" : score >= 6 ? "BUY" : score >= 4.5 ? "HOLD" : "SELL";
  const sc  = sig.includes("BUY") ? "#16a34a" : sig === "HOLD" ? "#d97706" : "#dc2626";
  const plPos = stock.pl >= 0;

  // Swap suggestion
  const SWAPS = {
    "Private Bank": ["KOTAKBANK","ICICIBANK","HDFCBANK"],
    "IT Services": ["TCS","INFY","HCLTECH"],
    "FMCG": ["HINDUNILVR","NESTLEIND","BRITANNIA"],
    "Pharma": ["SUNPHARMA","CIPLA","DRREDDY"],
    "Auto": ["MARUTI","BAJAJ-AUTO","EICHERMOT"],
    "NBFC": ["BAJFINANCE","BAJAJFINSV","MUTHOOTFIN"],
    "PSU Bank": ["SBIN","BANKBARODA","PNB"],
    "Steel": ["TATASTEEL","JSWSTEEL","SAIL"],
    "Cement": ["ULTRACEMCO","SHREECEM","AMBUJACEM"],
  };
  const sectorPeers = (SWAPS[sector] || []).filter(t => t !== stock.name);
  const swapTo = sectorPeers[0];

  return (
    <div style={{ background: "#fff", border: "1.5px solid #ede8f8", borderRadius: 16, marginBottom: 10, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
      {/* Header row */}
      <div onClick={() => setOpen(!open)} style={{ padding: "14px 16px", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: "#1e1530" }}>{stock.name}</span>
              <span style={{ fontSize: 10, color: "#7a6e91", background: "#f3f0f9", padding: "2px 8px", borderRadius: 20 }}>{sector}</span>
              <span style={{ fontSize: 11, color: sc, background: sc + "15", border: `1px solid ${sc}30`, padding: "2px 9px", borderRadius: 20, fontWeight: 700 }}>{sig}</span>
            </div>
            <div style={{ color: "#a89cc0", fontSize: 12, marginTop: 3 }}>{company} · {stock.qty} shares</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1530" }}>Avg ₹{fmt(stock.avg)}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: plPos ? "#16a34a" : "#dc2626" }}>
              {plPos ? "+" : ""}₹{fmt(Math.abs(stock.pl))} ({plPos ? "+" : ""}{stock.plPct.toFixed(1)}%)
            </div>
          </div>
        </div>

        {/* Mini summary bar */}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {[
            ["Invested", `₹${fmtK(stock.invested)}`],
            ["Current", `₹${fmtK(stock.current)}`],
            ["Score", `${score}/10`, sc],
          ].map(([l, v, c]) => (
            <div key={l} style={{ flex: 1, background: l === "Score" ? sc + "10" : "#f8f5ff", borderRadius: 9, padding: "7px 10px", border: l === "Score" ? `1px solid ${sc}20` : "1px solid #ede8f8" }}>
              <div style={{ color: "#b8a9d4", fontSize: 10 }}>{l}</div>
              <div style={{ color: c || "#1e1530", fontSize: 13, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded tabs */}
      {open && (
        <div style={{ borderTop: "1.5px solid #ede8f8", padding: "0 16px 16px" }}>
          <div style={{ display: "flex", gap: 4, margin: "12px 0", overflowX: "auto" }}>
            {["metrics","bollinger","signals","swap","risks"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ background: tab === t ? "#ede9fe" : "transparent", color: tab === t ? "#6d28d9" : "#a89cc0", border: tab === t ? "1.5px solid #c4b5fd" : "1.5px solid transparent", borderRadius: 8, padding: "5px 12px", fontSize: 11.5, cursor: "pointer", textTransform: "capitalize", fontWeight: tab === t ? 700 : 500, whiteSpace: "nowrap" }}
              >{t}</button>
            ))}
          </div>

          {tab === "metrics" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                {[
                  ["P/E Ratio", pe, pe < 25 ? "#16a34a" : "#dc2626", "Lower = cheaper"],
                  ["P/BV", pbv, pbv < 3 ? "#16a34a" : "#d97706", "Price vs book value"],
                  ["ROCE %", roce + "%", roce > 18 ? "#16a34a" : "#d97706", "Capital efficiency"],
                  ["Sharpe", sharpe, sharpe > 1 ? "#16a34a" : sharpe > 0 ? "#d97706" : "#dc2626", "Risk-adj return"],
                ].map(([l, v, c, sub]) => (
                  <div key={l} style={{ background: "#f8f5ff", border: "1px solid #ede8f8", borderRadius: 10, padding: "11px 13px" }}>
                    <div style={{ color: "#a89cc0", fontSize: 10, marginBottom: 2 }}>{l}</div>
                    <div style={{ color: c, fontSize: 17, fontWeight: 800, marginBottom: 2 }}>{v}</div>
                    <div style={{ color: "#c4b5fd", fontSize: 10 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#f8f5ff", borderRadius: 10, padding: 13, border: "1px solid #ede8f8" }}>
                <div style={{ fontSize: 11.5, color: "#7a6e91", fontWeight: 700, marginBottom: 10 }}>Composite Score Breakdown</div>
                <ScoreBar label="Valuation (P/E)"  value={peS}    color="#3b82f6" />
                <ScoreBar label="Price / Book"     value={pbvS}   color="#8b5cf6" />
                <ScoreBar label="ROCE Quality"     value={roceS}  color="#16a34a" />
                <ScoreBar label="Sharpe Ratio"     value={sharpeS} color="#d97706" />
                <ScoreBar label="Price Momentum"   value={momS}   color="#ec4899" />
                <div style={{ marginTop: 10, padding: "9px 12px", background: sc + "10", borderRadius: 9, border: `1px solid ${sc}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#7a6e91", fontSize: 12.5 }}>Composite Signal</span>
                  <span style={{ color: sc, fontWeight: 800, fontSize: 14 }}>{score}/10 — {sig}</span>
                </div>
              </div>
            </>
          )}

          {tab === "bollinger" && <BollingerChart stock={stock} />}

          {tab === "signals" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["30D Trend",    stock.plPct > 3  ? "BULLISH ↑"      : "BEARISH ↓",     stock.plPct > 3  ? "#16a34a" : "#dc2626"],
                ["5Y View",     stock.plPct > 50 ? "OUTPERFORMER"   : "UNDERPERFORMER", stock.plPct > 50 ? "#16a34a" : "#d97706"],
                ["vs Nifty 50", stock.plPct > 15 ? "OUTPERFORM"     : "UNDERPERFORM",   stock.plPct > 15 ? "#16a34a" : "#d97706"],
                ["RSI (14D)",   (45 + Math.abs(stock.plPct) % 35).toFixed(0),            "#7c3aed"],
                ["Volume",      score > 6  ? "ABOVE AVG" : "BELOW AVG",                  score > 6  ? "#16a34a" : "#d97706"],
                ["Momentum",    score > 7  ? "STRONG"   : score > 5 ? "NEUTRAL" : "WEAK", score > 7 ? "#16a34a" : score > 5 ? "#d97706" : "#dc2626"],
              ].map(([l, v, c]) => (
                <div key={l} style={{ background: "#f8f5ff", border: "1px solid #ede8f8", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: "#a89cc0", fontSize: 10, marginBottom: 3 }}>{l}</div>
                  <div style={{ color: c, fontSize: 12.5, fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "swap" && (
            <div>
              {swapTo ? (
                <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 8 }}>💡 Swap Suggestion</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "5px 12px", color: "#991b1b", fontWeight: 700, fontSize: 13 }}>{stock.name}</span>
                    <span style={{ color: "#6b7280", fontSize: 18 }}>→</span>
                    <span style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8, padding: "5px 12px", color: "#166534", fontWeight: 700, fontSize: 13 }}>{swapTo}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}>
                    {swapTo} is in the same sector ({sector}) and may offer better risk-adjusted returns based on sector rotation patterns. Evaluate based on your tax implications and holding period.
                  </div>
                  {sectorPeers.length > 1 && (
                    <div style={{ marginTop: 10, fontSize: 11.5, color: "#6b7280" }}>
                      Other peers in sector: {sectorPeers.slice(1).join(", ")}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: "#f8f5ff", borderRadius: 12, padding: 14, fontSize: 13, color: "#7a6e91" }}>
                  No direct swap identified for this sector. Consider holding or asking the AI chatbot for alternatives.
                </div>
              )}
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#92400e", lineHeight: 1.6 }}>
                ⚠️ Swap suggestions are educational only. Research thoroughly before acting.
              </div>
            </div>
          )}

          {tab === "risks" && (
            <div>
              {[
                `Market risk: Broad Nifty/Sensex correction would affect ${stock.name} regardless of fundamentals`,
                `Sector risk: Regulatory or structural changes in ${sector} could compress multiples by 15–25%`,
                stock.plPct > 80
                  ? `Concentration risk: ${stock.plPct.toFixed(0)}% gain means this position may be oversized vs cost — consider partial booking`
                  : stock.plPct < -10
                  ? `Drawdown risk: Position is at ${stock.plPct.toFixed(1)}% loss — assess if thesis has changed before averaging down`
                  : `Position risk: Hold within portfolio weight limits — avoid overconcentration in single stocks`,
                `Liquidity risk: In market stress, mid/small caps may be harder to exit at fair prices`,
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: 12, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#dc2626", flexShrink: 0, marginTop: 1 }}>⚠</span>
                  <span style={{ color: "#7f1d1d", fontSize: 12.5, lineHeight: 1.65 }}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChatBot({ portfolio }) {
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    text: `Hi! I've loaded your ${portfolio.length} holdings: ${portfolio.map(s => s.name).join(", ")}. Ask me anything — risk analysis, sector concentration, swap ideas, what to do with a loss, or any specific stock. (Educational only)`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const summary = portfolio.map(s =>
    `${s.name}(${getCompanyName(s.name)}, sector:${getSector(s.name)}, qty:${s.qty}, avgBuy:₹${fmt(s.avg)}, pl:${s.plPct.toFixed(1)}%, invested:₹${fmtK(s.invested)})`
  ).join(" | ");

  const system = `You are an educational stock market analyst for Indian markets (NSE/BSE Nifty/Sensex stocks).
User's portfolio: ${summary}
- Give concise, specific, insightful analysis
- Reference actual stock names and numbers from their portfolio
- Always clarify this is educational, not SEBI-registered advice
- Suggest swaps within same sector when relevant
- Flag systemic risks clearly`;

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setMsgs(p => [...p, { role: "user", text }]);
    setLoading(true);
    try {
      const history = [...msgs, { role: "user", text }].map(m => ({ role: m.role, content: m.text }));
      const reply = await callClaude(history, system);
      setMsgs(p => [...p, { role: "assistant", text: reply }]);
    } catch (e) {
      setMsgs(p => [...p, { role: "assistant", text: "Sorry, something went wrong. Try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", border: "1.5px solid #ede8f8", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1.5px solid #ede8f8", display: "flex", alignItems: "center", gap: 10, background: "#faf8ff" }}>
        <div style={{ width: 8, height: 8, background: "#16a34a", borderRadius: "50%" }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: "#1e1530" }}>AI Portfolio Analyst</span>
        <span style={{ fontSize: 10, color: "#b8a9d4", marginLeft: "auto" }}>Educational · Not SEBI advice</span>
      </div>
      <div style={{ height: 320, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "88%", background: m.role === "user" ? "#ede9fe" : "#f8f5ff", border: `1px solid ${m.role === "user" ? "#c4b5fd" : "#ede8f8"}`, borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "10px 14px", color: m.role === "user" ? "#4c1d95" : "#2d1b4e", fontSize: 13.5, lineHeight: 1.65 }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ background: "#f8f5ff", border: "1px solid #ede8f8", borderRadius: "14px 14px 14px 4px", padding: "10px 14px", display: "flex", gap: 5, alignItems: "center" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 7, height: 7, background: "#c4b5fd", borderRadius: "50%", animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 12px", borderTop: "1.5px solid #ede8f8", display: "flex", gap: 8, background: "#faf8ff" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about risks, swaps, sector analysis…"
          style={{ flex: 1, background: "#fff", border: "1.5px solid #e9d5ff", borderRadius: 10, padding: "10px 14px", color: "#1e1530", fontSize: 13.5, outline: "none", fontFamily: "inherit" }}
        />
        <button onClick={send} disabled={loading}
          style={{ background: loading ? "#f3f0f9" : "#7c3aed", border: "none", borderRadius: 10, padding: "10px 18px", color: loading ? "#c4b5fd" : "#fff", cursor: loading ? "default" : "pointer", fontSize: 18, fontWeight: 700, transition: "background 0.2s" }}>
          →
        </button>
      </div>
    </div>
  );
}

// ─── Engine Screen ────────────────────────────────────────────────────────────

function EngineScreen({ portfolio, onBack }) {
  const [tab, setTab] = useState("holdings");

  const totalInvested = portfolio.reduce((a, s) => a + s.invested, 0);
  const totalCurrent  = portfolio.reduce((a, s) => a + s.current,  0);
  const totalPL       = totalCurrent - totalInvested;
  const totalPct      = totalInvested ? ((totalPL / totalInvested) * 100).toFixed(2) : "0.00";
  const plPos         = totalPL >= 0;

  const sectorMap = {};
  portfolio.forEach(s => { const sec = getSector(s.name); sectorMap[sec] = (sectorMap[sec] || 0) + s.current; });
  const sectors = Object.entries(sectorMap).sort((a, b) => b[1] - a[1]);
  const colors  = ["#7c3aed","#2563eb","#16a34a","#d97706","#dc2626","#0891b2","#db2777","#65a30d","#9333ea","#0f766e"];

  return (
    <div style={{ minHeight: "100vh", background: "#f7f4fd", fontFamily: "'Figtree', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-4px);opacity:1} }
        @keyframes fadeup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 4px; }
      `}</style>

      {/* Sticky header */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #ede8f8", padding: "12px 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={onBack} style={{ background: "#f3f0f9", border: "1px solid #ede8f8", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#7c3aed", cursor: "pointer", fontWeight: 700 }}>← Edit</button>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}><span style={{ color: "#7c3aed" }}>Quant</span>folio</div>
              <div style={{ fontSize: 10, color: "#b8a9d4" }}>{portfolio.length} holdings · Educational</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: plPos ? "#16a34a" : "#dc2626" }}>
              {plPos ? "+" : ""}₹{fmtK(Math.abs(totalPL))}
            </div>
            <div style={{ fontSize: 10, color: "#b8a9d4" }}>{plPos ? "+" : ""}{totalPct}% simulated P&amp;L</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["holdings","summary","chat"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, background: tab === t ? "#ede9fe" : "transparent", border: tab === t ? "1.5px solid #c4b5fd" : "1.5px solid #ede8f8", borderRadius: 10, padding: "7px 0", color: tab === t ? "#6d28d9" : "#a89cc0", fontSize: 12.5, fontWeight: 700, cursor: "pointer", textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ margin: "10px 14px 0", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "7px 12px", fontSize: 11.5, color: "#92400e" }}>
        ⚠️ Educational only · P&L is simulated · Not SEBI-registered advice
      </div>

      <div style={{ padding: "10px 14px 32px" }}>

        {tab === "holdings" && (
          <div style={{ animation: "fadeup 0.3s ease" }}>
            {portfolio.map((s, i) => <StockCard key={s.name + i} stock={s} />)}
          </div>
        )}

        {tab === "summary" && (
          <div style={{ animation: "fadeup 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                ["Total Invested", `₹${fmtK(totalInvested)}`, "#1e1530"],
                ["Simulated Value", `₹${fmtK(totalCurrent)}`, "#7c3aed"],
                ["Simulated P&L", `${plPos ? "+" : ""}₹${fmtK(Math.abs(totalPL))}`, plPos ? "#16a34a" : "#dc2626"],
                ["Return", `${plPos ? "+" : ""}${totalPct}%`, plPos ? "#16a34a" : "#dc2626"],
              ].map(([l, v, c]) => (
                <div key={l} style={{ background: "#fff", border: "1.5px solid #ede8f8", borderRadius: 14, padding: "13px 14px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 11, color: "#a89cc0", marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: c }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #ede8f8", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#b8a9d4", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>Suggested Actions</div>
              {portfolio.slice().sort((a, b) => b.plPct - a.plPct).map((s, i) => {
                const [label, color] = s.plPct > 80 ? ["REVIEW EXIT", "#dc2626"] : s.plPct > 20 ? ["HOLD", "#d97706"] : s.plPct >= 0 ? ["ACCUMULATE", "#16a34a"] : ["REVIEW", "#dc2626"];
                return (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < portfolio.length - 1 ? "1px solid #f3f0f9" : "none", alignItems: "center" }}>
                    <span style={{ background: color + "15", color, fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 700, border: `1px solid ${color}30`, whiteSpace: "nowrap" }}>{label}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#1e1530" }}>{s.name}</span>
                      <span style={{ fontSize: 11.5, color: "#a89cc0", marginLeft: 8 }}>{getSector(s.name)}</span>
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: s.plPct >= 0 ? "#16a34a" : "#dc2626" }}>
                      {s.plPct >= 0 ? "+" : ""}{s.plPct.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #ede8f8", borderRadius: 16, padding: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#b8a9d4", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>Sector Concentration</div>
              {sectors.map(([sec, val], i) => {
                const pct = totalCurrent ? (val / totalCurrent * 100).toFixed(1) : 0;
                return (
                  <div key={sec} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                      <span style={{ color: "#2d1b4e", fontWeight: 500 }}>{sec}</span>
                      <span style={{ color: colors[i % colors.length], fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ background: "#f3f0f9", borderRadius: 4, height: 7, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, background: colors[i % colors.length], height: "100%", borderRadius: 4, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "chat" && (
          <div style={{ animation: "fadeup 0.3s ease" }}>
            <ChatBot portfolio={portfolio} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  return portfolio
    ? <EngineScreen portfolio={portfolio} onBack={() => setPortfolio(null)} />
    : <SelectorScreen onDone={setPortfolio} />;
}
=======
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quantfolio</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
>>>>>>> 918002c556bc5d4c019a6a2999a709aa817aebbe
