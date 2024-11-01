import { useState } from "react";
import { db } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import useAuthentication from "./useAuthentication";

const useUpdateProject = () => {
  const [isUpdating, setIsUpdating] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const authUser = useAuthentication();

  const updateProject = async (projectId: string) => {
    setIsUpdating(projectId);
    try {
      if (authUser && authUser.uid) {
        const projectRef = doc(db, "projects", projectId);
        const authorUserDocRef = doc(db, "authorUsers", authUser.uid);
        // Check if the user has already applied before updating
        const projectSnapshot = await getDoc(projectRef);
        const authorUserSnapshot = await getDoc(authorUserDocRef);
        if (projectSnapshot.exists() && authorUserSnapshot.exists()) {
          const appliedStudents = projectSnapshot.data().appliedStudents || [];
          const hasUserApplied = appliedStudents.find((studentId: string) => {
            return studentId === authUser.uid;
          });

          if (!hasUserApplied) {
            // If the user has not applied, update the 'appliedStudents' array in projects
            const authorUserData = authorUserSnapshot.data();
            setHasApplied(true);

            const userDataToUpdate = {
              appliedProjects: [
                ...(authorUserData.appliedProjects || []),
                projectId,
              ],
            };

            await updateDoc(authorUserDocRef, userDataToUpdate);

            // Get the updated userData

            // Fetch the project reference again to update appliedStudents
            const updatedProjectSnapshot = await getDoc(projectRef);
            const updatedAppliedStudents =
              updatedProjectSnapshot.data()?.appliedStudents || [];

            // Add the updated userData to appliedStudents in the project
            await updateDoc(projectRef, {
              appliedStudents: [...updatedAppliedStudents, authUser.uid],
            });
          } else {
            setHasApplied(true); // User has already applied, set hasApplied to true
          }
        }
      }
      setIsUpdating("");
    } catch (error) {
      console.error("Error updating project:", error);
      setIsUpdating("");
      setHasApplied(false);
    }
  };

  return { updateProject, isUpdating, hasApplied };
};

export default useUpdateProject;
