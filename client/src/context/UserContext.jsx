import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const savedUser = localStorage.getItem("userData");

  const [userData, setUserData] = useState(
    savedUser
      ? JSON.parse(savedUser)
      : {
          role: "",
          companyType: "",
          timeline: "",
          skills: {}
        }
  );


  const updateUserData = (data) => {
    localStorage.setItem(
      "userData",
      JSON.stringify(data)
    );

    setUserData(data);
  };


  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: updateUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


export function useUser() {
  return useContext(UserContext);
}