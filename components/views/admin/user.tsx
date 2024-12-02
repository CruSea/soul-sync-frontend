import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

const AdminView = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="hidden md:block h-[100vh] w-[300px]">
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminView;
