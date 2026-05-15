import { ChangeEvent, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LearnerUserForm, {
  LearnerUserFormValues,
} from "@/features/users/components/LearnerUserForm";
import { useAppDispatch } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/features/auth/lib/runAdminAuthedRequest";
import { adminUsersApi } from "@/features/users/api/adminUsersApi";
import { store } from "@/store";
import AdminPageHeader from "@/components/shared/AdminPageHeader";

const initialValues: LearnerUserFormValues = {
  wa_id: "",
  phone: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  date_of_birth: "",
  grade: "",
  province: "",
  city: "",
  district_name: "",
  school_name: "",
  role: "student",
  accepted_terms: false,
  accepted_privacy_policy: false,
  viewed_terms: false,
  viewed_privacy_policy: false,
  terms_version: "2026-03-17",
  privacy_version: "2026-03-17",
  is_active: true,
};

const AdminUserCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState<LearnerUserFormValues>(initialValues);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof LearnerUserFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleToggle =
    (field: keyof LearnerUserFormValues) => (_: unknown, checked: boolean) => {
      setValues((current) => ({
        ...current,
        [field]: checked,
      }));
    };

  const handleSubmit = async () => {
    if (!values.wa_id.trim() || !values.phone.trim()) {
      setError("WA ID and phone are required.");
      return;
    }

    try {
      setBusy(true);
      setError(null);

      const response = await runAdminAuthedRequest({
        dispatch,
        getState: store.getState,
        requestFn: (accessToken) => adminUsersApi.createUser(accessToken, values),
      });

      navigate(`/admin/users/${encodeURIComponent(response.user.wa_id)}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to create learner."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack spacing={3}>
      <AdminPageHeader
        eyebrow="Learners"
        title="Create learner"
        description="Add a WhatsApp learner record manually when support needs to provision or correct a profile."
      />

      {error && <Alert severity="error">{error}</Alert>}

      <LearnerUserForm
        values={values}
        onChange={handleChange}
        onToggle={handleToggle}
        onSubmit={handleSubmit}
        submitLabel={busy ? "Creating..." : "Create learner"}
        busy={busy}
        mode="create"
      />
    </Stack>
  );
};

export default AdminUserCreate;
