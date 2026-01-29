import { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Footer from "@/components/footer";
import Headern from "@/components/headerDynamic";
import DynamicHeader from "@/components/headerDynamic";
import {
  Facebook,
  Instagram,
  Navigation,
  Twitter,
  Youtube,
} from "lucide-react";
import { LanguagePicker } from "@/components/LanguagePicker";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  const isAdmin = session.user?.role === "ADMIN";
  //console.log(isAdmin, "isAdmin");

  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user?.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session.user?.id));
  });

  return (
    <>
      <main className="root-container relative min-w-max">
        <div className="absolute w-full sm:h-[180px] h-[120px] bg-[#9d3128] z-0 top-0 left-0">
          <div className="hidden sm:block relative top-0 h-12 left-0 bg-[#77211a] z-0 px-[64px]">
            <div className="mx-auto w-full max-w-[1440px] flex flex-row items-center gap-x-4 h-12">
              <a className="flex flex-row items-center gap-x-4 h-12" href="#">
                <Navigation size={17} className="text-white" />
                <p className="text-white text-[18px]">Address</p>
              </a>
              <p className="text-white text-[18px] ml-5 min-w-fit">
                +975 2 00 00 00
              </p>
              <div className="flex gap-4 flex-row ml-5">
                <a
                  href="#"
                  className="text-white hover:text-slate-900 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-slate-900 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-slate-900 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="w-full flex justify-end">
                <LanguagePicker color="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto md:mt-7 mt-3 w-screen sm:min-w-[1440px] sm:w-[1440px]">
          {/* <Header session={session} isAdmin={isAdmin} /> */}
          <DynamicHeader session={session} isAdmin={isAdmin} />

          <div className="md:mt-[60px] mt-[25px] pb-20">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
