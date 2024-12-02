import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    
  const session = await getServerSession(authOptions);
  const userId = session?.user
  if (!userId) {
    return redirect('/sign-in');
  }

  return (
    <div className="p-6 space-y-4">
  DashBoard
    </div>
  );
}
