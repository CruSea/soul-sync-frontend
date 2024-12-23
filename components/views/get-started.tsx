import GetStartedCard from "@/components/shared/GetStarted/GetStartedCard"
import GetStartedSidebar from "@/components/shared/GetStarted/GetStartedSidebar"
import { GetStartedProps } from "@/types/get-started"



const GetStartedView = ({ type }: GetStartedProps) => {
  return (
    <div className="w-screen h-screen flex">
      <GetStartedCard type={type} />
      <GetStartedSidebar />
    </div>
  )
}

export default GetStartedView