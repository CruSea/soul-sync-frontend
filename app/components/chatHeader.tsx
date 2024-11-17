import Image from "next/image";

const ChatHeader = () => {
  return (
    <div className="h-[70px] w-full bg-neutral-200 rounded-t-lg shadow-custom-chat flex gap-2.5 items-center px-5">
    <Image
      src="/assets/chatProfile.png"
      alt="user image"
      layout="fixed"
      width={100}
      height={100}
      className="w-[52px] h-[52px] border-black rounded-full"
    />
    <div className="flex flex-col">
        <div className="font-bold text-2xl mb-[-5px]">Jennie Doe</div>
        <div className="font-bold text-xs text-neutral-500">JennieDoe@example.com</div>
    </div>
  </div>
  )
}

export default ChatHeader