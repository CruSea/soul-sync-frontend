import BasicInfo from '@/components/shared/Mentor/Profile/basic-info';
import Specialization from '@/components/shared/Mentor/Profile/specialization';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getStartedForm } from '@/data/get-started-data';
import { LuClock } from 'react-icons/lu';

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
          <Specialization />
          <Card className="border-0">
            <CardHeader className="py-0 flex flex-row border-b pr-0 justify-between">
              <CardTitle className="font-bold text-2xl  p-3">
                Availability Time
              </CardTitle>
              <Button variant="outline" className="text-slate-950">
                Update Time
              </Button>
            </CardHeader>
            <CardContent className="py-6 space-y-4">
              <div className="flex justify-between w-[320px] items-center">
                <div className="font-semibold text-sm">Monday</div>
                <div className="text-zinc-500 text-sm font-semibold flex gap-1.5 items-center">
                  <LuClock stroke="#71717A" />
                  <div>08:00 AM</div>
                  <div> - </div>
                  <div>05:00 PM</div>
                </div>
              </div>
              <div className="flex justify-between w-[320px] items-center">
                <div className="font-semibold text-sm">Monday</div>
                <div className="text-zinc-500 text-sm font-semibold flex gap-1.5 items-center">
                  <LuClock stroke="#71717A" />
                  <div>08:00 AM</div>
                  <div> - </div>
                  <div>05:00 PM</div>
                </div>
              </div>
              <div className="flex justify-between w-[320px] items-center">
                <div className="font-semibold text-sm">Monday</div>
                <div className="text-zinc-500 text-sm font-semibold flex gap-1.5 items-center">
                  <LuClock stroke="#71717A" />
                  <div>08:00 AM</div>
                  <div> - </div>
                  <div>05:00 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ProfileView;
