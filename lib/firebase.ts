// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const registerWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res;
};

const loginInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (err) {
    console.error("Google sign-in error:", err);
    throw err;
  }
};

const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

const resetPassword = async (email: string): Promise<boolean> => {
  await sendPasswordResetEmail(auth, email, {
    url: "http://localhost:3000/change-password",
    handleCodeInApp: true,
  });
  return true;
};

export {
  auth,
  googleProvider,
  registerWithEmailAndPassword,
  loginInWithEmailAndPassword,
  signInWithGoogle,
  logoutUser,
  resetPassword,
};

export const db = getFirestore(app);
