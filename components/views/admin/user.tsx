import DashboardChart from "@/components/shared/dashboard/DashboardChart";
import DashboardCard from "@/components/shared/dashboard/DashoardCard";
import TablePagination from "@/components/shared/dashboard/TablePagination";
import UsersTable from "@/components/shared/dashboard/UsersTable";
import PieChart from "@/components/shared/dashboard/PieChart";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { LuPlus, LuMinus, LuUsers2, LuUser } from "react-icons/lu";

const AdminView = () => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="flex flex-1">
        <div className="hidden md:block w-[300px] bg-gray-100 dark:bg-gray-800">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
          <div className="flex flex-wrap lg:flex-nowrap gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 flex-1">
              <DashboardCard
                title="Total Users"
                count={3540}
                icon={<LuUsers2 size={48} />}
              />
              <DashboardCard
                title="Total Mentors"
                count={1150}
                icon={<LuUser size={48} />}
              />
              <DashboardCard
                title="Online Mentors"
                count={500}
                icon={<LuPlus size={48} />}
              />
              <DashboardCard
                title="Offline Mentors"
                count={93}
                icon={<LuMinus size={48} />}
              />
            </div>

            <div className="flex-1">
              <DashboardChart />
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-8">
            <div className="flex-1">
              <UsersTable title="Latest users" limit={5} />
              <TablePagination />
            </div>

            <div className="flex-1">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
