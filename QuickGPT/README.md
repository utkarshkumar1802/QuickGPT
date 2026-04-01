# QuickGPT

A full-stack AI chat application powered by Grok AI, enabling users to generate text and images with an intuitive interface and credit-based system.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- **AI-Powered Chat** - Real-time conversations with Grok AI model
- **Image Generation** - Create images from text prompts using ImageKit AI
- **Credit System** - Token-based credit system for usage tracking and monetization
- **Chat History** - Persistent chat storage with full message history
- **Community Features** - Share and discover community-generated content
- **User Authentication** - Secure JWT-based authentication
- **Payment Integration** - Stripe integration for credit purchases

### User Experience
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Instant message delivery and response streaming
- **Session Management** - Maintain chat context across sessions
- **Rate Limiting** - Intelligent rate limiting with automatic retry logic

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and linting
- **CSS3** - Styling with Prism syntax highlighting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication & authorization

### External Services
- **Grok AI** - LLM API for text generation
- **ImageKit** - Image generation and optimization
- **Stripe** - Payment processing
- **Vercel** - Deployment platform

---

## 📁 Project Structure

```
QuickGPT/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── ChatBox.jsx         # Main chat interface
│   │   │   ├── Message.jsx         # Message rendering
│   │   │   └── Sidebar.jsx         # Navigation sidebar
│   │   ├── context/                # Global state management
│   │   │   └── AppContext.jsx
│   │   ├── pages/                  # Page components
│   │   │   ├── Community.jsx       # Community showcase
│   │   │   ├── Credits.jsx         # Credit management
│   │   │   ├── Loading.jsx         # Loading state
│   │   │   └── Login.jsx           # Authentication
│   │   ├── assets/                 # Static assets & styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── vercel.json
│
├── server/                          # Backend Express application
│   ├── controllers/                 # Request handlers
│   │   ├── chatController.js       # Chat CRUD operations
│   │   ├── messageController.js    # Message & AI generation
│   │   ├── userController.js       # User management
│   │   ├── creditController.js     # Credit transactions
│   │   ├── infoController.js       # Info endpoints
│   │   └── webhooks.js             # Stripe webhooks
│   ├── models/                      # Database schemas
│   │   ├── User.js                 # User schema
│   │   ├── Chat.js                 # Chat schema
│   │   └── Transaction.js          # Credit transaction schema
│   ├── routes/                      # API routes
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── messageRoutes.js
│   │   └── creditRoutes.js
│   ├── middlewares/                 # Express middleware
│   │   └── auth.js                 # JWT authentication
│   ├── configs/                     # Service configurations
│   │   ├── db.js                   # MongoDB connection
│   │   ├── openai.js               # Grok API client
│   │   └── imageKit.js             # ImageKit client
│   ├── server.js                    # Entry point
│   ├── package.json
│   ├── vercel.json
│   └── .env                         # Environment variables
│
└── README.md
```

---

## 🔧 Prerequisites

- **Node.js** v16.0.0 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (cloud database)
- **Grok API** key from [x.ai](https://x.ai)
- **ImageKit** account for image generation
- **Stripe** account for payment processing

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/utkarshkumar1802/QuickGPT.git
cd QuickGPT
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

---

## 🔐 Environment Configuration

### Server Environment Variables
Create a `.env` file in the `server/` directory:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app>

# Authentication
JWT_SECRET=your_jwt_secret_key

# AI & Image Services
GROK_API_KEY=your_grok_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<account_id>

# Payment Processing
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Server
PORT=3000
```

### Client Environment Variables
Create a `.env` file in the `client/` directory (if needed):

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 Running the Application

### Development Mode

**Start Backend Server:**
```bash
cd server
npm start
# Server runs on http://localhost:3000
```

**Start Frontend Dev Server (in new terminal):**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### Production Build

**Backend:**
```bash
cd server
npm run build  # if applicable
```

**Frontend:**
```bash
cd client
npm run build
# Optimized build output in `dist/` directory
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout

### Chat Management
- `GET /api/chat` - Get all user chats
- `POST /api/chat/create` - Create new chat
- `DELETE /api/chat/delete` - Delete chat

### Messages & AI
- `POST /api/message/text` - Send text prompt to Grok AI
- `POST /api/message/image` - Generate image from prompt
- `GET /api/message/:chatId` - Get chat messages

### Credits & Billing
- `GET /api/credit/balance` - Check user credit balance
- `POST /api/credit/purchase` - Purchase credits via Stripe
- `GET /api/credit/history` - Transaction history

### Community
- `GET /api/user/community` - Get community posts
- `POST /api/user/publish` - Publish to community

---

## 📊 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  credits: Number,
  create: Number, // Creation credits
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  userName: String,
  messages: [{
    role: String,
    content: String,
    timestamp: Date,
    isImage: Boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: String, // 'purchase', 'usage'
  amount: Number,
  credits: Number,
  stripeTransactionId: String,
  createdAt: Date
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Utkarsh Kumar** - MERN Stack Developer

- GitHub: [@utkarshkumar1802](https://github.com/utkarshkumar1802)
- Email: utkarshkumar1802@gmail.com

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the author directly.

---

**Last Updated:** April 1, 2026
