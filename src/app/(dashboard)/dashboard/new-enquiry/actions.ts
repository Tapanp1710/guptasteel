"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { mockEnquiries } from "@/lib/mock-data";

export async function createEnquiryAction(input: EnquiryInput) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { ok: false, message: "You must sign in to create an enquiry." };
  }

  const parsed = enquirySchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid enquiry data." };
  }

  // In mock mode, generate a new enquiry ID based on the highest existing one
  const maxId = Math.max(...mockEnquiries.map((e) => parseInt(e.id.split("-")[1], 10)), 0);
  const newId = `RFQ-${String(maxId + 1).padStart(4, "0")}`;

  // Return success without actually saving to database
  return { ok: true, enquiryId: newId };
}