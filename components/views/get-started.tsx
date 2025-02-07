import GetStartedCard from '@/components/shared/get-started/GetStartedCard';
import GetStartedSidebar from '@/components/shared/get-started/GetStartedSidebar';
import { GetStartedProps } from '@/types/get-started';

const GetStartedView = ({ type }: GetStartedProps) => {
  return (
    <div className="w-screen h-screen flex">
      <GetStartedCard type={type} />
      <GetStartedSidebar />
    </div>
  );
};

export default GetStartedView;
