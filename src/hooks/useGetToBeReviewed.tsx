import { useEffect, useState } from "react";
import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { initialToBeReviewedStateData } from "../data/hooks/SubmittedPapersStateData";

const useGetToBeReviewed = () => {
  const [toBeReviewedState, setToBeReviewedState] =
    useState(initialToBeReviewedStateData);
  useEffect(() => {
    const toBeReviewedCollectionRef = collection(db, "toBeReviewed");
    const unsubscribe = onSnapshot(toBeReviewedCollectionRef, (querySnapshot) => {
      const toBeReviewedDataWithIds: any = [];
      querySnapshot.forEach((doc) => {
        const toBeReviewed = doc.data();
        toBeReviewedDataWithIds.push({ id: doc.id, ...toBeReviewed });
      });
      setToBeReviewedState({
        toBeReviewed: toBeReviewedDataWithIds,
        loading: false,
      });
    }, (error) => {
      console.error("Error fetching projects:", error);
      setToBeReviewedState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    });

    return () => unsubscribe(); // Unsubscribe from snapshot listener on unmount
  }, []); // Empty dependency array ensures this runs only once on mount

  return toBeReviewedState;
};

export default useGetToBeReviewed;
