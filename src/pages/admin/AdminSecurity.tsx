import { useAppSelector } from "@/store/hooks";

const AdminSecurity = () => {
  const { adminUser } = useAppSelector((state) => state.adminAuth);

  return (
    <div className="grid gap-4">
      <section className="border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Security
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950">
          Access and roles
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Session controls and role visibility live here, separate from the
          main dashboard.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 font-heading text-xl font-semibold text-slate-950">
            Assigned roles
          </h3>
          {adminUser?.roles?.length ? (
            <div className="space-y-3">
              {adminUser.roles.map((role) => (
                <div
                  key={`${role.code}-${role.assigned_at}`}
                  className="border border-slate-200 bg-slate-50 px-4 py-3"
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
              No roles are assigned yet for this admin user.
            </p>
          )}
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 font-heading text-xl font-semibold text-slate-950">
            Session policy
          </h3>
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li>Access tokens are short-lived and refreshed automatically.</li>
            <li>Refresh tokens restore sessions after token expiry.</li>
            <li>Backend session revocation remains the source of truth.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminSecurity;
