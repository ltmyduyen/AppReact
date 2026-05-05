import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { db } from "../../data/FireBase";

const screenWidth = Dimensions.get("window").width;

const filters = ["Ngày", "Tuần", "Tháng", "Năm"];

const RevenueScreen = () => {
    const route: any = useRoute();
    const { branchId, branchName } = route.params;

    const [orders, setOrders] = useState<any[]>([]);
    const [filter, setFilter] = useState("Ngày");

    useEffect(() => {
        const q = query(
            collection(db, "orders"),
            where("branchId", "==", branchId),
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(data);
        });

        return () => unsub();
    }, []);

    // ===== FILTER =====
    const filterOrders = () => {
        const now = new Date();

        return orders.filter((o) => {
            const date = o.createdAt?.toDate?.();
            if (!date) return false;

            if (filter === "Ngày")
                return date.toDateString() === now.toDateString();

            if (filter === "Tháng")
                return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                );

            if (filter === "Năm")
                return date.getFullYear() === now.getFullYear();

            if (filter === "Tuần") {
                const first = new Date(now);
                first.setDate(now.getDate() - now.getDay());
                return date >= first;
            }

            return true;
        });
    };

    const filtered = filterOrders();

    // ===== TOTAL =====
    const total = filtered.reduce(
        (sum, o) => sum + (o.total || 0),
        0
    );

    // ===== GROUP CHART DATA =====
    const groupChartData = () => {
        const map: any = {};

        filtered.forEach((o) => {
            const d = o.createdAt?.toDate?.();
            if (!d) return;

            let key = "";

            if (filter === "Ngày")
                key = `${d.getHours()}h`;

            else if (filter === "Tuần")
                key = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()];

            else if (filter === "Tháng")
                key = `${d.getDate()}`;

            else if (filter === "Năm")
                key = `T${d.getMonth() + 1}`;

            map[key] = (map[key] || 0) + (o.total || 0);
        });

        return map;
    };

    const chartRaw = groupChartData();

    const labels = Object.keys(chartRaw);
    const values = Object.values(chartRaw);

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Ionicons name="analytics" size={26} color="#33691E" />
                <Text style={styles.title}>
                </Text>
            </View>

            {/* FILTER */}
            <View style={styles.filterRow}>
                {filters.map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[
                            styles.filterBtn,
                            filter === f && styles.active,
                        ]}
                        onPress={() => setFilter(f)}
                    >
                        <Text
                            style={{
                                color: filter === f ? "#fff" : "#333",
                                fontWeight: "600",
                            }}
                        >
                            {f}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* TOTAL CARD */}
            <View style={styles.card}>
                <Text style={styles.cardLabel}>Tổng doanh thu</Text>
                <Text style={styles.cardValue}>
                    {total.toLocaleString("vi-VN")} ₫
                </Text>
            </View>

            {/* CHART */}
            {values.length > 0 && (
                <LineChart
                    data={{
                        labels,
                        datasets: [{ data: values }],
                    }}
                    width={screenWidth - 32}
                    height={230}
                    chartConfig={{
                        backgroundGradientFrom: "#33691E",
                        backgroundGradientTo: "#66BB6A",
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                            `rgba(255,255,255,${opacity})`,
                        labelColor: () => "#fff",
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: "#fff",
                        },
                    }}
                    bezier
                    style={styles.chart}
                />
            )}

            {/* LIST */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const date = item.createdAt?.toDate?.();

                    return (
                        <View style={styles.card}>
                            {/* LEFT */}
                            <View style={styles.left}>
                                <Text style={styles.orderId}>
                                    #{item.id.slice(0, 8).toUpperCase()}
                                </Text>

                                <Text style={styles.date}>
                                    📅 {date ? date.toLocaleDateString("vi-VN") : "Không rõ"}
                                </Text>
                            </View>

                            {/* RIGHT */}
                            <View style={styles.right}>
                                <Text style={styles.money}>
                                    {item.total?.toLocaleString("vi-VN")} ₫
                                </Text>

                                <Text style={styles.status}>Đã hoàn thành</Text>
                            </View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
};

export default RevenueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 8,
    },

    filterRow: {
        flexDirection: "row",
        marginBottom: 12,
    },

    filterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginRight: 8,
        elevation: 2,
    },

    active: {
        backgroundColor: "#33691E",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        elevation: 4,
    },

    cardLabel: {
        color: "#777",
    },

    cardValue: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#33691E",
    },

    chart: {
        borderRadius: 16,
        marginBottom: 16,
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 3,
    },

    orderId: {
        fontWeight: "600",
        fontSize: 15,
    },

    date: {
        color: "#888",
        fontSize: 12,
    },

    money: {
        fontWeight: "bold",
        color: "#2E7D32",
        fontSize: 16,
    },
});