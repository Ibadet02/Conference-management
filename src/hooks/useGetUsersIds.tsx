import { useState, useEffect } from 'react';
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming 'db' is your Firebase instance

const useGetUsersIds = (collectionName: string): string[] => {
  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const usersCollectionRef = collection(db, collectionName);
        const querySnapshot: QuerySnapshot = await getDocs(usersCollectionRef);
        const ids: string[] = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        setUserIds(ids);
      } catch (error) {
        console.error('Error fetching user IDs:', error);
      }
    };

    fetchUserIds();
  }, [collectionName]);

  return userIds;
};

export default useGetUsersIds;
