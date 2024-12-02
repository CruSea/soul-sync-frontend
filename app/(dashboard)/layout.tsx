// import { Navbar } from './components/navbar';
// import { Sidebar } from './components/sidebar';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({ children }) => {


  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        {/* <Navbar /> */}
        header
      </div>
      <div className="fixed inset-y-0 z-50 flex-col hidden w-56 h-full md:flex">
        {/* <Sidebar /> */}
        sidebar
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
