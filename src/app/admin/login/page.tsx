import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/auth";
import "../admin.css";

export const metadata = { title: "Owner login", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="login-wrap">
      <div>
        <h1 style={{ color: "var(--gold)", textAlign: "center", fontSize: "1.6rem" }}>Owner Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
