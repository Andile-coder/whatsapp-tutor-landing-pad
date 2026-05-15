export type DemoMacro = {
  id: string;
  title: string;
  category: string;
  channel: "whatsapp" | "email" | "live_chat";
  usageCount: number;
  lastUsedAt: string;
  body: string;
};

export const demoMacros: DemoMacro[] = [
  { id: "m-001", title: "Greeting - New learner", category: "Onboarding", channel: "whatsapp", usageCount: 118, lastUsedAt: "2026-05-15 10:14", body: "Hi {{name}}, welcome to Mosa AI. Share your grade and subject and I will help you right away." },
  { id: "m-002", title: "Missing paper acknowledgement", category: "Documents", channel: "email", usageCount: 64, lastUsedAt: "2026-05-14 19:33", body: "Thanks for reporting this. We are checking the paper and will update you shortly." },
  { id: "m-003", title: "Consent reminder", category: "Compliance", channel: "whatsapp", usageCount: 43, lastUsedAt: "2026-05-13 15:02", body: "Before we continue, please review and accept the terms and privacy policy." },
  { id: "m-004", title: "Escalation to ops", category: "Escalation", channel: "email", usageCount: 31, lastUsedAt: "2026-05-15 08:52", body: "Escalating this request to operations for urgent investigation." },
  { id: "m-005", title: "Resolved confirmation", category: "Resolution", channel: "live_chat", usageCount: 75, lastUsedAt: "2026-05-14 22:10", body: "This issue is now resolved. Please reply if you need anything else." },
];
