const fs = require('fs');
const path = require('path');

const baseDir = "c:/Users/USER/Downloads/kulki ivf website";

const keywords = [
    { regex: /\b(In Vitro Fertilization|IVF)\b/gi, url: "pages/treatments/ivf.html" },
    { regex: /\b(Intracytoplasmic Sperm Injection|ICSI)\b/gi, url: "pages/treatments/icsi.html" },
    { regex: /\b(Intrauterine Insemination|IUI)\b/gi, url: "pages/treatments/iui.html" },
    { regex: /\b(Egg Freezing|Oocyte Freezing)\b/gi, url: "pages/treatments/egg-freezing.html" },
    { regex: /\b(Male Infertility|Male factor infertility)\b/gi, url: "pages/infertility/male-infertility.html" },
    { regex: /\b(Female Infertility|Female factor infertility)\b/gi, url: "pages/infertility/female-infertility.html" }
];

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'assets' && file !== 'location-pages' && file !== 'node_modules') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allHtmlFiles = getAllHtmlFiles(baseDir);
if (!allHtmlFiles.includes(path.join(baseDir, "index.html").replace(/\\/g, '/')) && !allHtmlFiles.includes(path.join(baseDir, "index.html"))) {
    allHtmlFiles.push(path.join(baseDir, "index.html"));
}

let modifiedCount = 0;
let totalLinksInjected = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Split by HTML tags
    let parts = content.split(/(<[^>]*>)/g);
    let inAnchor = 0;
    let inScript = 0;
    let inHead = 0;
    let inTitle = 0;
    let inStyle = 0;
    let changed = false;
    
    // Track replacements per keyword to avoid link spam
    let replaceCounts = {};
    keywords.forEach(kw => replaceCounts[kw.url] = 0);
    
    for (let i = 0; i < parts.length; i++) {
        if (i % 2 !== 0) {
            let tag = parts[i].toLowerCase();
            if (tag === '<a>' || tag.startsWith('<a ')) inAnchor++;
            if (tag === '</a>') inAnchor = Math.max(0, inAnchor - 1);
            
            if (tag === '<script>' || tag.startsWith('<script ')) inScript++;
            if (tag === '</script>') inScript = Math.max(0, inScript - 1);
            
            if (tag === '<head>' || tag.startsWith('<head ')) inHead++;
            if (tag === '</head>') inHead = Math.max(0, inHead - 1);
            
            if (tag === '<style>' || tag.startsWith('<style ')) inStyle++;
            if (tag === '</style>') inStyle = Math.max(0, inStyle - 1);
            
            if (tag === '<title>' || tag.startsWith('<title ')) inTitle++;
            if (tag === '</title>') inTitle = Math.max(0, inTitle - 1);
        } else {
            if (inAnchor === 0 && inScript === 0 && inHead === 0 && inTitle === 0 && inStyle === 0) {
                let text = parts[i];
                keywords.forEach(kw => {
                    // Don't link to the page we are currently on
                    if (path.basename(file) === path.basename(kw.url)) return;
                    
                    // Limit to 3 links per keyword per page
                    if (replaceCounts[kw.url] >= 3) return;
                    
                    let relPath = path.relative(path.dirname(file), path.join(baseDir, kw.url)).replace(/\\/g, '/');
                    if (!relPath.startsWith('.') && !relPath.startsWith('/')) {
                        relPath = './' + relPath;
                    }
                    
                    let before = text;
                    text = text.replace(kw.regex, (match) => {
                        // Avoid replacing if it's part of a class name or something like auto-linked.
                        // Though this is text mode, so classes aren't here.
                        if (replaceCounts[kw.url] >= 3) return match; // skip if limit reached
                        replaceCounts[kw.url]++;
                        totalLinksInjected++;
                        return `<a href="${relPath}" style="color: var(--plum); font-weight: 600; text-decoration: underline;" class="auto-linked">${match}</a>`;
                    });
                    
                    if (text !== before) {
                        changed = true;
                    }
                });
                parts[i] = text;
            }
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, parts.join(''), 'utf-8');
        modifiedCount++;
    }
});

console.log(`Successfully interlinked! Modified ${modifiedCount} files. Injected ${totalLinksInjected} links.`);
