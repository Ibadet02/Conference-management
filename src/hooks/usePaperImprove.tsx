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
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { PaperSubmissionDataType } from "../types/dashboard/Author/types";
import useAuthentication from "./useAuthentication";
import toast from 'react-hot-toast';

interface PaperSubmissionHookProps {
  paperSubmissionData: PaperSubmissionDataType;
  projectId: string; // Assuming projectId is a string
  matchedItem: Object
}

const usePaperImprove = ({
  paperSubmissionData,
  projectId,
  matchedItem
}: PaperSubmissionHookProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUser = useAuthentication();
  const storage = getStorage(); // Initialize Firebase Storage

  const submitPaperImprove = async () => {
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
              prevData: doc.data(),
              fileId: fileId || doc.data().fileId, // Use existing fileId if no new file uploaded
            });
          }
        });


        const reviewSubmissionsRef = collection(db, "reviewSubmissions");
        const reviewSubmissionsquerySnapshot = await getDocs(
          query(
            reviewSubmissionsRef,
            where("projectId", "==", projectId)
          )
        );

        const reviewBackupsRef = collection(db, "reviewBackups");

        reviewSubmissionsquerySnapshot.forEach(async (thisDoc) => {
          if (thisDoc.data().projectId === projectId) {

    await setDoc(doc(reviewBackupsRef, thisDoc.data().paperId), thisDoc.data());
            await deleteDoc(thisDoc.ref);
          }
        });



        
        const toBeReviewedRef = collection(db, "toBeReviewed");
        const toBeReviewedSnapshot = await getDocs(
          query(
            toBeReviewedRef,
            where("userId", "==", authUser.uid)
          )
        );

        toBeReviewedSnapshot.forEach(async (doc) => {
          if (doc.data().projectId === projectId) {
            await updateDoc(doc.ref, {
              fileId: fileId || doc.data().fileId, 
              paperUpdated: true
            });
          }
        });

        const finalReviewsRef = collection(db, "finalReviews");
        const finalReviewsSnapshot = await getDocs(
          query(
            finalReviewsRef,
            where("userId", "==", authUser.uid)
          )
        );
        
        finalReviewsSnapshot.forEach(async (doc) => {
          if (doc.data().projectId === projectId) {
            await deleteDoc(doc.ref);
          }
        });
        


        const authorUserRef = doc(db, "authorUsers", authUser.uid);
        const authorUserDoc = await getDoc(authorUserRef);
        const submittedPapers = authorUserDoc.data()?.submittedPapers || [];
        const index = submittedPapers.findIndex(
          (paper) => paper.projectId === projectId
        );
        const newPaper = {
          fileId: fileId || "", 
          userId: authUser.uid,
        };
        if (index !== -1) {
          submittedPapers[index] = newPaper;
        } else {
          submittedPapers.push(newPaper);
        }
        await updateDoc(authorUserRef, {
          submittedPapers: submittedPapers,
          actualState: 4,
          paperUpdated: true,
          reviewResult: null
        });

        toast.success("Sent");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error("Error occurred");
      setIsSubmitting(false);
    }
  };

  return { submitPaperImprove, submittingImprove: isSubmitting, error };
};

export default usePaperImprove;
