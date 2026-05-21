import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CustomersPage from '../pages/Customers/CustomersPage';
import TasksPage from '../pages/Tasks/TasksPage';
import DealsPage from '../pages/Deals/DealsPage';
import QuotationPage from '../pages/Quotation/QuotationPage';
import PurchaseOrdersPage from '../pages/PurchaseOrders/PurchaseOrdersPage';
import DispatchPage from '../pages/Dispatch/DispatchPage';
import PaymentsPage from '../pages/Payments/PaymentsPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import SettingsPage from '../pages/Settings/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/quotations" element={<QuotationPage />} />
      <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
      <Route path="/dispatch" element={<DispatchPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/quotation" element={<Navigate to="/quotations" replace />} />
      <Route path="/leads" element={<Navigate to="/customers" replace />} />
      <Route path="/follow-ups" element={<Navigate to="/tasks" replace />} />
      <Route path="/inquiry" element={<Navigate to="/deals" replace />} />
      <Route path="/future-modules" element={<Navigate to="/settings" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
