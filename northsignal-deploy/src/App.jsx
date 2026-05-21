import { useState } from "react";

const TEAL = "#0D7A6B";
const TEAL_LIGHT = "#E8F5F2";
const TEAL_MID = "#5DCAA5";
const SLATE = "#1E2A38";
const SLATE_MID = "#5A6A7A";
const BORDER = "#E2E8F0";
const OFF_WHITE = "#F7F9FA";

// ── SEED DATA ────────────────────────────────────────────────────────

const SIGNALS = [
  {
    id: 1,
    title: "Fort Nelson First Nation — Remote Hydrogen & BESS Replacement Project",
    province: "BC",
    technology: "Green H2",
    stage: "Pre-feasibility",
    date: "May 2026",
    gaps: ["Developer", "Project financing", "Technology supplier"],
    description: "Fort Nelson First Nation is seeking partners to develop a green hydrogen and battery energy storage system to replace diesel generation serving approximately 650 residents. Federal ISED funding letter received. Community energy coordinator appointed.",
    source: "NRCan Indigenous Community Energy Program",
    urgent: true,
  },
  {
    id: 2,
    title: "Port of Prince Rupert — Green Hydrogen Bunkering Feasibility",
    province: "BC",
    technology: "Green H2",
    stage: "Feasibility",
    date: "Apr 2026",
    gaps: ["Equity financing", "Offtake agreement"],
    description: "Port authority issued RFI for green hydrogen bunkering infrastructure to serve container shipping corridor. $4.2M feasibility study underway. Seeking equity co-investment and shipping line offtake commitments.",
    source: "Port of Prince Rupert Public Procurement",
    urgent: false,
  },
  {
    id: 3,
    title: "Alberta Carbon Trunk Line — Blue Hydrogen Expansion",
    province: "AB",
    technology: "Blue H2",
    stage: "Development",
    date: "Apr 2026",
    gaps: ["Equity financing", "CCS technology partner"],
    description: "Existing ACTL operator seeking to expand blue hydrogen production capacity by 200 MW with integrated CCS. Project qualifies for federal Clean Hydrogen ITC at 40% tier. Environmental assessment filed March 2026.",
    source: "Alberta Energy Regulator — Project Registry",
    urgent: false,
  },
  {
    id: 4,
    title: "Énergie Propre Québec — Green Ammonia Export Facility",
    province: "QC",
    technology: "Low-carbon ammonia",
    stage: "Pre-feasibility",
    date: "Mar 2026",
    gaps: ["Developer", "Offtake agreement", "Project financing"],
    description: "Québec-based consortium exploring wind-to-ammonia export facility targeting European fertilizer and shipping markets. 500 MW electrolyser scale proposed. Seeking experienced project developer and EU offtake partner.",
    source: "Investissement Québec — Green Hydrogen Initiative",
    urgent: false,
  },
  {
    id: 5,
    title: "Strait of Canso — Atlantic Green Hydrogen Export Hub",
    province: "NS",
    technology: "Green H2",
    stage: "Development",
    date: "Mar 2026",
    gaps: ["Grid connection agreement", "Equity financing"],
    description: "Shovel-ready wind-to-hydrogen project targeting Canada-Germany hydrogen alliance shipments. 800 MW offshore wind resource identified. NSPI grid connection application filed. Seeking $120M equity co-investment.",
    source: "Nova Scotia Department of Energy",
    urgent: true,
  },
  {
    id: 6,
    title: "Air Canada — Sustainable Aviation Fuel Procurement Program",
    province: "ON",
    technology: "SAF",
    stage: "Procurement",
    date: "Feb 2026",
    gaps: ["SAF supplier", "Long-term offtake"],
    description: "Air Canada issued RFP for domestic SAF supply beginning 2028, targeting 10% SAF blend across Canadian routes. Seeks suppliers who can demonstrate CI below CORSIA threshold. 10-year offtake framework available.",
    source: "Air Canada Sustainability Report & RFP Portal",
    urgent: false,
  },
  {
    id: 7,
    title: "Cenovus Energy — Blue Hydrogen Industrial Decarbonization",
    province: "AB",
    technology: "Blue H2",
    stage: "Feasibility",
    date: "Feb 2026",
    gaps: ["Technology partner", "CCS storage operator"],
    description: "Cenovus seeking technology partner for 300 MW blue hydrogen facility to decarbonize existing refinery operations at Edmonton complex. Dedicated geological storage formation identified. SMR + CCS configuration preferred.",
    source: "Cenovus Corporate Press Release — Feb 2026",
    urgent: false,
  },
  {
    id: 8,
    title: "City of Winnipeg — H2 Transit Bus Fleet Pilot",
    province: "MB",
    technology: "Green H2",
    stage: "Procurement",
    date: "Jan 2026",
    gaps: ["Fuelling infrastructure", "Bus supplier", "H2 supply contract"],
    description: "City of Winnipeg Transit issued RFP for 20 fuel cell electric buses and associated hydrogen fuelling infrastructure. Federal ZEV Transit Fund application approved. Operations target 2027.",
    source: "City of Winnipeg — Procurement Portal",
    urgent: false,
  },
];

const POLICIES = [
  {
    id: 1,
    title: "Clean Hydrogen Investment Tax Credit (ITC)",
    jurisdiction: "Federal",
    type: "Tax credit",
    technology: ["Green H2", "Blue H2", "Low-carbon ammonia"],
    value: "15–40% of eligible capital costs",
    deadline: "Projects commissioned by Dec 31, 2034",
    summary: "Refundable ITC for eligible hydrogen production equipment. Rate indexed to carbon intensity: ≤0.75 kg CO2e/kg H2 = 40%; 0.75–2.0 = 25%; 2.0–4.0 = 15%. Administered by CRA and NRCan. Requires Fuel LCA Model CI verification.",
    source: "Canada Revenue Agency",
    url: "https://canada.ca/clean-hydrogen-itc",
    new: true,
  },
  {
    id: 2,
    title: "Clean Fuel Regulations — Credit Trading System",
    jurisdiction: "Federal",
    type: "Regulation + Credits",
    technology: ["Green H2", "Blue H2", "SAF", "E-fuels"],
    value: "Credit price $80–$350/tonne CO2e",
    deadline: "Ongoing",
    summary: "Producers of low-carbon fuels earn compliance credits under Canada's Clean Fuel Regulations. Credits tradeable on the CATS platform. Carbon intensity calculated using NRCan Fuel LCA Model. Applicable to hydrogen used as a transport fuel.",
    source: "Environment and Climate Change Canada",
    url: "https://canada.ca/clean-fuel-regulations",
    new: false,
  },
  {
    id: 3,
    title: "Alberta Hydrogen Roadmap — $57M Innovation Fund",
    jurisdiction: "Alberta",
    type: "Grant",
    technology: ["Green H2", "Blue H2", "Low-carbon ammonia"],
    value: "Up to $5M per project",
    deadline: "Rolling — next intake Q3 2026",
    summary: "Alberta Innovates administers $57M fund supporting hydrogen technology demonstration, feasibility studies, and pilot projects. Preference for projects integrating with existing oil and gas infrastructure. Blue hydrogen with CCS eligible.",
    source: "Alberta Innovates",
    url: "https://albertainnovates.ca/hydrogen",
    new: false,
  },
  {
    id: 4,
    title: "BC Hydrogen and Fuel Cell Industry Support Program",
    jurisdiction: "British Columbia",
    type: "Grant + loan",
    technology: ["Green H2", "SAF"],
    value: "Up to $2M per project",
    deadline: "Applications open Q2 2026",
    summary: "CleanBC program supporting hydrogen and fuel cell project development in BC. Eligible costs include feasibility studies, engineering design, and pilot capital. Projects must demonstrate BC manufacturing or deployment component.",
    source: "CleanBC / BC Ministry of Energy",
    url: "https://cleanbc.gov.bc.ca/hydrogen",
    new: false,
  },
  {
    id: 5,
    title: "Canada-Germany Hydrogen Alliance — Export Certification Framework",
    jurisdiction: "Federal / International",
    type: "Certification",
    technology: ["Green H2", "Low-carbon ammonia"],
    value: "Market access to EU buyers",
    deadline: "Framework effective Jan 2027",
    summary: "Bilateral certification framework enabling Canadian hydrogen and ammonia producers to certify production under EU RFNBO methodology for export to Germany. CI threshold: ≤3.4 t CO2e/t H2 equivalent. TÜV SÜD designated as certification body.",
    source: "Natural Resources Canada",
    url: "https://natural-resources.canada.ca/hydrogen-germany",
    new: true,
  },
  {
    id: 6,
    title: "NRCan Fuel Life Cycle Assessment Model (FLCAM)",
    jurisdiction: "Federal",
    type: "Methodology / Standard",
    technology: ["Green H2", "Blue H2", "SAF", "E-fuels", "Low-carbon ammonia"],
    value: "Mandatory CI calculation tool",
    deadline: "Current version June 2024; next update Fall 2026",
    summary: "Mandated methodology for calculating carbon intensity of fuels under the Clean Fuel Regulations and Clean Hydrogen ITC. Predefined pathways for PEM electrolysis, alkaline electrolysis, SMR, biomass gasification with/without CCS. Project-specific inputs allowed.",
    source: "NRCan",
    url: "https://canada.ca/flcam",
    new: false,
  },
  {
    id: 7,
    title: "CORSIA — Carbon Offsetting for SAF",
    jurisdiction: "International (ICAO)",
    type: "Standard",
    technology: ["SAF"],
    value: "SAF credit eligibility for airlines",
    deadline: "Mandatory phase from 2027",
    summary: "ICAO Carbon Offsetting and Reduction Scheme for International Aviation. SAF producers must demonstrate lifecycle GHG reductions ≥10% vs jet fuel baseline using CORSIA approved methodology. Eligible feedstocks include agricultural residues, municipal solid waste, and power-to-liquid.",
    source: "ICAO / Transport Canada",
    url: "https://icao.int/corsia",
    new: false,
  },
  {
    id: 8,
    title: "Atlantic Canada Opportunities Agency — Green Hydrogen Stream",
    jurisdiction: "Atlantic Canada",
    type: "Grant",
    technology: ["Green H2", "Low-carbon ammonia"],
    value: "Up to $10M per project",
    deadline: "Next intake Sep 2026",
    summary: "ACOA dedicated stream for green hydrogen and ammonia export project development in Atlantic Canada. Eligible activities include feasibility studies, front-end engineering, environmental assessments, and community consultation. Priority for projects with Indigenous equity participation.",
    source: "ACOA",
    url: "https://acoa-apeca.gc.ca/hydrogen",
    new: true,
  },
];

const COMPANIES = [
  { id: 1, name: "Ballard Power Systems", type: "Technology vendor", tech: ["Fuel cells"], province: "BC", employees: "~1,100", description: "Global leader in PEM fuel cell technology. Products include modules for heavy-duty transport, stationary power, and marine applications. TSX/NASDAQ listed.", verified: true },
  { id: 2, name: "Svante Technologies", type: "Technology vendor", tech: ["Carbon capture"], province: "BC", employees: "~300", description: "Carbon capture technology company. Solid sorbent-based CO2 capture systems applicable to blue hydrogen and industrial decarbonization projects.", verified: true },
  { id: 3, name: "Enbridge Gas", type: "Utility / Developer", tech: ["Blue H2", "Green H2"], province: "ON", employees: "~12,000", description: "Canada's largest natural gas distribution utility. Active hydrogen blending pilots and blue hydrogen project development across Ontario and Quebec.", verified: true },
  { id: 4, name: "HTEC Hydrogen Technology", type: "Developer / Operator", tech: ["Green H2"], province: "BC", employees: "~150", description: "Canada's leading hydrogen fuelling network operator. 10 stations operating across BC. Building North America's first 700-bar heavy-duty truck refuelling network.", verified: true },
  { id: 5, name: "Hydrofarm Energy", type: "Project developer", tech: ["Green H2", "Low-carbon ammonia"], province: "AB", employees: "~40", description: "Alberta-based green hydrogen and ammonia project developer. Three projects in feasibility stage including a 150 MW electrolyser project targeting export markets.", verified: false },
  { id: 6, name: "Ekona Power", type: "Technology vendor", tech: ["Turquoise H2"], province: "BC", employees: "~80", description: "Turquoise hydrogen via methane pyrolysis. Novel technology producing solid carbon co-product. Pilot plant operational. Series B funding received 2025.", verified: true },
];

const CI_PATHWAYS = [
  { name: "PEM electrolysis — BC grid", ci: 2.1, us45v: "Tier 3 (20% credit)", canada: "25% ITC", eu: "Does not qualify (>3.4)", corsia: "N/A" },
  { name: "PEM electrolysis — Alberta grid", ci: 8.4, us45v: "Does not qualify", canada: "Does not qualify", eu: "Does not qualify", corsia: "N/A" },
  { name: "PEM electrolysis — dedicated wind", ci: 0.4, us45v: "Tier 1 (100% credit)", canada: "40% ITC", eu: "Qualifies as RFNBO", corsia: "N/A" },
  { name: "SMR + CCS (90% capture)", ci: 1.8, us45v: "Tier 2 (33.4% credit)", canada: "25% ITC", eu: "Does not qualify", corsia: "N/A" },
  { name: "ATR + CCS (97% capture)", ci: 0.6, us45v: "Tier 1 (100% credit)", canada: "40% ITC", eu: "Qualifies (marginal)", corsia: "N/A" },
  { name: "Bio-SAF — agricultural residue", ci: 12.4, us45v: "N/A", canada: "CFR credits eligible", eu: "Qualifies (CORSIA)", corsia: "Qualifies" },
  { name: "Power-to-liquid e-SAF — dedicated RE", ci: 4.2, us45v: "N/A", canada: "CFR credits eligible", eu: "Qualifies as RFNBO", corsia: "Qualifies" },
];

// ── COMPONENTS ────────────────────────────────────────────────────────

const Badge = ({ label, color = TEAL, bg = TEAL_LIGHT }) => (
  <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: bg, color, whiteSpace: "nowrap" }}>{label}</span>
);

const GapBadge = ({ label }) => (
  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#FEF3E2", color: "#92520A", border: "0.5px solid #F5C97A", whiteSpace: "nowrap" }}>{label}</span>
);

const NewBadge = () => (
  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 3, background: TEAL, color: "#fff", letterSpacing: "0.04em" }}>NEW</span>
);

const SectionHeader = ({ title, subtitle, count }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: SLATE }}>{title}</h2>
      {count !== undefined && <span style={{ fontSize: 13, color: SLATE_MID }}>{count} results</span>}
    </div>
    {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13, color: SLATE_MID }}>{subtitle}</p>}
  </div>
);

const FilterBar = ({ filters, active, onChange }) => (
  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
    {filters.map(f => (
      <button key={f} onClick={() => onChange(f)} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, border: `1px solid ${active === f ? TEAL : BORDER}`, background: active === f ? TEAL : "#fff", color: active === f ? "#fff" : SLATE_MID, cursor: "pointer", fontWeight: active === f ? 500 : 400, transition: "all 0.15s" }}>{f}</button>
    ))}
  </div>
);

// ── MODULE 1: PROJECT SIGNAL FEED ─────────────────────────────────────

function SignalCard({ signal, onClick }) {
  const stageColors = {
    "Pre-feasibility": { bg: "#EEF2FF", color: "#4338CA" },
    "Feasibility": { bg: "#FEF3E2", color: "#92520A" },
    "Development": { bg: "#E8F5F2", color: "#0D7A6B" },
    "Procurement": { bg: "#F0FDF4", color: "#166534" },
  };
  const sc = stageColors[signal.stage] || { bg: OFF_WHITE, color: SLATE_MID };
  return (
    <div onClick={() => onClick(signal)} style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: "16px 18px", cursor: "pointer", transition: "box-shadow 0.15s", borderLeft: signal.urgent ? `3px solid ${TEAL}` : `0.5px solid ${BORDER}` }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: SLATE, lineHeight: 1.4 }}>{signal.title}</h3>
        {signal.urgent && <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 3, background: TEAL, color: "#fff", whiteSpace: "nowrap", flexShrink: 0 }}>ACTIVE</span>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        <Badge label={signal.province} bg="#F1F5F9" color={SLATE} />
        <Badge label={signal.technology} />
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: sc.bg, color: sc.color }}>{signal.stage}</span>
      </div>
      <p style={{ margin: "0 0 10px", fontSize: 13, color: SLATE_MID, lineHeight: 1.5 }}>{signal.description.slice(0, 120)}…</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        <span style={{ fontSize: 11, color: SLATE_MID, marginRight: 4 }}>Gaps:</span>
        {signal.gaps.map(g => <GapBadge key={g} label={g} />)}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: "#9CA3AF" }}>Source: {signal.source} · {signal.date}</div>
    </div>
  );
}

function SignalDetail({ signal, onClose }) {
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
      <button onClick={onClose} style={{ float: "right", background: "none", border: "none", fontSize: 18, cursor: "pointer", color: SLATE_MID }}>✕</button>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <Badge label={signal.province} bg="#F1F5F9" color={SLATE} />
        <Badge label={signal.technology} />
        <Badge label={signal.stage} bg="#FEF3E2" color="#92520A" />
        {signal.urgent && <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 3, background: TEAL, color: "#fff" }}>ACTIVE SIGNAL</span>}
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 600, color: SLATE, lineHeight: 1.4 }}>{signal.title}</h2>
      <p style={{ margin: "0 0 18px", fontSize: 14, color: SLATE_MID, lineHeight: 1.6 }}>{signal.description}</p>
      <div style={{ background: "#FEF9EE", border: "0.5px solid #F5C97A", borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, color: "#92520A" }}>STAKEHOLDER GAPS</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {signal.gaps.map(g => <GapBadge key={g} label={g} />)}
        </div>
      </div>
      <div style={{ background: TEAL_LIGHT, borderRadius: 8, padding: "12px 16px" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, color: TEAL }}>SIGNAL SOURCE</p>
        <p style={{ margin: 0, fontSize: 13, color: SLATE_MID }}>{signal.source} · {signal.date}</p>
      </div>
      <button style={{ marginTop: 16, width: "100%", padding: "10px 0", background: TEAL, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
        Express Interest in This Project
      </button>
    </div>
  );
}

function SignalFeed() {
  const [techFilter, setTechFilter] = useState("All");
  const [provinceFilter, setProvinceFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const techs = ["All", "Green H2", "Blue H2", "SAF", "Low-carbon ammonia", "E-fuels"];
  const provinces = ["All", "AB", "BC", "ON", "QC", "NS", "MB"];
  const filtered = SIGNALS.filter(s =>
    (techFilter === "All" || s.technology === techFilter) &&
    (provinceFilter === "All" || s.province === provinceFilter)
  );
  return (
    <div>
      <SectionHeader title="Project Signal Feed" subtitle="Live hydrogen and clean energy project opportunities across Canada — tagged by technology, stage, and stakeholder gaps" count={filtered.length} />
      <div style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 500, color: SLATE_MID }}>FILTER BY TECHNOLOGY</p>
        <FilterBar filters={techs} active={techFilter} onChange={setTechFilter} />
        <p style={{ margin: "8px 0 8px", fontSize: 12, fontWeight: 500, color: SLATE_MID }}>FILTER BY PROVINCE</p>
        <FilterBar filters={provinces} active={provinceFilter} onChange={setProvinceFilter} />
      </div>
      {selected ? (
        <SignalDetail signal={selected} onClose={() => setSelected(null)} />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {filtered.map(s => <SignalCard key={s.id} signal={s} onClick={setSelected} />)}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: SLATE_MID, fontSize: 14 }}>No signals match your filters.</div>}
        </div>
      )}
    </div>
  );
}

// ── MODULE 2: POLICY NAVIGATOR ────────────────────────────────────────

function PolicyCard({ policy }) {
  const [open, setOpen] = useState(false);
  const typeColors = {
    "Tax credit": { bg: "#EEF2FF", color: "#4338CA" },
    "Grant": { bg: "#F0FDF4", color: "#166534" },
    "Regulation + Credits": { bg: "#FEF3E2", color: "#92520A" },
    "Certification": { bg: TEAL_LIGHT, color: TEAL },
    "Methodology / Standard": { bg: "#F1F5F9", color: SLATE_MID },
    "Grant + loan": { bg: "#F0FDF4", color: "#166534" },
    "Standard": { bg: "#F1F5F9", color: SLATE_MID },
  };
  const tc = typeColors[policy.type] || { bg: OFF_WHITE, color: SLATE_MID };
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: tc.bg, color: tc.color }}>{policy.type}</span>
            <Badge label={policy.jurisdiction} bg="#F1F5F9" color={SLATE} />
            {policy.new && <NewBadge />}
          </div>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600, color: SLATE }}>{policy.title}</h3>
          <p style={{ margin: 0, fontSize: 13, color: TEAL, fontWeight: 500 }}>{policy.value}</p>
        </div>
        <span style={{ fontSize: 18, color: SLATE_MID, flexShrink: 0, marginTop: 2 }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div style={{ borderTop: `0.5px solid ${BORDER}`, padding: "14px 18px", background: OFF_WHITE }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: SLATE_MID, lineHeight: 1.6 }}>{policy.summary}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: SLATE_MID }}>Applicable to:</span>
            {policy.technology.map(t => <Badge key={t} label={t} />)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 12, color: SLATE_MID }}>Deadline: <strong>{policy.deadline}</strong></p>
            <a href={policy.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: TEAL, textDecoration: "none", fontWeight: 500 }}>View primary source →</a>
          </div>
        </div>
      )}
    </div>
  );
}

function PolicyNavigator() {
  const [search, setSearch] = useState("");
  const [jurisFilter, setJurisFilter] = useState("All");
  const jurisdictions = ["All", "Federal", "Alberta", "British Columbia", "Atlantic Canada", "International (ICAO)"];
  const filtered = POLICIES.filter(p =>
    (jurisFilter === "All" || p.jurisdiction === jurisFilter) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.summary.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div>
      <SectionHeader title="Policy & Incentive Navigator" subtitle="Federal and provincial hydrogen policies, tax credits, codes, and standards — searchable and plain-language summarised" count={filtered.length} />
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search policies, incentives, standards…" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: "none" }} />
      </div>
      <FilterBar filters={jurisdictions} active={jurisFilter} onChange={setJurisFilter} />
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map(p => <PolicyCard key={p.id} policy={p} />)}
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: SLATE_MID, fontSize: 14 }}>No policies match your search.</div>}
      </div>
    </div>
  );
}

// ── MODULE 3: MARKETPLACE ─────────────────────────────────────────────

function CompanyCard({ company }) {
  const typeColors = {
    "Technology vendor": { bg: "#EEF2FF", color: "#4338CA" },
    "Developer / Operator": { bg: TEAL_LIGHT, color: TEAL },
    "Project developer": { bg: "#FEF3E2", color: "#92520A" },
    "Utility / Developer": { bg: "#F0FDF4", color: "#166534" },
  };
  const tc = typeColors[company.type] || { bg: OFF_WHITE, color: SLATE_MID };
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: SLATE }}>{company.name}</h3>
            {company.verified && <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 3, background: "#E8F5F2", color: TEAL }}>✓ VERIFIED</span>}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: tc.bg, color: tc.color }}>{company.type}</span>
            <Badge label={company.province} bg="#F1F5F9" color={SLATE} />
          </div>
        </div>
      </div>
      <p style={{ margin: "8px 0 10px", fontSize: 13, color: SLATE_MID, lineHeight: 1.5 }}>{company.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
        {company.tech.map(t => <Badge key={t} label={t} />)}
      </div>
      <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>Employees: {company.employees}</p>
    </div>
  );
}

function Marketplace() {
  const [typeFilter, setTypeFilter] = useState("All");
  const types = ["All", "Technology vendor", "Project developer", "Developer / Operator", "Utility / Developer"];
  const filtered = COMPANIES.filter(c => typeFilter === "All" || c.type === typeFilter);
  return (
    <div>
      <SectionHeader title="Ecosystem Marketplace" subtitle="Canadian hydrogen and clean energy companies, developers, technology vendors, and service providers" count={filtered.length} />
      <div style={{ background: TEAL_LIGHT, border: `0.5px solid ${TEAL_MID}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <p style={{ margin: 0, fontSize: 13, color: TEAL }}>Are you a Canadian hydrogen or clean energy company? <strong>Claim your free listing.</strong></p>
        <button style={{ fontSize: 12, padding: "6px 14px", background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 500 }}>Register your company →</button>
      </div>
      <FilterBar filters={types} active={typeFilter} onChange={setTypeFilter} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {filtered.map(c => <CompanyCard key={c.id} company={c} />)}
      </div>
      <div style={{ marginTop: 20, background: OFF_WHITE, borderRadius: 8, padding: "14px 18px", textAlign: "center" }}>
        <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 500, color: SLATE }}>200+ companies in full database</p>
        <p style={{ margin: 0, fontSize: 13, color: SLATE_MID }}>Investors, EPCs, Indigenous development corporations, financiers, and government agencies — upgrading now.</p>
      </div>
    </div>
  );
}

// ── MODULE 4: MARKET INTELLIGENCE ────────────────────────────────────

function MarketIntelligence() {
  const stats = [
    { label: "Announced project investment", value: "$100B+", sub: "80+ low-carbon projects" },
    { label: "Federal ITC support to 2035", value: "$17.7B", sub: "Clean Hydrogen ITC" },
    { label: "Sector revenue growth 2021–23", value: "+69.6%", sub: "CHA Sector Profile 2024" },
    { label: "H2 fuel cell CAGR 2025–33", value: "17.4%", sub: "IMARC Group" },
  ];
  const hubs = [
    { region: "Alberta", focus: "Blue H2 + CCS", activity: "High", projects: 28, notes: "$57M provincial innovation fund. Calgary H2 Hub designated. Strong SMR + CCS pipeline." },
    { region: "British Columbia", focus: "Green H2 + Fuel cells", activity: "Very high", projects: 24, notes: "50%+ of Canada's H2 companies. New 2025 regulatory framework. HTEC fuelling network." },
    { region: "Atlantic Canada", focus: "Export Green H2 + Ammonia", activity: "High", projects: 14, notes: "Canada-Germany Alliance anchor projects. NS and NB hydrogen roadmaps active." },
    { region: "Ontario / Québec", focus: "Industrial + Transit", activity: "Medium", projects: 11, notes: "H2 bus and train pilots. Refinery decarbonization. Largest end-use industrial market." },
    { region: "Saskatchewan / Manitoba", focus: "Green H2 + Ag ammonia", activity: "Emerging", projects: 5, notes: "Agricultural ammonia displacement opportunity. Grid expansion enabling renewables." },
  ];
  const actColor = { "Very high": TEAL, "High": "#2D9C7A", "Medium": "#E6A817", "Emerging": SLATE_MID };
  return (
    <div>
      <SectionHeader title="Market Intelligence" subtitle="Canadian hydrogen ecosystem snapshot — investment flows, regional hubs, and sector trends" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: TEAL_LIGHT, borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, color: TEAL, fontWeight: 500 }}>{s.label.toUpperCase()}</p>
            <p style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 700, color: TEAL }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#5DCAA5" }}>{s.sub}</p>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: SLATE, margin: "0 0 12px" }}>Regional Hubs</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {hubs.map(h => (
          <div key={h.region} style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: "14px 18px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ minWidth: 120 }}>
              <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600, color: SLATE }}>{h.region}</p>
              <p style={{ margin: "0 0 5px", fontSize: 12, color: SLATE_MID }}>{h.focus}</p>
              <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 12, background: TEAL_LIGHT, color: actColor[h.activity] || TEAL, fontWeight: 500 }}>{h.activity}</span>
            </div>
            <div style={{ flex: 1, borderLeft: `1px solid ${BORDER}`, paddingLeft: 16 }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: SLATE_MID }}><strong style={{ color: SLATE }}>{h.projects} active projects</strong></p>
              <p style={{ margin: 0, fontSize: 13, color: SLATE_MID, lineHeight: 1.5 }}>{h.notes}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: OFF_WHITE, borderRadius: 10, padding: "16px 18px", border: `0.5px solid ${BORDER}` }}>
        <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, color: SLATE }}>Quarterly Market Briefing — Q2 2026</p>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: SLATE_MID, lineHeight: 1.6 }}>Full briefing covers: federal ITC uptake rates, provincial policy updates, Canada-Germany hydrogen alliance progress, electrolyser cost trajectory, and project financing market conditions. Available to Pro and Enterprise subscribers.</p>
        <button style={{ fontSize: 13, padding: "8px 16px", background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 500 }}>Request Q2 2026 Briefing</button>
      </div>
    </div>
  );
}

// ── MODULE 5: EMISSIONS INTENSITY TRACKER ────────────────────────────

function EmissionsTracker() {
  const [selected, setSelected] = useState(0);
  const pw = CI_PATHWAYS[selected];
  const ciMax = 10;
  const ciPct = Math.min(pw.ci / ciMax, 1);
  const ciColor = pw.ci <= 1 ? "#16A34A" : pw.ci <= 4 ? "#E6A817" : "#DC2626";
  const thresholds = [
    { label: "Canada 40% ITC", ci: 0.75, color: "#16A34A" },
    { label: "Canada 25% ITC", ci: 2.0, color: "#84CC16" },
    { label: "EU RFNBO", ci: 3.4, color: "#F59E0B" },
    { label: "Canada 15% ITC", ci: 4.0, color: "#FB923C" },
  ];
  return (
    <div>
      <SectionHeader title="Emissions Intensity Tracker" subtitle="Carbon intensity calculation across Canadian, US, and EU certification standards for hydrogen and derivatives" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 500, color: SLATE_MID }}>SELECT PRODUCTION PATHWAY</p>
          <div style={{ display: "grid", gap: 8 }}>
            {CI_PATHWAYS.map((p, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ textAlign: "left", padding: "10px 14px", borderRadius: 8, border: `1px solid ${i === selected ? TEAL : BORDER}`, background: i === selected ? TEAL_LIGHT : "#fff", cursor: "pointer", fontSize: 13, color: i === selected ? TEAL : SLATE, fontWeight: i === selected ? 500 : 400, transition: "all 0.15s" }}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 500, color: SLATE_MID }}>CARBON INTENSITY RESULT</p>
          <div style={{ background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: "18px 18px 14px" }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p style={{ margin: "0 0 2px", fontSize: 11, color: SLATE_MID }}>Calculated CI</p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 700, color: ciColor }}>{pw.ci}</p>
              <p style={{ margin: 0, fontSize: 12, color: SLATE_MID }}>kg CO₂e / kg H₂ equivalent</p>
            </div>
            <div style={{ background: "#F1F5F9", borderRadius: 6, height: 10, marginBottom: 6, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${ciPct * 100}%`, background: ciColor, borderRadius: 6, transition: "width 0.3s" }} />
              {thresholds.map(t => (
                <div key={t.label} style={{ position: "absolute", left: `${Math.min(t.ci / ciMax, 1) * 100}%`, top: -3, width: 2, height: 16, background: t.color }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: SLATE_MID, marginBottom: 18 }}>
              <span>0</span><span>5</span><span>10+ kg CO₂e/kg</span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                { std: "Canada — Clean H2 ITC", val: pw.canada },
                { std: "Canada — CFR Credits", val: pw.canada.includes("ITC") ? "Check eligibility" : "Eligible" },
                { std: "US — 45V H2 PTC", val: pw.us45v },
                { std: "EU — RED III / RFNBO", val: pw.eu },
                { std: "CORSIA (SAF)", val: pw.corsia },
              ].map(r => {
                const good = r.val.includes("Qualifies") || r.val.includes("40%") || r.val.includes("Eligible") || r.val.includes("100%");
                const bad = r.val.includes("Does not") || r.val.includes("N/A");
                return (
                  <div key={r.std} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 6, background: good ? "#F0FDF4" : bad ? "#FEF2F2" : OFF_WHITE }}>
                    <span style={{ fontSize: 12, color: SLATE_MID }}>{r.std}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: good ? "#16A34A" : bad ? "#DC2626" : SLATE_MID }}>{r.val}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            {thresholds.map(t => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, background: t.color, borderRadius: 2 }} />
                <span style={{ fontSize: 10, color: SLATE_MID }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20, background: TEAL_LIGHT, border: `0.5px solid ${TEAL_MID}`, borderRadius: 10, padding: "14px 18px" }}>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: TEAL }}>Full CI Calculator — Coming in MVP</p>
        <p style={{ margin: 0, fontSize: 13, color: "#0F6E56" }}>Enter project-specific inputs — grid electricity CI, feedstock origin, CCS capture rate, transport distance — to generate a verified CI report for ITC applications, investor reporting, and offtake negotiations.</p>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────

const MODULES = [
  { id: "signals", label: "Project Signals", icon: "📡", badge: `${SIGNALS.length} live` },
  { id: "policy", label: "Policy Navigator", icon: "📋", badge: `${POLICIES.length} entries` },
  { id: "marketplace", label: "Marketplace", icon: "🏢", badge: `${COMPANIES.length} listed` },
  { id: "intelligence", label: "Market Intelligence", icon: "📊", badge: null },
  { id: "emissions", label: "Emissions Tracker", icon: "🌿", badge: `${CI_PATHWAYS.length} pathways` },
];

export default function App() {
  const [active, setActive] = useState("signals");

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", background: "#F7F9FA", color: SLATE }}>
      {/* Header */}
      <div style={{ background: SLATE, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>NorthSignal</span>
          <span style={{ fontSize: 11, color: TEAL_MID, fontWeight: 500, letterSpacing: "0.06em" }}>EARLY ACCESS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>Canadian Hydrogen Market — Pre-MVP Demo</span>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff" }}>U</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#fff", borderBottom: `0.5px solid ${BORDER}`, padding: "0 24px", display: "flex", gap: 0, overflowX: "auto" }}>
        {MODULES.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)} style={{ padding: "12px 16px", border: "none", borderBottom: active === m.id ? `2px solid ${TEAL}` : "2px solid transparent", background: "none", cursor: "pointer", fontSize: 13, fontWeight: active === m.id ? 600 : 400, color: active === m.id ? TEAL : SLATE_MID, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", transition: "all 0.15s" }}>
            <span>{m.icon}</span>
            <span>{m.label}</span>
            {m.badge && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 10, background: active === m.id ? TEAL_LIGHT : "#F1F5F9", color: active === m.id ? TEAL : SLATE_MID, fontWeight: 500 }}>{m.badge}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px" }}>
        {active === "signals" && <SignalFeed />}
        {active === "policy" && <PolicyNavigator />}
        {active === "marketplace" && <Marketplace />}
        {active === "intelligence" && <MarketIntelligence />}
        {active === "emissions" && <EmissionsTracker />}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `0.5px solid ${BORDER}`, padding: "16px 24px", textAlign: "center", marginTop: 40 }}>
        <p style={{ margin: 0, fontSize: 12, color: SLATE_MID }}>NorthSignal Pre-MVP Demo · Canadian Hydrogen Market · Data sourced from public Canadian government and industry sources · <strong>Not for distribution</strong></p>
      </div>
    </div>
  );
}
