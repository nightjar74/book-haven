import React from "react";
import {
  ArrowLeft,
  Archive,
  Trash2,
  Mail,
  Clock,
  MoreVertical,
  Star,
  Reply,
  Forward,
  Printer,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function page() {
  // Static data for demonstration
  const email = {
    subject: "New v4.0 is out! - Tailwind CSS",
    sender: "Tailwind CSS",
    senderEmail: "newsletter@tailwindcss.com",
    avatar: "T",
    time: "Jan 22, 2025, 10:30 AM",
    content: `
      <p>Hi there,</p>
      <p>We are excited to announce that <strong>Tailwind CSS v4.0</strong> is finally here! This version brings a high-performance engine, zero-configuration setup, and first-class CSS variables support.</p>
      <p>Check out the documentation for migration guides and new features.</p>
      <p>Best,<br/>The Tailwind Team</p>
    `,
  };

  return (
    <div className="min-h-screen bg-white text-sm text-gray-800">
      {/* --- ACTION BAR --- */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <div className="flex items-center gap-4">
            <Archive className="w-4 h-4 text-gray-600 cursor-pointer hover:text-black" />
            <Trash2 className="w-4 h-4 text-gray-600 cursor-pointer hover:text-black" />
            <Mail className="w-4 h-4 text-gray-600 cursor-pointer hover:text-black" />
            <Clock className="w-4 h-4 text-gray-600 cursor-pointer hover:text-black" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">1 of 1,240</span>
          <MoreVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* --- EMAIL CONTENT --- */}
      <div className="max-w-5xl mx-auto px-8 py-6">
        {/* Subject Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-normal text-gray-900 ml-14">
            {email.subject}
          </h1>
          <div className="flex gap-4">
            <Printer className="w-4 h-4 text-gray-500 cursor-pointer" />
            <ExternalLink className="w-4 h-4 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Sender Info */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold shrink-0">
              {email.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{email.sender}</span>
                <span className="text-xs text-gray-500">{`<${email.senderEmail}>`}</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                to me
                <MoreVertical className="w-3 h-3 inline cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{email.time}</span>
            <Star className="w-4 h-4 text-gray-400 cursor-pointer" />
            <Reply className="w-4 h-4 text-gray-400 cursor-pointer" />
            <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Body */}
        <div
          className="ml-14 text-sm leading-relaxed text-gray-800 space-y-4"
          dangerouslySetInnerHTML={{ __html: email.content }}
        />

        {/* Reply/Forward Buttons */}
        <div className="ml-14 mt-12 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-medium">
            <Reply className="w-4 h-4" />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
