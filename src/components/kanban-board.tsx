"use client";

import { useState, useMemo } from "react";
import {
  Building2,
  Search,
  Plus,
  Check,
  Trophy,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Coins,
  TrendingUp,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Priority = "Low" | "Medium" | "High" | "Urgent" | "Priority" | "Big Deal";
type Stage = "New" | "In Progress" | "Quoted" | "Won";

interface CardItem {
  id: string;
  category?: string;
  priority: Priority;
  customer: string;
  company: string;
  site: string;
  product: string;
  assignedTo: string;
  value: string;
  date: string;
  stage: Stage;
  completed: boolean;
  quotationGenerated: boolean;
  approved: boolean;
}

const initialCards: CardItem[] = [
  // New Stage
  {
    id: "RFQ-0043",
    category: "Standard",
    priority: "Medium",
    customer: "Ali Al Jaber",
    company: "Jaber Trading LLC",
    site: "Sohar Industrial Area Phase 2",
    product: "MS Channel 75x40 × 15MT",
    assignedTo: "Karthik Y",
    value: "₹9.2L",
    date: "21 May 2026",
    stage: "New",
    completed: false,
    quotationGenerated: false,
    approved: false,
  },
  {
    id: "RFQ-0044",
    category: "Urgent",
    priority: "High",
    customer: "Said Al Maskari",
    company: "Maskari Contracting",
    site: "Ghala Industrial Block B",
    product: "TMT 12mm × 25MT",
    assignedTo: "Adil Raaz",
    value: "₹14.5L",
    date: "22 May 2026",
    stage: "New",
    completed: false,
    quotationGenerated: false,
    approved: false,
  },
  // In Progress Stage
  {
    id: "RFQ-0041",
    category: "Urgent",
    priority: "High",
    customer: "Mohammed Al Harthy",
    company: "Al Harthy Construction",
    site: "Muscat Hills Villa Complex",
    product: "ISMB 200 × 12MT, TMT 16mm × 8MT",
    assignedTo: "Adil Raaz",
    value: "₹15.8L",
    date: "13 May 2026",
    stage: "In Progress",
    completed: true,
    quotationGenerated: false,
    approved: false,
  },
  {
    id: "RFQ-0042",
    category: "Industrial",
    priority: "Medium",
    customer: "Salim Al Balushi",
    company: "Gulf Star Infra",
    site: "Sohar Port Warehouse",
    product: "MS Plate 12mm × 20MT",
    assignedTo: "Adil Raaz",
    value: "₹8.6L",
    date: "14 May 2026",
    stage: "In Progress",
    completed: true,
    quotationGenerated: false,
    approved: false,
  },
  // Quoted Stage
  {
    id: "RFQ-0035",
    category: "Big Deal",
    priority: "High",
    customer: "Nasser Al Saadi",
    company: "Al Madina Construction",
    site: "Nizwa Residential G+4",
    product: "TMT 12mm × 30MT, TMT 16mm × 20MT",
    assignedTo: "Karthik Y",
    value: "₹24.0L",
    date: "08 May 2026",
    stage: "Quoted",
    completed: true,
    quotationGenerated: true,
    approved: false,
  },
  {
    id: "RFQ-0037",
    category: "Low",
    priority: "Low",
    customer: "Ahmed Al Zadjali",
    company: "Muscat Infra Pvt",
    site: "Barka Commercial Complex",
    product: "HR Coil 3mm × 15MT",
    assignedTo: "Karthik Y",
    value: "₹6.3L",
    date: "10 May 2026",
    stage: "Quoted",
    completed: true,
    quotationGenerated: true,
    approved: false,
  },
  {
    id: "RFQ-0038",
    category: "Standard",
    priority: "Medium",
    customer: "Faisal Al Balushi",
    company: "Oman Dunes Logistics",
    site: "Duqm Port Workshop",
    product: "ISMC 150 × 18MT",
    assignedTo: "Karthik Y",
    value: "₹11.4L",
    date: "11 May 2026",
    stage: "Quoted",
    completed: true,
    quotationGenerated: true,
    approved: false,
  },
  // Won Stage
  {
    id: "RFQ-0031",
    category: "Standard",
    priority: "Medium",
    customer: "Ibrahim Al Lawati",
    company: "Gulf Steel Works",
    site: "Seeb Industrial Shed",
    product: "ISMB 200 × 10MT",
    assignedTo: "Adil Raaz",
    value: "₹4.8L",
    date: "06 May 2026",
    stage: "Won",
    completed: true,
    quotationGenerated: true,
    approved: true,
  },
];

const COLUMNS: { id: Stage; label: string; bgClass: string; borderClass: string }[] = [
  { id: "New", label: "New", bgClass: "bg-slate-50", borderClass: "border-t-slate-300" },
  { id: "In Progress", label: "In Progress", bgClass: "bg-slate-50", borderClass: "border-t-slate-400" },
  { id: "Quoted", label: "Quoted", bgClass: "bg-slate-50", borderClass: "border-t-slate-500" },
  { id: "Won", label: "Won", bgClass: "bg-slate-50", borderClass: "border-t-orange-500" },
];

export function KanbanBoard() {
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [savingCardId, setSavingCardId] = useState<string | null>(null);

  // Helper to parse values (e.g. "₹8.6L" -> 860,000, "₹24.0L" -> 2,400,000)
  const parseValue = (valStr: string): number => {
    const match = valStr.match(/[\d.]+/);
    if (!match) return 0;
    const num = parseFloat(match[0]);
    if (valStr.toLowerCase().includes("l")) {
      return num * 100000;
    }
    if (valStr.toLowerCase().includes("cr")) {
      return num * 10000000;
    }
    return num;
  };

  // Helper to format values back to Lakhs format (₹8.6L)
  const formatValue = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)}Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Automatically computed stats
  const totalDeals = cards.length;
  const wonDeals = useMemo(() => cards.filter((c) => c.stage === "Won").length, [cards]);
  const openDeals = useMemo(() => cards.filter((c) => c.stage !== "Won").length, [cards]);
  const totalValue = useMemo(() => {
    const sum = cards.reduce((acc, card) => acc + parseValue(card.value), 0);
    return formatValue(sum);
  }, [cards]);

  // Priority styling helpers
  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Medium":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Urgent":
        return "bg-orange-100 text-orange-800 border-orange-300 font-semibold";
      case "Priority":
        return "bg-slate-200 text-slate-800 border-slate-300";
      case "Big Deal":
        return "bg-orange-500 text-white border-orange-600 font-bold";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityBorderClass = (priority: Priority) => {
    switch (priority) {
      case "Low":
        return "border-l-slate-200";
      case "Medium":
        return "border-l-slate-300";
      case "High":
        return "border-l-orange-400";
      case "Urgent":
        return "border-l-orange-500";
      case "Priority":
        return "border-l-slate-500";
      case "Big Deal":
        return "border-l-orange-600";
      default:
        return "border-l-slate-300";
    }
  };

  // Simulated backend save API with failure simulation
  const saveCardState = (_cardId: string): Promise<void> => {
    console.log("Simulating API save for card:", _cardId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateFailure) {
          reject(new Error("Simulated API Save Failure"));
        } else {
          resolve();
        }
      }, 700); // 700ms simulation lag
    });
  };

  // Reusable card mover with optimistic state updates and rollback capabilities
  const moveCardOptimistic = async (
    cardId: string,
    targetStage: Stage,
    fieldsToUpdate: Partial<CardItem> = {}
  ) => {
    const previousCards = [...cards];

    // Compute updated cards list
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        const updated = { ...card, ...fieldsToUpdate, stage: targetStage };

        // Apply Auto Status Progression Rules
        if (updated.approved) {
          updated.stage = "Won";
        } else if (updated.quotationGenerated) {
          updated.stage = "Quoted";
        } else if (updated.completed && updated.stage === "New") {
          updated.stage = "In Progress";
        }

        return updated;
      }
      return card;
    });

    // Optimistic UI state update
    setCards(updatedCards);
    setSavingCardId(cardId);

    try {
      await saveCardState(cardId);
      console.log(`Saved card state successfully: ${cardId}`);
    } catch (err) {
      console.warn("Optimistic save failed. Rolling back changes...", err);
      // Rollback to previous clean state
      setCards(previousCards);
      alert(`⚠️ Failed to update ${cardId}. Network save error simulated.`);
    } finally {
      setSavingCardId(null);
    }
  };

  // HTML5 Drag handlers
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDrop = (e: React.DragEvent, targetStage: Stage) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    if (!cardId) return;

    // Determine flag fields based on the column the card is dropped into
    let dropFields: Partial<CardItem> = {};
    if (targetStage === "New") {
      dropFields = { completed: false, quotationGenerated: false, approved: false };
    } else if (targetStage === "In Progress") {
      dropFields = { completed: true, quotationGenerated: false, approved: false };
    } else if (targetStage === "Quoted") {
      dropFields = { completed: true, quotationGenerated: true, approved: false };
    } else if (targetStage === "Won") {
      dropFields = { completed: true, quotationGenerated: true, approved: true };
    }

    moveCardOptimistic(cardId, targetStage, dropFields);
  };

  // Action Button handlers
  const moveNext = (card: CardItem) => {
    if (card.stage === "New") {
      moveCardOptimistic(card.id, "In Progress", { completed: true });
    } else if (card.stage === "In Progress") {
      moveCardOptimistic(card.id, "Quoted", { quotationGenerated: true });
    } else if (card.stage === "Quoted") {
      moveCardOptimistic(card.id, "Won", { approved: true });
    }
  };

  const movePrevious = (card: CardItem) => {
    if (card.stage === "Won") {
      moveCardOptimistic(card.id, "Quoted", { approved: false });
    } else if (card.stage === "Quoted") {
      moveCardOptimistic(card.id, "In Progress", { quotationGenerated: false });
    } else if (card.stage === "In Progress") {
      moveCardOptimistic(card.id, "New", { completed: false });
    }
  };

  const markComplete = (cardId: string) => {
    moveCardOptimistic(cardId, "In Progress", { completed: true });
  };

  const generateQuote = (cardId: string) => {
    moveCardOptimistic(cardId, "Quoted", { quotationGenerated: true });
  };

  const markWon = (cardId: string) => {
    moveCardOptimistic(cardId, "Won", { approved: true });
  };

  // Filter cards by search query
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return cards;
    const query = searchQuery.toLowerCase();
    return cards.filter(
      (c) =>
        c.customer.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        c.product.toLowerCase().includes(query)
    );
  }, [cards, searchQuery]);

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Top Stats Bar & Controls */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border shrink-0 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Total Deals */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 flex items-center space-x-3 hover:shadow-xs hover:border-slate-200 transition-all duration-200 cursor-default">
            <div className="bg-slate-100 text-slate-600 p-2 rounded-lg">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Total Deals</div>
              <div className="text-lg font-bold text-slate-800 tracking-tight">{totalDeals}</div>
            </div>
          </div>
          {/* Open RFQs */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 flex items-center space-x-3 hover:shadow-xs hover:border-slate-200 transition-all duration-200 cursor-default">
            <div className="bg-slate-100 text-slate-600 p-2 rounded-lg">
              <AlertCircle size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Open RFQs</div>
              <div className="text-lg font-bold text-slate-800 tracking-tight">{openDeals}</div>
            </div>
          </div>
          {/* Won Deals */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 flex items-center space-x-3 hover:shadow-xs hover:border-slate-200 transition-all duration-200 cursor-default">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <Trophy size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Won Deals</div>
              <div className="text-lg font-bold text-slate-800 tracking-tight">{wonDeals}</div>
            </div>
          </div>
          {/* Total Value */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 flex items-center space-x-3 hover:shadow-xs hover:border-slate-200 transition-all duration-200 cursor-default">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <Coins size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Pipeline Value</div>
              <div className="text-lg font-bold text-slate-800 tracking-tight">{totalValue}</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 my-1 w-full" />

        {/* Search & Simulation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 hover:bg-white focus:bg-white w-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg p-2.5 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors shrink-0">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              className="accent-orange-600 cursor-pointer h-3.5 w-3.5"
            />
            <span>Simulate Save Failure</span>
          </label>
        </div>
      </div>

      {/* Won Deals Banner */}
      {wonDeals > 0 && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-xl p-3.5 flex items-center space-x-3 shrink-0 shadow-xs">
          <span className="text-lg">🎉</span>
          <span className="text-sm font-medium">
            Success Story: <strong className="text-orange-950 font-bold">{wonDeals} steel {wonDeals === 1 ? "deal" : "deals"} won</strong> for Omnia Steels! Keep driving operations.
          </span>
        </div>
      )}

      {/* Board Container */}
      <div className="w-full overflow-x-auto pb-4">
        {/* Board Inner */}
        <div className="flex gap-5 items-start w-max">
          {COLUMNS.map((column) => {
            const columnCards = filteredCards.filter((card) => card.stage === column.id);

            return (
              <div
                key={column.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, column.id)}
                className={`w-[340px] flex-shrink-0 rounded-2xl border ${column.bgClass} flex flex-col border-t-4 ${column.borderClass} shadow-xs`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm tracking-wide uppercase">
                      {column.label}
                    </span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {columnCards.length}
                    </Badge>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <Plus size={16} />
                  </button>
                </div>

                {/* Column Card Body */}
                <div className="p-4 flex flex-col gap-4 min-h-[200px]">
                  {columnCards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      className={`bg-white p-4 rounded-xl border shadow-xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing border-l-4 ${getPriorityBorderClass(
                        card.priority
                      )} flex flex-col gap-2 relative group ${
                        savingCardId === card.id ? "opacity-60" : ""
                      }`}
                    >
                      {/* Card ID & Priority Badges */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {card.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getPriorityBadgeClass(
                              card.priority
                            )}`}
                          >
                            {card.priority}
                          </span>
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">
                          {card.customer}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {card.company}
                        </p>
                      </div>

                      {/* Site Address */}
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <Building2 size={13} className="shrink-0 text-slate-400" />
                        <span className="truncate">{card.site}</span>
                      </div>

                      {/* Product details */}
                      <div className="bg-slate-50 rounded-lg p-2 text-[11px] text-slate-700 font-medium border border-slate-100 leading-normal">
                        {card.product}
                      </div>

                      {/* Bottom Info: Assignee & Value */}
                      <div className="flex items-center justify-between border-t pt-3 mt-1 shrink-0">
                        <div className="flex items-center space-x-1.5">
                          <div className="bg-slate-100 rounded-full p-1 text-slate-500">
                            <User size={12} />
                          </div>
                          <span className="text-[11px] font-medium text-slate-500 truncate max-w-[90px]">
                            {card.assignedTo}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-orange-600">
                          {card.value}
                        </span>
                      </div>

                      {/* Inline Status Badges */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {card.completed && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                            <Check size={9} /> Completed
                          </span>
                        )}
                        {card.quotationGenerated && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                            Quote Ready
                          </span>
                        )}
                        {card.approved && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded border border-orange-200">
                            Approved
                          </span>
                        )}
                      </div>

                      {/* Action Control Panel */}
                      <div className="flex flex-col gap-2 border-t pt-3 mt-1.5">
                        {/* Status progression actions */}
                        <div className="flex flex-wrap gap-1.5">
                          {card.stage === "New" && !card.completed && (
                            <button
                              onClick={() => markComplete(card.id)}
                              className="text-[10px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-2 py-1 flex-1 transition-all"
                            >
                              Mark Complete
                            </button>
                          )}
                          {card.stage === "In Progress" && !card.quotationGenerated && (
                            <button
                              onClick={() => generateQuote(card.id)}
                              className="text-[10px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-2 py-1 flex-1 transition-all"
                            >
                              Generate Quote
                            </button>
                          )}
                          {card.stage === "Quoted" && !card.approved && (
                            <button
                              onClick={() => markWon(card.id)}
                              className="text-[10px] font-bold text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded px-2 py-1 flex-1 transition-all"
                            >
                              Mark Won
                            </button>
                          )}
                        </div>

                        {/* Navigation Chevron Actions */}
                        <div className="flex justify-between items-center bg-slate-50 border rounded-lg p-1">
                          <button
                            disabled={card.stage === "New"}
                            onClick={() => movePrevious(card)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move to previous stage"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            Move
                          </span>
                          <button
                            disabled={card.stage === "Won"}
                            onClick={() => moveNext(card)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move to next stage"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}