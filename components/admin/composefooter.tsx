import { CheckCircle2, Loader2, Send } from "lucide-react";
import React, { Dispatch } from "react";

type Props = {
  status: "idle" | "sending" | "success";
  onClose: () => void;
  message: string;
  handleSend: () => Promise<void>;
};

const ComposeFooter = ({ status, onClose, message, handleSend }: Props) => {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
      <button
        disabled={status !== "idle"}
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-0"
      >
        Cancel
      </button>

      <button
        disabled={status !== "idle" || !message}
        onClick={handleSend}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20 
                  ${status === "success" ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}
                  disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === "idle" && (
          <>
            <Send size={16} /> Send
          </>
        )}
        {status === "sending" && (
          <>
            <Loader2 className="animate-spin" size={16} /> Dispatching...
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 size={16} /> Sent!
          </>
        )}
      </button>
    </div>
  );
};

export default ComposeFooter;
