export const notifications = [
  { id: 1, title: '12 leads assigned for follow-up', detail: 'Sales team queue updated 6 minutes ago.', time: '6m', type: 'info', read: false },
  { id: 2, title: 'PO #PO-2048 approved', detail: 'Finance approved the purchase order.', time: '18m', type: 'success', read: false },
  { id: 3, title: 'Dispatch delayed for truck MH-12-AB-4211', detail: 'Awaiting gate clearance at warehouse A.', time: '32m', type: 'warning', read: true },
  { id: 4, title: 'Overdue payment flagged', detail: 'Customer ledger needs review today.', time: '1h', type: 'danger', read: true },
];

export const quickActions = [
  { id: 'lead', label: 'New Lead', description: 'Capture company or contact details instantly.' },
  { id: 'inquiry', label: 'New Inquiry', description: 'Open a fresh inquiry and route it to sales.' },
  { id: 'quotation', label: 'Create Quotation', description: 'Prepare pricing and compare offer scenarios.' },
  { id: 'followup', label: 'Schedule Follow-up', description: 'Book a call, email, or WhatsApp reminder.' },
  { id: 'dispatch', label: 'Add Dispatch', description: 'Plan vehicle loading and delivery activity.' },
  { id: 'payment', label: 'Payment Entry', description: 'Record a receipt, adjustment, or advance.' },
];

export const dashboardStats = [
  { label: 'New Leads', value: '184', change: '+12% vs last week', tone: 'primary' },
  { label: 'Follow-ups Today', value: '42', change: '11 overdue', tone: 'warning' },
  { label: 'Pending Quotations', value: '28', change: '8 due in 24h', tone: 'secondary' },
  { label: 'Dispatches Today', value: '17', change: '14 in transit', tone: 'primary' },
  { label: 'Overdue Payments', value: '₹18.4L', change: '5 accounts escalated', tone: 'danger' },
  { label: 'Monthly Revenue', value: '₹2.8Cr', change: '+9.4% growth', tone: 'success' },
];

export const dashboardActivities = [
  { id: 1, title: 'Apex Steels converted to quotation', detail: 'Sales executive Rahul generated a 3-line quotation.', time: '09:40 AM', status: 'Completed' },
  { id: 2, title: 'Reminder sent to Om Sai Auto', detail: 'Follow-up via WhatsApp and email for pending PO.', time: '11:05 AM', status: 'Pending' },
  { id: 3, title: 'Truck MH-12-AB-4211 departed', detail: 'Loaded and dispatched from Pune warehouse.', time: '12:20 PM', status: 'In Transit' },
  { id: 4, title: 'Receipt booked against invoice INV-1093', detail: 'Payment reconciled by finance team.', time: '02:15 PM', status: 'Completed' },
];

export const dashboardTasks = [
  { id: 1, title: 'Call Asha Industries at 11:00 AM', due: 'Today 3:00 PM', status: 'Pending' },
  { id: 2, title: 'Approve quotation for Apex Steels', due: 'Today 4:30 PM', status: 'Pending' },
  { id: 3, title: 'Check vehicle availability for Friday dispatch', due: 'Tomorrow 10:00 AM', status: 'Overdue' },
  { id: 4, title: 'Share payment reminder to Surya Alloys', due: 'Tomorrow 1:00 PM', status: 'Completed' },
];

export const dashboardCharts = {
  salesTrend: [24, 32, 29, 41, 38, 49, 55, 52, 64, 71, 69, 84],
  payments: [80, 76, 84, 71, 63, 78, 86, 91],
  vehicles: [3, 5, 4, 6, 8, 7, 9, 8],
};

function createRows(prefix, items) {
  return items.map((item, index) => ({ id: `${prefix}-${index + 1}`, ...item }));
}

export const leadsRecords = createRows('LD', [
  { company: 'Apex Steels Pvt Ltd', contact: 'Rahul Sharma', source: 'Campaign', owner: 'Sanjay Kumar', stage: 'Qualified', status: 'Pending', city: 'Pune', value: '₹12.6L', lastTouch: '3m ago' },
  { company: 'Om Sai Auto', contact: 'Ritika Jain', source: 'Website', owner: 'Priya Nair', stage: 'Contacted', status: 'Completed', city: 'Chennai', value: '₹8.4L', lastTouch: '22m ago' },
  { company: 'Surya Polymers', contact: 'Nina Shah', source: 'WhatsApp', owner: 'Rohit Verma', stage: 'New', status: 'Pending', city: 'Ahmedabad', value: '₹4.8L', lastTouch: '41m ago' },
  { company: 'Zenith Packaging', contact: 'Kabir Malik', source: 'Event', owner: 'Meera Iyer', stage: 'Negotiation', status: 'Overdue', city: 'Delhi', value: '₹19.2L', lastTouch: '2h ago' },
  { company: 'Metro Engineering', contact: 'Aditi Rao', source: 'Referral', owner: 'Sanjay Kumar', stage: 'Qualified', status: 'Pending', city: 'Bengaluru', value: '₹16.1L', lastTouch: '5h ago' },
]);

export const followupRecords = createRows('FU', [
  { customer: 'Apex Steels Pvt Ltd', mode: 'Call', owner: 'Sanjay Kumar', note: 'Need pricing confirmation and dispatch date.', status: 'Pending', due: 'Today 3:00 PM', priority: 'High' },
  { customer: 'Om Sai Auto', mode: 'WhatsApp', owner: 'Priya Nair', note: 'Shared revised quotation and asked for approval.', status: 'Completed', due: 'Today 4:30 PM', priority: 'Medium' },
  { customer: 'Surya Polymers', mode: 'Email', owner: 'Rohit Verma', note: 'Waiting for technical specs from procurement.', status: 'Overdue', due: 'Yesterday', priority: 'High' },
  { customer: 'Zenith Packaging', mode: 'Meeting', owner: 'Meera Iyer', note: 'Negotiation on volume discounts and delivery terms.', status: 'Pending', due: 'Tomorrow 11:00 AM', priority: 'Low' },
  { customer: 'Metro Engineering', mode: 'Call', owner: 'Sanjay Kumar', note: 'Customer requested payment schedule clarification.', status: 'Pending', due: 'Tomorrow 2:00 PM', priority: 'Medium' },
]);

export const inquiryRecords = createRows('IN', [
  { inquiry: 'INQ-2401', customer: 'Apex Steels Pvt Ltd', vendor: 'Sterlite Supplies', transporter: 'Swift Carriers', rfq: 'Sent', comparison: 'Ready', negotiation: 'In Progress', status: 'Pending' },
  { inquiry: 'INQ-2402', customer: 'Om Sai Auto', vendor: 'Prime Industrial', transporter: 'BlueLine Logistics', rfq: 'Received', comparison: 'Approved', negotiation: 'Closed', status: 'Completed' },
  { inquiry: 'INQ-2403', customer: 'Surya Polymers', vendor: 'Nova Traders', transporter: 'Rapid Wheels', rfq: 'Sent', comparison: 'Pending', negotiation: 'In Progress', status: 'Pending' },
  { inquiry: 'INQ-2404', customer: 'Zenith Packaging', vendor: 'Core Materials', transporter: 'Atlas Freight', rfq: 'Received', comparison: 'Ready', negotiation: 'Escalated', status: 'Overdue' },
  { inquiry: 'INQ-2405', customer: 'Metro Engineering', vendor: 'Horizon Supply', transporter: 'Swift Carriers', rfq: 'Sent', comparison: 'Approved', negotiation: 'Negotiating', status: 'Pending' },
]);

export const quotationRecords = createRows('QT', [
  { quotation: 'QT-3011', customer: 'Apex Steels Pvt Ltd', amount: '₹12.6L', validity: '7 days', owner: 'Sanjay Kumar', status: 'Pending', approval: 'Pending', conversion: '72%' },
  { quotation: 'QT-3012', customer: 'Om Sai Auto', amount: '₹8.4L', validity: '5 days', owner: 'Priya Nair', status: 'Completed', approval: 'Approved', conversion: '88%' },
  { quotation: 'QT-3013', customer: 'Zenith Packaging', amount: '₹19.2L', validity: '3 days', owner: 'Meera Iyer', status: 'Overdue', approval: 'Review', conversion: '61%' },
  { quotation: 'QT-3014', customer: 'Metro Engineering', amount: '₹16.1L', validity: '10 days', owner: 'Sanjay Kumar', status: 'Pending', approval: 'Pending', conversion: '75%' },
  { quotation: 'QT-3015', customer: 'Greenline Chemicals', amount: '₹6.9L', validity: '8 days', owner: 'Rohit Verma', status: 'Pending', approval: 'Approved', conversion: '64%' },
]);

export const purchaseOrderRecords = createRows('PO', [
  { order: 'PO-2048', customer: 'Apex Steels Pvt Ltd', salesOrder: 'SO-780', transporter: 'Swift Carriers', total: '₹12.6L', status: 'Pending', stage: 'Vendor Allocation', delivery: 'Scheduled', owner: 'Finance' },
  { order: 'PO-2049', customer: 'Om Sai Auto', salesOrder: 'SO-781', transporter: 'BlueLine Logistics', total: '₹8.4L', status: 'Completed', stage: 'PO Issued', delivery: 'Delivered', owner: 'Operations' },
  { order: 'PO-2050', customer: 'Zenith Packaging', salesOrder: 'SO-782', transporter: 'Atlas Freight', total: '₹19.2L', status: 'Overdue', stage: 'Negotiation', delivery: 'Awaiting Dispatch', owner: 'Procurement' },
  { order: 'PO-2051', customer: 'Metro Engineering', salesOrder: 'SO-783', transporter: 'Rapid Wheels', total: '₹16.1L', status: 'Pending', stage: 'PO Draft', delivery: 'Planned', owner: 'Finance' },
  { order: 'PO-2052', customer: 'Greenline Chemicals', salesOrder: 'SO-784', transporter: 'Swift Carriers', total: '₹6.9L', status: 'Pending', stage: 'Vendor Confirmed', delivery: 'Loading', owner: 'Operations' },
]);

export const dispatchRecords = createRows('DS', [
  { dispatch: 'DS-8801', vehicle: 'MH-12-AB-4211', route: 'Pune to Mumbai', status: 'In Transit', loading: 'Completed', invoice: 'Generated', eta: 'Today 6:00 PM' },
  { dispatch: 'DS-8802', vehicle: 'MH-01-CD-5932', route: 'Delhi to Noida', status: 'Delivered', loading: 'Completed', invoice: 'Generated', eta: 'Delivered 10:20 AM' },
  { dispatch: 'DS-8803', vehicle: 'KA-05-XY-7710', route: 'Bengaluru to Hosur', status: 'Pending', loading: 'Scheduled', invoice: 'Draft', eta: 'Today 8:30 PM' },
  { dispatch: 'DS-8804', vehicle: 'GJ-01-HK-3328', route: 'Ahmedabad to Rajkot', status: 'Overdue', loading: 'Delayed', invoice: 'Pending', eta: 'Yesterday' },
  { dispatch: 'DS-8805', vehicle: 'TN-10-ZA-4419', route: 'Chennai to Coimbatore', status: 'In Transit', loading: 'Completed', invoice: 'Generated', eta: 'Tomorrow 1:00 PM' },
]);

export const vehicleRecords = createRows('VH', [
  { number: 'MH-12-AB-4211', type: '10 Wheeler', driver: 'Imran Khan', capacity: '18 Tons', status: 'In Transit', availability: 'Busy', utilization: '92%' },
  { number: 'MH-01-CD-5932', type: 'Container', driver: 'Rakesh Patil', capacity: '22 Tons', status: 'Delivered', availability: 'Available', utilization: '76%' },
  { number: 'KA-05-XY-7710', type: 'Mini Truck', driver: 'Naveen Reddy', capacity: '4 Tons', status: 'Pending', availability: 'Booked', utilization: '64%' },
  { number: 'GJ-01-HK-3328', type: 'Trailer', driver: 'Farhan Shaikh', capacity: '24 Tons', status: 'Overdue', availability: 'Maintenance', utilization: '88%' },
  { number: 'TN-10-ZA-4419', type: 'Open Body', driver: 'Suresh Babu', capacity: '8 Tons', status: 'In Transit', availability: 'Busy', utilization: '84%' },
]);

export const invoiceRecords = createRows('IV', [
  { invoice: 'INV-1093', customer: 'Apex Steels Pvt Ltd', amount: '₹12.6L', due: 'Today', payment: 'Partial', status: 'Pending', ledger: 'Open' },
  { invoice: 'INV-1094', customer: 'Om Sai Auto', amount: '₹8.4L', due: 'Paid', payment: 'Full', status: 'Completed', ledger: 'Closed' },
  { invoice: 'INV-1095', customer: 'Zenith Packaging', amount: '₹19.2L', due: 'Overdue', payment: 'None', status: 'Overdue', ledger: 'Open' },
  { invoice: 'INV-1096', customer: 'Metro Engineering', amount: '₹16.1L', due: 'Tomorrow', payment: 'Pending', status: 'Pending', ledger: 'Open' },
  { invoice: 'INV-1097', customer: 'Greenline Chemicals', amount: '₹6.9L', due: '7 days', payment: 'Advance', status: 'Completed', ledger: 'Closed' },
]);

export const paymentRecords = createRows('PY', [
  { receipt: 'RCPT-401', customer: 'Apex Steels Pvt Ltd', amount: '₹4.2L', mode: 'NEFT', status: 'Pending', ledger: 'Customer Ledger', profitability: '81%' },
  { receipt: 'RCPT-402', customer: 'Om Sai Auto', amount: '₹8.4L', mode: 'RTGS', status: 'Completed', ledger: 'Reconciled', profitability: '89%' },
  { receipt: 'RCPT-403', customer: 'Zenith Packaging', amount: '₹2.8L', mode: 'Cheque', status: 'Overdue', ledger: 'Open', profitability: '67%' },
  { receipt: 'RCPT-404', customer: 'Metro Engineering', amount: '₹1.6L', mode: 'UPI', status: 'Pending', ledger: 'Reconciled', profitability: '75%' },
  { receipt: 'RCPT-405', customer: 'Greenline Chemicals', amount: '₹5.1L', mode: 'Advance', status: 'Completed', ledger: 'Closed', profitability: '92%' },
]);

export const reportCards = [
  { label: 'Lead Conversion', value: '38%', note: 'Best in last 6 months' },
  { label: 'Quotation Win Rate', value: '71%', note: 'Improved by 9%' },
  { label: 'Dispatch SLA', value: '96%', note: 'On-time delivery' },
  { label: 'Collections', value: '₹2.1Cr', note: '87% recovered' },
  { label: 'Vehicle Utilization', value: '84%', note: 'Balanced fleet load' },
];

export const futureModuleCards = [
  { label: 'HR', status: 'Upcoming', description: 'Hiring, employee records, and attendance.' },
  { label: 'Payroll', status: 'Upcoming', description: 'Salary processing, deductions, and payslips.' },
  { label: 'Accounts', status: 'Upcoming', description: 'Ledger, journal, and financial statements.' },
  { label: 'Purchase', status: 'Upcoming', description: 'Requisition, approval, and vendor control.' },
  { label: 'Admin', status: 'Upcoming', description: 'Roles, permissions, and audit logs.' },
];

export const pipelineStages = ['Leads', 'Inquiry', 'Quotation Sent', 'PO Received', 'Dispatch', 'Payment Pending', 'Completed'];

export const dealPipelineCards = createRows('DL', [
  { stage: 'Leads', companyName: 'Apex Steels Pvt Ltd', contactPerson: 'Rahul Sharma', dealValue: '₹12,40,000', currentStatus: 'New lead captured', daysRemaining: 6, priority: 'High', priorityTone: 'danger', owner: 'Rahul Sharma', timestamp: '2 mins ago' },
  { stage: 'Inquiry', companyName: 'Om Sai Auto', contactPerson: 'Ritika Jain', dealValue: '₹8,90,000', currentStatus: 'Inquiry under review', daysRemaining: 4, priority: 'High', priorityTone: 'danger', owner: 'Priya Nair', timestamp: '10 mins ago' },
  { stage: 'Quotation Sent', companyName: 'Delta Metals', contactPerson: 'Arjun Mehta', dealValue: '₹24,50,000', currentStatus: 'Quotation shared today', daysRemaining: 3, priority: 'Medium', priorityTone: 'warning', owner: 'Sanjay Kumar', timestamp: '25 mins ago' },
  { stage: 'PO Received', companyName: 'Shiva Traders', contactPerson: 'Nina Shah', dealValue: '₹6,75,000', currentStatus: 'PO confirmed', daysRemaining: 2, priority: 'High', priorityTone: 'danger', owner: 'Meera Iyer', timestamp: '38 mins ago' },
  { stage: 'Dispatch', companyName: 'Prime Engineering', contactPerson: 'Kabir Malik', dealValue: '₹18,20,000', currentStatus: 'Vehicle allocated', daysRemaining: 1, priority: 'High', priorityTone: 'danger', owner: 'Rohit Verma', timestamp: '1 hour ago' },
  { stage: 'Payment Pending', companyName: 'Surya Alloys', contactPerson: 'Aditi Rao', dealValue: '₹2,45,000', currentStatus: 'Payment reminder due', daysRemaining: 0, priority: 'Medium', priorityTone: 'warning', owner: 'Finance', timestamp: '2 hours ago' },
  { stage: 'Completed', companyName: 'Apex Industrial', contactPerson: 'Sanjay Verma', dealValue: '₹14,10,000', currentStatus: 'Completed and closed', daysRemaining: 0, priority: 'Low', priorityTone: 'secondary', owner: 'Operations', timestamp: 'Yesterday' },
  { stage: 'Completed', companyName: 'Zen Manufacturing', contactPerson: 'Meera Iyer', dealValue: '₹9,85,000', currentStatus: 'Delivered and paid', daysRemaining: 0, priority: 'Low', priorityTone: 'secondary', owner: 'Rahul Sharma', timestamp: 'Yesterday' },
]);

export const todayTaskItems = [
  'Call Om Sai Auto at 11:00 AM',
  'Quotation pending for Apex Steels',
  'Dispatch vehicle TR45-AB-287',
  'Payment reminder for Delta Metals',
  'Follow up with Surya Alloys',
];

export const customerRecords = createRows('CU', [
  { company: 'Apex Steels Pvt Ltd', contact: 'Rahul Sharma', owner: 'Rahul Sharma', city: 'Pune', openInvoices: '2', dealValue: '₹12,40,000', status: 'Pending', lastActivity: '2 mins ago' },
  { company: 'Om Sai Auto', contact: 'Ritika Jain', owner: 'Priya Nair', city: 'Mumbai', openInvoices: '1', dealValue: '₹8,90,000', status: 'Pending', lastActivity: '10 mins ago' },
  { company: 'Delta Metals', contact: 'Arjun Mehta', owner: 'Sanjay Kumar', city: 'Nagpur', openInvoices: '3', dealValue: '₹24,50,000', status: 'Overdue', lastActivity: 'Yesterday' },
  { company: 'Shiva Traders', contact: 'Nina Shah', owner: 'Meera Iyer', city: 'Ahmedabad', openInvoices: '1', dealValue: '₹6,75,000', status: 'Completed', lastActivity: 'Yesterday' },
  { company: 'Prime Engineering', contact: 'Kabir Malik', owner: 'Rohit Verma', city: 'Delhi', openInvoices: '2', dealValue: '₹18,20,000', status: 'Pending', lastActivity: '12 mins ago' },
  { company: 'Surya Alloys', contact: 'Aditi Rao', owner: 'Finance', city: 'Hyderabad', openInvoices: '1', dealValue: '₹2,45,000', status: 'Pending', lastActivity: '28 mins ago' },
  { company: 'Apex Industrial', contact: 'Sanjay Verma', owner: 'Operations', city: 'Bengaluru', openInvoices: '0', dealValue: '₹14,10,000', status: 'Completed', lastActivity: 'Yesterday' },
  { company: 'Zen Manufacturing', contact: 'Meera Iyer', owner: 'Rahul Sharma', city: 'Chennai', openInvoices: '0', dealValue: '₹9,85,000', status: 'Completed', lastActivity: 'Yesterday' },
]);

export const taskRecords = createRows('TS', [
  { task: 'Call Om Sai Auto at 11:00 AM', owner: 'Priya Nair', due: 'Today 11:00 AM', status: 'Pending', customer: 'Om Sai Auto' },
  { task: 'Quotation pending for Apex Steels', owner: 'Rahul Sharma', due: 'Today 1:00 PM', status: 'Pending', customer: 'Apex Steels Pvt Ltd' },
  { task: 'Dispatch vehicle TR45-AB-287', owner: 'Operations', due: 'Today 3:00 PM', status: 'Completed', customer: 'Prime Engineering' },
  { task: 'Payment reminder for Delta Metals', owner: 'Finance', due: 'Today 4:00 PM', status: 'Overdue', customer: 'Delta Metals' },
  { task: 'Follow up with Surya Alloys', owner: 'Sanjay Kumar', due: 'Tomorrow 10:00 AM', status: 'Pending', customer: 'Surya Alloys' },
]);

export const recentTransactionRecords = createRows('TX', [
  { reference: 'INV-2048', customer: 'Apex Steels Pvt Ltd', amount: '₹1,24,500', type: 'Invoice', status: 'Pending', time: '2 mins ago' },
  { reference: 'PAY-781', customer: 'Om Sai Auto', amount: '₹2,45,000', type: 'Payment', status: 'Completed', time: '10 mins ago' },
  { reference: 'PO-4839', customer: 'Delta Metals', amount: '₹4,18,000', type: 'PO', status: 'Pending', time: 'Yesterday' },
  { reference: 'DS-204', customer: 'Prime Engineering', amount: '₹78,500', type: 'Dispatch', status: 'Completed', time: 'Yesterday' },
]);

export const liveActivityLogs = [
  { id: 1, title: 'Rahul created quotation QTN-204', detail: 'Shared with Apex Steels Pvt Ltd for same-day approval.', time: '2 mins ago', status: 'Completed' },
  { id: 2, title: 'Invoice INV-453 paid', detail: 'Finance reconciled payment and closed the ledger entry.', time: '10 mins ago', status: 'Completed' },
  { id: 3, title: 'Vehicle TS09EA4567 dispatched', detail: 'Loaded from warehouse A and sent toward the customer site.', time: '18 mins ago', status: 'In Transit' },
  { id: 4, title: 'PO-398 approved', detail: 'Purchase order released after vendor confirmation.', time: 'Yesterday', status: 'Pending' },
  { id: 5, title: 'Payment reminder sent', detail: 'Delta Metals received an automatic overdue reminder.', time: 'Yesterday', status: 'Overdue' },
];

export const revenueTrendPoints = [18, 22, 20, 28, 31, 30, 35, 38, 36, 42, 45, 49];

export const paymentSummary = [
  { label: 'Pending', value: '₹2,45,000', status: 'Pending' },
  { label: 'Due Today', value: '₹1,24,500', status: 'Overdue' },
  { label: 'Collected', value: '₹18,40,000', status: 'Completed' },
];

export const dispatchSummary = [
  { label: 'Ready', value: '6' },
  { label: 'In Transit', value: '3' },
  { label: 'Delivered', value: '12' },
];
