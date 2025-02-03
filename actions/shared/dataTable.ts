
import { channelJsonserver } from "@/data/end-points";
import apiCall from "../middleware/api";
import { Channel } from "@/types/channel";

 export const fetchedDataTable = async (url:string) => {
    const response=  apiCall({"url":url});
      const data = await response
      return data;
    };
    
export const fetchedUserTable= async(url:string)=>{
    const response=  apiCall({"url":url});
      const data = await response
      return data;
}