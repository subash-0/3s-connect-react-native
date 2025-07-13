import axios,{AxiosInstance} from "axios"
import { useAuth } from '@clerk/clerk-expo';


const API_BASE_URL = "https://3sconnect.vercel.app/api";


export const createAPIClient = (getToken: () => Promise<string | null>): AxiosInstance => {
  const api = axios.create({ baseURL: API_BASE_URL }); 

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
   
   
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", {
        url: error?.config?.url,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      return Promise.reject(error);
    }
  );

  return api;
};



export const useApiClient = () :AxiosInstance =>{
  const {getToken}  =useAuth();

  return createAPIClient(getToken);
}


export const userApi = {
  syncUser: ( api:AxiosInstance)=> api.post("/users/sync"),
  getCurrentUser :(api: AxiosInstance)=> api.get("/users/me"),
  updateProfile:(api:AxiosInstance, data:any)=> api.put("/users/profile",data)
}