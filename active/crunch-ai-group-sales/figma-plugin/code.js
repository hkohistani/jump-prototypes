const SCREENS = [
  // Group: Organizer Flow — Initial Setup
  { name: 'Empty Chat',              group: 'Initial Setup',              file: '01-empty-chat.png' },
  { name: 'AI Greeting',             group: 'Initial Setup',              file: '02-initial-ai-greeting.png' },
  { name: 'Seat Details Message',    group: 'Initial Setup',              file: '03-seat-details-message.png' },
  { name: 'Action Buttons',          group: 'Initial Setup',              file: '04-action-buttons.png' },
  { name: 'User Input Prefilled',    group: 'Initial Setup',              file: '05-user-input-prefilled.png' },
  { name: 'User Message Sent',       group: 'Initial Setup',              file: '06-user-message-sent.png' },

  // Group: Choosing Options
  { name: 'Section / Suite Options', group: 'Choosing Options',           file: '07-section-suite-options.png' },
  { name: 'Deposit Info',            group: 'Choosing Options',           file: '08-deposit-info.png' },
  { name: 'Suite Selected',          group: 'Choosing Options',           file: '09-suite-selected.png' },
  { name: 'Suite AI Response',       group: 'Choosing Options',           file: '10-suite-ai-response.png' },
  { name: 'Add-Ons Screen',          group: 'Choosing Options',           file: '11-addons-screen.png' },
  { name: 'Shootaround Selected',    group: 'Choosing Options',           file: '12-addon-shootaround-selected.png' },

  // Group: Jersey & Group Page
  { name: 'Jersey Upsell',           group: 'Jersey & Group Page',        file: '13-jersey-upsell.png' },
  { name: 'Jersey Card',             group: 'Jersey & Group Page',        file: '14-jersey-card.png' },
  { name: 'Jersey – I\'ll Pay',      group: 'Jersey & Group Page',        file: '15-jersey-pay-response.png' },
  { name: 'Jersey Details Input',    group: 'Jersey & Group Page',        file: '16-jersey-details-input.png' },
  { name: 'Group Page Prompt',       group: 'Jersey & Group Page',        file: '17-group-page-prompt.png' },
  { name: 'Group Page User Messages',group: 'Jersey & Group Page',        file: '18-group-page-user-messages.png' },

  // Group: Preview & Payment
  { name: 'Group Page Preview',      group: 'Preview & Payment',          file: '19-group-page-preview.png' },
  { name: 'Deposit Payment',         group: 'Preview & Payment',          file: '20-deposit-payment.png' },
  { name: 'Share Link',              group: 'Preview & Payment',          file: '21-share-link.png' },
  { name: 'Concierge Offer',         group: 'Preview & Payment',          file: '22-concierge-offer.png' },
  { name: 'Time Skip Visible',       group: 'Preview & Payment',          file: '23-time-skip-visible.png' },

  // Group: Follow Up
  { name: 'Follow-Up Status',        group: 'Follow Up (2 Days Later)',   file: '24-followup-status.png' },
  { name: 'Reminder Sent',           group: 'Follow Up (2 Days Later)',   file: '25-reminder-sent.png' },
  { name: 'Fan Experience Skip',     group: 'Follow Up (2 Days Later)',   file: '26-fan-experience-skip.png' },

  // Group: Fan Experience
  { name: 'Fan Welcome Screen',      group: 'Fan Experience',             file: '27-fan-welcome-screen.png' },
  { name: 'Seat Selection Screen',   group: 'Seat Selection Screen',      file: '28-seat-selection-screen.png' },

  // Group: Section 112 Alt Flow
  { name: 'Section 112 Selected',   group: 'Section 112 (Alt Flow)',      file: '29-section112-selected.png' },
  { name: 'Section 112 Payment',    group: 'Section 112 (Alt Flow)',      file: '30-section112-payment-options.png' },
];

const BASE_URL = 'http://localhost:3333/screens';
const FRAME_W = 393;
const FRAME_H = 852;
const COLS = 5;
const COL_GAP = 80;
const ROW_GAP = 60;
const LABEL_H = 36;
const GROUP_GAP = 100;
const GROUP_LABEL_H = 50;

async function fetchImageBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

(async () => {
  // First check the server is reachable
  try {
    await fetch(`${BASE_URL}/01-empty-chat.png`);
  } catch (e) {
    figma.closePlugin('❌ Cannot reach localhost:3333. Make sure the local server is running:\n  node serve-screens.js');
    return;
  }

  // Create or reuse page
  let page = figma.root.children.find(p => p.name === 'Crunch AI – Group Sales');
  if (!page) {
    page = figma.createPage();
    page.name = 'Crunch AI – Group Sales';
  }
  figma.currentPage = page;
  for (const child of [...page.children]) child.remove();

  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  // Build group map preserving insertion order
  const groupOrder = [];
  const groups = {};
  for (const s of SCREENS) {
    if (!groups[s.group]) { groups[s.group] = []; groupOrder.push(s.group); }
    groups[s.group].push(s);
  }

  let globalY = 0;

  for (const groupName of groupOrder) {
    const screens = groups[groupName];

    // Group heading
    const heading = figma.createText();
    heading.fontName = { family: 'Inter', style: 'Bold' };
    heading.fontSize = 22;
    heading.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
    heading.characters = groupName;
    heading.x = 0;
    heading.y = globalY;
    globalY += GROUP_LABEL_H;

    let col = 0;
    let row = 0;

    for (const screen of screens) {
      const x = col * (FRAME_W + COL_GAP);
      const y = globalY + row * (FRAME_H + LABEL_H + ROW_GAP);

      // Fetch image
      let bytes;
      try {
        bytes = await fetchImageBytes(`${BASE_URL}/${screen.file}`);
      } catch (e) {
        console.error(`Skipping ${screen.file}: ${e.message}`);
        col++;
        if (col >= COLS) { col = 0; row++; }
        continue;
      }

      // Create frame
      const frame = figma.createFrame();
      frame.name = screen.name;
      frame.resize(FRAME_W, FRAME_H);
      frame.x = x;
      frame.y = y;
      frame.clipsContent = true;
      frame.fills = [{
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: figma.createImage(bytes).hash,
      }];

      // Label
      const label = figma.createText();
      label.fontName = { family: 'Inter', style: 'Regular' };
      label.fontSize = 12;
      label.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
      label.characters = screen.name;
      label.x = x;
      label.y = y + FRAME_H + 10;

      col++;
      if (col >= COLS) { col = 0; row++; }
    }

    const rows = Math.ceil(screens.length / COLS);
    globalY += rows * (FRAME_H + LABEL_H + ROW_GAP) + GROUP_GAP;
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin(`✅ Imported ${SCREENS.length} screens into "Crunch AI – Group Sales"`);
})();
