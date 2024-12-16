import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Info from "./Info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileProps, ProfileTypes } from "@/types/mentor";
import { getFallBack } from "@/lib/utils";

const Profile: React.FC<ProfileProps> = ({ type, currentUser, userDetails }) => {

  return (
    <Card className="p-6  bg-white rounded-lg shadow-sidebar flex flex-col justify-center gap-5">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-0 w-min">
        {/* Profile Image */}
        <Avatar className="w-[120px] h-[120px] mx-auto">
          <AvatarImage
            src={userDetails?.imageUrl}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
            {getFallBack(userDetails?.fullName || "John Doe")}
          </AvatarFallback>
        </Avatar>

        {/* User Information */}
        <div>
          <Info title="Full Name" value={userDetails?.fullName} color="green" />
          <Info title="Age" value={userDetails?.age} color="green" />
          <Info title="Gender" value={userDetails?.gender} color="green" />
          <Info title="Location" value={userDetails?.location} color="yellow" />
          <Info title="Email" value={userDetails?.email} color="yellow" />
          <Info title="Phone" value={userDetails?.phoneNumber} color="blue" />
          <Info title="Platform" value={userDetails?.platform} color="blue" />

        </div>
      </CardContent>

    </Card>
  )
}

export default Profile