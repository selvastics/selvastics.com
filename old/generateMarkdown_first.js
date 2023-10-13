// run using
// node generateMarkdownIt.js

const fs = require('fs');
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

// Read Markdown file
const readMe = fs.readFileSync('readme.md', 'utf-8');

// Convert Markdown to HTML and wrap it in a div with Arial font
let styledHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="assets/css/default.min.css">  <!-- highlight.js stylesheet -->
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


// Write the converted and styled HTML to a new file for the iframe to read
fs.writeFileSync('readme.html', styledHtmlContent);
