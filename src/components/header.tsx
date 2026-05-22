"use client";

import { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import type { Session } from "next-auth";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  session: Session;
};

export function Header({ session }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6 select-none">
      {/* Top Search Bar */}
      <div className="relative w-80">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-[15px] w-[15px] text-slate-400" />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none transition-all"
        />
        <span className="absolute inset-y-0 right-3 flex items-center">
          <kbd className="inline-flex h-[18px] items-center gap-0.5 rounded border border-slate-200 bg-slate-100 px-1 text-[10px] font-medium text-slate-400">
            <span>⌘</span>K
          </kbd>
        </span>
      </div>

      {/* Top Right Utilities */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
          >
            <Bell className="h-4 w-4 text-slate-600" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>

          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40 cursor-default" 
                onClick={() => setShowNotifications(false)} 
              />
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] text-orange-500 font-semibold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <div className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-2">
                    <span className="text-sm">🎉</span>
                    <div>
                      <p className="font-semibold text-slate-800 leading-tight">Deal Won!</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">RFQ-0031 for Ibrahim Al Lawati marked as Won.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-2">
                    <span className="text-sm">📝</span>
                    <div>
                      <p className="font-semibold text-slate-800 leading-tight">New RFQ Created</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">RFQ-0043 has been assigned to Karthik Y.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start text-xs">
                    <span className="text-sm">🚚</span>
                    <div>
                      <p className="font-semibold text-slate-800 leading-tight">Dispatch Update</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Transporter assigned for S-1025 loading today.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200" />

        {/* User Card */}
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="h-9 w-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">
            {session.user?.image ? (
              <img src={session.user.image} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <span>AD</span>
            )}
          </div>

          <div className="text-left leading-none">
            <div className="text-xs font-bold text-slate-900">{session.user?.name || "Admin"}</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-1">ID: OS-10042</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}