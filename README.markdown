# Store CRUD Demo — Assessment

![Project Screenshot](./Home.png)

## Overview
This is a **demo store CRUD application** created as an assessment project for a job application.
It includes:
- User authentication (login/register)
- Admin dashboard with product management
- Landing page
- Basic file upload

## Register a new user (required to create the first admin account for dashboard access, you can use http://localhost:5000/admin/register endpoint)


## Tech Stack

- **Frontend:** EJS templates engine
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT / http cookie-based authentication
- **File Upload:** Multer

## Project Structure
```
store/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   └── productController.js
│   ├── middlewares/
│   │   ├── protectWithRole.js
│   │   └── upload.js
│   ├── models/
│   │   └── product.js
|   |   └── user.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── homeRoute.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── plugins/
|   |   └── dashboard/
│   ├── views/
│   │   ├── home.ejs
│   │   ├── addProduct.ejs
│   │   ├── dashboard.ejs
│   │   ├── updateProduct.ejs
│   │   └── login.ejs
│   ├── config/
│   │   └── db.js
│   └── uploads/
│       └── images/
├── server.js
├── package.json
└── README.md
```

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/l1l-01/store
   cd store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=development
   ```
4. Ensure MongoDB is running.

## Usage
1. Start the server:
   ```bash
   npm run dev
   ```
2. Access the application at `http://localhost:5000`.
   - Home: `/`
   - Admin Dashboard: `/admin/dashboard`
   - Add Product: `/admin/dashboard/products`
   - Edit Product: `/admin/dashboard/products/`
   - Login: `/auth/login`

## Routes

### Admin Routes (Protected)
| Route | Method | Description |
|-------|--------|-------------|
| `/admin/products` | GET | List all products |
| `/admin/products/:id` | GET | Get one product |
| `/admin/products/create` | POST | Create product (with image) |
| `/admin/products/update/:id` | PUT | Update product (with image) |
| `/admin/products/delete/:id` | DELETE | Delete product |
| `/admin/dashboard` | GET | Admin dashboard home page |
| `/admin/dashboard/products` | GET | Admin product creation page |
| `/admin/dashboard/products/:id` | GET | Admin update product page |

### Auth Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/auth/register` | POST | Register a new user |
| `/auth/login` | POST | Login user |
| `/auth/logout` | POST | Logout user |
| `/auth/login` | GET | Login page |

### Public Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Get all products (landing/home page) |

## Dependencies
- **express**: Web framework
- **ejs**: Template engine
- **mongoose**: MongoDB ORM
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **multer**: File uploads
- **method-override**: Supports PUT/DELETE in forms
- **cookie-parser**: Cookie parsing
- **dotenv**: Environment variables
- **fs**, **path**: File system operations
- **nodemon**: Development server



## Notes
- Built in less than 24 hours as a rapid prototype.
> ⚠ **Important:** This project is **not intended for production**. It’s a demo/prototype for portfolio and assessment purposes. Do not deploy it in a live environment.
