import { Card, CardContent } from "@/components/ui/card";
import { ReactElement } from "react";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: ReactElement;
}

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-white dark:bg-slate-800 p-4 md:p-6 lg:p-8 flex flex-col items-center">
      <CardContent>
        <div className="flex gap-5 justify-center items-center text-slate-500 dark:text-slate-200">
          <span className="text-4xl md:text-5xl lg:text-6xl">{icon}</span>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl text-center mt-4 font-semibold text-slate-500 dark:text-slate-200">
          {count}
        </h3>

        <h5 className="text-lg md:text-xl lg:text-2xl text-center mt-2 text-slate-500 dark:text-slate-200">
          {title}
        </h5>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
