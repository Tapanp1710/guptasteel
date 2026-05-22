"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const enquiryStatusData = [
  { name: "Open", value: 12, color: "#2563EB" },
  { name: "Quoted", value: 8, color: "#0EA5E9" },
  { name: "Negotiation", value: 6, color: "#F59E0B" },
  { name: "Won", value: 10, color: "#10B981" },
  { name: "Lost", value: 3, color: "#EF4444" },
];

const monthlyTrendData = [
  { month: "Jan", enquiries: 22 },
  { month: "Feb", enquiries: 28 },
  { month: "Mar", enquiries: 31 },
  { month: "Apr", enquiries: 36 },
  { month: "May", enquiries: 42 },
];

export default function ReportsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-2 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Enquiries by Status</CardTitle>
          <CardDescription>Pipeline composition across the active CRM funnel.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={enquiryStatusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={4}>
                {enquiryStatusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Enquiries Trend</CardTitle>
          <CardDescription>Track how demand is changing over time.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="enquiries" fill="#2563EB" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}