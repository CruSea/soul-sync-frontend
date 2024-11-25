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
      </div>
    </div>
  );
};

export default AdminView;
