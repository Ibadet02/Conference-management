import useSendEmail from "../hooks/useSendEmail";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const useNotifyReviewer = async (userId, subject, message) => {
    const userDocRef = doc(db, `reviewerUsers`, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
        const email = userDocSnapshot.data().email; // Assuming the email is stored in a field called "email"
        useSendEmail(email, subject, message);
    }
};

export default useNotifyReviewer;
