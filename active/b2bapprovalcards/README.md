# Jump B2B Admin Assistant - Clickable Prototype

## What This Is

An interactive clickable prototype demonstrating AI-powered chat interactions for Jump platform operations teams. Shows three key B2B interaction patterns: conversational Q&A, guided workflows, and approval cards.

## Current Status

**This is a clickable prototype** - no real AI, just pre-scripted scenarios to demonstrate UX patterns.

**Working:**
- ✅ Three interactive demo scenarios
- ✅ Animated message appearances
- ✅ Interactive approval cards (approve/reject)
- ✅ Guided workflow visualization
- ✅ Mobile responsive design

## Target Audience

**Primary**: Jump operations team and client administrators
**Use Cases**: Platform configuration, event setup, campaign creation

## Key Features Demonstrated

### 1. Conversational Q&A
Click "Simple Q&A" to see how the AI answers questions about Jump platform features like price types, access control, etc.

### 2. Guided Workflows
Click "Guided Workflow" to see a step-by-step wizard for creating promotional offers. Shows progressive disclosure and status indicators.

### 3. Interactive Approval Cards
Click "Approval Cards" to see AI-generated recommendations with one-click approve/reject actions. Includes:
- Clear action title and description
- Expected impact analysis
- Visual status changes (pending → approved/rejected)

## How to Test

1. **Open in browser:**
   ```bash
   # Option A: Python
   python3 -m http.server 8000

   # Option B: Just double-click index.html
   open index.html
   ```

2. **Click any scenario button** to see the interaction play out

3. **Try the approval card** - click approve or reject to see state changes

4. **Reset** to try another scenario

## What's Demonstrated

**Scenario 1 - Q&A Pattern:**
- Natural language question
- Structured, formatted answer
- Contextual examples

**Scenario 2 - Guided Workflow:**
- Multi-step process visualization
- Progress indicators (completed/current/upcoming)
- Conversational back-and-forth
- Step validation and confirmation

**Scenario 3 - Approval Cards:**
- AI analyzes situation
- Generates actionable recommendation
- Shows expected impact
- One-click decision making
- Visual feedback on approval/rejection

## Tech Stack

- **Single HTML file** - Pure vanilla JavaScript
- **Tailwind CSS** - via CDN for styling
- **No build tools** - Edit and refresh
- **No dependencies** - Just open and run

## Project Structure

```
b2bapprovalcards/
├── index.html          # Everything in one file
├── README.md           # This file
├── CLAUDE.md           # For AI handoff
└── CONTEXT.md          # Jump company context
```

## Use Cases for Stakeholders

**Share this prototype to:**
- Demonstrate B2B AI chat vision to leadership
- Get feedback on interaction patterns
- Test approval card UX with operations team
- Discuss guided workflow concepts

## Next Steps (If Moving Forward)

### To Make This Real:
1. Connect to actual Claude API
2. Integrate with Jump platform APIs
3. Add user authentication
4. Implement real action execution

### To Expand Prototype:
- Add more scenarios (event setup, pricing strategy, etc.)
- Show multi-step workflows with more depth
- Add data visualization examples
- Demonstrate error handling patterns

## Deployment

Ready to deploy! Just upload `index.html` anywhere:
- Vercel/Netlify (drag and drop)
- GitHub Pages
- Any static host

No build step, no environment variables, no configuration needed.

## Last Updated

**2026-01-29** - Simplified to clickable prototype
- Removed API integration complexity
- Created three pre-scripted demo scenarios
- Focused on UX demonstration over functionality
