const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_PATH = `file://${path.resolve(__dirname, 'index.html')}`;
const OUT_DIR = path.resolve(__dirname, 'screens');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const PHONE = { width: 393, height: 852 };
const VIEWPORT = { width: 413, height: 950, deviceScaleFactor: 2 };

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function shot(page, name) {
    await sleep(300);
    const el = await page.$('.phone-frame');
    await el.screenshot({ path: path.join(OUT_DIR, `${name}.png`) });
    console.log(`  ✓ ${name}`);
}

async function waitForAI(page) {
    // Wait for loading to disappear
    await page.waitForFunction(() => {
        const lm = document.getElementById('loadingMessage');
        return !lm || lm.style.display === 'none';
    }, { timeout: 8000 });
    await sleep(400);
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // Disable auto-start so we control timing
    await page.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });

    // Patch auto-start to do nothing on load, we'll call manually
    await page.evaluate(() => {
        // Override setTimeout to capture it but not fire immediately
        window._timeouts = [];
        const origSetTimeout = window.setTimeout;
        window._origSetTimeout = origSetTimeout;
    });

    // Reload with auto-start suppressed
    await page.evaluate(() => {
        // Remove auto-start timeout by overriding immediately
    });

    // ─── SCREEN 1: Opening / Empty chat ─────────────────────────────────────
    console.log('Capturing screens...');
    await page.goto(HTML_PATH, { waitUntil: 'networkidle0' });
    // Before demo starts (empty state)
    await page.evaluate(() => {
        document.getElementById('instructions').style.display = 'none';
    });
    await sleep(200);
    await shot(page, '01-empty-chat');

    // ─── SCREEN 2: First AI message (after 2s auto-start) ────────────────────
    await page.reload({ waitUntil: 'networkidle0' });
    await sleep(2200); // let startDemo fire
    await waitForAI(page);
    await shot(page, '02-initial-ai-greeting');

    // Wait for second AI message
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '03-seat-details-message');

    // Wait for action buttons
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '04-action-buttons');

    // ─── SCREEN 3: User types date/budget ────────────────────────────────────
    await page.evaluate(() => {
        messageInput.value = 'Looking at the Kings game on Dec 14th. Hoping to stay around $200 per person.';
    });
    await shot(page, '05-user-input-prefilled');

    // Send it
    await page.evaluate(() => { handleSend(); });
    await shot(page, '06-user-message-sent');
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '07-section-suite-options');

    // Wait for deposit message
    await sleep(1200);
    await waitForAI(page);
    await shot(page, '08-deposit-info');

    // ─── SCREEN 4: Select Shared Suite ───────────────────────────────────────
    await page.evaluate(() => { selectSharedSuite(); });
    await shot(page, '09-suite-selected');
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '10-suite-ai-response');
    await sleep(1100);
    await waitForAI(page);
    await shot(page, '11-addons-screen');

    // ─── SCREEN 5: Select free throw add-on ──────────────────────────────────
    await page.evaluate(() => {
        const cards = document.querySelectorAll('.addon-card');
        if (cards[0]) cards[0].click(); // shootaround
    });
    await sleep(200);
    await shot(page, '12-addon-shootaround-selected');

    await page.evaluate(() => {
        const cards = document.querySelectorAll('.addon-card');
        if (cards[2]) selectFreethrow(cards[2]); // free throw
    });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '13-jersey-upsell');

    // Wait for jersey card
    await sleep(1100);
    await waitForAI(page);
    await shot(page, '14-jersey-card');

    // ─── SCREEN 6: Jersey decision ───────────────────────────────────────────
    await page.evaluate(() => { jerseyDecision('pay'); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '15-jersey-pay-response');

    await sleep(1100);
    await waitForAI(page);
    await shot(page, '16-jersey-details-input');

    // ─── SCREEN 7: Jersey details → group page prompt ────────────────────────
    await page.evaluate(() => {
        messageInput.value = 'Size Large, #1, Williams';
    });
    await page.evaluate(() => { handleSend(); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '17-group-page-prompt');

    // ─── SCREEN 8: Group page details submitted ───────────────────────────────
    await page.evaluate(() => {
        messageInput.value = "Chris's Birthday Game Night";
    });
    await page.evaluate(() => { handleSend(); }); // groupPageStep
    await sleep(800);
    await shot(page, '18-group-page-user-messages');
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '19-group-page-preview');

    // ─── SCREEN 9: Looks good → deposit payment ──────────────────────────────
    await page.evaluate(() => { previewDecision('good'); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '20-deposit-payment');

    // ─── SCREEN 10: Pay deposit → share link ─────────────────────────────────
    await page.evaluate(() => { payDeposit('visa'); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '21-share-link');

    // Wait for follow-up messages + time-skip button
    await sleep(1100);
    await waitForAI(page);
    await sleep(1100);
    await shot(page, '22-concierge-offer');
    await sleep(1100);
    await shot(page, '23-time-skip-visible');

    // ─── SCREEN 11: Time-skip (2 days later) ────────────────────────────────
    await page.evaluate(() => { skipToFollowUp(); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '24-followup-status');

    // ─── SCREEN 12: Yes remind them ──────────────────────────────────────────
    await page.evaluate(() => { followUpDecision('remind'); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '25-reminder-sent');
    await sleep(900);
    await shot(page, '26-fan-experience-skip');

    // ─── SCREEN 13: Fan welcome screen ───────────────────────────────────────
    await page.evaluate(() => { skipToFanExperience(); });
    await sleep(300);
    await shot(page, '27-fan-welcome-screen');

    // ─── SCREEN 14: Seat selection screen ────────────────────────────────────
    await page.evaluate(() => { showSeatSelectionScreen(); });
    await sleep(300);
    await shot(page, '28-seat-selection-screen');

    // ─── Section 112 flow (separate capture) ─────────────────────────────────
    await page.reload({ waitUntil: 'networkidle0' });
    await sleep(2200);
    await waitForAI(page);
    await sleep(1700);
    await waitForAI(page);
    await sleep(1700);
    await waitForAI(page);
    // Send date/budget
    await page.evaluate(() => {
        messageInput.value = 'Looking at the Kings game on Dec 14th. Hoping to stay around $200 per person.';
        handleSend();
    });
    await sleep(1700);
    await waitForAI(page);
    await sleep(1100);
    await waitForAI(page);
    // Select Section 112
    await page.evaluate(() => { selectSection112(); });
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '29-section112-selected');
    await sleep(1700);
    await waitForAI(page);
    await shot(page, '30-section112-payment-options');

    await browser.close();

    const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
    console.log(`\nDone! ${files.length} screens saved to: ${OUT_DIR}`);
})();
