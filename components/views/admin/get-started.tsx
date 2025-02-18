import GetStartedCard from "@/components/shared/get-started/main/GetStartedCard";
import GetStartedSidebar from "@/components/shared/get-started/main/GetStartedSidebar";
import { GetStartedProps } from "@/types/get-started";

const GetStartedView = ({ type }: GetStartedProps) => {
  return (
    <div className="w-screen h-screen flex">
      <GetStartedCard type={type} />
      <GetStartedSidebar />
    </div>
  );
};

export default GetStartedView;
