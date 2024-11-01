import { useEffect, useState } from "react";
import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { initialReviewsStateData } from "../data/hooks/SubmittedPapersStateData";

const useGetReviews = () => {
  const [reviewsState, setReviewsState] =
    useState(initialReviewsStateData);
  useEffect(() => {
    const reviewsCollectionRef = collection(db, "reviewSubmissions");
    const unsubscribe = onSnapshot(reviewsCollectionRef, (querySnapshot) => {
      const reviewsDataWithIds: any = [];
      querySnapshot.forEach((doc) => {
        const reviews = doc.data();
        reviewsDataWithIds.push({ id: doc.id, ...reviews });
      });
      setReviewsState({
        reviews: reviewsDataWithIds,
        loading: false,
      });
    }, (error) => {
      console.error("Error fetching projects:", error);
      setReviewsState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    });

    return () => unsubscribe(); // Unsubscribe from snapshot listener on unmount
  }, []); // Empty dependency array ensures this runs only once on mount

  return reviewsState;
};

export default useGetReviews;
