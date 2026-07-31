const fs = require('fs');
const path = require('path');

const cities = [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", 
    "Bikaner", "Alwar", "Bharatpur", "Sikar", "Bhilwara", 
    "Pali", "Sri Ganganagar", "Hanumangarh", "Barmer", "Chittorgarh", 
    "Nagaur", "Jhunjhunu", "Tonk", "Sawai Madhopur", "Jaisalmer"
];

const baseDir = "c:/Users/USER/Downloads/kulki ivf website";
const indexPath = path.join(baseDir, "index.html");
const outDir = path.join(baseDir, "location-pages");

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const indexHtml = fs.readFileSync(indexPath, "utf-8");

// Split the index.html to get header and footer
const headSplit = indexHtml.split("</head>");
let headPart = headSplit[0];
const restOfHtml = headSplit[1];

const bodySplit = restOfHtml.split("<!-- Footer -->");
let headerPart = bodySplit[0].split("<!-- Hero Section -->")[0]; 
let footerPart = "<!-- Footer -->" + bodySplit[1];

function fixLinks(content) {
    content = content.replace(/href="assets\//g, 'href="../assets/');
    content = content.replace(/src="assets\//g, 'src="../assets/');
    content = content.replace(/href="pages\//g, 'href="../pages/');
    content = content.replace(/href="blogs\//g, 'href="../blogs/');
    content = content.replace(/href="style\.css/g, 'href="../style.css');
    content = content.replace(/src="script\.js/g, 'src="../script.js');
    return content;
}

headPart = fixLinks(headPart);
headerPart = fixLinks(headerPart);
footerPart = fixLinks(footerPart);

const contentTemplate = `
  <!-- Hero Section -->
  <section class="hero" style="min-height: 60vh;">
    <div class="hero-content">
      <h1 class="hero-title rv">Best IVF Center in <span class="text-rose">{city}</span></h1>
      <p class="tagline rv d-1" style="margin-bottom: 16px;">"Your Journey to Parenthood Starts Here"</p>
      <p class="hero-desc rv d-2">Are you looking for the top fertility clinic or the best IVF doctor in {city}? Kulki IVF offers advanced, personalized fertility treatments to help you achieve your dream of starting a family.</p>
      <div class="hero-cta-group rv d-3">
        <a href="../pages/contact.html" class="btn btn-primary">Consult Our Experts</a>
        <a href="tel:9799979532" class="btn btn-dark">9799979532</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="https://loremflickr.com/800/600/newborn,baby?lock={i}" alt="Best IVF Center in {city} - Newborn Baby">
    </div>
  </section>

  <section class="section-padding bg-white">
    <div class="container">
      <div class="rv" style="max-width: 1000px; margin: 0 auto; line-height: 1.8; font-size: 1.05rem;">
        <h2 style="font-size: 2.5rem; color: var(--plum); margin-bottom: 24px;">Welcome to the Best IVF Hospital in {city}</h2>
        <p>If you are struggling with infertility and seeking the <strong>best IVF center in {city}</strong>, Kulki IVF Fertility & ART Centre provides world-class fertility care right at your doorstep. We understand that the journey to parenthood can be emotionally and physically challenging. That is why our dedicated team of renowned fertility specialists, experienced embryologists, and compassionate nursing staff work tirelessly to offer the most effective and affordable IVF treatments in {city}. With a deep commitment to ethical practices, transparency, and advanced reproductive technology, we have established ourselves as the top fertility clinic in {city}.</p>
        
        <p>Infertility affects millions of couples worldwide, and finding the right clinic is the most crucial step towards success. At our facility, you are not just a patient; you are family. We prioritize personalized care, recognizing that every couple’s medical history and fertility challenges are unique. When you search for the <strong>best IVF doctor in {city}</strong>, you will find that our medical directors bring decades of specialized experience in reproductive endocrinology, advanced laparoscopy, and assisted reproductive technologies (ART). Our clinic features state-of-the-art embryology labs equipped with the latest incubators, micromanipulators, and HEPA-filtered clean rooms to ensure the optimal environment for embryo development.</p>
        
        <p>Choosing the best IVF hospital in {city} means choosing a center with a proven track record of high success rates. Our comprehensive diagnostic approach allows us to pinpoint the exact cause of infertility, whether it is <a href="../pages/infertility/male-infertility.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">male factor infertility</a> (such as low sperm count or poor motility), <a href="../pages/infertility/female-infertility.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">female factor infertility</a> (like blocked fallopian tubes, endometriosis, or polycystic ovary syndrome - PCOS), or unexplained infertility. We then tailor a precise treatment protocol, ranging from simple ovulation induction to advanced techniques like ICSI and genetic testing, maximizing your chances of taking home a healthy baby.</p>

        <h3 style="font-size: 2rem; color: var(--plum); margin-top: 40px; margin-bottom: 20px;">Comprehensive Fertility Treatments in {city}</h3>
        <p>As the leading fertility center in {city}, we offer an extensive array of fertility treatments under one roof. Our goal is to provide a holistic and seamless experience for our patients, minimizing stress and maximizing results. Our core services include In Vitro Fertilization (IVF), Intrauterine Insemination (IUI), Intracytoplasmic Sperm Injection (ICSI), Blastocyst Transfer, Laser Assisted Hatching, and Preimplantation Genetic Testing (PGT).</p>

        <p><strong><a href="../pages/treatments/ivf.html" style="color: inherit; text-decoration: none;">In Vitro Fertilization (IVF)</a>:</strong> IVF is the cornerstone of modern fertility treatments. For patients in {city} facing severe tubal issues, endometriosis, or unexplained infertility, <a href="../pages/treatments/ivf.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">IVF</a> offers the highest per-cycle success rates. The process involves stimulating the ovaries to produce multiple eggs, retrieving them under ultrasound guidance, and fertilizing them with sperm in our advanced laboratory. The resulting embryos are carefully monitored by our expert embryologists before the healthiest ones are transferred back into the uterus.</p>

        <p><strong><a href="../pages/treatments/icsi.html" style="color: inherit; text-decoration: none;">Intracytoplasmic Sperm Injection (ICSI)</a>:</strong> For couples dealing with severe male infertility, <a href="../pages/treatments/icsi.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">ICSI</a> is a game-changer. Rather than mixing eggs and sperm in a dish and waiting for fertilization to occur naturally, our highly skilled embryologists in {city} inject a single, healthy sperm directly into the cytoplasm of the mature egg. This technique dramatically increases fertilization rates and is a standard protocol for patients with low sperm count, poor morphology, or those who have had previous failed IVF cycles.</p>

        <p><strong><a href="../pages/treatments/iui.html" style="color: inherit; text-decoration: none;">Intrauterine Insemination (IUI)</a>:</strong> Often recommended as a first-line treatment for mild male factor infertility, cervical mucus issues, or unexplained infertility, <a href="../pages/treatments/iui.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">IUI</a> is a less invasive and more affordable option. During this procedure at our {city} clinic, highly washed and concentrated sperm is placed directly into the uterus around the time of ovulation, facilitating fertilization. We often combine IUI with ovulation induction medications to improve success rates.</p>

        <h3 style="font-size: 2rem; color: var(--plum); margin-top: 40px; margin-bottom: 20px;">Why We Are the Top IVF Clinic in {city}</h3>
        <p>What sets Kulki IVF apart as the top IVF clinic in {city}? It is our unwavering dedication to clinical excellence, patient-centric care, and technological superiority. Our embryology laboratory is designed to international standards, utilizing Class 100 cleanroom technology. This meticulously controlled environment regulates air quality, temperature, and humidity, ensuring that your embryos develop in conditions that closely mimic the natural uterine environment.</p>

        <p>Furthermore, our team of the <strong>best IVF doctors in {city}</strong> continuously updates their knowledge and techniques by participating in global fertility conferences and research. We believe in evidence-based medicine and strictly adhere to international guidelines. From the initial consultation to the exciting day of your positive pregnancy test, you will experience transparent communication. We provide clear explanations of your diagnosis, the proposed treatment plan, and a detailed breakdown of the costs involved, ensuring there are no hidden surprises.</p>

        <p>Patient comfort and emotional well-being are at the core of our philosophy. Dealing with infertility can take a toll on mental health. Therefore, our {city} center offers dedicated fertility counseling services to help you navigate the emotional highs and lows of the IVF journey. Our support groups and counseling sessions provide a safe space to share experiences, manage stress, and build resilience. We firmly believe that a positive, relaxed mindset significantly contributes to better treatment outcomes.</p>

        <h3 style="font-size: 2rem; color: var(--plum); margin-top: 40px; margin-bottom: 20px;">Advanced Male and Female Infertility Solutions</h3>
        <p>Infertility is a shared challenge, and our {city} clinic specializes in diagnosing and treating both male and female factors. For women, we offer advanced laparoscopy and hysteroscopy to diagnose and correct anatomical abnormalities such as fibroids, polyps, septums, and blocked tubes. Our management of complex cases, including recurrent implantation failure and diminished ovarian reserve, has made us a referral center for challenging cases in the region.</p>

        <p>For men, our dedicated andrology department provides comprehensive evaluations. Beyond standard semen analysis, we offer advanced tests like DNA fragmentation index (DFI) to assess sperm quality at a molecular level. If no sperm is found in the ejaculate (azoospermia), our specialized urologists and the best IVF doctors in {city} can perform surgical sperm retrieval techniques like TESA, PESA, or Micro-TESE to extract sperm directly from the testicles, giving men a chance to father biological children.</p>

        <p>We also offer robust fertility preservation programs in {city}. For individuals facing medical treatments that may compromise fertility (such as cancer therapies) or those wishing to delay parenthood for personal or professional reasons, we provide <a href="../pages/treatments/egg-freezing.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">oocyte (egg) freezing</a>, <a href="../pages/treatments/sperm-freezing.html" style="color: var(--plum); font-weight: 600; text-decoration: underline;">sperm freezing</a>, and embryo cryopreservation. Our advanced vitrification technology ensures exceptionally high survival rates for frozen gametes and embryos, securing your reproductive future.</p>

        <h3 style="font-size: 2rem; color: var(--plum); margin-top: 40px; margin-bottom: 20px;">Understanding the IVF Process at Our {city} Center</h3>
        <p>Embarking on an IVF cycle can seem daunting, but our team in {city} is here to guide you through every step. The process begins with a comprehensive consultation and diagnostic workup. The best IVF doctor in {city} will review your medical history, perform ultrasounds, and order necessary blood tests to evaluate hormone levels and ovarian reserve. Based on these results, a highly individualized ovarian stimulation protocol is designed.</p>

        <p>During the stimulation phase, you will take injectable medications to encourage your ovaries to produce multiple mature eggs. You will visit our {city} clinic regularly for ultrasound and blood test monitoring to ensure optimal follicular growth and prevent complications like Ovarian Hyperstimulation Syndrome (OHSS). Once the follicles reach the appropriate size, a trigger shot is administered to induce final egg maturation.</p>

        <p>The egg retrieval is a minor surgical procedure performed under light sedation. It is quick and virtually painless. Using a fine needle guided by ultrasound, the fluid from the follicles is aspirated, and the eggs are collected. On the same day, a sperm sample is collected and prepared. Fertilization (via standard IVF or ICSI) takes place in our cutting-edge laboratory. After 3 to 5 days of careful cultivation, the best quality embryo(s) is selected for transfer into the uterus—a simple procedure that feels similar to a Pap smear. A pregnancy test is scheduled approximately two weeks later.</p>

        <h3 style="font-size: 2rem; color: var(--plum); margin-top: 40px; margin-bottom: 20px;">Affordable IVF Cost and High Success Rates in {city}</h3>
        <p>We believe that financial constraints should never be a barrier to parenthood. As the best fertility center in {city}, we offer transparent, competitive, and highly affordable IVF packages. During your initial consultation, our financial counselors will provide a comprehensive breakdown of the costs, including medications, lab fees, and procedural charges. We also offer flexible payment plans and zero-interest EMI options to ease the financial burden of fertility treatments.</p>

        <p>Our commitment to affordability does not compromise our quality of care or our outstanding success rates. Our {city} clinic consistently achieves pregnancy rates that surpass national averages. These high success rates are a direct result of our individualized treatment protocols, strict quality control in our embryology lab, and the unparalleled expertise of our clinical team. We are incredibly proud of the thousands of healthy babies we have helped bring into the world, and their pictures adorning our "wall of hope" are a testament to our dedication.</p>

        <h3 style="font-size: 2rem; color: var(--plum); margin-top: 40px; margin-bottom: 20px;">Frequently Asked Questions (FAQs)</h3>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">1. How do I choose the best IVF center in {city}?</h4>
            <p>Look for a center with experienced specialists, advanced laboratory facilities, transparent pricing, and a strong track record of high success rates. Patient reviews and the level of personalized care provided are also crucial factors.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">2. Who is considered the best IVF doctor in {city}?</h4>
            <p>The best doctor is one with extensive experience in reproductive medicine, a compassionate approach, and a willingness to tailor treatments to your specific needs. Our medical directors fit this profile perfectly.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">3. Is IVF treatment painful?</h4>
            <p>Most patients experience only mild discomfort. The daily injections use very fine needles, and the egg retrieval procedure is performed under sedation, ensuring you feel no pain during the process.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">4. What is the success rate of IVF in {city}?</h4>
            <p>Success rates vary depending on age and diagnosis. However, with our advanced technology and expert protocols, our clinic consistently achieves pregnancy rates ranging from 60% to 75% per cycle for favorable candidates.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">5. How much does IVF cost in {city}?</h4>
            <p>The cost depends on the specific treatments required (e.g., standard IVF vs. ICSI). We offer affordable, comprehensive packages and provide a detailed cost estimate during your first visit to ensure total transparency.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">6. What is the difference between IUI and IVF?</h4>
            <p>IUI involves placing sperm directly into the uterus during ovulation, while IVF involves fertilizing eggs with sperm outside the body in a lab and then transferring the embryo back into the uterus.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">7. Do you treat male infertility in {city}?</h4>
            <p>Yes, absolutely. We offer comprehensive andrology services, including advanced semen analysis, ICSI, and surgical sperm retrieval techniques like TESA and Micro-TESE for severe male factor infertility.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">8. How long does one IVF cycle take?</h4>
            <p>A typical IVF cycle takes about 4 to 6 weeks from the start of ovarian stimulation to the pregnancy test. The exact timeline can vary based on your specific protocol.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">9. Is egg freezing available at your {city} center?</h4>
            <p>Yes, we offer advanced vitrification for egg freezing, providing excellent survival rates for women who wish to preserve their fertility for medical or personal reasons.</p>
        </div>
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--ink); margin-bottom: 8px;">10. Are there any side effects of IVF medications?</h4>
            <p>Some women may experience mild side effects like bloating, breast tenderness, mood swings, or mild cramping. Severe complications like OHSS are rare due to our careful monitoring protocols.</p>
        </div>
        
        <div style="margin-top: 40px; text-align: center;">
            <a href="../pages/contact.html" class="btn btn-primary" style="font-size: 1.2rem; padding: 16px 32px;">Book Your Appointment Today</a>
        </div>
      </div>
    </div>
  </section>
`;

cities.forEach((city, i) => {
    let newTitle = "<title>Best IVF Center in " + city + " | Top Fertility Clinic & Hospital</title>";
    let newDesc = '<meta name="description" content="Looking for the Best IVF Center in ' + city + '? Kulki IVF is the top fertility hospital in ' + city + ' with the best IVF doctors offering advanced ICSI, IUI, and high success rates.">';
    let newKeywords = '<meta name="keywords" content="Best IVF Center in ' + city + ', Best IVF Hospital in ' + city + ', Best Fertility Center in ' + city + ', Top IVF Clinic in ' + city + ', Best IVF Doctor in ' + city + '">';
    
    let citySlug = city.toLowerCase().replace(/ /g, "-");
    let newUrl = '<meta property="og:url" content="https://kulkiivfgroup.com/location-pages/' + citySlug + '.html">';
    let newCanonical = '<link rel="canonical" href="https://kulkiivfgroup.com/location-pages/' + citySlug + '.html">';

    let headMod = headPart.replace(/<title>.*?<\/title>/s, newTitle);
    headMod = headMod.replace(/<meta name="description" content=".*?">/s, newDesc);
    headMod = headMod.replace(/<meta name="keywords" content=".*?">/s, newKeywords);
    headMod = headMod.replace(/<meta property="og:url" content=".*?">/s, newUrl);
    headMod = headMod.replace(/<link rel="canonical" href=".*?">/s, newCanonical);

    let geoSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "Best IVF Center in ` + city + ` - Kulki IVF",
      "url": "https://kulkiivfgroup.com/location-pages/` + citySlug + `.html",
      "logo": "https://kulkiivfgroup.com/assets/images/logo.jpg",
      "image": "https://loremflickr.com/800/600/newborn,baby?lock=` + (i+1) + `",
      "description": "Kulki IVF is recognized as the best IVF center and top fertility clinic in ` + city + `, providing advanced ART treatments, ICSI, IUI, and personalized care.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "` + city + `",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN"
      },
      "telephone": "+91-9799979532"
    }
    </script>
    `;

    headMod = headMod + geoSchema + "\n</head>";

    let bodyContent = contentTemplate.replace(/{city}/g, city).replace(/{i}/g, i+1);
    
    let finalHtml = headMod + headerPart + bodyContent + footerPart;

    let filepath = path.join(outDir, citySlug + ".html");
    fs.writeFileSync(filepath, finalHtml, "utf-8");
});

console.log("Generated 20 location pages.");
