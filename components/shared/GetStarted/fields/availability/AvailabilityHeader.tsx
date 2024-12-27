"use client";

import { LuPlus } from "react-icons/lu";
import {

  DialogTrigger,
} from "./TimeDialog";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { AvailabilityHeaderTypes } from "@/types/get-started";



export default function AvailabilityHeader({ isDaySelected }: AvailabilityHeaderTypes) {
  return (
    <div className="w-full">
      {!isDaySelected ? (
        <DialogTrigger className="w-full">
          <div className="w-4/5 h-14 text-base border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            <LuPlus className="w-12 h-auto" /> Add Date and Time
          </div>
        </DialogTrigger>
      ) : (
        <div className="flex justify-between items-center px-3">
          <div className="flex gap-2 items-center">
            <AiTwotoneCheckCircle size={20} />
            <div className="font-medium text-base">Date Added</div>
          </div>
          <DialogTrigger>
            <div className="ml-auto flex justify-end text-blue-600 text-base underline cursor-pointer">
              Edit
            </div>
          </DialogTrigger>
        </div>
      )}
    </div>
  );
}
