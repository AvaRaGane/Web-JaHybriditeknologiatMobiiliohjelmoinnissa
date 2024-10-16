import {initializeApp} from 'firebase/app'
import { getFirestore, collection,addDoc, query, serverTimestamp, onSnapshot, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "",
    authDomain: "chat-5d560.firebaseapp.com",
    projectId: "chat-5d560",
    storageBucket: "chat-5d560.appspot.com",
    messagingSenderId: "771136514775",
    appId: "1:771136514775:web:7c58586f45cb55cf2fde92"
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
    signInWithEmailAndPassword
};