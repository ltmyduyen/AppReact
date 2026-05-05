// importData.js – dùng client SDK, chỉ import foods.json

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Cấu hình giống hệt FireBase.ts trong app
const firebaseConfig = {
  apiKey: "AIzaSyDmRq-W1q0_nn6FfN3p6gFGbG--a6491uk",
  authDomain: "foodapp-b4633.firebaseapp.com",
  projectId: "foodapp-b4633",
  storageBucket: "foodapp-b4633.firebasestorage.app",
  messagingSenderId: "1011918172277",
  appId: "1:1011918172277:web:09408c39242b4fea2c083c",
  measurementId: "G-1K4Y2312W2",
};

// 🔥 Khởi tạo app + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importFoods() {
  const foodsPath = path.resolve(__dirname, "foods.json");

  if (!fs.existsSync(foodsPath)) {
    console.error("❌ Không tìm thấy file foods.json cùng thư mục importData.js");
    return;
  }

  const foods = JSON.parse(fs.readFileSync(foodsPath, "utf8"));
  console.log(`📦 Import ${foods.length} document vào collection "foods"...`);

  // import lần lượt cho chắc (ít dữ liệu thì ok)
  for (const item of foods) {
    // nếu trong JSON có trường id thì dùng làm id, không có thì để auto-id
    const ref = item.id
      ? doc(collection(db, "foods"), String(item.id))
      : doc(collection(db, "foods"));

    await setDoc(ref, item, { merge: true });
  }

  console.log("✅ Import foods thành công!");
}

importFoods().catch((err) => {
  console.error("❌ Lỗi khi import:", err);
});
