# BOLT Project

This project has two parts:

- `backend` - Spring Boot app without a database
- `frontend` - Vite + React app using Supabase

## Requirements

- Java 17
- Maven 3.9+
- Node.js 18+ and npm

## Frontend environment

Create `frontend/.env` with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Run the backend

From the `backend` folder:

```bash
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.
Health check: `http://localhost:8080/api/health`

## Run the frontend

From the `frontend` folder:

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Build commands

Backend:

```bash
mvn clean compile
```

Frontend:

```bash
npm run build
```

## Notes

- The backend no longer uses H2, JPA, or Hibernate.
- The frontend uses Supabase directly for auth and data operations.
- `backend/target`, `frontend/dist`, `frontend/node_modules`, and `.vite` are generated folders and should not be committed.



## START LOCAL HOST
steps
in terminal

-cd project
-cd backend 
-mvn spring-boot:run

then 
new terminal 

-cd project
-cd frontend
-npm run dev

done...



GitHub pe push 
git init (hmesa nhi krna )

start from here---
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main