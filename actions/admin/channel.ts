 "use server"

import { channelJsonserver } from "@/data/end-points";
import apiCall from "../middleware/api";
import { URL } from "url";
import { Channel } from "@/types/channel";

const Url={
    'fetchedChannel': `${channelJsonserver.channels}`
}

 export const fetchedChannels = async () => {
    const response=  apiCall({"url":Url.fetchedChannel});
      const data = await response
      return data;
    };
    
export const handleAddChannel= async(body:Channel)=>{
    const response=  apiCall({"url":Url.fetchedChannel,method: 'POST',data:body});
      const data = await response
      return data;
}