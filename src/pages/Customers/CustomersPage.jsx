import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { customersConfig } from '../../services/pageConfigs';

export default function CustomersPage() {
  return <ModulePage config={customersConfig} />;
}
