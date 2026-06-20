import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [userData, setUserData] = useState({
    role: "",
    companyType: "",
    timeline: "",
    skills: {}
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}