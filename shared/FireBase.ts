// ===============================
// 🔥 Firebase config cho toàn app
// ===============================
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDmRq-W1q0_nn6FfN3p6gFGbG--a6491uk",
  authDomain: "foodapp-b4633.firebaseapp.com",
  projectId: "foodapp-b4633",
  storageBucket: "foodapp-b4633.firebasestorage.app",
  messagingSenderId: "1011918172277",
  appId: "1:1011918172277:web:09408c39242b4fea2c083c",
  measurementId: "G-1K4Y2312W2"
};

// ✅ Khởi tạo app & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
