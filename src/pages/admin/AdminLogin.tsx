import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(71,85,105,0.24),_transparent_30%),linear-gradient(180deg,#0f172a_0%,#111827_55%,#e5e7eb_55%,#f8fafc_100%)] px-4 py-16 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/92 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur md:p-10">
            <Link
              to="/"
              className="mb-10 inline-flex text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              Back to site
            </Link>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Mosa AI Admin
            </p>
            <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-slate-950">
              Sign in with WhatsApp OTP
            </h1>
            <p className="mb-10 max-w-md text-sm leading-6 text-slate-600">
              Use your approved admin number to receive a one-time code and
              enter the admin workspace.
            </p>

            {!isOtpStep ? (
              <form className="space-y-5" onSubmit={handleRequestOtp}>
                <div>
                  <label
                    htmlFor="admin-phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Admin phone number
                  </label>
                  <input
                    id="admin-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                      if (error) {
                        dispatch(clearAdminAuthError());
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:bg-white"
                    placeholder="27646848143"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmitPhone || otpRequestStatus === "loading"}
                  className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {otpRequestStatus === "loading"
                    ? "Requesting OTP..."
                    : "Send OTP"}
                </button>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={handleVerifyOtp}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  OTP sent to{" "}
                  <span className="font-semibold text-slate-950">
                    {otpPhoneNumber}
                  </span>
                  {otpExpiryMinutes
                    ? ` and expires in about ${otpExpiryMinutes} minutes.`
                    : "."}
                </div>

                <div>
                  <label
                    htmlFor="admin-otp"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    One-time code
                  </label>
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(event) => {
                      setOtp(event.target.value);
                      if (error) {
                        dispatch(clearAdminAuthError());
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:bg-white"
                    placeholder="123456"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmitOtp || verifyStatus === "loading"}
                  className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {verifyStatus === "loading" ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtp("");
                    dispatch(resetOtpFlow());
                  }}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Use a different number
                </button>
              </form>
            )}

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
              If your number is not recognized, the admin account still needs
              to be provisioned first.
            </div>
          </div>

          <div className="flex items-stretch">
            <div className="w-full rounded-[2rem] border border-slate-800/60 bg-slate-900 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] md:p-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Access
              </p>
              <h2 className="mb-6 font-heading text-3xl font-semibold tracking-tight">
                Clean session-based admin access
              </h2>
              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  OTP delivery happens through WhatsApp and verification creates
                  a backend-managed admin session with refresh support.
                </p>
                <p>
                  The interface is intentionally minimal: identify the admin,
                  verify the code, then hand off to the dashboard.
                </p>
              </div>

              <div className="mt-10 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-medium text-white">
                    Controlled entry
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Only approved numbers can request a valid admin OTP.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-medium text-white">
                    Multi-device sessions
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Sessions can be refreshed, revoked, or logged out across
                    devices through the backend.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-medium text-white">
                    Ready for expansion
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    The Redux auth layer is in place for larger admin features
                    without reworking route protection later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
