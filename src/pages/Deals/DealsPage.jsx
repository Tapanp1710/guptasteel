import React from 'react';
import './DealsPage.css';
import Card from '../../components/Card/Card';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import Timeline from '../../components/Timeline/Timeline';
import ActivityFeed from '../../components/ActivityFeed/ActivityFeed';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { dealPipelineCards, liveActivityLogs, pipelineStages, paymentSummary, revenueTrendPoints, dispatchSummary, recentTransactionRecords, todayTaskItems } from '../../services/mockData';

export default function DealsPage() {
  return (
    <div className="deals-page page-shell">
      <section className="deals-page__hero">
        <div>
          <p className="kicker">Deals</p>
          <h1 className="h1">Live Deal Pipeline</h1>
          <p className="deals-page__subtitle">A draggable, live business pipeline with clear ownership and immediate next actions.</p>
        </div>
      </section>

      <section className="deals-page__timeline">
        <Timeline steps={pipelineStages} activeIndex={4} />
      </section>

      <KanbanBoard
        title="Pipeline Dashboard"
        subtitle="Drag cards across the deal flow to simulate live progression"
        stages={pipelineStages}
        items={dealPipelineCards}
        onCardAction={() => {}}
      />

      <section className="deals-page__grid">
        <Card title="Today’s Tasks" tone="soft">
          <div className="deals-page__task-list">
            {todayTaskItems.map((task) => (
              <div key={task}>{task}</div>
            ))}
          </div>
        </Card>

        <Card title="Payment Summary" tone="soft">
          <div className="deals-page__summary-list">
            {paymentSummary.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Revenue Trend" tone="soft">
          <div className="deals-page__trend">
            {revenueTrendPoints.map((point, index) => (
              <span key={index} style={{ height: `${point * 3}px` }} />
            ))}
          </div>
        </Card>

        <Card title="Dispatch Status" tone="soft">
          <div className="deals-page__dispatch-list">
            {dispatchSummary.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <ActivityFeed title="Recent Activities" items={liveActivityLogs} />

        <Card title="Recent Transactions" tone="soft">
          <div className="deals-page__transactions">
            {recentTransactionRecords.map((record) => (
              <div key={record.id}>
                <strong>{record.reference}</strong>
                <span>{record.customer}</span>
                <span>{record.amount}</span>
                <StatusBadge status={record.status} />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
