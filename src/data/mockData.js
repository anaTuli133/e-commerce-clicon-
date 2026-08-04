import xboxImg from "../assets/hero/xbox-console.png";
import pixelImg from "../assets/hero/pixel-6-pro.jpg";
import flipbudsImg from "../assets/hero/flipbuds-pro.jpg";
import computerLaptopImg from "../assets/categories/computer-laptop.png";
import smartphoneImg from "../assets/categories/smartphone.png";
import headphonesImg from "../assets/categories/headphones.png";
import accessoriesImg from "../assets/categories/accessories.png";
import cameraPhotoImg from "../assets/categories/camera-photo.png";
import tvHomesImg from "../assets/categories/tv-homes.png";


import img0 from "../assets/products/Image.png";           // smartphone (teal/mint, A71 style)
import img1 from "../assets/products/Image (1).png";       // smartphone (blue)
import img2 from "../assets/products/Image (2).png";       // AC unit (white)
import img3 from "../assets/products/Image (3).png";       // headphones (black, over-ear)
import img4 from "../assets/products/Image (4).png";       // drone + controller
import img5 from "../assets/products/Image (5).png";       // smart TV
import img6 from "../assets/products/Image (6).png";       // monitor (gray/office)
import img7 from "../assets/products/Image (7).png";       // smartphone (dark, side-by-side)
import img8 from "../assets/products/Image (8).png";       // headphones (beats-style, red accent)
import img9 from "../assets/products/Image (9).png";       // headphones (black, over-ear)
import img10 from "../assets/products/Image (10).png";     // gaming keyboard + mouse (red)
import img11 from "../assets/products/Image (11).png";     // printer (black) — currently unused
import img12 from "../assets/products/Image (12).png";     // security camera (white) — currently unused
import img13 from "../assets/products/Image (13).png";     // webcam (black)
import img14 from "../assets/products/Image (14).png";     // printer (white) — currently unused
import img15 from "../assets/products/Image (15).png";     // washing machine (portable)
import img16 from "../assets/products/Image (16).png";     // monitor (landscape wallpaper)
import img17 from "../assets/products/Image (17).png";     // smartphone (blue, pair)
import img18 from "../assets/products/Image (18).png";     // AC unit (white)
import img19 from "../assets/products/Image (19).png";     // headphones (black, over-ear)
import img20 from "../assets/products/Image (20).png";     // smartphone (green, "Never Settle")
import img21 from "../assets/products/Image (21).png";     // macbook (dark screen)
import img22 from "../assets/products/Image (22).png";     // iphone (lavender pair)
import img23 from "../assets/products/Image (23).png";     // macbook (pink/purple gradient)

export const categories = [
  { id: "computer-laptop", name: "Computer & Laptop", image: computerLaptopImg },
  { id: "smartphone", name: "SmartPhone", image: smartphoneImg },
  { id: "headphone", name: "Headphones", image: headphonesImg },
  { id: "accessories", name: "Accessories", image: accessoriesImg },
  { id: "camera-photo", name: "Camera & Photo", image: cameraPhotoImg },
  { id: "tv-homes", name: "TV & Homes", image: tvHomesImg },
];

export const allCategoryTree = [
  { id: "electronics-devices", name: "Electronics Devices" },
  { id: "computer-laptop", name: "Computer & Laptop" },
  { id: "computer-accessories", name: "Computer Accessories" },
  { id: "smartphone", name: "SmartPhone" },
  { id: "headphone", name: "Headphone" },
  { id: "mobile-accessories", name: "Mobile Accessories" },
  { id: "gaming-console", name: "Gaming Console" },
  { id: "camera-photo", name: "Camera & Photo" },
  { id: "tv-homes", name: "TV & Homes Appliances" },
  { id: "watch-accessories", name: "Watchs & Accessories" },
  { id: "gps-navigation", name: "GPS & Navigation" },
  { id: "wearable-technology", name: "Wearable Technology" },
];

export const brands = [
  "Apple", "Microsoft", "Dell", "Symphony", "Sony", "Google", "Samsung",
  "HP", "Xiaomi", "Panasonic", "LG", "One Plus",
];

export const popularTags = [
  "Game", "iPhone", "TV", "Asus Laptops", "Macbook", "SSD", "Graphics Card",
  "Power Bank", "Smart TV", "Speaker", "Tablet", "Microwave", "Samsung",
];

export const products = [
  {
    id: "p1",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control",
    price: 70,
    oldPrice: null,
    rating: 5,
    reviews: 738,
    badge: "HOT",
    category: "headphone",
    brand: "Sony",
    image: img19,
    images: [img19, img9, img3, img8],
    stock: "In Stock",
    sku: "A264671",
    description:
      "True wireless earbuds with active noise cancellation, touch controls, and a 40-hour battery life with the charging case. IPX8 waterproof rating makes them ideal for workouts and running.",
  },
  {
    id: "p2",
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: 2300,
    oldPrice: null,
    rating: 5,
    reviews: 536,
    badge: null,
    category: "smartphone",
    brand: "Samsung",
    image: img17,
    images: [img17, img1, img7, img0],
    stock: "In Stock",
    sku: "A264672",
    description:
      "Factory unlocked Android smartphone with a 120Hz display, triple camera system, and all-day battery life. Compatible with all major US carriers.",
  },
  {
    id: "p3",
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)",
    price: 360,
    oldPrice: null,
    rating: 5,
    reviews: 423,
    badge: "BEST DEALS",
    category: "accessories",
    brand: "Google",
    image: img10,
    images: [img10, img13],
    stock: "In Stock",
    sku: "A264673",
    description:
      "Premium braided HDMI cable supporting 4K@60Hz, HDR, and 3D formats. Fully compatible with HDMI 2.0, 1.4, and earlier standards.",
  },
  {
    id: "p4",
    name: "Portable Washing Machine, 11lbs capacity Model 18NMF1AM",
    price: 80,
    oldPrice: null,
    rating: 4,
    reviews: 816,
    badge: null,
    category: "tv-homes",
    brand: "LG",
    image: img15,
    images: [img15, img2],
    stock: "In Stock",
    sku: "A264674",
    description:
      "Compact portable washing machine perfect for apartments, dorms, and RVs. 11lbs capacity with 8 wash programs and a built-in gravity drain.",
  },
  {
    id: "p5",
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 1500,
    oldPrice: null,
    rating: 5,
    reviews: 647,
    badge: null,
    category: "headphone",
    brand: "HP",
    image: img9,
    images: [img9, img8],
    stock: "In Stock",
    sku: "A264675",
    description:
      "Immersive 7.1 surround sound gaming headset with a noise-cancelling mic, memory foam ear cushions, and customizable RGB lighting.",
  },
  {
    id: "p6",
    name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Case",
    price: 1200,
    oldPrice: 1600,
    rating: 4,
    reviews: 877,
    badge: "25% OFF",
    category: "camera-photo",
    brand: "Panasonic",
    image: img4,
    images: [img4, img13],
    stock: "In Stock",
    sku: "A264676",
    description:
      "Lightweight aluminum tripod extending to 57 inches, with a quick-release plate, bubble level, and a padded carrying case included.",
  },
  {
    id: "p7",
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    oldPrice: null,
    rating: 5,
    reviews: 426,
    badge: null,
    category: "computer-laptop",
    brand: "Dell",
    image: img16,
    images: [img16, img6],
    stock: "In Stock",
    sku: "A264677",
    description:
      "27-inch QHD all-in-one desktop monitor with an integrated webcam, built-in speakers, and a tool-free stand adjustment.",
  },
  {
    id: "p8",
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 220,
    oldPrice: null,
    rating: 5,
    reviews: 583,
    badge: "SALE",
    category: "tv-homes",
    brand: "Samsung",
    image: img5,
    images: [img5, img18],
    stock: "In Stock",
    sku: "A264678",
    description:
      "55-inch 4K UHD smart TV with HDR10, built-in Chromecast, and access to all your favorite streaming apps out of the box.",
  },
  {
    id: "p9",
    name: "Samsung Electronics Samsung Galaxy S21 5G (Gaming Phone)",
    price: 2300,
    oldPrice: null,
    rating: 5,
    reviews: 742,
    badge: null,
    category: "smartphone",
    brand: "Samsung",
    image: img20,
    images: [img20],
    stock: "In Stock",
    sku: "A264679",
    description: "High refresh rate display and a snappy chipset make this a great pick for mobile gaming.",
  },
  {
    id: "p10",
    name: "4K UHD Smart TV with Chromecast Built-in",
    price: 220,
    oldPrice: null,
    rating: 3,
    reviews: 554,
    badge: null,
    category: "tv-homes",
    brand: "LG",
    image: img5,
    images: [img5],
    stock: "In Stock",
    sku: "A264680",
    description: "Vivid color and deep contrast in a slim bezel-less design.",
  },
  {
    id: "p11",
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 1500,
    oldPrice: null,
    rating: 5,
    reviews: 536,
    badge: null,
    category: "headphone",
    brand: "Microsoft",
    image: img3,
    images: [img3],
    stock: "In Stock",
    sku: "A264681",
    description: "Comfortable padded headband for extended gaming sessions.",
  },
  {
    id: "p12",
    name: "Portable Washing Machine, 11lbs capacity Model 18NMF1AM",
    price: 80,
    oldPrice: 124,
    rating: 5,
    reviews: 423,
    badge: null,
    category: "tv-homes",
    brand: "LG",
    image: img15,
    images: [img15],
    stock: "In Stock",
    sku: "A264682",
    description: "8 preset wash programs with a transparent lid for monitoring.",
  },
  {
    id: "p13",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    price: 70,
    oldPrice: 75,
    rating: 5,
    reviews: 738,
    badge: "BEST DEALS",
    category: "headphone",
    brand: "Sony",
    image: img19,
    images: [img19],
    stock: "In Stock",
    sku: "A264683",
    description: "Crisp highs and deep bass in a compact charging case.",
  },
  {
    id: "p14",
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    oldPrice: null,
    rating: 5,
    reviews: 798,
    badge: null,
    category: "computer-laptop",
    brand: "Dell",
    image: img6,
    images: [img6],
    stock: "In Stock",
    sku: "A264684",
    description: "Sleek all-in-one form factor that saves desk space.",
  },
  {
    id: "p15",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    price: 70,
    oldPrice: null,
    rating: 5,
    reviews: 900,
    badge: "HOT",
    category: "headphone",
    brand: "Sony",
    image: img8,
    images: [img8],
    stock: "In Stock",
    sku: "A264685",
    description: "Touch control earbuds with a compact charging case.",
  },
  {
    id: "macbook-pro",
    name: "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
    price: 1699,
    oldPrice: 1999,
    rating: 4.7,
    reviews: 21671,
    badge: null,
    category: "computer-laptop",
    brand: "Apple",
    image: img21,
    images: [img21, img23, img21, img23, img21],
    stock: "In Stock",
    sku: "A264871",
    company: "Electronics Devices",
    colors: ["#8b8b8b", "#e3e3e3"],
    sizes: ["14-inch Liquid Retina XDR display"],
    memoryOptions: ["8GB unified memory", "16GB unified memory"],
    storageOptions: ["256GB SSD Storage", "1TB SSD Storage"],
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. This notebook Pro is a beast that lets the exceptional performance of the M1 architecture shine to a whole new level for pro users.\n\nEven the most ambitious projects are easily handled up to 10 CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.",
    features: [
      "Free 1 Year Warranty",
      "Free Shipping & Fastest Delivery",
      "100% Money-back guarantee",
      "24/7 Customer support",
      "Secure payment method",
    ],
    shipping: [
      { label: "Courier", value: "2 - 4 days, free shipping" },
      { label: "Local Shipping", value: "up to one week, $19.00" },
      { label: "UPS Ground Shipping", value: "4-6 days, $29.00" },
      { label: "Unishop Global Export", value: "3-4 days, $39.00" },
    ],
  },
];

export const heroSlides = [
  {
    id: 1,
    eyebrow: "THE BEST PLACE TO PLAY",
    title: "Xbox Consoles",
    description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    price: 299,
    image: xboxImg,
    cta: "Shop Now",
  },
  {
    id: 2,
    eyebrow: "SUMMER SALES",
    title: "New Google Pixel 6 Pro",
    description: "The most advanced Pixel camera system ever, with 29% off this week only.",
    price: null,
    image: pixelImg,
    cta: "Shop Now",
  },
  {
    id: 3,
    eyebrow: "NEW ARRIVAL",
    title: "Xiaomi FlipBuds Pro",
    description: "Active noise-cancelling earbuds with crystal-clear call quality.",
    price: 299,
    image: flipbudsImg,
    cta: "Shop Now",
  },
];

export const orders = [
  {
    id: "ORD-10293",
    email: "demo@example.com",
    status: "In Transit",
    placedOn: "2026-07-28",
    items: [
      { productId: "p1", qty: 1, price: 70 },
      { productId: "p5", qty: 3, price: 1500 },
    ],
    subtotal: 320,
    shipping: 0,
    discount: 24,
    tax: 61.99,
    total: 357.99,
  },
];

export const demoUser = {
  id: "u1",
  name: "Shafayat Islam",
  email: "demo@example.com",
  password: "password123",
  // portrait/person type image tumar 24 ta pic e nai, tai ekta simple avatar generator use korlam
  avatar: "https://ui-avatars.com/api/?name=Shafayat+Islam&background=random&size=200",
};