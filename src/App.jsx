import React from 'react';
import { AppProvider } from './contexts/AppContext';
import EnterpriseLayout from './components/Layout/EnterpriseLayout';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AppProvider>
      <EnterpriseLayout>
        <AppRoutes />
      </EnterpriseLayout>
    </AppProvider>
  );
}
