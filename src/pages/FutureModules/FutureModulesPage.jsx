import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { futureModulesConfig } from '../../services/pageConfigs';

export default function FutureModulesPage() {
  return <ModulePage config={futureModulesConfig} />;
}
