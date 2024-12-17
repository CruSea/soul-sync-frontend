import MentorContainer from "@/components/shared/Mentor/mentor-container";
import { sortUsers } from "@/lib/utils";

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

  const sortedUsers = sortUsers(users);  // backend will send a sorted list in actual implementation

  return (
    <>
      <MentorContainer users={sortedUsers} />
    </>
  );
};

export default MentorView;
