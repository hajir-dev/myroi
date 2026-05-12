const secretKeys = ["passwordAkun", "passwordDomain", "passwordWp", "clientSecret"];
const badgeKeys = ["status", "pluginOn", "wl", "role"];
const moneyKeys = [
  "adsense",
  "balance",
  "earning",
  "metaAds",
  "metaBalance",
  "profit",
  "saldo",
  "spendToday",
  "spending",
  "totalPayout",
];

const badgeToneByValue = {
  active: "success",
  connected: "success",
  on: "success",
  ready: "info",
  admin: "purple",
  user: "info",
  advertiser: "warning",
  review: "warning",
  pending: "warning",
  inactive: "muted",
  disconnected: "danger",
  off: "danger",
  failed: "danger",
};

export function renderCell(value, key) {
  if (secretKeys.includes(key)) {
    return <span className="secret">********</span>;
  }

  if (badgeKeys.includes(key)) {
    return <StatusChip value={value} />;
  }

  if (moneyKeys.includes(key) || isRupiahText(value)) {
    return <MoneyValue value={value} />;
  }

  return value || "-";
}

function StatusChip({ value }) {
  const normalized = String(value || "-").trim().toLowerCase();
  const tone = badgeToneByValue[normalized] || "neutral";

  return <span className={`badge ${tone}`}>{value || "-"}</span>;
}

function MoneyValue({ value }) {
  const text = String(value || "-").trim();
  const numeric = parseRupiah(text);
  const tone = numeric < 0 || text.startsWith("-") ? "money-negative" : "money-positive";

  return <span className={tone}>{text}</span>;
}

function isRupiahText(value) {
  return typeof value === "string" && value.toLowerCase().includes("rp");
}

function parseRupiah(value) {
  const cleaned = String(value).replace(/[^\d-]/g, "");
  return Number(cleaned || 0);
}
