
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useCreateDoc = () => {
  const createDoc = async (
    docData: any,
    collectionName: string
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), docData);
      console.log("Document written with ID: ", docRef.id);
      const docWithDataId = { ...docData, id: docRef.id };
      console.log(docData);
      console.log(docWithDataId);
      return docWithDataId;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return createDoc;
};

export default useCreateDoc;
