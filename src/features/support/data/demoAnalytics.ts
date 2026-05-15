export const analyticsOverview = {
  totalConversations: 1240,
  openConversations: 146,
  resolvedToday: 93,
  avgFirstResponseMins: 8.4,
  csatScore: 4.5,
};

export const analyticsByAgent = [
  { agent: "Andile", open: 22, resolvedToday: 18, avgFirstResponseMins: 6.2, csat: 4.7 },
  { agent: "Lerato", open: 19, resolvedToday: 16, avgFirstResponseMins: 7.1, csat: 4.6 },
  { agent: "Sipho", open: 14, resolvedToday: 11, avgFirstResponseMins: 9.3, csat: 4.4 },
  { agent: "Naledi", open: 17, resolvedToday: 14, avgFirstResponseMins: 8.0, csat: 4.5 },
];

export const analyticsByChannel = [
  { channel: "WhatsApp", volume: 880, open: 96, resolvedRate: "87%" },
  { channel: "Email", volume: 248, open: 38, resolvedRate: "81%" },
  { channel: "Live chat", volume: 112, open: 12, resolvedRate: "90%" },
];

export const analyticsSla = [
  { bucket: "< 5 min", count: 486 },
  { bucket: "5-10 min", count: 332 },
  { bucket: "10-20 min", count: 214 },
  { bucket: "> 20 min", count: 78 },
];

export const analyticsCsat = [
  { rating: "5 stars", count: 420 },
  { rating: "4 stars", count: 188 },
  { rating: "3 stars", count: 60 },
  { rating: "2 stars", count: 21 },
  { rating: "1 star", count: 12 },
];

export const analyticsVolumeTrend = [
  { day: "Mon", volume: 180, resolved: 162 },
  { day: "Tue", volume: 194, resolved: 171 },
  { day: "Wed", volume: 210, resolved: 192 },
  { day: "Thu", volume: 201, resolved: 183 },
  { day: "Fri", volume: 236, resolved: 219 },
  { day: "Sat", volume: 124, resolved: 109 },
  { day: "Sun", volume: 95, resolved: 81 },
];
