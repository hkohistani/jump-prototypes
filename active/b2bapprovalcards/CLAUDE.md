# Claude Instructions - Jump B2B Admin Assistant Clickable Prototype

## Project Overview

Material UI-based clickable prototype (single HTML file) demonstrating B2B AI chat interaction patterns and approval card layouts for Jump platform operations. No real AI - just scripted scenarios to showcase different UX approaches for review-and-approve workflows.

## What's Been Built

### Single File Structure (`index.html`)
Everything in one HTML file (~2400+ lines):
- Material UI styling (colors, typography, shadows)
- Left navigation menu (62px fixed, collapsible)
- Chat drawer (260px, collapsible)
- AppBar with drawer toggle
- Chat message container with plain text AI responses
- User message bubbles (blue, rounded)
- Three scenario suggestion buttons (hidden after click)
- Dev Tools panel for testing different layouts
- JavaScript functions for four demo scenarios
- Multiple layout rendering functions

### Design System
- **Framework**: Google Material UI (not Tailwind)
- **Fonts**: Roboto (UI), Inter (nav labels), Material Icons
- **Colors**: Primary #2196F3, Info #0288D1, backgrounds #EEEEEE/#FFFFFF
- **Navigation**: 62px fixed left nav with Material Icons (outlined when inactive, filled when active)
- **Logo**: SVG embedded at 40x40px
- **AI Responses**: Plain text, no backgrounds or shadows
- **User Messages**: Blue bubbles with rounded corners, padding, subtle shadow
- **Approval Cards**: Reserved for modules requiring user action

### Four Demo Scenarios

**Scenario 1 - Q&A Pattern:**
- User asks: "What are price types?"
- AI provides structured answer with bullets and examples
- Demonstrates simple conversational knowledge sharing
- Plain text formatting

**Scenario 2 - Guided Workflow:**
- User requests: "Walk me through creating an offer"
- AI shows 3-step process
- Simulates back-and-forth conversation
- Plain text with numbered steps and bullets

**Scenario 3 - Simple Approval Card:**
- User describes problem: "200 unsold seats"
- AI analyzes and recommends action
- Generates interactive approval card (old style):
  - Title: "Enable Flash Sale - 25% Off"
  - Description of action
  - Expected impact projection
  - Approve/Reject buttons
  - Visual state changes

**Scenario 4 - Detailed Offer Review (with Layout Variations):**
- User requests: "Create a single game offer"
- AI generates comprehensive offer review card
- **Four layout options** selectable via Dev Tools:
  1. **Compact** - Original dense layout with expandable System Defaults
  2. **Card-Based** - Sections broken into distinct visual cards (PREFERRED)
  3. **Two-Column** - Side-by-side layout for better space usage
  4. **Scannable List** - Simple label-value rows for easy review (PREFERRED)
- Shows: Offer details, schedule, event/pricing, system defaults
- Interactive approve/decline buttons with state changes
- Demonstrates trust-building review-approve workflow

**Scenario 5 - Fixed Plan (2 groups, AI content):**
- User requests: "Create a half season plan"
- AI generates comprehensive season plan with 2 groups (Premium and Regular)
- **Two layout options** (card-based and scannable):
  - **Card-Based** - Separate cards for each group, AI content highlighted
  - **Scannable** - Clean list format with inline group details
- Shows: 2 groups (Premium: 5 events, Regular: 8 events)
- AI-generated description and member benefits
- Multiple price types per group
- Different seating options per group (Club/Lower Bowl vs Upper Bowl)
- Tests which layout handles complex multi-group offers better

**Scenario 6 - Flex Plan (choose any 10, AI content):**
- User requests: "Create a flexible 10-game pack"
- AI generates flex plan with game selection flexibility
- **Two layout options** (card-based and scannable):
  - **Card-Based** - Flexible selection card with available games list
  - **Scannable** - Inline game selection with clean presentation
- Shows: 1 group with 10 available games to choose from
- AI-generated description highlighting flexibility
- 4 price types including Military
- Multiple seating levels (100/200/300 Level)
- Tests single flexible group pattern vs fixed groups

**Scenario 7 - Clone Offer (based on existing template):**
- User requests: "Clone the Guangzhou Loong Lions offer for Warriors game"
- AI creates new offer based on existing template
- **Two layout options** (card-based and scannable):
  - **Card-Based** - Clone indicator badge with source template info
  - **Scannable** - Inline clone info with clean presentation
- Shows: Clone badge indicating source template
- Updated event (Warriors instead of Guangzhou Loong Lions)
- Same pricing structure inherited from template
- System defaults inherited from template
- Tests how layouts present cloning/template workflow

**Scenario 8 - Update Offer (2 fields with diff/comparison):**
- User requests: "Update my offer with new name and end date"
- AI generates update review showing current vs new values
- **Two layout options** (card-based and scannable):
  - **Card-Based** - 3-column comparison table (Field | Current Value | New Value)
  - **Scannable** - Stacked current/new values per field with edit icons
- Shows: 2 fields being changed (Offer Name and End Date)
- Red strikethrough for old values, green for new values
- Focused review on only what's being modified (not full offer details)
- Tests diff/comparison pattern for update workflows

**Scenario 9 - Update Offer (6 fields with AI-generated content):**
- User requests: "Rebrand Premium Package as VIP Premium Package with extended availability and marketing content"
- AI generates comprehensive update with mix of data changes and AI-generated content
- **Two layout options** (card-based and scannable):
  - **Card-Based** - 3-column comparison table with 6 rows, AI fields highlighted
  - **Scannable** - Stacked format with purple highlights for AI-generated fields
- Shows: 6 fields total (4 data fields + 2 AI-generated content fields)
- Data fields: Offer Name, Public Visibility, Start Date, End Date
- AI-generated fields: Description, Benefits (marked with sparkle icons)
- No "Current Value" for AI-generated fields (they're new additions, not changes)
- AI summary at top explaining the rebrand strategy
- Badges showing scope: 2 groups, 10 events, 3 price types
- Tests how layouts handle complex updates mixing data changes with AI-generated marketing content

### Inventory Scenarios

**Scenario 10 - Inventory Update Small (5 seats, 1 section):**
- User requests: "Add 5 seats in section 10 to the Lakers vs Warriors game inventory"
- AI generates inventory update with visual seat map
- Shows: Simplified seat map visualization with affected section highlighted
- Section 10 highlighted in orange (affected seats)
- Other sections shown in white/gray (unaffected)
- Legend showing affected vs unaffected sections
- VIP badge indicator for event type
- Approve button shows seat count: "Approve (5 seats)"
- Tests inventory approval pattern with visual seat selection

**Scenario 11 - Inventory Update Medium (150 seats, 3 sections):**
- User requests: "Add 150 seats across sections 101, 106, and 141 to the Celtics vs Heat game"
- AI generates inventory update with detailed seat map showing individual seats
- Shows: 3 affected sections with seat dots representing individual seats
- Sections 101, 106, and 141 highlighted in orange
- Individual seat dots shown within each section (varying densities)
- Section 106 spans 2 rows (larger section visualization)
- Legend showing "3 sections, 150 seats"
- Approve button shows "Approve (150 seats)"
- Tests multi-section inventory pattern with seat-level detail

**Scenario 12 - Inventory Update Large (500 seats, 20 sections, 2 events):**
- User requests: "Add 500 seats across 20 sections for the Nets vs Knicks and Nets vs Bucks games"
- AI generates massive-scale inventory update across multiple events
- Shows: 2 events with 20 affected sections across entire venue
- Mix of large filled sections (10+ sections with solid orange) and small sections (dots only)
- Multi-event pattern: "Nets vs Knicks, Nets vs Bucks"
- Premium Experience badge (different from VIP)
- 7-column grid layout with complex section arrangements
- Legend showing "20 sections, 500 seats"
- Approve button shows "Approve (500 seats)"
- Tests large-scale multi-event inventory management pattern

**Scenario 13 - Inventory Update Section Change Only (98 seats, 1 section):**
- User requests: "Mark section 203 as available for the Thunder vs Nuggets game"
- AI generates section status change with detailed seat visualization
- Shows: Single section (203) with dense 8x8 grid of individual seat dots
- More realistic venue layout using absolute positioning (not rigid grid)
- "Available" badge indicating status change focus
- 64 individual seat dots in organized grid pattern
- Organic section placement matching real venue layout
- Legend showing "1 section, 98 seats"
- Tests detailed seat-level status change pattern (vs quantity changes)

**Scenario 14 - Inventory Update Allocation Change Only (25 seats, 1 section):**
- User requests: "Change allocation for Section 118 to 'Courtside Club' for CHI-DET-2024 on 3/15"
- AI generates allocation type change with zoom UI pattern
- Shows: Full venue map with 25+ sections displayed
- Bulls vs Pistons event (CHI-DET-2024)
- "Courtside Club" badge (new allocation type indicator)
- Section 118 highlighted but small in full venue view
- Key feature: "Zoom in to see affected seats" overlay message with zoom icon
- Suggests seats are too detailed to see at full venue zoom level
- Complete venue layout with court center, courtside sections, and upper sections
- Legend showing "1 section, 25 seats"
- Tests allocation change pattern with zoom interaction requirement

**Scenario 15 - Inventory Update Status Change Only (75 seats, 3 sections):**
- User requests: "Mark sections 112, 211, and 232 as 'On Hold' for Suns vs Mavericks"
- AI generates status change with highly detailed realistic venue map
- Shows: 50+ sections in circular arena layout with court center
- Suns vs Mavericks event
- "On Hold" status badge (yellow/amber theme)
- Key features: Interactive zoom controls (+, -, arrow buttons) on right side
- "Zoom in to see affected seats" button (top left, dark gray)
- Affected sections (112, 211, 232) not visible at full zoom - too small to see
- Most realistic venue map of all scenarios - circular border, scattered section placement
- Sections labeled across entire venue (100s, 200s, TI sections)
- Legend showing "3 sections, 75 seats"
- Tests status change pattern with detailed venue visualization and zoom UI

## How It Works

### Dev Tools Panel
- Yellow bug button (fixed bottom-right) toggles panel
- **Approval Type** dropdown: Offer vs Inventory scenarios
- **Layout Style** dropdown: Compact, Card-Based, Two-Column, Scannable
- **Scenario selectors**: Different mock scenarios for each approval type
- Trigger button executes selected scenario
- Panel closes automatically when scenario starts

### Message System
- `addMessage(text, isUser)` - Adds user or AI message to chat
- AI messages: Plain text, no backgrounds, no shadows (reserved for approval cards)
- User messages: Blue bubbles (#2196F3), rounded corners, padding, shadow
- Messages slide in with animation
- Auto-scrolls to bottom
- Welcome state hides on first message

### Layout System (Scenario 4)
- `showScenario4()` - Checks layoutStyle dropdown and routes to appropriate renderer
- `renderCompactLayout()` - Original dense layout with expandable System Defaults
- `renderCardsLayout()` - Sections as distinct visual cards (PREFERRED for complex data)
- `renderTwoColumnLayout()` - Horizontal layout with left/right columns
- `renderScannableLayout()` - Simple list format with label-value pairs (PREFERRED for easy review, optimized spacing)
- All layouts present same data with different visual approaches
- Scannable layouts use tightened spacing: 20px padding (vs 28px), 14px row padding (vs 20px), 22px headers (vs 26px)

### Approval Card System (Legacy - Scenario 3)
- `addApprovalCard(card)` - Creates interactive card
- Card object: `{intro, title, description, impact}`
- Three states: pending (blue) → approved (green) / rejected (red)
- Buttons trigger visual state changes

### Scenario Functions
- `showScenario1()` - Q&A demo, plain text response
- `showScenario2()` - Guided workflow demo, plain text with steps
- `showScenario3()` - Simple approval card (old style)
- `showScenario4()` - Detailed single game offer with 4 layout variations
- `showScenario5()` - Fixed plan (2 groups) with card-based and scannable layouts
- `showScenario6()` - Flex plan (choose any 10) with card-based and scannable layouts
- `showScenario7()` - Clone offer (template-based) with card-based and scannable layouts
- `showScenario8()` - Update offer (2 fields) with diff/comparison layouts
- `showScenario9()` - Update offer (6 fields with AI content) with diff/comparison layouts
- `showScenarioInventorySmall()` - Inventory update (5 seats, 1 section) with seat map visualization
- `showScenarioInventoryMedium()` - Inventory update (150 seats, 3 sections) with individual seat dots
- `showScenarioInventoryLarge()` - Inventory update (500 seats, 20 sections, 2 events) large-scale multi-event
- `showScenarioInventorySectionChange()` - Inventory section change (98 seats, 1 section) detailed seat-level status update
- Each uses `await delay()` to simulate thinking/typing
- Scenarios hide suggestions on start (suggestions stay hidden after click)

### Timing
- User message: 300ms delay
- AI response: 800-1200ms delay
- Creates realistic conversation pacing

## Architecture Decisions

**Why single HTML file:**
- Ultra-simple to share
- No dependencies or setup
- Anyone can open and run
- Easy to demo in meetings

**Why pre-scripted:**
- Focuses on UX, not implementation
- No API keys or setup required
- Consistent demo experience
- Fast to iterate on content

**Why Material UI (not Tailwind):**
- Engineering team uses Material UI
- Code review by engineering for production feasibility
- Matches Figma design from engineering: https://www.figma.com/design/MRNVT8iXEaKS4CyIa9uqCK/Master?node-id=9786-3527
- Material Design patterns (elevation, shadows, typography)

**Why multiple layout options:**
- Testing different approaches for review-approve workflows
- Card-based good for complex nested data
- Scannable list good for quick verification (optimized for space efficiency)
- Will validate across multiple scenarios to see which works best
- Users need to review carefully due to low trust in AI technology
- Scannable layout uses tightened spacing (20-25% more compact) to maximize screen real estate

**Why plain text AI responses:**
- Visual elements (cards, backgrounds, shadows) reserved for approval modules
- Keeps focus on actionable items
- Cleaner conversation experience

## Component Consistency & Reusability

### Standardized Patterns (for Engineering Handoff)
All scannable layouts follow consistent patterns:

**Status Badges:**
- Text: "OFFER PENDING REVIEW"
- Style: `#e3f2fd` background, `#1565c0` text, 11px, 500 weight

**Subtitles:**
- Font: 15px, gray for create scenarios, blue for update scenarios
- Margin: 8px bottom spacing

**Summary Badges (Groups/Events/Price Types):**
- Style: `#f5f5f5` background, dark text, no borders
- Size: 13px, 6px 14px padding

**Info Banners:**
- Theme: Indigo (`#e8eaf6` background, `#3f51b5` left border)
- Padding: 14px, margin: 20px 0
- Typography: 14px, line-height 1.6

**Typography:**
- Headers: 22px H3, weight 400, line-height 1.3
- Labels: 14px, weight 500, gray color
- Values: 15px, dark color
- Descriptions: 14px, line-height 1.6

**Buttons:**
- Padding: 12px 20px (tightened spacing)
- Font: 15px, weight 500
- Shadow: 0px 3px 6px for approve button
- Border: 2px solid #e0e0e0 for decline button

**Icons (Functional Only):**
- AI Content: `auto_awesome` (sparkle), purple #8e24aa
- Edit/Changes: `edit`, orange #ff9800
- Size: 16px, vertical-align: middle
- Pattern: Icons indicate **semantic meaning**, not decoration
  - Sparkle = AI generated this field
  - Edit = This field is being modified
  - No icon = Regular data field
- Note: Icon is the only AI indicator - no additional background colors or borders

**Color Palette (Minimal):**
- Status badges: Blue (#e3f2fd background, #1565c0 text)
- Summary badges: Gray (#f5f5f5 background, dark text)
- Info banners: Indigo (#e8eaf6 background, #3f51b5 border)
- AI icon: Purple (#8e24aa)
- Edit icon: Orange (#ff9800)
- Current values (updates): Red strikethrough (#d32f2f)
- New values (updates): Standard dark text (no green)
- Principle: Minimal color usage for maximum clarity

## What's In Progress / TODO

### Completed
- [x] Create Single Game Offer (Scenario 4) with 4 layout variations
- [x] Create Fixed Plan (Scenario 5) with card-based and scannable layouts
- [x] Create Flex Plan (Scenario 6) with card-based and scannable layouts
- [x] Clone Offer (Scenario 7) with card-based and scannable layouts
- [x] Update Offer (Scenario 8) with diff/comparison layouts for 2 fields
- [x] Update Offer (Scenario 9) with diff/comparison layouts for 6 fields + AI content
- [x] Six different offer patterns tested: creation, multi-group, flexible selection, cloning, simple updates, complex updates with AI
- [x] Card-based layout handles all complexity levels and patterns well
- [x] Scannable layout provides clean review experience across all types
- [x] Clone indicator successfully communicates template inheritance
- [x] Diff/comparison pattern effectively shows changes in update workflows
- [x] AI-generated content fields clearly distinguished with sparkle icons and purple highlights

### Next Steps
- [ ] Build out inventory scenarios with both layout styles - if needed
- [ ] Gather feedback on which layout works better for different complexity levels
- [ ] Make final layout selection based on testing
- [ ] Potentially add more interaction patterns if needed

### Current Focus
- Validating card-based and scannable list layouts across different offer types
- Testing how layouts handle varying complexity (simple vs multi-group)
- Focusing on review-approve workflow for low-trust AI environment

## What's NOT Built

- ❌ Real AI integration
- ❌ User input handling (text field)
- ❌ Chat history/persistence
- ❌ Backend/API connections
- ❌ Authentication
- ❌ Analytics
- ❌ Inline editing in chat (by design - users must instruct AI to make changes)

**This is intentional** - it's a clickable prototype for UX demonstration, not a functional product.

## Common Tasks

### Add a New Scenario

1. **Create button in HTML:**
```html
<button onclick="showScenario4()" class="...">
    <div class="font-medium">🎨 New Pattern</div>
    <div class="text-xs text-gray-500">Description</div>
</button>
```

2. **Add function in script:**
```javascript
async function showScenario4() {
    suggestionsDiv.style.display = 'none';
    await delay(300);
    addMessage("User question here", true);
    await delay(800);
    addMessage("AI response here");
    suggestionsDiv.style.display = 'block';
}
```

### Modify Approval Card Content

Edit the card object in `showScenario3()`:
```javascript
addApprovalCard({
    intro: "Context text before card",
    title: "Action Title",
    description: "What the action does",
    impact: "What will happen"
});
```

### Change Timing/Pacing

Adjust `delay()` values:
- 300ms = quick
- 800ms = medium (default)
- 1200ms = longer (analyzing)

### Style Changes

Edit `tailwind.config` in `<script>` tag or add inline classes

## Testing Notes

**Tested:**
- ✅ All three scenarios work
- ✅ Approval card approve/reject interactions
- ✅ Reset functionality
- ✅ Mobile responsive
- ✅ Animations smooth

**Not Tested:**
- Different browsers (only Chrome/Safari)
- Accessibility features
- Performance with many messages

## Known Issues / Limitations

1. **No actual AI** - Everything is pre-scripted
2. **Can't type messages** - Only click scenario buttons
3. **No persistence** - Refresh loses state (intentional)
4. **Static content** - Can't add custom scenarios without editing code
5. **Single conversation path** - Each scenario has one predetermined flow

**These are features, not bugs** - this is a clickable prototype, not a product.

## Deployment

### To Deploy:
```bash
# Option 1: Vercel
vercel deploy

# Option 2: Netlify
netlify deploy --prod

# Option 3: GitHub Pages
# Just commit and enable Pages in repo settings
```

No build step, no env vars, no configuration needed.

### After Deployment:
- Share URL with stakeholders
- No setup required for viewers
- Works on all devices

## Future Directions

### If Turning This Into Real Product:
1. Add Claude API integration (see deleted files for reference)
2. Add text input and actual conversation handling
3. Connect to Jump platform APIs
4. Add authentication
5. Implement real action execution

### If Keeping as Prototype:
1. Add more demo scenarios (5-6 total)
2. Improve visual polish
3. Add more approval card examples
4. Show error states and edge cases

## File Organization

**Current:**
- `index.html` - Everything (350 lines)
- `README.md` - User-facing docs
- `CLAUDE.md` - This file

**Old files removed:**
- `src/app.jsx` - Deleted (was full React app)
- `src/components/` - Deleted (not needed)
- `src/utils/` - Deleted (was API integration)

**Kept:**
- `CONTEXT.md` - Jump company context
- `.gitignore` - Standard ignores

## Quick Reference

**Total Code:** ~2400+ lines in one HTML file

**Scenarios:**
1. Q&A Pattern (~30 lines)
2. Guided Workflow (~50 lines)
3. Simple Approval Card (~20 lines)
4. Detailed Offer Review with 4 layout variations (~1500 lines for all layouts)

**Key Functions:**
- `addMessage()` - Adds chat messages
- `addApprovalCard()` - Legacy approval card (Scenario 3)
- `showScenario4()` - Routes to appropriate layout renderer
- `renderCompactLayout()` - Dense layout with expandable sections
- `renderCardsLayout()` - Card-based sections (preferred for complex data)
- `renderTwoColumnLayout()` - Horizontal layout
- `renderScannableLayout()` - Simple list format (preferred for review)
- `approveOfferCard()` / `rejectOfferCard()` - Handle approval states
- `toggleSystemDefaults()` - Expand/collapse system defaults section
- `toggleDrawer()` - Show/hide chat drawer
- `toggleDevTools()` - Show/hide dev tools panel
- `triggerScenario()` - Executes selected scenario from Dev Tools

**Styling:**
- Material UI design system
- Roboto font family
- Material Icons (outlined/filled)
- No Tailwind

---

**Summary:** Material UI clickable prototype showcasing different layout approaches for review-approve workflows. Single HTML file, four demo scenarios, dev tools for testing layouts. Focus on card-based and scannable list layouts as primary directions. Perfect for stakeholder demos and UX validation with engineering team.
