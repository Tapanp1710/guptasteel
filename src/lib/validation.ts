import { z } from "zod";
import { productCategories, quantityUnits } from "./constants";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const enquirySchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerContact: z.string().min(3, "Phone or email is required"),
  companyName: z.string().optional(),
  enquiryDate: z.string().optional(),
  productCategory: z.enum(productCategories),
  productDescription: z.string().min(2, "Product description is required"),
  quantityRequired: z.coerce.number().positive("Quantity must be greater than zero"),
  unit: z.enum(quantityUnits),
  requiredDeliveryDate: z.string().optional(),
  deliveryLocation: z.string().min(2, "Delivery location is required"),
  source: z.enum(["DIRECT", "REFERENCE", "ONLINE", "EXHIBITION"]),
  assignedSalesExecutiveId: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;