import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { followupsConfig } from '../../services/pageConfigs';

export default function FollowupsPage() {
  return <ModulePage config={followupsConfig} />;
}
