import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { vehiclesConfig } from '../../services/pageConfigs';

export default function VehiclesPage() {
  return <ModulePage config={vehiclesConfig} />;
}
