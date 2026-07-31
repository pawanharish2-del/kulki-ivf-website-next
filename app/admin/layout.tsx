import React from "react";
import type { Metadata } from "next";
import AdminAuthProvider from "@/components/admin/AdminAuthProvider";
import AdminClientLayout from "@/components/admin/AdminClientLayout";

export const metadata: Metadata = {
  title: "Admin Portal | Kulki IVF CMS",
  description: "Content Management System for Kulki IVF Fertility & ART Centre.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminClientLayout>{children}</AdminClientLayout>
    </AdminAuthProvider>
  );
}
