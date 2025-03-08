import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = { /* Your Firebase Config */ };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
