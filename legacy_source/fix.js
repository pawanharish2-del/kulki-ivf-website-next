const fs = require('fs');
const path = require('path');

const dirs = [
    'C:/Users/USER/Downloads/kulkiivf/blogs',
    'C:/Users/USER/Downloads/kulkiivf/pages'
];

let fixed = 0;

dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
        if (!file.endsWith('.html')) return;
        const filepath = path.join(dir, file);
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // The mojibake looks like " A," " or " A," ". We'll just replace ' A' followed by 2-5 non-alphanumeric chars and a space with ' - '
        const originalContent = content;
        
        // Aggressive replacement for the dash mojibake
        content = content.replace(/\sA[^a-zA-Z0-9\s<]{2,5}\s/g, ' - ');
        content = content.replace(/\sA[^a-zA-Z0-9\s<]{2,5}(?=[A-Z])/g, ' - ');
        
        if (content !== originalContent) {
            fs.writeFileSync(filepath, content, 'utf-8');
            fixed++;
        }
    });
});
console.log(`Fixed ${fixed} files using Node.js!`);
