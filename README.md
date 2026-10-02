# Job Portal Backend API

A RESTful backend API for a Job Portal system supporting Job Seekers, Employers, and Administrators.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- express-validator
- Postman

## User Roles

### Job Seeker

- Register and login
- Manage profile
- Browse available jobs
- Apply for jobs
- View submitted applications
- Track application status

### Employer

- Register and login
- Create and manage jobs
- View applications for their jobs
- Update application status

### Admin

- Manage users
- Activate or deactivate users
- Manage jobs

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/suhasreddy3060-ai/job-portal-backend-api.git
cd job-portal-backend-api

```bash
git clone https://github.com/suhasreddy3060-ai/job-portal-backend-api.git
### 2. Install dependencies

```bash
npm install
### 3. Configure environment variables

Copy `.env.example` to `.env`.

Set the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
PORT=5000
### 4. Start the server

Development:

```bash
npm run dev

cd job-portal-backend-api
```
