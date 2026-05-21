import React from 'react';
import './KanbanCard.css';
import StatusBadge from '../StatusBadge/StatusBadge';

const quickActions = ['Call', 'WhatsApp', 'Quote', 'Dispatch', 'Payment'];

export default function KanbanCard({ item, onAction, draggable = true, onDragStart, onClick }) {
  return (
    <article
      className="kanban-card"
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="kanban-card__header">
        <div>
          <h4>{item.companyName}</h4>
          <p>{item.contactPerson}</p>
        </div>
        <StatusBadge status={item.priority} tone={item.priorityTone} />
      </div>

      <div className="kanban-card__value-row">
        <strong>{item.dealValue}</strong>
        <span>{item.currentStatus}</span>
      </div>

      <div className="kanban-card__meta">
        <div>
          <span>Days Remaining</span>
          <strong>{item.daysRemaining}</strong>
        </div>
        <div>
          <span>Owner</span>
          <strong>{item.owner}</strong>
        </div>
      </div>

      <div className="kanban-card__footer">
        <div className="kanban-card__actions">
          {quickActions.map((action) => (
            <button key={action} type="button" onClick={(event) => { event.stopPropagation(); onAction(item, action); }}>
              {action}
            </button>
          ))}
        </div>
        <span className="kanban-card__time">{item.timestamp}</span>
      </div>
    </article>
  );
}
