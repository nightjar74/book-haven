import React, { Dispatch, SetStateAction } from "react";

type Props = {
  recipientEmail: string;
  bookTitle: string;
  subject: string;
  message: string;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onFocus: (focused: boolean) => void;
};

const ComposeForm = ({
  recipientEmail,
  bookTitle,
  subject,
  message,
  onSubjectChange,
  onMessageChange,
  onFocus,
}: Props) => {
  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
          To
        </label>
        <div className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 font-medium">
          {recipientEmail}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
          Message
        </label>
        <textarea
          rows={5}
          placeholder={`Hi ${recipientEmail}, we have a copy of ${bookTitle} that you can borrow... press tab to autofill`}
          value={message}
          onFocus={() => onFocus(true)}
          onBlur={() => onFocus(false)}
          onChange={(e) => onMessageChange(e.target.value)}
          className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ComposeForm;
