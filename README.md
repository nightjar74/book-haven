<div align="center">

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Upstash-black?style=for-the-badge&logoColor=white&logo=upstash&color=00E9A3" alt="upstash" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Tanstack_Query-black?style=for-the-badge&logoColor=white&logo=reactquery&color=FF4154" alt="tanstackquery" />
  </div>

  <h3 align="center">A Library Management System</h3>

   <div align="center">
     A comprehensive Book Management Platform built with a modern tech stack, designed to streamline digital library workflows, user tracking, and automated book borrowing.
    </div>
</div>

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Tailwind CSS

### Frontend

- **Framework:** Next.js 15 (App Router)
- **State & Data Fetching:** TanStack Query (React Query)
- **Styling:** Tailwind CSS, Shadcn UI, Radix UI
- **Forms:** React Hook Form, Zod

### Backend & Database

- **ORM:** Drizzle ORM
- **Database:** PostgreSQL (Neon)
- **Rate-limiting:** Upstash Redis
- **Auth:** NextAuth.js (Auth.js)

### Infrastructure & Tools

- **Image Hosting:** ImageKit
- **Background Tasks:** QStash
- **Language:** TypeScript

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/nightjar74/book-haven.git
cd book-haven
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
AUTH_SECRET=
DATABASE_URL=
```

Create a new file named `.env.local` in the root of your project and add the following content:

```env.local
# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# QStash
QSTASH_URL=
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
```

Replace the placeholder values with your actual ImageKit, NeonDB, Upstash, and Resend credentials.

## 🧪 Database & Seeding

To populate the database with the initial library collection.
**Optional:** Run the seed script in **dry-run mode** to verify data without modifying the database.

```bash
npm run seed
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
