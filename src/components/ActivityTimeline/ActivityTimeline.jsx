import React from 'react';
import './ActivityTimeline.css';
import StatusBadge from '../StatusBadge/StatusBadge';

export default function ActivityTimeline({ items = [], title = 'Recent Activity', subtitle = 'Operational updates in sequence' }) {
  return (
    <section className="activity-timeline">
      <div className="activity-timeline__header">
        <div>
          <h3 className="h3">{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="activity-timeline__list">
        {items.map((item) => (
          <article key={item.id} className="activity-timeline__item">
            <div className="activity-timeline__dot" />
            <div className="activity-timeline__copy">
              <div className="activity-timeline__row">
                <strong>{item.title}</strong>
                <StatusBadge status={item.status} />
              </div>
              <p>{item.detail}</p>
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
