import NavMenu from "./NavMenu";
import UserActions from "./UserActions";
import Dropdown from './Dropdown';

const Header = () => {
  return (
    <header className="w-full h-24 flex items-center border-b border-gray-200 px-7 ">
      <Dropdown />
      <NavMenu />
      <UserActions />
    </header>
  )
}

export default Header;