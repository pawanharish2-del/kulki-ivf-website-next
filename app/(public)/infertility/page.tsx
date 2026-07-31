import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { infertilityData } from "@/lib/data/infertilityData";
import ServicePageClient from "@/components/pages/ServicePageClient";

export const metadata: Metadata = {
  title: "Infertility Overview & Treatments | KULKI IVF Jaipur",
  description: "Understand the causes of male and female infertility. Explore diagnostic testing, semen analysis, and advanced reproductive solutions at Kulki IVF.",
  keywords: "infertility clinic Jaipur, causes of infertility, IVF diagnosis Rajasthan",
  openGraph: {
    title: "Infertility Overview & Treatments | KULKI IVF",
    description: "Understand the causes of male and female infertility at Kulki IVF.",
    type: "website",
    url: "https://kulkiivfgroup.com/infertility",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/infertility",
  },
};

export default function InfertilityOverviewPage() {
  const data = infertilityData["overview"] || infertilityData["female-infertility"];
  if (!data) notFound();

  return <ServicePageClient data={data} breadcrumbCategory="Infertility" breadcrumbLink="/infertility" />;
}
