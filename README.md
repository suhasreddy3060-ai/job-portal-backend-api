# Job Portal Backend API

Backend Development Mini Project based on the MastersCoding specification.

## Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication in httpOnly cookies
- bcrypt password hashing
- express-validator
- Postman

## Roles
- **Job Seeker:** profile, browse jobs, apply, view applications
- **Employer:** create/manage own jobs, review applications, update application status
- **Admin:** manage users and jobs

## Setup
1. Install Node.js and MongoDB.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` and a strong `JWT_SECRET`.
4. Run `npm install`.
5. Run `npm run dev` for development or `npm start`.
6. API base URL: `http://localhost:5000/api`

## Important
Public registration creates only `seeker` or `employer` users. Create an admin directly in MongoDB (or through a controlled seed script) by changing a trusted user's `role` to `admin`.

## Main Endpoints
### Auth
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`

### User
- GET `/users/me`
- PATCH `/users/me`

### Jobs
- GET `/jobs`
- GET `/jobs/:id`
- GET `/jobs/mine` (Employer)
- POST `/jobs` (Employer)
- PATCH `/jobs/:id` (Employer owner)
- DELETE `/jobs/:id` (Employer owner)

### Applications
- POST `/applications/jobs/:jobId` (Job Seeker)
- GET `/applications/mine` (Job Seeker)
- GET `/applications/employer/jobs/:jobId` (Employer owner)
- PATCH `/applications/:id/status` (Employer owner)

### Admin
- GET `/admin/users`
- GET `/admin/users/:id`
- PATCH `/admin/users/:id/status`
- DELETE `/admin/users/:id`
- GET `/admin/jobs`
- GET `/admin/jobs/:id`
- DELETE `/admin/jobs/:id`

## Data Design
`Job -> User (employer)` and `Application -> Job/User (job seeker)` use references. User skills and education are embedded profile structures.

## Security
- Passwords are hashed with bcrypt.
- JWT is stored in an httpOnly cookie.
- Protected routes require authentication.
- Role middleware protects seeker/employer/admin routes.
- Password hashes are excluded from API responses.
- Secrets belong in `.env` and `.env` is gitignored.

## Testing
Import `postman/Job-Portal-Backend.postman_collection.json` into Postman. Register users, login, create jobs as an employer, apply as a seeker, then review/update applications as the employer. For admin tests, promote a trusted local user to `admin` in MongoDB.
