import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const treatmentsDir = path.join(process.cwd(), "legacy_source/pages/treatments");
const infertilityDir = path.join(process.cwd(), "legacy_source/pages/infertility");
const locationsDir = path.join(process.cwd(), "legacy_source/location-pages");
const outputDir = path.join(process.cwd(), "lib/data");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function cleanUrl(url: string | undefined): string {
  if (!url) return "/assets/images/aboutimg.jpg";
  let cleaned = url.replace(/^(..\/)+/, "/");
  if (!cleaned.startsWith("/")) cleaned = "/" + cleaned;
  return cleaned;
}

function extractPageData(filePath: string, slug: string, category: "treatment" | "infertility" | "location") {
  const html = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(html);

  const title = $("title").text().trim() || `${slug} | Kulki IVF`;
  const description = $("meta[name='description']").attr("content") || "";
  const keywords = $("meta[name='keywords']").attr("content") || "";

  // Hero
  const heroTitle = $("h1.page-hero-title, h1.hero-title").first().text().trim() || slug;
  const heroStyle = $(".page-hero, .hero").attr("style") || "";
  const bgMatch = heroStyle.match(/url\(['"]?(.*?)['"]?\)/);
  const heroImg = cleanUrl(bgMatch ? bgMatch[1] : $("section.hero img, .page-hero img").attr("src"));

  // Key takeaways
  const takeaways: string[] = [];
  $("div[style*='background: var(--blush)'] ul li, div[style*='background: #fdfafb'] ul li").each((_, el) => {
    takeaways.push($(el).html() || $(el).text());
  });

  // Main Section Title & Geo Summary
  const mainTitleEl = $("h1.section-title, h2.section-title.text-center").not("footer .section-title, section.bg-ink .section-title").first();
  const mainTitle = mainTitleEl.html() || mainTitleEl.text() || heroTitle;
  const geoSummary = $(".geo-summary p").html() || $(".hero-desc").html() || "";

  // Bottom Card
  const bottomCardEl = $("div[style*='linear-gradient(135deg'], div.rv[style*='linear-gradient']").first();
  let bottomCard: any = null;
  if (bottomCardEl.length > 0) {
    const bTitle = bottomCardEl.find("h3").html() || bottomCardEl.find("h3").text();
    const bText = bottomCardEl.find("p").first().html() || bottomCardEl.find("p").first().text();
    const bImg = bottomCardEl.find("img").attr("src");
    const bBtn = bottomCardEl.find("a.btn, button.btn").first();
    const buttonText = bBtn.text().trim() || "Contact Us Today";
    const buttonLink = cleanUrl(bBtn.attr("href") || "/contact");
    if (bTitle && bText) {
      bottomCard = {
        title: bTitle.trim(),
        text: bText.trim(),
        image: cleanUrl(bImg || "/assets/images/hero_family.png"),
        buttonText,
        buttonLink,
      };
    }
  }

  // Contact Card
  const contactCardEl = $(".contact-card").first();
  let contactCard: any = null;
  if (contactCardEl.length > 0) {
    const cTitle = contactCardEl.find("h3").html() || contactCardEl.find("h3").text() || "Schedule Your Appointment";
    const subtitle = contactCardEl.find("> p, .service-desc, p").first().html() || contactCardEl.find("> p, .service-desc, p").first().text() || "Visit Kulki IVF Fertility & ART Centre to learn more about our services.";
    let address = "";
    let phone = "";
    contactCardEl.find("p").each((_, p) => {
      const text = $(p).text();
      if (text.includes("Address:")) {
        address = $(p).html() || text;
      } else if (text.includes("Phone:")) {
        phone = $(p).html() || text;
      }
    });
    if (!address) address = '<i class="fa-solid fa-location-dot text-rose"></i> <strong>Address:</strong> Plot No 184, Nandpuri-B, Pratap Nagar, JAIPUR 302033';
    if (!phone) phone = '<i class="fa-solid fa-phone text-rose"></i> <strong>Phone:</strong> 9799979532, 9799979533';
    contactCard = {
      title: cTitle.trim(),
      subtitle: subtitle.trim(),
      address: address.trim(),
      phone: phone.trim(),
    };
  }

  // CTA Banner
  const ctaEl = $("section.section-padding.bg-ink").first();
  let ctaBanner: any = null;
  if (ctaEl.length > 0) {
    const ctaTitle = ctaEl.find(".section-title").html() || ctaEl.find(".section-title").text() || "Ready to Start Your Journey?";
    const subtitle = ctaEl.find(".section-subtitle").html() || ctaEl.find(".section-subtitle").text() || "Book a consultation with our experts today and take the first step towards parenthood.";
    const buttonText = ctaEl.find(".btn").text().trim() || "Book Appointment";
    ctaBanner = {
      title: ctaTitle.trim(),
      subtitle: subtitle.trim(),
      buttonText,
    };
  }

  // Blocks (for treatment / infertility)
  const blocks: any[] = [];
  $(".grid-2").each((_, el) => {
    if ($(el).closest("div[style*='linear-gradient(135deg'], div.rv[style*='linear-gradient'], .contact-card, footer, .page-hero, section.bg-ink").length > 0) {
      return;
    }
    const $el = $(el);
    const img = $el.find("img").attr("src");
    const tag = $el.find(".section-tag").text().trim();
    const h3 = $el.find("h3").first().text().trim();
    const p = $el.find("p").first().html() || $el.find("p").first().text();
    const checklist: string[] = [];
    $el.find(".checklist li").each((_, li) => {
      checklist.push($(li).html() || $(li).text());
    });
    if (h3 && p) {
      blocks.push({
        image: cleanUrl(img),
        tag,
        title: h3,
        text: p,
        checklist,
      });
    }
  });

  // Location pages long text / paragraphs
  let locationContent = "";
  if (category === "location") {
    const container = $("section.section-padding.bg-white .container .rv, section.section-padding.bg-white .container").first();
    const clone = container.clone();
    clone.find("h2").first().remove();
    clone.find("h3:contains('Frequently Asked Questions')").remove();
    clone.find(".faq-item, div:has(> h4:contains('?'))").remove();
    clone.find("div[style*='linear-gradient(135deg'], .contact-card").remove();
    locationContent = clone.html() || "";
  }

  // FAQs
  const faqs: { question: string; answer: string }[] = [];
  $(".faq-item").each((_, el) => {
    const q = $(el).find(".faq-question, button").text().replace(/\s+/g, " ").trim().replace(/\+$/, "").trim();
    const $answerEl = $(el).find(".faq-answer");
    let a = "";
    if ($answerEl.find("p").length > 0) {
      const pTexts: string[] = [];
      $answerEl.find("p").each((_, p) => {
        const text = ($(p).html() || $(p).text()).trim();
        if (text && !pTexts.includes(text)) {
          pTexts.push(text);
        }
      });
      a = pTexts.join(" ");
    } else {
      a = ($answerEl.html() || $answerEl.text()).trim();
    }
    if (q && a) {
      faqs.push({ question: q, answer: a });
    }
  });

  // Also check numbered FAQs in location pages
  if (category === "location" && faqs.length === 0) {
    $("div:has(> h4)").each((_, el) => {
      const q = $(el).find("h4").text().trim();
      const a = $(el).find("p").text().trim();
      if (q && a && q.includes("?")) {
        faqs.push({ question: q.replace(/^\d+\.\s*/, ""), answer: a });
      }
    });
  }

  return {
    slug,
    title,
    description,
    keywords,
    heroTitle,
    heroImg,
    takeaways,
    mainTitle,
    geoSummary,
    blocks,
    locationContent,
    faqs,
    bottomCard,
    contactCard,
    ctaBanner,
  };
}

// 1. Treatments
const treatmentsFiles = fs.readdirSync(treatmentsDir).filter((f) => f.endsWith(".html"));
const treatmentsData: Record<string, any> = {};
for (const file of treatmentsFiles) {
  const slug = file.replace(".html", "");
  treatmentsData[slug] = extractPageData(path.join(treatmentsDir, file), slug, "treatment");
}
fs.writeFileSync(
  path.join(outputDir, "treatmentsData.ts"),
  `export const treatmentsData: Record<string, any> = ${JSON.stringify(treatmentsData, null, 2)};\n`
);
console.log(`Saved ${treatmentsFiles.length} treatments to treatmentsData.ts`);

// 2. Infertility
const infertilityFiles = fs.readdirSync(infertilityDir).filter((f) => f.endsWith(".html"));
const infertilityData: Record<string, any> = {};
for (const file of infertilityFiles) {
  const slug = file.replace(".html", "");
  infertilityData[slug] = extractPageData(path.join(infertilityDir, file), slug, "infertility");
}
const mainInfertilityPath = path.join(process.cwd(), "legacy_source/pages/infertility.html");
if (fs.existsSync(mainInfertilityPath)) {
  infertilityData["overview"] = extractPageData(mainInfertilityPath, "overview", "infertility");
}
fs.writeFileSync(
  path.join(outputDir, "infertilityData.ts"),
  `export const infertilityData: Record<string, any> = ${JSON.stringify(infertilityData, null, 2)};\n`
);
console.log(`Saved infertility pages to infertilityData.ts`);

// 3. Locations
const locationFiles = fs.readdirSync(locationsDir).filter((f) => f.endsWith(".html"));
const locationsData: Record<string, any> = {};
for (const file of locationFiles) {
  const slug = file.replace(".html", "");
  locationsData[slug] = extractPageData(path.join(locationsDir, file), slug, "location");
}
fs.writeFileSync(
  path.join(outputDir, "locationsData.ts"),
  `export const locationsData: Record<string, any> = ${JSON.stringify(locationsData, null, 2)};\n`
);
console.log(`Saved ${locationFiles.length} location pages to locationsData.ts`);
