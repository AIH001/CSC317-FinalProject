const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "CSC317-FinalProject")));
app.use(express.static(path.join(__dirname, ".")));
app.use(express.static(path.join(__dirname, "views")));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const db = new sqlite3.Database("./warriors_jerseys.db");

// Routes for Main HTML Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});
app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "checkout.html"));
});
app.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "shop.html"));
});

console.log("Starting Server...");

// Add to Cart
app.post("/api/cart/add", (req, res) => {
  const { productId } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart.push(productId);
  res.json({ message: "Product added to cart", cart: req.session.cart });
});

// Get Cart Items
app.get("/api/cart", (req, res) => {
  const cart = req.session.cart || [];
  console.log("Session Cart:", cart); // Debugging

  if (cart.length === 0) {
    console.log("Cart is empty.");
    return res.json([]); // Return empty cart
  }

  const placeholders = cart.map(() => "?").join(",");
  console.log("SQL Query Placeholders:", placeholders); // Debugging

  db.all(
      `SELECT id, name, price, image_url FROM products WHERE id IN (${placeholders})`,
      cart,
      (err, rows) => {
        if (err) {
          console.error("Database Error:", err.message);
          return res.status(500).json({ error: "Failed to load cart items" });
        }
        console.log("Cart Items from DB:", rows); // Debugging
        res.json(rows);
      }
  );
});



// Remove from Cart
app.post("/api/cart/remove", (req, res) => {
  const { productId } = req.body;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter((id) => id !== productId);
  }

  res.json({ message: "Product removed from cart", cart: req.session.cart });
});

const bcrypt = require("bcrypt");

// Signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          console.error("Error inserting user:", err.message); // Debugging
          res.status(500).json({ error: "User already exists" });
        } else {
          res.status(200).json({ message: "User registered successfully" });
        }
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err); // Debugging
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login User
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.userId = user.id;
    res.json({ message: "Login successful", user });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
