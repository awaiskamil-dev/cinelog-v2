import AuthContext from "./AuthContext";
import { useState, useEffect } from "react";
import API_URL from "../../config";

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: 'include'
        });
        
        if(res.ok){
          const data = await res.json();
          setUser(data.user); 
        }
      }catch(err){
        console.log(err);
      }finally{
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const value = {user, setUser, isLoading};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;