import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Providers from "../providers/provider";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  //const isAdmin = session?.user?.role === "ADMIN";

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <Providers>
      <main className="flex h-screen w-full flex-row">
        <div className="h-full flex-none">
          <Sidebar session={session} />
        </div>

        <div className="admin-container overflow-y-auto">
          <Header session={session} />
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </Providers>
  );
};
export default Layout;
