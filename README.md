# Virtual Hotel Management 🎮🏨

A hotel management system with a **Virtual Boy aesthetic** - featuring the iconic red-on-black color scheme, 3D wireframe graphics, and retro LED display styling.

## 🎯 Project Overview

Virtual Hotel Management combines modern full-stack technology with nostalgic 1995 Virtual Boy visuals to create a unique, eye-catching hotel management system.

### Features

- **Dashboard**: Real-time hotel occupancy with 3D wireframe visualization
- **Room Management**: Visual floor plan with irregular hexagon button controls
- **Guest Management**: Check-in/check-out system with Virtual Boy styled forms
- **Booking System**: Reservation management with retro calendar interface
- **Reports & Analytics**: Occupancy rates and revenue tracking

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Three.js (3D wireframe effects)
- CSS3 (Virtual Boy styling)

### Backend
- Node.js + Express + TypeScript
- SQLite (database)
- REST API architecture

## 📁 Project Structure
```
virtual-hotel-management/
├── frontend/          # React frontend application
├── backend/           # Express backend API
├── docs/              # Documentation
└── scripts/           # Utility scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/virtual-hotel-management.git
cd virtual-hotel-management
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
# In frontend directory
cp .env.example .env

# In backend directory
cp .env.example .env
```

5. Initialize the database:
```bash
cd backend
npm run seed
```

### Running the Application

**Backend (from /backend directory):**
```bash
npm run dev
```
Server runs on `http://localhost:3000`

**Frontend (from /frontend directory):**
```bash
npm run dev
```
Application runs on `http://localhost:5173`

## 🎨 Virtual Boy Aesthetic

This project replicates the distinctive visual style of Nintendo's Virtual Boy (1995):

- **Color Scheme**: Bright red (#FF0000) on pure black (#000000)
- **Graphics**: 3D wireframe vector graphics with heavy perspective
- **Display**: Pixelated LED effect with visible scan lines
- **UI Elements**: Angular, geometric shapes with irregular hexagon buttons
- **Typography**: Monospace/pixel fonts for retro LED display feel

## 📝 Development

### File-by-File Development Approach
This project is built one file at a time with individual Git commits for clean history and easy debugging.

### Code Quality
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Clean, commented code
- Professional architecture patterns

## 🔐 Security

- Comprehensive .gitignore with YubiKey protection
- Environment variables for sensitive data
- No credentials in source code

## 🤝 Contributing

This is a portfolio/demonstration project. Feel free to fork and customize!

## 📄 License

MIT License - feel free to use this project for learning and inspiration.

## 🎬 YouTube

This project was built for educational/demonstration purposes. Check out the build process [VIDEO LINK HERE]. Coming soon

---

**Built with ❤️ and nostalgia for the Virtual Boy era, because I love the Virtual Boy**