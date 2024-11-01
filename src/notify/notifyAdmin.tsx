import useSendEmail from "../hooks/useSendEmail";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const useNotifyAdmin = async (subject, message) => {
    const userDocRef = collection(db, `adminUsers`);
    const userDocSnapshot = await getDocs(userDocRef);

    userDocSnapshot.forEach((doc) => {
        const email = doc.data().email; // Assuming the email is stored in a field called "email"
        useSendEmail(email, subject, message);
    });
};

export default useNotifyAdmin;
