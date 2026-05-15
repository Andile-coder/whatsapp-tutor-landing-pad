# Chatwoot Product Notes For Mosa Support UI

Date: 2026-05-14

Source repo: https://github.com/chatwoot/chatwoot

Important naming note: the project is called Chatwoot. This file is named `chatwood-product.md` because that is the local note filename requested in our project.

## Why This File Exists

We are turning the current Mosa AI admin app into a customer support UI. Chatwoot is a strong reference because it is a mature open-source support desk with an inbox-first product model.

These notes are here so we can come back later and remember:

- what Chatwoot does well
- what product patterns are worth copying
- what code architecture ideas are worth adapting
- what would be too heavy for our current React/Vite app
- where we left off before building our own support feature

## High-Level Product Model

Chatwoot is not just a chat screen. It is an operational support workspace.

Core product idea:

- all inbound customer messages flow into one support dashboard
- agents work from an inbox/conversation queue
- each conversation has a status, assignee, inbox/channel, labels, messages, and customer context
- agents can reply publicly or leave private/internal notes
- teams can route, assign, filter, search, automate, and report on conversations

This matters for us because we should not build "a chat page". We should build a support workspace around daily support operations.

## Key Chatwoot Features Worth Learning From

From the repo README and dashboard code, the important feature set is:

- omnichannel inbox: live chat, email, Facebook, Instagram, WhatsApp, Telegram, Line, SMS, API channels
- conversation assignment to agents and teams
- labels for organizing conversations
- private notes and mentions for internal collaboration
- custom filters and saved views
- canned responses/macros for fast replies
- business hours and autoresponders
- automation workflows
- contact profiles and interaction history
- custom attributes for contacts and conversations
- reports for conversations, agents, inboxes, labels, teams, CSAT, and live view
- help center portal
- AI/Captain features for agent assistance and automation
- dashboard apps that embed external/internal tools inside the conversation view

For our first support UI, the smallest useful version should probably include:

- inbox/conversation list
- selected conversation thread
- message composer
- learner/customer profile panel
- status and assignment
- labels/tags
- internal notes
- document/context panel for student support

## Repo Shape

Chatwoot is a Rails monolith with a Vue dashboard.

Important top-level areas:

- `app/`: Rails application code
- `app/javascript/dashboard`: main agent/admin dashboard frontend
- `app/javascript/widget`: customer-facing chat widget
- `app/javascript/portal`: help center portal
- `app/javascript/shared`: shared frontend helpers/components
- `app/javascript/design-system`: shared UI primitives
- `swagger/`: API documentation
- `spec/` and `tests/playwright`: backend and browser tests

Useful lesson:

- separate product surfaces clearly
- keep the support dashboard separate from widget/public/portal code
- do not let the support inbox become mixed with marketing pages or admin-only tools

Our equivalent direction:

```text
src/
  app/
  layouts/
  features/
    auth/
    support/
    users/
    documents/
    dashboard/
    settings/
  components/
    ui/
    shared/
```

We already started this by moving the current admin code into `src/features`.

## Dashboard Layout Pattern

Chatwoot's main dashboard route is `app/javascript/dashboard/routes/dashboard/Dashboard.vue`.

Observed responsibilities:

- renders the persistent dashboard shell
- includes the main sidebar
- renders nested routes with `router-view`
- controls account modal, shortcut modal, mobile sidebar state, upgrade page visibility, command bar, copilot launcher, and active call widget
- adapts behavior for small screens
- persists conversation layout preferences in UI settings

Important product lesson:

- the shell is not just decoration
- the shell owns global support-workspace behavior
- command palette, shortcuts, account switching, mobile nav, and global agent tools belong at the layout level

For us:

- `src/layouts/AdminLayout.tsx` should eventually become a `SupportLayout`
- it should host global support tools such as search, shortcuts, notifications, current agent, and support navigation
- the route outlet should render inbox, conversation, users/customers, documents, reports, and settings

## Dashboard Route Organization

The Chatwoot dashboard route tree includes domain folders like:

- `campaigns`
- `captain`
- `commands`
- `companies`
- `contacts`
- `conversation`
- `customviews`
- `helpcenter`
- `inbox`
- `notifications`
- `onboarding`
- `settings`
- `upgrade`

Useful lesson:

- route folders follow product domains, not generic page types
- conversation is treated as a major domain
- settings are separated from the day-to-day support workflow
- "captain"/AI has its own product domain

For us:

- create `src/features/support` for daily support work
- keep `src/features/settings` for admin/account/security later
- keep `src/features/documents` for document tools
- do not put support inbox screens in `dashboard` just because they render inside the dashboard layout

## Conversation Route Structure

Chatwoot's conversation route folder contains:

- `ConversationView.vue`
- `ConversationAction.vue`
- `ConversationInfo.vue`
- `ConversationParticipant.vue`
- `ContactPanel.vue`
- `ContactConversations.vue`
- `ContactDetailsItem.vue`
- `SharedFiles.vue`
- `conversation.routes.js`
- folders for contact, labels, macros, custom attributes, search

This is a very useful product map.

Minimum React equivalent for us:

```text
src/features/support/
  api/
  components/
    ConversationList.tsx
    ConversationListItem.tsx
    ConversationThread.tsx
    MessageBubble.tsx
    MessageComposer.tsx
    ConversationHeader.tsx
    ConversationActions.tsx
    CustomerPanel.tsx
    ConversationNotes.tsx
    ConversationLabels.tsx
    ConversationStatusControl.tsx
    AssignmentControl.tsx
    SharedFilesPanel.tsx
  pages/
    SupportInboxPage.tsx
  store/
  types/
```

## Conversation View Layout

Chatwoot's `ConversationView.vue` coordinates:

- `ChatList`
- `ConversationBox`
- `ConversationSidebar`
- `SidepanelSwitch`
- command bar conversation actions

It uses route props such as:

- `inboxId`
- `conversationId`
- `label`
- `teamId`
- `conversationType`
- `foldersId`

It has responsive behavior:

- in expanded layout, the conversation list can hide when a conversation is open
- in condensed layout, list and message view can show together
- contact sidebar visibility is controlled through UI settings

Important lesson:

- conversation UI should be driven by route params and UI settings
- selected conversation state must be cleared when navigating away to avoid stale conversation data
- responsive support UI is not just "stack on mobile"; it changes which panel is visible

For us:

- routes should probably look like `/admin/support` and `/admin/support/:conversationId`
- later support filters could become query params or route params: `status`, `assignee`, `label`, `inbox`, `team`
- selected conversation should derive from URL first, not only local component state
- mobile should show one panel at a time: list, thread, or customer panel

## Conversation List Pattern

Chatwoot's `ChatList.vue` is complex because it handles operational queue management.

Observed responsibilities:

- list conversations on the active route/filter
- handle active status filter
- handle active assignee tab
- handle sort order
- handle labels, teams, inboxes, folders/custom views
- preserve filter settings through UI settings
- compute pagination and whether more conversations should be fetched
- handle bulk actions such as assign agent, assign labels, remove labels
- open advanced filters
- support saved/custom views
- watch route and filter changes, then refetch/reset data

Important lesson:

- the conversation list is not a dumb list
- it is a queue management surface
- filters, counts, pagination, selection, and bulk actions should be first-class

For our first pass:

- support status filters: `open`, `pending`, `resolved`
- support assignee filters: `mine`, `unassigned`, `all`
- support channel/inbox filter, initially likely `whatsapp`
- support search by learner name/phone/query
- add unread count and last activity sort
- keep bulk actions for later

## Message Thread Pattern

Chatwoot's `MessagesView.vue` handles the readable conversation timeline.

Observed concepts:

- message list for selected conversation
- unread message count label
- attachment loading
- reply-window restrictions per channel
- label suggestions
- reset editor height when conversation changes
- fetch suggestions and attachments when current chat changes
- handle channel-specific messaging rules

Important lesson:

- the thread is not just messages
- the thread also needs delivery context, channel rules, unread markers, attachments, and helper prompts

For us:

- WhatsApp matters first
- show message direction: learner vs Mosa/admin
- show delivery/read status when available
- show document links sent to the learner
- show bot/system actions clearly
- support internal notes separately from outgoing WhatsApp messages
- include "reply window" handling if our backend exposes that later

## Composer / Reply Box Pattern

Chatwoot's `ReplyBox.vue` is one of the most important files.

Observed responsibilities:

- public reply vs private note mode
- message length limits per channel
- file upload availability per channel
- templates for WhatsApp/content template replies
- attachments and recorded audio
- emoji picker
- canned responses/macros
- signatures
- send button disabled rules
- handling undefined template variables before sending
- optimistic pending message creation via `createPendingMessageAndSend`
- event bus notifications after send, such as scroll and message sent events

Important lesson:

- the composer becomes the heart of support productivity
- channel rules must live close to composer behavior
- sending should feel instant through pending/optimistic UI
- internal notes should be a mode in the same composer area, not a disconnected page

For us:

- first composer should support:
  - text reply
  - internal note
  - send disabled state
  - pending send state
  - failure recovery without losing draft
  - simple attachment/document link insertion later
- we should not clear the draft until send succeeds, unless we persist drafts
- WhatsApp templates can come later if needed

## Customer / Contact Side Panel

Chatwoot has `ContactPanel.vue`, `ContactConversations.vue`, `ContactDetailsItem.vue`, `SharedFiles.vue`, and custom attributes under the conversation route.

Useful panel concepts:

- contact details
- previous conversations
- labels
- custom attributes
- shared files
- notes/history
- embedded dashboard apps for external context

For Mosa AI, the right side panel should probably be learner-focused:

- WhatsApp number / `wa_id`
- first name, last name
- grade, school, province, district, city
- registration and consent status
- recent documents requested
- recent downloads sent
- failed/missed document requests
- notes from admins
- internal support tags
- suggested next action

This panel can become one of our biggest advantages because Mosa AI is educational, not generic SaaS support.

## State Management

Chatwoot has a very large Vuex store. The store index registers modules for many product domains:

- accounts
- agents
- assignment policies
- auth
- automations
- campaigns
- contacts
- contact conversations
- contact labels
- contact notes
- conversation labels
- conversation metadata
- conversation page
- conversations
- conversation search
- conversation stats
- conversation typing status
- conversation watchers
- custom views
- dashboard apps
- draft messages
- inboxes
- labels
- macros
- notifications
- reports
- teams
- webhooks
- Captain AI modules

Important lesson:

- conversation state is split into multiple domain slices
- draft messages are their own state concern
- typing status, watchers, metadata, search, stats, labels, and pagination are separate enough to deserve boundaries

For us, Redux slices should not all go into one support slice forever.

Possible staged Redux shape:

```text
supportInboxSlice
  filters
  conversationIds
  pagination
  loading/error

supportConversationsSlice
  entities by conversation id
  selected id
  status/assignee updates

supportMessagesSlice
  messages by conversation id
  pending messages
  loading/error

supportDraftsSlice
  draft text by conversation id
  internal note mode

supportCustomerPanelSlice
  selected learner context
  recent requests/downloads
```

This may be too much for day one, but it is the direction to keep in mind.

## API Client Pattern

Chatwoot has a large dashboard API folder with a base `ApiClient.js`, cache-enabled clients, and many domain clients:

- account
- auth
- contacts
- conversations
- inboxes
- labels
- reports
- teams
- notifications
- webhooks
- custom views
- canned responses
- automations
- integrations

The important idea is not the exact implementation. It is that every domain does not hand-roll fetch behavior. Domain clients sit on top of a shared base client.

We have already moved in this direction with:

- `src/features/auth/api/adminApiClient.ts`
- `src/features/auth/lib/runAdminAuthedRequest.ts`

Next support API clients should follow that pattern from the start.

Possible support endpoints later:

```text
GET    /v4/admin/support/conversations
GET    /v4/admin/support/conversations/:id
GET    /v4/admin/support/conversations/:id/messages
POST   /v4/admin/support/conversations/:id/messages
POST   /v4/admin/support/conversations/:id/notes
PATCH  /v4/admin/support/conversations/:id/status
PATCH  /v4/admin/support/conversations/:id/assignee
POST   /v4/admin/support/conversations/:id/labels
DELETE /v4/admin/support/conversations/:id/labels/:label
GET    /v4/admin/support/conversations/:id/context
```

## Realtime / Event Model

Chatwoot is designed around realtime customer support. Evidence from the repo:

- Rails backend
- ActionCable/realtime style architecture
- conversation typing status store
- conversation watchers store
- notifications store
- pending messages and message sent bus events

For us:

- first version can poll or manually refresh
- support UI will eventually need realtime updates
- design the data model so realtime can slot in later
- do not bake in "fetch once on mount" as the only update model

Future realtime events to plan for:

- conversation created
- message created
- message status updated
- conversation assigned
- conversation status changed
- label added/removed
- typing started/stopped
- bot response generated
- document sent

## UI Design Lessons

Chatwoot's dashboard is work-focused:

- persistent sidebar
- dense conversation list
- central message thread
- right context panel
- restrained operational UI
- command bar and shortcuts for power users
- mobile sidebar launcher and responsive panel behavior
- global modals for account and shortcuts

For Mosa:

- avoid marketing-style admin pages in the support workspace
- avoid large cards and explanatory hero blocks inside support screens
- prioritize scan speed, queues, message clarity, and quick actions
- use a compact layout with stable panel widths
- keep support flow calm and professional

Suggested support screen layout:

```text
| nav | conversation list | message thread | learner/context panel |
```

Mobile:

```text
List -> Thread -> Context
```

## Things Not To Copy Blindly

Chatwoot is mature and large. We should not copy its complexity too early.

Avoid on day one:

- full custom views engine
- full macro/canned-response system
- full command bar
- full automation builder
- complex permission matrix
- every channel-specific rule
- full reports suite
- large global store module map
- heavy composer with every attachment/template/signature path

Build the smallest support workflow that is operationally useful, then grow.

## What We Should Build First

First support milestone:

- route: `/admin/support`
- layout: three-panel support workspace
- left panel: conversation list
- center panel: selected thread
- right panel: learner profile/context
- filters: `Open`, `Mine`, `Unassigned`, `Resolved`
- composer: reply mode and internal note mode
- status action: open/pending/resolved
- assignment placeholder if backend is not ready
- labels placeholder if backend is not ready

Second support milestone:

- real backend integration
- message send
- internal notes
- learner context from current users/document endpoints
- document request/download history in context panel
- conversation search

Third support milestone:

- realtime updates
- saved filters
- labels
- assignment/team routing
- document insertion into replies
- agent performance and queue stats

## Proposed Local Structure For Our Support Feature

```text
src/features/support/
  api/
    supportApi.ts
  components/
    AssignmentControl.tsx
    ConversationActions.tsx
    ConversationHeader.tsx
    ConversationLabels.tsx
    ConversationList.tsx
    ConversationListItem.tsx
    ConversationStatusControl.tsx
    ConversationThread.tsx
    CustomerPanel.tsx
    InternalNoteComposer.tsx
    MessageBubble.tsx
    MessageComposer.tsx
    SharedFilesPanel.tsx
    SupportFilters.tsx
  pages/
    SupportInboxPage.tsx
  store/
    supportInboxSlice.ts
    supportConversationsSlice.ts
    supportMessagesSlice.ts
    supportDraftsSlice.ts
  types/
    support.ts
```

Start smaller if needed:

```text
src/features/support/
  api/supportApi.ts
  components/
  pages/SupportInboxPage.tsx
  types/support.ts
```

## Data Model Sketch

Conversation:

```ts
type SupportConversation = {
  id: string;
  waId: string;
  learnerName: string;
  phoneNumber: string;
  inbox: "whatsapp" | "web" | "email" | "api";
  status: "open" | "pending" | "resolved";
  assigneeId?: string | null;
  assigneeName?: string | null;
  labels: string[];
  unreadCount: number;
  lastMessagePreview: string;
  lastActivityAt: string;
  createdAt: string;
};
```

Message:

```ts
type SupportMessage = {
  id: string;
  conversationId: string;
  direction: "incoming" | "outgoing" | "internal";
  senderType: "learner" | "agent" | "bot" | "system";
  senderName?: string;
  body: string;
  attachments?: SupportAttachment[];
  status?: "pending" | "sent" | "delivered" | "read" | "failed";
  createdAt: string;
};
```

Learner context:

```ts
type SupportLearnerContext = {
  waId: string;
  firstName?: string;
  lastName?: string;
  grade?: string;
  schoolName?: string;
  province?: string;
  city?: string;
  districtName?: string;
  acceptedTerms?: boolean;
  acceptedPrivacyPolicy?: boolean;
  recentDocumentRequests: Array<{
    queryText: string;
    requestCount: number;
    lastRequest: string;
  }>;
  recentDownloads: Array<{
    documentName: string;
    documentPath: string;
    lastDownload: string;
  }>;
};
```

## Where We Left Off In Our Codebase

Before this note, we already performed important restructuring:

- moved app entry to `src/app/App.tsx`
- moved admin shell to `src/layouts/AdminLayout.tsx`
- moved auth into `src/features/auth`
- moved users into `src/features/users`
- moved documents into `src/features/documents`
- moved document activity into `src/features/document-activity`
- moved dashboard into `src/features/dashboard`
- moved settings into `src/features/settings`
- centralized API request parsing in `src/features/auth/api/adminApiClient.ts`
- centralized auth refresh/retry behavior in `src/features/auth/lib/runAdminAuthedRequest.ts`

This means the project is ready to add:

```text
src/features/support
```

without adding more code to the old page-based admin structure.

## Practical Design Direction For Mosa

Mosa is not generic ecommerce support. It is student/education support over WhatsApp.

Our support UI should emphasize:

- learner identity and registration context
- grade/school/province context
- document requests and downloads
- failed document searches
- what the bot did before a human joined
- simple human reply path
- internal note trail
- quick document lookup/send action

This should feel more like an educational operations desk than a generic call center.

## References Reviewed

- Chatwoot repository: https://github.com/chatwoot/chatwoot
- README feature overview: https://github.com/chatwoot/chatwoot
- Dashboard root: https://github.com/chatwoot/chatwoot/tree/develop/app/javascript/dashboard
- Dashboard route folder: https://github.com/chatwoot/chatwoot/tree/develop/app/javascript/dashboard/routes/dashboard
- Conversation route folder: https://github.com/chatwoot/chatwoot/tree/develop/app/javascript/dashboard/routes/dashboard/conversation
- Dashboard shell: https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/dashboard/routes/dashboard/Dashboard.vue
- Conversation view: https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/dashboard/routes/dashboard/conversation/ConversationView.vue
- Chat list: https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/dashboard/components/ChatList.vue
- Messages view: https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/dashboard/components/widgets/conversation/MessagesView.vue
- Reply box: https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/dashboard/components/widgets/conversation/ReplyBox.vue
- Dashboard API folder: https://github.com/chatwoot/chatwoot/tree/develop/app/javascript/dashboard/api
- Dashboard apps docs: https://www.chatwoot.com/docs/product/others/dashboard-apps

