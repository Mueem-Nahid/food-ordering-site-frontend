"use client";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* You can add a custom admin header/sidebar here */}
      {children}
    </div>
  );
}
