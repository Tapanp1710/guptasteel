import React from 'react';
import './Charts.css';
import Card from '../Card/Card';

function BarChart({ title, subtitle, values = [] }) {
  const maxValue = Math.max(...values, 1);
  return (
    <Card title={title} subtitle={subtitle} tone="soft">
      <div className="chart-bars">
        {values.map((value, index) => (
          <div key={index} className="chart-bars__bar-wrap">
            <div className="chart-bars__bar" style={{ height: `${Math.max((value / maxValue) * 100, 10)}%` }} />
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Charts({ charts }) {
  return (
    <div className="charts-grid">
      <BarChart title="Sales Trend" subtitle="Rolling 12-month opportunity movement" values={charts.salesTrend} />
      <BarChart title="Payment Status" subtitle="Collections pace and recovery" values={charts.payments} />
      <BarChart title="Vehicle Status" subtitle="Fleet availability across routes" values={charts.vehicles} />
    </div>
  );
}
