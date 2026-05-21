import React from 'react';
import './DashboardPage.css';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import Timeline from '../../components/Timeline/Timeline';
import ActivityFeed from '../../components/ActivityFeed/ActivityFeed';
import DataTable from '../../components/Tables/DataTable';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { PlusIcon } from '../../components/Icons';
import {
  dealPipelineCards,
  dispatchSummary,
  liveActivityLogs,
  paymentSummary,
  pipelineStages,
  quotationRecords,
  recentTransactionRecords,
  revenueTrendPoints,
  todayTaskItems,
  followupRecords,
} from '../../services/mockData';

const transactionColumns = [
  { header: 'Reference', accessor: 'reference', sortable: true },
  { header: 'Customer', accessor: 'customer', sortable: true },
  { header: 'Amount', accessor: 'amount', sortable: true },
  { header: 'Type', accessor: 'type', sortable: true },
  { header: 'Status', accessor: 'status', sortable: true },
  { header: 'Time', accessor: 'time', sortable: true },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-page page-shell">
      <section className="dashboard-page__hero">
        <div>
          <p className="kicker">Dashboard</p>
          <h1 className="h1">Business Console</h1>
          <p className="dashboard-page__subtitle">Minimal learning curve, clear ownership, and a live operating view of customers, deals, dispatch, and payments.</p>
        </div>
        <div className="dashboard-page__hero-actions">
          <Button icon={<PlusIcon size={16} />}>Quick Actions</Button>
          <span>Saved ✓</span>
        </div>
      </section>

      <section className="dashboard-page__timeline-shell">
        <Timeline steps={pipelineStages} activeIndex={3} />
      </section>

      <section className="dashboard-page__top-grid">
        <Card title="Today’s Tasks" subtitle="Most important actions for the day" tone="soft">
          <div className="dashboard-page__task-list">
            {todayTaskItems.map((task) => (
              <div key={task}>{task}</div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Follow-ups" subtitle="Customers that need attention now" tone="soft">
          <div className="dashboard-page__followup-list">
            {followupRecords.slice(0, 4).map((item) => (
              <div key={item.id}>
                <strong>{item.customer}</strong>
                <span>{item.note}</span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <KanbanBoard
        title="Live Deal Pipeline"
        subtitle="Drag cards across the flow to simulate active deal movement"
        stages={pipelineStages}
        items={dealPipelineCards}
        onCardAction={() => {}}
      />

      <section className="dashboard-page__widgets">
        <Card title="Payment Summary" subtitle="Collections and overdue visibility" tone="soft">
          <div className="dashboard-page__summary-list">
            {paymentSummary.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Revenue Trend" subtitle="Lightweight live business signal" tone="soft">
          <div className="dashboard-page__trend">
            {revenueTrendPoints.map((point, index) => (
              <span key={index} style={{ height: `${point * 2.6}px` }} />
            ))}
          </div>
        </Card>

        <Card title="Dispatch Status" subtitle="Fleet movement in one glance" tone="soft">
          <div className="dashboard-page__dispatch-list">
            {dispatchSummary.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Pending Quotations" subtitle="Quotes that still need attention" tone="soft">
          <div className="dashboard-page__pending-list">
            {quotationRecords.slice(0, 3).map((record) => (
              <div key={record.id}>
                <strong>{record.customer}</strong>
                <span>{record.amount}</span>
                <StatusBadge status={record.status} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="dashboard-page__bottom-grid">
        <DataTable
          title="Recent Transactions"
          subtitle="Invoices, payments, POs, and dispatch records"
          rows={recentTransactionRecords}
          columns={transactionColumns}
          filters={['Pending', 'Completed', 'Overdue']}
          rowActions={[{ label: 'Open', onClick: () => {} }]}
          pageSize={4}
        />

        <ActivityFeed title="Recent Activity" items={liveActivityLogs} />
      </section>
    </div>
  );
}
