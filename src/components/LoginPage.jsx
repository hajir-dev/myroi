import { useState } from "react";
import { Field } from "./ui/Field";

export function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "kevin01", password: "password" });

  const submit = (event) => {
    event.preventDefault();
    onLogin(form);
  };

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="glow glow-blue" />
        <div className="glow glow-green" />
        <div className="login-content">
          <h1>ROI Center</h1>
          <p>Login to manage mappings & whitelists</p>
          <form onSubmit={submit} className="form-stack">
            <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} required placeholder="e.g., kevin01" />
            <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required placeholder="********" />
            <button className="primary-button full" type="submit">
              Enter Dashboard
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
