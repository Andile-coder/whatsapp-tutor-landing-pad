export type AdminRole = {
  code: string;
  name: string;
  assigned_at: string;
  assigned_by: string;
};

export type AdminUser = {
  id: string;
  phone_number: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  last_login_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  roles: AdminRole[];
};

export type AdminTokens = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
  tokenType: string;
};

export type StoredAdminSession = {
  tokens: AdminTokens;
  adminUser: AdminUser | null;
};
