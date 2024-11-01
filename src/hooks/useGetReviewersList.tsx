import { useEffect, useState } from "react";
import { ProjectDataType } from "../types/dashboard/Admin/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useGetReviewersList = () => {
  const [projectState, setProjectState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviewerUsers"), (snapshot) => {
      let projectsDataWithIds= [];
      snapshot.forEach((doc) => {
        const project: ProjectDataType = doc.data() as ProjectDataType;
        projectsDataWithIds.push({ id: doc.id, ...project });
      });
      
      setProjectState(projectsDataWithIds);
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return {reviewersList: projectState, reviewerListLoading: loading};
};

export default useGetReviewersList;
