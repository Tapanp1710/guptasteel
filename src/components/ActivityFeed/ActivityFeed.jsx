import React from 'react';
import './ActivityFeed.css';
import StatusBadge from '../StatusBadge/StatusBadge';

export default function ActivityFeed({ title = 'Recent Activity', items = [] }) {
  return (
    <div className="activity-feed">
      <div className="activity-feed__head">
        <h3>{title}</h3>
      </div>
      <div className="activity-feed__list">
        {items.map((item) => (
          <article key={item.id} className="activity-feed__item">
            <div className="activity-feed__copy">
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
            <div className="activity-feed__meta">
              <StatusBadge status={item.status} />
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
