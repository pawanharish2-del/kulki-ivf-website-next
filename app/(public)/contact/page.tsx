import React from "react";
import type { Metadata } from "next";
import ContactClient from "@/components/pages/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | KULKI IVF Fertility & ART Centre | Jaipur",
  description:
    "Contact Kulki IVF Fertility & ART Center in Jaipur. Book an appointment or reach out for inquiries regarding our IVF and fertility treatments.",
  keywords: "Contact KULKI IVF, fertility clinic near me, IVF center Jaipur contact",
  openGraph: {
    title: "Contact Us | KULKI IVF Fertility & ART Centre",
    description: "Reach out to Kulki IVF in Jaipur to start your fertility journey.",
    type: "website",
    url: "https://kulkiivfgroup.com/contact",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | KULKI IVF Fertility & ART Centre",
    description: "Reach out to Kulki IVF in Jaipur to start your fertility journey.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
