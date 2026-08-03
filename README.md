# Blacksmith TRENDS AI — Frontend

Frontend for the BRIDGE Program Fashion Trends Analytics platform (see the
Statement of Work — "Fashion Trend Analysis through Images with Generative
AI"). This is the SOW's Phase 4.1 deliverable: a React web application with
a conversational chat interface, "New Chat" flow, and conversation history
panel, sitting in front of the Bedrock Agent + Athena backend.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 — you'll land on `/login`. Any email/password
passes validation in this stub (there's no real auth backend wired up yet;
`useAuthStore` just persists a mock session to localStorage). Submitting
routes to `/chat`.

## Structure

```
src/
  api/          Mock API client — types + fetch calls matching the SOW's
                DynamoDB schema (Conversations / Messages tables) and
                API Gateway endpoints (§4.2). Swap the fetch() bodies for
                your real API Gateway base URL via VITE_API_BASE_URL.
  components/
    ui/         Input, LanguageDropdown
    AppShell    Shared sidebar+topbar for the stub pages
  i18n/         i18next config + en/es locale files
  pages/
    Login.tsx           Marketing hero + auth card
    ChatPage.tsx         Bedrock Fashion Assistant — the primary deliverable
    Dashboard.tsx        Weekly summary stat cards
    Analytics.tsx        Trend Analytics (stub)
    TrendExplorer.tsx    Visual Explorer (stub)
    WeeklyReports.tsx    Weekly Reports (stub)
    Settings.tsx         Theme toggle, session info
  store/
    useAuthStore.ts   Zustand — session state (persisted)
    ThemeContext.tsx  Dark/light toggle (defaults to dark)
```

## Design tokens

Dark mode background is `space-950` (`#0B0D17`) — a deep space indigo,
defined in `src/index.css` via Tailwind v4's `@theme` block. Do not swap
this for a flat black/zinc background; it's a deliberate identity choice
carried through every screen.

## What's stubbed vs. real

- **Real**: full Login flow (validation, loading states, i18n EN/ES,
  theme toggle), full Chat UI (sidebar, history search, suggestion
  cards pulled from the SOW's actual sample queries, message list).
- **Stubbed**: Dashboard/Analytics/Explorer/Reports render placeholder
  content — per the SOW, dashboards/BI visualization are **out of
  scope** for this engagement; only the conversational agent path is
  in scope. `src/api/types.ts` has typed fetch calls ready to point at
  your API Gateway once Phase 4.2 is deployed.
