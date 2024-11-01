import { ProjectDataType } from "../types/dashboard/Admin/types";
import { addDoc, collection, getDocs, doc, updateDoc  } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import toast from 'react-hot-toast';

const useCreateProject = () => {
  const [loading, setLoading] = useState(false);

  const createProject = async (
    projectData: ProjectDataType,
    collectionName: string
  ) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, collectionName), {...projectData, createdOn: new Date});
      console.log("Document written with ID: ", docRef.id);
      toast.success("Conference created successfully");
      const projectWithDataId = { ...projectData, id: docRef.id, createdOn: new Date };

      const collectionRef = collection(db, "authorUsers");
      const authorDocs = await getDocs(collectionRef);
      
      authorDocs.forEach(async (thisDoc: any) => {
        const authDocRef = doc(db, "authorUsers", thisDoc.id);
        await updateDoc(authDocRef, {
          actualState: null,
          myStatus: null,
          blocked: null,
          blockingReason: null,
          paperUpdated: null,
          reviewResult: null
        });
      });

      console.log(projectData);
      console.log(projectWithDataId);
      setLoading(false);
      return projectWithDataId;
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
      toast.error("Error creating conference");
    }
  };
  return {createProject, loading};
};

export default useCreateProject;
