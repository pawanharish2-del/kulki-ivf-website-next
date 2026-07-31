import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locationsData } from "@/lib/data/locationsData";
import LocationPageClient from "@/components/pages/LocationPageClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(locationsData).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const data = locationsData[params.slug];
  if (!data) return {};

  const cityName = params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: data.title || `Best IVF Center in ${cityName} | Kulki IVF Jaipur`,
    description: data.description || `Looking for the Best IVF Center or top fertility doctor for ${cityName}? Kulki IVF offers advanced fertility care with high success rates.`,
    keywords: data.keywords || `IVF center ${cityName}, fertility clinic ${cityName}, IVF hospital ${cityName}, IVF doctor ${cityName}`,
    openGraph: {
      title: data.title || `Best IVF Center in ${cityName} | Kulki IVF`,
      description: data.description || `Looking for the Best IVF Center for ${cityName}? Choose Kulki IVF.`,
      type: "website",
      url: `https://kulkiivfgroup.com/locations/${params.slug}`,
      images: ["/assets/images/logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title || `Best IVF Center in ${cityName} | Kulki IVF`,
      description: data.description || `Looking for the Best IVF Center for ${cityName}? Choose Kulki IVF.`,
      images: ["/assets/images/logo.jpg"],
    },
    alternates: {
      canonical: `https://kulkiivfgroup.com/locations/${params.slug}`,
    },
  };
}

export default function LocationPage({ params }: Props) {
  const data = locationsData[params.slug];
  if (!data) {
    notFound();
  }

  return <LocationPageClient data={data} />;
}
