import { auth } from "@/auth";
import RequestForm from "@/components/forms/requestFrom";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <>
      <RequestForm id={session.user.id} />
    </>
  );
}
