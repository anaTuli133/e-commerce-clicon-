import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import products from "./products.js";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);

  const destroy = process.argv.includes("--destroy");

  if (destroy) {
    await Product.deleteMany({});
    console.log("🗑️  All products deleted.");
  } else {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`🌱 Seeded ${products.length} products.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
