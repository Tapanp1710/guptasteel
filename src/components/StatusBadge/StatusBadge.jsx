import React from 'react';
import './StatusBadge.css';

const toneMap = {
  Pending: 'warning',
  Completed: 'success',
  Overdue: 'danger',
  'In Transit': 'secondary',
  Delivered: 'success',
  'Upcoming': 'secondary',
  'Not Started': 'muted',
  High: 'danger',
  Medium: 'warning',
  Low: 'secondary',
};

export default function StatusBadge({ status, tone }) {
  const resolvedTone = tone || toneMap[status] || 'muted';
  return <span className={`status-badge status-badge--${resolvedTone}`}>{status}</span>;
}
