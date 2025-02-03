
import apiCall from "../middleware/api";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Url={
    'login': `${BASE_URL}/auth/google-local`
}

export const Login = async () => {
    const response= await apiCall({"url":Url.login});
      const data =  response
      return data;
    };