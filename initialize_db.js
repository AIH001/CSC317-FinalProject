const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./warriors_jerseys.db");

// Create Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Create Products table
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image_url TEXT,
    description TEXT
  )
`);

// Insert sample data into Products table
db.run(
  `
  INSERT INTO products (name, price, image_url, description) VALUES
  ('Stephen Curry Jersey', 89.99, '/product_img/steph_jersey.png', 'Authentic Stephen Curry jersey.'),
  ('Buddy Hield', 89.99, '/product_img/buddy_jersey.png', 'Authentic Buddy Hield Jersey.'),
  ('Draymond Green Jersey', 89.99, '/product_img/draygreen_jersey.png', 'Authentic Draymond Green jersey.')
`,
  (err) => {
    if (err) console.error(err);
    else console.log("Sample products inserted.");
  }
);

db.close();
