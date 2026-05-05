import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../data/FireBase";
import { useAuth } from "../../context/AuthContext";
import { Branch } from "../../types/branch";

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(true);
  const [branchData, setBranchData] = useState<Branch | null>(null);
  const [stats, setStats] = useState({
    newOrders: 0,
    delivering: 0,
    completed: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // 🔹 Load branch
  useEffect(() => {
    const fetchBranch = async () => {
      setLoading(true);

      if (!user?.branchId) return;

      const ref = doc(db, "branches", user.branchId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = { ...(snap.data() as Branch), id: snap.id };
        setBranchData(data);
        setIsOpen(data.isActive ?? true);
      }

      setLoading(false);
    };

    fetchBranch();
  }, [user?.branchId]);

  // 🔥 REALTIME ORDERS
  useEffect(() => {
    if (!branchData?.id) return;

    const q = query(
      collection(db, "orders"),
      where("branchId", "==", branchData.id)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      let newOrders = 0,
        delivering = 0,
        completed = 0,
        revenue = 0;

      snapshot.forEach((doc) => {
        const o = doc.data();

        if (o.status === "processing") newOrders++;
        else if (o.status === "delivering") delivering++;
        else if (o.status === "completed") {
          completed++;
          revenue += o.total || 0;
        }
      });

      setStats({ newOrders, delivering, completed, revenue });
    });

    return () => unsub();
  }, [branchData?.id]);

  const handleToggleOpen = async (value: boolean) => {
    setIsOpen(value);
    if (!branchData?.id) return;

    await updateDoc(doc(db, "branches", branchData.id), {
      isActive: value,
    });
  };

  const quickActions = [
    { icon: "fast-food-outline", label: "Thực đơn", screen: "MenuManage" },
    { icon: "receipt-outline", label: "Đơn hàng", screen: "OrderManage" },
    { icon: "bar-chart-outline", label: "Doanh thu", screen: "Revenue" },
    { icon: "notifications-outline", label: "Thông báo", screen: "Notify" },
  ];

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#33691E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{branchData?.name}</Text>
        <Text style={styles.sub}>{branchData?.address}</Text>

        <View style={styles.switchBox}>
          <Text style={{ color: "#fff" }}>
            {isOpen ? "🟢 Đang mở" : "🔴 Đóng"}
          </Text>
          <Switch value={isOpen} onValueChange={handleToggleOpen} />
        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* STATS */}
        <Text style={styles.section}>Tổng quan</Text>

        <View style={styles.row}>
          <StatBox label="Đơn mới" value={stats.newOrders} color="#FF9800" />
          <StatBox label="Đang giao" value={stats.delivering} color="#2196F3" />
        </View>

        <View style={styles.row}>
          <StatBox label="Hoàn tất" value={stats.completed} color="#4CAF50" />

          {/* 🔥 CLICK DOANH THU */}
          <StatBox
            label="Doanh thu"
            value={stats.revenue.toLocaleString("vi-VN") + " ₫"}
            color="#E91E63"
            onPress={() =>
              navigation.navigate("Revenue", {
                branchId: branchData?.id,
                branchName: branchData?.name,
              })
            }
          />
        </View>

        {/* QUICK ACTION */}
        <Text style={styles.section}>Quản lý</Text>

        <View style={styles.grid}>
          {quickActions.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.gridItem}
              onPress={() =>
                navigation.navigate(item.screen, {
                  branchId: branchData?.id,
                  branchName: branchData?.name,
                })
              }
            >
              <Ionicons name={item.icon as any} size={26} color="#33691E" />
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

// 🔹 StatBox
const StatBox = ({
  label,
  value,
  color,
  onPress,
}: any) => (
  <TouchableOpacity
    style={[styles.statBox, { borderLeftColor: color }]}
    onPress={onPress}
    disabled={!onPress}
  >
    <Text style={styles.statValue}>{value}</Text>
    <Text>{label}</Text>
  </TouchableOpacity>
);

// 🎨 STYLE
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  loadingBox: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    backgroundColor: "#33691E",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  sub: { color: "#ddd" },

  switchBox: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container: { padding: 16 },

  section: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },

  row: { flexDirection: "row", justifyContent: "space-between" },

  statBox: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    margin: 5,
    borderRadius: 10,
    borderLeftWidth: 5,
  },

  statValue: { fontSize: 18, fontWeight: "bold" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "47%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
});