"use client";
import React, { useEffect, useRef } from "react";

const NotFoundPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angleRad = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX,
      );
      const angleDeg = angleRad * (180 / Math.PI);
      console.log(angleDeg);

      eyeRefs.current.forEach((eye) => {
        if (eye) {
          eye.style.transform = `rotate(${angleDeg + 55}deg)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white md:overflow-hidden overflow-y-scroll">
      <div className="z-50 text-center space-y-10">
        <div ref={containerRef} className="flex justify-center gap-10 py-10">
          {[0, 1].map((index) => (
            <div
              key={index}
              ref={(el) => {
                eyeRefs.current[index] = el;
              }}
              className="relative h-40 w-40 rounded-full bg-white shadow-2xl ease-out will-change-transform"
            >
              <div className="hidden md:block absolute top-[12%] right-4 h-[100px] w-[100px] -translate-y-[12%] rounded-full bg-slate-900" />
              <div className="md:hidden absolute top-[12%] right-4 h-[100px] w-[100px] -translate-y-[12%] rounded-full bg-slate-900" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xl text-slate-400 font-medium">
            404 - Page Not Found. The page you are looking for might have been
            <br />
            removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <a
          href="/"
          className="inline-block rounded-full bg-indigo-600 px-10 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          Take Me Home
        </a>
      </div>
      <h1 className="hidden md:block absolute z-0 top-0 left-0 text-[850px] leading-none font-black tracking-tighter text-slate-800 select-none">
        404
      </h1>
      <h1 className="md:hidden flex flex-col absolute z-0 top-0 left-0 text-[300px] leading-none font-black tracking-tighter text-slate-800 select-none">
        <span>4</span>
        <span className="w-screen pl-[25%]">0</span>
        <span className="w-screen pl-[50%]">4</span>
      </h1>
    </main>
  );
};

export default NotFoundPage;
