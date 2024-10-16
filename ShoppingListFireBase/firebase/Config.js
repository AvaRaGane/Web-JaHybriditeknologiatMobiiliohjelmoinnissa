import {initializeApp} from 'firebase/app'
import { getFirestore, collection, addDoc, query, serverTimestamp, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "",
    authDomain: "shoppinglist-78eec.firebaseapp.com",
    projectId: "shoppinglist-78eec",
    storageBucket: "shoppinglist-78eec.appspot.com",
    messagingSenderId: "1091634936158",
    appId: "1:1091634936158:web:f71a55c09d3515e12eb7cf"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages'
export {
    firestore,
    collection,
    query,
    addDoc,
    onSnapshot,
    orderBy,
    MESSAGES,
    serverTimestamp,
    getAuth,
    signInWithEmailAndPassword,
    doc,
    deleteDoc
};