import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiUsers, FiActivity } from "react-icons/fi";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: "users" | "activity";
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card className="bg-white dark:bg-black dark:text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon === "users" ? (
          <FiUsers className="h-4 w-4 text-gray-400" />
        ) : (
          <FiActivity className="h-4 w-4 text-gray-400" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{change}</p>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <StatsCard
        title="Total Users"
        value="2,350"
        change="+180 from last month"
        icon="users"
      />
      <StatsCard
        title="Total Mentors"
        value="2,350"
        change="+180 from last month"
        icon="users"
      />
      <StatsCard
        title="Active Users"
        value="120"
        change="+12 since last hour"
        icon="activity"
      />
      <StatsCard
        title="Active Mentors"
        value="30"
        change="+3 since last hour"
        icon="activity"
      />
    </div>
  );
}
