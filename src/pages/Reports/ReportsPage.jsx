import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { reportsConfig } from '../../services/pageConfigs';

export default function ReportsPage() {
  return <ModulePage config={reportsConfig} />;
}
