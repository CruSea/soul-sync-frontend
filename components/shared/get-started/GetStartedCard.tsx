import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GetStartedMentorForm from './GetStartedMentorForm';
import { GetStartedProps } from '@/types/get-started';
import GetStartedAdminForm from './GetStartedAdminForm';

const GetStartedCard = ({ type }: GetStartedProps) => {
  return (
    <Card className="flex-1 flex items-center justify-center flex-col gap-6">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
          Get Started
        </CardTitle>
        <CardDescription className="text-slate-500 font-normal text-base">
          Fill Out your information and get started
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0 w-[450px]">
        {type === 'admin' ? <GetStartedAdminForm /> : <GetStartedMentorForm />}
      </CardContent>
    </Card>
  );
};

export default GetStartedCard;
