const { chromium } = require('playwright');
const path = require('path');

/**
 * ARC Landing Visual Audit
 * Run this script to generate a high-definition screenshot of the header
 * and verify the brand logo's visual clarity.
 * 
 * Usage: node audit.js
 * Requirements: npm install playwright
 */
(async () => {
  console.log('Launching Playwright Chrome instance...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const fileUrl = `file://${path.resolve(__dirname, 'index.html')}`;
  console.log(`Navigating to ${fileUrl}`);
  await page.goto(fileUrl);
  
  // Allow time for IntersectionObserver animations and assets to load
  await page.waitForTimeout(1500);
  
  console.log('Capturing localized header (Logo) visual audit...');
  const headerHandle = await page.waitForSelector('.brand');
  await headerHandle.screenshot({ path: 'audit-logo-close-up.png', omitBackground: true });
  
  console.log('Capturing full page state...');
  await page.screenshot({ path: 'audit-fullpage-reference.png', fullPage: true });

  console.log('✅ Visual audit complete. Output saved:');
  console.log('  - audit-logo-close-up.png (Inspect this for logo clarity)');
  console.log('  - audit-fullpage-reference.png');
  
  await browser.close();
})();
