import Product from "../models/Product.js";

function withId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { id: _id, ...rest };
}


function toValidNumber(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function getProducts(req, res, next) {
  try {
    const { category, brand, minPrice, maxPrice, search, sort, tag } = req.query;

    const min = toValidNumber(minPrice);
    const max = toValidNumber(maxPrice);

    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (min !== undefined || max !== undefined) {
      filter.price = {};
      if (min !== undefined) filter.price.$gte = min;
      if (max !== undefined) filter.price.$lte = max;
    }
    if (search) filter.name = { $regex: search, $options: "i" };
    if (tag) filter.name = { $regex: tag, $options: "i" };

    let query = Product.find(filter);

    if (sort === "price-asc") query = query.sort({ price: 1 });
    else if (sort === "price-desc") query = query.sort({ price: -1 });
    else if (sort === "rating") query = query.sort({ rating: -1 });

    const docs = await query.lean();
    const items = docs.map(withId);
    res.json({ items, total: items.length });
  } catch (err) {
    next(err);
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(withId(product));
  } catch (err) {
    next(err);
  }
}

// POST /api/products  

export async function createProduct(req, res, next) {
  try {
    const body = { ...req.body };
    if (!body.id && !body._id) {
      const base = (body.name || "product")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      body._id = `${base}-${Date.now().toString(36)}`;
    } else if (body.id) {
      body._id = body.id;
      delete body.id;
    }

    const existing = await Product.findById(body._id);
    if (existing) {
      return res.status(409).json({ message: `Product with id "${body._id}" already exists` });
    }

    const product = await Product.create(body);
    res.status(201).json(withId(product.toObject()));
  } catch (err) {
    next(err);
  }
}

// PUT /api/products/:id

export async function updateProduct(req, res, next) {
  try {
    const body = { ...req.body };
    delete body.id;
    delete body._id;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(withId(product));
  } catch (err) {
    next(err);
  }
}

// DELETE /api/products/:id
export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
}

// POST /api/products/upload-image 

export async function uploadProductImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "কোনো ছবি পাওয়া যায়নি — form-data তে 'image' নামে একটা file field পাঠাও" });
    }
    // multer-storage-cloudinary req.file.path 
    const url = req.file.path;
    res.status(201).json({ url, filename: req.file.filename });
  } catch (err) {
    next(err);
  }
}