import { useEffect, useState } from "react";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface CollectionDataType {
  id: string;
  data: any;
}

const useGetPaperSubmissionsF = (collectionName: string) => {
  const [collectionState, setCollectionState] = useState<{
    collection: CollectionDataType[];
    loading: boolean;
  }>({
    collection: [],
    loading: true,
  });
  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
        const collectionDataWithIds: CollectionDataType[] = [];
        querySnapshot.forEach((doc) => {
          collectionDataWithIds.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setCollectionState({
          collection: collectionDataWithIds,
          loading: false,
        });
      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        setCollectionState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    getCollectionData();
  }, [collectionName]);

  return collectionState;
};

export default useGetPaperSubmissionsF;
