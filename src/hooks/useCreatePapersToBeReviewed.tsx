import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import toast from 'react-hot-toast';

const useCreatePapersToBeReviewed = () => {
  const createPapersToBeReviewed = async (
    paperSubmissionData: any,
    collectionName: string
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), paperSubmissionData);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Paper sent for review")
      const paperSubmissionWithDataId = { ...paperSubmissionData, id: docRef.id };
      console.log(paperSubmissionWithDataId);
      return paperSubmissionWithDataId;
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error sending paper for review")
      throw error;
    }
  };

  return createPapersToBeReviewed;
};

export default useCreatePapersToBeReviewed;
