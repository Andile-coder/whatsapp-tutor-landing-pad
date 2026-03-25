import { ChangeEvent } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { UpsertLearnerUserPayload } from "@/lib/admin-users-api";

export type LearnerUserFormValues = UpsertLearnerUserPayload;

const genderOptions = ["male", "female", "other"];
const gradeOptions = ["8", "9", "10", "11", "12"];
const provinceOptions = [
  "EC",
  "FS",
  "GP",
  "KZN",
  "LP",
  "MP",
  "NC",
  "NW",
  "WC",
];
const roleOptions = ["student", "parent", "teacher"];

type Props = {
  values: LearnerUserFormValues;
  onChange: (
    field: keyof LearnerUserFormValues
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onToggle: (field: keyof LearnerUserFormValues) => (_: unknown, checked: boolean) => void;
  onSubmit: () => void;
  submitLabel: string;
  busy: boolean;
  mode: "create" | "edit";
};

const LearnerUserForm = ({
  values,
  onChange,
  onToggle,
  onSubmit,
  submitLabel,
  busy,
  mode,
}: Props) => {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Learner details
        </Typography>
        <Typography sx={{ mt: 1, mb: 3, color: "#64748b" }}>
          {mode === "create"
            ? "Create a WhatsApp learner record."
            : "Review and update the learner record."}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="WA ID"
              value={values.wa_id}
              onChange={onChange("wa_id")}
              disabled={mode === "edit"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={values.phone}
              onChange={onChange("phone")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First name"
              value={values.first_name || ""}
              onChange={onChange("first_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last name"
              value={values.last_name || ""}
              onChange={onChange("last_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={values.email || ""}
              onChange={onChange("email")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              value={values.gender || ""}
              onChange={onChange("gender")}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Date of birth"
              value={values.date_of_birth || ""}
              onChange={onChange("date_of_birth")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Grade"
              value={values.grade || ""}
              onChange={onChange("grade")}
            >
              {gradeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  Grade {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Role"
              value={values.role || ""}
              onChange={onChange("role")}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Province"
              value={values.province || ""}
              onChange={onChange("province")}
            >
              {provinceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="City"
              value={values.city || ""}
              onChange={onChange("city")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="District"
              value={values.district_name || ""}
              onChange={onChange("district_name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="School name"
              value={values.school_name || ""}
              onChange={onChange("school_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Terms version"
              value={values.terms_version || ""}
              onChange={onChange("terms_version")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Privacy version"
              value={values.privacy_version || ""}
              onChange={onChange("privacy_version")}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Consent and status
        </Typography>
        <Stack sx={{ mt: 2 }} spacing={0.5}>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(values.accepted_terms)}
                onChange={onToggle("accepted_terms")}
              />
            }
            label="Accepted terms"
          />
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(values.accepted_privacy_policy)}
                onChange={onToggle("accepted_privacy_policy")}
              />
            }
            label="Accepted privacy policy"
          />
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(values.viewed_terms)}
                onChange={onToggle("viewed_terms")}
              />
            }
            label="Viewed terms"
          />
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(values.viewed_privacy_policy)}
                onChange={onToggle("viewed_privacy_policy")}
              />
            }
            label="Viewed privacy policy"
          />
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(values.is_active)}
                onChange={onToggle("is_active")}
              />
            }
            label="Active user"
          />
        </Stack>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={busy}
          sx={{
            mt: 3,
            py: 1.4,
            px: 3,
            borderRadius: 3,
            bgcolor: "#0f172a",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1e293b",
              boxShadow: "none",
            },
          }}
        >
          {submitLabel}
        </Button>
      </Paper>
    </Stack>
  );
};

export default LearnerUserForm;
