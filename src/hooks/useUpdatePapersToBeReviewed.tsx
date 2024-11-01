import { collection, doc, setDoc, query, where, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from 'react-hot-toast';

const useUpdatePapersToBeReviewed = () => {
  const updatePapersToBeReviewed = async (
    paperSubmissionData: any,
    collectionName: string,
    docId: string
  ) => {
    try {
        
      const reviewDocRef = doc(db, collectionName, docId);
      await setDoc(reviewDocRef, { ...paperSubmissionData, id: docId }, { merge: true });



      // const reviewedCollectionRef = collection(db, "reviewSubmissions");
      // const q = query(reviewedCollectionRef, where("paperId", "==", paperSubmissionData.paperId));
      // const querySnapshot = await getDocs(q);
      
      // querySnapshot.forEach(async (dc: any) => {
      //   const docRef = doc(db, "reviewSubmissions", dc.id);
      //   await updateDoc(docRef, {
      //     abstract: paperSubmissionData.abstract,
      //     authors: paperSubmissionData.authors,
      //     correspondingAuthor: paperSubmissionData.correspondingAuthor,
      //     fileId: paperSubmissionData.fileId,
      //     assignedReviewers: paperSubmissionData.assignedReviewers
      //   });
      // });
      


      // const finalCollectionRef = collection(db, "finalReviews");
      // const docRef = doc(finalCollectionRef, paperSubmissionData.paperId);
      
      // await updateDoc(docRef, {
      //   abstract: paperSubmissionData.abstract,
      //   authors: paperSubmissionData.authors,
      //   correspondingAuthor: paperSubmissionData.correspondingAuthor,
      //   fileId: paperSubmissionData.fileId,
      //   assignedReviewers: paperSubmissionData.assignedReviewers
      // });
      

      
      // const paperSubmissionsRef = collection(db, "paperSubmissions");
      // const paperDoc = doc(paperSubmissionsRef, paperSubmissionData.paperId);

      // await updateDoc(paperDoc, {
      //   paperUpdateRequest: false
      // })

      const reviewedCollectionRef = collection(db, "reviewSubmissions");
const q = query(reviewedCollectionRef, where("paperId", "==", paperSubmissionData.paperId));
const querySnapshot = await getDocs(q);

querySnapshot.forEach(async (dc: any) => {
    const docRef = doc(db, "reviewSubmissions", dc.id);
    if ((await getDoc(docRef)).exists()) {
        await updateDoc(docRef, {
            abstract: paperSubmissionData.abstract,
            authors: paperSubmissionData.authors,
            correspondingAuthor: paperSubmissionData.correspondingAuthor,
            fileId: paperSubmissionData.fileId,
            assignedReviewers: paperSubmissionData.assignedReviewers
        });
    } else {
        console.log("Document does not exist already:", dc.id);
    }
});

const finalCollectionRef = collection(db, "finalReviews");
const docRef = doc(finalCollectionRef, paperSubmissionData.paperId);

if ((await getDoc(docRef)).exists()) {
    await updateDoc(docRef, {
        abstract: paperSubmissionData.abstract,
        authors: paperSubmissionData.authors,
        correspondingAuthor: paperSubmissionData.correspondingAuthor,
        fileId: paperSubmissionData.fileId,
        assignedReviewers: paperSubmissionData.assignedReviewers
    });
} else {
    console.log("Document does not exist already:", paperSubmissionData.paperId);
}

const paperSubmissionsRef = collection(db, "paperSubmissions");
const paperDoc = doc(paperSubmissionsRef, paperSubmissionData.paperId);

if ((await getDoc(paperDoc)).exists()) {
    await updateDoc(paperDoc, {
        paperUpdateRequest: false,
        prevData: {}
    });
} else {
    console.log("Document does not exist already:", paperSubmissionData.paperId);
}


        // const unsubscribeSnapshot = onSnapshot(
        //   q,
        //   (querySnapshot) => {
        //     if (querySnapshot.size === 1) {
        //       querySnapshot.forEach((doc) => {
        //         const userDetails = doc.data();
        //         setUserDetails(userDetails);
        //         setDataFetched(true);
        //       });
        //     } else {
        //       console.log("User not found in Firestore");
        //       setDataFetched(true);
        //     }
        //   },
        //   (error) => {
        //     console.error("Error fetching user details: ", error);
        //     toast.error("Error fetching data. Please try again");
        //     setDataFetched(true);
        //   }
        // );

        // return () => {
        //   setLoading(false);
        //   unsubscribeSnapshot();
        // };
    //   const docRef = await addDoc(collection(db, collectionName), paperSubmissionData);
    //   console.log("Document written with ID: ", docRef.id);
      toast.success("Paper sent for review")
      const paperSubmissionWithDataId = { ...paperSubmissionData, id: docId };
      console.log(paperSubmissionWithDataId);
      return paperSubmissionWithDataId;
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error sending paper for review")
      throw error;
    }
  };

  return updatePapersToBeReviewed;
};

export default useUpdatePapersToBeReviewed;
