import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  summary: string;
  borrowCount: number;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  summary: string;
}

interface requestParams {
  title: string;
  author: string;
  publisher: string;
  userId: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface SelectUser {
  userid: string;
  isSelected: boolean;
  name: string;
}

interface UserActivityContextType {
  selectedUser: SelectUser;
  setSelectedUser: Dispatch<SetStateAction<any>>;
}

interface Collection {
  setNo: string;
  title: string;
  subtitle: string | null;
  imageSrc: string | null;
  bookIds?: string[];
}

interface HeroProps {
  data: Collection[];
}

interface CuratedCardProps {
  data: Collection[];
}

interface Receipts {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookTitle: string;
  createdAt?: Date | null;
}

type SelectUser = {
  userid: string;
  isSelected: boolean;
  name: string;
};
