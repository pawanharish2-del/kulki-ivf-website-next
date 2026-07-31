import type { Metadata } from "next";
import HomeClient from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Best IVF Centre in Jaipur | Kulki IVF Fertility & ART Centre - No.1 Fertility Treatment in Rajasthan",
  description:
    "Discover why Kulki IVF is celebrated as the Best IVF Centre in Jaipur. Read about our No.1 Fertility Treatment in Rajasthan, expert embryologists, and state-of-the-art tech.",
  keywords:
    "Best IVF Centre in Jaipur, Kulki IVF, No.1 Fertility Treatment in Rajasthan, IVF hospital Jaipur, fertility clinic Rajasthan, top IVF specialist Jaipur, ICSI clinic Jaipur, IUI treatment Rajasthan",
  openGraph: {
    title: "Best IVF Centre in Jaipur | Kulki IVF - No.1 Fertility Treatment in Rajasthan",
    description: "Looking for the Best IVF Centre in Jaipur? Choose Kulki IVF for the No.1 Fertility Treatment in Rajasthan. High success rates and ethical care.",
    type: "website",
    url: "https://kulkiivfgroup.com/",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best IVF Centre in Jaipur | Kulki IVF",
    description: "Find success with Rajasthan's premier IVF and fertility clinic, Kulki IVF Centre in Jaipur.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
