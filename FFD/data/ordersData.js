export const ordersData = [
  {
    id: "ORD001",
    branchId: "B01",
    createdAt: new Date("2025-10-01T13:20:00"),
    status: "processing",
    paymentMethod: "cash",
    paymentStatus: "paid",
    receiverName: "Nguyễn Văn A",
    receiverPhone: "0900000001",
    orderAddress: "HCM",
    shippingFee: 0,

    items: [
      {
        id: "com-bo-vien-xot-ca-chua",
        name: "Cơm bò viên xốt cà chua",
        price: 59000,
        quantity: 1,
        lineTotal: 59000,
        image: "https://i.postimg.cc/SsMCLZqg/menu1.png",
        category: "Cơm",
      },
      {
        id: "gimbab-cuon-bo",
        name: "Gimbab cuộn bò",
        price: 35000,
        quantity: 2,
        lineTotal: 70000,
        image: "https://i.postimg.cc/xdL85qqh/menu7.png",
        category: "Gimbab",
      },
    ],

    subtotal: 129000,
    total: 129000,
  },

  {
    id: "ORD002",
    branchId: "B01",
    createdAt: new Date("2025-10-02T10:15:00"),
    status: "delivering",
    paymentMethod: "cash",
    paymentStatus: "paid",
    receiverName: "Trần Thị B",
    receiverPhone: "0900000002",
    orderAddress: "HCM",
    shippingFee: 0,

    items: [
      {
        id: "com-ga-nuong-sot-tieu-xanh",
        name: "Cơm gà nướng sốt tiêu xanh",
        price: 75000,
        quantity: 1,
        lineTotal: 75000,
        image: "https://i.postimg.cc/JnqnwgNq/menu9.png",
        category: "Cơm",
      },
      {
        id: "bun-bo-nam-bo",
        name: "Bún bò Nam Bộ",
        price: 83000,
        quantity: 1,
        lineTotal: 83000,
        image: "https://i.postimg.cc/j2SjRXcX/menu10.png",
        category: "Bún",
      },
    ],

    subtotal: 158000,
    total: 158000,
  },

  {
    id: "ORD003",
    branchId: "B01",
    createdAt: new Date("2025-10-03T18:45:00"),
    status: "completed",
    paymentMethod: "cash",
    paymentStatus: "paid",
    receiverName: "Lê Văn C",
    receiverPhone: "0900000003",
    orderAddress: "HCM",
    shippingFee: 0,

    items: [
      {
        id: "com-lut-ca-hoi-sot-teriyaki",
        name: "Cơm lứt cá hồi sốt Teriyaki",
        price: 155000,
        quantity: 1,
        lineTotal: 155000,
        image: "https://i.postimg.cc/htdt4h8t/menu18.png",
        category: "Cơm",
      },
    ],

    subtotal: 155000,
    total: 155000,
  },

  {
    id: "ORD004",
    branchId: "B01",
    createdAt: new Date("2025-10-04T12:30:00"),
    status: "delivered",
    paymentMethod: "cash",
    paymentStatus: "paid",
    receiverName: "Phạm Thị D",
    receiverPhone: "0900000004",
    orderAddress: "HCM",
    shippingFee: 0,

    items: [
      {
        id: "my-lut-heo-nuong-cot-let",
        name: "Mỳ lứt heo nướng cốt lết",
        price: 67000,
        quantity: 2,
        lineTotal: 134000,
        image: "https://i.postimg.cc/Bnrt22Zt/menu5.png",
        category: "Mỳ",
      },
      {
        id: "salad-luon-ga-nuong",
        name: "Salad lườn gà nướng",
        price: 109000,
        quantity: 1,
        lineTotal: 109000,
        image: "https://i.postimg.cc/L6hs7xnL/menu15.png",
        category: "Salad",
      },
    ],

    subtotal: 243000,
    total: 243000,
  },

  {
    id: "ORD005",
    branchId: "B01",
    createdAt: new Date("2025-10-05T09:00:00"),
    status: "completed",
    paymentMethod: "cash",
    paymentStatus: "paid",
    receiverName: "Hoàng Văn E",
    receiverPhone: "0900000005",
    orderAddress: "HCM",
    shippingFee: 0,

    items: [
      {
        id: "S01",
        name: "Mix Thanh Dinh Dưỡng Giòn Tan",
        price: 69000,
        quantity: 1,
        lineTotal: 69000,
        image: "https://i.postimg.cc/CBGzpnWP/menu25.jpg",
        category: "Healthy Snack",
      },
      {
        id: "D01",
        name: "Kombucha vị me 250ml",
        price: 47000,
        quantity: 2,
        lineTotal: 94000,
        image: "https://i.postimg.cc/tY9Mh0k5/menu21.jpg",
        category: "Healthy Drink",
      },
    ],

    subtotal: 163000,
    total: 163000,
  },
];