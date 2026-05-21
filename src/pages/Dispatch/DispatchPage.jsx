import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { dispatchConfig } from '../../services/pageConfigs';

export default function DispatchPage() {
  return <ModulePage config={dispatchConfig} />;
}
