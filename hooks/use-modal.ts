"use client";

import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [resolver, setResolver] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolver({ resolve });
    });
  };

  const handleClose = (value: boolean) => {
    setIsOpen(false);
    resolver?.resolve(value);
  };

  return { isOpen, setIsOpen, confirm, handleClose };
}
