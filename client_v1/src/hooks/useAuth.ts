
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/api";

const useAuth = () => {
  const navigate = useNavigate();

  // safely parse boolean from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem("is_authenticated");
    return stored ? JSON.parse(stored) : false;
  });

  // useEffect(() => {
  //   console.log(isAuthenticated, "====7");
  // }, [isAuthenticated]);

  const login = async(u: string, p: string) => {
    console.log(u, p, "----6");
    
      try{
      
      const resp = await loginApi(u,p)
      console.log(resp,'---25')
      setIsAuthenticated(true);
      localStorage.setItem("is_authenticated", "true");
      localStorage.setItem("user",JSON.stringify(resp?.user))
      navigate("/users");
      
     }catch(e){
        console.log(e,'===32')

      }
   

      // ✅ navigate to /users
   
    
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("is_authenticated");
    navigate("/"); // optional: back to home/login page
  };

  return { isAuthenticated, login, logout };
};

export { useAuth };
