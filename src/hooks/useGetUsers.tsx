import { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import useGetUsersIds from './useGetUsersIds';

const useGetUsers = (collectionName: string): { users: DocumentData[]; loading: boolean } => {
  const userIds = useGetUsersIds(collectionName);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoading(true);
        const usersCollectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedUsers: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          if (userIds.includes(doc.id)) {
            fetchedUsers.push({ id: doc.id, ...doc.data() });
          }
        });

        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [collectionName, userIds]);

  return { users, loading };
};

export default useGetUsers;
