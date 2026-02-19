# Jump Platforms — Company Context

## 1. Mission and Vision

### Mission
Our mission is to empower teams and entertainers to build fans for life.

This mission reflects Jump’s timeless purpose: enabling organizations to create lasting, meaningful relationships with their fans through trust, transparency, and world-class digital experiences.

### Vision
Our vision is to build an operating system for sports teams that brings more fans in, gets them closer to the action, and creates a more engaging fan experience.

Over the next 5–10 years, Jump aims to become the foundational platform powering how teams operate their business — unifying ticketing, access, payments, data, and fan engagement into a single, intelligent system.

---

## 2. Core Values

### Begin and build with trust
Trust is the ultimate unlock. We start from trust and work every day to strengthen it by acting with integrity, respect, and accountability.

**In practice, we:**
- Lead with curiosity and stay open-minded to different ideas
- Disagree openly, then commit fully once a decision is made
- Give and receive feedback with care, clarity, and candor

### Play like the underdog
We stay hungry, humble, and relentless. We move fast, adapt faster, and find creative ways around obstacles.

**In practice, we:**
- Learn fast, move fast, and pivot when needed
- Never rest on our laurels and constantly push to improve
- Stay focused when faced with setbacks and always find a path forward

### Win as a team
We play to win — and we win together. The best outcomes come from collaboration and shared ownership.

**In practice, we:**
- Celebrate and support each other
- Never point fingers — it’s us against the problem
- Push each other to be our best

### Do your thing!
We believe mastery comes from ownership, autonomy, and continuous growth.

**In practice, we:**
- Take pride and ownership in our work
- Stay driven by passion and purpose
- Commit to lifelong learning and improvement

---

## 3. Clients

Jump is trusted by leading sports organizations across professional and collegiate athletics, including:

- **Minnesota Timberwolves (NBA)**
- **Minnesota Lynx (WNBA)**
- **North Carolina Courage (NWSL)**
- **Denver Summit (NWSL)**
- **Bucknell Bison Men’s and Women’s Basketball (NCAA)**
- **And more coming soon**

These partners validate Jump’s ability to operate at NBA-scale while delivering a modern, fan-first experience.

---

## 4. Key System Definitions

### Jump Platform Overview
Jump is a multi-tenant, event-driven operating system for live events, ticketing, and fan experiences. Each organization operates within its own secure environment while benefiting from a shared, scalable platform.

**Core platform components:**
- **Enterprise Platform**: Used by team employees to configure pricing, inventory, offers, access control, payments, and reporting
- **Consumer Platform**: Fan-facing experience across web and mobile, including ticket purchase, wallet, resale, transfer, and in-venue access

---

### Core Domain Model
The Jump platform follows a consistent domain hierarchy:

**Org → Venues → Manifests → Events → Inventory → Offers → Orders → Entitlements**

- **Org**: Partition boundary for all data and configuration
- **Venue**: Physical location defining seat maps and access points
- **Manifest (Event Template)**: Template for seating and inventory layout
- **Event**: A scheduled occurrence at a venue
- **Inventory**: Sellable units (seats, GA, suites, parking, experiences)
- **Offer**: Defines what inventory is sold, how, and under what rules
- **Order**: Financial record including items, fees, and payments
- **Entitlement**: The digital credential that governs access and usage

---

### Admin Configuration Objects
The Admin section is the configuration backbone of the Jump Enterprise Platform. These objects define system behavior at the moment of sale and propagate through orders and entitlements.

**Key admin objects include:**

- **Price Types**: Define ticket categories and rules for resale, transfer, upgrade, and exchange
- **Price Levels**: Represent intrinsic value tiers of inventory
- **Allocation Codes**: Segment inventory for sales channels and post-exchange routing
- **GA Groups**: Group interchangeable general-admission inventory
- **Price Components**: Attribute portions of a price for internal accounting and reporting
- **Fees**: Configurable transactional charges for primary and secondary markets
- **Payment / Invoice Strategies**: Define installment plans and payment timing
- **Delivery Strategies**: Control when and how entitlements are issued and delivered

---

### Access Control & Entitlements

- **Entitlement Templates**: Define access behavior, scan rules, and valid entry windows
- **Access Levels**: Group physical gates and entry points
- **Base Entitlement**: One-to-one with a purchased item; controls transfer and resale
- **Child Entitlements**: Scannable credentials created from templates

Entitlements move through defined states (pending → issued → delivered) and power all in-venue access, transfers, and resale activity.

---

### Event-Driven Architecture
Jump operates on an event-driven architecture where services emit domain events such as:
- `order.confirmed`
- `line_item.paid`
- `entitlement.issued`

This design enables scalability, reliability, and real-time system coordination across sales, fulfillment, and access control.

---

**Summary**
Jump is building the operating system for sports teams — unifying fragmented systems into a single, transparent, fan-first platform. Our mission, values, customers, and system architecture all reinforce a simple truth: when teams own the full digital fan journey, everyone wins.