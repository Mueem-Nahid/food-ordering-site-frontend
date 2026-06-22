"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

const AdminDashboard = dynamic(() => import("../../components/admin/ReactAdminDashboard"), { ssr: false });

export default function AdminClient() {
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user?.userInfo);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const role = userInfo?.role;
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      router.replace("/");
    }
  }, [userInfo, router]);

  if (isAdmin === null) return null;

  return isAdmin ? <AdminDashboard /> : null;
}
