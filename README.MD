# ConfHub – Conference Management Web Application

## Overview
ConfHub is a web application designed to manage scientific conferences.  
It supports user registration, conference creation, paper submission, automatic reviewer assignment, reviewing workflows, and paper versioning.

The application uses:  
- React.js (SPA) for the frontend  
- Node.js + Express for the backend  
- A relational database accessed via an ORM  
- Deployment to a cloud provider with a free student tier  

---

## General Objective
Develop a modern web application that allows organizers, authors, and reviewers to coordinate conferences, submit papers, review submissions, and track statuses efficiently.

---


# User Roles

## Organizer
- Creates and edits conferences  
- Assigns reviewers  
- Monitors submissions  
- Views all papers and review results  

## Author
- Registers for a conference  
- Submits papers (title, abstract, keywords, PDF)  
- Receives reviewer feedback  
- Uploads revised versions  

## Reviewer
- Receives automatically assigned papers (2 per submission)  
- Provides reviews with scores and comments  
- Issues recommendations (accept, reject, revision required)  

---

# Minimum Required Functionality

- User authentication  
- CRUD operations for conferences  
- Reviewer assignment to conferences  
- Submission of papers with PDF upload  
- Automatic assignment of two reviewers  
- Review workflow with comments and decisions  
- Paper versioning  
- Organizer dashboard for monitoring  
- SPA accessible on multiple devices  
- Integration with an external API  

---

## Architecture
Frontend (React SPA)
↓
Backend (Node.js + Express REST API)
↓
Relational Database (PostgreSQL/MySQL via ORM)
↓
External API


---

## Technologies

### Frontend  
- React.js  
- React Router  
- Context API / Redux (optional)  
- Material UI / Bootstrap / Tailwind (optional)

### Backend  
- Node.js  
- Express.js  
- JWT authentication  
- ORM (Sequelize / Prisma / TypeORM)  
- Multer for file uploads  

### Database  
- PostgreSQL or MySQL  

### External API  
- OpenWeatherMap API  

---

## Database Schema (Draft)

### User  
- id  
- name  
- email  
- passwordHash  
- role (ORGANIZER / AUTHOR / REVIEWER)  
- affiliation  
- bio  

### Conference  
- id  
- title  
- description  
- location  
- startDate  
- endDate  
- submissionDeadline  
- reviewDeadline  
- createdBy  

### ConferenceReviewer  
- id  
- conferenceId  
- reviewerId  

### Paper  
- id  
- conferenceId  
- authorId  
- status (SUBMITTED / IN_REVIEW / ACCEPTED / REJECTED / REVISION_REQUIRED)  
- currentVersionId  

### PaperVersion  
- id  
- paperId  
- title  
- abstract  
- keywords  
- fileUrl  
- versionNumber  
- uploadedAt  

### Review  
- id  
- paperId  
- paperVersionId  
- reviewerId  
- score  
- commentsToAuthor  
- commentsToOrganizer  
- recommendation  

---

## API Endpoints (Draft)

### Authentication
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

### Papers

POST /api/conferences/:id/papers
GET /api/conferences/:id/papers
GET /api/papers/:id
POST /api/papers/:id/versions


### Reviews

GET /api/reviews/my
POST /api/papers/:id/reviews


---

## Project Structure

/backend
src/
app.js
server.js
routes/
models/
package.json

/frontend
src/
public/
package.json

README.md


---

## Run Instructions

### Backend

cd backend
npm install
npm run dev


### Frontend

cd frontend
npm install
npm start


---

## Deployment Plan
- Frontend: Vercel / Netlify  
- Backend: Render / Railway / AWS / Azure  
- Database: Railway / Supabase / AWS RDS  

---

## Project Stages

### Stage 1 – 16.11.2025  
- Specifications  
- Project plan  
- Git repo initialized  
- Basic backend  
- Basic frontend  
- README included  

### Stage 2 – 06.12.2025  
- Functional REST API  
- ORM models + migrations  
- Reviewer auto-assignment  
- Backend run instructions  

### Stage 3 – Final Seminar  
- Complete frontend  
- Integration frontend-backend  
- External API integration  
- Deployment  
- Optional tests  

---

## Versioning Guidelines
Example commit messages:

chore: initialize repository
feat: add Express backend skeleton
feat: initialize React frontend
feat: add User model
feat: implement conference CRUD
feat: add paper submission endpoint
fix: improve reviewer assignment
docs: update README


Recommended branches:

feature/auth
feature/conference-api
feature/paper-submission
feature/frontend-ui