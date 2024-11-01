import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  setDoc
} from "firebase/firestore";
import { PaperSubmissionDataType } from "../types/dashboard/Author/types";
import useAuthentication from "./useAuthentication";
import toast from 'react-hot-toast';
import useNotifyAdmin from "../notify/notifyAdmin";

interface PaperSubmissionHookProps {
  paperSubmissionData: PaperSubmissionDataType;
  projectId: string; // Assuming projectId is a string
  matchedItem: Object
}

const usePaperAbstractApproval = ({
  paperSubmissionData,
  projectId,
  matchedItem
}: PaperSubmissionHookProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUser = useAuthentication();
  const storage = getStorage(); // Initialize Firebase Storage
  
        // Update the "submittedPapers" field in the "authorUsers" collection

  const submitAbstract = async () => {
    setIsSubmitting(true);
    try {
      if (authUser && authUser.uid) {
        let fileId=matchedItem?.fileId;

        // Upload PDF file to Firebase storage if it exists
        if (paperSubmissionData.file?.name) {
          const storageRef = ref(
            storage,
            `user_papers/${authUser.uid}/${projectId}/${paperSubmissionData.file.name}`
          );
          await uploadBytes(storageRef, paperSubmissionData.file);
          fileId = storageRef.name;
        }

        // Get the document from the "paperSubmissions" collection where userId === authUser.uid


        const paperSubmissionsRef = collection(db, "paperSubmissions");
        const querySnapshot = await getDocs(
          query(
            paperSubmissionsRef,
            where("userId", "==", authUser.uid)
          )
        );

        let updated = false; // Initialize flag to track if any document was updated

        const authorUserRefId = doc(db, "authorUsers", authUser.uid);
        
querySnapshot.forEach(async (doc) => {
  if (doc.data().projectId === projectId) {



    console.log("FOUND")
    updated = true;
    
    await updateDoc(authorUserRefId, {
      myStatus: "abstract updated"
    });

    await updateDoc(doc.ref, {
      prevData: doc.data(),
    //   correspondingAuthor: paperSubmissionData.correspondingAuthor,
              authors: paperSubmissionData.authors,
              abstract: paperSubmissionData.abstract,
              abstractUpdated: true,
    //   ...paperSubmissionData,
      fileId: fileId ? fileId : "" || doc.data()?.fileId ? doc.data()?.fileId : "",
    }); // Set flag to true
  }
});

if (!updated) {
  const paperSubmissionRef = doc(paperSubmissionsRef); // Create a new document reference
  const thispaperId = paperSubmissionRef.id; // Use the document's ID as the paperId
  await setDoc(paperSubmissionRef, {
    paperId: thispaperId,
    ...paperSubmissionData,
    projectId: projectId,
    userId: authUser.uid,
  });
}



const authorUserRef = doc(db, "authorUsers", authUser.uid);
        // Get the current document
        const authorUserDoc = await getDoc(authorUserRef);

        // Get the current submittedPapers array
        const submittedPapers = authorUserDoc.data()?.submittedPapers || [];

        // Find the index of the object with matching projectId
        const index = submittedPapers.findIndex(
          (paper) => paper.projectId === projectId
        );

        // Create the new paper object
        const newPaper = {
            ...paperSubmissionData,
          projectId: projectId,
          fileId: fileId || "", // Add other fields as needed
          userId: authUser.uid,
        };

        if (index !== -1) {
          // If the object with matching projectId exists, update it
          submittedPapers[index] = newPaper;
        } else {
          // If the object with matching projectId doesn't exist, push the newPaper object
          submittedPapers.push(newPaper);
        }

        await updateDoc(authorUserRef, {
          submittedPapers: submittedPapers,
          actualState: 1
        });

        await useNotifyAdmin("Abstract Submitted", `${authorUserDoc.data()?.firstName} ${authorUserDoc.data()?.lastName} submitted abstract for approval`)

        toast.success("Submitted");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error("Error occurred");
      setIsSubmitting(false);
    }
  };

  return { submitAbstract, isAbstractSubmitting: isSubmitting, abstractError: error };
};

export default usePaperAbstractApproval;
