"use client";

import { useState } from "react";
import { Download, Plus, RefreshCw, Save, Trash } from "lucide-react";


interface CalculatorItem {
  id: number;
  name: string;
  spec: string;
  grade: string;
  qty: number;
  basePrice: number;
  transport: number;
  processing: number;
  margin: number;
  gst: number;
}

const quickFills = [
  { name: "ISMB 200", spec: "IS 2062 E250", grade: "Fe 500", basePrice: 42000, transport: 1200, processing: 800 },
  { name: "TMT 12mm", spec: "IS 1786", grade: "Fe 550D", basePrice: 46000, transport: 1000, processing: 0 },
  { name: "MS Plate 12mm", spec: "IS 2062", grade: "Fe 410", basePrice: 41500, transport: 1500, processing: 500 },
  { name: "HR Coil 3mm", spec: "IS 10748", grade: "HR2", basePrice: 48000, transport: 1800, processing: 0 },
];

export default function PriceCalculatorPage() {
  const [globalMargin, setGlobalMargin] = useState(12);
  const [globalGst, setGlobalGst] = useState(18);
  const [globalTransport, setGlobalTransport] = useState(0);

  const [items, setItems] = useState<CalculatorItem[]>([
    {
      id: 1,
      name: "ISMB 200",
      spec: "IS 2062 L250",
      grade: "Fe 500",
      qty: 1,
      basePrice: 0,
      transport: 0,
      processing: 0,
      margin: 12,
      gst: 18,
    },
  ]);

  // Apply defaults to all active rows
  const handleApplyDefaults = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        margin: globalMargin,
        gst: globalGst,
        transport: globalTransport,
      }))
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        spec: "",
        grade: "",
        qty: 1,
        basePrice: 0,
        transport: globalTransport,
        processing: 0,
        margin: globalMargin,
        gst: globalGst,
      },
    ]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length === 1) return; // Keep at least one item
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: number, field: keyof CalculatorItem, value: CalculatorItem[keyof CalculatorItem]) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleQuickFill = (id: number, index: number) => {
    if (index === -1) return;
    const fill = quickFills[index];
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: fill.name,
              spec: fill.spec,
              grade: fill.grade,
              basePrice: fill.basePrice,
              transport: fill.transport,
              processing: fill.processing,
            }
          : item
      )
    );
  };

  const handleReset = () => {
    setItems([
      {
        id: 1,
        name: "ISMB 200",
        spec: "IS 2062 L250",
        grade: "Fe 500",
        qty: 1,
        basePrice: 0,
        transport: 0,
        processing: 0,
        margin: 12,
        gst: 18,
      },
    ]);
    setGlobalMargin(12);
    setGlobalGst(18);
    setGlobalTransport(0);
  };

  // Calculations helper
  const calculateItemValues = (item: CalculatorItem) => {
    const costPerMt = Number(item.basePrice) + Number(item.transport) + Number(item.processing);
    const sellPerMt = costPerMt * (1 + Number(item.margin) / 100);
    const gstPerMt = sellPerMt * (Number(item.gst) / 100);
    const totalValue = (sellPerMt + gstPerMt) * Number(item.qty);

    return {
      costPerMt,
      sellPerMt,
      gstPerMt,
      totalValue,
    };
  };

  // Summary Metrics
  const summary = items.reduce(
    (acc, item) => {
      const { costPerMt, sellPerMt, gstPerMt, totalValue } = calculateItemValues(item);
      acc.qty += Number(item.qty);
      acc.cost += costPerMt * Number(item.qty);
      acc.sellExGst += sellPerMt * Number(item.qty);
      acc.gstVal += gstPerMt * Number(item.qty);
      acc.grandTotal += totalValue;
      return acc;
    },
    { qty: 0, cost: 0, sellExGst: 0, gstVal: 0, grandTotal: 0 }
  );

  const grossMarginEarned = summary.sellExGst - summary.cost;
  const averageMarginPercent = summary.cost > 0 ? (grossMarginEarned / summary.cost) * 100 : 0;
  const marginDeficit = globalMargin - averageMarginPercent;

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Price Calculator</h1>
          <p className="text-sm text-slate-500 mt-1">Calculate sell price, margin and GST for steel items</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="h-3.5 w-3.5" />
            <span>Export PDF</span>
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md">
            <Save className="h-3.5 w-3.5" />
            <span>Save as Quote</span>
          </button>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="flex-grow flex flex-col lg:flex-row gap-5 overflow-hidden">
        {/* Left Side: Formula & Items Panel */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Defaults/Global values card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                DEFAULTS
              </span>

              {/* Margin Default */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span>Margin %</span>
                <input
                  type="number"
                  value={globalMargin}
                  onChange={(e) => setGlobalMargin(Math.max(0, Number(e.target.value)))}
                  className="h-8 w-14 rounded-lg border border-slate-200 bg-slate-50/50 px-2 text-center text-xs font-bold text-slate-900 focus:bg-white focus:outline-none"
                />
                <span className="text-slate-400">%</span>
              </div>

              {/* GST Default */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span>GST %</span>
                <input
                  type="number"
                  value={globalGst}
                  onChange={(e) => setGlobalGst(Math.max(0, Number(e.target.value)))}
                  className="h-8 w-14 rounded-lg border border-slate-200 bg-slate-50/50 px-2 text-center text-xs font-bold text-slate-900 focus:bg-white focus:outline-none"
                />
                <span className="text-slate-400">%</span>
              </div>

              {/* Transport Default */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span>Transport ₹/MT</span>
                <input
                  type="number"
                  value={globalTransport}
                  onChange={(e) => setGlobalTransport(Math.max(0, Number(e.target.value)))}
                  className="h-8 w-20 rounded-lg border border-slate-200 bg-slate-50/50 px-2 text-center text-xs font-bold text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleApplyDefaults}
              className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Apply to all rows</span>
            </button>
          </div>

          {/* Items sections list */}
          <div className="space-y-4">
            {items.map((item, idx) => {
              const { costPerMt, sellPerMt, gstPerMt, totalValue } = calculateItemValues(item);
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 relative group"
                >
                  {/* Item Row Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold tracking-tight text-slate-500 uppercase">
                      ITEM {idx + 1}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Quick fill */}
                      <select
                        onChange={(e) => handleQuickFill(item.id, Number(e.target.value))}
                        defaultValue="-1"
                        className="h-8 rounded-lg border border-slate-200 px-2 text-xs font-semibold text-slate-600 focus:outline-none bg-white cursor-pointer shadow-sm"
                      >
                        <option value="-1" disabled>
                          Quick fill...
                        </option>
                        {quickFills.map((fill, index) => (
                          <option key={fill.name} value={index}>
                            {fill.name} ({fill.spec})
                          </option>
                        ))}
                      </select>

                      {items.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form inputs */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* Item Name */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Item Name</span>
                      <input
                        type="text"
                        placeholder="ISMB 200"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Specification */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Specification</span>
                      <input
                        type="text"
                        placeholder="IS 2062 E250"
                        value={item.spec}
                        onChange={(e) => handleUpdateItem(item.id, "spec", e.target.value)}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Grade */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Grade</span>
                      <input
                        type="text"
                        placeholder="Fe 500"
                        value={item.grade}
                        onChange={(e) => handleUpdateItem(item.id, "grade", e.target.value)}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Quantity (MT)</span>
                      <div className="relative">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(item.id, "qty", Math.max(0.1, Number(e.target.value)))}
                          className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 pl-3 pr-10 text-xs text-slate-900 font-black focus:bg-white focus:outline-none transition-all"
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-extrabold text-slate-400">
                          MT
                        </span>
                      </div>
                    </div>

                    {/* Base Price */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Base Price (₹/MT)</span>
                      <input
                        type="number"
                        value={item.basePrice}
                        onChange={(e) => handleUpdateItem(item.id, "basePrice", Math.max(0, Number(e.target.value)))}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-black focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Transport */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Transport (₹/MT)</span>
                      <input
                        type="number"
                        value={item.transport}
                        onChange={(e) => handleUpdateItem(item.id, "transport", Math.max(0, Number(e.target.value)))}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-black focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Processing */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Processing (₹/MT)</span>
                      <input
                        type="number"
                        value={item.processing}
                        onChange={(e) => handleUpdateItem(item.id, "processing", Math.max(0, Number(e.target.value)))}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-black focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Margin */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Margin %</span>
                      <input
                        type="number"
                        value={item.margin}
                        onChange={(e) => handleUpdateItem(item.id, "margin", Math.max(0, Number(e.target.value)))}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-black focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* GST */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">GST %</span>
                      <input
                        type="number"
                        value={item.gst}
                        onChange={(e) => handleUpdateItem(item.id, "gst", Math.max(0, Number(e.target.value)))}
                        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3 text-xs text-slate-900 font-black focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* calculated values block */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-slate-100 pt-4 bg-slate-50/40 rounded-xl p-3">
                    <div className="text-center md:border-r border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">COST/MT</div>
                      <div className="text-sm font-bold text-slate-700 mt-1">₹{costPerMt.toLocaleString("en-IN")}</div>
                    </div>
                    <div className="text-center md:border-r border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SELL/MT</div>
                      <div className="text-sm font-bold text-slate-900 mt-1">₹{sellPerMt.toLocaleString("en-IN")}</div>
                    </div>
                    <div className="text-center md:border-r border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GST/MT</div>
                      <div className="text-sm font-bold text-slate-700 mt-1">₹{gstPerMt.toLocaleString("en-IN")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL VALUE</div>
                      <div className="text-sm font-black text-slate-900 mt-1">₹{totalValue.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Item button */}
          <button
            onClick={handleAddItem}
            className="flex w-full items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-slate-200 py-3 text-xs font-bold text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-all select-none hover:bg-slate-50 bg-white"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Right Side: Sticky Calculator Summaries */}
        <div className="w-full lg:w-80 shrink-0 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Summary Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">SUMMARY</h3>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Total Quantity</span>
                  <span className="text-slate-900 font-bold">{summary.qty.toFixed(1)} MT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Cost</span>
                  <span className="text-slate-900 font-bold">₹{summary.cost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Sell (ex-GST)</span>
                  <span className="text-slate-900 font-bold">₹{summary.sellExGst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GST Amount</span>
                  <span className="text-slate-900 font-bold">₹{summary.gstVal.toLocaleString("en-IN")}</span>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">Grand Total</span>
                  <span className="font-black text-slate-950">₹{summary.grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Margin Analysis Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">MARGIN ANALYSIS</h3>
              </div>

              <div className="text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Gross Margin Earned</div>
                <div className="text-2xl font-black text-slate-900 mt-1">₹{grossMarginEarned.toLocaleString("en-IN")}</div>
                
                {/* Badge */}
                <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-extrabold tracking-wide mt-2 border ${
                  averageMarginPercent >= globalMargin
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-rose-50 text-rose-600 border-rose-100"
                }`}>
                  {averageMarginPercent.toFixed(1)}%
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-400 text-center">
                {averageMarginPercent >= globalMargin ? (
                  <span className="text-emerald-600">🎉 Target met! {(averageMarginPercent - globalMargin).toFixed(1)}% above target</span>
                ) : (
                  <span>Target: {globalMargin}% - {marginDeficit.toFixed(1)}% below target</span>
                )}
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 transition-all select-none shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Calculator</span>
          </button>
        </div>
      </div>
    </div>
  );
}
