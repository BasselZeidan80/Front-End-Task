import React, { createContext, useContext, useEffect, useState } from "react";

const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  const [name, setName] = useState("");

  return (
    <UserProfileContext.Provider value={{ name, setName }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}
