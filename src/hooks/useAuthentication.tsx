import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";

const useAuthentication = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  return authUser;
};

export default useAuthentication;
