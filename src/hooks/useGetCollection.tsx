import { useEffect, useState } from "react";
import { ProjectDataType } from "../types/dashboard/Admin/types";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ProjectDataTypeWithIds } from "../types/hooks/types";

const useGetCollection = (collectionName: string) => {
  const [collectionState, setCollectionState] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
        const collectionDataWithIds: ProjectDataTypeWithIds[] = [];
        querySnapshot.forEach((doc) => {
          const project: ProjectDataType = doc.data() as ProjectDataType;
          collectionDataWithIds.push({ id: doc.id, ...project });
        });

        setCollectionState({
          collection: collectionDataWithIds,
          loading: false,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
        setCollectionState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    getProjects();
  }, []); // Empty dependency array ensures this runs only once on mount

  return {collectionState, loading};
};

export default useGetCollection;
