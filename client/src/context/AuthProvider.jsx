import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const value = {user, setUser};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;