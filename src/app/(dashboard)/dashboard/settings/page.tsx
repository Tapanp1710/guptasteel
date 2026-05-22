"use client";

import { useState } from "react";
import { Save, Users, Plus, Mail, Key, Store, Package, RefreshCw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Company Profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Forms states
  const [companyName, setCompanyName] = useState("Omnia Steels Ltd");
  const [gstNo, setGstNo] = useState("27AAAAA1111A1Z1");
  const [smtpServer, setSmtpServer] = useState("smtp.omniasteels.com");
  const [smtpPort, setSmtpPort] = useState("587");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure company profiles, team permissions, products, and integrations</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] disabled:bg-slate-400 text-white px-4 text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
        >
          {isSaving ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : saveSuccess ? (
            <Check className="h-3.5 w-3.5 text-[#cbf380]" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          <span>{isSaving ? "Saving..." : saveSuccess ? "Saved Successfully" : "Save Changes"}</span>
        </button>
      </div>

      {/* 2. Horizontal Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none shrink-0 w-fit">
        {["Company Profile", "Team Members", "Product Categories", "SMTP & Integrations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-[#1a2c42] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Settings Card Pane (scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1 pb-4 scrollbar-thin">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm w-full">
          {activeTab === "Company Profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                  <Store className="h-4 w-4 text-slate-500" />
                  <span>Company Identity</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Configure trading name, billing address, and regional tax identification parameters.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Trading Legal Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GST Identification Number</label>
                  <input
                    type="text"
                    value={gstNo}
                    onChange={(e) => setGstNo(e.target.value)}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 font-mono tracking-wide focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registered Corporate Address</label>
                  <textarea
                    rows={3}
                    defaultValue="101, Corporate Hub, Link Road, Andheri West, Mumbai, Maharashtra 400053"
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Team Members" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span>Team Management</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Invite trading desk associates, logistics managers and configure role-based access rights.</p>
                </div>
                <button className="flex h-8 items-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 text-[11px] font-bold text-slate-700 transition-colors">
                  <Plus className="h-3 w-3" />
                  <span>Invite User</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                <div className="flex justify-between py-3.5 items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#1a2c42] shadow-inner border border-slate-200">A</div>
                    <div>
                      <div className="font-bold text-slate-950">Admin User</div>
                      <div className="text-[10px] text-slate-400 font-semibold">admin@omniasteel.com</div>
                    </div>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 border text-[9px] font-extrabold tracking-wider">ADMIN</Badge>
                </div>
                <div className="flex justify-between py-3.5 items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#1a2c42] shadow-inner border border-slate-200">K</div>
                    <div>
                      <div className="font-bold text-slate-950">Karthik Y</div>
                      <div className="text-[10px] text-slate-400 font-semibold">karthik@omniasteel.com</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-100 border text-[9px] font-extrabold tracking-wider">SALES EXECUTIVE</Badge>
                </div>
                <div className="flex justify-between py-3.5 items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#1a2c42] shadow-inner border border-slate-200">A</div>
                    <div>
                      <div className="font-bold text-slate-950">Adil Raaz</div>
                      <div className="text-[10px] text-slate-400 font-semibold">adil@omniasteel.com</div>
                    </div>
                  </div>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-100 border text-[9px] font-extrabold tracking-wider">DISPATCH MANAGER</Badge>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Product Categories" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                    <Package className="h-4 w-4 text-slate-500" />
                    <span>Steel Catalog Configurations</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Manage active product ranges, custom sizing specifications, and default units of measure.</p>
                </div>
                <button className="flex h-8 items-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 text-[11px] font-bold text-slate-700 transition-colors">
                  <Plus className="h-3 w-3" />
                  <span>Add Product Category</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                {["HR Coil (MT)", "CR Coil (MT)", "TMT Bars (MT)", "Angles (MT)", "Channels (MT)", "Plates (MT)", "Pipes (MT/Nos)", "Beams (MT)", "Sheets (Sheets)"].map((cat) => (
                  <div key={cat} className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span>{cat}</span>
                    <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 text-[8px] font-bold tracking-wider uppercase">Active</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "SMTP & Integrations" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>Outgoing Email SMTP</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Connect your custom company SMTP mail server to dispatch quotes directly to clients.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SMTP Server Domain</label>
                  <input
                    type="text"
                    value={smtpServer}
                    onChange={(e) => setSmtpServer(e.target.value)}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SMTP Port</label>
                  <input
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SMTP Account Username / Email</label>
                  <input
                    type="email"
                    defaultValue="notifications@omniasteels.com"
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SMTP Account Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••••"
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                  <Key className="h-4 w-4 text-slate-500" />
                  <span>WhatsApp Cloud API keys</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Configure webhook endpoints and tokens to trigger automated dispatch alerts.</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp Business Phone ID</label>
                    <input
                      type="text"
                      defaultValue="105432900762310"
                      className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm font-mono tracking-wide"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Token (Temporary Developer Token)</label>
                    <input
                      type="password"
                      defaultValue="EAABsbC34ZA18BAOZB..."
                      className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 focus:border-slate-300 focus:outline-none transition-all shadow-sm font-mono tracking-wide"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}