import Chat from "@/components/shared/Mentor/Chat";
import Profile from "@/components/shared/Mentor/Profile";
import Search from "@/components/shared/Mentor/Search";

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