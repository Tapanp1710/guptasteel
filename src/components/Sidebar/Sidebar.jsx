import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  DashboardIcon,
  CustomersIcon,
  TasksIcon,
  DealsIcon,
  DispatchIcon,
  PaymentsIcon,
  PurchaseOrdersIcon,
  ReportsIcon,
  SettingsIcon,
  QuotationIcon,
} from '../Icons';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { to: '/customers', label: 'Customers', icon: <CustomersIcon /> },
  { to: '/tasks', label: 'Tasks', icon: <TasksIcon /> },
  { to: '/deals', label: 'Deals', icon: <DealsIcon /> },
  { to: '/quotations', label: 'Quotations', icon: <QuotationIcon /> },
  { to: '/purchase-orders', label: 'Purchase Orders', icon: <PurchaseOrdersIcon /> },
  { to: '/dispatch', label: 'Dispatch', icon: <DispatchIcon /> },
  { to: '/payments', label: 'Payments', icon: <PaymentsIcon /> },
  { to: '/reports', label: 'Reports', icon: <ReportsIcon /> },
  { to: '/settings', label: 'Settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">A</div>
        <div className="sidebar__brand-copy">
          <strong>Atlas One</strong>
          <span>CRM + ERP Suite</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}>
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__footer-card">
          <p>Live sync</p>
          <strong>24 users online</strong>
        </div>
      </div>
    </aside>
  );
}
