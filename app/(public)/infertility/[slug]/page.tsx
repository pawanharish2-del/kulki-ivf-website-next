import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { infertilityData } from "@/lib/data/infertilityData";
import ServicePageClient from "@/components/pages/ServicePageClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(infertilityData)
    .filter((slug) => slug !== "overview")
    .map((slug) => ({
      slug,
    }));
}

export function generateMetadata({ params }: Props): Metadata {
  const data = infertilityData[params.slug];
  if (!data) return {};

  return {
    title: data.title || `${params.slug.replace(/-/g, " ")} | Kulki IVF`,
    description: data.description || `Learn about ${params.slug} at Kulki IVF Fertility & ART Centre in Jaipur.`,
    keywords: data.keywords || `${params.slug}, infertility treatment Jaipur, fertility clinic Rajasthan`,
    openGraph: {
      title: data.title || `${params.slug.replace(/-/g, " ")} | Kulki IVF`,
      description: data.description || `Learn about ${params.slug} at Kulki IVF in Jaipur.`,
      type: "website",
      url: `https://kulkiivfgroup.com/infertility/${params.slug}`,
      images: ["/assets/images/logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title || `${params.slug.replace(/-/g, " ")} | Kulki IVF`,
      description: data.description || `Learn about ${params.slug} at Kulki IVF in Jaipur.`,
      images: ["/assets/images/logo.jpg"],
    },
    alternates: {
      canonical: `https://kulkiivfgroup.com/infertility/${params.slug}`,
    },
  };
}

export default function InfertilitySubPage({ params }: Props) {
  const data = infertilityData[params.slug];
  if (!data) {
    notFound();
  }

  return <ServicePageClient data={data} breadcrumbCategory="Infertility" breadcrumbLink="/infertility" />;
}
