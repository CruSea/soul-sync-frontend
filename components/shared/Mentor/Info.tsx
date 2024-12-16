import { colors } from '@/data/mentor';
import { cn } from '@/lib/utils'
import { InfoProps } from '@/types/mentor';

const Info:React.FC<InfoProps> = ({title, value, color}) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2  items-center">
      <div className={cn("w-3 h-3  rounded-full", colors[color] || "bg-gray-400" )}></div>
      <div className="font-normal text-s text-slate-500 w-20">{`${title}:`}</div>
      </div>
      <div className="font-bold text-s text-">
        {value}
      </div>
    </div>
  )
}

export default Info;