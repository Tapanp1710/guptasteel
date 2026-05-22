import { getAssignableUsers } from "@/lib/dashboard";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export default async function NewEnquiryPage() {
  const salesExecutives = await getAssignableUsers();

  return (
    <div className="grid gap-6 w-full p-6">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-950/5">
        <h2 className="text-2xl font-semibold text-slate-950">Capture a new steel enquiry</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Save customer demand, assign a sales executive, and move the record into the quotation workflow.
        </p>
      </div>
      <EnquiryForm salesExecutives={salesExecutives} />
    </div>
  );
}