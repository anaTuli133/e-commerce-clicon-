

export const categories = [
  { id: "computer-laptop", name: "Computer & Laptop", icon: "laptop" },
  { id: "smartphone", name: "SmartPhone", icon: "smartphone" },
  { id: "headphone", name: "Headphones", icon: "headphones" },
  { id: "accessories", name: "Accessories", icon: "keyboard" },
  { id: "camera-photo", name: "Camera & Photo", icon: "camera" },
  { id: "tv-homes", name: "TV & Homes", icon: "tv" },
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

// এই hero ছবিগুলো backend/public/hero ফোল্ডারে রাখা আছে এবং server.js এর
// express.static("/hero", ...) route দিয়ে serve হয়। IMAGE_BASE_URL অবশ্যই
// .env এর PORT এর সাথে মিলতে হবে, নাহলে ছবি লোড হবে না।
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || "http://localhost:5000";
const heroImg = (filename) => `${IMAGE_BASE_URL}/hero/${filename}`;

export const heroSlides = [
  {
    id: 1,
    eyebrow: "THE BEST PLACE TO PLAY",
    title: "Xbox Consoles",
    description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    price: 299,
    image: heroImg("xbox-console.png"),
    cta: "Shop Now",
  },
  {
    id: 2,
    eyebrow: "SUMMER SALES",
    title: "New Google Pixel 6 Pro",
    description: "The most advanced Pixel camera system ever, with 29% off this week only.",
    price: null,
    image: heroImg("pixel-6-pro.jpg"),
    cta: "Shop Now",
  },
  {
    id: 3,
    eyebrow: "NEW ARRIVAL",
    title: "Xiaomi FlipBuds Pro",
    description: "Active noise-cancelling earbuds with crystal-clear call quality.",
    price: 299,
    image: heroImg("flipbuds-pro.jpg"),
    cta: "Shop Now",
  },
];
