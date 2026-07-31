import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleSchema {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}

interface SchemaMarkupProps {
  type: "Clinic" | "FAQ" | "Breadcrumb" | "Article" | "Procedure";
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  article?: ArticleSchema;
  procedureName?: string;
  procedureDescription?: string;
}

export default function SchemaMarkup({
  type,
  faqs,
  breadcrumbs,
  article,
  procedureName,
  procedureDescription,
}: SchemaMarkupProps) {
  if (type === "Clinic") {
    const clinicSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "Kulki IVF Fertility & ART Centre",
      url: "https://kulkiivfgroup.com",
      logo: "https://kulkiivfgroup.com/assets/images/logo.jpg",
      image: "https://kulkiivfgroup.com/assets/images/banner.jpg",
      description:
        "Kulki IVF Fertility & ART Centre is a premier fertility clinic in Jaipur specializing in advanced IVF treatments, ICSI, IUI, oocyte cryopreservation, and embryology services.",
      medicalSpecialty: "ReproductiveEndocrinology",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot No. 184, Nandpuri-B, Haldighati Marg, Pratap Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302033",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.790938,
        longitude: 75.819771,
      },
      telephone: "+91-9799979532",
      email: "info@kulkiivfgroup.com",
      openingHours: "Mo-Su 08:00-20:00",
      employee: [
        {
          "@type": "Physician",
          name: "Dr. Asha Sushawat",
          jobTitle: "IVF Specialist & Director",
        },
        {
          "@type": "Physician",
          name: "Dr. Aarti Soni",
          jobTitle: "Fertility Specialist",
        },
        {
          "@type": "Person",
          name: "Dr. Ssuniti",
          jobTitle: "Senior Embryologist",
        },
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
    );
  }

  if (type === "FAQ" && faqs && faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    );
  }

  if (type === "Breadcrumb" && breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `https://kulkiivfgroup.com${item.url}`,
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  if (type === "Article" && article) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: article.image.startsWith("http") ? article.image : `https://kulkiivfgroup.com${article.image}`,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        "@type": "Physician",
        name: article.authorName,
      },
      publisher: {
        "@type": "Organization",
        name: "Kulki IVF Fertility & ART Centre",
        logo: {
          "@type": "ImageObject",
          url: "https://kulkiivfgroup.com/assets/images/logo.jpg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": article.url.startsWith("http") ? article.url : `https://kulkiivfgroup.com${article.url}`,
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    );
  }

  if (type === "Procedure" && procedureName) {
    const procedureSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: procedureName,
      description: procedureDescription || `Advanced ${procedureName} fertility treatment at Kulki IVF Jaipur.`,
      procedureType: "NonSurgicalProcedure",
      bodyLocation: "Reproductive System",
      provider: {
        "@type": "MedicalClinic",
        name: "Kulki IVF Fertility & ART Centre",
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
    );
  }

  return null;
}
