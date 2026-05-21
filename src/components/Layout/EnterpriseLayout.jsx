import React from 'react';
import { Outlet } from 'react-router-dom';
import './EnterpriseLayout.css';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import QuickActionButton from '../QuickActionButton/QuickActionButton';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useAppContext } from '../../contexts/AppContext';
import StatusBadge from '../StatusBadge/StatusBadge';

export default function EnterpriseLayout({ children }) {
  const { quickAction, closeQuickAction } = useAppContext();

  return (
    <div className="enterprise-app">
      <Sidebar />
      <main className="enterprise-main">
        <div className="enterprise-content">
          <Topbar />
          {children || <Outlet />}
        </div>
      </main>
      <NotificationPanel />
      <QuickActionButton />
      <Modal
        open={Boolean(quickAction)}
        title={quickAction?.label || 'Quick Action'}
        subtitle={quickAction?.description || 'Create a new enterprise record in seconds.'}
        onClose={closeQuickAction}
        footer={<Button onClick={closeQuickAction}>Done</Button>}
      >
        <div className="quick-action-modal">
          <div className="quick-action-modal__form">
            <label>
              <span>Primary Reference</span>
              <input placeholder="Enter a customer, vehicle, or vendor name" />
            </label>
            <label>
              <span>Owner</span>
              <input defaultValue="Rahul Sharma" />
            </label>
            <label>
              <span>Priority</span>
              <select defaultValue="High">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>
          <div className="quick-action-modal__status">
            <StatusBadge status="Pending" />
            <p>Auto-save is active. Changes will be marked as Saved ✓ after the next sync cycle.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
