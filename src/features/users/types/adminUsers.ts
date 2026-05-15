export type LearnerRole = {
  code: string;
  name: string;
};

export type LearnerUser = {
  id: string;
  wa_id: string;
  phone: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  grade?: string | null;
  province?: string | null;
  city?: string | null;
  district_name?: string | null;
  school_name?: string | null;
  role?: string | null;
  roles: LearnerRole[];
  accepted_terms?: boolean | null;
  accepted_privacy_policy?: boolean | null;
  viewed_terms?: boolean | null;
  viewed_privacy_policy?: boolean | null;
  terms_version?: string | null;
  privacy_version?: string | null;
  terms_accepted_at?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};
