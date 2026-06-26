import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    role: "",
    companyType: "",
    timeline: "",
    skills: {}
  });

  return (
   <UserContext.Provider
  value={{
    userData,
    setUserData: (data) => {
      localStorage.setItem("userData", JSON.stringify(data));
      setUserData(data);
    }
  }}
>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}