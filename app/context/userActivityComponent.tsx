import { User } from "@/lib/actions/data-fetchers";
import { UserActivityProvider } from "./userActivityProvider";

type UserActivityContainerProps = {
  children: React.ReactNode;
  userData: User[];
  defaultUser?: User | null;
  className?: string;
};

const UserActivityContainer = ({
  children,
  userData,
  defaultUser = null,
  className = "",
}: UserActivityContainerProps) => {
  return (
    <UserActivityProvider userData={userData} defaultUser={defaultUser}>
      <div className={`flex flex-col gap-6 ${className}`}>{children}</div>
    </UserActivityProvider>
  );
};

export default UserActivityContainer;
