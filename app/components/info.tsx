import { cn } from '../utils'

interface InfoProps {
  title: string;
  value: string;
  color: string
}

const Info:React.FC<InfoProps> = ({title, value, color}) => {

  const colors = {
    green: "#27A376",
    yellow: "#FFD023",
    blue: "#2F78EE"
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2  items-center">
      <div className={cn("w-3 h-3  rounded-full",  color == "green" ? "bg-[#27A376]" : color == "yellow" ? "bg-[#FFD023]" : "bg-[#2F78EE]")}></div>
      <div className="font-normal text-s text-slate-500 w-20">{title}</div>
      </div>
      <div className="font-bold text-s text-">
        {value}
      </div>
    </div>
  )
}

export default Info;