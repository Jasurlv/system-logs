# 📑 Log System (React + Tailwind + Node.js/Express)

A simple **log management system** with a **React + TypeScript frontend** and a **Node.js/Express backend**, styled with **Tailwind CSS**.  
Supports **CRUD operations**, **pagination**, **responsive design**, **modal dialogs**, **toast notifications**, and **loading indicators**.  
Includes **Cypress E2E tests** and ready for deployment on **Vercel (frontend)** + **Render (backend)**.

---

## 🚀 Features
- **Logs Table** with:
  - Owner (editable)
  - Created At (read-only)
  - Updated At (read-only)
  - Log Text (editable, truncated with `line-clamp-2`)
  - Action buttons (✏️ Edit / 🗑️ Delete)
- **Pagination** (10 items per page)
- **Responsive design** (from 320px mobile to desktop)
- **Modal confirmation** for delete
- **Toast notifications** for success/error
- **Spinner loader** during API calls
- **Accessibility** (semantic HTML, ARIA roles)
- **Automated tests** with Cypress

---

## 🛠️ Tech Stack
**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- Axios

**Backend**
- Node.js + Express
- CORS enabled
- In-memory "fake DB"

**Testing**
- Cypress (E2E)
- start-server-and-test (automation)

---


---

## Live Demo ✨

https://system-logs-ten.vercel.app/

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/Jasurlv/system-logs.git
cd log-sys
```
### 2️⃣ Backend Setup (local)
```bash
cd server
npm install
npm run dev
```
### **⚠️ backend already running at server you dont need to run backend localy**

## 3️⃣ Frontend Setup
``bash
cd system-logs
npm install
npm run dev
```

---

###🧪 Testing

We use ** Cypress E2E ** to verify UI + API integration.
### **⚠️ not fully tested next time i can test with Selenium or Playwrite PYTHON**

**Run automated tests (headless)**
```bash
npm run test:e2e
```
This will:

**1** Start the frontend on port 5173
**2** Run Cypress against http://localhost:5173
**3** Close when finished

### 🌍 Deployment

**Backend (Render)**
**Frontend (Vercel)**

---

### 📸 Screenshots

**Desktop**
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/7261ce5d-8f79-40ac-ac88-b3b5504a9801" />

**Mobile**
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/8663843b-6b25-4f34-ae07-694cbc69f3ba" />


###📝 License

MIT — free to use & modify.

👨‍💻 Developed by Jasur Juraev
📧 Contact: jasurjuraev.lv@gmail.com | +371 25592659
