import { useEffect, useState } from "react";
import { AuthorUserDataType } from "../types/Form/registration/Author/types";
import useAuthentication from "./useAuthentication";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserDataProps } from "../types/hooks/types";

const useUserData = (): UserDataProps => {
  const [userData, setUserData] = useState<AuthorUserDataType>(
    {} as AuthorUserDataType
  );
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null); // State for userId

  const authUser = useAuthentication();

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const authUid = authUser?.uid;
        if (!authUid) {
          setUserDataLoading(false);
          return;
        }

        setUserId(authUid); // Set userId here
        const authorUserDocRef = doc(db, "authorUsers", authUid);
        const unsubscribe = onSnapshot(authorUserDocRef, (snapshot) => {
          if (snapshot.exists()) {
            const userDataFromSnapshot =
              snapshot.data() as AuthorUserDataType;
            setUserData(userDataFromSnapshot);
            if(userDataFromSnapshot?.email){
          setUserDataLoading(false);
            }
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        setUserDataLoading(false);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authUser]);

  return { userData, userDataLoading, userId }; // Include userId in the returned object
};

export default useUserData;
