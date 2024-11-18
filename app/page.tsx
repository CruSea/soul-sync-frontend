import Image from "next/image";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Main from "./components/main";

export default function Home() {
  return (
    <div className="flex font-title">
      <Sidebar />
      <div className="flex flex-col w-full max-h-screen">
      <Header />
      <Main />
      </div>
    </div>
  );
}
