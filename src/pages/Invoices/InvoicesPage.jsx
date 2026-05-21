import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { invoicesConfig } from '../../services/pageConfigs';

export default function InvoicesPage() {
  return <ModulePage config={invoicesConfig} />;
}
