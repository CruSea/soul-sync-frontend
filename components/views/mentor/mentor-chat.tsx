import Chat from "@/components/shared/Mentor/Chat";
import MentorContainer from "@/components/shared/Mentor/mentor-container";
import Profile from "@/components/shared/Mentor/Profile";
import Search from "@/components/shared/Mentor/users-list";

const MentorView = async () => {
  // Fetch users from the JSON Server
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users from JSON Server");
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error("No users found");
  }

  const currentUser = users[0];

  console.log("users list ", users);
  return (
    <>
      <MentorContainer users={users} />
    </>
  );
};

export default MentorView;
