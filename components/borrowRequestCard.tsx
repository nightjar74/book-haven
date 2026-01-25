"use client";
import React, { useState } from "react";
import ComposeModal from "./admin/modals/composeModal";
import BookIcon from "./ui/bookIcon";
import { Content } from "@radix-ui/react-dialog";
import ContentSection from "./ui/requestCardContent";
import { Button } from "./ui/button";

interface BorrowRequestProps {
  title: string;
  author: string;
  publisher: string;
  requester: string;
}

const BorrowRequestCard: React.FC<BorrowRequestProps> = ({
  title,
  author,
  publisher,
  requester,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onReply() {
    setIsModalOpen(true);
  }
  return (
    <div className="md:flex md:flex-col max-w-sm w-[384px] min-h-[350px] md:h-[400px] h-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-hover hover:shadow-md">
      <ComposeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipientEmail={requester}
        bookTitle={title}
      />
      <BookIcon />
      <ContentSection
        title={title}
        author={author}
        publisher={publisher}
        requester={requester}
      />
      <Button
        onClick={onReply}
        className="mt-6 md:mt-auto w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Reply to Request
      </Button>
    </div>
  );
};

export default BorrowRequestCard;
