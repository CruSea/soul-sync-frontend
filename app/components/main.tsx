import Search from "./search"
import Chat from "./chat"
import Profile from "./profile"

const Main = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex gap-5 p-5">
        <Search />
        <Chat />
        <div className="w-96 h-full flex flex-col gap-5">
          <Profile />
          <Profile />
        </div>
    </div>
  )
}

export default Main