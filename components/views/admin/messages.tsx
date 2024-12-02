import Chat from "@/components/shared/Chat";
import { GrowthChart } from "@/components/shared/GrowthChart";
import { AdminLayout } from "@/components/shared/layout/admin-layout";
import { MentorsChart } from "@/components/shared/MentorsChart";
import Profile from "@/components/shared/Profile";
import Search from "@/components/shared/Search";
import { StatsCards } from "@/components/shared/StatCard";
import UsersTable from "@/components/shared/UserTable";

export default function MessagesView() {
  return (
    <AdminLayout title="Messages">
      <div className="flex p-5 gap-5 w-full h-full overflow-hidden bg-gray-100">
        <Search />
        <Chat />
        <div className="w-96 h-full flex flex-col gap-5">
          <Profile />
        </div>
      </div>
    </AdminLayout>
  );
}
