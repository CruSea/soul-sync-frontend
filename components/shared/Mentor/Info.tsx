import { InfoProps } from '@/types/mentor';
import React from 'react';

export const colors = {
  green: 'bg-emerald-600',
  yellow: 'bg-yellow-400',
  blue: 'bg-blue-500',
};

const Info: React.FC<InfoProps> = ({ title, value, color }) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2  items-center">
        <div className={`w-3 h-3  rounded-full  ${colors[color]}`}></div>
        <div className="font-normal text-s text-slate-500 w-20">{`${title}:`}</div>
      </div>
      <div className="font-bold text-s text-">{value}</div>
      <div className="font-bold text-s text-">{value}</div>
    </div>
  );
};

export default Info;
