import React from 'react';
import './NotificationPanel.css';
import { BellIcon, CheckIcon } from '../Icons';
import Button from '../Button/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import { useAppContext } from '../../contexts/AppContext';

export default function NotificationPanel() {
  const { isNotificationPanelOpen, setIsNotificationPanelOpen, notificationItems, markNotificationRead, markAllNotificationsRead } = useAppContext();

  if (!isNotificationPanelOpen) {
    return null;
  }

  return (
    <aside className="notification-panel" aria-label="Notifications">
      <div className="notification-panel__header">
        <div>
          <p className="kicker">Activity</p>
          <h3 className="h3">Notifications</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsNotificationPanelOpen(false)}>
          Close
        </Button>
      </div>

      <div className="notification-panel__actions">
        <Button variant="secondary" size="sm" onClick={markAllNotificationsRead} icon={<CheckIcon size={16} />}>
          Mark all read
        </Button>
      </div>

      <div className="notification-panel__list">
        {notificationItems.map((item) => (
          <button key={item.id} type="button" className={`notification-panel__item ${item.read ? 'is-read' : ''}`} onClick={() => markNotificationRead(item.id)}>
            <span className="notification-panel__icon"><BellIcon size={16} /></span>
            <span className="notification-panel__copy">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
              <em>{item.time}</em>
            </span>
            <StatusBadge status={item.type === 'success' ? 'Completed' : item.type === 'warning' ? 'Pending' : item.type === 'danger' ? 'Overdue' : 'Pending'} />
          </button>
        ))}
      </div>
    </aside>
  );
}
