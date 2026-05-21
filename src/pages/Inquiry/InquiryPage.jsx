import React from 'react';
import ModulePage from '../../components/ModulePage/ModulePage';
import { inquiryConfig } from '../../services/pageConfigs';

export default function InquiryPage() {
  return <ModulePage config={inquiryConfig} />;
}
