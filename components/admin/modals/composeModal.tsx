"use client";

import React, { useEffect, useState } from "react";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { handleReplyEmail } from "@/lib/actions/email";
import useAutofill from "@/hooks/useAutofill";
import ComposeForm from "../composefrom";
import ComposeFooter from "../composefooter";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
  bookTitle: string;
}

const ComposeModal: React.FC<ComposeModalProps> = ({
  isOpen,
  onClose,
  recipientEmail,
  bookTitle,
}) => {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [focused, setFocused] = useState(false);

  const [formData, setFormData] = useState({
    subject: `Regarding your request for ${bookTitle}`,
    message: "",
  });

  useAutofill(
    () => {
      updateField(
        "message",
        `Hi ${recipientEmail}, we have a copy of ${bookTitle} that you can borrow.`,
      );
    },
    isOpen,
    focused,
  );

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const handleSend = async () => {
    setStatus("sending");
    try {
      await handleReplyEmail({
        email: "email",
        subject: `Update on your borrow request: ${bookTitle}`,
        message: `
          <p>Hi there,</p>
          <p>${formData.message}</p>
          <hr />
          <p>Sent via Book Library App</p>
        `,
      });

      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData((prev) => ({ ...prev, message: "" }));
      }, 2000);
    } catch (error) {
      alert("Error sending through QStash");
      setStatus("idle");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">Reply to Request</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <ComposeForm
          recipientEmail={recipientEmail}
          bookTitle={bookTitle}
          subject={formData.subject}
          message={formData.message}
          onSubjectChange={(value) => updateField("subject", value)}
          onMessageChange={(value) => updateField("message", value)}
          onFocus={setFocused}
        />

        <ComposeFooter
          status={status}
          onClose={onClose}
          message={formData.message}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
};

export default ComposeModal;
