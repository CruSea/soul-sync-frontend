import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users } from '@/data/users';
import { User } from '@/types/users';

interface UsersTableProps {
  limit?: number;
  title?: string;
}
const UsersTable = ({ limit, title }: UsersTableProps) => {
  const sortedUsers: User[] = [...users].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
  );

  const filteredUsers = limit ? sortedUsers.slice(0, limit) : sortedUsers;
  return (
    <div className="rounded-md border bg-white dark:bg-black p-5">
      <h3 className="text-2xl mb-4 font-semibold pl-4">
        {title ? title : 'Users'}
      </h3>
      <Table>
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
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user
                      .username!.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                {user.username}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                {user.phone}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {user.location}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {user.platform}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {user.date}
              </TableCell>
              {/* <TableCell>
                  <Link href={`/users/delete/${user.id}`}>
                    <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded text-xs">
                      <RiDeleteBin6Line />
                    </button>
                  </Link>
                </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
