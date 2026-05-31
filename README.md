# Compensation Intelligence v2

Compensation Intelligence v2 is a modern, high-fidelity salary tracking and side-by-side offer comparison dashboard designed to help candidates evaluate job offers, analyze company pay scales, and track their negotiation options.

##  Key Features

*   **Offer Dashboard**: Overview of all recorded compensation packages with clean filtering and location/role badges.
*   **Deep-Linked Side-by-Side Comparison**: Compare two offers dynamically. Share comparison links easily with parameters (e.g., `/compare?left=1&right=2`).
*   **Saved Comparisons History**: Save comparisons to your profile. Revisit or delete them later with a dedicated history dashboard.
*   **Company Analytics & Pay Scales**: High-fidelity company pages showing average compensation, highest salary, and a visual pay distribution scale grouped by engineering level (e.g., L3, L4, L5).
*   **Secure Authentication**: Fully integrated with Clerk for secure user login, sign-up, and comparison isolation.

---

##  Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router with dynamic server components)
*   **UI Library**: [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a warm neutral premium theme
*   **Database**: PostgreSQL hosted on [Neon](https://neon.tech/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Authentication**: [Clerk NextJS](https://clerk.com/)

---

##  Database Schema

The database model is managed via Prisma ([prisma/schema.prisma](file:///c:/Users/khush/compensation-intelligence-v2/prisma/schema.prisma)):

*   **Company**: Holds company names (e.g., Google, Amazon, Microsoft).
*   **Compensation**: Tracks roles, levels, location, base salaries, stock, bonuses, total compensations, and company associations.
*   **User**: Isolated user entries for database mapping.
*   **SavedComparison**: Maps a user's comparison history between two compensation records.

---

##  Getting Started

### 1. Prerequisites
Ensure you have Node.js installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (based on `.env` settings) containing:
```env
DATABASE_URL="your-postgresql-neon-database-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
```

### 4. Database Setup & Seeding
Push the database schema and run the seed script to pre-populate dummy records:
```bash
# Push database schema
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed the database
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

##  Production Build & Deployment

To verify the app builds properly before deploying:
```bash
npm run build
```

This app can be deployed out-of-the-box on **Vercel**:
1. Connect your repository to Vercel.
2. Add your environment variables (`DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) under Project Settings.
3. Deploy!
