import GetStartedCard from "@/components/shared/GetStarted/GetStartedCard"
import GetStartedSidebar from "@/components/shared/GetStarted/GetStartedSidebar"

const GetStartedView = () => {
  return (
    <div className="w-screen h-screen flex">
      <GetStartedCard />
      <GetStartedSidebar />
    </div>
  )
}

export default GetStartedView