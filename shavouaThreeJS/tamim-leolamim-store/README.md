<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111827,100:16a34a&height=180&section=header&text=Tamim%20Leolamim%20Store&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=35" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=2500&pause=800&color=16A34A&center=true&vCenter=true&width=650&lines=Express+Backend+Online+Store;Built+for+the+perfect+Yeshiva+Bachur;White+shirts%2C+black+pants+and+JSON;No+bugs+during+seder+please" />

<br/>

![Node.js](https://img.shields.io/badge/Node.js-111827?style=for-the-badge&logo=node.js&logoColor=22c55e)
![Express](https://img.shields.io/badge/Express-111827?style=for-the-badge&logo=express&logoColor=ffffff)
![dotenv](https://img.shields.io/badge/dotenv-111827?style=for-the-badge&logo=dotenv&logoColor=facc15)
![JSON](https://img.shields.io/badge/JSON-111827?style=for-the-badge&logo=json&logoColor=ffffff)

</div>

---

# 🛒 Tamim Leolamim Store

An Express backend for an online store made for the perfect **yeshiva bachur**.

The store sells everything a serious bachur may need:

- white shirts
- black pants
- yeshiva accessories
- army uniforms
- useful daily items
- and hopefully enough stock before checkout

Because a real bachur should be able to fill his cart without missing seder.

---

## ✨ Project Overview

This project simulates a small online store with:

| Feature     | Description                        |
| ----------- | ---------------------------------- |
| 🧥 Products | View and filter store products     |
| 🛒 Cart     | Add, view and remove cart items    |
| 💰 Balance  | Each customer has a money balance  |
| 📦 Checkout | Creates an order and updates stock |
| 📜 Orders   | View customer order history        |
| ⚙️ Config   | Uses `.env` variables              |
| 🗂️ Database | Stores data in JSON files          |
| 🚨 Errors   | Centralized error handling         |

---

## 🧰 Technologies

```txt
Node.js
Express
dotenv
JSON files
```

---

## 📁 Project Structure

```txt
tamim-leolamim-store/
│
├── db/
│   ├── products.json
│   ├── customers.json
│   └── orders.json
│
├── src/
│   ├── server.js
│   ├── app.js
│
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── utils/
│   └── validators/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root folder:

```env
PORT= int
DB_BASE_PATH= path
STARTING_BALANCE= int
```

A `.env.example` file is included as a template.

> The real `.env` file should not be pushed to GitHub.

---

## 🚀 Run the Project

Start the server:

```bash
npm start
```

Run in development mode:

```bash
npm run dev
```

---

## 🌍 API Routes

| Method   | Route                                             | Description                         |
| -------- | ------------------------------------------------- | ----------------------------------- |
| `GET`    | `/`                                               | API welcome message                 |
| `GET`    | `/health`                                         | Checks if the server is running     |
| `GET`    | `/products`                                       | Returns all products                |
| `GET`    | `/products?inStock=true&maxPrice=50&search=shirt` | Filters products                    |
| `GET`    | `/cart?customerId=abc123`                         | Returns a customer cart             |
| `POST`   | `/cart/items`                                     | Adds an item to the cart            |
| `DELETE` | `/cart/items/:productId`                          | Removes an item from the cart       |
| `GET`    | `/account/balance?customerId=abc123`              | Returns customer balance            |
| `POST`   | `/orders/checkout`                                | Validates cart and creates an order |
| `GET`    | `/orders?customerId=abc123`                       | Returns customer order history      |

---

## 🔎 Product Filters

`GET /products` supports multiple query parameters:

| Query Param | Example                  | Description                        |
| ----------- | ------------------------ | ---------------------------------- |
| `inStock`   | `/products?inStock=true` | Returns only products with stock   |
| `maxPrice`  | `/products?maxPrice=100` | Returns products under a max price |
| `search`    | `/products?search=shirt` | Searches inside product names      |

Filters can be combined:

```http
GET /products?inStock=true&maxPrice=100&search=shirt
```

---

## 📦 Example Product

```json
{
  "id": 1,
  "name": "Classic White Shirt",
  "price": 60,
  "stock": 30
}
```

---

## 🛒 Add Item to Cart

```http
POST /cart/items
```

Body:

```json
{
  "customerId": "abc123",
  "productId": 1,
  "quantity": 2
}
```

---

## ✅ Success Response Format

```json
{
  "success": true,
  "data": {}
}
```

---

## ❌ Error Response Format

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🧠 Business Rules

- Products are visible to everyone.
- Cart, balance and orders require a `customerId`.
- A new customer automatically receives the starting balance from `.env`.
- Products can be added to the cart only if enough stock exists.
- Stock is not reduced when adding to cart.
- Stock is reduced only after a successful checkout.
- Checkout fails if the cart is empty.
- Checkout fails if the customer does not have enough money.
- Checkout creates an order and clears the cart.

---

## 🧪 Suggested Tests

| Test                                    | Expected Result                 |
| --------------------------------------- | ------------------------------- |
| `GET /health`                           | Server responds successfully    |
| `GET /products`                         | Returns all products            |
| `GET /products?inStock=true`            | Returns only available products |
| `GET /cart` without `customerId`        | Returns `400`                   |
| `POST /cart/items` with valid body      | Adds item to cart               |
| `POST /cart/items` with invalid stock   | Returns `400`                   |
| `POST /orders/checkout` with empty cart | Returns `400`                   |
| `POST /orders/checkout` with valid cart | Creates order                   |
| Unknown route                           | Returns `404`                   |

---

## 🧑‍💻 Author

Built as part of an Express backend project.

Made with:

```txt
INCONNU
```

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:16a34a,100:111827&height=120&section=footer" />

</div>
