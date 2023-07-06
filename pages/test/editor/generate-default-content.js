const fs = require("fs");
const { parse } = require("node-html-parser");
const convertHtmlToObject = require("./html2obj");

// HTML content
const html = `
<h2>Introducing Novel</h2>
<p>Novel is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with <a href="https://tiptap.dev/" target="_blank" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer">Tiptap</a> and <a href="https://sdk.vercel.ai/docs" target="_blank" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer">Vercel AI SDK</a>.</p>
<h3>Features</h3>
<ol start="1">
  <li>Slash menu & bubble menu</li>
  <li>AI autocomplete (type <code>++</code> to activate, or select from slash menu)</li>
  <li>Image uploads (drag & drop / copy & paste, or select from slash menu)</li>
</ol>
<img src="https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png" alt="banner.png" title="banner.png" />
<hr>
<h3>Learn more</h3>
<ul>
  <li><p>Check out the <a href="https://twitter.com/steventey/status/1669762868416512000" target="_blank" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer">launch video</a></p></li>
  <li><p>Star us on <a href="https://github.com/steven-tey/novel" target="_blank" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer">GitHub</a></p></li>
  <li><p><a href="https://vercel.com/templates/next.js/novel" target="_blank" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer">Deploy your own</a> to Vercel</p></li>
</ul>
`;

const root = parse(html);
const DEFAULT_EDITOR_CONTENT = convertHtmlToObject(root);

const contentString = `const DEFAULT_EDITOR_CONTENT = ${JSON.stringify(
  DEFAULT_EDITOR_CONTENT,
  null,
  2
)};\n\nexport default DEFAULT_EDITOR_CONTENT;`;

fs.writeFileSync("default-contents.jsx", contentString, "utf-8");
console.log("file saved");
