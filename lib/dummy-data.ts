export const dummyCategories = [
  {
    id: "cat-1",
    name: "Apparel",
    slug: "apparel",
    description: "High quality clothing and apparel.",
    image_url: "https://picsum.photos/seed/apparel/600/400",
    is_active: true,
  },
  {
    id: "cat-2",
    name: "Accessories",
    slug: "accessories",
    description: "Watches, wallets, and daily carry items.",
    image_url: "https://picsum.photos/seed/accessories/600/400",
    is_active: true,
  },
  {
    id: "cat-3",
    name: "Home Goods",
    slug: "home-goods",
    description: "Upgrade your living space.",
    image_url: "https://picsum.photos/seed/homegoods/600/400",
    is_active: true,
  },
];

export const dummyProducts = [
  {
    id: "prod-1",
    category_id: "cat-1",
    title: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    description: "A super soft, breathable cotton t-shirt perfect for everyday wear. Made from 100% organic materials.",
    price: 29.99,
    compare_at_price: 35.00,
    images: [
      "https://picsum.photos/seed/tshirt1/800/800",
      "https://picsum.photos/seed/tshirt2/800/800"
    ],
    inventory_count: 50,
    is_active: true,
    is_featured: true,
    categories: { name: "Apparel" }
  },
  {
    id: "prod-2",
    category_id: "cat-2",
    title: "Minimalist Leather Wallet",
    slug: "minimalist-leather-wallet",
    description: "Handcrafted genuine leather wallet featuring an ultra-slim design that fits up to 8 cards.",
    price: 45.00,
    compare_at_price: null,
    images: [
      "https://picsum.photos/seed/wallet1/800/800"
    ],
    inventory_count: 120,
    is_active: true,
    is_featured: true,
    categories: { name: "Accessories" }
  },
  {
    id: "prod-3",
    category_id: "cat-3",
    title: "Ceramic Coffee Mug",
    slug: "ceramic-coffee-mug",
    description: "Start your morning right with this 12oz artisan ceramic coffee mug. Microwave and dishwasher safe.",
    price: 18.50,
    compare_at_price: 22.00,
    images: [
      "https://picsum.photos/seed/mug1/800/800"
    ],
    inventory_count: 200,
    is_active: true,
    is_featured: true,
    categories: { name: "Home Goods" }
  },
  {
    id: "prod-4",
    category_id: "cat-1",
    title: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description: "A timeless outerwear piece that never goes out of style. Features durable stitching and brass buttons.",
    price: 89.99,
    compare_at_price: 110.00,
    images: [
      "https://picsum.photos/seed/denim1/800/800"
    ],
    inventory_count: 0, // Testing out of stock
    is_active: true,
    is_featured: true,
    categories: { name: "Apparel" }
  },
  {
    id: "prod-5",
    category_id: "cat-2",
    title: "Polarized Sunglasses",
    slug: "polarized-sunglasses",
    description: "Protect your eyes with these stylish UV400 polarized sunglasses. Includes a hard carrying case.",
    price: 55.00,
    compare_at_price: null,
    images: [
      "https://picsum.photos/seed/sunglasses/800/800"
    ],
    inventory_count: 35,
    is_active: true,
    is_featured: false,
    categories: { name: "Accessories" }
  },
];
