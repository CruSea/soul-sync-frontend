import Image from "next/image";
import Info from "./info"


const Profile = () => {
  return (
    <div className="h-1/2 w-full bg-white rounded-lg shadow-custom-profile p-5 flex flex-col  gap-5">
        <div className="font-bold text-xl">User Profile</div>
        <Image
            src="/assets/mainProfile.png"
            alt="user image"
            layout="fixed"
            width={100}
            height={100}
            className="w-[105px] h-[105px] mx-auto"
          />
          <div>
            <Info title="Full Name" value="Jennie Doe" color="green"/>
            <Info title="Age" value="24" color="green"/>
            <Info title="Gender" value="Female" color="green"/>
            <Info title="Location" value="Addis Ababa" color="yellow"/>
            <Info title="Email" value="JennieDoe@example.com" color="yellow"/>
            <Info title="Phone" value="+251972729423" color="blue"/>
            <Info title="Platform" value="Telegram Bot" color="blue"/>
          </div>
    </div>
  )
}

export default Profile