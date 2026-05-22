import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-start justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-slate-950">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-sm text-slate-500">The requested CRM record does not exist or has been archived.</p>
      <Link href="/dashboard" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">
        Back to dashboard
      </Link>
    </div>
  );
}