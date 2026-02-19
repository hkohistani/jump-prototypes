# Rapid Prototyping Workflow

## Description
This skill guides rapid prototype development for design explorations and proof-of-concept projects that need to be shared with stakeholders and non-technical users. Emphasizes speed, clear documentation, and stakeholder-ready deployments.

## When to Use This Skill
- Creating new prototypes or design explorations
- Building feature demonstrations (AI-powered or traditional)
- Developing proof-of-concept projects
- Any project that needs to be shared with leadership or non-technical stakeholders
- Quick explorations that may evolve into production features

## One-Time Setup

**1. Clone the jump-resources repository:**
```bash
# Clone to a persistent location (outside of individual projects)
git clone git@gitlab.com:theworkingname/jump/services/jump-resources.git ~/jump-resources

# Or choose another location that makes sense for your system
```

This repo contains:
- `jump_company_context.md` - Company background, product info, user personas
- `.infra/` - Infrastructure and deployment configurations

**2. Set up your prototypes directory structure:**
```bash
# Create organized project structure
mkdir -p ~/Projects/jump-prototypes/{active,deployed,archive,_resources,_shared}

# Create shared component directories
mkdir -p ~/Projects/jump-prototypes/_shared/{components,utils,hooks,styles}

# Copy workflow to resources
cp /mnt/skills/user/rapid-prototyping/SKILL.md ~/Projects/jump-prototypes/_resources/rapid-prototyping-workflow.md
```

**Why this matters:** 
- Having jump-resources cloned means Claude can always reference the latest company context
- The organized structure keeps prototypes manageable as they accumulate
- _shared/ becomes your reusable component library over time

## Project Structure

### Recommended Prototypes Organization

```
~/Projects/jump-prototypes/
├── active/                     # Currently working on (3-5 max)
├── deployed/                   # Live prototypes under review
├── archive/                    # Completed or abandoned
│   ├── 2024/
│   └── 2025-q1/
├── _resources/                 # Workflow docs, templates
│   └── rapid-prototyping-workflow.md
└── _shared/                    # 👈 Reusable components library
    ├── components/             # UI components (ClaudeChat, TicketCard, etc.)
    ├── utils/                  # Common utilities (API wrappers, formatters)
    ├── hooks/                  # React hooks (useClaudeChat, etc.)
    ├── styles/                 # Design tokens, themes
    └── README.md               # Component documentation
```

### Individual Prototype Structure
```
project-name/
├── CONTEXT.md               # Copied from jump-resources repo
├── README.md                # Project overview (for humans)
├── CLAUDE.md                # Instructions for Claude (for AI handoff)
├── src/                     # Source code
│   ├── components/          # Reusable components
│   ├── pages/               # Page-level components
│   └── utils/               # Helper functions
├── public/                  # Static assets
├── package.json             # Dependencies
└── vercel.json             # Deployment configuration (optional)
```

### Naming Conventions
- Use descriptive, kebab-case names: `campaign-builder-prototype`, `fan-engagement-dashboard`
- Prefix with context when relevant: `jump-ai-concierge`, `timberwolves-memories-feature`

### Organization Principles

**Make it easy for someone else to pick up:**
- Clear, self-explanatory folder names (`components/`, not `comp/`)
- Group related files together logically
- Avoid deep nesting (3 levels max when possible)
- Keep file names descriptive: `TicketRecommendationEngine.tsx`, not `engine.tsx`

**Good structure example:**
```
campaign-builder-prototype/
├── CONTEXT.md              # Company/product context
├── README.md               # Project overview
├── CLAUDE.md               # Instructions for Claude
├── src/
│   ├── components/
│   │   ├── CampaignBuilder/
│   │   ├── OfferSelector/
│   │   └── shared/
│   ├── pages/
│   ├── utils/
│   └── api/
├── public/
└── docs/                   # Additional documentation
```

**Bad structure example:**
```
proj/
├── c/                      # What is this?
├── p/                      # What is this?
├── stuff/                  # Too vague
└── utils2/                 # Why 2?
```

## Shared Components & Reusable Code

### Philosophy: Don't Rebuild What Already Works

As you build prototypes, you'll create components and utilities that could be useful in future projects. The `_shared/` directory is your personal component library.

### When Starting a New Prototype

**Always check `_shared/` first:**

```bash
# Before building anything, see what exists
cat ~/Projects/jump-prototypes/_shared/README.md

# Need AI chat? Copy it instead of rebuilding
cp -r ~/Projects/jump-prototypes/_shared/components/ClaudeChat ./src/components/

# Need ticket filtering logic? Copy it
cp ~/Projects/jump-prototypes/_shared/utils/ticketFilters.ts ./src/utils/
```

**Benefits:**
- ✅ Faster prototype development
- ✅ Consistent patterns across prototypes
- ✅ Battle-tested code (already worked in other projects)
- ✅ Easy to improve and share improvements

### What Goes in _shared/

**Good candidates for _shared/:**
- **Components**: AI chat interfaces, ticket cards, loading states, error boundaries, Jump-branded UI elements
- **Utils**: API wrappers (Claude API, Jump APIs), formatters (dates, prices), filtering logic
- **Hooks**: useClaudeChat, useTicketData, useLocalStorage
- **Styles**: Design tokens (colors, fonts), Tailwind configs, brand themes

**When to extract to _shared/:**
- ✅ Used in 2+ prototypes (or likely to be)
- ✅ Battle-tested and working well
- ✅ General enough to be reusable
- ✅ Would save significant time to reuse

**Don't extract:**
- ❌ Highly prototype-specific code
- ❌ Experimental/unproven patterns  
- ❌ One-off solutions

### How to Extract to _shared/

**After you've built something reusable in a prototype:**

```bash
# 1. Copy from your prototype to _shared
cd ~/Projects/jump-prototypes/active/campaign-builder
cp -r ./src/components/OfferSelector ../_shared/components/

# 2. Document it in _shared/README.md
# Add entry describing the component, what it does, how to use it

# 3. Optional: commit to git if tracking _shared
cd ../_shared
git add .
git commit -m "[SHARED] Add OfferSelector from campaign-builder"
```

### Workflow Integration

**The pattern:**
1. **Check** `_shared/` before starting → Copy what exists
2. **Build** what's missing in your prototype
3. **Extract** reusable pieces back to `_shared/` after validation
4. **Document** in `_shared/README.md`
5. **Reuse** in next prototype

**This creates a virtuous cycle:**
- First prototype: Build everything from scratch
- Second prototype: Reuse 20% from _shared/
- Third prototype: Reuse 40% from _shared/
- Fourth prototype: Reuse 60% from _shared/
- Eventually: New prototypes start 80% complete

### Examples of Shared Code

**Real-world examples you'll likely create:**

**AI Features:**
```typescript
// _shared/utils/claudeApi.ts
export async function streamClaudeResponse(prompt: string) {
  // Handles API calls, streaming, error states
  // Used in: campaign-builder, fan-concierge, ticket-advisor
}

// _shared/hooks/useClaudeChat.ts
export function useClaudeChat() {
  // Manages chat state, message history, API calls
  // Drop into any prototype that needs chat
}
```

**Jump-Specific Components:**
```typescript
// _shared/components/TicketCard/
// Standardized ticket display
// Used across: checkout, seat-selection, resale, search

// _shared/components/SeasonTicketHolderBadge/
// Shows STH status consistently
// Used in: fan-profiles, checkout, concierge
```

**Common Utilities:**
```typescript
// _shared/utils/jumpFormatters.ts
export function formatGameTime(date: Date) { }
export function formatTicketPrice(cents: number) { }
export function formatSeatLocation(section: string, row: string) { }
// Used everywhere
```

## Intended Audience

### Primary Audiences
1. **Executive Leadership (C-suite)**: Focus on business value, high-level capabilities, strategic vision
2. **Product/Engineering Teams**: Demonstrate technical feasibility, implementation approach
3. **Stakeholders (Sales, Marketing)**: Show end-user experience, practical applications
4. **Non-technical Users**: Clear, intuitive interfaces with explanatory context

### Prototype Requirements by Audience
- **For Leadership**: Include explanatory text, business context, clear value proposition
- **For Technical Teams**: Include code comments, architecture notes, technical documentation
- **For Stakeholders**: Add user guides, walkthrough flows, contextual help
- **For All**: Deploy live demos they can interact with (no local setup required)

## Git Workflow

### When to Use Git

**Always initialize git for any prototype**, even exploratory ones. Here's why:

✅ **Use git from the start when:**
- You plan to share this prototype (even if just internally)
- The prototype might evolve into something real
- You're working on it for more than a few hours
- Multiple people might touch the code

**CRITICAL: Commit before any major operations**
⚠️ **ALWAYS commit before:**
- Asking Claude Code or AI tools to reorganize/refactor your project
- Renaming files or restructuring directories
- Deleting or moving files in bulk
- Making sweeping changes across multiple files

**Why this matters:** AI tools can accidentally delete or move files that aren't tracked in git. If those changes aren't committed, you'll lose work. Commit first = safety net.

### Getting Started with Git

**Initial setup:**
```bash
git init
git add .
git commit -m "[INIT] Project setup"
```

Do this as soon as you have:
- Basic project structure
- Key files created
- Dependencies installed

**Don't wait until "ready to share"** - that's too late. Git is your undo button.

### Commit Message Format
Use clear, descriptive commit messages:

```
[SCOPE] Brief description

Examples:
[INIT] Set up project structure
[FEATURE] Add ticket recommendation engine
[UI] Implement dashboard interface
[FIX] Resolve calculation bug
[REFACTOR] Reorganize component structure
[DEPLOY] Configure Vercel deployment
[DOCS] Add stakeholder guide
```

### Recommended Commit Frequency

**Minimum (safe):**
- After initial setup
- Before any AI-assisted refactoring or reorganization
- Before deployment
- When you're "done" with a work session

**Ideal (safer):**
- After completing each feature or component
- Before and after major changes
- Whenever you think "I don't want to lose this"

**The golden rule:** If you're about to ask an AI tool to make sweeping changes, commit first. No exceptions.

### Branch Strategy (optional, use when needed)
- `main`: Working version, ready to deploy
- Feature branches for experiments: `feature/new-idea`, `experiment/voice-ui`
- Most prototypes can stay on `main` until complexity demands branching

## Deployment to Vercel

### Deployment Triggers
- Deploy after significant feature completion
- Deploy before stakeholder reviews or presentations
- Deploy when prototype is ready for external feedback

### Deployment Checklist
1. ✅ README.md reflects current features and status
2. ✅ CLAUDE.md is up-to-date with latest changes and TODOs
3. ✅ All features are functional (no broken states)
4. ✅ Test with sample data relevant to Jump's use cases
5. ✅ Add loading states and error handling for AI features
6. ✅ Include explanatory text for non-technical users
7. ✅ Commit all changes with clear message
8. ✅ Deploy to Vercel
9. ✅ Test deployed version
10. ✅ Update README with deployment URL
11. ✅ Share deployment URL with stakeholders

### Vercel Configuration
- Set up environment variables for any API keys (Claude API, etc.)
- Configure build settings based on framework (Next.js, React, etc.)
- Use preview deployments for experimental branches
- Production deployments from main branch only

## Documentation Requirements

### Core Documentation Files

Every project should maintain these files, keeping them **up-to-date as the project evolves**:

#### 1. **README.md** (for humans)
Update this whenever you make significant changes. Should always reflect the current state.

**Must include:**
```markdown
# [Project Name]

## What This Is
Brief description - what does this prototype demonstrate?

## Current Status
What works? What's in progress? What's not implemented yet?

## Target Audience
Who is this for? (Reference personas from CONTEXT.md)

## Key Features
- Feature 1: Brief description
- Feature 2: Brief description

## How to Run Locally
1. Clone the repo
2. `npm install`
3. `npm run dev`
4. Visit http://localhost:3000

## Environment Variables (if needed)
- `ANTHROPIC_API_KEY`: Your Claude API key
- `OTHER_VAR`: Description

## Deployed URL
https://prototype-name.vercel.app

## Technical Stack
- Framework: Next.js 14
- Key libraries: react, tailwind, etc.

## Project Structure
Brief explanation of main folders and their purpose

## Last Updated
[Date] - [What changed]
```

#### 2. **CLAUDE.md** (for AI assistants)
**This is critical for handoff.** When someone else opens this project with Claude, their Claude instance reads this file to understand the project quickly.

**Must include:**
```markdown
# Claude Instructions for [Project Name]

## Project Overview
[1-2 sentence summary]

## What's Been Built
- Completed features and their locations
- Key components and what they do
- API integrations (if any)

## How Things Work
- Architecture overview
- Key decisions and why (e.g., "Using Zustand for state because...")
- Important patterns or conventions used

## What's In Progress / TODO
- [ ] Feature X - partially complete, see `src/components/X/`
- [ ] Bug in Y - issue description
- [ ] Need to add Z

## Common Tasks
How to add new features, modify existing ones, etc.

## Known Issues / Gotchas
- Issue 1: Description and workaround
- Issue 2: Description and workaround

## Testing Notes
What's been tested, what hasn't, edge cases to watch for

## Deployment
Current process and any important notes
```

**When to update CLAUDE.md:**
- ✅ After completing a major feature
- ✅ When you discover a gotcha or important pattern
- ✅ Before handing off to someone else
- ✅ When you make architectural changes
- ✅ At the end of each work session (if significant changes)

#### 3. **CONTEXT.md** (company/product context)
Copied from jump-resources, stays mostly static unless company context changes.

### Documentation Maintenance Rules

**Keep documentation current - it's as important as the code:**

1. **Update README.md when you:**
   - Add/remove major features
   - Change how to run the project
   - Deploy to a new URL
   - Change the tech stack

2. **Update CLAUDE.md when you:**
   - Complete a feature (move from TODO to "What's Been Built")
   - Discover important patterns or gotchas
   - Make architectural decisions
   - Fix a tricky bug that someone else should know about

3. **Commit documentation with code:**
   ```bash
   git add .
   git commit -m "[FEATURE] Add ticket filtering + update docs"
   ```
   Not as separate commits later - document as you build.

4. **Before handoff checklist:**
   - [ ] README reflects current state
   - [ ] CLAUDE.md is up-to-date with latest changes
   - [ ] All TODOs are documented
   - [ ] Known issues are listed
   - [ ] Deployment URL is correct
   - [ ] Environment variables are documented

### Why This Matters

**Without current documentation:**
- Next person wastes time figuring out what's done vs. in-progress
- Their Claude instance doesn't understand the project
- Work gets duplicated or undone
- Important context gets lost

**With current documentation:**
- New person's Claude reads CLAUDE.md and immediately understands the project
- Clear handoff, less context loss
- Easier to pick up after weeks/months away
- Prototype can evolve without the original creator

### README.md Must Include
1. **Project Overview**: What this prototype demonstrates
2. **Target Audience**: Who this is designed for (fans, sales reps, marketing, etc.)
3. **Key Features**: Bullet list of main capabilities
4. **How to Use**: Quick start guide for non-technical users
5. **Technical Notes**: Framework, key dependencies, architecture decisions
6. **Context**: How this fits into Jump's broader vision

### In-App Documentation
- Add tooltips, help text, or info icons for complex features
- Include sample data or example workflows
- Provide clear CTAs and navigation cues
- Add "About this prototype" section when relevant

## Context Files and Documentation

### Using Jump Company Context

**When starting a new prototype, always copy the latest company context:**

```bash
# Copy from your cloned jump-resources repo
cp ~/jump-resources/jump_company_context.md ./CONTEXT.md

# Or create a symlink if you prefer
ln -s ~/jump-resources/jump_company_context.md ./CONTEXT.md
```

**The `jump_company_context.md` file includes:**
- Company background and mission
- Product overview (Jump ticketing platform)
- Target user personas (fans, sales reps, marketing, operations)
- Key terminology and use cases
- Technical context and constraints

**Why include context in each project:**
- AI tools work better when they understand the domain
- New collaborators can quickly understand the project
- Context persists even if the main repo isn't accessible
- Prototypes become self-documenting

### Additional Context Files (optional)

For complex prototypes, you may want to add:

**`TECHNICAL_CONTEXT.md`** - Project-specific technical decisions:
```markdown
## Tech Stack
- Framework: Next.js 14, React 18
- Styling: Tailwind CSS
- AI: Claude Sonnet 4.5 API

## Architecture Decisions
- Why we chose X over Y
- Key constraints or limitations

## Dependencies
- List critical libraries
- Note any version-specific requirements
```

**`PROTOTYPE_CONTEXT.md`** - What this specific prototype is exploring:
```markdown
## Purpose
What problem does this solve?

## Target Audience
Who is this for? (specific persona from company context)

## Success Criteria
What does "working" look like?

## Out of Scope
What we're NOT trying to solve
```

### Using Context in Development
- Claude (or Claude Code) should read context files when starting work
- Reference context when making design/technical decisions
- Update context files when you discover new patterns or constraints
- Keep context concise but comprehensive

## Company-Specific Context

### Design System Integration (if applicable)
- Use existing component libraries when available
- Maintain brand consistency (colors, typography, etc.)
- Reference existing UI patterns where possible

### User Personas and Use Cases
Prototypes should align with your core user personas:
- Define who the prototype is for
- Include realistic use cases and scenarios
- Use authentic data and terminology from your domain

### Integration Standards (when using AI)
- Specify which AI models/APIs to use
- Include loading states and error handling
- Make AI interactions feel responsive and contextual
- Show AI reasoning when it adds value for the user

## Example Workflow

```bash
# 0. Check what's reusable before starting
cat ~/Projects/jump-prototypes/_shared/README.md
# See if AI chat, ticket components, or utilities already exist

# 1. Start new prototype
cd ~/Projects/jump-prototypes/active
mkdir fan-concierge-prototype
cd fan-concierge-prototype
git init

# 2. Copy company context
cp ~/jump-resources/jump_company_context.md ./CONTEXT.md

# 3. Copy shared components if needed
# Example: Need AI chat? Copy it instead of rebuilding
cp -r ../../_shared/components/ClaudeChat ./src/components/ 2>/dev/null || echo "No shared components yet"
cp ../../_shared/utils/claudeApi.ts ./src/utils/ 2>/dev/null || echo "No shared utils yet"

# 4. Create initial documentation
# Create README.md with project overview
# Create CLAUDE.md with initial architecture notes

# 5. Set up project structure
# (create remaining files, install dependencies)

git add .
git commit -m "[INIT] Set up fan concierge with docs and shared components"

# 6. Build features (using shared components where possible)
# (develop ticket recommendation interface)

# 7. Update CLAUDE.md with what you built
# Update README.md if needed

git add .
git commit -m "[FEATURE] Add ticket recommendations + update docs"

# 8. Extract reusable components back to _shared
# Did you build something that could be reused?
cp -r ./src/components/TicketRecommendationEngine ../../_shared/components/
# Update _shared/README.md to document it

# 9. Continue building and documenting
# (add more features, keep CLAUDE.md current)

git add .
git commit -m "[FEATURE] Add conversation history + update CLAUDE.md"

# 10. Before deployment - verify documentation
# Check README is current
# Ensure CLAUDE.md reflects latest state
# Document any TODOs or known issues

git add .
git commit -m "[DOCS] Update all docs for handoff readiness"

# 11. Deploy to Vercel
vercel deploy --prod

# 12. Update README with deployment URL

git add README.md
git commit -m "[DEPLOY] Add production URL to README"

# 13. Share with stakeholders
# (send deployment URL via Slack/email)
```

## Best Practices

### Check _shared/ First
- **Before building anything** - browse `_shared/README.md` to see what exists
- **Copy, don't link** - simpler to customize per prototype
- **Extract after validation** - don't add to _shared/ until proven in a real prototype
- **Document when extracting** - update `_shared/README.md` immediately

### Documentation as You Build
- **Don't wait until the end** - update docs as you build features
- **CLAUDE.md is your handoff insurance** - keep it current
- **README is your marketing** - make it clear what works now
- **Commit docs with code** - they're equally important

### Speed vs. Polish
- Prototypes should be functional, not pixel-perfect
- Focus on demonstrating capability and user experience
- Prioritize working features over comprehensive edge case handling
- Polish only what stakeholders will interact with

### Building Your Component Library
- **Start small**: Don't try to build comprehensive library upfront
- **Extract, don't predict**: Only add things you've used twice
- **Improve iteratively**: Each prototype can improve shared components
- **Keep it simple**: Prototype quality, not production quality

### AI-Powered Features (when applicable)
**Only apply these guidelines when the prototype includes AI features:**

- Always show AI is "thinking" with loading states
- Handle API errors gracefully (AI calls can fail)
- Use realistic, domain-specific prompts and data
- Make AI interactions feel conversational and helpful
- Test with actual API calls (not mocked) when preparing to share
- Consider rate limits and costs in prototype design

### Iteration Strategy
- Start with core feature, deploy, gather feedback
- Add features incrementally based on stakeholder input
- Keep deployment URL stable - update in place rather than new URLs

### Time Management
- Timebox prototype development (typically 1-3 days)
- Deploy early and often
- Document as you build (don't save for the end)

## Common Gotchas

- **Forgotten Environment Variables**: Always test deployed version with production API keys
- **Localhost References**: Remove any hardcoded localhost URLs before deployment
- **Missing Context**: Non-technical users need more explanation than you think
- **Broken State**: Test all user flows, not just the happy path
- **Stale Deployments**: After major changes, re-deploy and share new URL
- **Stale Documentation**: CLAUDE.md says feature X is TODO but it's actually done - kills handoff efficiency
- **Missing CLAUDE.md**: Next person's Claude instance has to reverse-engineer the project from scratch

## Success Criteria

A successful prototype:
✅ Runs without errors in production (Vercel)
✅ Has current README.md that reflects actual state
✅ Has up-to-date CLAUDE.md for easy handoff
✅ Includes clear documentation for intended audience
✅ Demonstrates core value proposition immediately
✅ Has been committed to git with clear history
✅ Can be shared via simple URL (no setup required)
✅ Aligns with Jump's product vision and use cases
✅ Can be picked up by another person (with their Claude) quickly
✅ Reusable components extracted to _shared/ (if applicable)
