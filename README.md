# 📋 Log System – Test Assignment

A simple **Log Management System** built with **React + TypeScript + TailwindCSS** and a minimal **Express backend**.  
Implements full CRUD (Create, Read, Update, Delete), responsive UI, and required features from the assignment.

---

## 🚀 Features

- ✅ Responsive **Logs Table** (Owner, Log Text, Created At, Updated At, Actions)
- ✅ **CRUD support** (add, edit, delete)
- ✅ **Modal dialogs** for Add/Edit/Delete confirmation
- ✅ **Toast notifications** (success/error)
- ✅ **Loading spinner** for API requests
- ✅ **Pagination** (10 logs per page)
- ✅ Styled with **TailwindCSS only**
- ✅ Accessible (semantic HTML, ARIA roles, focus/hover states)

---

## 🛠️ Tech Stack

**Frontend**
- React + TypeScript
- TailwindCSS
- Axios (API requests)

**Backend**
- Node.js + Express
- CORS enabled
- In-memory fake database (no DB required)

---

## 📂 Project Structure

├── server/ # Express backend
│ └── index.js # Backend server file
├── src/ # Frontend (React + Vite)
│ ├── components/ # Reusable UI components
│ │ ├── Table.tsx
│ │ ├── Modal.tsx
│ │ ├── Toast.tsx
│ │ └── Spinner.tsx
│ └── App.tsx
└── package.json


---

## ⚡ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/log-system.git
cd log-system
```

### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Run backend

From the server/ folder:
```bash
npm run dev
```
Backend runs at: http://localhost:4000

### 4️⃣ Run frontend

From the root folder:
```bash
npm run dev
```
Frontend runs at: http://localhost:5173

### 📸 Screenshots

