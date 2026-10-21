"use client";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="login-box">
      <label>Email<input name="email" type="email" required autoComplete="username" /></label>
      <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
      {state?.error && <p className="err" role="alert">{state.error}</p>}
      <button className="btn btn-gold" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
