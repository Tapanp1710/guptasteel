import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { settingsConfig } from '../../services/pageConfigs';

export default function SettingsPage() {
  return <ModulePage config={settingsConfig} />;
}
