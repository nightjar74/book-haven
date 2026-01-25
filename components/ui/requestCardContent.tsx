import React from "react";

type Props = {
  title: string;
  author: string;
  publisher: string;
  requester: string;
};

const ContentSection = ({ title, author, publisher, requester }: Props) => {
  return (
    <>
      <div className="space-y-5">
        <h2 className="text-md text-slate-600 leading-tight">
          From: {requester}
        </h2>
        <h3 className="text-xl font-bold text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-600">
          by <span className="text-slate-900">{author}</span>
        </p>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400 uppercase font-semibold">
          Publisher
        </p>
        <p className="text-sm text-slate-700">{publisher}</p>
      </div>
    </>
  );
};

export default ContentSection;
