import Search from "./Search"

const Main = () => {
  return (
    <div className="flex p-5 gap-5 w-full h-full bg-gray-100">
      <Search />
      <div className="flex-1 h-full bg-white"></div>
      <div className="w-96 h-full bg-white"></div>
    </div>
  )
}

export default Main