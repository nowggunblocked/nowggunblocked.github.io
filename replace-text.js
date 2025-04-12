
const fs = require('fs');
const path = require('path');

const oldText = "now gg unblocked, now.gg unblocked, website unblocker with now.gg, now gg unblocked, unblocked now.gg";
const newText = "now gg unblocked, now.gg unblocked, website unblocker with now.gg, now gg unblocked, unblocked now.gg";

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(oldText)) {
      content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced text in ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      replaceInFile(filePath);
    }
  });
}

walkDir('.');
