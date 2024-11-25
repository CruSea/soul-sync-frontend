import { GrowthChart } from "@/components/shared/dashboard/GrowthChart";
import { StatsCards } from "@/components/shared/dashboard/StatCard";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

const AdminView = () => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="flex flex-1">
        <div className="hidden md:block w-[300px] bg-gray-100 dark:bg-gray-800">
          <Sidebar />
        </div>
        <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white dark:bg-black p-16 rounded-lg">
              <StatsCards />
            </div>
            <div className="flex-1">
              <GrowthChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
