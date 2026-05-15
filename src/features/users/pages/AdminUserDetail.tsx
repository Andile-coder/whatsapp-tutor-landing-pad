import { ChangeEvent, useEffect, useState } from "react";
import { Alert, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LearnerUserForm, {
  LearnerUserFormValues,
} from "@/features/users/components/LearnerUserForm";
import { useAppDispatch } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/features/auth/lib/runAdminAuthedRequest";
import { adminUsersApi } from "@/features/users/api/adminUsersApi";
import { store } from "@/store";
import { LearnerUser } from "@/features/users/types/adminUsers";
import AdminSurface from "@/components/shared/AdminSurface";

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
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {loading || !values ? (
        <AdminSurface sx={{ p: 6 }}>
          <Stack spacing={2} alignItems="center">
            <CircularProgress size={28} />
            <Typography sx={{ color: "#475569" }}>Loading learner...</Typography>
          </Stack>
        </AdminSurface>
      ) : (
        <AdminSurface sx={{ p: 3 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "flex-start", md: "center" }}>
            <Typography sx={{ color: "#101828", fontWeight: 800 }}>
              {values.first_name || values.last_name
                ? `${values.first_name || ""} ${values.last_name || ""}`.trim()
                : "Learner profile"}
            </Typography>
            <Chip
              label={values.is_active ? "Active" : "Inactive"}
              size="small"
              sx={{
                bgcolor: values.is_active ? "#ecfdf3" : "#f2f4f7",
                color: values.is_active ? "#027a48" : "#475467",
                fontWeight: 800,
              }}
            />
            <Chip
              label={values.role || "No role"}
              size="small"
              sx={{ bgcolor: "#f2f7ff", color: "#3641f5", fontWeight: 800 }}
            />
            <Typography sx={{ color: "#667085", fontSize: 13 }}>
              WA ID: {values.wa_id || "Not set"} | Phone: {values.phone || "Not set"}
            </Typography>
          </Stack>
          <Stack sx={{ mt: 2.5 }}>
          <LearnerUserForm
            values={values}
            onChange={handleChange}
            onToggle={handleToggle}
            onSubmit={handleSubmit}
            submitLabel={saving ? "Saving..." : "Save changes"}
            busy={saving}
            mode="edit"
            embedded
          />
          </Stack>
        </AdminSurface>
      )}
    </Stack>
  );
};

export default AdminUserDetail;
