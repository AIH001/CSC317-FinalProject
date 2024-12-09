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
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const db = new sqlite3.Database("./warriors_jerseys.db");

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
  if (cart.length === 0) {
    return res.json([]);
  }

  const placeholders = cart.map(() => "?").join(",");
  db.all(
    `SELECT * FROM products WHERE id IN (${placeholders})`,
    cart,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
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
