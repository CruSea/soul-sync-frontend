import { Separator } from "@/components/ui/separator";

const NavMenu = () => {
  return (
    <nav className="hidden lg:flex ml-11 justify-between items-center">
      <div className="flex h-20 items-center space-x-8">
        <div className="font-bold text-[40px] leading-[60px] tracking-[8px] font-logo">
          TURUMBA
        </div>
        <Separator orientation="vertical" />
        <div className="font-bold text-3xl">Greetings mentor</div>
      </div>
    </nav>
  );
};

export default NavMenu;
