"use server";

//import { signOut } from "next-auth/react";
import { signOut } from "@/auth";

export async function handleSignOut() {
  await signOut();
}
