const fs = require('fs');
const path = require('path');

const outputFilename = 'Full Directory dan Script.md';
const startDir = process.cwd();

// Daftar folder & file yang diabaikan agar file hasil tidak membengkak
const ignoreDirs = ['node_modules', '.git', '.next', 'dist', 'public'];
const ignoreFiles = [outputFilename, 'package-lock.json', 'yarn.lock', 'generate-context.js'];
const ignoreExts = ['.png', '.jpg', '.jpeg', '.ico', '.svg', '.woff', '.woff2'];

let output = `${startDir}\n│\n`;

function buildTree(dir, prefix = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    // Filter file/folder yang tidak perlu
    const filteredItems = items.filter(item => {
        if (item.isDirectory() && ignoreDirs.includes(item.name)) return false;
        if (item.isFile()) {
            const ext = path.extname(item.name);
            if (ignoreFiles.includes(item.name) || ignoreExts.includes(ext)) return false;
        }
        return true;
    });

    filteredItems.forEach((item, index) => {
        const isLast = index === filteredItems.length - 1;
        const connector = isLast ? '└───' : '├───';
        const itemPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            output += `${prefix}${connector}(${item.name})\n`;
            buildTree(itemPath, prefix + (isLast ? '    ' : '│   '));
        } else {
            try {
                const content = fs.readFileSync(itemPath, 'utf-8');
                output += `${prefix}${isLast ? '    ' : '│   '}${item.name} [\n${content}\n]\n`;
            } catch (err) {
                output += `${prefix}${isLast ? '    ' : '│   '}${item.name} [Error membaca file]\n`;
            }
        }
    });
}

buildTree(startDir);

fs.writeFileSync(outputFilename, output);
console.log(`✅ Berhasil! File "${outputFilename}" telah dibuat secara otomatis.`);
