import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { quotationConfig } from '../../services/pageConfigs';

export default function QuotationPage() {
  return <ModulePage config={quotationConfig} />;
}
