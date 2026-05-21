import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { tasksConfig } from '../../services/pageConfigs';

export default function TasksPage() {
  return <ModulePage config={tasksConfig} />;
}
