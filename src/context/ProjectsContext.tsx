import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import useGetProjects from "../hooks/useGetProjects";
import { ProjectStateType } from "../types/hooks/types";
import { initialProjectStateData } from "../data/hooks/ProjectStateData";

import useAuthentication from "../hooks/useAuthentication";



import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ProjectsProviderProps {
  children: ReactNode;
}

// Create the context
export const ProjectsContext = createContext<ProjectStateType>(initialProjectStateData);

// Custom hook to use the ProjectsContext
export const useProjectsContext = (): ProjectStateType => {
  return useContext(ProjectsContext);
};

// Provider component
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {

  
  const authUser = useAuthentication();

  const { projects, loading } = useGetProjects();
  const [userDetails, setUserDetails] = useState({});
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if(!authUser){
      setUserType(null)
    }
  }, [authUser])


  return (
    <ProjectsContext.Provider value={{ projects, loading, userDetails, setUserDetails, userType, setUserType }}>
      {children}
    </ProjectsContext.Provider>
  );
};
