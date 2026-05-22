"use client";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-start justify-center gap-4 rounded-3xl border border-rose-200 bg-white p-8 text-slate-950">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-slate-500">{error.message}</p>
      <button type="button" onClick={reset} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">
        Try again
      </button>
    </div>
  );
}