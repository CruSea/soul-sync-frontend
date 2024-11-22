import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import users from "@/data/users";
import { Users } from "@/types/users";

interface UsersTableProps {
  limit?: number;
  title?: string;
}
const UsersTable = ({ limit, title }: UsersTableProps) => {
  const sortedUsers: Users[] = [...users].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredUsers = limit ? sortedUsers.slice(0, limit) : sortedUsers;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Users"}</h3>
      <Table>
        <TableCaption>A list of recent users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead className="hidden md:table-cell">Phone Number</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Location
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Platform
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Joined Date
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((users) => (
            <TableRow key={users.id}>
              <TableCell>{users.username}</TableCell>
              <TableCell className="hidden md:table-cell">
                {users.phone}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {users.location}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {users.platform}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {users.date}
              </TableCell>
              <TableCell>
                <Link href={`/users/delete/${users.id}`}>
                  <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded text-xs">
                    <RiDeleteBin6Line />
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
