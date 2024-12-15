import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Info from "./Info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileProps {
  type: string
}

interface ProfileTypes {
  title: string,
  fullName: string,
  gender: string,
  location: string,
  email: string,
  phone: string,
  platform: string | undefined,
  Expertise: string | undefined,
  src: string,
  abrivation: string,
  age: string
}

const Profile: React.FC<ProfileProps> = ({ type }) => {

  const profiles: { [key: string]: ProfileTypes } = {
    user: {
      title: "User",
      fullName: "Chandler Bing",
      gender: "Male",
      location: "Addis Ababa",
      email: "JennieDoe@example.com",
      phone: "+251972729423",
      platform: "Telegram Bot",
      Expertise: undefined,
      src: "man1",
      abrivation: "CB",
      age: "24"
    },
    mentor: {
      title: "Mentor",
      fullName: "Chandler Bing",
      gender: "Male",
      location: "Addis Ababa",
      email: "JennieDoe@example.com",
      phone: "+251972729423",
      platform: undefined,
      Expertise: "Development",
      src: "man1",
      abrivation: "JD",
      age: "25"
    },
    agent: {
      title: "Agent",
      fullName: "Jennie Doe",
      gender: "Female",
      location: "Addis Ababa",
      email: "JennieDoe@example.com",
      phone: "+251972729423",
      platform: undefined,
      Expertise: undefined,
      src: "woman2",
      abrivation: "JD",
      age: "26"
    },
  };

  return (
    <Card className="h-[calc(50%-10px)] w-full bg-white rounded-lg shadow-sidebar flex flex-col justify-center gap-5">
      <CardHeader className="py-0">
        <CardTitle className="text-xl font-bold">{profiles[type].title} Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-5 py-0">
        {/* Profile Image */}
        <Avatar className="w-[120px] h-[120px] mx-auto">
          <AvatarImage
            src={`/assets/avatars/${profiles[type].src}.png`}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
            {profiles[type].abrivation}
          </AvatarFallback>
        </Avatar>

        {/* User Information */}
        <div>
          <Info title="Full Name" value={profiles[type].fullName} color="green" />
          <Info title="Age" value={profiles[type].age} color="green" />
          <Info title="Gender" value={profiles[type].gender} color="green" />
          <Info title="Location" value={profiles[type].location} color="yellow" />
          <Info title="Email" value={profiles[type].email} color="yellow" />
          <Info title="Phone" value={profiles[type].phone} color="blue" />
          {profiles[type].platform && <Info title="Platform" value={profiles[type].platform} color="blue" />}
          {profiles[type].Expertise && <Info title="Expertise" value={profiles[type].Expertise} color="blue" />}
        </div>
      </CardContent>

    </Card>
  )
}

export default Profile