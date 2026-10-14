# Ethixweb — India-Focused Digital Experience

A modern, responsive website redesign for Ethixweb, built as part of the **Full Stack Developer Assessment**. The project combines a premium India-focused user experience with a functional backend, database-backed enquiry management, and a protected admin dashboard.

## Table of Contents

- [Project Overview](#project-overview)
- [Assessment Objectives](#assessment-objectives)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Design Rationale](#design-rationale)
- [Application Architecture](#application-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Security Considerations](#security-considerations)
- [Performance and Quality Checklist](#performance-and-quality-checklist)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Assessment Submission](#assessment-submission)

## Project Overview

Ethixweb is a full-stack website redesign intended to communicate trust, professionalism, and digital expertise to Indian businesses and audiences while maintaining a premium, international-quality presentation.

The application includes four public-facing pages—Home, Services, About, and Contact—alongside a protected administration area for managing customer enquiries.

Unlike a purely static website, the project connects the contact form to a real backend and Supabase database, allowing submitted enquiries to be stored and managed through the admin dashboard.

## Assessment Objectives

The project addresses the core requirements of the Ethixweb Full Stack Developer Assessment:

- Create an India-specific redesign with a premium visual identity.
- Build a consistent and responsive multi-page experience.
- Implement a working enquiry form with server-side validation.
- Store submitted enquiries in a real database.
- Provide secure, authenticated access to an admin dashboard.
- Support lead viewing, status updates, and deletion.
- Follow maintainable frontend and backend architecture.
- Prioritize accessibility, performance, responsive behavior, and error handling.

## Key Features

### Public Website

- **Home:** Value proposition, service highlights, process overview, featured-work area, business differentiators, and calls to action.
- **Services:** Presentation of digital services and their business value.
- **About:** Brand story and India-focused positioning.
- **Contact:** Enquiry form with input validation and backend integration.
- **Responsive design:** Layouts designed to adapt to mobile, tablet, and desktop screens.
- **Interactive experience:** Brand-consistent styling, navigation, transitions, and interface feedback.

### Admin Dashboard

- Authenticated admin login using Supabase Authentication.
- Protected admin routes and backend endpoints.
- Database-backed lead listing.
- Lead search and status filtering.
- Lead status management.
- Lead deletion.
- Dashboard summaries based on retrieved lead data.
- Loading, error, and empty-state handling.

### Enquiry Management

The contact form submits enquiry data to the Express backend, which validates the request and persists accepted submissions in Supabase.

The admin dashboard retrieves and manages those records through protected API endpoints. Lead information is loaded from the database rather than relying on hardcoded example records.

## Technology Stack

| Layer             | Technology            | Purpose                                  |
| ----------------- | --------------------- | ---------------------------------------- |
| Frontend          | React                 | Component-based user interface           |
| Frontend tooling  | Vite                  | Development server and production builds |
| Routing           | React Router          | Client-side page navigation              |
| Styling           | HTML5, CSS3           | Responsive layouts and visual design     |
| Icons             | Lucide React          | Consistent interface icons               |
| Backend           | Node.js, Express.js   | REST API and request handling            |
| Database          | Supabase / PostgreSQL | Persistent enquiry storage               |
| Authentication    | Supabase Auth         | Admin sign-in and session management     |
| API communication | HTTP / REST           | Frontend-backend integration             |
| Version control   | Git, GitHub           | Source control and project hosting       |

## Design Rationale

### 1. India-Specific Positioning

The redesign is intended to feel relevant to Indian businesses without relying on superficial visual stereotypes. The focus is on clear communication, credibility, approachable messaging, and a professional digital presence suitable for a modern Indian business audience.

### 2. Premium Visual Identity

A restrained red, cream, and charcoal palette establishes brand recognition while preserving readability and visual hierarchy. Typography, spacing, reusable components, and consistent page layouts help create a cohesive experience.

### 3. User Experience

The navigation and calls to action guide visitors toward learning about services or submitting an enquiry. Responsive layouts support users across screen sizes, while clear form feedback helps users understand validation errors and submission outcomes.

### 4. Full-Stack Functionality

The application separates the public website from administrative workflows. React manages the interface, Express handles API requests and validation, and Supabase provides persistent storage and authentication.

This architecture avoids treating the enquiry form and admin dashboard as disconnected UI demonstrations.

### 5. Improvements Over a Static Website

The redesign emphasizes a more cohesive visual system, dedicated service and company pages, responsive interactions, persistent enquiry management, and a protected administration workflow.

These are the intended improvements of this implementation; a direct comparison with the original website should be based on a separate review of the live original and redesigned sites.

## Application Architecture

```text
Visitor
   |
   v
React + Vite Frontend
   |
   |-- Home
   |-- Services
   |-- About
   |-- Contact Form
   |-- Admin Login
   |-- Protected Admin Dashboard
   |
   v
Express REST API
   |
   |-- Request validation
   |-- Admin authentication and authorization
   |-- Lead management
   |
   v
Supabase
   |
   |-- PostgreSQL database
   |-- Authentication
```

### Enquiry workflow

1. A visitor completes the Contact form.
2. The frontend submits the form to the backend API.
3. The backend validates the submitted information and applies the configured spam-protection checks.
4. Valid enquiries are stored in Supabase.
5. An authenticated administrator retrieves and manages leads through the admin dashboard.

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- A Supabase project with the required database table and authentication configured

### 1. Clone the repository

```bash
git clone <YOUR_PUBLIC_GITHUB_REPOSITORY_URL>
cd ethixweb-react
```

Replace the placeholder with your actual public GitHub repository URL.

### 2. Install frontend dependencies

```bash
npm install
```

Create a frontend `.env` file in the project root using the variable names expected by your frontend code.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

Create a separate `backend/.env` file containing the backend configuration.

### 4. Configure Supabase

Set up your Supabase project and configure the database schema expected by the backend. Ensure the `leads` table includes the fields required by the application, such as contact information, enquiry details, status, and creation timestamp.

Configure authentication and the application's administrator authorization rules before exposing the admin endpoints.

### 5. Start the backend

From the `backend` directory, run the development command defined in its `package.json`. For example, if a `dev` script is configured:

```bash
npm run dev
```

### 6. Start the frontend

Open another terminal, return to the project root, and run:

```bash
npm run dev
```

Vite will print the local development URL in the terminal. Open that URL in your browser.

> **Note:** The exact start commands depend on the scripts defined in each `package.json`. Use the commands configured in your repository.

## Environment Variables

Keep frontend and backend configuration separate.

### Frontend environment

Example for a Vite application:

```dotenv
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Use the public Supabase key appropriate for your project. The variable name must match the one referenced in your frontend source code.

### Backend environment

```dotenv
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_server_side_secret
FRONTEND_URL=http://localhost:5173
```

These names are illustrative. Match them to the variables actually read by your backend configuration.

**Never expose the Supabase service-role key or other server-side secrets in frontend code, a public repository, screenshots, or client-side environment variables.** Store production secrets in the hosting provider's environment-variable settings.

## API Overview

The backend provides endpoints for enquiry submission and administrative lead management.

| Operation           | Method | Endpoint               |
| ------------------- | ------ | ---------------------- |
| Submit an enquiry   | POST   | `/api/leads`           |
| Retrieve leads      | GET    | `/api/admin/leads`     |
| Verify admin access | GET    | `/api/admin/verify`    |
| Update lead status  | PATCH  | `/api/admin/leads/:id` |
| Delete a lead       | DELETE | `/api/admin/leads/:id` |

These paths describe the intended application API. Confirm them against the final Express route definitions before treating this table as a definitive API contract.

Administrative endpoints must enforce authentication and authorization on the server. Frontend route protection alone is not sufficient.

## Security Considerations

- Validate enquiry data on the server, even when the frontend already validates it.
- Enforce admin authentication and authorization on every administrative endpoint.
- Keep privileged Supabase credentials exclusively on the backend.
- Restrict CORS to the appropriate frontend origins in production.
- Configure appropriate request limits and spam protection for public form submissions.
- Return useful error responses without exposing stack traces or secrets.
- Exclude `.env` files and other sensitive configuration from version control.
- Use HTTPS for deployed applications.
- Avoid storing unnecessary personal information in enquiry records.

## Performance and Quality Checklist

The assessment targets a polished experience and a **90+ PageSpeed Insights score on both mobile and desktop**. This is a target, not a score claimed by this README.

Before submission, verify:

- [ ] Responsive behavior across mobile, tablet, and desktop.
- [ ] No broken links or missing assets.
- [ ] No application errors in the browser console.
- [ ] Enquiry validation, submission, and database persistence.
- [ ] Admin login, lead listing, status updates, and deletion.
- [ ] Loading, error, and empty states.
- [ ] Keyboard navigation, visible focus states, and accessible form labels.
- [ ] Appropriate image sizing and optimized assets.
- [ ] Production build completes successfully.
- [ ] PageSpeed Insights results captured for mobile and desktop.

Record the actual PageSpeed results and include screenshots in the submission materials.

## Deployment

A possible deployment arrangement is:

- **Frontend:** Vercel
- **Backend:** Render
- **Database and authentication:** Supabase

Other hosting providers may be used if they meet the assessment requirements.

### Production configuration

1. Deploy the frontend and backend separately.
2. Configure the frontend's API URL to point to the deployed backend.
3. Set the backend's allowed frontend origin to the deployed frontend URL.
4. Add the required Supabase configuration through the hosting provider's environment settings.
5. Configure the production admin authorization rules.
6. Configure SPA routing fallback rules if required by the frontend host.
7. Test the public contact form and every administrative operation against the deployed environment.
8. Run PageSpeed Insights on the final live URL.

### Live application


- **GitHub repository:** https://github.com/Beastaleast/Ethixweb-Indi.git
- **Live Demo:** https://ethixweb-indi.vercel.app/

Replace these placeholders with verified URLs after deployment.

## Project Structure

```text
ethixweb-react/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── server.js
├── src/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

This is a representative structure. Preserve the actual filenames and directories in your repository if they differ.

## Assessment Submission

The assessment brief requests the following deliverables:

- [ ] Live website URL.
- [ ] Public GitHub repository.
- [ ] README documenting the technology stack and design rationale.
- [ ] PageSpeed Insights screenshots for mobile and desktop.
- [ ] Demo admin login details, shared securely through the requested submission process.
- [ ] Optional 1–2 minute walkthrough video.

### Demo administrator access

Provide a dedicated demo administrator account only after confirming that it works on the deployed application.

- **Admin URL:** `<ADD_YOUR_DEPLOYED_ADMIN_URL>`
- **Demo email:** `<PROVIDE_A_DEDICATED_DEMO_ACCOUNT>`
- **Demo password:** `<SHARE_SECURELY_WITH_THE_ASSESSOR>`

Do not commit real passwords, service-role keys, or other secrets to this repository.

---

**Built as an implementation of the Ethixweb Full Stack Developer Assessment.**
