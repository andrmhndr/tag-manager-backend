# 📡 Backend API - Book & Tag Management

## 🚀 Overview
Backend ini dibuat menggunakan **NestJS** dan **MongoDB (Mongoose)** untuk mengelola data **Book** dan **Tag**. API ini menyediakan endpoint untuk melakukan operasi CRUD terhadap data **Book** dan **Tag**.

---

## 📂 Folder Structure
```
src/
│── common/
│── core/
│   ├── interceptor/
│── database/
│── feature/
│   ├── book/
│   │   ├── dto/
│   │   ├── schema/
│   ├── tag/
│   │   ├── dto/
│   │   ├── schema/
│── helper/
│── app.module.ts
│── main.ts
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone Repository
```sh
git clone https://github.com/andrmhndr/tag-manager-backend.git
```

### 2️⃣ Install Dependencies
```sh
yarn install
# or
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file and add the following:  
```env
PORT=8080
DATABASE_URL=mongodb+srv://andrmhndr:andrmhndr@tag-manager.uswxd.mongodb.net/development
```

### 4️⃣ Run Server
```sh
yarn dev
# or
npm run dev
```
Server akan berjalan di **http://localhost:8080**

---

## **📡 API Endpoints**  
| Method  | Endpoint            | Description                   |  
|---------|---------------------|-------------------------------|  
| `GET`   | `/tag`             | Fetch all tags                 |  
| `GET`   | `/tag/:id`         | Fetch tag                      |  
| `GET`   | `/tag/suggestions` | Fetch tag suggestions          |  
| `POST`  | `/tag`             | Create a new tag               |  
| `PUT`   | `/tag`             | Update a tag                   |  
| `DELETE`| `/tag`             | Delete a tag                   |  
| `GET`   | `/book`            | Fetch all books                |  
| `GET`   | `/book/:id`        | Fetch book                     |  
| `POST`  | `/book`            | Create a new book              |  
| `PUT`   | `/book`            | Update a book                  |  
| `DELETE`| `/book`            | Delete a book                  |  

---

## 🛠 Tech Stack
- **NestJS** - Backend framework
- **MongoDB (Mongoose)** - Database
- **TypeScript** - Typed JavaScript

---
