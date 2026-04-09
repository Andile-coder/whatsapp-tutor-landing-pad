import { useAppSelector } from "@/store/hooks";

const AdminAccount = () => {
  const { adminUser, tokens } = useAppSelector((state) => state.adminAuth);

  return (
    <div className="grid gap-4">
      <section className="border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Account
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950">
          Admin profile
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          This page is the stable place for profile-level admin details as the
          back office grows.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 font-heading text-xl font-semibold text-slate-950">
            Identity
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Full name:{" "}
              <span className="font-medium text-slate-950">
                {[adminUser?.first_name, adminUser?.last_name]
                  .filter(Boolean)
                  .join(" ") || "Not set"}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="font-medium text-slate-950">
                {adminUser?.email || "Not set"}
              </span>
            </p>
            <p>
              Phone:{" "}
              <span className="font-medium text-slate-950">
                {adminUser?.phone_number || "Unknown"}
              </span>
            </p>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 font-heading text-xl font-semibold text-slate-950">
            Session metadata
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Session ID:{" "}
              <span className="font-mono text-slate-950">
                {tokens?.sessionId || "Unknown"}
              </span>
            </p>
            <p>
              Last login:{" "}
              <span className="font-medium text-slate-950">
                {adminUser?.last_login_at || "Not available"}
              </span>
            </p>
            <p>
              Created at:{" "}
              <span className="font-medium text-slate-950">
                {adminUser?.created_at || "Not available"}
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminAccount;
