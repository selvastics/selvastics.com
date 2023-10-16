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
return `<div class="code-snippet">
  <button class="copy-code-button" onclick="copyCodeToClipboard(this)"> <img src="../assets/images/clipicon.png" alt="Copy Code" class="button-icon"> Copy Code</button>
  <pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>
</div>`;
      } catch (__) {}
    }
    return `<div class="code-snippet">
    <button class="copy-code-button" onclick="copyCodeToClipboard(this)">
    <img src="../assets/images/clipicon.png" alt="Copy Code" class="button-icon"> Copy Code
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
      <link rel="stylesheet" href="../assets/css/default.min.css">
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
            background-color: #696969;
            color: white;
            border: none;
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
            margin-top: -40px;  // THIS IS FOR MOVING THE CHUNCKS UP. Use a negative value to pull the code block up
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
            element.innerHTML = '<img src=\\"../assets/images/clipicon.png\\" alt=\\"Copy Code\\" class="button-icon"> Copy Code';
          }, 3000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
      </script>`;
      
      
      

      styledHtmlContent = styledHtmlContent.replace('</body>', `${copyCodeJS}</body>`);

      styledHtmlContent = styledHtmlContent.replace(/<h([1-6])># /g, '<h$1>');
      styledHtmlContent = styledHtmlContent.replace(/<a href="http/g, '<a target="_blank" href="http');
      styledHtmlContent = styledHtmlContent.replace(/<a href="#/g, `<a href="readme.html#`);

      const newFilePath = path.join(dirPath, `${path.basename(file, '.md')}.html`);


      styledHtmlContent += `<script>
      window.onload = function() {
        window.parent.postMessage(
          {"function": "adjustHeight", "height": document.body.scrollHeight + 20},
          "*");
      };
      
      window.addEventListener("message", function(event) {
        if (event.data["function"] === "adjustHeight") {
          const iframe = document.getElementById("myIframe");
          iframe.style.height = event.data.height + "px";
        }
      }, false);
    </script>`;
    

      fs.writeFileSync(newFilePath, styledHtmlContent);
    }
  });
});