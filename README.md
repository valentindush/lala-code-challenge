# Lala Code Challenge - Rentals System

Lala Code Challenge is a full-stack rental system built using **Next.js** for the frontend and **Next.js + Prisma** for the backend. The project is containerized with **Docker Compose** for easy deployment.

## 📂 Project Structure

```
├── .gitignore
├── README.md
├── client/       # Frontend (Next.js)
│   ├── .env (ignored)
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── server/       # Backend (Next.js API + Prisma)
│   ├── .env (ignored)
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma/schema.prisma
│   ├── src/
│   ├── test/
│   ├── tsconfig.json
│   └── uploads/ (ignored)
├── docker-compose.yaml  # Docker configuration
└── pnpm-lock.yaml
```

## 🚀 Getting Started

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PNPM](https://pnpm.io/) (or use npm/yarn)
- [Docker](https://www.docker.com/) & Docker Compose

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/lala-rentals.git
cd lala-rentals
```

### 3️⃣ Setup Environment Variables
Copy the example `.env` files for both **client** and **server**:
```sh
cp client/.env.example client/.env
cp server/.env.example server/.env
```
Then update the `.env` files with the required values.

### 4️⃣ Install Dependencies
Run the following command in both `client` and `server` directories:
```sh
pnpm install
```

### 5️⃣ Run the Application
#### ➤ Using Docker Compose
To start both the **client** and **server** with Docker:
```sh
docker-compose up --build
```
This will start all services and make the application available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000

#### ➤ Running Manually
Alternatively, you can run each service separately:

**Start the Backend (Server)**
```sh
cd server
pnpm run dev
```
Backend will run on **http://localhost:8080**

**Start the Frontend (Client)**
```sh
cd client
pnpm run dev
```
Frontend will run on **http://localhost:3000**

### 6️⃣ Database Setup (Prisma)
If running for the first time, set up the database with:
```sh
cd server
pnpm prisma migrate dev
```

## 🛠 Technologies Used
- **Frontend:** Next.js, Tailwind CSS, React
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication:** Google OAuth
- **Deployment:** Docker, Docker Compose
