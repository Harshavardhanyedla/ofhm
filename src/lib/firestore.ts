import { db } from "./firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    DocumentData,
    QueryConstraint
} from "firebase/firestore";

type CollectionName =
    | "activities"
    | "donations"
    | "users"
    | "brandings"
    | "founders"
    | "impacts"
    | "ministries"
    | "posts"
    | "sermons"
    | "siteSettings";

export const getDocuments = async <T>(collectionName: CollectionName): Promise<(T & { _id: string })[]> => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
    } as T & { _id: string }));
};

export const getDocumentById = async <T>(collectionName: CollectionName, id: string): Promise<(T & { _id: string }) | null> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { _id: docSnap.id, ...docSnap.data() } as T & { _id: string };
    } else {
        return null;
    }
};

export const getDocumentByField = async <T>(collectionName: CollectionName, field: string, value: any): Promise<(T & { _id: string }) | null> => {
    const q = query(collection(db, collectionName), where(field, "==", value), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { _id: doc.id, ...doc.data() } as T & { _id: string };
    }
    return null;
};

export const createDocument = async <T>(collectionName: CollectionName, data: T): Promise<T & { _id: string }> => {
    const docRef = await addDoc(collection(db, collectionName), data as DocumentData);
    return { _id: docRef.id, ...data };
};

export const updateDocument = async <T>(collectionName: CollectionName, id: string, data: Partial<T>): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data as DocumentData);
};

export const deleteDocument = async (collectionName: CollectionName, id: string): Promise<void> => {
    await deleteDoc(doc(db, collectionName, id));
};
