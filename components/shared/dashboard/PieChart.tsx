"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: [
      "Marriage Counseling (650)",
      "Discipleship (270)",
      "Spiritual Life Counselors (230)",
    ],
    datasets: [
      {
        data: [650, 270, 230],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        hoverBackgroundColor: ["#45A049", "#FFB300", "#1E88E5"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card className="bg-secondary dark:bg-slate-800 p-4 pb-0">
      <CardContent>
        <h3 className="text-2xl font-semibold text-slate-600 dark:text-slate-200 mb-4">
          Total Mentors (1150)
        </h3>
        <div className="w-full flex justify-center mb-4">
          <div className="w-[300px] sm:w-[400px]">
            <Pie data={data} options={options} />
          </div>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center text-slate-600 dark:text-slate-200">
            <span
              className="w-4 h-4 inline-block rounded-full mr-2"
              style={{ backgroundColor: "#4CAF50" }}
            ></span>
            Marriage Counseling: <span className="ml-2 font-semibold">650</span>
          </li>
          <li className="flex items-center text-slate-600 dark:text-slate-200">
            <span
              className="w-4 h-4 inline-block rounded-full mr-2"
              style={{ backgroundColor: "#FFC107" }}
            ></span>
            Discipleship: <span className="ml-2 font-semibold">270</span>
          </li>
          <li className="flex items-center text-slate-600 dark:text-slate-200">
            <span
              className="w-4 h-4 inline-block rounded-full mr-2"
              style={{ backgroundColor: "#2196F3" }}
            ></span>
            Spiritual Life Counselors:{" "}
            <span className="ml-2 font-semibold">230</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default PieChart;
