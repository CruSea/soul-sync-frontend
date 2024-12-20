"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  name: string;
  users: number;
};

const data: DataPoint[] = [
  { name: "Jan", users: 500 },
  { name: "Feb", users: 800 },
  { name: "Mar", users: 1200 },
  { name: "Apr", users: 1400 },
  { name: "May", users: 1300 },
  { name: "Jun", users: 1350 },
  { name: "Jul", users: 800 },
  { name: "Aug", users: 1600 },
  { name: "Sep", users: 1200 },
  { name: "Oct", users: 1400 },
  { name: "Nov", users: 1800 },
  { name: "Dec", users: 1100 },
];

export function GrowthChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          User Growth Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888888", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888888", fontSize: 12 }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="users" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
