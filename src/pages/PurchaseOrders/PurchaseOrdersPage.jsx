import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { purchaseOrdersConfig } from '../../services/pageConfigs';

export default function PurchaseOrdersPage() {
  return <ModulePage config={purchaseOrdersConfig} />;
}
