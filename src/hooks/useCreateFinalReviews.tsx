import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import toast from 'react-hot-toast';
import { doc, setDoc } from "firebase/firestore";

const useCreateFinalReviews = () => {

  const [iDLoading, setIDLoading] = useState("");

  const createFinalReviews = async (
    reviewData: any,
    collectionName: string,
    docId: string
  ) => {
    setIDLoading(reviewData?.projectId);
    try {
      // const docRef = await addDoc(collection(db, collectionName), reviewData);
      const reviewDocRef = doc(db, collectionName, docId);
      await setDoc(reviewDocRef, { ...reviewData, id: docId }, { merge: true });
      toast.success("Review Sent")

      const finalReviewsWithId = { ...reviewData, id: docId };
      console.log(finalReviewsWithId);
      setIDLoading("");
      return finalReviewsWithId;
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error sending review")
      setIDLoading("");
      throw error;
    }
  };

  return {createFinalReviews, iDLoading};
};

export default useCreateFinalReviews;