import Search from "./Search"
import Chat from "./Chat"
import Profile from "./Profile"

const Main = () => {
  return (
    <div className="flex-1 flex p-5 gap-5 w-full overflow-hidden bg-gray-100">
      <Search />
      <Chat />
      <div className="w-96 h-full flex flex-col gap-5">
          <Profile />
        </div>
    </div>
  )
}

export default Main