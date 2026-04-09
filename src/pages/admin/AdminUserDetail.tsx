import { ChangeEvent, useEffect, useState } from "react";
import { Alert, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LearnerUserForm, {
  LearnerUserFormValues,
} from "@/components/admin/LearnerUserForm";
import { useAppDispatch } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/lib/run-admin-authed-request";
import { adminUsersApi } from "@/lib/admin-users-api";
import { store } from "@/store";
import { LearnerUser } from "@/types/admin-users";

const mapUserToFormValues = (user: LearnerUser): LearnerUserFormValues => ({
  wa_id: user.wa_id,
  phone: user.phone,
  first_name: user.first_name || "",
  last_name: user.last_name || "",
  email: user.email || "",
  gender: user.gender || "",
  date_of_birth: user.date_of_birth || "",
  grade: user.grade || "",
  province: user.province || "",
  city: user.city || "",
  district_name: user.district_name || "",
  school_name: user.school_name || "",
  role: user.role || "",
  accepted_terms: Boolean(user.accepted_terms),
  accepted_privacy_policy: Boolean(user.accepted_privacy_policy),
  viewed_terms: Boolean(user.viewed_terms),
  viewed_privacy_policy: Boolean(user.viewed_privacy_policy),
  terms_version: user.terms_version || "",
  privacy_version: user.privacy_version || "",
  is_active: Boolean(user.is_active),
});

const AdminUserDetail = () => {
  const dispatch = useAppDispatch();
  const { waId = "" } = useParams();
  const [values, setValues] = useState<LearnerUserFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const response = await runAdminAuthedRequest({
          dispatch,
          getState: store.getState,
          requestFn: (accessToken) => adminUsersApi.getUser(accessToken, waId),
        });

        if (isMounted) {
          setValues(mapUserToFormValues(response.user));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load learner."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch, waId]);

  const handleChange =
    (field: keyof LearnerUserFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) =>
        current
          ? {
              ...current,
              [field]: event.target.value,
            }
          : current
      );
    };

  const handleToggle =
    (field: keyof LearnerUserFormValues) => (_: unknown, checked: boolean) => {
      setValues((current) =>
        current
          ? {
              ...current,
              [field]: checked,
            }
          : current
      );
    };

  const handleSubmit = async () => {
    if (!values) {
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await runAdminAuthedRequest({
        dispatch,
        getState: store.getState,
        requestFn: (accessToken) =>
          adminUsersApi.updateUser(accessToken, waId, values),
      });

      setValues(mapUserToFormValues(response.user));
      setSuccess("Learner updated successfully.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to update learner."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 0,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.18em", color: "#64748b", fontWeight: 700 }}
        >
          Learners
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}>
          Learner profile
        </Typography>
        <Typography sx={{ mt: 1.5, color: "#475569" }}>
          Loaded from <strong>`GET /v4/admin/users/{waId}`</strong> and saved
          through <strong>`PATCH /v4/admin/users/{waId}`</strong>.
        </Typography>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {loading || !values ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 0,
            border: "1px solid rgba(148,163,184,0.18)",
            backgroundColor: "white",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress size={28} />
            <Typography sx={{ color: "#475569" }}>Loading learner...</Typography>
          </Stack>
        </Paper>
      ) : (
        <LearnerUserForm
          values={values}
          onChange={handleChange}
          onToggle={handleToggle}
          onSubmit={handleSubmit}
          submitLabel={saving ? "Saving..." : "Save changes"}
          busy={saving}
          mode="edit"
        />
      )}
    </Stack>
  );
};

export default AdminUserDetail;
