import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
  const saved = localStorage.getItem("userData");
  return saved
    ? JSON.parse(saved)
    : {
        role: "",
        companyType: "",
        timeline: "",
        buildLevel: "",
        learnStyle: "",
        struggle: "",
        skills: {}
      };
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