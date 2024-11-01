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

const usePaperUpdate = ({
  paperSubmissionData,
  projectId,
  matchedItem
}: PaperSubmissionHookProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUser = useAuthentication();
  const storage = getStorage(); // Initialize Firebase Storage

  const submitPaper = async () => {
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

        // Find the document with matching projectId
        querySnapshot.forEach(async (doc) => {
          if (doc.data().projectId === projectId) {
            await updateDoc(doc.ref, {
              // Update the document fields with new data
              prevData: doc.data(),
              // correspondingAuthor: paperSubmissionData.correspondingAuthor,
              // authors: paperSubmissionData.authors,
              // abstract: paperSubmissionData.abstract,
              // paperUpdateRequest: true,
              fileId: fileId || doc.data().fileId, // Use existing fileId if no new file uploaded
              // Add other fields as needed
            });
          }
        });

        // Update the "submittedPapers" field in the "authorUsers" collection
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
          // correspondingAuthor: paperSubmissionData.correspondingAuthor,
          // authors: paperSubmissionData.authors,
          // abstract: paperSubmissionData.abstract,
          // projectId: projectId,
          // paperUpdateRequest: true,
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

        // Update the document with the updated submittedPapers array
        await updateDoc(authorUserRef, {
          submittedPapers: submittedPapers,
          actualState: 3
        });

        await useNotifyAdmin("Paper Submitted", `${authorUserDoc.data()?.firstName} ${authorUserDoc.data()?.lastName} submitted paper for review`)

        toast.success("Sent");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error("Error occurred");
      setIsSubmitting(false);
    }
  };

  return { submitPaper, isSubmitting, error };
};

export default usePaperUpdate;
