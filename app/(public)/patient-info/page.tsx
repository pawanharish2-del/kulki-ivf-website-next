import React from "react";
import type { Metadata } from "next";
import PatientInfoClient from "@/components/pages/PatientInfoClient";

export const metadata: Metadata = {
  title: "Patient Information | KULKI IVF",
  description:
    "Essential information for new patients visiting Kulki IVF. What to bring, how to prepare, and details about our financial and insurance guidance.",
  keywords: "Kulki IVF patient info, first fertility consultation Jaipur, IVF financing Jaipur",
  openGraph: {
    title: "Patient Information | KULKI IVF",
    description: "Essential information for new patients visiting Kulki IVF. What to bring, how to prepare, and financial guidance.",
    type: "website",
    url: "https://kulkiivfgroup.com/patient-info",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patient Information | KULKI IVF",
    description: "Essential information for new patients visiting Kulki IVF.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/patient-info",
  },
};

export default function PatientInfoPage() {
  return <PatientInfoClient />;
}
