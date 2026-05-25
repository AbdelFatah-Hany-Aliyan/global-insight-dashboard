```markdown
# Technical Assessment — Answers Document
This document details the architectural decisions, resilience engineering, and strategic stack choices implemented across the **Global Insight Dashboard** submission.
---

### 1. How to run
To execute this project on a fresh machine:
1. Ensure Node.js (>= 18.0.0) is configured on your environment.
2. Run `npm install` at the project's root directory to download necessary UI packages (such as `lucide-react`).
3. Run `npm run dev` to stand up the Next.js local development server.
4. Point your browser to `http://localhost:3000`.

---

### 2. Stack choice
* **Chosen Stack:** Next.js (React), TypeScript, and Tailwind CSS.
* **Why this choice?** Next.js delivers an extremely fast initialization out of the box, optimal image rendering, and a solid routing framework. TypeScript was chosen to enforce compilation-stage structural safety, preventing app crashes caused by fluctuating external API JSON structures. Tailwind CSS allowed for low-overhead, rapid dashboard styling without bloating the production CSS bundle.
* **What would have been a worse choice and why?** Building this using Vanilla JavaScript paired with Raw HTML/PHP. Managing global application state for dynamic comparison grids (safely checking if an item exists in an array, enforcing a maximum threshold of 2 slots, syncing loading spinners, and toggling UI buttons) via manual DOM manipulation creates tightly coupled spaghetti code. It dramatically increases the surface area for UI synchronization bugs and memory leaks.

---

### 3. One real edge case
* **Specific Edge Case Handled:** API Response Schema Non-Uniformity / Missing Optionals.
* **File and Line Number:** `src/app/page.tsx` (Inside the mapping iteration block of the `#compare-slot-section`).
* **Explanation:** The REST Countries API does not guarantee structurally identical data structures for every node. For instance, uninhabited zones or special regions (e.g., Antarctica) possess no registered native currencies or language fields. 
* **Without handling:** Accessing properties blindly like `country.currencies[key].name` would instantly throw an unhandled JavaScript runtime error: `Cannot read properties of undefined (reading 'name')`. This triggers the "White Screen of Death" for the user.
* **Our Handling:** The code uses strict type guards and safely pulls object keys using conditional structures (`const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : null`). If missing, it smoothly falls back to a clean `"N/A"` layout without disrupting the client runtime context.

---

### 4. AI usage
* **Tool Used:** Gemini AI.
* **Prompt/Request:** Requested a minimal React boilerplate setup displaying items mapped from a generic REST Countries API request along with responsive Tailwind CSS card utilities.
* **Initial Output Received:** A standard frontend block executing a standard asynchronous `fetch()` loop inside an event handler, with simple data displaying.
* **What I Changed & Why:** The generated code lacked any consideration for network instability, malicious user interactions, or API failures. I manually modified the core data fetching loop by integrating:
  1. An `AbortController` bound to a custom `setTimeout` macro. This forces the request to cancel safely and gracefully if the endpoint stalls or lags beyond **5 seconds**, preventing frozen loading states.
  2. Input Sanity Guards using Regular Expressions (`/[^a-zA-Z\s]/`) to block special characters or query injection attempts before hitting the network pipeline.
  3. Strict `res.status === 404` trapping to explicitly map semantic errors back to readable UI notifications instead of generic fetch failures.

---

### 5. Honest gap
* **The Identified Gap:** Absence of a Client-Side Data Caching or Deduplication Middleware Layer.
* **The 24-Hour Fix:** Given another full day, I would integrate a client-side state cacher like `TanStack Query` (React Query) or design an internal custom `SessionStorage` state map. Currently, searching or toggling the comparison button for the exact same country repeatedly forces redundant, repetitive HTTP requests across the network. Introducing a client-side lookup cache would allow instant, zero-latency re-renders and cut out secondary API calls completely, achieving true offline-first capability.