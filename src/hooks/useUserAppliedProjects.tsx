// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { useEffect, useState } from "react";
// import useAuthentication from "./useAuthentication"; // Import your authentication hook
// import { ProjectDataType } from "../types/dashboard/Admin/types";

// const useUserAppliedProjects = () => {
//   const [userAppliedProjects, setUserAppliedProjects] = useState<ProjectDataType[]>([]); // Replace any[] with your actual ProjectDataType
//   const [loading, setLoading] = useState(true); // Loading state

//   const authUser = useAuthentication(); // Assuming this hook retrieves the authenticated user's data

//   useEffect(() => {
//     const fetchUserAppliedProjects = async () => {
//       try {
//         setLoading(true); // Set loading to true when starting to fetch data

//         const authUid = authUser?.uid;
//         if (!authUid) {
//           setLoading(false);
//           return;
//         }

//         const authorUsersCollection = collection(db, "authorUsers");
//         const authorUsersSnapshot = await getDocs(authorUsersCollection);

//         if (!authorUsersSnapshot.empty) {
//           const userData = authorUsersSnapshot.docs.find((doc) => doc.data().authUid === authUid)?.data();
//           if (userData) {
//             const appliedProjectsIds = userData.appliedProjects || [];
//             const userAppliedProjectsData: any[] = [];

//             for (const projectId of appliedProjectsIds) {
//               const projectDocRef = doc(db, "projects", projectId);
//               const projectDocSnapshot = await getDoc(projectDocRef);

//               if (projectDocSnapshot.exists()) {
//                 const projectData = projectDocSnapshot.data();
//                 userAppliedProjectsData.push(projectData);
//               }
//             }

//             setUserAppliedProjects(userAppliedProjectsData);
//           }
//         }
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         setLoading(false); // Set loading to false in case of an error
//         console.error("Error fetching user's applied projects:", error);
//       }
//     };

//     fetchUserAppliedProjects();
//   }, [authUser]);

//   return { userAppliedProjects, loading }; // Return loading state along with userAppliedProjects
// };

// export default useUserAppliedProjects;

import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { ProjectDataType } from "../types/dashboard/Admin/types";

const useUserAppliedProjects = () => {
  const [userAppliedProjectsData, setUserAppliedProjectsData] = useState<
    { userAppliedProject: ProjectDataType; projectId: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const authUser = useAuthentication();

  useEffect(() => {
    const fetchUserAppliedProjects = async () => {
      try {
        setLoading(true);

        const authUid = authUser?.uid;
        if (!authUid) {
          setLoading(false);
          return;
        }

        const authorUserDocRef = doc(db, "authorUsers", authUid);
        const authorUserSnapshot = await getDoc(authorUserDocRef);

        if (authorUserSnapshot.exists()) {
          const userData = authorUserSnapshot.data();
          const appliedProjectsIds = userData?.appliedProjects || [];
          const userAppliedProjects: {
            userAppliedProject: ProjectDataType;
            projectId: string;
          }[] = [];

          for (const projectId of appliedProjectsIds) {
            const projectDocRef = doc(db, "projects", projectId);
            const projectDocSnapshot = await getDoc(projectDocRef);

            if (projectDocSnapshot.exists()) {
              const projectData = projectDocSnapshot.data() as ProjectDataType;
              const projectObj = {
                userAppliedProject: projectData,
                projectId: projectDocSnapshot.id,
              };
              userAppliedProjects.push(projectObj);
            }
          }

          setUserAppliedProjectsData(userAppliedProjects);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user's applied projects:", error);
      }
    };

    fetchUserAppliedProjects();
  }, [authUser]);

  return { userAppliedProjectsData, loading };
};

export default useUserAppliedProjects;
