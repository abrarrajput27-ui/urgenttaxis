const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const distPath = path.join(__dirname, 'frontend', 'dist');
const html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

const virtualConsole = new VirtualConsole();
virtualConsole.on('error', (err) => {
  console.error("BROWSER ERROR:", err);
});
virtualConsole.on('warn', (warn) => {
  console.warn("BROWSER WARN:", warn);
});
virtualConsole.on('log', (log) => {
  console.log("BROWSER LOG:", log);
});

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:4173/"
});

// Since the scripts are module type, jsdom might not execute them automatically.
// Let's manually read the js file and eval it if needed, or wait for jsdom.
setTimeout(() => {
  console.log("JSDOM completed waiting.");
  process.exit(0);
}, 3000);
