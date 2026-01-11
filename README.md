# 🎮 Virtual Hotel Management System

A full-stack hotel management system featuring the iconic **Nintendo Virtual Boy** aesthetic from 1995. Complete with red-on-black color scheme, 3D wireframe graphics, scanline effects, and irregular hexagon buttons.

---

## 🌟 Features

### Dashboard
- **Real-time Statistics**: Total rooms, occupancy rate, revenue, today's check-ins/check-outs
- **3D Hotel Visualization**: Interactive Three.js wireframe model with color-coded room status
- **Today's Activity**: Live feed of check-ins and check-outs

### Room Management
- **Room Grid View**: Organized by floor with status indicators
- **Status Filtering**: Filter by vacant, occupied, cleaning, or maintenance
- **Real-time Updates**: Change room status with immediate visual feedback
- **Detailed Room Info**: Type, capacity, price, amenities

### Guest Management
- **Guest Database**: Full CRUD operations for guest records
- **Smart Search**: Search guests by name
- **Comprehensive Profiles**: Contact info, ID numbers, nationality, address
- **Edit & Delete**: Modify guest information or remove records

### Booking System
- **Booking Calendar**: View all reservations with status indicators
- **Status Tracking**: Pending, confirmed, checked-in, checked-out, cancelled
- **Date Management**: Check-in/check-out date validation
- **Payment Tracking**: Monitor payment status for each booking
- **Special Requests**: Store guest preferences and requirements

### Virtual Boy Aesthetic
- **Scanline CRT Effect**: Authentic retro display simulation
- **Red-on-Black Color Scheme**: True to the original Virtual Boy
- **Irregular Hexagon Buttons**: Custom-designed UI components
- **Wireframe Graphics**: 3D vector-style visualizations
- **Retro Typography**: Monospace fonts with proper spacing
- **Animated Transitions**: Smooth, arcade-style animations

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D wireframe hotel visualization
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **Axios** - HTTP client for API requests
- **CSS3** - Custom Virtual Boy styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type-safe backend code
- **SQLite3** - Lightweight relational database
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart development server
- **ts-node** - TypeScript execution

---

## 📁 Project Structure
```
virtual-hotel-management/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── UI/           # Reusable UI components
│   │   │   ├── Dashboard/    # Dashboard components
│   │   │   ├── RoomManagement/
│   │   │   ├── GuestManagement/
│   │   │   └── Booking/
│   │   ├── services/         # API service layer
│   │   ├── styles/           # CSS files
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Application entry point
│   ├── public/               # Static assets
│   ├── index.html            # HTML template
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   └── database.ts   # SQLite configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── types/            # TypeScript types
│   │   ├── data/             # Seed data scripts
│   │   ├── app.ts            # Express app setup
│   │   └── server.ts         # Server entry point
│   ├── data/                 # SQLite database files
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
├── .gitignore                # Git ignore rules
├── .env.example              # Environment variables template
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Myrmecology/Virtual-Hotel-Management.git
   cd virtual-hotel-management
```

2. **Set up environment variables**
```bash
   cp .env.example .env
```
   Edit `.env` if you need to change default ports or settings.

3. **Install backend dependencies**
```bash
   cd backend
   npm install
```

4. **Install frontend dependencies**
```bash
   cd ../frontend
   npm install
```

5. **Seed the database**
```bash
   cd ../backend
   npm run seed
```
   This creates sample data:
   - 12 hotel rooms (across 3 floors)
   - 6 guests
   - 6 bookings with various statuses

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:3000`

**Terminal 2 - Frontend Application:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

Open your browser to `http://localhost:5173` to see the application!

---

## 📊 API Endpoints

### Rooms
- `GET /api/v1/rooms` - Get all rooms
- `GET /api/v1/rooms/:id` - Get room by ID
- `GET /api/v1/rooms/status/:status` - Get rooms by status
- `GET /api/v1/rooms/floor/:floor` - Get rooms by floor
- `GET /api/v1/rooms/available` - Get available rooms
- `GET /api/v1/rooms/statistics` - Get room statistics
- `POST /api/v1/rooms` - Create new room
- `PUT /api/v1/rooms/:id` - Update room
- `DELETE /api/v1/rooms/:id` - Delete room

### Guests
- `GET /api/v1/guests` - Get all guests
- `GET /api/v1/guests/:id` - Get guest by ID
- `GET /api/v1/guests/:id/bookings` - Get guest with booking history
- `GET /api/v1/guests/search?query=name` - Search guests
- `GET /api/v1/guests/statistics` - Get guest statistics
- `POST /api/v1/guests` - Create new guest
- `PUT /api/v1/guests/:id` - Update guest
- `DELETE /api/v1/guests/:id` - Delete guest

### Bookings
- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `GET /api/v1/bookings/:id/details` - Get booking with full details
- `GET /api/v1/bookings/status/:status` - Get bookings by status
- `GET /api/v1/bookings/today/check-ins` - Get today's check-ins
- `GET /api/v1/bookings/today/check-outs` - Get today's check-outs
- `GET /api/v1/bookings/statistics` - Get booking statistics
- `POST /api/v1/bookings` - Create new booking
- `PUT /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Delete booking

### Health
- `GET /api/v1/health` - Check API health status

---

## 🎨 Design Philosophy

This project recreates the Nintendo Virtual Boy's distinctive visual style:

### Color Palette
- **Primary Red**: `#FF0000` - Main UI color
- **Pure Black**: `#000000` - Background
- **Dark Red**: `#CC0000` - Secondary elements
- **Glow Effect**: `rgba(255, 0, 0, 0.5)` - Atmospheric lighting

### UI Components
- **Hexagon Buttons**: Irregular hexagon shape with hover effects
- **Scanline Overlay**: Animated CRT scanline effect
- **Wireframe Graphics**: Vector-style 3D visualizations
- **Monospace Typography**: Courier New for authentic retro feel
- **Corner Accents**: Geometric decorative elements

### Animations
- **Fade In/Out**: Smooth content transitions
- **Slide In**: Panel entrances from sides
- **Pulse**: Breathing glow effects
- **Blink**: Status indicators for occupied rooms
- **Glitch**: Occasional retro glitch effects

---

## 🔧 Development

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Code Quality

**Linting:**
```bash
npm run lint
```

**Formatting:**
```bash
npm run format
```

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 3000 is not in use
- Check that all dependencies are installed: `npm install`
- Verify `.env` file exists in root directory

### Frontend can't connect to backend
- Confirm backend is running on `http://localhost:3000`
- Check `VITE_API_URL` in `.env` file
- Clear browser cache and reload

### Database errors
- Delete `backend/data/hotel.db` and run `npm run seed` again
- Check file permissions on the `backend/data/` directory

### TypeScript errors
- Run `npm install` in both frontend and backend directories
- Delete `node_modules` and reinstall if issues persist

### 3D visualization not showing
- Check browser console for WebGL errors
- Ensure browser supports WebGL 2.0
- Try a different browser (Chrome/Firefox recommended)

---

## 📝 Database Schema

### Rooms Table
```sql
- id (INTEGER, PRIMARY KEY)
- roomNumber (TEXT, UNIQUE)
- floor (INTEGER)
- type (TEXT) - single, double, suite, deluxe
- status (TEXT) - vacant, occupied, cleaning, maintenance
- pricePerNight (REAL)
- capacity (INTEGER)
- amenities (TEXT, JSON array)
- createdAt (TEXT)
- updatedAt (TEXT)
```

### Guests Table
```sql
- id (INTEGER, PRIMARY KEY)
- firstName (TEXT)
- lastName (TEXT)
- email (TEXT, UNIQUE)
- phone (TEXT)
- address (TEXT)
- idNumber (TEXT, UNIQUE)
- nationality (TEXT)
- createdAt (TEXT)
- updatedAt (TEXT)
```

### Bookings Table
```sql
- id (INTEGER, PRIMARY KEY)
- guestId (INTEGER, FOREIGN KEY)
- roomId (INTEGER, FOREIGN KEY)
- checkInDate (TEXT)
- checkOutDate (TEXT)
- status (TEXT) - pending, confirmed, checked-in, checked-out, cancelled
- totalAmount (REAL)
- paymentStatus (TEXT) - unpaid, partial, paid, refunded
- specialRequests (TEXT)
- createdAt (TEXT)
- updatedAt (TEXT)
```

---

## 🎯 Use Cases

### Hotel Staff Scenarios

1. **Guest Check-In**
   - Search for guest by name
   - Verify booking details
   - Assign room
   - Change room status to "occupied"

2. **Room Maintenance**
   - View all rooms by status
   - Mark rooms as "maintenance" or "cleaning"
   - Update status when ready
   - Monitor occupancy rate

3. **New Reservation**
   - Create guest profile (if new)
   - Check room availability
   - Create booking with dates
   - Add special requests

4. **Daily Operations**
   - Check today's arrivals/departures
   - Monitor revenue
   - View real-time occupancy
   - Manage room turnovers

---

## 🎮 Virtual Boy History

The Nintendo Virtual Boy, released in 1995, was Nintendo's first 3D gaming console. Its distinctive red LED display and stereoscopic 3D graphics made it instantly recognizable, though commercially unsuccessful. This project pays homage to its unique aesthetic while building a modern, practical application.

---

## 🤝 Contributing

This is a demonstration project, but feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues
- Suggest improvements

---

## 📄 License

MIT License - feel free to use this project for learning.

---

## 🙏 Acknowledgments

- **Nintendo** - For the iconic Virtual Boy design
- **Three.js** - For making 3D graphics accessible
- **React Community** - For excellent tools and libraries
- **TypeScript Team** - For making JavaScript development better

---


---

**Built with ❤️ and nostalgia for the Virtual Boy era**

*Last Updated: January 2026*