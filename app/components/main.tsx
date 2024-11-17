import Search from "./search"
import Chat from "./chat"
import Profile from "./profile"

const Main: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex gap-5 p-5 custom-outline">
        <Search />
        <Chat />
        <div className="w-[370px] h-full flex flex-col gap-5">
          <Profile />
          <Profile />
        </div>
    </div>
  )
}



export default Main