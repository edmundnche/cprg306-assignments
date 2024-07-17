import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc } from "firebase/firestore";

export const getItems = async (userId) => {
    const items = [];
    const itemsCollection = collection(db, `users/${userId}/items`);
    const q = query(itemsCollection);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
};

export const addItem = async (userId, item) => {
    const itemsCollection = collection(db, `users/${userId}/items`);
    const docRef = await addDoc(itemsCollection, item);
    return docRef.id;
};

export const deleteItem = async (userId, itemId) => {
    const itemDoc = doc(db, `users/${userId}/items/${itemId}`);
    await deleteDoc(itemDoc);
};
