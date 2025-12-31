"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import React Admin with SSR disabled
const AdminDashboard = dynamic(() => import("../../components/admin/ReactAdminDashboard"), { ssr: false });

export default function AdminPage() {
  return <AdminDashboard />;
}
