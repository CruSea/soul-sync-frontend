import { Separator } from "@/components/ui/separator";
import { LuSun } from "react-icons/lu";
import CurrentTime from "./CurrentTime";

const NavMenu = () => {
  return (
    <nav className="hidden lg:flex ml-11 justify-between items-center">
      <div className="flex h-20 items-center space-x-8">
        <div className="font-bold text-[40px] leading-[60px] tracking-[8px] font-logo">
          TURUMBA
        </div>
        <Separator orientation="vertical" />
        <div className="font-bold text-3xl">Greetings user</div>
        <Separator orientation="vertical" />
        <div className="flex gap-4 items-center">
          <LuSun size={40} />
          <div className="text-xl tracking-[-0.02em]">
            <CurrentTime />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
