import BasicInfo from "@/components/shared/Mentor/Profile/basic-info";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LuCamera } from "react-icons/lu";

const ProfileView = () => {
  return (
    <Card className="m-6 p-6 bg-white w-full rounded-[8px]">
      <CardHeader>
        <CardTitle className="font-bold text-2xl border-b  p-3">
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex gap-6">
        <BasicInfo />
        <div className="flex-1">
          <Card></Card>
          <Card></Card>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ProfileView;
