# Full Stack User Management Project

This project is a **Full Stack User Management App** with real-time notifications using **Socket.io**.  
The project consists of two main directories:

- `server` – Node.js backend with REST APIs, MongoDB integration, and Socket.io for notifications.
- `client` – Vite + React + TypeScript frontend with Material UI.

---

## 📁 Project Structure

project-root/
│
├─ server/ # Node.js backend
│ ├─ routes/ # API routes (auth, users)
│ ├─ models/ # Mongoose models
│ ├─ services/ # Socket.io instance or other utilities
│ ├─ server.js # Main server entry
│ └─ package.json
│
├─ client_v1/ # React frontend
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ └─ services/ # Axios APIs
│ ├─ vite.config.ts
│ └─ package.json
│
└─ README.md

- `npm run dev` to start the frontend app before that do npm install 
- `docker-compose run -d ` to pull the mongo db , in my case mongo:latest is not executed due to format error, i preferred mongo:6

- Sorry for my terrible ui design , i didnt work extensively on ui 