"use client";

import React from "react";

export default function MobileSidebar({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <button
        aria-label="Close menu overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="font-semibold">Menu</div>
          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1 text-sm"
          >
            ✕
          </button>
        </div>

        <div className="h-[calc(100%-52px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
