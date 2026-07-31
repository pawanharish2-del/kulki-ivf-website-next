import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/layout/BookingModal";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SchemaMarkup type="Clinic" />
      <Header />
      <main>{children}</main>
      <Footer />
      <BookingModal />
    </>
  );
}
