import { useEffect, useState } from "react";
import { DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface DocumentData {
  [key: string]: any;
}

const useGetDoc = (collectionName: string, docId: string) => {
  const [docState, setDocState] = useState<{
    data: DocumentData | null;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const getDocument = async () => {
      try {
        const documentRef = doc(db, collectionName, docId);
        const documentSnapshot: DocumentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          setDocState({
            data: documentSnapshot.data() as DocumentData,
            loading: false,
          });
        } else {
          console.log("Document does not exist.");
          setDocState({ data: null, loading: false });
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setDocState({ data: null, loading: false });
      }
    };

    getDocument();

    return () => {};
  }, [collectionName, docId]);

  return [docState.data, docState.loading];
};

export default useGetDoc;
