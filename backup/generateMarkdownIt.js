// run using
// node generateMarkdownIt.js

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const mdTocAndAnchor = require('markdown-it-toc-and-anchor').default;
const mathJaxScript = `<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`;




const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<div class="code-snippet">
        <button class="copy-code-button" onclick="copyCodeToClipboard(this)"> <img src="../assets/images/copy-24.png" alt="Copy code" class="button-icon"> Copy code</button>
        <pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>
      </div>`;
            } catch (__) {}
          }
    return `<div class="code-snippet">
      <button class="copy-code-button" onclick="copyCodeToClipboard(this)">
        <img src="../assets/images/copy-24.png" alt="Copy code" class="button-icon"> Copy code
      </button>
      <pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>
    </div>`;
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
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../assets/css/default.min.css">
        ${mathJaxScript} <!-- Include MathJax script here -->
        <style>
          body {
            font-family:"Calibri", sans-serif;
          }
          .code-snippet {
            position: relative;
          }
          .copy-code-button {
            position: absolute;
            top: 26px; 
            right: 10px; 
            background-color: transparent;
            color: black;
            border: 2px solid lightgrey; /* Add a grey border */
            cursor: pointer;

          }
          pre.hljs code {
            white-space: pre-wrap;
          }
          .button-icon {
            width: 10px;
            height: 10px;
            background-color: white;
          }
          .code-snippet {
            margin-top: -40px;
          }

          span.yellow-quote {
            color: orange;
            background-color: #f5f5f5;
            padding: 2px 4px;
            font-family: monospace;
            border-radius: 3px;
            border: 1px solid #ccc;
          }
          



        </style>
      </head>
      <body>
        ${md.render(readMe)}
      </body>
      </html>
      `;

      const copyCodeJS = `<script>
      async function copyCodeToClipboard(element) {
        const codeElement = element.nextElementSibling.querySelector('code');
        const code = codeElement.innerText;
        try {
          await navigator.clipboard.writeText(code);
          element.innerHTML = 'Copied';
          setTimeout(() => {
            element.innerHTML = '<img src=\\"../assets/images/copy-24.png\\" alt=\\"Copy Code\\" class="button-icon"> Copy Code';
          }, 3000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
      </script>`;
      

      styledHtmlContent += `<!-- Add this script to the end of your blogarticles-->
      <script>
        window.onload = function() {
          window.parent.postMessage({"height": document.body.scrollHeight}, "*");
        }
      </script>
      `;

      styledHtmlContent = styledHtmlContent.replace('</body>', `${copyCodeJS}</body>`);
      styledHtmlContent = styledHtmlContent.replace(/<code>([^<]+)<\/code>/g, "<span class='yellow-quote'>$1</span>");

      styledHtmlContent = styledHtmlContent.replace(/<h([1-6])># /g, '<h$1>');
      styledHtmlContent = styledHtmlContent.replace(/<a href="http/g, '<a target="_blank" href="http');
      styledHtmlContent = styledHtmlContent.replace(/<a href="#/g, `<a href="readme.html#`);


      const newFilePath = path.join(dirPath, `${path.basename(file, '.md')}.html`);
      fs.writeFileSync(newFilePath, styledHtmlContent, { encoding: 'utf8' });
    }
  });
});
