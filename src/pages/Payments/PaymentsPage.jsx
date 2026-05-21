import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { paymentsConfig } from '../../services/pageConfigs';

export default function PaymentsPage() {
  return <ModulePage config={paymentsConfig} />;
}
