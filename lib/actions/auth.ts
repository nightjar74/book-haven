"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
//import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { AuthCredentials } from "@/types";
import { revalidateTag } from "next/cache";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  //const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  //const { success } = await ratelimit.limit(ip);
  //const { isLimited } = await ratelimit(ip);
  //const success = !isLimited;

  //if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    //console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password } = params;

  //const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  //const { success } = await ratelimit.limit(ip);
  //const { isLimited } = await ratelimit(ip);
  //const success = !isLimited;

  //if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    //console.log("Creating user:", { fullName, email });
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
    });

    /*     await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    }); */

    await signInWithCredentials({ email, password });

    revalidateTag("users-cache");
    return { success: true };
  } catch (error) {
    //console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
