import Image from "next/image";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex font-title">
      <Sidebar />
      <Header />
    </div>
  );
}
