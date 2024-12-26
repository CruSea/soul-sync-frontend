import MentorContainer from "@/components/shared/Mentor/mentor-container";
import { jsonServer } from "@/data/end-points";
import { sortUsers } from "@/lib/utils";

const MentorView = async () => {
  // Fetch users from the JSON Server
  const response = await fetch(`${jsonServer.baseUrl}/${jsonServer.users}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users from JSON Server");
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error("No users found");
  }

  
  return (
    <>
      <MentorContainer users={users} />
    </>
  );
};

export default MentorView;
