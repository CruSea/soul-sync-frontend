import Chat from "@/components/shared/Chat";
import Profile from "@/components/shared/Profile";
import Search from "@/components/shared/Search";

const MentorView = () => {
  return (
    <>
      <Search />
      <Chat />
      <div className="w-96 h-full flex flex-col gap-5">
        <Profile type="user" />
      </div>
    </>
  )
}

export default MentorView