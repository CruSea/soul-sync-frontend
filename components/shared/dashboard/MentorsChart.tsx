'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { category: 'Marriage Counseling', mentors: 650, fill: '#6B7280' },
  { category: 'Discipleship', mentors: 270, fill: '#E5E7EB' },
  { category: 'Spiritual Life', mentors: 230, fill: '#D1D5DB' },
];

const chartConfig = {
  mentors: {
    label: 'Mentors',
  },
  'Marriage Counseling': {
    label: 'Marriage Counseling',
    color: '#6B7280',
  },
  Discipleship: {
    label: 'Discipleship',
    color: '#E5E7EB',
  },
  'Spiritual Life': {
    label: 'Spiritual Life',
    color: '#D1D5DB',
  },
} satisfies ChartConfig;

export function MentorsChart() {
  const totalMentors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.mentors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Total Mentors</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="mentors"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-gray-900 dark:fill-white text-3xl font-bold"
                        >
                          {totalMentors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-gray-500 dark:fill-white text-sm"
                        >
                          Total Mentors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-3 ">
          {chartData.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between "
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-gray-500  dark:text-white">
                  {item.category}
                </span>
              </div>
              <span className="font-medium text-gray-900  dark:text-white">
                {item.mentors}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
