import React from "react";
import type { Metadata } from "next";
import AboutClient from "@/components/pages/AboutClient";

export const metadata: Metadata = {
  title: "About Us | KULKI IVF Fertility & ART Centre | Jaipur",
  description:
    "Learn about Kulki IVF Fertility & ART Center, our vision, mission, and the expert team of doctors dedicated to fulfilling your dream of parenthood.",
  keywords: "About KULKI IVF, IVF Doctors Jaipur, fertility specialists Jaipur",
  openGraph: {
    title: "About Us | KULKI IVF Fertility & ART Centre",
    description: "Meet our expert team of fertility specialists and learn about our mission.",
    type: "website",
    url: "https://kulkiivfgroup.com/about",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | KULKI IVF Fertility & ART Centre",
    description: "Meet our expert team of fertility specialists and learn about our mission.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
