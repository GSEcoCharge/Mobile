import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAl8PSf45PYvGjuRMxOau18cWNmq998Q10",
  authDomain: "eco-charge-gs.firebaseapp.com",
  projectId: "eco-charge-gs",
  storageBucket: "eco-charge-gs.firebasestorage.app",
  messagingSenderId: "547734588781",
  appId: "1:547734588781:android:914493ce95f992c3c25e64",
};


export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);