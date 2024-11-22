import Search from "./Search"
import Chat from "./Chat"

const Main = () => {
  return (
    <div className="flex-1 flex p-5 gap-5 w-full overflow-hidden bg-gray-100">
      <Search />
      <Chat />
      <div className="w-96 bg-white min-h-full"></div>
    </div>
  )
}

export default Main