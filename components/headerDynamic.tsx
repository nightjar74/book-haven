import { Session } from "next-auth";
import MobileHeader from "./mobileHeader";
import DesktopHeader from "./desktopHeader";

const DynamicHeader = ({
  session,
  isAdmin,
}: {
  session: Session;
  isAdmin: boolean;
}) => {
  return (
    <header className="w-full z-10">
      <DesktopHeader session={session} isAdmin={isAdmin} />
      <MobileHeader session={session} isAdmin={isAdmin} />
    </header>
  );
};

export default DynamicHeader;
