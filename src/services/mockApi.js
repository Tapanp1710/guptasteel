import {
  dashboardActivities,
  dashboardCharts,
  dashboardStats,
  dashboardTasks,
  dispatchRecords,
  futureModuleCards,
  invoiceRecords,
  inquiryRecords,
  leadsRecords,
  notifications as notificationItems,
  paymentRecords,
  purchaseOrderRecords,
  quotationRecords,
  reportCards,
  vehicleRecords,
  followupRecords,
} from './mockData';

const delay = (result, wait = 180) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(result), wait);
  });

export const mockApi = {
  getDashboard: () =>
    delay({
      stats: dashboardStats,
      activities: dashboardActivities,
      tasks: dashboardTasks,
      charts: dashboardCharts,
    }),
  getLeads: () => delay({ rows: leadsRecords }),
  getFollowups: () => delay({ rows: followupRecords }),
  getInquiries: () => delay({ rows: inquiryRecords }),
  getQuotations: () => delay({ rows: quotationRecords }),
  getPurchaseOrders: () => delay({ rows: purchaseOrderRecords }),
  getDispatches: () => delay({ rows: dispatchRecords }),
  getVehicles: () => delay({ rows: vehicleRecords }),
  getInvoices: () => delay({ rows: invoiceRecords }),
  getPayments: () => delay({ rows: paymentRecords }),
  getReports: () => delay({ reportCards }),
  getFutureModules: () => delay({ modules: futureModuleCards }),
  getNotifications: () => delay({ items: notificationItems }),
};
