import Image from "next/image";
import Sidebar from './components/sidebar';

export default function Home() {
  return (
    <div className="flex font-title">
      <Sidebar />
    </div>
  );
}
