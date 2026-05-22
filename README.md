# 📝 BlogCraft - Modern Blogging Platform

A modern and responsive blogging platform built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Users can create, edit, delete, search, and interact with blog posts through an intuitive user interface.

---

## 🚀 Features

### 📚 Blog Management
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- View blog details

### 🔍 Search Functionality
- Search blogs by title or content
- Instant filtering of blog posts

### ❤️ User Interaction
- Like blog posts
- Add comments to posts
- Like comments
- Track post views

### 💾 Data Persistence
- Local Storage integration
- Automatically saves blog data
- Maintains user activity between sessions

### 🎨 Modern UI
- Responsive design
- Mobile-friendly layout
- Clean and modern user interface
- Tailwind CSS styling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS

### State Management
- React Hooks
- Custom Hooks

### Storage
- Browser Local Storage

### Development Tools
- ESLint
- PostCSS

---

## 📂 Project Structure

```bash
project/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── data/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/blogcraft.git
```

### Navigate to Project

```bash
cd blogcraft
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 📖 Application Flow

1. User visits the homepage.
2. Available blog posts are displayed.
3. Users can:
   - Read blog posts
   - Search blogs
   - Create new posts
   - Edit existing posts
   - Delete posts
4. Users can like posts and add comments.
5. All data is stored locally using browser Local Storage.

---

## 🎯 Key React Concepts Used

- Functional Components
- React Hooks
  - useState
  - useEffect
- Custom Hooks
- Component Reusability
- Conditional Rendering
- Props Management
- State Management
- Client-Side Routing

---

## 💡 Challenges Solved

### State Synchronization

Maintained consistent application state across multiple CRUD operations while ensuring UI updates instantly without page refresh.

### Data Persistence

Implemented Local Storage integration to preserve blog posts, comments, likes, and views across browser sessions.

### Reusable Architecture

Created reusable components and custom hooks to improve maintainability and scalability.

---

## 🌟 Future Enhancements

- User Authentication
- Backend Integration
- Rich Text Editor
- User Profiles
- Categories & Tags
- Dark Mode
- Cloud Database Support
- Bookmark Feature

---

## 👨‍💻 Author

**Omprakash Karri**

Frontend Developer | React Developer

GitHub: https://github.com/OMPRAKASHKARRI

---

## 📄 License

This project is developed for learning, portfolio, and demonstration purposes.
