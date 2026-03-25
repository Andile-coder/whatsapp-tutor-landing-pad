import { useAppDispatch, useAppSelector } from "@/store/hooks";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { adminUser, tokens, error } = useAppSelector((state) => state.adminAuth);

  return (
    <div className="grid gap-4">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Overview
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950">
          Admin dashboard
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Auth is now backed by the admin OTP API. This session can be
          refreshed and revoked from the backend as the admin area expands.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 font-heading text-xl font-semibold text-slate-950">
            Admin profile
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Name:{" "}
              <span className="font-medium text-slate-950">
                {[adminUser?.first_name, adminUser?.last_name]
                  .filter(Boolean)
                  .join(" ") || "Not set"}
              </span>
            </p>
            <p>
              Phone:{" "}
              <span className="font-medium text-slate-950">
                {adminUser?.phone_number || "Unknown"}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="font-medium text-slate-950">
                {adminUser?.email || "Not set"}
              </span>
            </p>
            <p>
              Session ID:{" "}
              <span className="font-mono text-slate-950">
                {tokens?.sessionId || "Unknown"}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 font-heading text-xl font-semibold text-slate-950">
            Assigned roles
          </h3>
          {adminUser?.roles?.length ? (
            <div className="space-y-3">
              {adminUser.roles.map((role) => (
                <div
                  key={`${role.code}-${role.assigned_at}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="font-medium text-slate-950">{role.name}</p>
                  <p className="text-sm text-slate-600">Code: {role.code}</p>
                  <p className="text-sm text-slate-500">
                    Assigned by {role.assigned_by} on {role.assigned_at}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-slate-600">
              No roles are assigned yet. The `/me` endpoint is wired and will
              render joined admin roles when they exist.
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-2 font-heading text-xl font-semibold text-slate-950">
            Redux auth store
          </h3>
          <p className="text-sm leading-6 text-slate-600">
            Admin auth state lives in Redux Toolkit so future admin features can
            layer onto one predictable session model.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-2 font-heading text-xl font-semibold text-slate-950">
            Session model
          </h3>
          <p className="text-sm leading-6 text-slate-600">
            The app restores sessions on reload and automatically refreshes
            access tokens around protected requests.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-2 font-heading text-xl font-semibold text-slate-950">
            Route system
          </h3>
          <p className="text-sm leading-6 text-slate-600">
            The admin shell now uses nested child routes, so additional sections
            can be added without rebuilding the page frame.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
