// Local types to avoid runtime dependency on Prisma
export type EnquiryStatus = "OPEN" | "QUOTED" | "NEGOTIATION" | "WON" | "LOST";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type DispatchStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED";
export type QuotationStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";
export type UserRole = "ADMIN" | "SALES_EXECUTIVE" | "DISPATCH_MANAGER";

export const mockUsers = [
  { id: "u1", name: "Admin User", email: "admin@omniasteel.com", role: "ADMIN" as UserRole },
  { id: "u2", name: "Karthik Y", email: "karthik@omniasteel.com", role: "SALES_EXECUTIVE" as UserRole },
  { id: "u3", name: "Adil Raaz", email: "adil@omniasteel.com", role: "DISPATCH_MANAGER" as UserRole },
];

export const mockEnquiries = [
  {
    id: "RFQ-0042",
    customer: "Salim Al Balushi",
    company: "Gulf Star Infra",
    product: "MS Plate 12mm",
    qty: 5,
    unit: "MT",
    date: "2026-05-22",
    status: "OPEN",
    assignedTo: "Adil Raaz",
    priority: "HIGH" as Priority,
    value: 420000,
  },
  {
    id: "RFQ-0041",
    customer: "Mohammed Al Harthy",
    company: "Al Harthy Construction",
    product: "ISMB 200",
    qty: 12,
    unit: "MT",
    date: "2026-05-21",
    status: "OPEN",
    assignedTo: "Karthik Y",
    priority: "MEDIUM" as Priority,
    value: 1210000,
  },
  {
    id: "RFQ-0039",
    customer: "Khalid Al Rawahi",
    company: "Oman Builders Co.",
    product: "TMT 12mm",
    qty: 6,
    unit: "MT",
    date: "2026-05-20",
    status: "OPEN",
    assignedTo: "Adil Raaz",
    priority: "HIGH" as Priority,
    value: 630000,
  },
  {
    id: "RFQ-0037",
    customer: "Ahmed Al Zadjali",
    company: "Muscat Infra Pvt",
    product: "HR Coil 3mm",
    qty: 18,
    unit: "MT",
    date: "2026-05-18",
    status: "OPEN",
    assignedTo: "Karthik Y",
    priority: "HIGH" as Priority,
    value: 1840000,
  },
  {
    id: "RFQ-0035",
    customer: "Nasser Al Saadi",
    company: "Al Madina Construction",
    product: "Angle 65x65",
    qty: 10,
    unit: "MT",
    date: "2026-05-17",
    status: "OPEN",
    assignedTo: "Adil Raaz",
    priority: "MEDIUM" as Priority,
    value: 1020000,
  },
  {
    id: "RFQ-0031",
    customer: "Ibrahim Al Lawati",
    company: "Gulf Steel Works",
    product: "TMT 16mm",
    qty: 24,
    unit: "MT",
    date: "2026-05-15",
    status: "OPEN",
    assignedTo: "Karthik Y",
    priority: "MEDIUM" as Priority,
    value: 2400000,
  },
];

export const mockActivities = [
  { message: "Enquiry created and assigned to Adil Raaz", createdAt: "2026-05-22 09:20" },
  { message: "Quotation draft generated", createdAt: "2026-05-22 10:15" },
  { message: "Customer requested revised GST split", createdAt: "2026-05-22 11:05" },
];

export const mockCustomers = [
  { id: "C001", name: "Salim Al Balushi", company: "Gulf Star Infra", email: "salim@gulfstar.com", phone: "+968 92 123 456", state: "Muscat" },
  { id: "C002", name: "Mohammed Al Harthy", company: "Al Harthy Construction", email: "mohammed@harthy.com", phone: "+968 90 234 567", state: "Muscat" },
  { id: "C003", name: "Khalid Al Rawahi", company: "Oman Builders Co.", email: "khalid@omanbuilders.com", phone: "+968 91 345 678", state: "Muscat" },
  { id: "C004", name: "Ahmed Al Zadjali", company: "Muscat Infra Pvt", email: "ahmed@muscatinfra.com", phone: "+968 93 456 789", state: "Muscat" },
  { id: "C005", name: "Nasser Al Saadi", company: "Al Madina Construction", email: "nasser@almadina.com", phone: "+968 94 567 890", state: "Muscat" },
  { id: "C006", name: "Ibrahim Al Lawati", company: "Gulf Steel Works", email: "ibrahim@gulfsteel.com", phone: "+968 95 678 901", state: "Muscat" },
];

export const mockDispatches = [
  { id: "D001", orderId: "ORD-001", customer: "Khalid Al Rawahi", product: "TMT 12mm", qty: 6, vehicleNo: "GJ 01 AB 2345", driverName: "Suresh", driverPhone: "+91 99999 88888", dispatchDate: "2026-05-18", expectedDeliveryDate: "2026-05-20", status: "IN_TRANSIT" },
  { id: "D002", orderId: "ORD-002", customer: "Salim Al Balushi", product: "MS Plate 12mm", qty: 5, vehicleNo: "MH 14 XY 8899", driverName: "Imran", driverPhone: "+91 88888 77777", dispatchDate: "2026-05-19", expectedDeliveryDate: "2026-05-21", status: "PENDING" },
] as const;

export const mockQuotations = [
  { id: "Q001", enquiryId: "RFQ-0041", total: 1210000, status: "SENT" as QuotationStatus, validityDate: "2026-05-28" },
  { id: "Q002", enquiryId: "RFQ-0037", total: 1840000, status: "ACCEPTED" as QuotationStatus, validityDate: "2026-05-26" },
] as const;