import { StoredAdminSession } from "@/types/admin-auth";

const ADMIN_AUTH_STORAGE_KEY = "mosa-admin-auth";

export const loadStoredAdminSession = (): StoredAdminSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoredAdminSession;
  } catch {
    window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    return null;
  }
};

export const saveStoredAdminSession = (session: StoredAdminSession) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredAdminSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};
