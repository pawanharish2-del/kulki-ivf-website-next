const fs = require('fs');
const path = require('path');

const baseDir = "c:/Users/USER/Downloads/kulki ivf website";
const baseUrl = "https://kulkiivfgroup.com";

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'assets' && file !== 'node_modules') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allHtmlFiles = getAllHtmlFiles(baseDir);
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

allHtmlFiles.forEach(file => {
    let relPath = path.relative(baseDir, file).replace(/\\/g, '/');
    let url = "";
    let priority = "0.8";
    let changefreq = "monthly";
    
    if (relPath === 'index.html') {
        url = baseUrl + "/";
        priority = "1.0";
        changefreq = "weekly";
    } else {
        url = baseUrl + "/" + relPath;
        if (relPath.startsWith('location-pages/')) {
            priority = "0.9";
            changefreq = "weekly";
        } else if (relPath.startsWith('blogs/')) {
            priority = "0.7";
            changefreq = "monthly";
        }
    }
    
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(path.join(baseDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`Generated sitemap.xml with ${allHtmlFiles.length} URLs.`);
