"use client";

import { useState } from "react";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MaterialItem {
  id: string;
  name: string;
  category: string;
  spec: string;
  grade: string;
  basePrice: number;
  stock: number;
  unit: string;
}

const initialMaterials: MaterialItem[] = [
  { id: "MAT-001", name: "ISMB 200 Beams", category: "Beams", spec: "IS 2062 E250", grade: "Fe 500", basePrice: 42000, stock: 120, unit: "MT" },
  { id: "MAT-002", name: "ISMB 300 Beams", category: "Beams", spec: "IS 2062 E250", grade: "Fe 500", basePrice: 42500, stock: 85, unit: "MT" },
  { id: "MAT-003", name: "TMT 12mm Bars", category: "TMT Bars", spec: "IS 1786", grade: "Fe 550D", basePrice: 46000, stock: 240, unit: "MT" },
  { id: "MAT-004", name: "TMT 16mm Bars", category: "TMT Bars", spec: "IS 1786", grade: "Fe 550D", basePrice: 45800, stock: 190, unit: "MT" },
  { id: "MAT-005", name: "MS Plate 12mm", category: "Plates", spec: "IS 2062", grade: "Fe 410", basePrice: 41500, stock: 60, unit: "MT" },
  { id: "MAT-006", name: "HR Coil 3mm", category: "HR Coil", spec: "IS 10748", grade: "HR2", basePrice: 48000, stock: 150, unit: "MT" },
  { id: "MAT-007", name: "Angle 65×65 × 5", category: "Angles", spec: "IS 2062", grade: "Fe 250", basePrice: 43200, stock: 95, unit: "MT" },
  { id: "MAT-008", name: "Channel 100×50", category: "Channels", spec: "IS 2062", grade: "Fe 250", basePrice: 44000, stock: 110, unit: "MT" },
];

export default function MaterialsPage() {
  const [materials] = useState<MaterialItem[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = materials.filter(
    (mat) =>
      mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Materials Master</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your steel products, grades, and base prices</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Material</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-[15px] w-[15px] text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search material, category, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>

      {/* Grid List (scrollable) */}
      <div className="flex-grow overflow-y-auto pr-1 pb-4 scrollbar-thin">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 tracking-wider">
                    {mat.id}
                  </span>
                  <Badge variant="outline" className="bg-[#cbf380]/20 text-[#1a2c42] border-[#cbf380]/40 text-[9px] font-extrabold select-none tracking-wider">
                    {mat.category}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-950 mt-3 truncate">{mat.name}</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  Spec: {mat.spec} • Grade: {mat.grade}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Base Price</div>
                  <div className="text-sm font-black text-slate-900 mt-1">₹{mat.basePrice.toLocaleString("en-IN")}/MT</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Current Stock</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{mat.stock} {mat.unit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
