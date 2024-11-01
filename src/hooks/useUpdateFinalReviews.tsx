import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import toast from 'react-hot-toast';

const useUpdateFinalReviews = () => {

  const [updating, setUpdating] = useState("");

  const updateFinalReview = async (
    reviewData: any,
    collectionName: string,
    docId: string
  ) => {
    setUpdating(reviewData?.projectId);
    try {
      // Update the previous document with the received docId
      const reviewDocRef = doc(db, collectionName, docId);
      await setDoc(reviewDocRef, { ...reviewData, id: docId }, { merge: true });
      console.log("Previous document updated with ID: ", docId);
      toast.success("Previous document updated");

      setUpdating("");
      return { ...reviewData, id: docId };
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error sending review");
      setUpdating("");
      throw error;
    }
  };

  return { updateFinalReview, updating };
};

export default useUpdateFinalReviews;
