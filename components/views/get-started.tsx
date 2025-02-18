import { GetStartedProps } from '@/types/get-started';
import GetStartedCard from '../shared/get-started/main/GetStartedCard';
import GetStartedSidebar from '../shared/get-started/main/GetStartedSidebar';

const GetStartedView = ({ type }: GetStartedProps) => {
  return (
    <div className="w-screen h-screen flex">
      <GetStartedCard type={type} />
      <GetStartedSidebar />
    </div>
  );
};

export default GetStartedView;
