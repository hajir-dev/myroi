import { advertiserSpend, dashboardStats, roiReports } from "../stores/mockData";
import { DataTable } from "./ui/DataTable";
import { LineChart } from "./ui/LineChart";
import { PageHeader } from "./ui/PageHeader";

function LinkButton({ to, navigate, children, className = "" }) {
  return (
    <button className={className} type="button" onClick={() => navigate(to)}>
      {children}
    </button>
  );
}

export function Overview({ store, navigate }) {
  const stats = [
    { label: "Total Users", value: store.users.length, tone: "blue" },
    { label: "Active Domains", value: store.domains.filter((item) => item.status === "Active").length, tone: "green" },
    { label: "Managed Campaigns", value: dashboardStats.managedCampaigns, tone: "orange" },
  ];

  return (
    <div className="page-stack">
      <PageHeader title="Overview Dashboard" description="Welcome to Database Pusat ROI" />

      <section className="stats-grid">
        {stats.map((stat) => (
          <article className={`stat-card ${stat.tone}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Gross Revenue vs Total Spend</h2>
            <p>Periode seminggu terakhir berdasarkan mock data dashboard.</p>
          </div>
          <select className="control">
            <option>7 Hari Terakhir</option>
            <option>Bulan Ini</option>
          </select>
        </div>
        <LineChart data={dashboardStats.weeklyFinancials} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Monitor Saldo & Spend Advertiser</h2>
            <p>
              Total Keseluruhan Spend: <strong className="danger">-Rp 95.466.168</strong>
            </p>
          </div>
        </div>
        <DataTable
          columns={[
            ["pic", "PIC / User"],
            ["balance", "Sisa Saldo"],
            ["spendToday", "Pengeluaran Hari Ini"],
          ]}
          items={advertiserSpend}
          extraAction={() => (
            <LinkButton className="ghost-button" to="/users" navigate={navigate}>
              Detail
            </LinkButton>
          )}
        />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Report Master Realtime ROI</h2>
            <p>Sample table prepared for realtime Firebase data in Phase 2.</p>
          </div>
        </div>
        <DataTable
          dense
          columns={[
            ["no", "# NO"],
            ["date", "Date"],
            ["time", "Time"],
            ["campaign", "Campaign"],
            ["metaAds", "META ADS"],
            ["adsense", "ADSENSE"],
            ["roi", "ROI (%)"],
            ["profit", "PROFIT"],
            ["subDomain", "Sub-Domain"],
            ["metaM", "META M."],
            ["adsM", "ADS M."],
            ["wl", "WL"],
            ["metaBalance", "META BAL."],
            ["pluginOn", "Plugin On"],
            ["spending", "Spending"],
            ["earning", "Earning"],
            ["clicks", "Clicks"],
            ["cpc", "CPC"],
            ["pageRpm", "Page RPM"],
            ["cpr", "CPR"],
          ]}
          items={roiReports}
        />
      </section>
    </div>
  );
}
