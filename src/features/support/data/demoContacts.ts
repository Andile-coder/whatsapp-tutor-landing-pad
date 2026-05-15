export type DemoContact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  grade: string;
  school: string;
  city: string;
  status: "active" | "inactive";
  lastSeen: string;
  openConversations: number;
};

export const demoContacts: DemoContact[] = [
  { id: "c-001", name: "Andile Masela", phone: "27646848143", email: "andile@example.com", grade: "12", school: "Kimberley High", city: "Kimberley", status: "active", lastSeen: "2026-05-15 10:22", openConversations: 2 },
  { id: "c-002", name: "Lerato Mokoena", phone: "27731234567", email: "lerato@example.com", grade: "11", school: "Pretoria Girls", city: "Pretoria", status: "active", lastSeen: "2026-05-15 09:55", openConversations: 1 },
  { id: "c-003", name: "Sipho Dlamini", phone: "27821234567", email: "sipho@example.com", grade: "12", school: "Durban Central", city: "Durban", status: "inactive", lastSeen: "2026-05-10 16:20", openConversations: 0 },
  { id: "c-004", name: "Anele Ndlovu", phone: "27711234567", email: "anele@example.com", grade: "10", school: "East London High", city: "East London", status: "active", lastSeen: "2026-05-15 08:40", openConversations: 3 },
  { id: "c-005", name: "Naledi Khumalo", phone: "27831234567", email: "naledi@example.com", grade: "12", school: "Johannesburg South", city: "Johannesburg", status: "active", lastSeen: "2026-05-14 18:03", openConversations: 1 },
  { id: "c-006", name: "Thato Maseko", phone: "27691234567", email: "thato@example.com", grade: "11", school: "Bloemfontein North", city: "Bloemfontein", status: "active", lastSeen: "2026-05-15 07:58", openConversations: 2 },
  { id: "c-007", name: "Zinzi Mthembu", phone: "27781234567", email: "zinzi@example.com", grade: "9", school: "Cape Town West", city: "Cape Town", status: "inactive", lastSeen: "2026-05-01 13:11", openConversations: 0 },
  { id: "c-008", name: "Kagiso Mokoena", phone: "27761234567", email: "kagiso@example.com", grade: "12", school: "Polokwane High", city: "Polokwane", status: "active", lastSeen: "2026-05-15 10:03", openConversations: 4 },
  { id: "c-009", name: "Ayanda Dube", phone: "27811234567", email: "ayanda@example.com", grade: "12", school: "Umlazi Senior", city: "Durban", status: "active", lastSeen: "2026-05-15 10:01", openConversations: 2 },
  { id: "c-010", name: "Nokuthula Maseko", phone: "27741234567", email: "nokuthula@example.com", grade: "11", school: "Soweto East", city: "Johannesburg", status: "active", lastSeen: "2026-05-14 21:19", openConversations: 1 },
];
