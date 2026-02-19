import { test as base, expect } from "@playwright/test";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";
import { hash } from "bcryptjs";

type UserHelper = {
  create: (role?: "ADMIN" | "USER") => Promise<{
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
  }>;
  cleanup: () => Promise<void>;
};

type AuthFixtures = {
  users: UserHelper;
};

export const test = base.extend<AuthFixtures>({
  users: async ({ request, baseURL }, use) => {
    const rootUrl = baseURL || "http://localhost:3000";
    const createdEmails: string[] = [];

    const userHelper = {
      create: async (role: "ADMIN" | "USER" = "USER") => {
        const id = Date.now();
        const email = `test-${role.toLowerCase()}-${id}@example.com`;
        const name = `Test ${role}`;
        const password = "Password123!";
        const hashedPassword = await hash(password, 10);

        await db.insert(users).values({
          email,
          password: hashedPassword,
          fullName: name,
          role: role,
        });

        // Get CSRF Token first Required for Next Auth
        const csrfRes = await request.get(`${rootUrl}/api/auth/csrf`);
        const { csrfToken } = await csrfRes.json();

        const loginRes = await request.post(
          `${rootUrl}/api/auth/callback/credentials`,
          {
            form: {
              email,
              password,
              csrfToken,
              json: "true",
            },
          },
        );

        expect(loginRes.ok()).toBeTruthy();
        createdEmails.push(email);

        return { name, email, password, role };
      },

      cleanup: async () => {
        if (createdEmails.length > 0) {
          await db.delete(users).where(inArray(users.email, createdEmails));
        }
      },
    };

    await use(userHelper);
    await userHelper.cleanup();
  },
});
