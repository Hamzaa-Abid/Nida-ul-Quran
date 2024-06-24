import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children, value }) => {
  const [userState, setUserState] = useState(value);
  useEffect(() => {
    console.log(".....", value);
    setUserState(value);
  }, [value]);
  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
