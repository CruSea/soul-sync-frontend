import { GetStartedProps } from '@/types/get-started';
import GetStartedCard from '../shared/GetStarted/main/GetStartedCard';
import GetStartedSidebar from '../shared/GetStarted/main/GetStartedSidebar';

const GetStartedView = ({ type }: GetStartedProps) => {
  return (
    <div className="w-screen h-screen flex">
      <GetStartedCard type={type} />
      <GetStartedSidebar />
    </div>
  );
};

export default GetStartedView;
