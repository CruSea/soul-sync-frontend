import { Header } from "@/components/shared/layout/header";
import { Sidebar } from "@/components/shared/layout/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header title={title} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}