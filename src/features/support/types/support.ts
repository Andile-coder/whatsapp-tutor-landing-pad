export type ConversationStatus = "open" | "pending" | "resolved";

export type SupportChannel =
  | "whatsapp"
  | "live_chat"
  | "email"
  | "facebook"
  | "instagram"
  | "twitter";

export type ConversationAssignee = {
  id: string;
  name: string;
};

export type SupportConversation = {
  id: string;
  waId: string;
  learnerName: string;
  phoneNumber: string;
  channel: SupportChannel;
  grade: string;
  schoolName: string;
  province: string;
  status: ConversationStatus;
  assignee: ConversationAssignee | null;
  labels: string[];
  unreadCount: number;
  lastMessagePreview: string;
  lastActivityAt: string;
};

export type SupportMessage = {
  id: string;
  conversationId: string;
  direction: "incoming" | "outgoing" | "internal";
  senderName: string;
  body: string;
  status?: "sent" | "delivered" | "read" | "failed";
  createdAt: string;
};

export type SupportLearnerContext = {
  waId: string;
  firstName: string;
  lastName: string;
  grade: string;
  schoolName: string;
  province: string;
  city: string;
  acceptedTerms: boolean;
  acceptedPrivacyPolicy: boolean;
  recentRequests: Array<{
    queryText: string;
    lastRequest: string;
    requestCount: number;
  }>;
  recentDownloads: Array<{
    documentName: string;
    lastDownload: string;
  }>;
};
