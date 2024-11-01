import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import toast from 'react-hot-toast';
import { ProjectsContext } from "../context/ProjectsContext";

import {
  sendEmailVerification,
} from "firebase/auth";

const userRoles=[
    "author",
    "reviewer",
    "admin"
]

const useGetUserAllType = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUserDetails, setUserType } = useContext(ProjectsContext);

  const getUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if(!userCredential.user.emailVerified){
        await sendEmailVerification(userCredential.user);
      toast.error(
        "Verification Email Resent. Please verify to login"
      );
      navigate("/")
      auth.signOut();
      return;
      }

      const userIdFromAuth = userCredential.user.uid;
      
      for (const userRole of userRoles) {
        const userDocRef = doc(db, `${userRole}Users`, userIdFromAuth);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          localStorage.setItem("userRole", userRole)
          
          setUserType(userRole)
          setUserDetails(userData);
          setLoading(false);
          navigate(`/${userRole}-dashboard`, { state: { userData } });
          return; // Exit loop once user is found
        }
      }
      
      console.log("User document not found.");
      toast.error("User document not found.");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
      setLoading(false);
    }
  };

  return {
    getUser,
    loading
  };
};

export default useGetUserAllType;
