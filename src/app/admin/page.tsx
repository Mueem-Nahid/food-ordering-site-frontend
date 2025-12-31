"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Dynamically import React Admin with SSR disabled
const AdminDashboard = dynamic(() => import("../../components/admin/ReactAdminDashboard"), { ssr: false });

export default function AdminPage() {
  const router = useRouter();
  const userInfo = useSelector((state: any) => state.user?.userInfo);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let role = userInfo?.role;
    // Fallback to localStorage if Redux is not hydrated
    if (!role && typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          role = userObj?.userInfo?.role;
        } catch {}
      }
    }
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      router.replace("/"); // Redirect non-admins to home
    }
  }, [userInfo, router]);

  if (isAdmin === null) return null; // Or a loading spinner

  return isAdmin ? <AdminDashboard /> : null;
}
