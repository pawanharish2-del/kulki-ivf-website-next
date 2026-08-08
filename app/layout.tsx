import type { Metadata } from "next";
import "./globals.css";
import LegacyInteractions from "@/components/layout/LegacyInteractions";

export const metadata: Metadata = {
  metadataBase: new URL("https://kulkiivfgroup.com"),
  title: "KULKI IVF Fertility & ART Centre | Jaipur",
  description:
    "Welcome to Kulki IVF Fertility & ART Center. Where Dreams of Parenthood Become Reality. Advanced fertility treatments in Jaipur.",
  keywords: "IVF Jaipur, KULKI IVF, fertility clinic Jaipur, ICSI IUI Jaipur, best IVF centre Jaipur",
  openGraph: {
    title: "KULKI IVF Fertility & ART Centre | Jaipur",
    description: "Advanced IVF, ICSI, IUI and fertility treatments in Jaipur.",
    type: "website",
    url: "https://kulkiivfgroup.com/",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KULKI IVF Fertility & ART Centre | Jaipur",
    description: "Advanced IVF, ICSI, IUI and fertility treatments in Jaipur.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/jpeg" href="/assets/images/feviconkulki.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </head>
      <body>
        <LegacyInteractions />
        {children}
      </body>
    </html>
  );
}
