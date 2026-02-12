# PhotoLabs - Photo Discovery Platform

A full-stack photo gallery application with AI-powered descriptions, photo uploads, search, and user authentication. Built with React, Node.js, Express, and PostgreSQL.

**🌐 Live Demo:** [https://photolabs-sand.vercel.app](https://photolabs-sand.vercel.app)

**Demo Account:** `demo@photolabs.com` / `demo123`

---

## About This Project

PhotoLabs started as a React learning project at [Lighthouse Labs](https://www.lighthouselabs.ca/) — a simple photo gallery that fetched images from an API and displayed them in a modal.

I took it significantly further by building it into a full-featured photo platform with:
- **JWT authentication** with registration and login
- **Photo uploads** with cloud storage via Cloudinary
- **AI-generated descriptions** powered by Anthropic's Claude Vision API
- **Search functionality** to find photos by city or country
- **Production deployment** with a React frontend on Vercel and Express backend on Railway

The original project was a frontend exercise. What it is now demonstrates full-stack architecture, third-party API integration, cloud infrastructure, and product thinking.

---

## Features

### Core Functionality
- **Photo Gallery** - Browse photos in a responsive grid layout
- **Topic Filtering** - Filter photos by category (People, Nature, Travel, Animals, Fashion)
- **Photo Modal** - View full-size photos with similar photo suggestions
- **Favorites System** - Like photos and track them with a notification badge
- **Search** - Find photos by city or country name

### User Accounts
- **JWT Authentication** - Secure token-based login and registration
- **User Registration** - Create accounts with email, username, and password
- **Persistent Sessions** - Stay logged in across browser sessions
- **Demo Account** - Try the app instantly without registering

### Photo Uploads
- **Image Upload** - Upload photos with title, description, location, and topic
- **Cloud Storage** - Images stored on Cloudinary for reliable delivery
- **AI Descriptions** - Generate photo descriptions automatically using Anthropic's Claude Vision API
- **File Validation** - Client-side checks for file type and size (5MB limit)

---

## Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/90ca4508-996b-4af5-8dd7-265b9334db3c)

### Homepage
![Homepage](https://github.com/user-attachments/assets/fef5f4c4-619f-4c06-93b9-2cebeb62a34e)

### Photo Upload
![Photo Upload](https://github.com/user-attachments/assets/b6af077c-b9b3-49e4-83f4-a17a1b8b3e18)

### Photo Modal with AI Description
![AI Description](https://github.com/user-attachments/assets/5a912e27-3e78-456b-b6cb-424fa0d3a4de)
The Parthenon description was generated automatically by Anthropic's Claude Vision API.

---

## Tech Stack

### Frontend
- **React** - Component-based UI with hooks and reducers
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication
- **SCSS** - Styled components with variables and nesting

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **PostgreSQL** - Relational database
- **bcryptjs** - Password hashing
- **JSON Web Tokens** - Stateless authentication

### Cloud Services
- **Cloudinary** - Image storage and delivery
- **Anthropic Claude Vision API** - AI-powered image descriptions
- **Vercel** - Frontend hosting
- **Railway** - Backend and database hosting

---

## Database Schema

```sql
-- Users
CREATE TABLE user_account (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  profile_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topics
CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL
);

-- Photos
CREATE TABLE photo (
  id SERIAL PRIMARY KEY,
  full_url TEXT NOT NULL,
  regular_url TEXT NOT NULL,
  city VARCHAR(255),
  country VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  user_id INTEGER REFERENCES user_account(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topic(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Cloudinary account (for uploads)
- Anthropic API key (for AI descriptions)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Lakonas/Photolabs.git
cd Photolabs
```

2. **Set up the backend**
```bash
cd backend
npm install
```

3. **Set up PostgreSQL database**
```bash
# Create database
createdb photolabs

# Run schema and seed
psql photolabs -f src/db/schema/create.sql
psql photolabs -f src/db/schema/development.sql
```

4. **Configure backend environment variables**
```bash
# Create .env in /backend
PGHOST=localhost
PGUSER=your_user
PGDATABASE=photolabs
PGPASSWORD=your_password
PGPORT=5432
PORT=8001
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ANTHROPIC_API_KEY=your_anthropic_key
```

5. **Start the backend**
```bash
npm start
```

6. **Set up the frontend**
```bash
cd ../frontend
npm install
```

7. **Configure frontend environment variables**
```bash
# Create .env in /frontend
VITE_API_URL=
```

8. **Start the frontend**
```bash
npm run dev
```

9. **Visit the app**
```
http://localhost:5173
```

---

## API Endpoints

### Public Routes
- `GET /api/photos` - Fetch all photos with user and similar photo data
- `GET /api/photos/search?q=term` - Search photos by city or country
- `GET /api/topics` - Fetch all topics
- `GET /api/topics/:id/photos` - Fetch photos by topic

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Authenticate and receive JWT
- `GET /api/auth/me` - Verify token and return user info

### Protected Routes (Requires JWT)
- `POST /api/upload` - Upload a photo with metadata
- `POST /api/ai/describe` - Generate AI description from image

---

## Architecture

```
Client (React on Vercel)
    │
    ├── useApplicationData hook ── GET /api/photos, /api/topics
    ├── useAuth hook ────────────── POST /api/auth/login, /register
    ├── PhotoUploadForm ─────────── POST /api/upload, /api/ai/describe
    │
    ▼
Server (Express on Railway)
    │
    ├── routes/photos.js ── Photo queries with similar photos
    ├── routes/auth.js ──── JWT authentication with bcrypt
    ├── routes/upload.js ── Multer → Cloudinary pipeline
    ├── routes/ai.js ────── Anthropic Claude Vision API
    │
    ▼
PostgreSQL (Railway)          Cloudinary (Image CDN)
```

---

## Deployment

PhotoLabs is deployed as a split-stack application:
- **Frontend** on [Vercel](https://vercel.com) — automatic deploys from `master` branch
- **Backend** on [Railway](https://railway.app) — automatic deploys from `master` branch
- **Database** on Railway PostgreSQL

**Live URL:** [https://photolabs-sand.vercel.app](https://photolabs-sand.vercel.app)

### Environment Variables

**Backend (Railway):**
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Railway)
- `JWT_SECRET` - Secret key for token signing
- `CLOUDINARY_CLOUD_NAME` - Cloudinary account name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ANTHROPIC_API_KEY` - Anthropic API key for AI descriptions

**Frontend (Vercel):**
- `VITE_API_URL` - Backend URL on Railway

---

## Project Structure

```
Photolabs/
├── backend/
│   └── src/
│       ├── db/
│       │   ├── schema/
│       │   │   ├── create.sql        # Database schema
│       │   │   └── development.sql   # Seed data
│       │   └── index.js              # Database connection
│       ├── routes/
│       │   ├── photos.js             # Photo endpoints
│       │   ├── topics.js             # Topic endpoints
│       │   ├── auth.js               # Authentication
│       │   ├── upload.js             # Photo upload pipeline
│       │   └── ai.js                 # AI description endpoint
│       ├── application.js            # Express app configuration
│       └── index.js                  # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PhotoList.jsx         # Photo grid
│   │   │   ├── PhotoListItem.jsx     # Individual photo card
│   │   │   ├── PhotoFavButton.jsx    # Favorite toggle
│   │   │   ├── TopicList.jsx         # Topic navigation
│   │   │   ├── TopicListItem.jsx     # Individual topic
│   │   │   ├── LoginForm.jsx         # Login page
│   │   │   ├── RegisterForm.jsx      # Registration page
│   │   │   ├── PhotoUploadForm.jsx   # Upload with AI
│   │   │   └── TopNavigationBar.jsx  # Header with search
│   │   ├── hooks/
│   │   │   ├── useApplicationData.js # Photo/topic state management
│   │   │   └── useAuth.js           # Authentication state
│   │   ├── routes/
│   │   │   ├── HomeRoute.jsx         # Main gallery view
│   │   │   └── PhotoDetailsModal.jsx # Full photo modal
│   │   ├── App.jsx                   # Root component
│   │   └── main.jsx                  # Entry point
│   ├── .env                          # Environment variables
│   └── vite.config.js                # Vite configuration
└── README.md
```

---

## Design Decisions

### Why JWT Over Sessions?
- **Stateless** - No server-side session storage needed
- **Scalable** - Works naturally with split frontend/backend deployment
- **React-friendly** - Easy to store and send from a SPA

### Why Cloudinary for Uploads?
- **CDN delivery** - Fast image loading globally
- **Automatic optimization** - Images resized and compressed
- **Reliable** - No managing file storage on the server

### Why Anthropic Claude Vision?
- **High-quality descriptions** - Contextually aware image analysis
- **Simple integration** - Clean API with base64 image support
- **Unique feature** - Sets this project apart in a portfolio

### Why Split Deployment (Vercel + Railway)?
- **Best tool for each job** - Vercel excels at static/SPA hosting, Railway excels at backend services
- **Free tier friendly** - Both platforms offer generous free tiers
- **Independent scaling** - Frontend and backend deploy independently

---

## Roadmap

- [ ] AI Image Generation — generate photos from text prompts (UI is built, feature coming soon)
- [ ] User profiles with upload history
- [ ] Photo comments and social features
- [ ] Advanced search with filters (date, topic, user)
- [ ] Infinite scroll pagination
- [ ] Dark mode

---

## Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Bill Katsoulis**
- GitHub: [@Lakonas](https://github.com/Lakonas)
- Project: [PhotoLabs](https://photolabs-sand.vercel.app)

---

## Acknowledgments

- Originally started as a project for [Lighthouse Labs](https://www.lighthouselabs.ca/) Web Development Bootcamp
- Significantly enhanced with JWT authentication, Cloudinary photo uploads, AI-powered descriptions via Anthropic's Claude Vision API, search functionality, and production deployment across Vercel and Railway
- Deployed as a split-stack application with React frontend on Vercel and Express backend on Railway

---

**⭐ If you found this project interesting, please consider giving it a star!**
