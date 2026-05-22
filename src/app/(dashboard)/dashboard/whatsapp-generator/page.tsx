"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Copy, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Template {
  name: string;
  category: string;
  text: string;
}

const templates: Template[] = [
  {
    name: "Quotation Send Reminder",
    category: "Quotations",
    text: "Dear [Name],\n\nThis is from *Omnia Steels*. We have successfully generated and sent quotation for *[Project]*.\n\nTotal value: *[Value]*\n\nPlease let us know if you require any revisions or would like to proceed with the order.\n\nBest Regards,\nOmnia Steels Team",
  },
  {
    name: "Payment Pending Reminder",
    category: "Payments",
    text: "Dear [Name],\n\nHope you are doing well.\n\nThis is a friendly reminder that invoice for *[Project]* has outstanding balance of *[Value]*.\n\nKindly process the clearance of dues as per agreed credit terms. We appreciate your cooperation.\n\nBest Regards,\nOmnia Steels Team",
  },
  {
    name: "Logistics Dispatch Notification",
    category: "Operations",
    text: "Dear [Name],\n\nGreat news! Your steel order of *[Value]* for *[Project]* has been loaded and dispatched.\n\nOur transport vehicle is in transit. We will share driver contact details shortly.\n\nBest Regards,\nOmnia Steels Team",
  },
  {
    name: "Negotiation Follow-up",
    category: "Sales",
    text: "Dear [Name],\n\nI wanted to quickly follow up regarding our quotation for *[Project]* which we discussed yesterday. We are happy to offer the best competitive rates for *[Value]*.\n\nLet us know if you'd like to schedule a quick call to close the deal.\n\nBest Regards,\nOmnia Steels Team",
  },
];

export default function WhatsAppGeneratorPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("Salim Al Balushi");
  const [project, setProject] = useState("Sohar Port Warehouse");
  const [value, setValue] = useState("₹8.6L");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Compile template text in real-time
  useEffect(() => {
    const rawText = templates[selectedTemplateIndex].text;
    const compiled = rawText
      .replace("[Name]", name)
      .replace("[Project]", project)
      .replace("[Value]", value);
    setMessage(compiled);
  }, [name, project, value, selectedTemplateIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    // Format phone: strip spaces and symbols, keep only digits.
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedText = encodeURIComponent(message);
    const url = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;

    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* Title */}
      <div className="select-none shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">WhatsApp Generator</h1>
        <p className="text-sm text-slate-500 mt-1">Generate and send trade communications over WhatsApp</p>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-5 overflow-hidden">
        {/* Left Side Inputs Form */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100/60 pb-4">
              <CardTitle className="text-sm font-bold text-slate-900">Message Customizations</CardTitle>
              <CardDescription className="text-xs text-slate-400 font-medium">
                Fill in variables and choose a pre-filled business template.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Template Selector */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Template Category</span>
                <select
                  value={selectedTemplateIndex}
                  onChange={(e) => setSelectedTemplateIndex(Number(e.target.value))}
                  className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-slate-300 shadow-sm"
                >
                  {templates.map((tpl, idx) => (
                    <option key={tpl.name} value={idx}>
                      [{tpl.category}] {tpl.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Phone */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Client Phone Number</span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Smartphone className="h-[15px] w-[15px] text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="96892123456 (Include Country Code)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 font-bold focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Client Name */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Client Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 font-bold focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Project Site */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Project Site</span>
                  <input
                    type="text"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 font-bold focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Value Placeholder */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Value / Cost</span>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 font-bold focus:border-slate-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Live Message Preview & Send Actions */}
        <div className="w-full lg:w-96 shrink-0 space-y-4 overflow-y-auto">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100/60 pb-4">
              <CardTitle className="text-sm font-bold text-slate-900">Message Preview</CardTitle>
              <CardDescription className="text-xs text-slate-400 font-medium">
                Live simulated WhatsApp message output.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* WhatsApp Simulated bubble */}
              <div className="rounded-2xl bg-[#e5ddd5] p-4 border border-slate-300 shadow-inner relative overflow-hidden min-h-[220px]">
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="relative rounded-2xl bg-white p-3 shadow-md max-w-[85%] text-xs text-slate-800 border border-slate-200/50 leading-relaxed font-sans whitespace-pre-wrap">
                  {message}
                  <div className="text-right text-[9px] text-slate-400 font-semibold mt-2.5">
                    12:00 PM ✓✓
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>
                <button
                  onClick={handleSend}
                  className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 text-xs font-bold transition-all shadow-md shadow-emerald-600/10 animate-pulse"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
