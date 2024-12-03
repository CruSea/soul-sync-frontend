import NavMenu from "./NavMenu";
import UserActions from "./UserActions";
import Dropdown from "./Dropdown";

interface HeaderProps {
  page: string
}

const Header:React.FC<HeaderProps> = ({ page }) => {
  return (
    <header className="w-full h-24 flex items-center border-b border-gray-200 px-7 ">
      <Dropdown />
      <NavMenu page={page} />
      <UserActions />
    </header>
  );
};

export default Header;
