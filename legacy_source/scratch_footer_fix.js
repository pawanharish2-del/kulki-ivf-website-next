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
    
    // Find the old footer-locations block
    const oldBlockRegex = /<div class="footer-locations"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<div class="footer-bottom">/;
    
    if (oldBlockRegex.test(content)) {
        
        const relativePath = path.relative(path.dirname(file), path.join(baseDir, "location-pages"));
        const prefix = relativePath.replace(/\\/g, '/');

        let locationsHtml = `
      <div class="footer-locations-pro" style="grid-column: 1 / -1; margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);">
        <h4 style="margin-bottom: 24px; font-size: 1.2rem; color: #fff; letter-spacing: 0.5px; border-bottom: 2px solid var(--plum); padding-bottom: 8px; display: inline-block;">Premium IVF Centers in Rajasthan</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; margin-top: 16px;">
`;
        cities.forEach(city => {
            const slug = city.toLowerCase().replace(/ /g, "-");
            let link = prefix + "/" + slug + ".html";
            if (!link.startsWith(".") && !link.startsWith("/")) {
                link = "./" + link;
            }
            locationsHtml += `          <a href="${link}" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; transition: color 0.3s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.7)'"><i class="fa-solid fa-location-dot" style="font-size: 0.8em; color: var(--plum);"></i> ${city}</a>\n`;
        });
        
        locationsHtml += `        </div>\n      </div>\n      <div class="footer-bottom">`;
        
        content = content.replace(oldBlockRegex, locationsHtml);
        
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log(`Repatched ${allHtmlFiles.length} HTML files with professional footer locations.`);
