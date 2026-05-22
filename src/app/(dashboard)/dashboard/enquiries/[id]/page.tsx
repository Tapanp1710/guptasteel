import Link from "next/link";
import { ArrowLeft, CheckCircle2, PencilLine, XCircle } from "lucide-react";
import { mockActivities, mockEnquiries } from "@/lib/mock-data";
import { enquiryStatusMeta } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

type EnquiryDetailPageProps = {
  params: { id: string };
};

export default async function EnquiryDetailPage({ params }: EnquiryDetailPageProps) {
  const { id } = params;
  const enquiry = mockEnquiries.find((item) => item.id === id) ?? mockEnquiries[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/dashboard/enquiries" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600">
          <ArrowLeft className="h-4 w-4" />
          Back to enquiries
        </Link>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <PencilLine className="h-4 w-4" />
            Edit enquiry
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Mark as Won
          </Button>
          <Button variant="destructive" className="gap-2">
            <XCircle className="h-4 w-4" />
            Mark as Lost
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>{enquiry.id}</CardTitle>
            <CardDescription>{enquiry.customer} • {enquiry.product}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              ["Customer", enquiry.customer],
              ["Product", enquiry.product],
              ["Quantity", `${enquiry.qty} ${enquiry.unit}`],
              ["Assigned To", enquiry.assignedTo],
              ["Status", enquiryStatusMeta[enquiry.status as import("@/lib/mock-data").EnquiryStatus].label],
              ["Priority", enquiry.priority],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
                <div className="mt-2 text-sm font-medium text-slate-950">{value}</div>
              </div>
            ))}
            <div className="md:col-span-2">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Status</div>
              <Badge className={`mt-2 ${enquiryStatusMeta[enquiry.status as import("@/lib/mock-data").EnquiryStatus].className}`}>
                {enquiryStatusMeta[enquiry.status as import("@/lib/mock-data").EnquiryStatus].label}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Activity log and status changes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.message} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-sm font-medium text-slate-950">{activity.message}</div>
                <div className="mt-1 text-xs text-slate-500">{activity.createdAt}</div>
              </div>
            ))}
            <Button className="w-full">Create Quotation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}