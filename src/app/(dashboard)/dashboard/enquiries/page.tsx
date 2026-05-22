import { KanbanBoard } from "@/components/kanban-board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function EnquiriesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col select-none p-6 space-y-6 w-full">
      {/* Page Title & Subtitle block inside main content */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">CRM / RFQ Management</h1>
          <p className="text-sm text-slate-500 mt-1">Track enquiries, pricing negotiations and dispatch</p>
        </div>
      </div>

      {/* Scrollable Kanban Board */}
      <div className="w-full">
        <KanbanBoard />
      </div>
    </div>
  );
}