import GetStartedCard from '@/components/shared/get-started/get-started-card';
import GetStartedSidebar from '@/components/shared/get-started/get-started-sidebar';
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
