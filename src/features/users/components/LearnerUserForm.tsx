import { ChangeEvent } from "react";
import {
  Button,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { UpsertLearnerUserPayload } from "@/features/users/api/adminUsersApi";
import AdminSurface from "@/components/shared/AdminSurface";

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
  embedded?: boolean;
};

const LearnerUserForm = ({
  values,
  onChange,
  onToggle,
  onSubmit,
  submitLabel,
  busy,
  mode,
  embedded = false,
}: Props) => {
  const Wrapper = embedded ? Stack : AdminSurface;
  const wrapperProps = embedded ? {} : { sx: { p: { xs: 3, md: 4 } } };
  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: 44,
    },
  };

  return (
    <Stack spacing={3}>
      <Wrapper
        {...wrapperProps}
        sx={{
          ...(embedded
            ? {}
            : {
                p: { xs: 3, md: 4 },
                background:
                  "linear-gradient(135deg, #ffffff 0%, #fcfcfd 56%, #f2f7ff 100%)",
              }),
        }}
      >
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField fullWidth label="WA ID" value={values.wa_id} onChange={onChange("wa_id")} disabled={mode === "edit"} placeholder="27xxxxxxxxx" sx={fieldSx} />
            <TextField fullWidth label="Phone" value={values.phone} onChange={onChange("phone")} placeholder="27xxxxxxxxx" sx={fieldSx} />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField fullWidth label="First name" value={values.first_name || ""} onChange={onChange("first_name")} placeholder="First name" sx={fieldSx} />
            <TextField fullWidth label="Last name" value={values.last_name || ""} onChange={onChange("last_name")} placeholder="Last name" sx={fieldSx} />
          </Stack>
          <TextField fullWidth label="Email" value={values.email || ""} onChange={onChange("email")} placeholder="name@example.com" sx={fieldSx} />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField select fullWidth label="Gender" value={values.gender || ""} onChange={onChange("gender")} sx={fieldSx}>
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option[0].toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth type="date" label="Date of birth" value={values.date_of_birth || ""} onChange={onChange("date_of_birth")} InputLabelProps={{ shrink: true }} sx={fieldSx} />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField select fullWidth label="Grade" value={values.grade || ""} onChange={onChange("grade")} sx={fieldSx}>
              {gradeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  Grade {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Role" value={values.role || ""} onChange={onChange("role")} sx={fieldSx}>
              {roleOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option[0].toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField select fullWidth label="Province" value={values.province || ""} onChange={onChange("province")} sx={fieldSx}>
              {provinceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth label="City" value={values.city || ""} onChange={onChange("city")} placeholder="City" sx={fieldSx} />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField fullWidth label="District" value={values.district_name || ""} onChange={onChange("district_name")} placeholder="District" sx={fieldSx} />
            <TextField fullWidth label="School name" value={values.school_name || ""} onChange={onChange("school_name")} placeholder="School name" sx={fieldSx} />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField fullWidth label="Terms version" value={values.terms_version || ""} onChange={onChange("terms_version")} placeholder="YYYY-MM-DD" sx={fieldSx} />
            <TextField fullWidth label="Privacy version" value={values.privacy_version || ""} onChange={onChange("privacy_version")} placeholder="YYYY-MM-DD" sx={fieldSx} />
          </Stack>
        </Stack>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        sx={{
          ...(embedded ? {} : { p: { xs: 3, md: 4 } }),
        }}
      >
        <Typography sx={{ color: "#667085", fontWeight: 700, mb: 1.5 }}>
          Consent and status
        </Typography>
        <FormGroup>
          <Stack spacing={1.5}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <FormControlLabel
            sx={{
              m: 0,
              p: 1,
              border: "1px solid #e4e7ec",
              bgcolor: "#fcfcfd",
              justifyContent: "space-between",
            }}
            control={
              <Switch
                checked={Boolean(values.accepted_terms)}
                onChange={onToggle("accepted_terms")}
              />
            }
            label="Accepted terms"
            labelPlacement="start"
          />
          <FormControlLabel
            sx={{
              m: 0,
              p: 1,
              border: "1px solid #e4e7ec",
              bgcolor: "#fcfcfd",
              justifyContent: "space-between",
            }}
            control={
              <Switch
                checked={Boolean(values.accepted_privacy_policy)}
                onChange={onToggle("accepted_privacy_policy")}
              />
            }
            label="Accepted privacy policy"
            labelPlacement="start"
          />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <FormControlLabel
            sx={{
              m: 0,
              p: 1,
              border: "1px solid #e4e7ec",
              bgcolor: "#fcfcfd",
              justifyContent: "space-between",
            }}
            control={
              <Switch
                checked={Boolean(values.viewed_terms)}
                onChange={onToggle("viewed_terms")}
              />
            }
            label="Viewed terms"
            labelPlacement="start"
          />
          <FormControlLabel
            sx={{
              m: 0,
              p: 1,
              border: "1px solid #e4e7ec",
              bgcolor: "#fcfcfd",
              justifyContent: "space-between",
            }}
            control={
              <Switch
                checked={Boolean(values.viewed_privacy_policy)}
                onChange={onToggle("viewed_privacy_policy")}
              />
            }
            label="Viewed privacy policy"
            labelPlacement="start"
          />
            </Stack>
          <FormControlLabel
            sx={{
              m: 0,
              p: 1,
              border: "1px solid #e4e7ec",
              bgcolor: "#fcfcfd",
              justifyContent: "space-between",
            }}
            control={
              <Switch
                checked={Boolean(values.is_active)}
                onChange={onToggle("is_active")}
              />
            }
            label="Active user"
            labelPlacement="start"
          />
          </Stack>
        </FormGroup>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={busy}
          sx={{
            mt: 3,
            py: 1.4,
            px: 3,
            borderRadius: 0,
            bgcolor: "#101828",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1d2939",
              boxShadow: "none",
            },
          }}
        >
          {submitLabel}
        </Button>
      </Wrapper>
    </Stack>
  );
};

export default LearnerUserForm;
