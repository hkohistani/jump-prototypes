const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const outFile = path.join(__dirname, 'figma-plugin-code.js');

// Screen order and group labels
const SCREEN_GROUPS = {
  'Organizer Flow — Initial Setup': [
    '01-empty-chat',
    '02-initial-ai-greeting',
    '03-seat-details-message',
    '04-action-buttons',
    '05-user-input-prefilled',
    '06-user-message-sent',
  ],
  'Organizer Flow — Choosing Options': [
    '07-section-suite-options',
    '08-deposit-info',
    '09-suite-selected',
    '10-suite-ai-response',
    '11-addons-screen',
    '12-addon-shootaround-selected',
  ],
  'Organizer Flow — Jersey & Group Page': [
    '13-jersey-upsell',
    '14-jersey-card',
    '15-jersey-pay-response',
    '16-jersey-details-input',
    '17-group-page-prompt',
    '18-group-page-user-messages',
  ],
  'Organizer Flow — Preview & Payment': [
    '19-group-page-preview',
    '20-deposit-payment',
    '21-share-link',
    '22-concierge-offer',
    '23-time-skip-visible',
  ],
  'Organizer Flow — Follow Up (2 Days Later)': [
    '24-followup-status',
    '25-reminder-sent',
    '26-fan-experience-skip',
  ],
  'Fan Experience': [
    '27-fan-welcome-screen',
    '28-seat-selection-screen',
  ],
  'Section 112 Flow (Alternative)': [
    '29-section112-selected',
    '30-section112-payment-options',
  ],
};

const screensArray = [];

for (const [group, names] of Object.entries(SCREEN_GROUPS)) {
  for (const name of names) {
    const filePath = path.join(screensDir, `${name}.png`);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Missing: ${name}.png`);
      continue;
    }
    const b64 = fs.readFileSync(filePath).toString('base64');
    // Pretty-print the name
    const prettyName = name.replace(/^\d+-/, '').replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    screensArray.push({ name: prettyName, group, base64: b64 });
    console.log(`  ✓ ${name}`);
  }
}

// Build the plugin code
const screensJSON = JSON.stringify(screensArray);

const pluginCode = `/**
 * Crunch AI — Group Sales: Figma Plugin
 *
 * HOW TO USE:
 * 1. In Figma: Plugins > Development > New Plugin
 * 2. Choose "Run once" and paste this entire file as code.js
 * 3. Click Run
 *
 * OR: Plugins > Development > Open Console, paste and run.
 */

const SCREENS = ${screensJSON};

const FRAME_W = 393;
const FRAME_H = 852;
const COLS = 5;
const GAP = 80;
const LABEL_H = 40;
const GROUP_GAP = 120;

(async () => {
  // Create or reuse page
  let targetPage = figma.root.children.find(p => p.name === 'Crunch AI – Group Sales');
  if (!targetPage) {
    targetPage = figma.createPage();
    targetPage.name = 'Crunch AI – Group Sales';
  }
  figma.currentPage = targetPage;

  // Remove existing content
  for (const child of [...targetPage.children]) child.remove();

  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  // Group screens
  const groups = {};
  for (const s of SCREENS) {
    if (!groups[s.group]) groups[s.group] = [];
    groups[s.group].push(s);
  }

  let globalY = 0;

  for (const [groupName, screens] of Object.entries(groups)) {
    // Section heading
    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Bold' };
    label.fontSize = 24;
    label.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.08 } }];
    label.characters = groupName;
    label.x = 0;
    label.y = globalY;
    globalY += 48;

    let col = 0;
    let row = 0;

    for (const screen of screens) {
      const x = col * (FRAME_W + GAP);
      const y = globalY + row * (FRAME_H + LABEL_H + GAP);

      // Image frame
      const frame = figma.createFrame();
      frame.name = screen.name;
      frame.resize(FRAME_W, FRAME_H);
      frame.x = x;
      frame.y = y;
      frame.clipsContent = true;
      frame.cornerRadius = 0;

      const bytes = Uint8Array.from(atob(screen.base64), c => c.charCodeAt(0));
      const img = figma.createImage(bytes);
      frame.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: img.hash }];

      // Label below
      const nameLabel = figma.createText();
      nameLabel.fontName = { family: 'Inter', style: 'Regular' };
      nameLabel.fontSize = 13;
      nameLabel.fills = [{ type: 'SOLID', color: { r: 0.45, g: 0.45, b: 0.45 } }];
      nameLabel.characters = screen.name;
      nameLabel.x = x;
      nameLabel.y = y + FRAME_H + 10;

      col++;
      if (col >= COLS) { col = 0; row++; }
    }

    const maxRows = Math.ceil(screens.length / COLS);
    globalY += maxRows * (FRAME_H + LABEL_H + GAP) + GROUP_GAP;
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin('✅ Imported ' + SCREENS.length + ' screens into "Crunch AI – Group Sales"');
})();
`;

fs.writeFileSync(outFile, pluginCode);
const sizeKB = Math.round(fs.statSync(outFile).size / 1024);
console.log(`\n✅ Built: figma-plugin-code.js (${sizeKB} KB)`);
console.log(`   ${screensArray.length} screens embedded`);
console.log('\nTo import into Figma:');
console.log('  1. Open Figma desktop');
console.log('  2. Plugins > Development > New Plugin > "Run once"');
console.log('  3. Paste figma-plugin-code.js as the plugin code and Run');
