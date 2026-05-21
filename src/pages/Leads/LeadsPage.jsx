import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { leadsConfig } from '../../services/pageConfigs';

export default function LeadsPage() {
  return <ModulePage config={leadsConfig} />;
}
