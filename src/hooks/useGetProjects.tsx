import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ProjectDataType, ProjectDataTypeWithIds, ProjectStateType } from "../types/hooks/types";
import { initialProjectStateData } from "../data/hooks/ProjectStateData";

const useGetProjects = () => {
  const [projectState, setProjectState] = useState<ProjectStateType>(initialProjectStateData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsDataWithIds: ProjectDataTypeWithIds[] = [];
      snapshot.forEach((doc) => {
        const project: ProjectDataType = doc.data() as ProjectDataType;
        projectsDataWithIds.push({ id: doc.id, ...project });
      });
      
      setProjectState({ projects: projectsDataWithIds });
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { projects: projectState.projects, loading };
};

export default useGetProjects;
