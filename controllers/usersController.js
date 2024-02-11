import { getFirestore, collection, getDocs} from "firebase/firestore";
import { db } from '../firebaseConfig.js';

export async function getUsers() {
    const usersCol = collection(db, 'users');
    const querySnapshot = await getDocs(usersCol);
    const usersData = querySnapshot.docs.map(doc => doc.data());
    console.log(usersData); // Log the fetched user data
    return usersData;
};
