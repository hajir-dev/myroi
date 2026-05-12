const chartWidth = 760;
const chartHeight = 300;
const padding = { top: 24, right: 28, bottom: 48, left: 78 };

const formatShortRupiah = (value) => {
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(1)}jt`;
  }

  return `Rp ${(value / 1_000).toFixed(0)}rb`;
};

function buildPath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

export function LineChart({ data }) {
  const values = data.flatMap((item) => [item.grossRevenue, item.totalSpend]);
  const maxValue = Math.max(...values);
  const minValue = 0;
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  const stepX = innerWidth / (data.length - 1);

  const scaleY = (value) => {
    const percent = (value - minValue) / (maxValue - minValue);
    return padding.top + innerHeight - percent * innerHeight;
  };

  const revenuePoints = data.map((item, index) => ({
    x: padding.left + index * stepX,
    y: scaleY(item.grossRevenue),
    value: item.grossRevenue,
  }));

  const spendPoints = data.map((item, index) => ({
    x: padding.left + index * stepX,
    y: scaleY(item.totalSpend),
    value: item.totalSpend,
  }));

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const value = maxValue * ratio;
    return {
      value,
      y: scaleY(value),
    };
  });

  const totalRevenue = data.reduce((sum, item) => sum + item.grossRevenue, 0);
  const totalSpend = data.reduce((sum, item) => sum + item.totalSpend, 0);
  const netProfit = totalRevenue - totalSpend;

  return (
    <div className="line-chart-card">
      <div className="chart-summary-grid">
        <ChartMetric label="Gross Revenue" value={totalRevenue} tone="positive" />
        <ChartMetric label="Total Spend" value={totalSpend} tone="negative" />
        <ChartMetric label="Net Profit" value={netProfit} tone={netProfit >= 0 ? "positive" : "negative"} signed />
      </div>

      <div className="line-chart-wrap">
        <svg className="line-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Line chart gross revenue dan total spend seminggu terakhir">
          <defs>
            <linearGradient id="revenueGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="spendGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridLines.map((line) => (
            <g key={line.value}>
              <line x1={padding.left} x2={chartWidth - padding.right} y1={line.y} y2={line.y} className="chart-grid-line" />
              <text x={padding.left - 14} y={line.y + 4} className="chart-axis-label" textAnchor="end">
                {formatShortRupiah(line.value)}
              </text>
            </g>
          ))}

          <path className="chart-area revenue" d={`${buildPath(revenuePoints)} L ${chartWidth - padding.right} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`} />
          <path className="chart-area spend" d={`${buildPath(spendPoints)} L ${chartWidth - padding.right} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`} />
          <path className="chart-line revenue" d={buildPath(revenuePoints)} />
          <path className="chart-line spend" d={buildPath(spendPoints)} />

          {revenuePoints.map((point, index) => (
            <circle key={`revenue-${data[index].period}`} cx={point.x} cy={point.y} r="4" className="chart-point revenue" />
          ))}
          {spendPoints.map((point, index) => (
            <circle key={`spend-${data[index].period}`} cx={point.x} cy={point.y} r="4" className="chart-point spend" />
          ))}

          {data.map((item, index) => (
            <text key={item.period} x={padding.left + index * stepX} y={chartHeight - 18} className="chart-axis-label" textAnchor="middle">
              {item.period}
            </text>
          ))}
        </svg>
      </div>

      <div className="chart-legend">
        <span><i className="legend-dot revenue" /> Gross Revenue</span>
        <span><i className="legend-dot spend" /> Total Spend</span>
      </div>
    </div>
  );
}

function ChartMetric({ label, value, tone, signed = false }) {
  const prefix = signed && value > 0 ? "+" : "";
  return (
    <div className="chart-metric">
      <span>{label}</span>
      <strong className={tone === "positive" ? "money-positive" : "money-negative"}>
        {prefix}
        {formatShortRupiah(Math.abs(value))}
      </strong>
    </div>
  );
}
