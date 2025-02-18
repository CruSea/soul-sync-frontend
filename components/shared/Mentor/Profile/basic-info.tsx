import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LuCamera } from 'react-icons/lu';
import AccountImage from './account-img';

const BasicInfo = () => {
  return (
    <Card className="border-0 flex-1">
      <CardHeader className="py-0">
        <CardTitle className="font-bold text-2xl border-b p-3">
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-6 w-full flex gap-6 items-center">
            <AccountImage />
            <div className="space-y-4 flex-1">
              <div className="space-y-2 font-medium">
                <div>Name</div>
                <Input className="w-full border-[#E2E0F0]  max-w-[450px]"></Input>
              </div>
              <div className="space-y-2 font-medium">
                <div>Age</div>
                <Input className="w-full border-[#E2E0F0]  max-w-[450px]"></Input>
              </div>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="space-y-2 font-medium">
              <div>Email</div>
              <Input className="w-full border-[#E2E0F0]  max-w-[450px]"></Input>
            </div>
            <div className="space-y-2 font-medium">
              <div>Phone Number</div>
              <Input className="w-full border-[#E2E0F0]  max-w-[450px]"></Input>
            </div>
            <div className="space-y-2 font-medium">
              <div>Location</div>
              <Input className="w-full border-[#E2E0F0]  max-w-[450px]"></Input>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
