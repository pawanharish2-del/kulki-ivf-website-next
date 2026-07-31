import React from "react";
import type { Metadata } from "next";
import GalleryClient from "@/components/pages/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | KULKI IVF Fertility & ART Centre | Jaipur",
  description:
    "Explore the photos of Kulki IVF Fertility & ART Centre in Jaipur. View our advanced laboratory setup, clinic interior, and happy families.",
  keywords: "Kulki IVF Gallery, IVF lab Jaipur photos, fertility clinic pictures Jaipur",
  openGraph: {
    title: "Gallery | KULKI IVF Fertility & ART Centre",
    description: "View our advanced laboratory setup, clinic interior, and happy families.",
    type: "website",
    url: "https://kulkiivfgroup.com/gallery",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | KULKI IVF Fertility & ART Centre",
    description: "View our advanced laboratory setup, clinic interior, and happy families.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
