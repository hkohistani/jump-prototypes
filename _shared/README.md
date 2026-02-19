# Jump Shared Prototype Components

## Overview
This library contains reusable components, utilities, and patterns extracted from prototypes. When building new prototypes, check here first before rebuilding common functionality.

## Philosophy
- **Extract after validation**: Build in prototypes first, move here after it works
- **Don't over-engineer**: Keep it simple, these are prototype-quality components
- **Document usage**: Note which prototypes use each piece
- **Update as you go**: If you improve something, update the shared version

## Directory Structure

```
_shared/
├── components/     # Reusable UI components
├── utils/          # Common utility functions
├── hooks/          # React hooks
├── styles/         # Design tokens, themes, shared styles
└── README.md       # This file
```

## Components

### ClaudeChat (example - add when created)
**Purpose**: AI chat interface with Claude API integration  
**Used in**: campaign-builder, fan-concierge  
**Features**: Streaming responses, error handling, message history  
**How to use**:
```bash
cp -r _shared/components/ClaudeChat ./src/components/
```

### TicketCard (example - add when created)
**Purpose**: Standard ticket display component  
**Used in**: checkout-flow, seat-selection  
**Features**: Price, seat info, status badges  
**How to use**:
```bash
cp -r _shared/components/TicketCard ./src/components/
```

## Utils

### claudeApi.ts (example - add when created)
**Purpose**: Wrapper for Claude API calls  
**Features**: Handles auth, streaming, error states, rate limiting  
**How to use**:
```bash
cp _shared/utils/claudeApi.ts ./src/utils/
```

### ticketFilters.ts (example - add when created)
**Purpose**: Common ticket filtering and sorting logic  
**Used in**: Multiple prototypes with ticket lists  
**How to use**:
```bash
cp _shared/utils/ticketFilters.ts ./src/utils/
```

## Hooks

### useClaudeChat (example - add when created)
**Purpose**: Manages chat state, API calls, message history  
**Used in**: Any prototype with AI chat  
**How to use**:
```bash
cp _shared/hooks/useClaudeChat.ts ./src/hooks/
```

## Styles

### jump-theme.css (example - add when created)
**Purpose**: Jump brand colors, typography, spacing  
**How to use**:
```bash
cp _shared/styles/jump-theme.css ./src/styles/
```

### tailwind.config.js (example - add when created)
**Purpose**: Shared Tailwind configuration with Jump design tokens  
**How to use**:
```bash
cp _shared/styles/tailwind.config.js ./
```

## How to Use This Library

### When Starting a New Prototype
1. Browse this README to see what exists
2. Copy what you need into your prototype
3. Customize for your specific use case
4. Build new components as needed

### When to Add Something Here
Add components/utilities to _shared when:
- ✅ Used in 2+ prototypes (or likely to be)
- ✅ Battle-tested and working well
- ✅ General enough to be reusable
- ✅ Would save significant time to reuse

Don't add:
- ❌ Highly prototype-specific code
- ❌ Experimental/unproven patterns
- ❌ One-off solutions

### How to Add New Shared Code

**1. Copy from your prototype:**
```bash
# From inside your prototype directory
cp -r ./src/components/MyComponent ../_shared/components/
```

**2. Document it in this README:**
Add a new section under the appropriate category with:
- Component/utility name
- Purpose
- Which prototypes use it
- Key features
- How to use (copy command)

**3. Commit to git (if tracking _shared):**
```bash
cd ../_shared
git add .
git commit -m "[SHARED] Add MyComponent from prototype-name"
```

## Maintenance

### Updating Shared Code
If you improve a shared component in a prototype:
1. Test it thoroughly in the prototype
2. Copy the improved version back to _shared/
3. Update this README if functionality changed
4. Consider updating other prototypes using it (optional)

### Versioning (optional)
For critical shared code, you can version it:
```
_shared/components/ClaudeChat/
├── v1/
├── v2/
└── latest -> v2/
```

But for prototypes, usually just keep one "latest" version.

## Examples of What Could Go Here

**Components:**
- AI chat interfaces
- Ticket cards/lists
- Loading states
- Error boundaries
- Jump-branded buttons, forms, modals
- Dashboard layouts
- Data tables
- Charts/visualizations

**Utils:**
- API wrappers (Claude, Jump APIs)
- Date/time formatters
- Price formatters
- Ticket filtering logic
- Seat selection helpers
- Campaign calculations
- Mock data generators

**Hooks:**
- useClaudeChat
- useTicketData
- useLocalStorage
- useDebounce
- useWebSocket (for real-time features)

**Styles:**
- Design tokens (colors, spacing, typography)
- Tailwind configs
- CSS utilities
- Animation presets

## Getting Started

Right now, this library is empty - you'll populate it as you build prototypes! 

**First steps:**
1. Build your first prototype
2. Identify reusable pieces
3. Copy them here
4. Document them in this README
5. Use them in your next prototype

Over time, this becomes your personal component library that makes prototyping faster and more consistent.

## Tips

- **Start small**: Don't try to build a comprehensive library upfront
- **Extract, don't predict**: Only add things you've actually used twice
- **Keep it simple**: Prototype quality, not production quality
- **Document as you go**: Future you will thank present you
- **Review quarterly**: Archive or remove unused components
