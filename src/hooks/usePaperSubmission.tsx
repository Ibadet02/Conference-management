import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { PaperSubmissionDataType } from "../types/dashboard/Author/types";
import useAuthentication from "./useAuthentication";
import toast from 'react-hot-toast';

interface PaperSubmissionHookProps {
  paperSubmissionData: PaperSubmissionDataType;
  projectId: string; // Assuming projectId is a string
}

const usePaperSubmission = ({
  paperSubmissionData,
  projectId,
}: PaperSubmissionHookProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUser = useAuthentication();
  const storage = getStorage(); // Initialize Firebase Storage
  const submitPaper = async () => {
    setIsSubmitting(true);
    try {
      if (authUser && authUser.uid) {
        // Upload PDF file to Firebase storage
        const storageRef = ref(
          storage,
          `user_papers/${authUser.uid}/${projectId}/${paperSubmissionData.file?.name}`
        );
        await uploadBytes(storageRef, paperSubmissionData.file!);

        // Save other data to Firestore
        const paperSubmissionRef = doc(collection(db, "paperSubmissions"));
        const paperId = paperSubmissionRef.id; // Use the document's ID as the paperId
        await setDoc(paperSubmissionRef, {
          paperId: paperId, // Add paperId to the document
          correspondingAuthor: paperSubmissionData.correspondingAuthor,
          authors: paperSubmissionData.authors,
          abstract: paperSubmissionData.abstract,
          projectId: projectId, // Use the provided projectId
          fileId: storageRef.name, // Save file ID/reference
          userId: authUser.uid
        });

        const authorUserRef = doc(db, "authorUsers", authUser.uid); // Reference the specific document using userId
        await updateDoc(authorUserRef, {
          submittedPapers: arrayUnion({
            paperId: paperId, // Add unique paper ID
            correspondingAuthor: paperSubmissionData.correspondingAuthor,
            authors: paperSubmissionData.authors,
            abstract: paperSubmissionData.abstract,
            projectId: projectId,
            fileId: storageRef.name,
            userId: authUser.uid
            // Add other fields as needed
          }),
        });
        toast.success("Submitted")
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.success("Error occurred")
      setIsSubmitting(false);
    }
  };

  return { submitPaper, isSubmitting, error };
};

export default usePaperSubmission;
