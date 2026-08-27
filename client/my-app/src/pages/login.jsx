


import { useState } from "react";
import { login } from "../services/api.js";

export default function Login({ onSuccess,onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h2>Log in</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="form__field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error ? <p className="form__error">{error}</p> : null}
        <button className="button button--primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>
      <p>
      No account?{" "}
      <button type="button" className="button" onClick={onGoToRegister}>
       Register
       </button>
</p>
    </section>
  );
}