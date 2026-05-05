import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// import data
import { ordersData } from "./ordersData.js";

const firebaseConfig = {
  apiKey: "AIzaSyCzYg1Di5hS48SDnw2VtxPwtOPV6iMmDeg",
  authDomain: "foodapp-30765.firebaseapp.com",
  projectId: "foodapp-30765",
  storageBucket: "foodapp-30765.firebasestorage.app",
  messagingSenderId: "1060177711103",
  appId: "1:1060177711103:web:c82bea8b120b22d72461ca",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importOrders() {
  console.log(`📦 Importing ${ordersData.length} orders...`);

  for (const order of ordersData) {
    await setDoc(doc(db, "orders", order.id), {
      ...order,
      createdAt: order.createdAt, // string luôn cho chắc
    });

    console.log(`✅ Imported: ${order.id}`);
  }

  console.log("🎉 Done!");
}

importOrders();