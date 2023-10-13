// run using
// node generateMarkdownIt.js


const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const mdTocAndAnchor = require('markdown-it-toc-and-anchor').default;

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
}).use(mdTocAndAnchor, {
  tocClassName: 'toc',
  anchorLink: true,
  anchorLinkSymbol: ''
});

const dirPath = 'blogarticles';
fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(dirPath, file);
      const readMe = fs.readFileSync(filePath, 'utf-8');
      let styledHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
      <link rel="stylesheet" href="../assets/css/default.min.css">
      <style>
          body {
              font-family:"Calibri", sans-serif;
          }
        </style>
      </head>
      <body>
        ${md.render(readMe)}
      </body>
      </html>
      `;
      
      // Post-process to remove '#' from headings
      styledHtmlContent = styledHtmlContent.replace(/<h([1-6])># /g, '<h$1>');
      
      // Make external links open in a new tab
      styledHtmlContent = styledHtmlContent.replace(/<a href="http/g, '<a target="_blank" href="http');
      
      // Modify internal links to work within parent document
      styledHtmlContent = styledHtmlContent.replace(/<a href="#/g, `<a href="readme.html#`);
      
      const newFilePath = path.join(dirPath, `${path.basename(file, '.md')}.html`);
      fs.writeFileSync(newFilePath, styledHtmlContent);
    }
  });
});

