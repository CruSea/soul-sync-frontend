
import {  endPoints } from "@/data/end-points";
import apiCall from "../middleware/api";
const Url={
    'adminAccount': `admin/account`,
    'adminMentors':`${endPoints.adminMentors}/`
}

export const checkAccount = async (params:string) => {
    const response= await apiCall({"url":`${Url.adminAccount}/${params}`});
      const data =  response
      return data;
    };

export const createOrganazation = async (id:string,body:{name:string,domain:string}) => {
    const response= await apiCall({"url":`${Url.adminAccount}/${id}`,"data":body,"method":'PATCH'});
        const data =  response
        return data;
        };

    export    const deleteMentor = async (id:string) => {
            const response= await apiCall({"url":`${Url.adminAccount}/mentor/${id}`,"method":'DELETE'});
                const data =  response
                return data;
                };

export const TableData=async(url:string)=>{
const response=await apiCall({url:url});
const data=response;
return data;
}

