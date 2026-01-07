const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  // 1. Start a simple local server to serve your HTML/CSS
  const server = exec('npx http-server -p 8080');
  
  // Give the server a moment to spin up
  await new Promise(r => setTimeout(r, 2000));

  // 2. Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 3. Navigate to localhost (mimics the live site perfectly)
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

  // 4. Generate the PDF
  // We save it to 'assets' to match your current structure
  await page.pdf({
    path: 'assets/Zachary_Butler_Resume_2025.pdf',
    format: 'A4',
    printBackground: true, // Essential for your colors/styling
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' } 
  });

  await browser.close();
  server.kill(); // Kill the server
})();