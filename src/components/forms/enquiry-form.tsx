"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createEnquiryAction } from "@/app/(dashboard)/dashboard/new-enquiry/actions";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { productCategories, quantityUnits } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

type EnquiryFormProps = {
  salesExecutives: Array<{ id: string; name: string | null; email: string }>;
};

export function EnquiryForm({ salesExecutives }: EnquiryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema) as unknown as Resolver<EnquiryInput>,
    defaultValues: {
      customerName: "",
      customerContact: "",
      companyName: "",
      enquiryDate: new Date().toISOString().slice(0, 10),
      productCategory: "HR Coil",
      productDescription: "",
      quantityRequired: 1,
      unit: "MT",
      requiredDeliveryDate: "",
      deliveryLocation: "",
      source: "DIRECT",
      assignedSalesExecutiveId: "",
      priority: "MEDIUM",
      notes: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result = await createEnquiryAction(values);

      if (!result.ok) {
        toast.error("Enquiry could not be saved", { description: result.message });
        return;
      }

      toast.success("Enquiry created", {
        description: "Redirecting to the enquiry detail page.",
      });
      router.push(`/dashboard/enquiries/${result.enquiryId}`);
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
      {/* Customer Information Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Customer Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input id="customerName" placeholder="Full name" {...register("customerName")} />
            {errors.customerName ? <p className="text-xs text-rose-600">{errors.customerName.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerContact">Phone / Email *</Label>
            <Input id="customerContact" placeholder="Contact information" {...register("customerContact")} />
            {errors.customerContact ? <p className="text-xs text-rose-600">{errors.customerContact.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" placeholder="Organization" {...register("companyName")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enquiryDate">Enquiry Date</Label>
            <Input id="enquiryDate" type="date" {...register("enquiryDate")} />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Product Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="productCategory">Category *</Label>
            <Select id="productCategory" {...register("productCategory")}>
              {productCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Grade / Specification *</Label>
            <Input id="productDescription" placeholder="IS 2062 E250, SAE 1008, etc." {...register("productDescription")} />
            {errors.productDescription ? <p className="text-xs text-rose-600">{errors.productDescription.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantityRequired">Quantity *</Label>
            <Input id="quantityRequired" type="number" step="0.01" min="0" {...register("quantityRequired", { valueAsNumber: true })} />
            {errors.quantityRequired ? <p className="text-xs text-rose-600">{errors.quantityRequired.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select id="unit" {...register("unit")}>
              {quantityUnits.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Logistics Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Logistics</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="requiredDeliveryDate">Delivery Date</Label>
            <Input id="requiredDeliveryDate" type="date" {...register("requiredDeliveryDate")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryLocation">Location / State</Label>
            <Input id="deliveryLocation" placeholder="City, state" {...register("deliveryLocation")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select id="source" {...register("source")}>
              <option value="DIRECT">Direct</option>
              <option value="REFERENCE">Reference</option>
              <option value="ONLINE">Online</option>
              <option value="EXHIBITION">Exhibition</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Assignment Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Assignment</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="assignedSalesExecutiveId">Sales Executive</Label>
            <Select id="assignedSalesExecutiveId" {...register("assignedSalesExecutiveId")}>
              <option value="">Unassigned</option>
              {salesExecutives.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name ?? user.email}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select id="priority" {...register("priority")}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Additional Notes</h3>
        <div className="space-y-2">
          <Label htmlFor="notes">Remarks & Requirements</Label>
          <Textarea id="notes" rows={4} placeholder="Stock notes, payment terms, special requirements..." {...register("notes")} />
        </div>
      </div>

      {/* Submit Section */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Status will be set to Open and saved to the database.
          </p>
          <Button type="submit" disabled={isPending} className="gap-2 bg-slate-900 hover:bg-slate-800">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create Enquiry →
          </Button>
        </div>
      </div>
    </form>
  );
}