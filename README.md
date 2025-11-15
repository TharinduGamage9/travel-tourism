# 🌴 Ceylon Travels – Travel & Tourism Website

A fully responsive Next.js travel and tourism website inspired by SriLankaParadiseTours. Includes dynamic pages, reusable components, contact form, Mailtrap email integration, admin dashboard, MongoDB database, Cloudinary image storage, and user authentication system.

## 🚀 Live Demo

🔗 [https://travel-tourism-nine.vercel.app/](https://travel-tourism-nine.vercel.app/)

## 💻 GitHub Repository

🔗 [https://github.com/TharinduGamage9/travel-tourism](https://github.com/TharinduGamage9/travel-tourism)

## 📌 Features

• ✅ Fully responsive design
• 🏞️ Modern UI with Next.js & Tailwind CSS
• 🌍 Tour listings with dynamic routing
• 📬 Contact form integrated with Mailtrap (email testing)
• 🔁 Reusable components for Navbar, Footer, Cards, etc.
• 🚀 Deployed on Vercel
• ⚡ Fast performance with Next.js App Router
• 🔐 User Authentication System (Login & Register)
• 👤 User profiles saved to MongoDB
• 🛡️ Admin Dashboard at `/admin` route
• 📝 Tour Management (Add, Edit, Delete) - saved to MongoDB
• 🖼️ Gallery Image Management - uploaded to Cloudinary, URLs saved to MongoDB
• ☁️ Cloudinary integration for image storage

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js | Frontend framework |
| React | Component structure |
| Tailwind CSS | Styling |
| MongoDB | Database (Tours, Users, Gallery) |
| Mongoose | MongoDB ODM |
| Cloudinary | Image storage and CDN |
| bcryptjs | Password hashing |
| Mailtrap | Email testing for contact form |
| Vercel | Deployment |

## 📊 Database Structure

### Tours Collection
Tours are stored in MongoDB with the following schema:
- `title` (String, required)
- `city` (String, required)
- `distance` (Mixed - number or string)
- `maxGroupSize` (Number)
- `shortDesc` (String, required)
- `desc` (String, required)
- `price` (String, required)
- `photo` (String, required) - Image URL
- `featured` (Boolean, default: false)
- `avgRating` (Number, default: 0)
- `reviews` (Array of review objects)
- `createdAt`, `updatedAt` (Timestamps)

### Users Collection
User accounts are stored in MongoDB with the following schema:
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed with bcryptjs)
- `phone` (String, optional)
- `role` (String, enum: 'user' or 'admin', default: 'user')
- `avatar` (String, default: '/images/user.png')
- `createdAt`, `updatedAt` (Timestamps)

### Gallery Collection
Gallery images are stored in MongoDB with the following schema:
- `imageUrl` (String, required) - Cloudinary URL
- `alt` (String, required) - Image alt text
- `title` (String, optional)
- `category` (String, optional)
- `createdAt`, `updatedAt` (Timestamps)

**Example Gallery Document:**
```json
{
  "_id": "691838411d505f581a55f19d",
  "imageUrl": "https://res.cloudinary.com/dmnyitsre/image/upload/v1763194928/gallery/...",
  "alt": "nature",
  "title": "img",
  "category": "nature",
  "createdAt": "2025-11-15T08:22:25.837Z",
  "updatedAt": "2025-11-15T08:22:25.837Z",
  "__v": 0
}
```

## 🏗️ Project Setup Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TharinduGamage9/travel-tourism.git
cd travel-tourism
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env.local` in the root folder with the following variables:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Mailtrap Configuration (for contact form)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_password

# Admin Credentials (optional, defaults shown)
NEXT_PUBLIC_ADMIN_EMAIL=admin@travel.com
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Contact Email
CONTACT_EMAIL=Ceylonetravels@gmail.com
```

**📌 Getting Your Credentials:**

- **MongoDB URI**: Get from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Connect → Copy connection string
- **Cloudinary**: Get from [Cloudinary Dashboard](https://cloudinary.com/console) → Settings → Account Details
- **Mailtrap**: Get from [Mailtrap](https://mailtrap.io) → Inbox → SMTP Settings

### 4️⃣ Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin`

**Default Admin Credentials:**
- Email: `admin@travel.com`
- Password: `admin123`

*(You can change these in `.env.local`)*

### Admin Features:
- ✅ **Dashboard Overview**: View total tours and gallery images count
- ✅ **Tour Management**: Add, edit, and delete tours
- ✅ **Gallery Management**: Upload images to Cloudinary and manage gallery
- ✅ **Quick Navigation**: Easy access to all admin features

**Admin Routes:**
- `/admin` - Admin login page
- `/admin/dashboard` - Main admin dashboard
- `/admin/tours` - Tour management (Add, Edit, Delete)
- `/admin/gallery` - Gallery management (Upload, Delete)

## 👤 User Authentication

### User Registration
Users can register at `/register` with:
- Name
- Email (must be unique)
- Password (minimum 6 characters)
- Phone (optional)

User data is saved to MongoDB `users` collection with encrypted passwords using bcryptjs.

### User Login
Users can login at `/login` with:
- Email
- Password

Authentication is handled through the API and user data is stored in localStorage.

### User Profile
Authenticated users can access their profile at `/profile`.

## 🖼️ Image Management

### Gallery Images
- Gallery images are uploaded to **Cloudinary**
- Image URLs are automatically saved to MongoDB `gallery` collection
- Images can be managed through the admin dashboard at `/admin/gallery`

### Tour Images
- Tour images are uploaded to **Cloudinary**
- Image URLs are saved with tour data in MongoDB `tours` collection

## 📩 Contact Form (Mailtrap)

The contact form sends email messages using Mailtrap's SMTP service. You can check received emails inside your Mailtrap inbox.

## 🚀 Deployment

The project is deployed on Vercel.

### To deploy manually:

```bash
vercel
```

Or connect your GitHub repo → automatic deployment.

### Environment Variables on Vercel:
Make sure to add all environment variables in your Vercel project settings:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all variables from `.env.local`

## 📁 Project Structure

```
travel-tourism/
├── src/
│   ├── app/
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── tours/          # Tour management
│   │   │   └── gallery/        # Gallery management
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication (login, register)
│   │   │   ├── tours/          # Tour CRUD operations
│   │   │   ├── gallery/        # Gallery CRUD operations
│   │   │   ├── upload/         # Cloudinary upload
│   │   │   └── contact/        # Contact form
│   │   ├── Components/         # Reusable components
│   │   ├── login/              # User login page
│   │   ├── register/           # User registration page
│   │   ├── profile/            # User profile page
│   │   ├── Tours/              # Tours listing page
│   │   └── ...
│   └── ...
├── models/                     # MongoDB models
│   ├── Tour.js                 # Tour schema
│   ├── User.js                 # User schema
│   └── Gallery.js              # Gallery schema
├── lib/                        # Utilities
│   └── mongodb.js              # MongoDB connection
└── ...
```

## 🧑💻 Developer

**Tharindu Gamage**

- 📧 Email: [tharindupushpa802@gmail.com](mailto:tharindupushpa802@gmail.com)
- 📱 Phone: 0787962180
- 🐙 GitHub: [https://github.com/TharinduGamage9](https://github.com/TharinduGamage9)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, MongoDB, and Cloudinary**
