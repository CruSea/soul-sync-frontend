import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Info from "./Info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  return (
    <Card className="h-[calc(50%-10px)] w-full bg-white rounded-lg shadow-sidebar flex flex-col justify-center gap-5">
       <CardHeader className="py-0">
        <CardTitle className="text-xl font-bold">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-5 py-0">
        {/* Profile Image */}
        <Avatar className="w-[120px] h-[120px] mx-auto">
          <AvatarImage
            src="/assets/avatars/man1.png"
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
            JD
          </AvatarFallback>
        </Avatar>

        {/* User Information */}
        <div>
          <Info title="Full Name" value="Jennie Doe" color="green"/>
          <Info title="Age" value="24" color="green"/>
          <Info title="Gender" value="Female" color="green"/>
          <Info title="Location" value="Addis Ababa" color="yellow"/>
          <Info title="Email" value="JennieDoe@example.com" color="yellow"/>
          <Info title="Phone" value="+251972729423" color="blue"/>
          <Info title="Platform" value="Telegram Bot" color="blue"/>
        </div>
      </CardContent>
      
    </Card>
  )
}

export default Profile