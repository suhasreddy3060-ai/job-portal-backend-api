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
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`.

Set the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
PORT=5000
```

### 4. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

API base URL:

```text
http://localhost:5000/api
```

## API Endpoints

### Authentication

| Method | Endpoint |
|---|---|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| POST | `/api/auth/logout` |

### Users

| Method | Endpoint |
|---|---|
| GET | `/api/users/me` |
| PATCH | `/api/users/me` |

### Jobs

| Method | Endpoint |
|---|---|
| GET | `/api/jobs` |
| GET | `/api/jobs/:id` |
| GET | `/api/jobs/mine` |
| POST | `/api/jobs` |
| PATCH | `/api/jobs/:id` |
| DELETE | `/api/jobs/:id` |

### Applications

| Method | Endpoint |
|---|---|
| POST | `/api/applications/jobs/:jobId` |
| GET | `/api/applications/mine` |
| GET | `/api/applications/employer/jobs/:jobId` |
| PATCH | `/api/applications/:id/status` |

### Admin

| Method | Endpoint |
|---|---|
| GET | `/api/admin/users` |
| GET | `/api/admin/users/:id` |
| PATCH | `/api/admin/users/:id/status` |
| DELETE | `/api/admin/users/:id` |
| GET | `/api/admin/jobs` |
| GET | `/api/admin/jobs/:id` |
| DELETE | `/api/admin/jobs/:id` |

## Data Design

The application uses MongoDB with Mongoose models.

- `Job -> User` references the employer.
- `Application -> Job` references the applied job.
- `Application -> User` references the job seeker.
- User skills and education are stored as profile data.

## Security

- Passwords are hashed using bcrypt.
- JWT authentication uses httpOnly cookies.
- Protected routes require authentication.
- Role-based middleware protects seeker, employer, and admin routes.
- Password hashes are excluded from API responses.
- Environment secrets are stored in `.env`.
- `.env` is excluded from Git using `.gitignore`.

## Testing

A Postman collection is included:

```text
postman/Job-Portal-Backend.postman_collection.json
```

Main workflow:

```text
Register
   ↓
Login
   ↓
Employer creates Job
   ↓
Seeker applies
   ↓
Employer views Application
   ↓
Employer updates Application Status
   ↓
Seeker views updated Status
```

## Admin Setup

Public registration creates only `seeker` or `employer` users.

For local admin testing, a trusted user's role can be changed to `admin` directly in MongoDB or through a controlled seed script.

## Project

**Job Portal Backend API**

Built using Node.js, Express.js, and MongoDB.
