import { FormEvent, useMemo, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearAdminAuthError,
  requestAdminOtp,
  resetOtpFlow,
  verifyAdminOtp,
} from "@/store/slices/adminAuthSlice";

const buildDeviceName = () => {
  if (typeof navigator === "undefined") {
    return "Admin Web";
  }

  const platform = navigator.platform || "Unknown device";
  return `${platform} Admin Web`;
};

const getDeviceId = (phoneNumber: string) => {
  if (typeof window === "undefined") {
    return `admin-web-${phoneNumber.replace(/\D/g, "")}-server`;
  }

  const storageKey = `mosa-admin-device-id:${phoneNumber.replace(/\D/g, "")}`;
  const storedValue = window.localStorage.getItem(storageKey);

  if (storedValue) {
    return storedValue;
  }

  const generatedValue = `admin-web-${phoneNumber.replace(/\D/g, "")}-${crypto
    .randomUUID()
    .slice(0, 12)}`;

  window.localStorage.setItem(storageKey, generatedValue);
  return generatedValue;
};

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    otpPhoneNumber,
    otpId,
    otpExpiresIn,
    otpRequestStatus,
    verifyStatus,
    error,
  } = useAppSelector((state) => state.adminAuth);
  const [phoneNumber, setPhoneNumber] = useState(otpPhoneNumber);
  const [otp, setOtp] = useState("");

  const redirectTo = location.state?.from || "/admin";
  const isOtpStep = Boolean(otpId);
  const canSubmitPhone = phoneNumber.trim().length >= 10;
  const canSubmitOtp = otp.trim().length >= 4;

  const otpExpiryMinutes = useMemo(() => {
    if (!otpExpiresIn) {
      return null;
    }

    return Math.ceil(otpExpiresIn / 60);
  }, [otpExpiresIn]);

  const handleRequestOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmitPhone) {
      return;
    }

    await dispatch(
      requestAdminOtp({
        phoneNumber: phoneNumber.trim(),
      })
    );
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmitOtp) {
      return;
    }

    const result = await dispatch(
      verifyAdminOtp({
        phoneNumber: otpPhoneNumber || phoneNumber.trim(),
        otp: otp.trim(),
        deviceName: buildDeviceName(),
        deviceId: getDeviceId(otpPhoneNumber || phoneNumber.trim()),
      })
    );

    if (verifyAdminOtp.fulfilled.match(result)) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: { xs: 3, sm: 4 },
          borderRadius: 0,
          border: "1px solid rgba(148,163,184,0.18)",
          boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.18em", color: "#64748b", fontWeight: 700 }}
            >
              MOSA AI ADMIN
            </Typography>
            <Typography
              variant="h4"
              sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}
            >
              Sign in
            </Typography>
            <Typography sx={{ mt: 1, color: "#64748b" }}>
              Sign in with your admin WhatsApp number.
            </Typography>
          </Box>

          {!isOtpStep ? (
            <Box component="form" onSubmit={handleRequestOtp}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Admin phone number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    if (error) {
                      dispatch(clearAdminAuthError());
                    }
                  }}
                  placeholder="Enter phone number"
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!canSubmitPhone || otpRequestStatus === "loading"}
                  sx={{
                    py: 1.4,
                    borderRadius: 0,
                    bgcolor: "#0f172a",
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#1e293b",
                      boxShadow: "none",
                    },
                  }}
                >
                  {otpRequestStatus === "loading" ? "Requesting OTP..." : "Send OTP"}
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleVerifyOtp}>
              <Stack spacing={2.5}>
                <Alert severity="info" sx={{ alignItems: "center" }}>
                  OTP sent to {otpPhoneNumber}
                  {otpExpiryMinutes
                    ? ` and expires in about ${otpExpiryMinutes} minutes.`
                    : "."}
                </Alert>

                <TextField
                  fullWidth
                  label="One-time code"
                  inputMode="numeric"
                  value={otp}
                  onChange={(event) => {
                    setOtp(event.target.value);
                    if (error) {
                      dispatch(clearAdminAuthError());
                    }
                  }}
                  placeholder="Enter OTP"
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!canSubmitOtp || verifyStatus === "loading"}
                  sx={{
                    py: 1.4,
                    borderRadius: 0,
                    bgcolor: "#0f172a",
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#1e293b",
                      boxShadow: "none",
                    },
                  }}
                >
                  {verifyStatus === "loading" ? "Verifying..." : "Verify OTP"}
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    setOtp("");
                    dispatch(resetOtpFlow());
                  }}
                  sx={{
                    py: 1.4,
                    borderRadius: 0,
                    borderColor: "rgba(148,163,184,0.35)",
                    color: "#334155",
                  }}
                >
                  Use a different number
                </Button>
              </Stack>
            </Box>
          )}

          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              alignSelf: "flex-start",
              px: 0,
              minWidth: 0,
              color: "#64748b",
            }}
          >
            Back to site
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
