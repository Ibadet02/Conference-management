import { useEffect, useState } from "react";
import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {
  PaperSubmissionDataTypeWithIds,
  SubmittedPapersStateType,
} from "../types/hooks/types";
import { initialsubmittedPapersStateData } from "../data/hooks/SubmittedPapersStateData";
import { PaperSubmissionDataType } from "../types/dashboard/Author/types";

const useGetSubmittedPapers = () => {
  const [submittedPapersState, setSubmittedPapersState] =
    useState<SubmittedPapersStateType>(initialsubmittedPapersStateData);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "paperSubmissions"), (snapshot) => {
      const submittedPapersDataWithIds: PaperSubmissionDataTypeWithIds[] = [];
      snapshot.forEach((doc) => {
        const submittedPaper: PaperSubmissionDataType = doc.data() as PaperSubmissionDataType;
        submittedPapersDataWithIds.push({ id: doc.id, ...submittedPaper });
      });

      setSubmittedPapersState({
        submittedPapers: submittedPapersDataWithIds,
        loading: false,
      });
    });

    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount
  return submittedPapersState;
};

export default useGetSubmittedPapers;
