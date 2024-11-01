// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const useCreateUser = (userData: object, userRole: RoleType) => {
//   const navigate = useNavigate();
//   const createUser = async (auth: any, email: string, password: string) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const authUid = userCredential.user.uid;

//       const usersCollectionRef = collection(db, `${userRole}Users`);
//       if (userRole === "author") {
//         await addDoc(usersCollectionRef, {
//           ...userData,
//           authUid,
//           appliedProjects: [],
//         });
//       } else {
//         await addDoc(usersCollectionRef, { ...userData, authUid });
//       }

//       navigate(`/${userRole}-dashboard`, { state: userData });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return {
//     createUser,
//   };
// };

// export default useCreateUser;

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {useContext, useState} from 'react';
import toast from 'react-hot-toast';
import { ProjectsContext } from "../context/ProjectsContext";


import {
  sendEmailVerification,
} from "firebase/auth";

const useCreateUser = (userData: object, userRole: RoleType) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {setUserDetails} = useContext(ProjectsContext);

  const createUser = async (auth: any, email: string, password: string) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const authUid = userCredential.user.uid;
      localStorage.setItem("userRole", userRole);
      const usersCollectionRef = doc(db, `${userRole}Users`, authUid);
      if (userRole === "author") {
        await setDoc(usersCollectionRef, {
          ...userData,
          appliedProjects: [],
          submittedPapers: [],
          paperResults: [],
          id: authUid,
        });
      } else if (userRole === "reviewer") {
        await setDoc(usersCollectionRef, {
          ...userData,
          reviewedProjects: [],
          submittedPapers: [],
          id: authUid,
        });
      }
      else if (userRole === "admin") {
        await setDoc(usersCollectionRef, {
          ...userData,
          id: authUid,
        });
      }
      if(userCredential.user.emailVerified){
      setUserDetails(userData);
      navigate(`/${userRole}-dashboard`, { state: userData });
    } else {
      await sendEmailVerification(userCredential.user);
      toast.success(
        "Verification Email Sent. Please verify to login"
      );
      navigate("/")
      auth.signOut();
    }
      setLoading(false)
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
      setLoading(false)
    }
  };

  return {
    createUser,
    loading
  };
};

export default useCreateUser;
