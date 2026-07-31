import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { treatmentsData } from "@/lib/data/treatmentsData";
import ServicePageClient from "@/components/pages/ServicePageClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(treatmentsData).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const data = treatmentsData[params.slug];
  if (!data) return {};

  return {
    title: data.title || `${params.slug.replace(/-/g, " ")} | Kulki IVF`,
    description: data.description || `Learn about ${params.slug} at Kulki IVF Fertility & ART Centre in Jaipur.`,
    keywords: data.keywords || `${params.slug}, IVF Jaipur, fertility clinic Rajasthan`,
    openGraph: {
      title: data.title || `${params.slug.replace(/-/g, " ")} | Kulki IVF`,
      description: data.description || `Learn about ${params.slug} at Kulki IVF in Jaipur.`,
      type: "website",
      url: `https://kulkiivfgroup.com/treatments/${params.slug}`,
      images: ["/assets/images/logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title || `${params.slug.replace(/-/g, " ")} | Kulki IVF`,
      description: data.description || `Learn about ${params.slug} at Kulki IVF in Jaipur.`,
      images: ["/assets/images/logo.jpg"],
    },
    alternates: {
      canonical: `https://kulkiivfgroup.com/treatments/${params.slug}`,
    },
  };
}

export default function TreatmentPage({ params }: Props) {
  const data = treatmentsData[params.slug];
  if (!data) {
    notFound();
  }

  return <ServicePageClient data={data} breadcrumbCategory="Treatments" breadcrumbLink="/treatments/ivf" />;
}
