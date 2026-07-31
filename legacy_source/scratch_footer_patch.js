const fs = require('fs');
const path = require('path');

const baseDir = "c:/Users/USER/Downloads/kulki ivf website";

const cities = [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", 
    "Bikaner", "Alwar", "Bharatpur", "Sikar", "Bhilwara", 
    "Pali", "Sri Ganganagar", "Hanumangarh", "Barmer", "Chittorgarh", 
    "Nagaur", "Jhunjhunu", "Tonk", "Sawai Madhopur", "Jaisalmer"
];

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'assets') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allHtmlFiles = getAllHtmlFiles(baseDir);

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if footer-bottom exists
    if (content.includes('class="footer-bottom"')) {
        // Idempotency check
        if (content.includes('class="footer-locations"')) {
            return; // Already patched
        }
        
        // Determine relative prefix
        const relativePath = path.relative(path.dirname(file), path.join(baseDir, "location-pages"));
        const prefix = relativePath.replace(/\\/g, '/');

        let locationsHtml = `
      <div class="footer-locations" style="grid-column: 1 / -1; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
        <h4 style="margin-bottom: 16px; font-size: 1.1rem;">Our IVF Centers in Rajasthan</h4>
        <div class="footer-links" style="display: flex; flex-wrap: wrap; gap: 12px;">
`;
        cities.forEach(city => {
            const slug = city.toLowerCase().replace(/ /g, "-");
            let link = prefix + "/" + slug + ".html";
            // If prefix is just "location-pages", it's fine. If it's "../location-pages", it's fine.
            if (!link.startsWith(".") && !link.startsWith("/")) {
                link = "./" + link;
            }
            locationsHtml += `          <a href="${link}" style="margin-bottom: 0;">${city}</a>\n`;
        });
        
        locationsHtml += `        </div>\n      </div>\n      `;
        
        // Insert before <div class="footer-bottom">
        // Wait, the grid in index.html is footer-grid. So we should insert it at the end of footer-grid.
        // Or right before footer-bottom.
        content = content.replace('<div class="footer-bottom">', locationsHtml + '<div class="footer-bottom">');
        
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log(`Patched ${allHtmlFiles.length} HTML files with footer locations.`);
