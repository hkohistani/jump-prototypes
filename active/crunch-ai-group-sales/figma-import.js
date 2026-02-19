/**
 * Figma Plugin: Import Crunch AI Group Sales Screens
 *
 * Paste this entire script into Figma's Plugin Console
 * (Plugins > Development > Open Console) and run it,
 * OR use it as a Figma plugin's "code.js".
 *
 * The script reads the base64-encoded PNGs embedded below
 * and creates a page of organized iPhone frames.
 */

const SCREENS = [
  // Each entry: { name, group, base64 }
  // Populated by the Node build step below
  __SCREENS_PLACEHOLDER__
];

const FRAME_W = 393;
const FRAME_H = 852;
const COLS = 5;
const GAP = 80;
const GROUP_GAP = 140;

(async () => {
  // Create or find a page called "Crunch AI – Group Sales"
  let targetPage = figma.root.children.find(p => p.name === 'Crunch AI – Group Sales');
  if (!targetPage) {
    targetPage = figma.createPage();
    targetPage.name = 'Crunch AI – Group Sales';
  }
  figma.currentPage = targetPage;

  // Group screens by their flow group
  const groups = {};
  for (const s of SCREENS) {
    if (!groups[s.group]) groups[s.group] = [];
    groups[s.group].push(s);
  }

  let groupY = 0;

  for (const [groupName, screens] of Object.entries(groups)) {
    // Section label
    const label = figma.createText();
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    label.fontName = { family: 'Inter', style: 'Bold' };
    label.fontSize = 28;
    label.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
    label.characters = groupName;
    label.x = 0;
    label.y = groupY;
    groupY += 60;

    let col = 0;
    let row = 0;

    for (const screen of screens) {
      const x = col * (FRAME_W + GAP);
      const y = groupY + row * (FRAME_H + GAP + 40);

      // Create frame
      const frame = figma.createFrame();
      frame.name = screen.name;
      frame.resize(FRAME_W, FRAME_H);
      frame.x = x;
      frame.y = y;
      frame.cornerRadius = 0;
      frame.clipsContent = true;

      // Fill with image
      const imageHash = figma.createImage(
        Uint8Array.from(atob(screen.base64), c => c.charCodeAt(0))
      ).hash;
      frame.fills = [{
        type: 'IMAGE',
        scaleMode: 'FIT',
        imageHash,
      }];

      // Screen name label below frame
      const nameLabel = figma.createText();
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      nameLabel.fontName = { family: 'Inter', style: 'Regular' };
      nameLabel.fontSize = 14;
      nameLabel.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
      nameLabel.characters = screen.name;
      nameLabel.x = x;
      nameLabel.y = y + FRAME_H + 12;

      col++;
      if (col >= COLS) {
        col = 0;
        row++;
      }
    }

    const maxRows = Math.ceil(screens.length / COLS);
    groupY += maxRows * (FRAME_H + GAP + 40) + GROUP_GAP;
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin(`✅ Imported ${SCREENS.length} screens into "Crunch AI – Group Sales"`);
})();
