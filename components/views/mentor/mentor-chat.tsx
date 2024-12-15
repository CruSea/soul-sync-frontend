import Chat from "@/components/shared/Mentor/Chat";
import Profile from "@/components/shared/Mentor/Profile";
import Search from "@/components/shared/Mentor/Search";

const MentorView = async () => {
  // Fetch users from the JSON Server
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users from JSON Server");
  }

  const users = await response.json();

  console.log("users list ", users)
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