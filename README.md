# Restaurant Menu Management System

A modern, responsive restaurant menu management system built with React and Node.js. This application allows restaurant owners to manage their menu categories and items with a beautiful, user-friendly interface.

## Features

- 🍽️ Dynamic menu categories with smooth scrolling navigation
- 📱 Fully responsive design that works on all devices
- 🎨 Beautiful UI with decorative elements and animations
- 🔄 Real-time updates using Context API
- 📦 Efficient data management with MongoDB
- 🔒 Secure API endpoints

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Context API for state management
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-menu
```

2. Install dependencies for both frontend and backend:

For backend:
```bash
cd backend
npm install
```

For frontend:
```bash
cd client
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Create a `.env` file in the client directory:
```env
VITE_ENV=LOCAL
VITE_BASEAPI=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Menus
- `GET /api/menus` - Get all menus
- `GET /api/menus/:id` - Get a specific menu
- `POST /api/menus` - Create a new menu


### Menu Items
- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/menu/:menuId` - Get items for a specific menu
- `GET /api/menu-items/:id` - Get a specific menu item
- `POST /api/menu-items` - Create a new menu item


## Using the Application

### Managing Menus

1. **Viewing Menus**
   - The menu categories are displayed in a scrollable bar at the top
   - Click on any category to view its items
   - The active category is highlighted in blue

2. **Adding a New Menu**
   - Use the admin interface to add new menu categories
   - Each menu requires a name and description

3. **Managing Menu Items**
   - Select a menu category to view its items
   - Items are displayed in a grid layout
   - Each item shows:
     - Name
     - Price
     - Description






